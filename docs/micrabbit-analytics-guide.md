# MicRabbit 数据分析体系指南

> 建立数据驱动的内容创作与商业变现体系
> 更新时间：2026-04-06

---

## 目录

1. [核心数据指标体系表](#1-核心数据指标体系表)
2. [静态博客数据埋点集成指南](#2-静态博客数据埋点集成指南)
3. [周度数据复盘报告模板](#3-周度数据复盘报告模板)
4. [迭代优化行动清单模板](#4-迭代优化行动清单模板)

---

## 1. 核心数据指标体系表

### A. 流量指标

| 指标名称 | 计算方式 | 数据来源 | 目标值（Month 3） | 目标值（Month 6） | 备注 |
|---------|---------|---------|-------------------|-------------------|------|
| **UV（独立访客）** | 30天内去重Cookie数 | GA4/百度统计 | 日均500 | 日均2000 | 核心北极星指标 |
| **PV（页面浏览量）** | 页面累计加载次数 | GA4/百度统计 | 日均1500 | 日均6000 | 反映内容消费量 |
| **收录量（Google）** | site:lyx058019.github.io | Google Search Console | 30篇 | 80篇 | SEO健康度指标 |
| **收录量（Baidu）** | site:lyx058019.github.io | 百度搜索资源平台 | 30篇 | 80篇 | 中文SEO必需 |
| **关键词排名数量** | 进入前20的关键词数 | GSC/百度统计 | 20个 | 60个 | 反映SEO竞争力 |
| **外链数量** | 反向链接总数 | Ahrefs/GSC | 50条 | 200条 | 域名权重指标 |
| **引荐流量** | 从外部网站点击进入 | GA4 | 日均20 | 日均100 | 内容传播度指标 |

### B. 用户行为指标

| 指标名称 | 计算方式 | 数据来源 | 目标值 | 告警阈值 | 备注 |
|---------|---------|---------|-------|---------|------|
| **平均停留时长** | 用户在站总时长/会话数 | GA4 | >2分钟 | <90秒 | 内容质量核心指标 |
| **跳出率** | 单页会话/总会话数 | GA4 | <60% | >75% |  landing page优化依据 |
| **订阅转化率** | 订阅成功数/UV | GA4 | >2% | >3.5% | 邮箱列表增长关键 |
| **页面深度** | 浏览页数/会话 | GA4 | >2.5页 | <1.8页 | 内容粘性指标 |
| **回访率** | 回访用户/总用户 | GA4 | >15% | >25% | 粉丝忠诚度指标 |
| **阅读完成率** | 完成阅读的用户/进入用户 | 自定义事件 | >30% | >45% | 文章质量指标 |
| **滚动深度** | 滚动>75%的用户占比 | 自定义事件 | >25% | >40% | 内容参与度 |

### C. 转化指标

| 指标名称 | 计算方式 | 数据来源 | 目标值 | 告警阈值 | 备注 |
|---------|---------|---------|-------|---------|------|
| **CTA点击率（在线咨询）** | CTA点击/页面UV | 自定义事件 | >3% | <1.5% | 咨询服务入口 |
| **CTA点击率（打赏）** | 打赏按钮点击/文章UV | 自定义事件 | >5% | <2% | 变现转化漏斗 |
| **订阅转化率** | 订阅成功/订阅表单展示 | 自定义事件 | >8% | <3% | 订阅漏斗优化 |
| **联盟链接点击率** | 联盟链接点击/展示 | 自定义事件 | >2% | <0.5% | 联盟营销效果 |
| **预约咨询转化率** | 预约提交/咨询页UV | 自定义事件 | >5% | <2% | 付费服务转化 |
| **表单填写完成率** | 完成填写/开始填写 | 自定义事件 | >60% | <30% | 表单优化依据 |

### D. 收入指标

| 指标名称 | 计算方式 | 数据来源 | Month 3目标 | Month 6目标 | 备注 |
|---------|---------|---------|------------|------------|------|
| **打赏收入** | 实际到账金额 | 微信/支付宝 | ¥500/月 | ¥2000/月 | 最快变现路径 |
| **咨询收入** | 咨询套餐销售 | 人工统计 | ¥1000/月 | ¥5000/月 | 高客单价服务 |
| **联盟佣金** | 联盟平台结算 | 联盟后台 | ¥300/月 | ¥1500/月 | 被动收入 |
| **ARPU** | 总收入/总用户 | 计算得出 | ¥0.5 | ¥1.5 | 用户价值指标 |
| **变现转化率** | 付费用户/总用户 | 计算得出 | >0.5% | >1% | 变现健康度 |
| **内容ROI** | 收入/内容生产成本 | 计算得出 | >50% | >150% | 内容投资回报 |

---

## 2. 静态博客数据埋点集成指南

### 方案A：Google Analytics 4（全球适用）

#### GA4 账号创建步骤

1. **注册 GA4**
   - 访问 [Google Analytics](https://analytics.google.com/)
   - 使用 Google 账号登录，点击 "Start measuring"
   - 填写账户名称（建议使用 "MicRabbit"）

2. **创建媒体资源**
   - 填写网站名称："MicRabbit Blog"
   - 选择报告时区："中国标准时间 (CST)"
   - 选择币种："人民币 (CNY)"
   - 点击 "Next"

3. **填写业务信息**
   - 选择业务规模："个人/小型企业"
   - 选择主要用途："衡量营销业绩"
   - 点击 "Create"

4. **获取 Measurement ID**
   - 在 "Web" 平台上创建数据流
   - 填写网站 URL：`https://lyx058019.github.io/`
   - 获得 Measurement ID：`G-XXXXXXXXXX`（替换占位符）

#### 增强型 eCommerce 配置代码

在 `index.html` 中替换现有的 GA4 占位符：

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_MEASUREMENT_ID', {
    // 增强型 ecommerce
    'send_page_view': true,
    'cookie_flags': 'SameSite=None;Secure',
    // 自定义维度
    'custom_map': {
      'dimension1': 'content_type',
      'dimension2': 'post_category',
      'dimension3': 'user_subscription_status'
    }
  });

  // 全局事件追踪函数
  window.trackEvent = function(category, action, label, value) {
    gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value
    });
  };
</script>
```

#### 关键事件追踪代码

在 Vue 组件中使用：

```typescript
// src/utils/analytics.ts

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    trackEvent: (category: string, action: string, label?: string, value?: number) => void;
  }
}

