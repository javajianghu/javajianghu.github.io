<script setup lang="ts">
import { computed, ref } from 'vue'
import VmdEditor from '@l9m/v-md-editor'
import githubTheme from '@l9m/v-md-editor/lib/theme/github.js'
import '@l9m/v-md-editor/lib/style/base-editor.css'
import '@l9m/v-md-editor/lib/theme/style/github.css'
// 放在第三方主题样式之后，确保暗色覆盖规则生效
import '@/styles/editor.css'
import { useSeo } from '@/composables/useSeo'

const STARTER = `## 背景

这里写清楚问题出现的场景。

## 排查过程

1. 第一步
2. 第二步

## 结论

一句话总结问题与解决办法。
`

const title = ref('')
const date = ref(new Date().toISOString().slice(0, 10))
const slug = ref('')
const categories = ref('')
const tags = ref('')
const body = ref(STARTER)
const tip = ref('')

useSeo(() => ({
  title: '在线写作',
  description: '在浏览器里写 Markdown，导出后放进仓库即可发布',
}))

function splitList(value: string): string[] {
  return value
    .split(/[,，\s]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

const frontmatter = computed(() => {
  const lines = ['---', `title: ${title.value.trim() || '未命名文章'}`, `date: ${date.value}`]

  if (slug.value.trim()) {
    lines.push(`slug: ${slug.value.trim()}`)
  }

  const categoryList = splitList(categories.value)
  if (categoryList.length > 0) {
    lines.push('categories:')
    for (const item of categoryList) lines.push(`  - ${item}`)
  }

  const tagList = splitList(tags.value)
  if (tagList.length > 0) {
    lines.push('tags:')
    for (const item of tagList) lines.push(`  - ${item}`)
  }

  lines.push('---')
  return lines.join('\n')
})

const fullMarkdown = computed(() => `${frontmatter.value}\n\n${body.value.trim()}\n`)

/** 从标题里提取 ASCII 单词生成 slug；纯中文标题需要手动填写 */
function generateSlug(): void {
  const ascii = title.value.match(/[A-Za-z0-9]+/g)?.join('-').toLowerCase() ?? ''
  slug.value = ascii || `${date.value}-post`
}

async function copyText(text: string, label: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    tip.value = `${label}已复制到剪贴板`
  } catch {
    tip.value = '复制失败，请手动选中文本复制'
  }
  window.setTimeout(() => {
    tip.value = ''
  }, 2400)
}

function download(): void {
  const name = slug.value.trim() || title.value.trim() || 'article'
  const blob = new Blob([fullMarkdown.value], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${name}.md`
  link.click()
  URL.revokeObjectURL(url)
  tip.value = `已下载 ${name}.md`
  window.setTimeout(() => {
    tip.value = ''
  }, 2400)
}

function reset(): void {
  title.value = ''
  slug.value = ''
  categories.value = ''
  tags.value = ''
  body.value = STARTER
  tip.value = '已清空'
  window.setTimeout(() => {
    tip.value = ''
  }, 1600)
}
</script>

<template>
  <div>
    <div class="page-head">
      <h1 class="page-head__title">在线写作</h1>
      <p class="page-head__description">
        在浏览器里写好 Markdown，导出后放进仓库的 <code>content/posts/</code> 目录，重新构建即可发布。
      </p>
    </div>

    <div class="editor-meta">
      <label class="field field--wide">
        <span class="field__label">标题</span>
        <input v-model="title" class="field__input" type="text" placeholder="文章标题" />
      </label>

      <label class="field">
        <span class="field__label">发布日期</span>
        <input v-model="date" class="field__input" type="date" />
      </label>

      <label class="field">
        <span class="field__label">
          slug
          <button class="field__action" type="button" @click="generateSlug">自动生成</button>
        </span>
        <input
          v-model="slug"
          class="field__input"
          type="text"
          placeholder="仅限字母、数字、连字符"
        />
      </label>

      <label class="field">
        <span class="field__label">分类</span>
        <input v-model="categories" class="field__input" type="text" placeholder="如：数据库 工具" />
      </label>

      <label class="field">
        <span class="field__label">标签</span>
        <input v-model="tags" class="field__input" type="text" placeholder="如：Docker MySQL" />
      </label>
    </div>

    <div class="editor-actions">
      <button class="button button--primary" type="button" @click="download">下载 .md</button>
      <button class="button" type="button" @click="copyText(fullMarkdown, '全文')">复制全文</button>
      <button class="button" type="button" @click="copyText(body, '正文')">复制正文</button>
      <button class="button" type="button" @click="reset">清空</button>
      <span v-if="tip" class="editor-tip">{{ tip }}</span>
    </div>

    <VmdEditor
      v-model="body"
      :theme="githubTheme"
      class="editor"
      height="560px"
      placeholder="在这里开始写作…"
    />

    <div class="editor-note">
      <h2 class="editor-note__title">发布流程</h2>
      <ol class="editor-note__list">
        <li>点「下载 .md」拿到文章文件。</li>
        <li>把文件放进仓库的 <code>content/posts/</code> 目录，文件名即 slug（或在 frontmatter 里写 <code>slug</code>）。</li>
        <li>在项目根目录执行 <code>npm run build</code>，产物输出到 <code>dist/</code>。</li>
        <li>提交 <code>dist/</code> 目录到 GitHub Pages 对应的分支即可上线。</li>
      </ol>
    </div>
  </div>
</template>
