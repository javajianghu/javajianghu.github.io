# Java江湖侠客岛

一个纯静态的个人技术博客：**Vue 3 + Vite** 构建，产物是纯静态文件，可直接托管到 GitHub Pages。
文章用 Markdown 编写，构建期预渲染成 HTML，无需任何后端服务。

## 功能

- 首页：文章列表，分页显示，每页条数可切换（10 / 20 / 50），选择会被记住
- 文章详情：预渲染正文、目录锚点、代码高亮与一键复制、上下篇导航、一键返回来源列表页
- 归档：按年份归档，显示每年篇数，年份页内分页，最新的在上面
- 标签 / 分类：标签墙与分类墙，点击进入对应的文章列表
- 搜索：全文检索标题、标签、分类、摘要与正文
- 关于我：内容来自 `content/pages/about.md`
- 在线写作：内置 Markdown 编辑器（分屏预览），可导出 `.md` 文件

其他：亮色 / 暗色双主题（跟随系统，可手动覆盖并记忆）、响应式布局、
SEO meta 与 canonical、GitHub Pages 深链接 404 回退。

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 本地开发，默认 http://localhost:5173
npm run build      # 构建，产物输出到 dist/
npm run preview    # 本地预览构建产物
npm run typecheck  # TypeScript 类型检查
npm test           # 单元测试
```

## 写文章

在 `content/posts/` 下新建 Markdown 文件，文件名即 slug（只允许 ASCII 字母、数字、连字符、下划线），
也可以在 frontmatter 里用 `slug` 显式指定。

```markdown
---
title: 用 Docker 部署 Nacos
date: 2024-05-24
slug: docker-deploy-nacos
summary: 一句话摘要，用于列表页展示。
categories:
  - 容器
tags:
  - Docker
  - Nacos
---

## 正文从这里开始
```

字段说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 否 | 缺失时取正文第一个一级标题，再退回文件名 |
| `date` | **是** | `YYYY-MM-DD`，用于列表排序与年份归档 |
| `slug` | 否 | 缺失时取文件名 |
| `summary` | 否 | 缺失时自动截取正文首段 |
| `categories` / `tags` | 否 | 字符串或数组 |
| `cover` | 否 | 封面图路径 |
| `draft` | 否 | `true` 时不出现在列表、归档与搜索中 |

图片放在 `public/assets/` 下，正文里用绝对路径引用：`![说明](/assets/xxx.png)`。
构建期会自动补上部署子路径前缀，子路径部署时无需手改路径。

## 目录结构

```text
myBlog/
├── content/                  # 内容源（Markdown）
│   ├── posts/                # 文章，文件名即 slug
│   └── pages/                # 独立页面，如 about.md
├── public/                   # 静态资源，原样拷贝到产物
│   ├── assets/               # 图片等
│   └── esp32.html            # ESP32 固件管理工具（独立单页，产物为 /esp32.html）
├── build/                    # 构建期脚本（Node 运行，不进浏览器包）
│   ├── content.ts            # 读取内容、解析 frontmatter、生成索引
│   ├── markdown.ts           # markdown-it 渲染、目录抽取
│   └── cli.ts                # 命令行入口
├── plugins/                  # Vite 插件
│   ├── content.ts            # 内容构建 + 开发态监听
│   └── spa-fallback.ts       # 生成 404.html 深链接回退页
├── scripts/
│   └── migrate-legacy.mjs    # 旧 docsify 博客的一次性迁移脚本
├── src/                      # 前端应用
│   ├── components/           # 通用组件
│   ├── composables/          # 主题、分页、每页条数、搜索、SEO
│   ├── pages/                # 路由页面
│   ├── router/               # 路由表
│   ├── styles/               # 设计令牌与样式
│   ├── types/                # 类型定义
│   └── utils/                # 纯工具函数
├── deploy.sh                 # 一键发布：构建并推送到 for-pages 分支
├── site.config.ts            # 站点信息（标题、作者、导航、社交链接等）
├── tests/                    # 单元测试
└── vite.config.ts
```

`src/generated/` 是构建期产物，由内容管线自动生成，**不需要提交到仓库**。

## 部署到 GitHub Pages

1. 构建：`npm run build`
2. 把 `dist/` 目录提交到 GitHub Pages 使用的位置，常见三种做法：
   - **docs 目录**：把 `dist/` 内容复制到仓库的 `docs/` 目录，Pages 来源选「main 分支 / docs」
   - **独立发布分支**：把 `dist/` 内容提交到单独的发布分支（如 `for-pages`），Pages 来源选该分支 / 根目录
   - **仓库根目录**：把 `dist/` 内容提交到默认分支根目录，Pages 来源选该分支 / 根目录

   本仓库的 `dist/` 目前仍被 `main` 跟踪，但发布分支与 `main` 相互独立，改动互不影响。
3. **子路径部署**：站点在 `https://<用户名>.github.io/<仓库名>/` 时，构建前设置 base：

```bash
VITE_BASE=/<仓库名>/ npm run build
```

部署在根路径（用户主页）时用默认值 `/`，不用加任何参数。

构建产物已包含 `404.html`，用于 GitHub Pages 的深链接回退：直接访问 `/posts/xxx` 会被
GitHub Pages 判定为 404，该页面会记录原始路径并跳回首页，应用启动后再把地址栏还原。

### 当前线上发布方式

线上站点 <https://javajianghu.top> 采用第二种做法：**`main` 分支只放源码，`for-pages` 分支承载构建产物**，
仓库的 Pages 发布来源设为 `for-pages` 分支 / 根目录（在仓库 Settings → Pages 里配置，脚本不涉及）。

一键发布：

```bash
./deploy.sh
```

脚本依次完成：构建站点 → 把 `dist/` 全部产物组装成一次提交 → 推送到远端 `for-pages` 分支。

两个关键设计：

- **不切换分支、不污染工作区**：用临时索引（`GIT_INDEX_FILE`）组装提交，`main` 的工作区与暂存区保持原样；
- **始终是快进推送**：父提交取自远端 `for-pages` 最新提交，推送不会被判定为非快进，也不需要强制推送。

发布分支的内容固定为 `dist/` 的全部文件，外加：

- `.nojekyll`：让 GitHub Pages 跳过 Jekyll 处理，保证产物原样发布；
- `CNAME`：绑定自定义域名 `javajianghu.top`。

产物里被删除的文件，重跑脚本后发布分支中也不会残留。

常用参数：

```bash
./deploy.sh --skip-build   # 跳过构建，直接发布现有 dist/
./deploy.sh --dry-run      # 只生成分支内容并打印，不推送远端
```

推送后 GitHub 会自动重新构建；若线上未更新，可在仓库 Settings → Pages 手动 Rebuild。

## 修改站点信息

站点标题、副标题、作者、导航、社交链接、每页条数选项等都在 `site.config.ts` 里，改完重新构建即可。

文章详情页的宽度由 `site.config.ts` 的 `articleWidth` 控制（单位 px，默认 1180），它决定正文占页面的比例：
调大正文更宽，右侧目录在空间足够时保持固定宽度；空间不足时目录自动落到正文下方，正文不会被挤窄。
合法范围是 640 ~ 1600，超出范围会被自动夹到边界。

## 迁移旧博客

`scripts/migrate-legacy.mjs` 是从旧 docsify 博客迁移内容的一次性脚本，
它会处理 frontmatter 补全、图片路径重写、旧站内链转换与标题层级归一化。

```bash
node scripts/migrate-legacy.mjs /path/to/old-blog/md
```

脚本可重复执行，会覆盖 `content/posts/` 与 `public/assets/` 下的同名产物。
