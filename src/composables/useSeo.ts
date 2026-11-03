import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import siteConfig from '../../site.config.ts'

export interface SeoOptions {
  title?: string
  description?: string
}

/** 更新或创建 head 里的 meta 标签 */
function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${attr}="${key}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

/** 更新 canonical 链接 */
function setCanonical(href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

/**
 * 维护页面的 SEO 信息。
 * 单页应用切换路由时不会重新加载，需要在路由变化后手动更新这些标签。
 */
export function useSeo(options: () => SeoOptions): void {
  const route = useRoute()

  watchEffect(() => {
    const { title, description } = options()
    const fullTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title
    const content = description || siteConfig.description
    // route.path 不含部署 base，拼接时需要自己补上
    const base = import.meta.env.BASE_URL
    const url = `${siteConfig.url.replace(/\/+$/, '')}${base}${route.path.replace(/^\/+/, '')}`
    document.title = fullTitle
    setMeta('name', 'description', content)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', content)
    setMeta('property', 'og:url', url)
    setCanonical(url)
  })
}
