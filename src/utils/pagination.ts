export type PageItem = number | 'gap'

/**
 * 计算分页条需要展示的页码。
 * 首尾页与当前页附近始终可见，中间的空缺用 'gap' 占位。
 */
export function buildPageItems(current: number, total: number): PageItem[] {
  if (total <= 1) return []

  // 总页数不多时全部展示，避免出现只有一两页的省略号
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const visible = new Set<number>([1, total])
  for (let offset = -1; offset <= 1; offset += 1) {
    const page = current + offset
    if (page >= 1 && page <= total) visible.add(page)
  }

  const sorted = [...visible].sort((a, b) => a - b)
  const result: PageItem[] = []
  let previous = 0

  for (const page of sorted) {
    if (page - previous > 1) result.push('gap')
    result.push(page)
    previous = page
  }

  return result
}
