/** 站点级配置 */
export interface SiteConfig {
  title: string
  subtitle: string
  description: string
  lang: string
  url: string
  repo: string
  author: {
    name: string
    avatar?: string
    bio?: string
  }
  keywords: string[]
  /** 文章详情页最大宽度（px），控制正文占页面的比例 */
  articleWidth: number
  postsPerPageOptions: number[]
  defaultPostsPerPage: number
  nav: Array<{ label: string; to: string }>
  social: Array<{ label: string; href: string }>
}

/** 目录树节点 */
export interface TocItem {
  id: string
  text: string
  level: number
  children: TocItem[]
}

/** 文章元信息（不含正文，用于列表页与索引） */
export interface PostMeta {
  slug: string
  title: string
  /** ISO 日期，形如 2024-05-24 */
  date: string
  /** 归档年份，取自 date */
  year: number
  tags: string[]
  categories: string[]
  summary: string
  cover?: string
  /** 草稿：true 时不出现在列表与归档中 */
  draft: boolean
  /** 预计阅读时长（分钟） */
  readingTime: number
  /** 正文字数（中英文混合统计） */
  wordCount: number
}

/** 文章正文产物 */
export interface PostContent {
  html: string
  toc: TocItem[]
}

/** 独立页面（如「关于我」） */
export interface PageMeta {
  slug: string
  title: string
  description: string
  html: string
  toc: TocItem[]
}

/** 工具页元信息（tools 目录下的独立单文件页面） */
export interface ToolMeta {
  /** 站点根路径下的文件名，如 esp32.html */
  path: string
  /** 工具名称，取自 HTML 的 <title> */
  title: string
  /** 工具简介，取自 <meta name="description"> */
  description: string
}

/** 名称 + 数量的统计项，用于标签墙、分类页 */
export interface NameCount {
  name: string
  count: number
}

/** 年份 + 数量的统计项，用于归档页 */
export interface YearCount {
  year: number
  count: number
}

/** 全站索引，构建期生成 */
export interface SiteIndex {
  posts: PostMeta[]
  pages: PageMeta[]
  tools: ToolMeta[]
  tags: NameCount[]
  categories: NameCount[]
  years: YearCount[]
  stats: {
    postCount: number
    wordCount: number
    lastUpdated: string
  }
}

/** 搜索索引条目 */
export interface SearchEntry {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  categories: string[]
  /** 纯文本正文，用于全文匹配 */
  text: string
}

/** 搜索命中结果 */
export interface SearchHit {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  /** 命中片段（带高亮标记前的纯文本） */
  snippet: string
  /** 命中位置在 text 中的下标 */
  score: number
}
