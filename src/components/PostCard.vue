<script setup lang="ts">
import type { PostMeta } from '@/types/content'
import { formatDate } from '@/utils/text'

defineProps<{ post: PostMeta }>()
</script>

<template>
  <RouterLink :to="`/posts/${post.slug}`" class="post-card">
    <h2 class="post-card__title">{{ post.title }}</h2>
    <p v-if="post.summary" class="post-card__summary">{{ post.summary }}</p>
    <div class="post-card__meta">
      <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      <span class="post-card__meta-sep" aria-hidden="true" />
      <span>{{ post.readingTime }} 分钟阅读</span>
      <template v-if="post.categories.length">
        <span class="post-card__meta-sep" aria-hidden="true" />
        <span>{{ post.categories.join(' / ') }}</span>
      </template>
    </div>
  </RouterLink>
</template>
