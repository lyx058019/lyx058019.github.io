---
title: "网站 SEO 基础：Sitemap 与 RSS"
date: "2026-01-25"
description: "用构建脚本从 Markdown frontmatter 生成 sitemap.xml 与 rss.xml，让搜索与订阅更可靠。"
tags: ["SEO", "RSS", "Sitemap"]
---

# 网站 SEO 基础：Sitemap 与 RSS

如果你的网站有博客内容，建议至少补齐两件事：

- `sitemap.xml`：告诉搜索引擎有哪些页面
- `rss.xml`：让读者可以订阅更新

## 1. 生成 sitemap.xml

最简单的 sitemap 就是把静态页面 + 博客文章 URL 列出来：

```xml
<url>
  <loc>https://example.com/blog/hello-world</loc>
</url>
```

## 2. 生成 rss.xml

RSS 重点是 channel + item：

- item 的 `title/link/guid/pubDate/description` 最重要

示例：

```xml
<item>
  <title>标题</title>
  <link>https://example.com/blog/hello-world</link>
  <guid>https://example.com/blog/hello-world</guid>
  <pubDate>Thu, 23 Jan 2026 00:00:00 GMT</pubDate>
  <description><![CDATA[简介]]></description>
</item>
```

## 3. 从 Markdown 读取元数据

用 `gray-matter` 解析 frontmatter：

```js
import matter from 'gray-matter'

const parsed = matter(raw)
const { title, description, date } = parsed.data
```

## 4. 经验：URL 与日期

- URL 建议统一用 `SITE_ORIGIN + path` 拼绝对地址
- 日期尽量用 `YYYY-MM-DD`，RSS 输出用 UTC

## 5. 小结

对个人网站来说，sitemap + RSS 的性价比很高：

- 搜索收录更稳定
- 读者订阅更方便
- 内容增长后维护成本依然很低（构建期生成即可）
