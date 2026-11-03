import MarkdownIt, { type MarkdownIt as MarkdownItInstance } from 'markdown-it'
import anchor from 'markdown-it-anchor'
// markdown-it-emoji v3 不再提供默认导出，full 包含完整 emoji 短代码表
import { full as emoji } from 'markdown-it-emoji'
import hljs from 'highlight.js'
import type { Token } from 'markdown-it'
import type { TocItem } from '../src/types/content.ts'

/**
 * 生成标题锚点 id。
 * 保留中文与字母数字（便于目录锚点可读），仅剔除标点与空白。
 */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** 创建一个配置好的 markdown-it 实例 */
export function createRenderer(): MarkdownItInstance {
  const md = new MarkdownIt({
    // 内容全部来自仓库自身，属于可信来源，允许内联 HTML
    html: true,
    linkify: true,
    breaks: false,
    typographer: false,
    highlight(code: string, lang: string): string {
      const language = lang.trim().split(/\s+/)[0] ?? ''
      if (language && hljs.getLanguage(language)) {
        try {
          const highlighted = hljs.highlight(code, { language, ignoreIllegals: true }).value
          return `<pre class="hljs"><code>${highlighted}</code></pre>`
        } catch {
          // 高亮失败时退回纯文本，不阻断构建
        }
      }
      return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`
    },
  })

  md.use(emoji)
  md.use(anchor, {
    level: [1, 2, 3, 4, 5, 6],
    slugify,
    permalink: anchor.permalink.linkInsideHeader({
      ariaHidden: true,
      placement: 'after',
      class: 'heading-anchor',
      // 用链环图标代替默认的「#」，视觉上更接近 GitHub 的标题锚点
      symbol:
        '<svg class="heading-anchor__icon" viewBox="0 0 16 16" width="14" height="14" ' +
        'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" ' +
        'aria-hidden="true"><path d="M6.5 9.5a2.5 2.5 0 0 0 3.54 0l2-2a2.5 2.5 0 0 0-3.54-3.54l-.7.7"/>' +
        '<path d="M9.5 6.5a2.5 2.5 0 0 0-3.54 0l-2 2a2.5 2.5 0 0 0 3.54 3.54l.7-.7"/></svg>',
    }),
  })

  // 自定义围栏代码块渲染，附带语言标签
  md.renderer.rules.fence = (tokens: Token[], index: number): string => {
    const token = tokens[index]
    if (!token) return ''
    const info = token.info.trim()
    const language = info.split(/\s+/)[0] ?? ''
    const rendered = md.options.highlight?.(token.content, info, '') ?? ''
    const label = language
      ? `<div class="code-block__lang">${md.utils.escapeHtml(language)}</div>`
      : ''
    return `<div class="code-block">${label}${rendered}</div>`
  }

  // 图片默认懒加载
  const defaultImage = md.renderer.rules.image
  md.renderer.rules.image = (tokens, index, options, env, self) => {
    const token = tokens[index]
    if (token) {
      token.attrSet('loading', 'lazy')
    }
    return defaultImage
      ? defaultImage(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options)
  }

  return md
}

const sharedRenderer = createRenderer()

/** 目录只收录 h2 ~ h4，避免 h1 标题与正文目录重复 */
const TOC_LEVELS = new Set([2, 3, 4])

/** 从 token 流中抽取目录树 */
export function extractToc(tokens: Token[]): TocItem[] {
  const flat: TocItem[] = []

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index]
    if (!token || token.type !== 'heading_open') continue

    const inline = tokens[index + 1]
    const level = Number(token.tag.slice(1))
    // markdown-it-anchor 把 id 写在 token 属性上
    const rawId = token.attrGet('id')
    const id = rawId === null ? null : String(rawId)
    if (!id || !inline || !TOC_LEVELS.has(level)) continue

    flat.push({ id, text: inline.content, level, children: [] })
  }

  // 用栈把扁平列表还原成层级结构
  const root: TocItem[] = []
  const stack: TocItem[] = []

  for (const item of flat) {
    while (stack.length > 0 && (stack[stack.length - 1]?.level ?? 0) >= item.level) {
      stack.pop()
    }
    const parent = stack[stack.length - 1]
    if (parent) {
      parent.children.push(item)
    } else {
      root.push(item)
    }
    stack.push(item)
  }

  return root
}

/** 把 HTML 还原为纯文本，用于生成搜索索引 */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

export interface RenderResult {
  html: string
  toc: TocItem[]
  plainText: string
}

/** 渲染 Markdown，返回 HTML、目录与纯文本 */
export function renderMarkdown(source: string): RenderResult {
  const env = {}
  const tokens = sharedRenderer.parse(source, env)
  const html = sharedRenderer.renderer.render(tokens, sharedRenderer.options, env)
  return {
    html,
    toc: extractToc(tokens),
    plainText: htmlToPlainText(html),
  }
}
