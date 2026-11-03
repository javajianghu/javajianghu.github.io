<script setup lang="ts">
import { computed } from 'vue'
import EmptyState from '@/components/EmptyState.vue'
import { useSeo } from '@/composables/useSeo'
import { siteIndex } from '@/utils/content'

const page = computed(() => siteIndex.pages.find((item) => item.slug === 'about'))

useSeo(() => ({
  title: page.value?.title ?? '关于我',
  description: page.value?.description,
}))
</script>

<template>
  <div v-if="page">
    <div class="page-head">
      <h1 class="page-head__title">{{ page.title }}</h1>
    </div>
    <div class="markdown" v-html="page.html" />
  </div>
  <EmptyState v-else title="页面不存在" description="content/pages/about.md 缺失。" />
</template>
