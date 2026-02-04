---
title: "用 Markdown 搭一个轻量博客（Vue + Vite）"
date: "2026-01-24"
description: "记录一个最小可用的 Markdown 博客：路由、frontmatter、按需加载与目录生成。"
tags: ["Vue", "Vite", "Markdown"]
---

# 用 Markdown 搭一个轻量博客（Vue + Vite）

这篇文章记录一个非常“轻量但够用”的博客做法：

- 文章用 `.md` 写
- 通过 Vite 把 Markdown 当成 Vue 组件渲染
- 通过 frontmatter 管理标题/日期/标签/简介
- 文章正文按需加载，列表页只加载索引

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

## 3. 列表页用“构建期索引”

列表页不应该 eager import 所有 md 只为了读 frontmatter。

更稳妥的方式是：构建前扫一遍 `src/data/posts/*.md`，把元数据写到 `src/data/posts.index.json`，列表页直接加载这个 JSON。

## 4. 目录（TOC）的简单生成思路

渲染完成后扫描 `.markdown-body` 里的 `h2/h3`：

```ts
const headings = root.querySelectorAll('.markdown-body h2, .markdown-body h3')
```

给每个 heading 补 `id`，再生成锚点链接即可。

## 5. 小结

这个结构的优点是：

- 写作体验好（Markdown）
- 性能可控（正文按需、列表只读索引）
- SEO 更友好（文章页可设置 `og:type=article`，构建生成 sitemap/rss）