// 事件追踪辅助函数
export const analytics = {
  // CTA按钮点击
  trackCTAClick: (ctaType: 'consulting' | 'coffee' | 'newsletter', location: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: `${ctaType}_${location}`,
        value: 1
      });
    }
  },

  // 订阅行为
  trackSubscribe: (status: 'success' | 'error' | 'abandon', email?: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', status === 'success' ? 'subscribe' : 'subscribe_failed', {
        event_category: 'conversion',
        event_label: status,
        value: status === 'success' ? 1 : 0
      });
    }
  },

  // 文章阅读深度
  trackReadingProgress: (postId: string, progress: number) => {
    if (typeof window.gtag !== 'undefined' && progress % 25 === 0) {
      // 每25%报告一次
      window.gtag('event', 'reading_progress', {
        event_category: 'engagement',
        event_label: postId,
        value: progress
      });
    }
  },

  // 联盟链接点击
  trackAffiliateClick: (affiliateId: string, affiliateName: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'affiliate_click', {
        event_category: 'monetization',
        event_label: affiliateName,
        value: 1
      });
    }
  },

  // 外部链接点击
  trackExternalLink: (url: string, linkText: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'external_link_click', {
        event_category: 'engagement',
        event_label: linkText,
        url: url
      });
    }
  },

  // 页面浏览（带内容类型）
  trackPageView: (path: string, contentType: string, postCategory?: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-YOUR_MEASUREMENT_ID', {
        page_path: path,
        content_type: contentType,
        post_category: postCategory || 'general'
      });
    }
  }
};
```

#### 在 Vue 组件中使用示例

```typescript
// ArticleCTA.vue 中的使用
import { analytics } from '@/utils/analytics'

