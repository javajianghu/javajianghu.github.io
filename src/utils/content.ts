import indexJson from '@/generated/index.json'
import type { PostContent, SearchEntry, SiteIndex } from '@/types/content'

/** 全站索引：文章元信息、标签、分类、归档统计 */
export const siteIndex = indexJson as SiteIndex

// 每篇文章单独打包成独立 chunk，进入详情页时才加载
const postLoaders = import.meta.glob('../generated/posts/*.json')
const searchLoaders = import.meta.glob('../generated/search-index.json')

/** 按 slug 加载文章正文 */
export async function loadPostContent(slug: string): Promise<PostContent | null> {
  const loader = postLoaders[`../generated/posts/${slug}.json`]
  if (!loader) return null
  const module = (await loader()) as { default: PostContent }
  return module.default
}

/** 加载搜索索引（体积较大，仅在进入搜索页时加载） */
export async function loadSearchIndex(): Promise<SearchEntry[]> {
  const loader = searchLoaders['../generated/search-index.json']
  if (!loader) return []
  const module = (await loader()) as { default: SearchEntry[] }
  return module.default
}
