import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { restoreRedirect } from './utils/redirect'
import { resolveArticleWidth } from './utils/layout.ts'
import './styles/index.css'

// GitHub Pages 的 404 回退：把地址栏还原成真实路由。
// 必须在路由实例创建前执行，否则路由会读到跳转后的路径。
restoreRedirect()

// 文章页宽度由站点配置驱动，改 site.config.ts 的 articleWidth 即可调整正文占比。
document.documentElement.style.setProperty('--article-width', `${resolveArticleWidth()}px`)

createApp(App).use(router).mount('#app')