const handleSubscribe = () => {
  if (!email.value || !email.value.includes('@')) {
    analytics.trackSubscribe('error')
    return
  }
  // 订阅逻辑...
  analytics.trackSubscribe('success')
  subscribeStatus.value = 'success'
}

// CTA按钮点击
const handleCTAClick = (type: 'consulting' | 'coffee') => {
  analytics.trackCTAClick(type, 'article_cta')
}
```

---

### 方案B：Plausible Analytics（隐私友好）

#### 优点
- GDPR 合规，无需 Cookie Consent 提示
- 不使用 Cookie，无隐私问题
- 轻量级，页面加载无感知
- 提供实时访客、页面浏览、跳出率、时长等核心指标

#### 集成步骤

1. **注册 Plausible**
   - 访问 [Plausible](https://plausible.io/)
   - 使用邮箱注册（GitHub 登录也可）
   - 创建网站：`lyx058019.github.io`

2. **获取 Site Key**
   - 在设置中获得 `X`（显示为 `your-domain.com`）

#### 集成代码

在 `index.html` 的 `<head>` 中添加：

```html
<!-- Plausible Analytics -->
<script defer data-domain="lyx058019.github.io" src="https://plausible.io/js/script.tagged-events.js"></script>
<script>
  window.plausible = window.plausible || function() {
    (window.plausible.q = window.plausible.q || []).push(arguments)
  }
</script>
```

#### 事件追踪代码

```typescript
// 自定义事件追踪
declare global {
  interface Window {
    plausible: (event: string, options?: { callback?: () => void; props?: Record<string, string | number> }) => void;
  }
}

export const plausible = {
  // CTA点击
  trackCTA: (type: string, location: string) => {
    if (typeof window.plausible !== 'undefined') {
      window.plausible('cta_click', { props: { type, location } });
    }
  },

  // 订阅
  trackSubscribe: (status: string) => {
    if (typeof window.plausible !== 'undefined') {
      window.plausible(status === 'success' ? 'subscribe' : 'subscribe_error');
    }
  },

  // 阅读深度
  trackReading: (postId: string, progress: number) => {
    if (typeof window.plausible !== 'undefined' && progress % 25 === 0) {
      window.plausible('reading_progress', { props: { post_id: postId, progress } });
    }
  },

  // 外部链接
  trackOutbound: (url: string) => {
    if (typeof window.plausible !== 'undefined') {
      window.plausible('outbound_click', { props: { url } });
    }
  }
};
```

---

### 方案C：百度统计（大陆地区 SEO 必需）

#### 账号创建步骤

1. **注册百度统计**
   - 访问 [百度统计](https://tongji.baidu.com/)
   - 使用百度账号登录
   - 点击 "添加网站"，填写：
     - 网站域名：`lyx058019.github.io`
     - 网站名称：`MicRabbit`
     - 网站类型：`个人网站`

2. **获取统计代码**
   - 在 "获取代码" 页面复制 hm.js 的 ID
   - 格式：`hm.js?xxxxxxxxxxxxxx`

3. **验证安装**
   - 将代码添加到网站后，等待 30 分钟
   - 在百度统计后台确认代码生效

#### 完整集成代码

在 `index.html` 中替换现有的百度统计占位符：

```html
<!-- 百度统计 -->
<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_STATISTICS_ID";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
</script>
```

#### 事件追踪代码

```typescript
// 百度统计事件追踪
declare global {
  interface Window {
    _hmt: any[];
  }
}

