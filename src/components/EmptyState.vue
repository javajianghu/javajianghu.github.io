<script setup lang="ts">
defineProps<{ title?: string; description?: string }>()
</script>

<template>
  <div class="empty">
    <p class="empty__title">{{ title ?? '这里还什么都没有' }}</p>
    <p v-if="description">{{ description }}</p>
  </div>
</template>
