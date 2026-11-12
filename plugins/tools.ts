import { existsSync, readFileSync } from 'node:fs'
import { join, resolve, sep } from 'node:path'
import type { Plugin } from 'vite'
import { collectToolAssets, TOOLS_DIR } from '../build/tools.ts'

export interface ToolsPluginOptions {
  /** 项目根目录 */
  root: string
}

/**
 * 工具页发布插件。
 *
 * 工具页放在项目根目录的 tools/ 下，构建时原样输出到站点根路径（/esp32.html），
 * 不经过 Vue 应用与路由；开发态用中间件提供同样的访问地址。
 */
export function toolsPlugin(options: ToolsPluginOptions): Plugin {
  const toolsDir = join(options.root, TOOLS_DIR)

  return {
    name: 'blog:tools',

    generateBundle() {
      for (const asset of collectToolAssets(options.root)) {
        this.emitFile({ type: 'asset', fileName: asset.fileName, source: asset.source })
      }
    },

    configureServer(server) {
      // 开发态把工具页挂在站点根路径下，与生产产物保持同一套地址
      server.middlewares.use((req, res, next) => {
        // noUncheckedIndexedAccess 下 split 的结果需要兜底
        const pathname = (req.url ?? '').split('?')[0] ?? ''
        const name = decodeURIComponent(pathname.slice(1))
        if (!name.endsWith('.html')) return next()

        const file = resolve(toolsDir, name)
        // 只允许访问 tools 目录内的文件，避免路径穿越
        if (!file.startsWith(toolsDir + sep) || !existsSync(file)) return next()

        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(readFileSync(file))
      })
    },
  }
}
