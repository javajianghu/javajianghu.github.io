<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import { useSeo } from '@/composables/useSeo'
import { siteIndex } from '@/utils/content'

const route = useRoute()

const year = computed(() => {
  const value = Number(route.params.year)
  return Number.isFinite(value) ? value : null
})

const yearPosts = computed(() =>
  year.value === null ? [] : siteIndex.posts.filter((post) => post.year === year.value),
)

const yearCount = computed(
  () => siteIndex.years.find((item) => item.year === year.value)?.count ?? 0,
)

/** 每个年份下最多展示 5 篇，其余引导到该年份的完整归档 */
const previewLimit = 5

function postsOf(yearValue: number) {
  return siteIndex.posts.filter((post) => post.year === yearValue).slice(0, previewLimit)
}

useSeo(() => ({
  title: year.value === null ? '归档' : `${year.value} 年归档`,
  description:
    year.value === null
      ? '按年份归档的全部文章'
      : `${year.value} 年共发布 ${yearCount.value} 篇文章`,
}))
</script>

<template>
  <div v-if="year === null">
    <div class="page-head">
      <h1 class="page-head__title">归档</h1>
      <p class="page-head__description">按发布年份整理的全部文章</p>
    </div>

    <div v-for="item in siteIndex.years" :key="item.year" class="archive-group">
      <div class="archive-group__year">
        <RouterLink :to="`/archive/${item.year}`" class="archive-group__year-text">
          {{ item.year }}
        </RouterLink>
        <span class="archive-group__count">{{ item.count }} 篇</span>
      </div>
      <ul class="archive-group__items">
        <li v-for="post in postsOf(item.year)" :key="post.slug" class="archive-item">
          <time class="archive-item__date" :datetime="post.date">{{ post.date }}</time>
          <RouterLink :to="`/posts/${post.slug}`" class="archive-item__title">
            {{ post.title }}
          </RouterLink>
        </li>
      </ul>
      <p v-if="item.count > previewLimit" style="margin-top: 8px">
        <RouterLink :to="`/archive/${item.year}`" class="muted">
          查看 {{ item.year }} 年全部 {{ item.count }} 篇 →
        </RouterLink>
      </p>
    </div>
  </div>

  <div v-else>
    <div class="page-head">
      <h1 class="page-head__title">{{ year }} 年归档</h1>
      <p class="page-head__description">共 {{ yearCount }} 篇，最新的在上面</p>
    </div>
    <PostList :posts="yearPosts" empty-title="这一年还没有文章" />
  </div>
</template>
