<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TableOfContents from '@/components/TableOfContents.vue'
import { useSeo } from '@/composables/useSeo'
import type { PostContent, PostMeta } from '@/types/content'
import { readListOrigin, resolveListLabel } from '@/utils/postOrigin'
import { formatDate } from '@/utils/text'
import { loadPostContent, siteIndex } from '@/utils/content'

const route = useRoute()
const router = useRouter()

const slug = computed(() => String(route.params.slug ?? ''))
const post = computed<PostMeta | undefined>(() =>
  siteIndex.posts.find((item) => item.slug === slug.value),
)

const content = ref<PostContent | null>(null)
const loading = ref(true)
const articleEl = ref<HTMLElement | null>(null)

/** 上一篇是更早的文章，下一篇是更新的文章 */
const currentIndex = computed(() => siteIndex.posts.findIndex((item) => item.slug === slug.value))
const newerPost = computed<PostMeta | undefined>(() => siteIndex.posts[currentIndex.value - 1])
const olderPost = computed<PostMeta | undefined>(() => siteIndex.posts[currentIndex.value + 1])

const base = import.meta.env.BASE_URL
const internalPrefixes = ['/posts/', '/archive', '/tags', '/categories', '/about', '/search', '/editor']

/** 进入本文时所在的列表页；没有记录时回落到首页列表 */
const originPath = readListOrigin() ?? '/'
/** 返回按钮文案，例如「首页」「归档」「搜索结果」 */
const originLabel = resolveListLabel(originPath)

/** 返回进入本文时的那个列表页 */
function goBack(): void {
  router.push(originPath).catch(() => {
    // 忽略导航失败（例如已经在目标页）
  })
}

async function load(): Promise<void> {
  loading.value = true
  content.value = await loadPostContent(slug.value)
  loading.value = false
  await nextTick()
  enhanceCodeBlocks()
}

watch(slug, load, { immediate: true })

useSeo(() => ({
  title: post.value?.title,
  description: post.value?.summary,
}))

/** 给每个代码块补一个复制按钮 */
function enhanceCodeBlocks(): void {
  const root = articleEl.value
  if (!root) return

  root.querySelectorAll('.code-block').forEach((block) => {
    if (block.querySelector('.code-block__copy')) return
    const button = document.createElement('button')
    button.className = 'code-block__copy'
    button.type = 'button'
    button.textContent = '复制'
    block.appendChild(button)
  })
}

async function copyCode(button: HTMLButtonElement): Promise<void> {
  const code = button.closest('.code-block')?.querySelector('code')?.textContent ?? ''
  try {
    await navigator.clipboard.writeText(code)
    button.textContent = '已复制'
    button.classList.add('code-block__copy--done')
    window.setTimeout(() => {
      button.textContent = '复制'
      button.classList.remove('code-block__copy--done')
    }, 1600)
  } catch {
    button.textContent = '复制失败'
  }
}

/** 拦截站内链接，交给路由处理，避免整页刷新 */
function onArticleClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null
  if (!target) return

  const copyButton = target.closest('.code-block__copy')
  if (copyButton instanceof HTMLButtonElement) {
    event.preventDefault()
    void copyCode(copyButton)
    return
  }

  const link = target.closest('a')
  if (!(link instanceof HTMLAnchorElement)) return

  const href = link.getAttribute('href')
  if (!href || href.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(href)) return

  const normalized = href.startsWith(base) ? href.slice(base.length - 1) : href
  if (!internalPrefixes.some((prefix) => normalized.startsWith(prefix))) return

  event.preventDefault()
  router.push(normalized).catch(() => {
    // 忽略导航失败
  })
}
</script>

<template>
  <article v-if="post" class="article">
    <div class="article__main">
      <header class="article__header">
        <button type="button" class="article__back" @click="goBack">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>返回{{ originLabel }}</span>
        </button>
        <h1 class="article__title">{{ post.title }}</h1>
        <div class="article__meta">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span class="article__meta-sep" aria-hidden="true" />
          <span>{{ post.readingTime }} 分钟阅读</span>
          <span class="article__meta-sep" aria-hidden="true" />
          <span>{{ post.wordCount }} 字</span>
        </div>
        <div v-if="post.tags.length || post.categories.length" class="article__tags">
          <RouterLink
            v-for="category in post.categories"
            :key="`c-${category}`"
            :to="`/categories/${encodeURIComponent(category)}`"
            class="chip"
          >
            {{ category }}
          </RouterLink>
          <RouterLink
            v-for="tag in post.tags"
            :key="`t-${tag}`"
            :to="`/tags/${encodeURIComponent(tag)}`"
            class="chip"
          >
            # {{ tag }}
          </RouterLink>
        </div>
      </header>

      <div v-if="loading" class="muted">加载中…</div>
      <div v-else-if="content" ref="articleEl" class="markdown" @click="onArticleClick" v-html="content.html" />
      <p v-else class="muted">正文加载失败。</p>

      <nav v-if="newerPost || olderPost" class="article__nav" aria-label="上下篇文章">
        <RouterLink v-if="olderPost" :to="`/posts/${olderPost.slug}`" class="article__nav-item">
          <span class="article__nav-label">上一篇</span>
          <span class="article__nav-title">{{ olderPost.title }}</span>
        </RouterLink>
        <span v-else />
        <RouterLink
          v-if="newerPost"
          :to="`/posts/${newerPost.slug}`"
          class="article__nav-item article__nav-item--next"
        >
          <span class="article__nav-label">下一篇</span>
          <span class="article__nav-title">{{ newerPost.title }}</span>
        </RouterLink>
      </nav>
    </div>

    <aside v-if="content && content.toc.length" class="article__toc">
      <TableOfContents :items="content.toc" />
    </aside>
  </article>

  <div v-else class="empty">
    <p class="empty__title">文章不存在</p>
    <p>这篇文章可能已被移除，或者链接有误。</p>
    <p style="margin-top: 12px">
      <RouterLink to="/">返回首页</RouterLink>
    </p>
  </div>
</template>
