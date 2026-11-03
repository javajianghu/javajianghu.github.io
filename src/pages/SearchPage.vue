<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EmptyState from '@/components/EmptyState.vue'
import { useSearch } from '@/composables/useSearch'
import { useSeo } from '@/composables/useSeo'
import { siteIndex } from '@/utils/content'

const route = useRoute()
const router = useRouter()
const { hits, loading, search } = useSearch()

const keyword = ref(String(route.query.q ?? ''))
let timer: number | undefined

// URL 里的关键词变化时执行搜索，保证前进后退与分享链接都能命中
watch(
  () => route.query.q,
  (value) => {
    const query = String(value ?? '')
    keyword.value = query
    void search(query)
  },
  { immediate: true },
)

// 输入停止 300ms 后把关键词同步到 URL
watch(keyword, (value) => {
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    const query = value.trim()
    router.replace({ query: query ? { q: query } : {} }).catch(() => {
      // 忽略重复导航
    })
  }, 300)
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
})

useSeo(() => ({
  title: '搜索',
  description: `在 ${siteIndex.stats.postCount} 篇文章中全文检索`,
}))
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-head__title">搜索</h1>
      <p class="page-head__description">在 {{ siteIndex.stats.postCount }} 篇文章中全文检索</p>
    </div>

    <div class="search-box">
      <svg
        class="search-box__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        v-model="keyword"
        class="search-box__input"
        type="search"
        placeholder="输入关键词，例如 Docker、Kafka、Nacos…"
      />
    </div>

    <p v-if="loading" class="muted">搜索中…</p>

    <template v-else-if="keyword.trim()">
      <p class="muted" style="margin: 16px 0 8px">找到 {{ hits.length }} 条结果</p>
      <div v-if="hits.length" class="post-list">
        <RouterLink v-for="hit in hits" :key="hit.slug" :to="`/posts/${hit.slug}`" class="post-card">
          <h2 class="post-card__title">{{ hit.title }}</h2>
          <p class="post-card__summary">{{ hit.snippet }}</p>
          <div class="post-card__meta">
            <time :datetime="hit.date">{{ hit.date }}</time>
            <span class="post-card__meta-sep" aria-hidden="true" />
            <span v-for="tag in hit.tags" :key="tag">#{{ tag }}</span>
          </div>
        </RouterLink>
      </div>
      <EmptyState v-else title="没有找到相关内容" description="换个关键词试试，或者浏览归档。" />
    </template>
  </div>
</template>