export const baiduTongji = {
  // 页面浏览
  trackPageView: (pagePath: string) => {
    if (typeof window._hmt !== 'undefined') {
      window._hmt.push(['_setAutoPageview', true]);
      window._hmt.push(['_trackPageview', pagePath]);
    }
  },

  // 自定义事件
  trackEvent: (category: string, action: string, label?: string, value?: number) => {
    if (typeof window._hmt !== 'undefined') {
      window._hmt.push(['_trackEvent', category, action, label, value]);
    }
  },

  // CTA点击
  trackCTA: (type: string, location: string) => {
    baiduTongji.trackEvent('CTA', 'click', `${type}_${location}`);
  },

  // 订阅
  trackSubscribe: (status: string) => {
    baiduTongji.trackEvent('Conversion', 'subscribe', status);
  },

  // 联盟链接
  trackAffiliate: (name: string) => {
    baiduTongji.trackEvent('Monetization', 'affiliate_click', name);
  }
};
```

---

### 事件追踪最佳实践

#### 必须追踪的行为（优先级排序）

| 优先级 | 行为 | 追踪事件名 | 参数 |
|-------|------|-----------|------|
| P0 | 页面浏览 | `page_view` | path, content_type |
| P0 | 订阅成功 | `subscribe` | email_domain |
| P1 | CTA点击（在线咨询） | `cta_click` | cta_type, location |
| P1 | CTA点击（打赏） | `coffee_click` | location |
| P1 | 咨询预约提交 | `consulting_submit` | package_type |
| P2 | 文章阅读进度 | `reading_progress` | post_id, progress |
| P2 | 联盟链接点击 | `affiliate_click` | affiliate_id, affiliate_name |
| P2 | 外部链接点击 | `outbound_click` | url, link_text |
| P3 | 视频播放（如有） | `video_play` | video_id, position |
| P3 | 文件下载 | `file_download` | file_name, file_type |

#### 追踪代码放置位置

```
index.html (全局Head)
├── GA4 / Plausible / 百度统计基础代码
└── 全局事件追踪函数定义

src/main.ts (应用入口)
├── 路由切换时触发 page_view
└── 初始化用户会话

src/views/BlogPost.vue (文章页)
├── 进入文章 → trackPageView
├── 滚动进度25%/50%/75%/100% → trackReadingProgress
└── 离开文章 → 发送最终阅读深度

src/components/common/ArticleCTA.vue (CTA组件)
├── 订阅表单提交 → trackSubscribe
├── 在线咨询按钮点击 → trackCTAClick
└── 打赏按钮点击 → trackCoffeeClick

src/views/Consulting.vue (咨询页)
├── 套餐查看 → trackPackageView
├── 预约表单提交 → trackConsultingSubmit
└── FAQ展开 → trackFAQExpand

src/components/common/AffiliationCard.vue (联盟卡片)
├── 联盟链接点击 → trackAffiliateClick
└── 卡片展示 → trackAffiliateImpression
```

---

## 3. 周度数据复盘报告模板

### 周报格式

```markdown
# MicRabbit 周度数据复盘报告

**报告周期**：2026-04-01 ~ 2026-04-06（第14周）
**报告人**：MicRabbit
**数据更新时间**：每周一 10:00

---

## 一、核心指标概览

| 指标 | 上周值 | 本周值 | 环比变化 | 目标值 | 达成率 |
|-----|-------|-------|---------|-------|--------|
| 日均UV | 320 | 385 | +20.3% | 500 | 77% |
| 日均PV | 890 | 1020 | +14.6% | 1500 | 68% |
| 平均停留时长 | 1分45秒 | 2分03秒 | +17.1% | 2分钟 | 102% |
| 跳出率 | 68% | 62% | -8.8% | <60% | 96% |
| 订阅转化率 | 1.8% | 2.1% | +16.7% | 2% | 105% |
| 页面深度 | 2.3页 | 2.5页 | +8.7% | 2.5页 | 100% |

---

## 二、流量分析

### 2.1 流量来源分布

| 来源 | 会话数 | 占比 | 环比 |
|-----|-------|------|-----|
| 自然搜索 | 1,850 | 52% | +12% |
| 直接访问 | 920 | 26% | +5% |
| 社交媒体 | 480 | 14% | +8% |
| 外链引荐 | 280 | 8% | +25% |

### 2.2 热门页面 TOP 5

