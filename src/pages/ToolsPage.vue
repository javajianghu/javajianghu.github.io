<script setup lang="ts">
import { computed } from 'vue'
import EmptyState from '@/components/EmptyState.vue'
import { useSeo } from '@/composables/useSeo'
import { siteIndex } from '@/utils/content'

const tools = computed(() => siteIndex.tools)

/** 工具页是站点根目录下的静态文件，链接需要带上部署子路径 */
function toolUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`
}

useSeo(() => ({
  title: '工具箱',
  description: '站内收录的在线工具，直接打开即用',
}))
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-head__title">工具箱</h1>
      <p class="page-head__description">共收录 {{ tools.length }} 个在线工具，点击即在新标签页打开</p>
    </div>

    <div v-if="tools.length" class="tool-list">
      <a
        v-for="tool in tools"
        :key="tool.path"
        class="tool-card"
        :href="toolUrl(tool.path)"
        target="_blank"
        rel="noopener"
      >
        <span class="tool-card__title">{{ tool.title }}</span>
        <span v-if="tool.description" class="tool-card__description">{{ tool.description }}</span>
        <span class="tool-card__path">{{ tool.path }}</span>
      </a>
    </div>

    <EmptyState
      v-else
      title="还没有收录工具"
      description="把单文件工具页放进 public/tools/ 目录，构建后会自动出现在这里。"
    />
  </div>
</template>
