# P0 阶段联盟平台申请执行方案

**博客名称**: MicRabbit（小灰兔）
**文档角色**: 变现设计师（Agent 3）
**创建日期**: 2026-04-07
**所属阶段**: P0 基础建设（第 1-4 周）
**输出位置**: `blog-monetization/outputs/p0-affiliate-plan.md`

---

## 一、联盟平台分类与优先级

### 1.1 优先级矩阵

| 优先级 | 平台 | 类型 | 预估佣金 | 申请难度 | 与博客匹配度 | 行动 |
|--------|------|------|---------|---------|------------|------|
| **P0-紧急** | Cursor | 工具类 SaaS | 30-50% 首年 | 低（直接申请） | ⭐⭐⭐⭐⭐ | 立即申请 |
| **P0-紧急** | Notion | 工具类 SaaS | 50% 首年 | 低（直接申请） | ⭐⭐⭐⭐⭐ | 立即申请 |
| **P0-紧急** | Amazon Associates | 综合电商 | 1-10% | 中（需审核） | ⭐⭐⭐⭐ | 同步申请 |
| **P1-重要** | ChatGPT Plus | AI 工具 | 20% 首年 | 中（通过 ShareASale） | ⭐⭐⭐⭐ | 第2周申请 |
| **P1-重要** | Claude Pro | AI 工具 | 15-25% 首年 | 中 | ⭐⭐⭐⭐ | 第2周申请 |
| **P2-扩展** | Vercel | 开发平台 | 积分形式 | 低 | ⭐⭐⭐ | 第3周申请 |
| **P2-扩展** | Supabase | 开发平台 | ~30% | 中 | ⭐⭐⭐ | 第3周申请 |
| **P2-扩展** | GitHub Copilot | 开发平台 | 积分形式 | 低 | ⭐⭐⭐ | 第3周申请 |
| **P2-扩展** | Figma | 设计工具 | 15-25% | 中 | ⭐⭐ | 第4周申请 |
| **P3-观察** | 京东联盟 | 国内电商 | CPS 佣金 | 低 | ⭐⭐ | 后续扩展 |
| **P3-观察** | 淘宝联盟 | 国内电商 | CPS 佣金 | 低 | ⭐⭐ | 后续扩展 |
| **P3-观察** | 多了 好物榜 | 国内工具 | 待确认 | 低 | ⭐⭐⭐ | 后续扩展 |

> **决策理由**：Cursor 和 Notion 佣金比例最高（30%+/50%），目标用户（中国独立开发者/创业者）与博客受众高度重合，且申请门槛低，适合作为最先落地的联盟收入来源。Amazon Associates 覆盖最广，可作为基础设施同步申请。

---

## 二、工具类 SaaS 联盟申请流程

### 2.1 Cursor 联盟（最高优先级）

**申请入口**: https://cursor.com/affiliates 或 https://cursor.com/referral

**申请条件**:
- 持有 cursor.com 账号
- 拥有博客/网站（需能访问）
- 网站内容与 AI 编程相关

**申请步骤**:
```
Step 1: 访问 https://cursor.com，注册账号（如已有则跳过）
Step 2: 访问 https://cursor.com/affiliates
Step 3: 点击 "Apply for Affiliate" 或 "Become an Affiliate"
Step 4: 填写申请表单：
        - Website URL: https://lyx058019.github.io
        - Traffic source: Blog / Content site
        - Monthly visitors: [填写真实数据]
        - How will you promote Cursor: [填写博客内容方向，如 "AI编程教程、工具对比"]
Step 5: 提交申请，等待审核（通常 1-3 个工作日）
Step 6: 审核通过后，获取专属联盟链接
        格式: https://cursor.com/affiliate?ref=YOUR_ID
Step 7: 在博客后台代码中配置联盟链接（参考 docs/affiliate-marketing-guide.md）
```

