import type { SearchEntry, SearchHit } from '@/types/content'

/** 在正文里截取命中片段 */
export function buildSnippet(text: string, query: string): string {
  const index = text.toLowerCase().indexOf(query)
  if (index < 0) return text.slice(0, 120).trim()

  const start = Math.max(0, index - 40)
  const end = Math.min(text.length, index + query.length + 80)
  const prefix = start > 0 ? '…' : ''
  const suffix = end < text.length ? '…' : ''
  return `${prefix}${text.slice(start, end).trim()}${suffix}`
}

/**
 * 按标题、标签、分类、摘要、正文的权重给命中结果排序。
 * 中文没有词边界，统一用子串匹配，命中后按权重与时间排序。
 */
export function rankEntries(entries: SearchEntry[], query: string): SearchHit[] {
  const hits: SearchHit[] = []

  for (const entry of entries) {
    const title = entry.title.toLowerCase()
    const tags = entry.tags.join(' ').toLowerCase()
    const categories = entry.categories.join(' ').toLowerCase()
    const summary = entry.summary.toLowerCase()
    const text = entry.text.toLowerCase()

    let score = 0
    if (title.includes(query)) score += 100
    if (tags.includes(query)) score += 40
    if (categories.includes(query)) score += 30
    if (summary.includes(query)) score += 20
    if (text.includes(query)) score += 10
    if (score === 0) continue

    hits.push({
      slug: entry.slug,
      title: entry.title,
      date: entry.date,
      summary: entry.summary,
      tags: entry.tags,
      snippet: buildSnippet(entry.text, query),
      score,
    })
  }

  return hits.sort((a, b) => b.score - a.score || (a.date < b.date ? 1 : -1))
}
