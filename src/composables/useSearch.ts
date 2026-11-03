import { ref } from 'vue'
import { loadSearchIndex } from '@/utils/content'
import { rankEntries } from '@/utils/search'
import type { SearchEntry, SearchHit } from '@/types/content'

/** 搜索索引只加载一次，之后复用 */
let indexPromise: Promise<SearchEntry[]> | null = null

function getIndex(): Promise<SearchEntry[]> {
  if (!indexPromise) indexPromise = loadSearchIndex()
  return indexPromise
}

export function useSearch() {
  const keyword = ref('')
  const hits = ref<SearchHit[]>([])
  const loading = ref(false)

  async function search(raw: string): Promise<void> {
    keyword.value = raw
    const query = raw.trim().toLowerCase()

    if (!query) {
      hits.value = []
      return
    }

    loading.value = true
    try {
      hits.value = rankEntries(await getIndex(), query)
    } finally {
      loading.value = false
    }
  }

  return { keyword, hits, loading, search }
}
