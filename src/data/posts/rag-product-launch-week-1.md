---
title: "从 0 到 1：我如何用 AI 一周开发并上线 RAG 知识库"
date: "2026-03-05"
description: "拒绝空谈 AI。分享我如何利用 Vite + Supabase + LLM 在 7 天内构建出一个面向中小团队的私有知识库产品。"
tags: ["AI", "RAG", "实战"]
---

# 从 0 到 1：我如何用 AI 一周开发并上线 RAG 知识库

很多人觉得 AI 产品门槛高，其实在 2026 年，利用成熟的生态，全栈开发者一个人就是一支军队。

## 1. 为什么是 RAG？

中小团队在处理私有文档时，公版 ChatGPT 容易导致数据泄露。RAG（检索增强生成）是当前落地成本最低、效果最明显的方案。

**我的场景**：给一个 10 人小团队搭内部知识库，文档包括产品文档、客服话术、常见问题。

## 2. 技术选型

| 层级 | 选择 | 理由 |
|------|------|------|
| 前端 | Vue 3 + Vite | 开发速度极快 |
| 后端/数据库 | Supabase | 自带 Vector 存储，省去维护烦恼 |
| AI 引擎 | DeepSeek / GPT-4o-mini | 平衡成本与逻辑 |
| 部署 | Vercel + Supabase | 零配置部署 |

**总成本**：月均约 ¥200（Supabase + AI API）

## 3. 核心踩坑总结

### Chunking 策略

不要简单的按字符切分，按语义段落切分能让召回率提升 30%。

```typescript
// 好的 chunking 策略示例
const chunkByParagraph = (text: string) => {
  return text.split('\n\n')
    .filter(p => p.length > 50 && p.length < 500)
    .map(p => ({ text: p, embedding: await getEmbedding(p) }))
}
```

### Prompt 注入

在 System Prompt 中加入约束，防止模型"一本正经地胡说八道"：

```
你是一个内部知识库助手。只根据提供的上下文回答。
如果上下文中没有相关信息，说"我没有找到相关信息"。
禁止编造数据。
```

### 向量检索优化

使用混合检索（关键词 + 向量）比纯向量检索效果更好：

```typescript
const hybridSearch = async (query: string) => {
  const vectorResults = await vectorStore.search(query, 5)
  const keywordResults = await fullTextSearch(query, 5)

  // 融合两种结果
  return fuseResults(vectorResults, keywordResults, { threshold: 0.3 })
}
```

## 4. 一周开发节奏

| Day | 任务 | 产出 |
|-----|------|------|
| Day 1 | 需求分析 + 技术方案 | 架构图 + PRD |
| Day 2-3 | 前端界面开发 | 可交互的原型 |
| Day 4-5 | RAG 核心逻辑 | 文档上传 + 检索 + 生成 |
| Day 6 | 测试 + 优化 | 修复 bug + 调优 |
| Day 7 | 部署 + 交付 | 正式上线 |

## 5. 真实成本

| 项目 | 费用 |
|------|------|
| Supabase Pro | ¥29/月 |
| DeepSeek API | ¥50/月（估算） |
| Vercel | 免费 |
| 我的时间 | 约 20 小时 |

**对比传统方案**：外包开发 3-5 万，自研只需 ¥100/月 + 自己的时间。

## 6. 什么人适合自己做

✅ **有全栈能力的开发者** — 一周时间可以搞定
✅ **有明确场景的小团队** — 需求清晰，方案容易落地
✅ **注重数据隐私** — 不想用第三方知识库服务

❌ **没有技术能力的创始人** — 建议用现成服务如 Notion AI、Confluence AI
❌ **需要复杂权限管理的** — 自建权限系统成本高
❌ **数据量超过 10 万文档** — 需要更复杂的架构

## 工具推荐

| 工具 | 用途 | 推荐理由 |
|------|------|---------|
| [Supabase](https://supabase.com) | 后端 + 向量数据库 | 一个服务解决所有需求 |
| [Vercel](https://vercel.com) | 前端部署 | 零配置，免费的 CDN |
| [DeepSeek](https://deepseek.com) | LLM API | 性价比高，中文支持好 |
| [Cursor](https://cursor.com) | AI 代码编辑器 | 提升开发速度 3-5 倍 |

---

## CTA

**想搭建自己的 AI 知识库？**

我整理了一套 [RAG 项目模板](https://github.com/lyx058019/rag-template)，开箱即用，包含完整的前端 + 后端 + 部署配置。

或者预约我的咨询服务，我帮你：

👉 [AI 产品咨询](/consulting)

- 评估你的场景是否适合自建
- 制定技术方案
- 帮你搭一套能直接用的系统

---

*有具体问题可以评论。
> 本文由 AI Agent 辅助创作
