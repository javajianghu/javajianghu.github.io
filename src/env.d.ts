/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

// @l9m/v-md-editor 未随包提供类型声明，这里按实际用法做最小化声明
declare module '@l9m/v-md-editor' {
  import type { App, DefineComponent } from 'vue'

  export interface VmdEditorProps {
    modelValue?: string
    /** 编辑器高度，如 '520px' */
    height?: string
    /** 'editable' 分屏可编辑，'edit' 仅编辑，'preview' 仅预览 */
    mode?: 'editable' | 'edit' | 'preview'
    /** 预览主题对象 */
    theme?: unknown
    placeholder?: string
    tabSize?: number
    autofocus?: boolean
    tocNavPositionRight?: boolean
    /** 左侧工具栏配置 */
    leftToolbar?: string
    /** 右侧工具栏配置 */
    rightToolbar?: string
    toolbar?: Record<string, unknown>
    disabledMenus?: string[]
    toolbarConfig?: Record<string, unknown>
  }

  const VmdEditor: DefineComponent<VmdEditorProps> & {
    install: (app: App) => void
    use: (theme: unknown) => unknown
  }

  export default VmdEditor
}

declare module '@l9m/v-md-editor/lib/theme/*' {
  const theme: {
    install: (editor: unknown, options?: unknown) => void
  }
  export default theme
}

// markdown-it-emoji v3 未提供类型声明
declare module 'markdown-it-emoji' {
  import type MarkdownIt from 'markdown-it'

  export const bare: MarkdownIt.PluginSimple
  export const light: MarkdownIt.PluginSimple
  export const full: MarkdownIt.PluginSimple
}
