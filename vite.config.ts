import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import siteConfig from './site.config.ts'
import { contentPlugin } from './plugins/content.ts'
import { spaFallbackPlugin } from './plugins/spa-fallback.ts'
import { toolsPlugin } from './plugins/tools.ts'

const root = fileURLToPath(new URL('.', import.meta.url))

/**
 * 站点部署的子路径。
 * 用户主页（username.github.io）用 '/'，项目页（username.github.io/repo/）用 '/repo/'。
 * 也可通过 VITE_BASE 环境变量覆盖：VITE_BASE=/my-blog/ npm run build
 */
const rawBase = process.env.VITE_BASE?.trim() || '/'
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

export default defineConfig({
  base,
  plugins: [
    vue(),
    contentPlugin({ root, base, site: siteConfig }),
    toolsPlugin({ root }),
    spaFallbackPlugin({ base }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 生成 sourcemap 会显著增大产物，博客站点没有排查线上源码的必要
    sourcemap: false,
  },
})
