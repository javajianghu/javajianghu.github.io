# AGENTS.md

> 本文件只记录**本项目特有**的约定，通用工程规范见全局 AGENTS.md。
> 全局规范（简体中文注释、最小必要改动、无验证不交付等）在本项目同样适用。

## 项目定位

个人技术博客。**纯静态站点**，产物可直接托管到 GitHub Pages，**不引入任何后端服务**。
文章以 Markdown 存放，构建期预渲染成 HTML。

## 技术栈

- Vue 3.5 + Vue Router 4 + Vite 8 + TypeScript 5.9
- 构建期：markdown-it 15 + markdown-it-anchor 10 + markdown-it-emoji 3 + highlight.js 11 + gray-matter 4
- 编辑器：`@l9m/v-md-editor` 3（v-md-editor 的 Vue 3 分支，**不是** `@kangc/v-md-editor`，后者是 Vue 2 版）
- 测试：vitest 5

## 命令

```bash
npm run dev        # 本地开发
npm run build      # 构建到 dist/
npm run typecheck  # vue-tsc 类型检查
npm test           # 单元测试
```

`typecheck` 与 `test` 前置了 `node build/cli.ts`，会先生成 `src/generated/` 产物。
`src/generated/` 是构建期产物，**不要提交**，也不要在代码里手动维护。

## 内容约定

- 文章放在 `content/posts/`，独立页面放在 `content/pages/`
- frontmatter 的 `date` **必填**，格式 `YYYY-MM-DD`，用于排序与年份归档
- `slug` 只允许 ASCII 字母、数字、连字符、下划线；缺失时取文件名，非法会在构建期报错
- 正文标题层级统一从 `h2` 开始（一级标题由页面标题承担），目录只收录 `h2` ~ `h4`
- 图片放 `public/assets/`，正文用 `/assets/xxx.png` 引用；构建期会自动补部署子路径前缀
- `draft: true` 的文章不进入列表、归档与搜索

## 关键约束

- **内容只在构建期渲染**。不要在浏览器里引入 markdown-it 渲染正文，否则会与预渲染结果不一致
- 部署子路径由 `VITE_BASE` 环境变量控制，`vite.config.ts` 统一读取，不要在业务代码里硬编码路径
- 文章页宽度由 `site.config.ts` 的 `articleWidth` 控制，运行时经 `src/main.ts` 注入 `--article-width`；不要在样式里硬编码文章页宽度
- GitHub Pages 的深链接回退依赖 `plugins/spa-fallback.ts` 生成的 `404.html` 与
  `src/utils/redirect.ts` 的还原逻辑，两者**必须成对修改**
- 线上站点由 `gh-pages` 分支发布，`main` 分支只放源码；发布流程见 README「当前线上发布方式」，
  不要把 `dist/` 提交到 `main`
- 文章页的「返回」按钮依赖 `src/utils/postOrigin.ts` 记录的来源列表页，
  路由守卫（`src/router/index.ts`）与文章页按钮**必须成对修改**
- 编辑器的第三方包没有类型声明，类型补充在 `src/env.d.ts`，不要改成 `any` 绕过

## 改动后的验证

按影响范围执行，**不要跳过**：

| 改动类型 | 验证方式 |
| --- | --- |
| 构建期逻辑（`build/`、`plugins/`） | `npm test` + `npm run build` |
| 前端组件 / 页面 | `npm run typecheck` + `npm run build` |
| 纯样式 / 纯文档 | `npm run build`，无需跑测试 |

交互验证（浏览器点击、表单填写）不在本项目的默认验证范围内；
如确需人工冒烟，请显式说明未执行及原因。
