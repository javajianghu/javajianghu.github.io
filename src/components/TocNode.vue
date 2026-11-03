<script setup lang="ts">
import type { TocItem } from '@/types/content'

defineProps<{ item: TocItem }>()
</script>

<template>
  <li class="toc__item" :class="`toc__item--level-${item.level}`">
    <a :href="`#${item.id}`">{{ item.text }}</a>
    <ul v-if="item.children.length" class="toc__list">
      <TocNode v-for="child in item.children" :key="child.id" :item="child" />
    </ul>
  </li>
</template>