**佣金结构**:
- 佣金比例: 30-50% 首年订阅费
- Cookie 周期: 30 天
- 结算周期: 月结
- 最低支付门槛: $50（PayPal）
- 到账时间: 佣金确认后次月支付

**已申请状态**: 待申请（参考上面步骤）

---

### 2.2 Notion 联盟（高佣金）

**申请入口**: https://www.notion.so/affiliates

**申请条件**:
- 持有 Notion 账号
- 网站内容与知识管理/效率工具相关

**申请步骤**:
```
Step 1: 访问 https://www.notion.so/affiliates
Step 2: 登录 Notion 账号（如无则注册）
Step 3: 点击 "Join the Notion Affiliate Program"
Step 4: 填写申请信息：
        - Website: https://lyx058019.github.io
        - Description: [填写博客介绍，如：分享AI工具、一人公司实践的内容博客]
        - Promotion method: [填写如何推广，如：工具对比文章、模板分享]
Step 5: 提交申请，等待审核
Step 6: 通过后获取联盟链接和推广素材
```

**佣金结构**:
- 佣金比例: 50% 首年订阅费（复购 10%）
- Cookie 周期: 30 天
- 结算周期: 月结
- 最低支付门槛: $50

---

### 2.3 Vercel 联盟（积分形式）

**申请入口**: https://vercel.com/affiliate

**申请条件**: Vercel 用户即可申请，推荐新用户得积分

**申请步骤**:
```
Step 1: 登录 https://vercel.com（如无则注册）
Step 2: 访问 https://vercel.com/affiliate
Step 3: 生成专属推荐链接
Step 4: 在博客工具箱页面推广 Vercel（前端部署工具天然适合）
```

**佣金形式**: 推荐得 Vercel 积分（可抵扣 Vercel 账单）
> 注：Vercel 积分可间接节省博客托管成本，属于隐性收益。

---

### 2.4 GitHub Copilot 联盟（积分形式）

**申请入口**: https://github.com/premium

**申请条件**: GitHub 用户

**申请步骤**:
```
Step 1: 确保持有 GitHub 账号
Step 2: 访问 GitHub Copilot 页面，查看联盟计划状态
Step 3: 如有联盟计划，生成专属推广链接
Step 4: 在前端开发相关文章中推荐 GitHub Copilot
```

---

### 2.5 Supabase 联盟

**申请入口**: https://supabase.com/affiliate

**申请条件**:
- 持有 Supabase 账号
- 网站与开发者工具相关

**申请步骤**:
```
Step 1: 登录 https://supabase.com
Step 2: 访问 https://supabase.com/affiliate
Step 3: 填写申请（Website、Promotion plan）
Step 4: 等待审核，通过后获取联盟链接
```

**佣金结构**:
- 佣金比例: ~30%（通过联盟平台如 Rewardful）
- 适合文章: 数据库教程、后端架构分享

---

### 2.6 Figma 联盟

**申请入口**: https://figma.com/partners

**申请条件**: Figma 合作伙伴计划，需审核

**申请步骤**:
```
Step 1: 访问 https://figma.com/partners
Step 2: 选择 "Affiliate Program"
Step 3: 填写申请表单（网站、月访问量、推广方式）
Step 4: 审核通过后获取联盟链接
```

---

## 三、Amazon Associates 申请流程

### 3.1 申请入口与条件

**申请入口**: https://affiliate-program.amazon.com

**申请条件**:
- 拥有博客/网站（需真实存在、有内容）
- 网站内容须符合 Amazon 政策（无违禁内容）
- 需提供真实身份信息（个人或企业）
- 中国用户可申请（需填写税务信息）

### 3.2 申请步骤（详细）

