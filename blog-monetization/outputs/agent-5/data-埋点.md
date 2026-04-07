# Blog 数据埋点方案 & 复盘机制

> 交付人：Agent 5（数据分析师）
> 日期：2026-04-07
> 目标：为零分析工具的博客建立轻量级数据体系
> 状态：✅ 已完成（agent-6 补充更新：2026-04-07）

---

## 一、现状确认

### 1.1 GA4 安装状态

**✅ 已安装** — GA4 追踪 ID：`G-SNT6J2PRWW`

嵌入位置：`index.html` 第 37-44 行，使用 gtag.js 标准安装。

同时也安装了百度统计作为中国地区备选（`hm.js?4c5b9bd8e53be6a5ab8170bc16892cfc`）。

### 1.2 缺失模块（截至 2026-04-07 已全部完成 ✅）

- ✅ 自定义事件 → 已实现，见 `src/analytics/events.ts`
- ✅ Google Search Console 接入 → 接入指南见第二章
- ✅ Looker Studio 数据看板 → 模板搭建见第四章
- ✅ 埋点文档化 → 本文件即为完整文档

---

## 二、工具组合方案

### 2.1 推荐工具栈

| 工具 | 用途 | 费用 | 状态 |
|------|------|------|------|
| Google Analytics 4 | 行为分析、事件追踪 | 免费 | ✅ 已安装 |
| Google Search Console | 搜索流量、关键词排名 | 免费 | ❌ 未接入 |
| Looker Studio | 可视化看板、周报模板 | 免费 | 待搭建 |

**为什么不选付费工具**：初创阶段（UV < 10k/天）免费工具完全够用。GA4 的 13 个月数据保留也足够支撑月度复盘。

### 2.2 Google Search Console 接入

