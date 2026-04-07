# 联盟营销配置指南

## 概述

本文档说明 MicRabbit 博客的联盟营销配置方案，包括联盟链接获取、接入步骤和提现方式。

---

## 已接入的联盟营销位置

### 1. 文章侧边栏（每篇文章）

位置：`/blog/:id` 页面右侧边栏

展示内容：
- Cursor AI（代码编辑器）
- 其他工具（根据文章内容动态展示）

### 2. 文章内工具推荐表格

每篇工具推荐类文章都包含工具推荐表格，如：
- `cursor-mcp-workflow-2026.md` - Cursor
- `rag-product-launch-week-1.md` - Supabase、Vercel
- `why-ai-team-not-single-ai-tool.md` - ChatGPT、Claude、DeepSeek

### 3. 专门的联盟推广页面

页面：`/affiliate`（待创建）

---

## Cursor 联盟链接获取步骤

### 1. 注册 Cursor

访问 [Cursor](https://cursor.com) 并注册账号

### 2. 申请联盟计划

Cursor 的联盟计划通常通过以下方式申请：

**方式一：直接申请**
1. 访问 https://cursor.com/affiliates 或 https://cursor.com/referral
2. 登录你的账号
3. 填写联盟申请（通常需要你的网站/博客地址）
4. 等待审核（1-3 个工作日）

**方式二：通过联盟平台**

Cursor 可能使用以下联盟平台：
- [Rewardful](https://www.rewardful.com) - 专为 SaaS 设计的联盟平台
- [PartnerStack](https://www.partnerstack.com) - B2B 联盟平台
- [ShareASale](https://www.shareasale.com) - 老牌联盟平台

### 3. 获取联盟链接

审核通过后，你会获得一个唯一的联盟链接，格式如：

```
https://cursor.com/affiliate?ref=micrabbit-xxx
或者
https://cursor.com/referral/YOUR_UNIQUE_ID
```

### 4. 替换代码中的占位符

```typescript
// src/views/BlogPost.vue
const affiliateLinks = {
  cursor: 'https://cursor.com/affiliate?ref=YOUR_AFFILIATE_ID', // 替换这里
  // ...
}
```

---

## 其他工具联盟链接获取

### Notion

1. 访问 https://www.notion.so/affiliates
2. 注册/登录 Notion 账号
3. 申请联盟计划
4. 获取联盟链接

**联盟佣金**：通常是 1 年订阅的 50% 佣金

### GitHub Copilot

1. 访问 https://github.com/features/copilot
2. GitHub 关联账号
3. GitHub 可能有联盟计划，通过 GitHub Marketplace 申请

### Vercel

1. 访问 https://vercel.com/affiliate
2. Vercel 有联盟计划，推荐他人使用可获得积分

### Supabase

1. 访问 https://supabase.com/affiliate
2. 申请加入联盟计划
3. 获取唯一的联盟链接

### DeepSeek

1. 访问 https://platform.deepseek.com
2. 查看是否有联盟/推荐计划

---

## 联盟佣金提现方式

### 1. PayPal（最常用）

大多数联盟计划支持 PayPal 提现：
- 设置 → 支付方式 → 添加 PayPal
- 佣金达到最低支付门槛后自动转账

**门槛**：通常 $10-$50

### 2. 银行转账（Wire Transfer）

- 支持直接转账到银行账户
- 通常有手续费（$15-$30）
- 最低支付门槛较高

### 3. 支票

- 部分联盟平台支持
- 速度慢，有手续费

### 4. 积分/信用（平台内）

- Vercel：佣金以积分形式返还，可抵扣账单
- 部分云服务：佣金以账号信用形式返还

### 5. 数字货币

- 部分新兴平台支持
- 波动风险大

---

## 佣金对比

| 平台 | 佣金比例 | 支付周期 | 最低门槛 | 支付方式 |
|------|---------|---------|---------|---------|
| Cursor | ~30% | 30天 | $50 | PayPal |
| Notion | 50% (首年) | 30天 | $50 | PayPal |
| GitHub | 积分 | 即时 | 无 | 账号积分 |
| Vercel | 积分 | 即时 | 无 | 账号积分 |
| Supabase | ~30% | 30天 | $50 | PayPal |
| DeepSeek | 待确认 | - | - | - |

---

## 合规要求

### FTC 规定（美国）

根据 FTC 规定，所有联盟营销推广必须明确披露：

✅ **已在推广卡片中添加**：
```
包含推广链接
```

✅ **在文章中添加**（如有联盟链接）：
```
*本文包含联盟链接，读者通过链接购买可能会获得佣金，但不影响购买价格。
```

### 中国广告法

根据中国广告法：
- 推广内容必须明确标注"广告"或"推广"
- 不得使用虚假或夸大宣传
- 佣金信息必须透明

---

## 下一步操作

**立即完成：**

1. **注册 Cursor 联盟** → https://cursor.com/affiliates
2. **获取联盟链接** → 替换代码中的占位符
3. **测试链接** → 确保跳转正常

**后续扩展：**

4. 申请 Notion 联盟
5. 申请 Supabase 联盟
6. 申请 Vercel 联盟
7. 创建 `/affiliate` 专门推广页面

---

## 联盟链接配置代码

```typescript
// src/views/BlogPost.vue

const affiliateLinks = {
  // Cursor - AI 代码编辑器
  cursor: 'https://cursor.com/affiliate?ref=YOUR_ID',

  // Notion - 文档协作
  notion: 'https://notion.so/affiliate?ref=YOUR_ID',

  // GitHub Copilot - AI 编程助手
  github: 'https://github.com/premium?ref=YOUR_ID',

  // Vercel - 前端部署
  vercel: 'https://vercel.com/?ref=YOUR_ID',

  // Supabase - 后端即服务
  supabase: 'https://supabase.com/affiliate?ref=YOUR_ID',

  // DeepSeek - AI API
  deepseek: 'https://platform.deepseek.com/affiliate?ref=YOUR_ID',
}
```

---

## 追踪和分析

### UTM 参数

为每个联盟链接添加 UTM 参数，方便追踪：

```typescript
const getAffiliateLink = (baseUrl: string, campaign: string) => {
  const utmParams = new URLSearchParams({
    utm_source: 'micrabbit-blog',
    utm_medium: 'affiliate',
    utm_campaign: campaign,
  })
  return `${baseUrl}?${utmParams.toString()}`
}

// 使用示例
const cursorLink = getAffiliateLink('https://cursor.com/affiliate', 'cursor-mcp-article')
```

### Google Analytics 事件追踪

```typescript
// 联盟链接点击追踪
const trackAffiliateClick = (toolName: string) => {
  if (window.gtag) {
    window.gtag('event', 'affiliate_click', {
      event_category: 'affiliate',
      event_label: toolName,
    })
  }
}
```
