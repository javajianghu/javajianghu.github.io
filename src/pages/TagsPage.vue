<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import { siteIndex } from '@/utils/content'

useSeo(() => ({
  title: '标签',
  description: `按标签浏览文章，共 ${siteIndex.tags.length} 个标签`,
}))
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-head__title">标签</h1>
      <p class="page-head__description">共 {{ siteIndex.tags.length }} 个标签</p>
    </div>

    <div class="taxonomy-grid">
      <RouterLink
        v-for="tag in siteIndex.tags"
        :key="tag.name"
        :to="`/tags/${encodeURIComponent(tag.name)}`"
        class="taxonomy-card"
      >
        <span class="taxonomy-card__name"># {{ tag.name }}</span>
        <span class="taxonomy-card__count">{{ tag.count }} 篇</span>
      </RouterLink>
    </div>
  </div>
</template>
