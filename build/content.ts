import matter from 'gray-matter'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { basename, extname, join, relative } from 'node:path'
import { countWords, estimateReadingTime, toDateString, truncate } from '../src/utils/text.ts'
import { renderMarkdown } from './markdown.ts'
import type {
  NameCount,
  PageMeta,
  PostContent,
  PostMeta,
  SearchEntry,
  SiteIndex,
  YearCount,
} from '../src/types/content.ts'

/** slug 只允许 ASCII 字母、数字、连字符与下划线，避免 URL 编码带来的各种坑 */
const SLUG_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]*$/

/** 内容目录与产物目录 */
export const GENERATED_DIR = 'src/generated'
export const POSTS_DIR = 'content/posts'
export const PAGES_DIR = 'content/pages'

export interface LoadedPost extends PostMeta {
  html: string
  toc: PostContent['toc']
  plainText: string
  filePath: string
}

export interface LoadedPage extends PageMeta {
  filePath: string
}

export interface SiteContent {
  index: SiteIndex
  /** slug -> 正文产物 */
  posts: Record<string, PostContent>
  search: SearchEntry[]
}

/**
 * 给根路径相对地址补上部署子路径。
 * 站点部署在 /my-blog/ 时，正文里的 /assets/a.png 需要变成 /my-blog/assets/a.png。
 */
