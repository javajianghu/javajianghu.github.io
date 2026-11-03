import { computed, ref, watchEffect } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'
const media = window.matchMedia('(prefers-color-scheme: dark)')

function readStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // 隐私模式下 localStorage 可能不可用
  }
  return 'system'
}

// 模块级单例，保证全站主题状态一致
const mode = ref<ThemeMode>(readStoredMode())
const systemPrefersDark = ref(media.matches)

media.addEventListener('change', (event) => {
  systemPrefersDark.value = event.matches
})

const isDark = computed(
  () => mode.value === 'dark' || (mode.value === 'system' && systemPrefersDark.value),
)

watchEffect(() => {
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
})

export function useTheme() {
  function setMode(next: ThemeMode): void {
    mode.value = next
    try {
      if (next === 'system') {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        localStorage.setItem(STORAGE_KEY, next)
      }
    } catch {
      // 忽略存储异常
    }
  }

  function toggle(): void {
    setMode(isDark.value ? 'light' : 'dark')
  }

  return { mode, isDark, setMode, toggle }
}
