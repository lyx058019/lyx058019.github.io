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

**这两件事性价比极高：开发 2 小时，长期收益 2 年。**

---

## 1. 生成 sitemap.xml

最简单的 sitemap 就是把静态页面 + 博客文章 URL 列出来：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-01-25</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/blog/hello-world</loc>
    <lastmod>2026-01-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### sitemap.xml 关键字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `<loc>` | 是 | 页面 URL，必须是绝对地址 |
| `<lastmod>` | 否 | 最后更新时间，Google 会参考 |
| `<changefreq>` | 否 | 更新频率：always/hourly/daily/weekly/monthly |
| `<priority>` | 否 | 优先级 0.0-1.0，首页设 1.0，文章设 0.7-0.8 |

## 2. 生成 rss.xml

RSS 重点是 channel + item：

- item 的 `title/link/guid/pubDate/description` 最重要

示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>我的博客</title>
    <link>https://example.com</link>
    <description>博客描述</description>
    <language>zh-cn</language>
    <item>
      <title>文章标题</title>
      <link>https://example.com/blog/hello-world</link>
      <guid>https://example.com/blog/hello-world</guid>
      <pubDate>Thu, 23 Jan 2026 00:00:00 GMT</pubDate>
      <description><![CDATA[文章简介]]></description>
    </item>
  </channel>
</rss>
```

### RSS 必填字段

| 字段 | 说明 |
|------|------|
| `title` | 频道/文章标题 |
| `link` | 访问链接 |
| `guid` | 文章唯一标识，用 URL 即可 |
| `pubDate` | 发布时间，格式：`Thu, 23 Jan 2026 00:00:00 GMT` |
| `description` | 文章摘要，记得用 CDATA 包裹 |

## 3. 从 Markdown 读取元数据

用 `gray-matter` 解析 frontmatter：

```js
import matter from 'gray-matter'

const raw = fs.readFileSync('posts/hello-world.md', 'utf8')
const parsed = matter(raw)
const { title, description, date, tags } = parsed.data
```

### 完整生成脚本示例

```javascript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const SITE_ORIGIN = 'https://example.com'

// 读取所有文章
const postsDir = './src/data/posts'
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))

const items = files.map(file => {
  const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
  const { title, description, date } = matter(raw).data
  const slug = file.replace('.md', '')

  return {
    title,
    description,
    date,
    link: `${SITE_ORIGIN}/blog/${slug}`,
    pubDate: new Date(date).toUTCString()
  }
})

// 生成 sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.map(item => `  <url>
    <loc>${item.link}</loc>
    <lastmod>${item.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`

// 生成 rss.xml
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>我的博客</title>
    <link>${SITE_ORIGIN}</link>
    <description>博客描述</description>
    <language>zh-cn</language>
    ${items.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description><![CDATA[${item.description}]]></description>
    </item>`).join('')}
  </channel>
</rss>`

fs.writeFileSync('./public/sitemap.xml', sitemap)
fs.writeFileSync('./public/rss.xml', rss)
```

## 4. 经验：URL 与日期

- URL 建议统一用 `SITE_ORIGIN + path` 拼绝对地址
- 日期尽量用 `YYYY-MM-DD`，RSS 输出用 UTC
- sitemap.xml 和 rss.xml 放在 `public/` 目录，构建时自动复制

## 5. 提交到搜索引擎

生成 sitemap 后，记得主动提交：

| 搜索引擎 | 提交地址 |
|---------|---------|
| Google | [Search Console](https://search.google.com/search-console) → Sitemaps |
| 百度 | [搜索资源平台](https://ziyuan.baidu.com/) → Sitemaps |
| Bing | [Bing Webmaster](https://www.bing.com/webmasters) |

## 6. 效果对比

| 指标 | 无 sitemap | 有 sitemap |
|------|-----------|-----------|
| Google 收录速度 | 2-4 周 | 3-7 天 |
| 收录完整度 | 60-80% | 95%+ |
| 长尾关键词覆盖 | 低 | 高 |
| 订阅用户 | 0 | 持续增长 |

**投入 2 小时，收录速度提升 5-10 倍。**

---

## 工具推荐

| 工具 | 用途 | 推荐理由 |
|------|------|---------|
| [Vercel](https://vercel.com) | 网站托管 | 内置 sitemap 生成，零配置 |
| [Netlify](https://netlify.com) | 网站托管 | 支持 sitemap 插件 |
| [Cloudflare Pages](https://pages.cloudflare.com) | 网站托管 | 全球 CDN，免费计划 |
| [Google Search Console](https://search.google.com/search-console) | SEO 监控 | 免费，关键词排名、收录监控 |

---

## CTA

**想快速搭建一个带 SEO 优化的博客？**

我用的这套技术栈：[Vue 3 + Vite + TypeScript](/blog/markdown-blog-vue-vite)，从零到上线只需要 1 天。

或者预约我的咨询服务：

👉 [技术咨询 - SEO 优化方案](/consulting)

---

## 相关阅读

- [《前端工程化自检清单》](/blog/frontend-engineering-checklist)
- [《用 Markdown 搭一个轻量博客》](/blog/markdown-blog-vue-vite)
