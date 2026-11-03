import { computed, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * 基于 URL 查询参数的分页。
 * 把页码放进 URL，好处是可以分享、刷新不丢、前进后退可用。
 */
export function usePagination<T>(items: Ref<T[]>, pageSize: Ref<number>) {
  const route = useRoute()
  const router = useRouter()

  const totalPages = computed(() => Math.max(1, Math.ceil(items.value.length / pageSize.value)))

  const currentPage = computed(() => {
    const raw = Number(route.query.page)
    const page = Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : 1
    return Math.min(page, totalPages.value)
  })

  const visibleItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return items.value.slice(start, start + pageSize.value)
  })

  function goTo(page: number): void {
    const target = Math.min(Math.max(1, page), totalPages.value)
    if (target === currentPage.value) return
    const query = { ...route.query }
    if (target === 1) {
      delete query.page
    } else {
      query.page = String(target)
    }
    router.push({ query }).catch(() => {
      // 忽略重复导航等无意义的失败
    })
  }

  return { totalPages, currentPage, visibleItems, goTo }
}
