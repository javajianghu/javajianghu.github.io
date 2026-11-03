<script setup lang="ts">
import { computed } from 'vue'
import { buildPageItems, type PageItem } from '@/utils/pagination'

const props = defineProps<{ page: number; totalPages: number }>()
const emit = defineEmits<{ change: [page: number] }>()

const items = computed<PageItem[]>(() => buildPageItems(props.page, props.totalPages))
</script>

<template>
  <nav v-if="items.length" class="pagination" aria-label="分页导航">
    <button class="pagination__item" type="button" :disabled="page <= 1" @click="emit('change', page - 1)">
      上一页
    </button>
    <template v-for="(item, index) in items" :key="`${item}-${index}`">
      <span v-if="item === 'gap'" class="pagination__ellipsis" aria-hidden="true">…</span>
      <button
        v-else
        class="pagination__item"
        :class="{ 'pagination__item--active': item === page }"
        type="button"
        :aria-current="item === page ? 'page' : undefined"
        @click="emit('change', item)"
      >
        {{ item }}
      </button>
    </template>
    <button
      class="pagination__item"
      type="button"
      :disabled="page >= totalPages"
      @click="emit('change', page + 1)"
    >
      下一页
    </button>
  </nav>
</template>