| 排名 | 页面路径 | 浏览量 | 平均时长 | 跳出率 |
|-----|---------|-------|---------|-------|
| 1 | /blog/rag-mcp-2026 | 420 | 4分12秒 | 35% |
| 2 | /blog/ai-team-oneperson | 385 | 3分45秒 | 42% |
| 3 | /consulting | 290 | 2分30秒 | 55% |
| 4 | /blog/ai-vs-marketing-team | 265 | 3分02秒 | 48% |
| 5 | / | 230 | 1分15秒 | 72% |

### 2.3 SEO 关键词排名变化

**新进入前20的关键词：**
| 关键词 | 当前排名 | 搜索量 | 目标页面 |
|-------|---------|-------|---------|
| AI一人公司 | #15 | 1200/月 | /blog/ai-team-oneperson |
| RAG知识库搭建 | #18 | 800/月 | /blog/rag-mcp-2026 |

**排名下降的关键词：**
| 关键词 | 排名变化 | 问题分析 |
|-------|---------|---------|
| Vue3教程 | #22→#28 | 竞争对手内容优化 |

---

## 三、用户行为分析

### 3.1 内容消费深度

```
阅读完成率分布：
[██████████████████████████░░] 75-100% 完成: 28%
[████████████████████░░░░░░░░] 50-75% 完成: 22%
[██████████░░░░░░░░░░░░░░░░░░] 25-50% 完成: 31%
[████████░░░░░░░░░░░░░░░░░░░░] <25% 完成: 19%
```

### 3.2 转化漏斗分析

| 阶段 | 人数 | 流失率 | 环比 |
|-----|-----|-------|-----|
| 文章页UV | 2,680 | - | +15% |
| CTA展示曝光 | 1,876 | 30% | +18% |
| CTA点击 | 186 | 10% | +12% |
| 订阅表单填写 | 62 | 67% | +5% |
| 订阅成功 | 38 | 39% | +8% |

---

## 四、变现数据

### 4.1 本周收入

| 渠道 | 收入 | 订单数 | ARPU |
|-----|-----|-------|-----|
| 打赏 | ¥85 | 7笔 | ¥12.1 |
| 咨询 | ¥0 | 0 | - |
| 联盟 | ¥45 | 3笔 | ¥15 |
| **合计** | **¥130** | - | - |

### 4.2 联盟营销数据

| 推广产品 | 点击数 | 转化数 | 佣金 |
|---------|-------|-------|-----|
| Cursor AI | 45 | 2 | ¥30 |
| Notion | 28 | 1 | ¥15 |

---

## 五、异常检测与告警

### 5.1 本周异常事件

| # | 时间 | 指标 | 异常描述 | 初步原因 | 处理措施 |
|---|-----|-----|---------|---------|---------|
| 1 | 04-03 14:00 | PV | 骤降70% | 网站CDN故障 | 已恢复 |
| 2 | 04-05 | 订阅 | 转化率0.3% | 订阅API超时 | 已修复 |

### 5.2 告警规则触发记录

- [x] UV日均 < 200 → 未触发
- [x] 跳出率 > 75% → 04-02触发
- [x] 页面深度 < 1.5 → 未触发
- [x] 订阅转化率 < 1% → 未触发

---

## 六、本周迭代与下阶段计划

### 6.1 本周完成迭代

| # | 迭代内容 | 预期效果 | 实际效果 |
|---|---------|---------|---------|
| 1 | 优化RAG文章SEO标题 | 关键词排名+5 | +3 |
| 2 | 调整CTA按钮颜色 | 点击率+10% | +8% |

### 6.2 下周待办

- [ ] 发布AI营销团队文章
- [ ] 测试新的订阅表单样式
- [ ] 申请百度统计API权限
- [ ] 分析高跳出率页面原因

### 6.3 实验计划

| 实验ID | 实验名称 | 假设 | 目标指标 | 预计周期 |
|-------|---------|-----|---------|---------|
| EXP-015 | CTA按钮位置 | 底部固定CTA可提升点击 | CTA点击+15% | 2周 |
| EXP-016 | 文章摘要 | 显示摘要可降低跳出 | 跳出率-10% | 2周 |

---

## 七、数据质量声明

