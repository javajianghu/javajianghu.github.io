<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'

useSeo(() => ({
  title: '404 页面不存在',
  description: '请求的页面不存在',
}))
</script>

<template>
  <div class="empty" style="padding: 80px 20px">
    <p class="empty__title" style="font-size: 40px; margin-bottom: 12px">404</p>
    <p>这个页面走丢了，或者已经被移动到别处。</p>
    <p style="margin-top: 16px">
      <RouterLink to="/">返回首页</RouterLink>
      <span class="muted"> · </span>
      <RouterLink to="/archive">浏览归档</RouterLink>
    </p>
  </div>
</template>
