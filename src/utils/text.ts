/** 中日韩字符（含假名），用于区分「按字计」与「按词计」 */
const CJK_PATTERN = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/g

/**
 * 统计字数：CJK 按字计，其余按单词计。
 * 中文没有空格分词，直接按字符统计比按空白切分更准确。
 */
export function countWords(text: string): number {
  const cjk = text.match(CJK_PATTERN)?.length ?? 0
  const rest = text.replace(CJK_PATTERN, ' ')
  const words = rest.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g)?.length ?? 0
  return cjk + words
}

/**
 * 估算阅读时长（分钟）。
 * 中文约 400 字/分钟，英文约 200 词/分钟。
 */
export function estimateReadingTime(wordCount: number): number {
  if (wordCount <= 0) return 1
  return Math.max(1, Math.ceil(wordCount / 400))
}

/** 把 Date 或字符串统一格式化为 YYYY-MM-DD */
export function toDateString(value: unknown): string {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return ''
    return value.toISOString().slice(0, 10)
  }
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return ''
    // 兼容 "2024-05-24" 与 "2024-05-24 10:00:00" 两种写法
    const matched = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/)
    return matched ? `${matched[1]}-${matched[2]}-${matched[3]}` : ''
  }
  return ''
}

/** 把 YYYY-MM-DD 格式化为中文可读日期 */
export function formatDate(date: string): string {
  const matched = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!matched) return date
  return `${matched[1]} 年 ${Number(matched[2])} 月 ${Number(matched[3])} 日`
}

/** 截断文本并补省略号 */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}
