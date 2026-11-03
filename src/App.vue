<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
/** 文章详情页使用可配置的最大宽度，其余页面保持默认容器宽度 */
const isArticlePage = computed(() => route.name === 'post')
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="app__main" :class="{ 'app__main--article': isArticlePage }">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
