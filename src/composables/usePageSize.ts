import { ref } from 'vue'
import siteConfig from '../../site.config.ts'

const STORAGE_KEY = 'posts-per-page'

function readStoredPageSize(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const value = Number(raw)
      if (siteConfig.postsPerPageOptions.includes(value)) return value
    }
  } catch {
    // 隐私模式下 localStorage 可能不可用
  }
  return siteConfig.defaultPostsPerPage
}

// 模块级单例，各页面共享同一份每页条数设置
const pageSize = ref(readStoredPageSize())

export function usePageSize() {
  function setPageSize(value: number): void {
    pageSize.value = value
    try {
      localStorage.setItem(STORAGE_KEY, String(value))
    } catch {
      // 忽略存储异常
    }
  }

  return {
    pageSize,
    pageSizeOptions: siteConfig.postsPerPageOptions,
    setPageSize,
  }
}
