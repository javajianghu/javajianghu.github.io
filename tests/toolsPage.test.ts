import { renderToString } from '@vue/server-renderer'
import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it, vi } from 'vitest'
import ToolsPage from '@/pages/ToolsPage.vue'

/** node 测试环境没有 DOM，这里提供最小可用的 document 桩，供 useSeo 写入标题与 meta 标签 */
function stubDocument(): void {
  vi.stubGlobal('document', {
    title: '',
    createElement: () => ({ setAttribute: () => {} }),
    head: { querySelector: () => null, appendChild: () => {} },
  })
}

/** 渲染工具页，返回 HTML 字符串 */
async function renderToolsPage(): Promise<string> {
  stubDocument()

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/tools', component: ToolsPage }],
  })
  const app = createApp(ToolsPage)
  app.use(router)
  await router.push('/tools')
  await router.isReady()

  return renderToString(app)
}

describe('ToolsPage', () => {
  it('渲染出工具卡片，链接指向工具页本身', async () => {
    const html = await renderToolsPage()

    expect(html).toContain('class="tool-list"')
    expect(html).toContain('href="/esp32.html"')
    expect(html).toContain('ESP32 固件管理工具')
  })

  it('工具页在新标签页打开，避免跳出站点', async () => {
    const html = await renderToolsPage()

    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener"')
  })
})
