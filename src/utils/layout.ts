import siteConfig, { ARTICLE_WIDTH_LIMITS, DEFAULT_ARTICLE_WIDTH } from '../../site.config.ts'

/**
 * 文章页最大宽度（px）。
 * 配置值超出合法区间时夹到边界，非数字时回退默认值，
 * 避免正文被压扁或拉得过散。
 */
export function resolveArticleWidth(width: number = siteConfig.articleWidth): number {
  if (!Number.isFinite(width)) return DEFAULT_ARTICLE_WIDTH
  return Math.min(Math.max(width, ARTICLE_WIDTH_LIMITS.min), ARTICLE_WIDTH_LIMITS.max)
}
