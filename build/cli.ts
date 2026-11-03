/**
 * 内容构建命令行入口。
 * 供类型检查与测试在编译前准备 src/generated 产物。
 */
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildSiteContent, writeGenerated } from './content.ts'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const base = process.env.VITE_BASE?.trim() || '/'

const content = buildSiteContent(root, base.endsWith('/') ? base : `${base}/`)
writeGenerated(root, content)

console.log(
  `内容构建完成：${content.index.posts.length} 篇文章，` +
    `${content.index.pages.length} 个独立页面，` +
    `${content.index.tags.length} 个标签，` +
    `${content.index.categories.length} 个分类。`,
)
