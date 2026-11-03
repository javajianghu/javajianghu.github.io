<script setup lang="ts">
import siteConfig from '../../site.config.ts'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <span>© {{ year }} {{ siteConfig.author.name }} · 基于 Vue 3 + Vite 构建</span>
      <div class="footer__links">
        <a v-for="item in siteConfig.social" :key="item.href" :href="item.href" target="_blank" rel="noopener">
          {{ item.label }}
        </a>
      </div>
    </div>
  </footer>
</template>
