<script setup lang="ts">
import type { TocItem } from '@/types/content'
import TocNode from './TocNode.vue'

defineProps<{ items: TocItem[] }>()
</script>

<template>
  <nav v-if="items.length" class="toc" aria-label="文章目录">
    <p class="toc__title">目录</p>
    <ul class="toc__list">
      <TocNode v-for="item in items" :key="item.id" :item="item" />
    </ul>
  </nav>
  <p v-else class="toc__empty">本文暂无目录</p>
</template>
