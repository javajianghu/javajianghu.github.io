<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import { useSeo } from '@/composables/useSeo'
import { siteIndex } from '@/utils/content'

const route = useRoute()

const category = computed(() => String(route.params.category ?? ''))

const posts = computed(() =>
  siteIndex.posts.filter((post) => post.categories.includes(category.value)),
)

useSeo(() => ({
  title: category.value,
  description: `分类「${category.value}」下的 ${posts.value.length} 篇文章`,
}))
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-head__title">{{ category }}</h1>
      <p class="page-head__description">共 {{ posts.length }} 篇文章</p>
    </div>
    <PostList :posts="posts" empty-title="该分类下还没有文章" />
  </div>
</template>
