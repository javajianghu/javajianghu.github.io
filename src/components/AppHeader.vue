<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import siteConfig from '../../site.config.ts'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const menuOpen = ref(false)

// 路由变化后自动收起移动端菜单
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/" class="header__brand">
        {{ siteConfig.title }}
        <span class="header__subtitle">{{ siteConfig.subtitle }}</span>
      </RouterLink>

      <nav class="header__nav" :class="{ 'header__nav--open': menuOpen }">
        <RouterLink v-for="item in siteConfig.nav" :key="item.to" :to="item.to" class="header__link">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header__actions">
        <RouterLink to="/search" class="icon-button" aria-label="搜索" title="搜索">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </RouterLink>
        <ThemeToggle />
        <button
          class="icon-button header__toggle"
          type="button"
          aria-label="切换菜单"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
