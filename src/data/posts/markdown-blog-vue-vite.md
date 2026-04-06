---
title: "用 Markdown 搭一个轻量博客（Vue + Vite）"
date: "2026-01-24"
description: "记录一个最小可用的 Markdown 博客：路由、frontmatter、按需加载与目录生成。"
tags: ["Vue", "Vite", "Markdown"]
---

# 用 Markdown 搭一个轻量博客（Vue + Vite）

这篇文章记录一个非常"轻量但够用"的博客做法：

- 文章用 `.md` 写
- 通过 Vite 把 Markdown 当成 Vue 组件渲染
- 通过 frontmatter 管理标题/日期/标签/简介
- 文章正文按需加载，列表页只加载索引

---

## 1. Markdown + frontmatter

每篇文章顶部放 frontmatter：

```yaml
---
title: "标题"
date: "2026-01-24"
description: "一句话简介"
tags: ["Vue", "Vite"]
---
```

正文就是正常的 Markdown。

## 2. 文章页按需加载

文章详情页只在访问时才加载对应的 md：

```ts
const modules = import.meta.glob('@/data/posts/*.md')
const importer = modules[`/src/data/posts/${id}.md`]
const comp = await importer()
```

这样文章数量变多时，首屏不会被所有文章拖慢。

## 3. 列表页用"构建期索引"

列表页不应该 eager import 所有 md 只为了读 frontmatter。

更稳妥的方式是：构建前扫一遍 `src/data/posts/*.md`，把元数据写到 `src/data/posts.index.json`，列表页直接加载这个 JSON。

## 4. 目录（TOC）的简单生成思路

渲染完成后扫描 `.markdown-body` 里的 `h2/h3`：

```ts
const headings = root.querySelectorAll('.markdown-body h2, .markdown-body h3')
```

给每个 heading 补 `id`，再生成锚点链接即可。

---

## 完整技术栈

| 层级 | 选择 | 理由 |
|------|------|------|
| 框架 | Vue 3 + Composition API | 轻量、响应式 |
| 构建 | Vite | 极速 HMR |
| 语言 | TypeScript | 类型安全 |
| 样式 | SCSS | 灵活变量 |
| Markdown | unplugin-vue-markdown | Vite 集成 |
| 托管 | GitHub Pages | 免费、CI/CD 内置 |

---

## 性能数据

| 指标 | 数值 |
|------|------|
| 首屏加载 | < 1s |
| Lighthouse 评分 | 95+ |
| 构建时间 | < 5s |
| 部署时间 | < 30s |
| 月成本 | ¥0 |

**零数据库、零服务器、零维护。**

---

## SEO 配置清单

| 任务 | 工具 | 说明 |
|------|------|------|
| sitemap.xml | 自定义脚本 | 构建时生成 |
| rss.xml | 自定义脚本 | 构建时生成 |
| robots.txt | 静态文件 | 放在 public/ |
| 结构化数据 | JSON-LD | 每页手动或自动注入 |
| 站点验证 | Google Search Console | 验证所有权 |

---

## 适合场景

✅ **个人博客、技术文档、项目展示**

❌ **需要用户系统、评论功能、实时数据** → 建议用 Next.js 或传统 CMS

---

## 工具推荐

| 工具 | 用途 | 推荐理由 |
|------|------|---------|
| [Vue 3](https://vuejs.org) | 框架 | 轻量易学 |
| [Vite](https://vitejs.dev) | 构建 | 极速 |
| [TypeScript](https://www.typescriptlang.org) | 语言 | 类型安全 |
| [Element Plus](https://element-plus.org) | UI 组件 | Vue 集成好 |
| [unplugin-vue-markdown](https://github.com) | Markdown | Vite 原生支持 |
| [GitHub Pages](https://pages.github.com) | 托管 | 免费 |
| [Vercel](https://vercel.com) | 托管备选 | 全球 CDN |

---

## CTA

**想搭建一个轻量博客？**

我整理了一套 [Vue + Vite 博客模板](https://github.com/lyx058019/markdown-blog-template)，开箱即用，包含 SEO、RSS、CI/CD 配置。

或者预约我的咨询服务：

👉 [技术咨询 - 博客搭建](/consulting)

帮你：从零搭一个带 SEO 优化的博客，最快 1 天上线

---

## 相关阅读

- [《前端工程化自检清单》](/blog/frontend-engineering-checklist)
- [《网站 SEO 基础：Sitemap 与 RSS》](/blog/seo-sitemap-rss)
- [《Cursor + MCP 自动化工作流》](/blog/cursor-mcp-workflow-2026)
