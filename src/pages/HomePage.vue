<script setup lang="ts">
import PostList from '@/components/PostList.vue'
import { useSeo } from '@/composables/useSeo'
import { siteIndex } from '@/utils/content'
import siteConfig from '../../site.config.ts'

useSeo(() => ({
  description: siteConfig.description,
}))
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-head__title">最新文章</h1>
      <p class="page-head__description">
        共 {{ siteIndex.stats.postCount }} 篇 · 约
        {{ Math.round(siteIndex.stats.wordCount / 1000) }} 千字 · 最后更新于
        {{ siteIndex.stats.lastUpdated }}
      </p>
    </div>
    <PostList
      :posts="siteIndex.posts"
      empty-title="还没有发布文章"
      empty-description="在 content/posts/ 下添加 Markdown 文件即可。"
    />
  </div>
</template>