export function prefixRootRelativeUrls(html: string, base: string): string {
  if (base === '/' || !base) return html
  const prefix = base.endsWith('/') ? base : `${base}/`
  return html.replace(/(src|href)="\/(?!\/)/g, `$1="${prefix}`)
}

/** 递归收集目录下的 markdown 文件 */
export function scanMarkdownFiles(dir: string): string[] {
  if (!existsSync(dir)) return []

  const files: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...scanMarkdownFiles(fullPath))
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.md') {
      files.push(fullPath)
    }
  }
  return files.sort()
}

/** 把 frontmatter 中的数组字段规整为去重后的字符串数组 */
function toStringArray(value: unknown): string[] {
  if (!value) return []
  const list = Array.isArray(value) ? value : [value]
  const result: string[] = []
  for (const item of list) {
    if (typeof item !== 'string') continue
    const trimmed = item.trim()
    if (trimmed && !result.includes(trimmed)) result.push(trimmed)
  }
  return result
}

/** 从正文中截取首段作为摘要 */
function deriveSummary(source: string, max = 120): string {
  const buffer: string[] = []

  for (const rawLine of source.split('\n')) {
    const line = rawLine.trim()
    if (!line) {
      if (buffer.length > 0) break
      continue
    }
    // 跳过标题、引用、代码块、表格与图片，它们不适合做摘要
    if (line.startsWith('#') || line.startsWith('>') || line.startsWith('```')) {
      if (buffer.length > 0) break
      continue
    }
    if (line.startsWith('|') || line.startsWith('![')) {
      if (buffer.length > 0) break
      continue
    }
    buffer.push(line)
  }

  const text = buffer
    .join(' ')
    .replace(/[*_`~[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return truncate(text, max)
}

/** 标题缺失时，尝试取正文里的第一个一级标题 */
function deriveTitle(content: string, fallback: string): string {
  const matched = content.match(/^#\s+(.+)$/m)
  return matched?.[1]?.trim() || fallback
}

/** 解析单篇文章 */
export function loadPost(filePath: string): LoadedPost {
  const raw = readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  const fileSlug = basename(filePath, extname(filePath))
  const slug = typeof data.slug === 'string' && data.slug ? data.slug : fileSlug
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `文章 slug 非法：「${slug}」（${relative(process.cwd(), filePath)}）。` +
        'slug 只能包含 ASCII 字母、数字、连字符和下划线，请在 frontmatter 中指定 slug 或重命名文件。',
    )
  }

  const rendered = renderMarkdown(content)
  const date = toDateString(data.date)
  if (!date) {
    throw new Error(
      `文章缺少有效的 date 字段：${relative(process.cwd(), filePath)}。` +
        '请在 frontmatter 中写入 date: YYYY-MM-DD。',
    )
  }

  const title =
    typeof data.title === 'string' && data.title ? data.title : deriveTitle(content, fileSlug)
  const wordCount = countWords(rendered.plainText)

  return {
    slug,
    title,
    date,
    year: Number(date.slice(0, 4)),
    tags: toStringArray(data.tags),
    categories: toStringArray(data.categories),
    summary: typeof data.summary === 'string' && data.summary ? data.summary : deriveSummary(content),
    cover: typeof data.cover === 'string' && data.cover ? data.cover : undefined,
    draft: data.draft === true,
    readingTime: estimateReadingTime(wordCount),
    wordCount,
    html: rendered.html,
    toc: rendered.toc,
    plainText: rendered.plainText,
    filePath,
  }
}

/** 解析独立页面 */
export function loadPage(filePath: string): LoadedPage {
  const raw = readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  const slug = basename(filePath, extname(filePath))
  const rendered = renderMarkdown(content)

  return {
    slug,
    title:
      typeof data.title === 'string' && data.title ? data.title : deriveTitle(content, slug),
    description:
      typeof data.description === 'string' && data.description
        ? data.description
        : deriveSummary(content),
    html: rendered.html,
    toc: rendered.toc,
    filePath,
  }
}

/** 按名称统计数量并按数量倒序排列 */
function countBy(items: string[]): NameCount[] {
  const map = new Map<string, number>()
  for (const item of items) {
    map.set(item, (map.get(item) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'))
}

/** 读取全站内容 */
export function buildSiteContent(root: string, base = '/'): SiteContent {
  const postFiles = scanMarkdownFiles(join(root, POSTS_DIR))
  const pageFiles = scanMarkdownFiles(join(root, PAGES_DIR))

  const loadedPosts = postFiles.map((file) => loadPost(file))
  const loadedPages = pageFiles.map((file) => loadPage(file))

  // 同一天发布的文章按 slug 排序，保证构建结果稳定
  loadedPosts.sort((a, b) =>
    a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1,
  )

  const published = loadedPosts.filter((post) => !post.draft)

  const posts: PostMeta[] = published.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    year: post.year,
    tags: post.tags,
    categories: post.categories,
    summary: post.summary,
    cover: post.cover,
    draft: post.draft,
    readingTime: post.readingTime,
    wordCount: post.wordCount,
  }))

  const yearMap = new Map<number, number>()
  for (const post of published) {
    yearMap.set(post.year, (yearMap.get(post.year) ?? 0) + 1)
  }
  const years: YearCount[] = [...yearMap.entries()]
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year - a.year)

  const pages: PageMeta[] = loadedPages.map((page) => ({
    slug: page.slug,
    title: page.title,
    description: page.description,
    html: prefixRootRelativeUrls(page.html, base),
    toc: page.toc,
  }))

  const postBodies: Record<string, PostContent> = {}
  const search: SearchEntry[] = []

  for (const post of published) {
    postBodies[post.slug] = { html: prefixRootRelativeUrls(post.html, base), toc: post.toc }
    search.push({
      slug: post.slug,
      title: post.title,
      date: post.date,
      summary: post.summary,
      tags: post.tags,
      categories: post.categories,
      text: post.plainText,
    })
  }

  const totalWords = published.reduce((sum, post) => sum + post.wordCount, 0)
  const lastUpdated = published[0]?.date ?? ''

  return {
    index: {
      posts,
      pages,
      tags: countBy(published.flatMap((post) => post.tags)),
      categories: countBy(published.flatMap((post) => post.categories)),
      years,
      stats: {
        postCount: published.length,
        wordCount: totalWords,
        lastUpdated,
      },
    },
    posts: postBodies,
    search,
  }
}

/** 仅在内容变化时写文件，避免开发态触发无谓的 HMR */
function writeIfChanged(target: string, source: string): void {
  if (existsSync(target) && readFileSync(target, 'utf8') === source) return
  writeFileSync(target, source, 'utf8')
}

/** 把内容产物写入 src/generated，供前端按需加载 */
export function writeGenerated(root: string, content: SiteContent): void {
  const generatedDir = join(root, GENERATED_DIR)
  const postsDir = join(generatedDir, 'posts')

  mkdirSync(postsDir, { recursive: true })

  writeIfChanged(
    join(generatedDir, 'index.json'),
    `${JSON.stringify(content.index, null, 2)}\n`,
  )
  writeIfChanged(
    join(generatedDir, 'search-index.json'),
    `${JSON.stringify(content.search)}\n`,
  )

  // 清理已被删除文章对应的产物文件
  const wanted = new Set(Object.keys(content.posts).map((slug) => `${slug}.json`))
  for (const file of readdirSync(postsDir)) {
    if (file.endsWith('.json') && !wanted.has(file)) {
      rmSync(join(postsDir, file), { force: true })
    }
  }

  for (const [slug, body] of Object.entries(content.posts)) {
    writeIfChanged(join(postsDir, `${slug}.json`), `${JSON.stringify(body)}\n`)
  }
}