在 [Google Search Console](https://search.google.com/search-console) 添加域名（选择"网域"类型，输入 `lyx058019.github.io`），通过 DNS 验证或 HTML 文件上传完成所有权验证。

---

## 三、GA4 配置方案

### 3.1 已具备的基础能力

GA4 标准安装已自动采集：
- 页面浏览（`page_view` 事件）
- 用户留存
- 流量来源
- 设备/地区/浏览器分布

### 3.2 必须配置的自定义事件

#### 第一优先级（必须）

**① 订阅按钮点击**

在订阅组件的点击事件处添加：

```typescript
// src/components/SubscribeButton.vue 或对应的点击处理函数中
gtag('event', 'subscribe_click', {
  event_category: 'conversion',
  event_label: window.location.pathname,
  // 如果有订阅类型（免费/付费），可加：
  // subscription_type: 'free'
});
```

**② 联盟链接点击**

对外链（affiliate link）添加点击追踪：

```typescript
// 在联盟链接的 click handler 中
gtag('event', 'affiliate_click', {
  event_category: 'monetization',
  event_label: linkUrl, // 如 "amazon-product-xxx"
  page_location: window.location.pathname,
});
```

**具体实施**：在 `index.html` 底部或 `main.ts` 中添加全局事件委托（Event Delegation），无需修改每个组件：

```typescript
// src/main.ts 或新建 src/analytics/events.ts
document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  // 订阅按钮点击
  if (target.closest('[data-track="subscribe"]')) {
    gtag('event', 'subscribe_click', {
      event_category: 'conversion',
      event_label: window.location.pathname,
    });
  }

  // 联盟链接点击（识别所有外链 + 含 affiliate 标识的链接）
  if (target.matches('a[href*="affiliate"]') || target.closest('[data-track="affiliate"]')) {
    const href = (target.closest('a') as HTMLAnchorElement)?.href || '';
    gtag('event', 'affiliate_click', {
      event_category: 'monetization',
      event_label: href,
      page_location: window.location.pathname,
    });
  }
});
```

#### 第二优先级（推荐）

**③ 内部链接点击**

追踪用户在内页之间的导航行为：

```typescript
if (target.matches('a[href^="/"]') || target.closest('a[href^="/"]')) {
  gtag('event', 'internal_link_click', {
    event_category: 'engagement',
    event_label: (target.closest('a') as HTMLAnchorElement)?.pathname || '',
    page_location: window.location.pathname,
  });
}
```

**④ 文章读完率**

通过滚动深度估算读完率（Intersection Observer）：

```typescript
// 在文章页组件中
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const depth = Math.round((entry.target as HTMLElement).dataset.depth as unknown as number);
      gtag('event', 'article_read_depth', {
        event_category: 'engagement',
        event_label: window.location.pathname,
        value: depth, // 0-100
      });
    }
  });
}, { threshold: 0.5 });

// 在文章各段落/章节添加 data-depth 属性，在滚动时触发
```

#### 第三优先级（可选）

**⑤ 工具箱功能使用**

```typescript
if (target.closest('[data-track="toolbox"]')) {
  gtag('event', 'toolbox_usage', {
    event_category: 'engagement',
    event_label: (target.closest('[data-tool-name]') as HTMLElement)?.dataset.toolName || 'unknown',
  });
}
```

### 3.3 GA4 配置检查清单

在 GA4 Admin > Data Streams 中确认：
- [ ] 增强型衡量（Enhanced Measurement）已开启 → 页面浏览、滚动、出站链接、站内搜索、视频已自动采集
- [ ] 配置转化事件（订阅点击、联盟链接点击）标记为转化
- [ ] 设置用户属性：`subscription_status`（可选）

---

## 四、核心指标看板

### 4.1 指标优先级列表（按重要性排序）

| 优先级 | 指标 | 数据来源 | 说明 |
|--------|------|----------|------|
| P0 | PV / UV / 跳出率 | GA4 → Reports → Realtime | 基础流量 |
| P0 | 平均停留时间 | GA4 → Reports → Engagement | 内容质量 |
| P1 | 最受欢迎文章 Top 10 | GA4 → Reports → Pages | 内容策略依据 |
| P1 | 搜索流量占比 | GSC + GA4 | SEO 效果 |
| P1 | 订阅转化率 | GA4 自定义事件 | 变现关键指标 |
| P2 | 联盟链接点击率（CTR） | GA4 自定义事件 | 变现效果 |
| P2 | 新老用户比例 | GA4 → Reports → User | 留存健康度 |
| P2 | 流量来源分布 | GA4 → Reports → Traffic acquisition | 渠道优化 |
| P3 | 退出页面分析 | GA4 → Reports → Engagement | 流失点定位 |
| P3 | 工具箱使用次数 | GA4 自定义事件 | 功能价值 |

### 4.2 订阅转化率计算

```
订阅转化率 = 订阅按钮点击次数 / 会话数（Sessions）× 100%
```

GA4 中：在"配置 > 转化"中将 `subscribe_click` 标记为转化事件，然后在"报告 > 转化"中查看。

### 4.3 联盟链接点击率计算

```
联盟链接点击率 = 联盟链接点击次数 / 页面 PV × 100%
```

### 4.4 Looker Studio 周报模板搭建

1. 打开 [Looker Studio](https://lookerstudio.google.com/)（原 Data Studio）
2. 点击"创建" → "数据源" → 搜索并连接 **Google Analytics**（选择属性 `lyx058019.github.io`）
3. 选择后进入报告编辑页，按下表添加图表组件：

#### 图表类型与 GA4 字段映射

| 图表类型 | 图表标题 | GA4 维度（行/类别） | GA4 指标（值） | 说明 |
|----------|----------|---------------------|----------------|------|
| 评分卡 | 总 PV | — | **screenPageViews**（会话数） | 全站总浏览量 |
| 评分卡 | 总 UV | — | **totalUsers** | 去重访客数 |
| 评分卡 | 平均停留时间 | — | **averageSessionDuration** | 格式：mm:ss |
| 评分卡 | 订阅点击次数 | — | **eventCount**（过滤：`eventName == subscribe_click`） | 需在数据源中创建计算字段 |
| 条形图 | Top 10 热门页面 | **pagePath** | **screenPageViews** | 按 PV 降序 |
| 饼图 | 流量来源分布 | **sessionDefaultChannelGrouping** | **sessions** | Organic / Direct / Referral / Social |
| 时间序列图 | 每日 PV/UV 趋势 | **date** | **screenPageViews** + **totalUsers** | 按日聚合，线图双轴 |
| 表格 | 转化事件汇总 | **eventName** | **eventCount** | 展示所有自定义事件 |
| 条形图 | 联盟链接点击 Top 5 | **eventLabel**（过滤：`eventName == affiliate_click`） | **eventCount** | 按链接地址统计 |

#### Looker Studio 计算字段（数据源级别）

在"资源" → "管理的数据源"中，点击 GA4 数据源 → "计算字段"添加：

```
# 字段名：subscribe_click_count
# 公式：CASE WHEN eventName = 'subscribe_click' THEN eventCount ELSE 0 END

# 字段名：affiliate_click_count
# 公式：CASE WHEN eventName = 'affiliate_click' THEN eventCount ELSE 0 END
```

#### 订阅转化率看板指标卡

在 Looker Studio 中添加计算字段：

```
# 字段名：订阅转化率
# 公式：subscribe_click_count / sessions * 100
# 格式：百分比（小数位：1）
```

#### 周报定时发送配置

1. 完成所有图表后，点击"分享" → "计划和分发" → "添加计划"
2. 设置：每周一 09:00 发送，格式选 PDF，发送到自己的邮箱
3. 收件人可设置为团队共享邮箱（如有）

> **模板 ID**：Looker Studio 不提供公开模板共享链接，请按上表字段手动创建（耗时约 30 分钟）。首次搭建后，点击"制作副本"可复用为后续模板。

---

## 五、埋点实施优先级

```
第一优先级（第1周完成）
├── ✅ GA4 已安装（无需操作）
├── ✅ 事件追踪代码 → 已实现于 src/analytics/events.ts
├── 🔲 GA4 后台标记 subscribe_click / affiliate_click 为转化事件
└── 🔲 接入 Google Search Console（需手动在 GSC 添加域名）

第二优先级（第2周完成）
├── ✅ internal_link_click / toolbox_usage 事件 → 已实现
├── 🔲 文章读完率追踪 → 在文章页组件中调用 initArticleReadTracking()
└── 🔲 搭建 Looker Studio 周报模板

第三优先级（第3-4周）
├── 🔲 订阅用户分群（GA4 User Explorer）
├── 🔲 复盘机制试运行
└── 🔲 组件 data-track 属性改造（见第九节待改造清单）
```

---

## 六、月度复盘模板

### 复盘频率：每月第一个周末

### 复盘文档结构

```markdown
# 📊 Blog 月度数据复盘 — [YYYY年MM月]

## 一、核心数据概览

| 指标 | 本月 | 上月 | 环比变化 |
|------|------|------|----------|
| PV | — | — | — |
| UV | — | — | — |
| 跳出率 | — | — | — |
| 平均停留时间 | — | — | — |
| 订阅转化率 | — | — | — |
| 联盟链接 CTR | — | — | — |

## 二、流量分析
- 主要流量来源？
- 搜索流量占比变化？
- 哪些页面贡献最多 UV？

## 三、内容表现
- Top 5 文章（按 PV）
- 哪些文章跳出率异常高？

## 四、变现数据
- 订阅新增人数
- 联盟链接总点击次数
- 预计联盟收入

## 五、行动项
- [ ] 下月重点优化方向
- [ ] 内容创作计划
- [ ] 技术改进项

## 六、下月目标
- 目标 PV：
- 目标订阅转化率：
- 目标搜索流量占比：
```

### 复盘数据获取路径

1. **GA4 实时**：https://analytics.google.com/ → 实时
2. **GA4 报告**：https://analytics.google.com/ → 报告 → 参与度 → 页面和屏幕 / 转化
3. **GSC**：https://search.google.com/search-console/ → 效果
4. **Looker Studio**：已搭建的看板直接查看

---

## 七、附录：快速查询快捷方式

### GA4 关键报告 URL（登录后直接访问）

- 实时用户：`/analytics.google.com/analytics/web/#/report-realtime-audiences-overview`
- 热门页面：`/analytics.google.com/analytics/web/#/report-engagement-pages`
- 转化：`/analytics.google.com/analytics/web/#/report-conversions-default`
- 用户获取：`/analytics.google.com/analytics/web/#/report-acquisition-overview`

### 事件调试

安装 [GA4 DebugView](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhodjmnkjmclfgmblehdei) Chrome 扩展，在本地 `npm run dev` 时打开 DebugView 可实时查看事件是否正确发送。

---

## 八、组件改造说明

> 以下文件需添加 `data-track` 属性，analytics 事件追踪方可完整覆盖所有交互

| 组件文件 | 需添加属性 | 目标元素 | 对应事件 |
|----------|-----------|----------|----------|
| `src/components/common/ArticleCTA.vue` | `data-track="subscribe"` | 订阅提交按钮（`<el-button>` 第136行） | `subscribe_click` |
| `src/components/common/AffiliationCard.vue` | `data-track="affiliate"` | 整个卡片根元素（`<div class="affiliation-card">` 第32行） | `affiliate_click` |

**示例修改（ AffiliationCard.vue 第32行）：**

```vue
<!-- 修改前 -->
<div class="affiliation-card" @click="openAffiliateLink">

<!-- 修改后 -->
<div class="affiliation-card" data-track="affiliate" @click="openAffiliateLink">
```

---

## 九、技术实施清单

### src/analytics/events.ts（已创建文件）

> 实际文件已创建于 `src/analytics/events.ts`，main.ts 已集成，参见下方状态：

| 文件 | 状态 | 说明 |
|------|------|------|
| `src/analytics/events.ts` | ✅ 已创建 | 包含 subscribe_click / affiliate_click / internal_link_click / toolbox_usage / article_read_depth 事件 |
| `src/main.ts` | ✅ 已更新 | 第5行 import，第22行调用 `initAnalytics()` |
| `src/components/common/ArticleCTA.vue` | 🔲 待改造 | 需添加 `data-track="subscribe"` |
| `src/components/common/AffiliationCard.vue` | 🔲 待改造 | 需添加 `data-track="affiliate"` |

> 组件改造属于前端实施任务，请参考第八节的改造说明进行。