```
Step 1: 访问 https://affiliate-program.amazon.com
Step 2: 点击 "注册"（Sign Up）
Step 3: 选择账户类型：
        - 个人（Individual）：需要身份证验证
        - 企业（Company）：需要营业执照
        推荐选个人，操作更简单
Step 4: 填写账户信息：
        - 姓名（中文全名）
        - 地址（中文地址，英文填写）
        - 电话号码（国内手机号即可）
        - 网站地址：https://lyx058019.github.io
        - 网站描述：AI工具、一人公司实践、效率工具推荐博客
        - 主要流量来源：Search engine / Social media
        - 主要盈利方式：Affiliate links
        - 月访问量估算：[填写真实数据]
Step 5: 填写税务信息（Amazon 会引导填写 W-8BEN 或 W-9 表）
        - 中国个人用户填写 W-8BEN（美国税务表格）
        - 表格说明：声明非美国税务居民，只收取佣金
Step 6: 选择支付方式：
        - 推荐：Gift card / 亚马逊礼品卡（适合中国用户）
        备选：Payoneer（需注册 P 卡）
        备选：银行转账（有手续费）
Step 7: 阅读并同意 Amazon Associates Operating Agreement
Step 8: 提交申请，等待审核（通常 1-5 个工作日）
Step 9: 审核通过后，登录后台获取追踪链接
```

### 3.3 Amazon Associates 佣金结构

| 产品类别 | 佣金比例 |
|---------|---------|
| 电子产品（Kindle 等） | 2.5-4% |
| 软件/数字服务 | 10% |
| AI 相关工具（Amazon 上有售的硬件） | 2.5-4% |
| 书籍 | 4.5% |
| 其他类别 | 1-10% 不等 |

> **注意**: Amazon Associates 对 AI 类数字工具（ChatGPT、Claude 等）的直接覆盖有限，主要收益来自书籍和相关硬件推荐。**建议将 Amazon Associates 作为辅助渠道**，而非主力联盟收入来源。

### 3.4 Amazon Associates 注意事项

- **90 天规则**: Amazon Associates 必须在注册后 180 天内产生有效销售，否则账户可能被暂停
- **链接有效性**: 定期检查 Amazon 产品链接是否有效
- **佣金披露**: 每个含 Amazon 链接的页面须添加 FTC 合规披露声明
- **流量限制**: Amazon 禁止通过付费广告（如 Google Ads）投放带联盟链接的页面

---

## 四、AI 工具类联盟申请流程

### 4.1 ChatGPT Plus（OpenAI Affiliate）

**申请入口**: 通过 ShareASale 或 Impact 平台申请 OpenAI 联盟

**申请步骤**:
```
Step 1: 访问 https://www.shareasale.com 或 https://www.impact.com
Step 2: 搜索 "OpenAI" 或 "ChatGPT"
Step 3: 申请加入 OpenAI Affiliate Program
Step 4: 填写申请信息，等待审核
Step 5: 通过后获取联盟链接和推广素材
```

**佣金结构**:
- 佣金比例: 20% 首年订阅费
- Cookie 周期: 60 天
- 单笔佣金估算: 约 240 元/人

### 4.2 Claude Pro（Anthropic）

**申请入口**: https://anthropic.com/affiliate 或通过联盟平台

**申请步骤**:
```
Step 1: 访问 Anthropic 官网，搜索 Affiliate
Step 2: 如有直接申请入口，填写申请
Step 3: 如无直接入口，通过 Rewardful 搜索 Anthropic
Step 4: 审核通过后获取联盟链接
```

**佣金结构**:
- 佣金比例: 15-25% 首年订阅费
- 单笔佣金估算: 约 180-300 元/人

---

## 五、国内平台联盟（扩展备选）

### 5.1 京东联盟

**申请入口**: https://union.jd.com

**适用场景**: 推荐 AI 硬件（如掌机、键盘、显示器等）

**佣金特点**:
- CPS 模式，按成交金额结算
- 佣金比例 1%-15% 不等
- 结算周期月结，需京东账户

### 5.2 淘宝联盟

**申请入口**: https://pub.alimama.com

**适用场景**: 推荐国内 AI 工具、学习资源类商品

