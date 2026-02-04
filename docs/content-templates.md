# 内容模板与写作模板（SEO 与深度兼顾）

本文提供两类文章模板：教程（Tutorial）与工具/技巧（Tool/Tips），以确保内容深度与 SEO 友好共存。

## 模板一：教程类（Tutorial）
前置元数据示例（Markdown frontmatter）：
```yaml
---
title: "在 Vue 3 中实现路由懒加载的实用指南"
date: YYYY-MM-DD
author: "你的名字"
slug: "vue3-router-lazy-load-guide"
excerpt: "简要描述该教程的价值与受众"
tags: ["前端", "Vue3", "性能"]
cover: "/assets/covers/vue3-lazy-load.png"
keywords: ["Vue3", "路由懒加载", "性能"]
seo:
  description: "学习在 Vue 3 + Vite 项目中实现路由懒加载，提升首屏加载速度的实操指南。"
  keywords: ["Vue3", "路由懒加载"]
---
```

结构示例：
1) 引言/动机
2) 背景与选型
3) 步骤与代码示例（分步骤）
4) 结果对比与分析（性能、体积、首屏）
5) 注意事项与潜在坑
6) 结论与可复现性
7) 附录：常见问题、参考链接

## 模板二：工具/技巧类（Tool/Tips）
前置元数据示例（Markdown frontmatter）：
```yaml
---
title: "快速将 JSON 转换为 Base64 的简单方法"
date: YYYY-MM-DD
author: "你的名字"
slug: "json-to-base64"
excerpt: "一句话描述与使用场景"
tags: ["工具", "JSON", "Base64"]
cover: "/assets/covers/base64.png"
keywords: ["Base64", "JSON"]
---
```

结构示例：
1) 背景与用途
2) 方法对比（原地方法/脚本/命令）
3) 实操代码/命令
4) 风险与边界
5) 复现步骤与常见问题
6) 延伸阅读

> 使用建议：两类模板统一字段名称、统一的文档风格，便于 SEO 与长期维护。
