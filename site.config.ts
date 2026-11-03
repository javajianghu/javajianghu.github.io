import type { SiteConfig } from './src/types/content.ts'

/** 文章页最大宽度（px）的合法区间，超出后正文排版会明显失衡 */
export const ARTICLE_WIDTH_LIMITS = { min: 640, max: 1600 } as const

/** 文章页默认最大宽度（px），也是配置非法时的兜底值 */
export const DEFAULT_ARTICLE_WIDTH = 1180

/**
 * 站点全局配置
 * 站内所有页面（标题、导航、作者信息等）都从这里读取，改这里即可调整全站。
 */
const siteConfig: SiteConfig = {
  title: 'Java江湖侠客岛',
  subtitle: '一个技术人的随笔',
  description: '记录后端、分布式与工具链实践的技术博客。',
  lang: 'zh-CN',
  /** 站点正式域名，用于 canonical 等绝对地址 */
  url: 'https://javajianghu.top',
  repo: 'https://github.com/javajianghu',
  author: {
    name: 'javajianghu',
    avatar: 'https://github.com/javajianghu.png',
    bio: '后端工程师，关注 Java、分布式与中间件。',
  },
  keywords: ['Java', '后端', '分布式', '中间件', 'Docker', 'MySQL', 'Kafka'],
  /**
   * 文章详情页的最大宽度（px），控制正文占页面的比例。
   * 调大正文更宽，目录在空间足够时固定在右侧；超出视口时自动收缩。
   */
  articleWidth: DEFAULT_ARTICLE_WIDTH,
  /** 文章列表每页条数的可选值，用户可在页面上切换 */
  postsPerPageOptions: [10, 20, 50],
  defaultPostsPerPage: 10,
  nav: [
    { label: '首页', to: '/' },
    { label: '归档', to: '/archive' },
    { label: '标签', to: '/tags' },
    { label: '分类', to: '/categories' },
    { label: '关于', to: '/about' },
    { label: '写作', to: '/editor' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/javajianghu' },
    { label: '知识星球', href: 'https://t.zsxq.com/MV7ea62' },
  ],
}

export default siteConfig
