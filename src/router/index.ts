import { createRouter, createWebHistory } from 'vue-router'
import { isListPath, readListScroll, saveListOrigin, saveListScroll } from '@/utils/postOrigin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/HomePage.vue') },
    { path: '/posts/:slug', name: 'post', component: () => import('@/pages/PostPage.vue') },
    { path: '/archive', name: 'archive', component: () => import('@/pages/ArchivePage.vue') },
    { path: '/archive/:year', name: 'archive-year', component: () => import('@/pages/ArchivePage.vue') },
    { path: '/tags', name: 'tags', component: () => import('@/pages/TagsPage.vue') },
    { path: '/tags/:tag', name: 'tag', component: () => import('@/pages/TagPage.vue') },
    { path: '/categories', name: 'categories', component: () => import('@/pages/CategoriesPage.vue') },
    { path: '/categories/:category', name: 'category', component: () => import('@/pages/CategoryPage.vue') },
    { path: '/search', name: 'search', component: () => import('@/pages/SearchPage.vue') },
    { path: '/about', name: 'about', component: () => import('@/pages/AboutPage.vue') },
    { path: '/editor', name: 'editor', component: () => import('@/pages/EditorPage.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFoundPage.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      // 中文锚点在 URL 里是百分号编码的，需要解码后才能定位元素
      const element = document.getElementById(decodeURIComponent(to.hash.slice(1)))
      // 顶部有吸顶导航，向上偏移一段距离，避免标题被遮住
      if (element) return { el: element, top: 80, behavior: 'smooth' }
    }

    // 从文章页返回列表页时，还原离开前的滚动位置
    if (from.name === 'post') {
      const top = readListScroll(to.fullPath)
      if (top !== null) return { top }
    }

    return { top: 0 }
  },
})

// 记录进入文章时所在的列表页，供文章页的「返回」按钮回退。
// 文章之间互跳（上一篇 / 下一篇）不覆盖来源，用户仍能回到最初那个列表页。
router.beforeEach((to, from) => {
  if (to.name !== 'post' || !from.name) return
  if (!isListPath(from.path)) return
  saveListOrigin(from.fullPath)
  saveListScroll(from.fullPath, window.scrollY)
})

export default router
