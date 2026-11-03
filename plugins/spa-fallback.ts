import type { Plugin } from 'vite'

export interface SpaFallbackOptions {
  /** 站点部署的子路径，形如 / 或 /my-blog/ */
  base: string
}

/** 会话级键：存放 GitHub Pages 404 回退时需要恢复的原始路径 */
export const REDIRECT_STORAGE_KEY = 'site:redirect'

/** 拼接 404.html 中的跳转脚本 */
function buildRedirectScript(base: string): string {
  return [
    '<script>',
    '(function () {',
    `  var base = ${JSON.stringify(base)};`,
    '  var path = location.pathname;',
    '  if (path.indexOf(base) === 0) {',
    '    var rest = path.slice(base.length) + location.search + location.hash;',
    `    try { sessionStorage.setItem(${JSON.stringify(REDIRECT_STORAGE_KEY)}, rest); } catch (e) {}`,
    '  }',
    '  location.replace(base);',
    '})();',
    '</script>',
  ].join('\n')
}

/**
 * 生成 404.html。
 *
 * GitHub Pages 对任何不存在的路径都返回 404.html。若直接放一份 index.html，
 * 页面虽然能打开，但响应状态码是 404，对 SEO 不友好。
 * 这里改为：404.html 记录原始路径后跳转到站点根路径，
 * 应用启动时再把地址栏还原成真实路由（见 src/main.ts）。
 */
export function spaFallbackPlugin(options: SpaFallbackOptions): Plugin {
  const base = options.base.endsWith('/') ? options.base : `${options.base}/`

  return {
    name: 'blog:spa-fallback',
    apply: 'build',

    generateBundle() {
      const html = [
        '<!DOCTYPE html>',
        '<html lang="zh-CN">',
        '  <head>',
        '    <meta charset="UTF-8" />',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        '    <meta name="robots" content="noindex" />',
        '    <title>正在跳转…</title>',
        buildRedirectScript(base),
        '  </head>',
        '  <body>',
        `    <p>正在跳转，如果未自动跳转，请<a href="${base}">点击这里返回首页</a>。</p>`,
        '  </body>',
        '</html>',
        '',
      ].join('\n')

      this.emitFile({ type: 'asset', fileName: '404.html', source: html })
    },
  }
}
