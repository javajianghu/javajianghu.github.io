import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  isListPath,
  readListOrigin,
  readListScroll,
  resolveListLabel,
  saveListOrigin,
  saveListScroll,
} from '../src/utils/postOrigin.ts'

/** node 环境没有 sessionStorage，用内存实现替代 */
class MemoryStorage {
  private map = new Map<string, string>()

  getItem(key: string): string | null {
    return this.map.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.map.set(key, value)
  }

  removeItem(key: string): void {
    this.map.delete(key)
  }

  clear(): void {
    this.map.clear()
  }
}

beforeEach(() => {
  vi.stubGlobal('sessionStorage', new MemoryStorage())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('isListPath', () => {
  it('首页、归档、标签、分类、搜索都属于列表页', () => {
    expect(isListPath('/')).toBe(true)
    expect(isListPath('/archive')).toBe(true)
    expect(isListPath('/archive/2024')).toBe(true)
    expect(isListPath('/tags')).toBe(true)
    expect(isListPath('/tags/java')).toBe(true)
    expect(isListPath('/categories')).toBe(true)
    expect(isListPath('/categories/%E5%90%8E%E7%AB%AF')).toBe(true)
    expect(isListPath('/search?q=docker')).toBe(true)
  })

  it('文章详情页与其他页面不属于列表页', () => {
    expect(isListPath('/posts/docker-deploy-nacos')).toBe(false)
    expect(isListPath('/about')).toBe(false)
    expect(isListPath('/editor')).toBe(false)
    expect(isListPath('/not-exist')).toBe(false)
  })

  it('前缀相同但不是子路径的页面不算列表页', () => {
    expect(isListPath('/tags-extra')).toBe(false)
    expect(isListPath('/searching')).toBe(false)
  })
})

describe('来源列表页记录', () => {
  it('记录后可以读回来源列表页的完整路径', () => {
    saveListOrigin('/search?q=docker&page=2')
    expect(readListOrigin()).toBe('/search?q=docker&page=2')
  })

  it('非列表页不记录来源', () => {
    saveListOrigin('/about')
    expect(readListOrigin()).toBeNull()
  })

  it('没有记录时返回 null', () => {
    expect(readListOrigin()).toBeNull()
  })

  it('记录内容损坏时返回 null', () => {
    sessionStorage.setItem('site:post-list-origin', '/posts/xxx')
    expect(readListOrigin()).toBeNull()
  })

  it('sessionStorage 不可用时不抛异常', () => {
    vi.stubGlobal('sessionStorage', {
      getItem() {
        throw new Error('不可用')
      },
      setItem() {
        throw new Error('不可用')
      },
    })
    expect(() => saveListOrigin('/')).not.toThrow()
    expect(readListOrigin()).toBeNull()
  })
})

describe('列表页滚动位置', () => {
  it('记录后可以读回同一路径的滚动位置', () => {
    saveListScroll('/?page=3', 420)
    expect(readListScroll('/?page=3')).toBe(420)
  })

  it('路径不一致时返回 null', () => {
    saveListScroll('/?page=3', 420)
    expect(readListScroll('/')).toBeNull()
  })

  it('没有记录或内容损坏时返回 null', () => {
    expect(readListScroll('/')).toBeNull()
    sessionStorage.setItem('site:post-list-scroll', 'not-json')
    expect(readListScroll('/')).toBeNull()
  })

  it('滚动距离非法时不写入', () => {
    saveListScroll('/', Number.NaN)
    expect(readListScroll('/')).toBeNull()
  })
})

describe('resolveListLabel', () => {
  it('按来源页面生成中文文案', () => {
    expect(resolveListLabel('/')).toBe('首页')
    expect(resolveListLabel('/?page=2')).toBe('首页')
    expect(resolveListLabel('/archive')).toBe('归档')
    expect(resolveListLabel('/archive/2024')).toBe('2024 年归档')
    expect(resolveListLabel('/search?q=docker')).toBe('搜索结果')
    expect(resolveListLabel('/tags/java')).toBe('「java」标签')
    expect(resolveListLabel('/categories/%E5%90%8E%E7%AB%AF')).toBe('「后端」分类')
    expect(resolveListLabel('/unknown')).toBe('文章列表')
  })
})