- [ ] GA4 数据与百度统计数据一致性检查通过
- [ ] 事件追踪代码无报错
- [ ] 转化漏斗数据完整
- [ ] 异常数据已人工确认

**数据负责人**：MicRabbit
**报告状态**：[x] 已完成
```

---

## 4. 迭代优化行动清单模板

### A. 迭代框架：问题 → 假设 → 实验 → 结论

```markdown
## 迭代实验报告模板

### 实验基本信息
- **实验ID**：EXP-XXX
- **实验名称**：[简洁描述]
- **创建日期**：YYYY-MM-DD
- **负责人**：MicRabbit
- **状态**：[设计/ Running / 已结束 / 已放弃]

---

### 1. 问题定义

**业务问题**：
> 描述实际遇到的业务问题

**数据支撑**：
| 指标 | 当前值 | 目标值 | 差距 |
|-----|-------|-------|-----|
| XX指标 | X% | X% | X% |

---

### 2. 假设生成

**核心假设**：
> 如果我们 [做某个改变]，那么 [某个指标] 将会 [提升/下降] [X%]

**假设依据**：
- [ ] 用户调研/反馈
- [ ] 数据分析发现
- [ ] 行业最佳实践
- [ ] 竞品分析

---

### 3. 实验设计

**实验组**：
> 描述实验组的具体变化

**对照组**：
> 保持原有状态

**分流比例**：50% / 50%

**关键指标（Primary Metric）**：
- [指标名称]：目标 [X%] → [Y%]

**辅助指标（Secondary Metrics）**：
- [指标名称]
- [指标名称]

**护栏指标（Guardrail Metrics）**：
- [指标名称]（不能有明显下降）

**最小样本量**：每组 [X] UV（基于统计功效计算）

**实验周期**：预计 [X] 天

---

### 4. 实验实施

**技术实现**：
```typescript
// 实验代码实现
const experimentId = 'EXP-XXX';
const userVariant = assignVariant(userId, experimentId); // 'control' | 'treatment'

if (userVariant === 'treatment') {
  // 展示实验组UI
} else {
  // 展示对照组UI
}
```

**发布检查清单**：
- [ ] 实验代码已部署
- [ ] 事件追踪已添加
- [ ] 数据验证通过
- [ ] 告警已设置

---

### 5. 实验结果

**数据截止**：YYYY-MM-DD

**实验组数据**：
| 指标 | 对照组 | 实验组 | 变化 |
|-----|-------|-------|-----|
| UV | X | X | +X% |
| 转化率 | X% | X% | +X% |

**统计显著性**：
- p-value: X.XXX
- 置信度：XX%
- [ ] 统计显著 (p < 0.05)

---

### 6. 结论与决策

**实验结论**：
> [成功/失败/ inconclusive]

**决策**：
- [ ] 全量上线实验组
- [ ] 回滚到对照组
- [ ] 继续运行（样本不足）
- [ ] 调整假设，重新实验

**经验教训**：
> 从这次实验中学到了什么

**后续行动**：
> 基于实验结果的下一步计划
```

---

### B. A/B 测试设计模板

```markdown
# A/B 测试设计方案

## 测试信息
- **测试名称**：
- **测试类型**：[UI优化/文案优化/功能优化/流程优化]
- **创建时间**：

---

## 背景与目的

**业务背景**：
> 为什么要做这个测试

**测试目标**：
> 通过 [具体改变]，提升 [核心指标] 达到 [目标值]

---

## 测试方案

### 对照组（Control）
```
[描述对照组的具体状态，包含截图或线框图]
```

### 实验组（Treatment A）
```
[描述实验组的具体改变]
```

### 变体组（Treatment B）- 可选
```
[如果有多个变体，描述变体B]
```

---

## 目标指标

| 指标类型 | 指标名称 | 当前基准 | 最小可检测变化（MDE） |
|---------|---------|---------|---------------------|
| 主指标 | | | |
| 护栏指标 | | | |

---

## 流量分配

- 总流量：[X]%
- 对照组：[X]%
- 实验组A：[X]%
- 实验组B：[X]%

