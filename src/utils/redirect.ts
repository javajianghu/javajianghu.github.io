/** 与 plugins/spa-fallback.ts 中的键保持一致 */
const REDIRECT_STORAGE_KEY = 'site:redirect'

/**
 * 还原 GitHub Pages 404 回退时被记录的真实路径。
 *
 * 访问 /posts/xxx 这类深链接时，GitHub Pages 会返回 404.html，
 * 由该页面记录路径并跳转到站点根路径，这里再把地址栏改回原路径。
 */
export function restoreRedirect(): void {
  try {
    const stored = sessionStorage.getItem(REDIRECT_STORAGE_KEY)
    if (!stored) return

    sessionStorage.removeItem(REDIRECT_STORAGE_KEY)

    const base = import.meta.env.BASE_URL
    const target = `${base}${stored.replace(/^\/+/, '')}`
    const current = `${window.location.pathname}${window.location.search}`
    if (current !== target) {
      window.history.replaceState(null, '', target)
    }
  } catch {
    // 隐私模式下 sessionStorage 可能不可用，忽略即可
  }
}
