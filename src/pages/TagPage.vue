<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import { useSeo } from '@/composables/useSeo'
import { siteIndex } from '@/utils/content'

const route = useRoute()

const tag = computed(() => String(route.params.tag ?? ''))

const posts = computed(() => siteIndex.posts.filter((post) => post.tags.includes(tag.value)))

useSeo(() => ({
  title: `#${tag.value}`,
  description: `标签「${tag.value}」下的 ${posts.value.length} 篇文章`,
}))
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-head__title"># {{ tag }}</h1>
      <p class="page-head__description">共 {{ posts.length }} 篇文章</p>
    </div>
    <PostList :posts="posts" empty-title="该标签下还没有文章" />
  </div>
</template>
