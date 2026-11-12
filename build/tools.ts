import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import type { ToolMeta } from '../src/types/content.ts'

/**
 * 工具页所在目录（相对项目根目录）。
 * 工具页不放在 public 下：public 会整体拷贝到产物，
 * 而工具页需要直接出现在站点根路径（/esp32.html），由构建插件单独输出。
 */
export const TOOLS_DIR = 'tools'

/** 工具页静态资源：站点根路径下的文件名 + 文件内容 */
export interface ToolAsset {
  /** 站点根路径下的文件名，如 esp32.html */
  fileName: string
  /** 文件内容 */
  source: string
}

/** 递归收集目录下的 HTML 文件 */
function scanHtmlFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...scanHtmlFiles(fullPath))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      files.push(fullPath)
    }
  }
  return files.sort()
}

/**
 * 只在 <head> 里找标题与描述。
 * 工具页常把压缩后的脚本内联在 <body> 中，直接扫全文容易误命中脚本里的字符串。
 */
function extractHead(html: string): string {
  return html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html
}

/** 提取 <title> 内容，缺失时用兜底值 */
function extractTitle(head: string, fallback: string): string {
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()
  return title || fallback
}

/** 提取 <meta name="description"> 的 content，没有则返回空字符串 */
function extractDescription(head: string): string {
  const tags = head.match(/<meta[^>]*>/gi) ?? []
  for (const tag of tags) {
    if (!/name=["']description["']/i.test(tag)) continue
    const content = tag.match(/content=["']([^"']*)["']/i)?.[1]?.trim()
    if (content) return content
  }
  return ''
}

/**
 * 扫描工具目录，生成工具清单。
 * 工具页是独立的单文件页面，不参与 Vue 应用的路由，这里只收集展示所需的元信息。
 */
export function scanTools(root: string): ToolMeta[] {
  const dir = join(root, TOOLS_DIR)
  if (!existsSync(dir)) return []

  return scanHtmlFiles(dir).map((file) => {
    const html = readFileSync(file, 'utf8')
    const head = extractHead(html)
    // 统一用 / 作为分隔符，保证产物里的路径与操作系统无关
    const fileName = relative(dir, file).split(sep).join('/')
    const name = fileName.replace(/\.html$/i, '')

    return {
      path: fileName,
      title: extractTitle(head, name),
      description: extractDescription(head),
    }
  })
}

/**
 * 收集工具页文件，供构建插件原样输出到站点根路径。
 * 工具页不参与打包与压缩，保持单文件、可离线打开。
 */
export function collectToolAssets(root: string): ToolAsset[] {
  const dir = join(root, TOOLS_DIR)
  if (!existsSync(dir)) return []

  return scanHtmlFiles(dir).map((file) => ({
    fileName: relative(dir, file).split(sep).join('/'),
    source: readFileSync(file, 'utf8'),
  }))
}