**分流方式**：随机用户ID hash

---

## 事件追踪

| 事件名称 | 事件参数 | 触发时机 |
|---------|---------|---------|
| | | |
| | | |

---

## 技术实现

### 前端实现
```typescript
// 实现细节
```

### 后端配置（如需要）
```typescript
// 配置细节
```

---

## 测试周期

- **预计时长**：基于样本量计算器
- **最小周期**：建议至少覆盖一个完整用户周期（7天）

---

## 上线检查清单

- [ ] 监控仪表盘已创建
- [ ] 告警规则已设置
- [ ] 数据验证脚本已准备
- [ ] 回滚方案已制定
- [ ] 相关人员已通知
```

---

### C. 优先级评估矩阵

使用 ICE / RICE 框架评估实验优先级：

```markdown
## 实验优先级评估表

### ICE 评分法

| 实验 | Impact (1-3) | Confidence (1-3) | Ease (1-3) | ICE = I×C×E | 优先级 |
|-----|-------------|-----------------|-----------|------------|-------|
| EXP-015 | 3 | 2 | 2 | 12 | P1 |
| EXP-016 | 2 | 3 | 2 | 12 | P1 |
| EXP-017 | 2 | 2 | 3 | 12 | P1 |

**评分标准**：
- **Impact（影响力）**：1=微小提升，2=中等提升，3=显著提升
- **Confidence（信心度）**：1=猜测，2=有信心，3=高度确信
- **Ease（难易度）**：1=需要数周，2=需要数天，3=数小时

---

### RICE 评分法（更全面）

| 实验 | Reach (触达) | Impact (影响) | Confidence (信心) | Effort (工作量) | RICE = R×I×C/E | 优先级 |
|-----|-------------|--------------|------------------|----------------|---------------|-------|
| EXP-015 | 1000 | 3 | 80% | 5 | 480 | P1 |
| EXP-016 | 800 | 2 | 70% | 3 | 373 | P2 |

**评分标准**：
- **Reach（触达量）**：每周受影响的用户数
- **Impact（影响力）**：1=微小，2=小，3=中，5=大，10=巨大
- **Confidence（信心度）**：百分比形式
- **Effort（工作量）**：人天

---

### 优先级定义

| 优先级 | ICE/RICE 范围 | 说明 | 建议周期 |
|-------|-------------|------|---------|
| P0 | > 150 | 紧急且重要，立即执行 | 本周 |
| P1 | 80-150 | 重要，安排在近期 | 2周内 |
| P2 | 40-80 | 中等优先级 | 1个月内 |
| P3 | < 40 | 低优先级，可延后 | 后续再说 |

---

## 实验 backlog（示例）

| ID | 实验名称 | ICE | 状态 | 负责人 | 计划开始 |
|----|---------|-----|------|-------|---------|
| EXP-015 | 底部固定CTA按钮 | 12 | Ready | MicRabbit | 2026-04-08 |
| EXP-016 | 文章摘要展示 | 12 | Ready | MicRabbit | 2026-04-10 |
| EXP-017 | 订阅成功弹窗 | 9 | Backlog | - | TBD |
| EXP-018 | 联盟卡片位置调整 | 8 | Backlog | - | TBD |
| EXP-019 | 打赏金额选项优化 | 6 | Backlog | - | TBD |
```

---

## 附录：常用工具推荐

### 流量分析
- **Google Analytics 4**：全球流量分析
- **百度统计**：大陆SEO分析
- **Google Search Console**：关键词排名、收录

### SEO 工具
- **Ahrefs**：外链分析、竞品分析
- **SEMrush**：关键词研究
- **站长工具**：中文SEO监控

### 实验平台
- **Google Optimize**：A/B测试（已停止，建议自建）
- **VWO**：企业级A/B测试
- **PostHog**：自建实验平台

### 数据可视化
- **Looker Studio**：数据报表
- **Notion**：周报模板
- **Obsidian**：个人知识库

---

*本文档由 MicRabbit 数据分析团队维护*
*最后更新：2026-04-06*
