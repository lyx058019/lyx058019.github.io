---
title: "前端工程化自检清单（个人项目）"
date: "2026-01-26"
description: "一个偏实用的 checklist：类型、构建、测试、代码质量、发布与可维护性。"
tags: ["工程化", "TypeScript", "质量"]
---

# 前端工程化自检清单（个人项目）

做个人项目时很容易"能跑就行"，但如果希望它长期可维护，可以用一个简单 checklist 约束自己。

---

## 1. 类型与边界

- [ ] 关键数据结构有明确类型（例如：文章索引、工具列表、项目列表）
- [ ] 对外部输入做兜底（URL 参数、frontmatter 字段类型不确定时）
- [ ] 使用 TypeScript strict 模式
- [ ] 避免使用 `any`，用 `unknown` 代替

```typescript
// ✅ 好的类型定义
interface PostIndex {
  id: string
  title: string
  date: string
  description: string
  tags: string[]
}

// ✅ 对外部输入做兜底
const parseDate = (input: unknown): string => {
  if (typeof input === 'string') return input
  return new Date().toISOString()
}
```

---

## 2. 构建与产物

- [ ] 构建前生成必要的静态产物（例如 posts 索引、sitemap/rss）
- [ ] 产物生成规则清晰、可重复、无需手工修改
- [ ] 使用环境变量管理敏感配置
- [ ] 构建脚本放在 `scripts/` 目录

```bash
# 构建顺序
npm run posts:index  # 先生成索引
npm run seo:gen      # 再生成 SEO 文件
npm run build        # 最后构建项目
```

---

## 3. 性能

- [ ] 列表页不要把"正文内容"一起打包进来
- [ ] 路由页面按需加载
- [ ] 资源按需引入（组件、样式）
- [ ] 图片使用懒加载和 WebP 格式

```typescript
// ✅ 路由按需加载
const BlogPost = () => import('../views/BlogPost.vue')

// ✅ 图片懒加载
<img src="image.webp" loading="lazy" alt="..." />
```

---

## 4. 测试与回归

- [ ] 核心工具功能有单测（如 JSON 格式化、URL 编解码）
- [ ] 每次改动能快速跑一遍 `npm test -- --run`
- [ ] 使用 Vitest 或 Jest
- [ ] 集成测试覆盖关键路径

```typescript
// ✅ 示例单测
import { describe, it, expect } from 'vitest'

describe('URL Encoder', () => {
  it('编码特殊字符', () => {
    expect(encodeURIComponent('你好 世界')).toBe('%E4%BD%A0%E5%A5%BD%20%E4%B8%96%E7%95%8C')
  })
})
```

---

## 5. 可读性与维护

- [ ] 脚本集中在 `scripts/`，README 说明用途
- [ ] 数据集中在 `src/data/`，减少散落硬编码
- [ ] 组件按功能分组，不是按类型分组
- [ ] 提交信息遵循 Conventional Commits

```bash
# ✅ 好的提交信息
feat: 添加新的工具页面
fix: 修复博客列表分页问题
docs: 更新 SEO 配置说明
```

---

## 6. 部署与 CI/CD

- [ ] 使用 GitHub Actions 自动部署
- [ ] 部署前运行测试
- [ ] 关键环境变量在 CI/CD 中配置
- [ ] 构建产物有版本号

```yaml
# GitHub Actions 示例
- name: Build and Deploy
  run: npm run build
  env:
    NODE_ENV: production
```

---

## 效率对比

| 检查项 | 没有检查 | 有检查 | 长期收益 |
|--------|---------|--------|---------|
| 类型错误 | 线上 Bug | 编译时报错 | **80% Bug 减少** |
| 构建产物 | 手动维护 | 自动生成 | **90% 维护时间节省** |
| 性能优化 | 页面卡顿 | 流畅体验 | **50% 用户留存提升** |
| 测试覆盖 | 重构恐惧 | 重构自信 | **3x 重构速度** |

---

## 工具推荐

| 工具 | 用途 | 推荐理由 |
|------|------|---------|
| [TypeScript](https://www.typescriptlang.org) | 类型系统 | VS Code 原生支持 |
| [Vite](https://vitejs.dev) | 构建工具 | 极速开发体验 |
| [Vitest](https://vitest.dev) | 单元测试 | Vite 原生集成 |
| [GitHub Actions](https://github.com/features/actions) | CI/CD | 免费，GitHub 集成 |
| [ESLint](https://eslint.org) | 代码检查 | 自动修复问题 |
| [Prettier](https://prettier.io) | 代码格式化 | 统一风格 |

---

## CTA

**想搭建一个工程化的个人项目？**

我用的这套技术栈：[Vue 3 + Vite + TypeScript + Vitest](/blog/markdown-blog-vue-vite)，开源免费。

或者预约我的咨询服务：

👉 [技术咨询 - 工程化方案](/consulting)

帮你评审：你的项目有哪些工程化问题？怎么改？

---

## 相关阅读

- [《用 Markdown 搭一个轻量博客》](/blog/markdown-blog-vue-vite)
- [《网站 SEO 基础：Sitemap 与 RSS》](/blog/seo-sitemap-rss)
- [《Cursor + MCP 自动化工作流》](/blog/cursor-mcp-workflow-2026)（即 `cursor-mcp-workflow-2026`，站内即将补充）
