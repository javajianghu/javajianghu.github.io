/**
 * 文章页「返回列表」所需的来源记录。
 *
 * 需求是「返回到刚才进入这篇文章时的那个文章列表页」，
 * 所以进入文章时要把来源列表页的完整路径记下来（含搜索词、分页等查询参数），
 * 返回时再按这个路径跳回去，并还原离开前的滚动位置。
 */

/** 会话级键：最近一次进入文章时的来源列表页路径 */
const ORIGIN_STORAGE_KEY = 'site:post-list-origin'
/** 会话级键：离开来源列表页时的滚动位置 */
const SCROLL_STORAGE_KEY = 'site:post-list-scroll'

/** 承载文章列表的页面路径（首页单独判断） */
const LIST_PATH_PREFIXES = ['/archive', '/tags', '/categories', '/search'] as const

/** 离开列表页时记录的滚动位置 */
interface ListScroll {
  /** 离开时的列表页完整路径 */
  path: string
  /** 离开时的垂直滚动距离（px） */
  top: number
}

/** 读取会话级存储，隐私模式下不可用时返回 null */
function readSession(key: string): string | null {
  try {
    return sessionStorage.getItem(key)
  } catch {
    // 隐私模式下 sessionStorage 可能不可用，忽略即可
    return null
  }
}

/** 写入会话级存储，隐私模式下不可用时静默跳过 */
function writeSession(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // 同上
  }
}

/** 取出路径里的 pathname，忽略查询串与哈希 */
function toPathname(path: string): string {
  return path.split(/[?#]/)[0] ?? ''
}

/** 安全解码路径片段，非法编码时原样返回 */
function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

/**
 * 判断路径是不是文章列表页。
 * 承载文章列表的有：首页、归档、标签、分类、搜索。
 */
export function isListPath(path: string): boolean {
  const pathname = toPathname(path)
  if (pathname === '/') return true
  return LIST_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

/** 记录进入文章时所在的列表页路径，非列表页不记录 */
export function saveListOrigin(fullPath: string): void {
  if (!isListPath(fullPath)) return
  writeSession(ORIGIN_STORAGE_KEY, fullPath)
}

/** 读取来源列表页路径，没有记录或记录已失效时返回 null */
export function readListOrigin(): string | null {
  const stored = readSession(ORIGIN_STORAGE_KEY)
  if (!stored) return null
  return isListPath(stored) ? stored : null
}

/** 记录离开列表页时的滚动位置，返回时用于还原 */
export function saveListScroll(fullPath: string, top: number): void {
  if (!Number.isFinite(top)) return
  writeSession(SCROLL_STORAGE_KEY, JSON.stringify({ path: fullPath, top }))
}

/** 读取列表页保存的滚动位置，路径不匹配时返回 null */
export function readListScroll(fullPath: string): number | null {
  const stored = readSession(SCROLL_STORAGE_KEY)
  if (!stored) return null
  try {
    const parsed = JSON.parse(stored) as Partial<ListScroll>
    if (parsed.path !== fullPath) return null
    const top = Number(parsed.top)
    return Number.isFinite(top) ? top : null
  } catch {
    return null
  }
}

/** 来源列表页的中文名称，用作返回按钮文案 */
export function resolveListLabel(fullPath: string): string {
  const pathname = toPathname(fullPath)
  if (pathname === '/') return '首页'
  if (pathname.startsWith('/archive')) {
    const year = pathname.split('/')[2]
    return year ? `${decodeSegment(year)} 年归档` : '归档'
  }
  if (pathname.startsWith('/search')) return '搜索结果'
  if (pathname.startsWith('/tags')) return segmentLabel(pathname, '/tags', '标签')
  if (pathname.startsWith('/categories')) return segmentLabel(pathname, '/categories', '分类')
  return '文章列表'
}

/** 取路径末段拼成「xx」标签这样的文案 */
function segmentLabel(pathname: string, prefix: string, kind: string): string {
  const segment = pathname.slice(prefix.length).replace(/^\//, '').split('/')[0]
  if (!segment) return kind
  return `「${decodeSegment(segment)}」${kind}`
}
