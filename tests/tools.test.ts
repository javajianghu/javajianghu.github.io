import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { collectToolAssets, scanTools, TOOLS_DIR } from '../build/tools.ts'

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const tempRoots: string[] = []

/** 创建一个临时的项目根目录，并在其中写入工具页 */
function createFixture(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'blog-tools-'))
  tempRoots.push(root)
  for (const [name, content] of Object.entries(files)) {
    const target = join(root, TOOLS_DIR, name)
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, content, 'utf8')
  }
  return root
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true })
  }
})

describe('scanTools', () => {
  it('读取 <title> 与 <meta name="description"> 作为标题和简介', () => {
    const root = createFixture({
      'demo.html': `<!DOCTYPE html>
<html><head>
<title>示例工具</title>
<meta name="description" content="一个示例工具" />
</head><body>正文</body></html>`,
    })

    expect(scanTools(root)).toEqual([
      { path: 'demo.html', title: '示例工具', description: '一个示例工具' },
    ])
  })

  it('缺少 <title> 时用文件名兜底，缺少描述时留空', () => {
    const root = createFixture({
      'plain.html': '<html><head></head><body>只有正文</body></html>',
    })

    expect(scanTools(root)).toEqual([
      { path: 'plain.html', title: 'plain', description: '' },
    ])
  })

  it('忽略非 HTML 文件', () => {
    const root = createFixture({
      'demo.html': '<html><head><title>示例</title></head></html>',
      'readme.md': '# 说明',
    })

    expect(scanTools(root).map((tool) => tool.path)).toEqual(['demo.html'])
  })

  it('递归收集子目录下的工具页，路径统一用 / 分隔', () => {
    const root = createFixture({
      'demo.html': '<html><head><title>示例</title></head></html>',
      'group/sub.html': '<html><head><title>子目录示例</title></head></html>',
    })

    expect(scanTools(root)).toEqual([
      { path: 'demo.html', title: '示例', description: '' },
      { path: 'group/sub.html', title: '子目录示例', description: '' },
    ])
  })

  it('工具目录不存在时返回空清单', () => {
    const root = mkdtempSync(join(tmpdir(), 'blog-tools-'))
    tempRoots.push(root)

    expect(scanTools(root)).toEqual([])
  })

  it('仓库里的工具页能被扫描到', () => {
    const tools = scanTools(projectRoot)

    expect(tools.some((tool) => tool.title === 'ESP32 固件管理工具')).toBe(true)
  })
})

describe('collectToolAssets', () => {
  it('输出站点根路径下的文件名与原始内容', () => {
    const content = '<html><head><title>示例</title></head></html>'
    const root = createFixture({ 'demo.html': content })

    expect(collectToolAssets(root)).toEqual([{ fileName: 'demo.html', source: content }])
  })

  it('工具目录不存在时没有可输出的资源', () => {
    const root = mkdtempSync(join(tmpdir(), 'blog-tools-'))
    tempRoots.push(root)

    expect(collectToolAssets(root)).toEqual([])
  })
})
