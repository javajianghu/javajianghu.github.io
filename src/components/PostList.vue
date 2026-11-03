<script setup lang="ts">
import { computed, watch } from 'vue'
import { usePageSize } from '@/composables/usePageSize'
import { usePagination } from '@/composables/usePagination'
import type { PostMeta } from '@/types/content'
import EmptyState from './EmptyState.vue'
import Pagination from './Pagination.vue'
import PostCard from './PostCard.vue'

const props = defineProps<{
  posts: PostMeta[]
  emptyTitle?: string
  emptyDescription?: string
}>()

const { pageSize, pageSizeOptions, setPageSize } = usePageSize()
const posts = computed(() => props.posts)
const { totalPages, currentPage, visibleItems, goTo } = usePagination(posts, pageSize)

// 改变每页条数后回到第一页，避免停留在不存在的页码上
watch(pageSize, () => {
  if (currentPage.value !== 1) goTo(1)
})

function onPageSizeChange(event: Event): void {
  setPageSize(Number((event.target as HTMLSelectElement).value))
}
</script>

<template>
  <div>
    <div class="page-head__bar">
      <span class="muted">共 {{ posts.length }} 篇</span>
      <label class="page-size">
        每页显示
        <select class="page-size__select" :value="pageSize" @change="onPageSizeChange">
          <option v-for="option in pageSizeOptions" :key="option" :value="option">{{ option }} 条</option>
        </select>
      </label>
    </div>

    <div v-if="visibleItems.length" class="post-list">
      <PostCard v-for="post in visibleItems" :key="post.slug" :post="post" />
    </div>
    <EmptyState v-else :title="emptyTitle" :description="emptyDescription" />

    <Pagination :page="currentPage" :total-pages="totalPages" @change="goTo" />
  </div>
</template>
