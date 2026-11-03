<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import { siteIndex } from '@/utils/content'

useSeo(() => ({
  title: '分类',
  description: `按分类浏览文章，共 ${siteIndex.categories.length} 个分类`,
}))
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-head__title">分类</h1>
      <p class="page-head__description">共 {{ siteIndex.categories.length }} 个分类</p>
    </div>

    <div class="taxonomy-grid">
      <RouterLink
        v-for="category in siteIndex.categories"
        :key="category.name"
        :to="`/categories/${encodeURIComponent(category.name)}`"
        class="taxonomy-card"
      >
        <span class="taxonomy-card__name">{{ category.name }}</span>
        <span class="taxonomy-card__count">{{ category.count }} 篇</span>
      </RouterLink>
    </div>
  </div>
</template>
