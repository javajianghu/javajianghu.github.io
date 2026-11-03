import { describe, expect, it } from 'vitest'
import siteConfig, { ARTICLE_WIDTH_LIMITS, DEFAULT_ARTICLE_WIDTH } from '../site.config.ts'
import { resolveArticleWidth } from '../src/utils/layout.ts'

describe('resolveArticleWidth', () => {
  it('默认使用站点配置里的文章页宽度', () => {
    expect(resolveArticleWidth()).toBe(siteConfig.articleWidth)
  })

  it('宽度小于下限时抬到下限，避免正文被压扁', () => {
    expect(resolveArticleWidth(320)).toBe(ARTICLE_WIDTH_LIMITS.min)
  })

  it('宽度大于上限时压到上限，避免正文行长过长', () => {
    expect(resolveArticleWidth(3000)).toBe(ARTICLE_WIDTH_LIMITS.max)
  })

  it('区间内的宽度原样返回', () => {
    expect(resolveArticleWidth(1000)).toBe(1000)
  })

  it('配置值非法时回退默认宽度', () => {
    expect(resolveArticleWidth(Number.NaN)).toBe(DEFAULT_ARTICLE_WIDTH)
    expect(resolveArticleWidth(Number.POSITIVE_INFINITY)).toBe(DEFAULT_ARTICLE_WIDTH)
  })
})