**佣金特点**:
- CPS 模式
- 覆盖面广，但佣金比例偏低（1%-20%）
- 适合推荐硬件和实体商品

### 5.3 爱发电（国内创作者平台）

**申请入口**: https://afdian.net

**说明**: 爱发电本身是收款工具，但也可作为其他创作者联盟的分发渠道（通过爱发电赞助功能推广）

### 5.4 小报童（国内付费内容平台）

**申请入口**: https://xiaobot.net

**适用场景**: 付费专栏、Newsletter 订阅

**佣金特点**:
- 创作者可设置分销联盟
- 可邀请其他创作者推广你的付费内容
- 适合付费模板包、小报等产品

---

## 六、申请时间线（第 1-4 周）

| 周次 | 行动 | 平台 | 状态 |
|------|------|------|------|
| **第1周** | 申请 Cursor 联盟 | cursor.com/affiliates | 待执行 |
| **第1周** | 申请 Notion 联盟 | notion.so/affiliates | 待执行 |
| **第1周** | 申请 Amazon Associates | affiliate-program.amazon.com | 待执行 |
| **第1周** | 注册 Vercel 联盟 | vercel.com/affiliate | 待执行 |
| **第2周** | 申请 ChatGPT 联盟 | ShareASale/OpenAI | 待执行 |
| **第2周** | 申请 Claude 联盟 | Anthropic/Rewardful | 待执行 |
| **第3周** | 申请 Supabase 联盟 | supabase.com/affiliate | 待执行 |
| **第3周** | 申请 GitHub Copilot 联盟 | github.com | 待执行 |
| **第4周** | 申请 Figma 联盟 | figma.com/partners | 待执行 |
| **第4周** | 汇总所有联盟链接 | — | 待执行 |

---

## 七、联盟链接管理表

> 申请成功后，在此登记所有联盟链接

| 平台 | 联盟链接 | UTM Campaign | 申请日期 | 审核状态 | 佣金比例 |
|------|---------|-------------|---------|---------|---------|
| Cursor | 待填写 | cursor_[文章主题] | — | 待申请 | 30-50% |
| Notion | 待填写 | notion_[文章主题] | — | 待申请 | 50% |
| Amazon | 待填写 | amazon_[商品类别] | — | 待申请 | 1-10% |
| ChatGPT | 待填写 | chatgpt_[文章主题] | — | 待申请 | 20% |
| Claude | 待填写 | claude_[文章主题] | — | 待申请 | 15-25% |
| Vercel | 待填写 | vercel_[文章主题] | — | 待申请 | 积分 |
| Supabase | 待填写 | supabase_[文章主题] | — | 待申请 | ~30% |
| GitHub | 待填写 | github_[文章主题] | — | 待申请 | 积分 |
| Figma | 待填写 | figma_[文章主题] | — | 待申请 | 15-25% |

---

## 八、UTM 追踪配置

所有联盟链接须统一添加 UTM 参数：

```
utm_source=micrabbit
utm_medium=affiliate
utm_campaign={平台}_{文章主题}
utm_content={插入位置}
```

**示例**:
```
https://cursor.com/affiliate?ref=YOUR_ID&utm_source=micrabbit&utm_medium=affiliate&utm_campaign=cursor_ai-team&utm_content=in-article
```

**工具推荐**: 使用 bit.ly 或自建短链（lyx.li/xxx）美化联盟链接，保留 UTM 参数。

---

## 九、合规检查清单

- [ ] 每个联盟链接页面须添加合规披露声明（参考 `blog-monetization/outputs/agent-6/compliance-checklist.md`）
- [ ] Amazon 链接不得通过付费广告投放
- [ ] 联盟推荐须基于真实使用体验，不得夸大
- [ ] 定期检查联盟链接是否有效（死链清理）
- [ ] 所有联盟链接须使用带追踪 ID 的官方链接格式

---

*文档版本: v1.0*
*下次更新: P0 第4周，各平台申请结果汇总后更新链接管理表*
