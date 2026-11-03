import { join } from 'node:path'
import type { Plugin } from 'vite'
import { buildSiteContent, writeGenerated } from '../build/content.ts'
import type { SiteConfig } from '../src/types/content.ts'

export interface ContentPluginOptions {
  /** 项目根目录 */
  root: string
  /** 站点部署的子路径 */
  base: string
  site: SiteConfig
}

/**
 * 内容构建插件。
 * 开发态监听 content/ 目录并重建产物。
 */
export function contentPlugin(options: ContentPluginOptions): Plugin {
  const contentDir = join(options.root, 'content')
  let current = buildSiteContent(options.root, options.base)
  writeGenerated(options.root, current)

  const rebuild = (): void => {
    current = buildSiteContent(options.root, options.base)
    writeGenerated(options.root, current)
  }

  return {
    name: 'blog:content',

    buildStart() {
      rebuild()
    },

    transformIndexHtml(html) {
      const base = options.base.endsWith('/') ? options.base : `${options.base}/`
      return html
        .replace(/\{\{base\}\}/g, base)
        .replace(/\{\{siteTitle\}\}/g, options.site.title)
        .replace(/\{\{siteDescription\}\}/g, options.site.description)
        .replace(/\{\{siteKeywords\}\}/g, options.site.keywords.join(','))
        .replace(/\{\{siteAuthor\}\}/g, options.site.author.name)
    },

    configureServer(server) {
      server.watcher.add(contentDir)

      const onChange = (file: string): void => {
        if (!file.startsWith(contentDir)) return
        rebuild()
      }

      server.watcher.on('add', onChange)
      server.watcher.on('change', onChange)
      server.watcher.on('unlink', onChange)
    },

  }
}
