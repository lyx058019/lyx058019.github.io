/**
 * GA4 轻量级事件追踪模块
 * 基于全局事件委托（Event Delegation），无需在每个组件中手动绑定
 *
 * 使用方式：在 main.ts 中 import initAnalytics 并在 app.mount 之前调用
 *
 * 注意：需要在 index.html 中已加载 GA4 (gtag.js) 的情况下使用
 */

// GA4 gtag 函数类型声明（index.html 中已通过 gtag.js 全局加载）
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

type GtagEvent = {
  event_category: string
  event_label?: string
  page_location?: string
  value?: number
}

type GtagCommand = 'event' | 'config' | 'set'

/**
 * 发送事件到 GA4
 */
function trackEvent(command: GtagCommand, eventName: string, params?: GtagEvent): void {
  if (typeof window.gtag === 'function') {
    window.gtag(command, eventName, params as Record<string, unknown>)
  }
}

/**
 * 初始化全局点击事件委托
 */
export function initAnalytics(): void {
  document.addEventListener('click', handleGlobalClick)
}

/**
 * 全局点击处理器（事件委托）
 */
function handleGlobalClick(e: MouseEvent): void {
  const target = e.target as HTMLElement

  // ① 订阅按钮点击
  // 识别方式：带有 subscribe-input / subscribe 类名的按钮，或包含"订阅"文字的按钮
  const subscribeBtn = target.closest('button')?.closest('.subscribe-section')
  if (
    target.closest('[data-track="subscribe"]') ||
    target.closest('.subscribe-section')?.querySelector('button')?.contains(target)
  ) {
    trackEvent('event', 'subscribe_click', {
      event_category: 'conversion',
      event_label: window.location.pathname,
    })
  }

  // ② 联盟链接点击
  // 识别方式：href 含 "affiliate" / data-track="affiliate" / .affiliation-card 卡片
  if (
    target.closest('[data-track="affiliate"]') ||
    target.closest('.affiliation-card') ||
    (target.tagName === 'A' && target.closest('a')?.href.includes('affiliate'))
  ) {
    const link = target.closest('a') as HTMLAnchorElement | null
    trackEvent('event', 'affiliate_click', {
      event_category: 'monetization',
      event_label: link?.href || window.location.pathname,
      page_location: window.location.pathname,
    })
  }

  // ③ 内部链接点击（排除联盟链接）
  // 识别方式：href 以 "/" 开头且不含 affiliate
  if (
    target.tagName === 'A' &&
    target.getAttribute('href')?.startsWith('/') &&
    !target.getAttribute('href')?.includes('affiliate')
  ) {
    trackEvent('event', 'internal_link_click', {
      event_category: 'engagement',
      event_label: target.getAttribute('href') || '',
      page_location: window.location.pathname,
    })
  }

  // ④ 工具箱功能使用
  if (target.closest('[data-track="toolbox"]')) {
    const toolName = target.closest('[data-tool-name]')?.getAttribute('data-tool-name') || 'unknown'
    trackEvent('event', 'toolbox_usage', {
      event_category: 'engagement',
      event_label: toolName,
    })
  }
}

/**
 * 手动触发页面读完率事件（建议在文章页组件 mount 时调用）
 * 需要在文章页面元素上预埋 data-read-depth 属性
 */
export function initArticleReadTracking(): void {
  const articleEl = document.querySelector('article, .blog-post-content')
  if (!articleEl) return

  const readMilestones = [25, 50, 75, 100]
  const observedMilestones = new Set<number>()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const depth = parseInt((entry.target as HTMLElement).dataset.readDepth || '0', 10)
          if (depth > 0 && !observedMilestones.has(depth)) {
            observedMilestones.add(depth)
            trackEvent('event', 'article_read_depth', {
              event_category: 'engagement',
              event_label: window.location.pathname,
              value: depth,
            })
          }
        }
      })
    },
    { threshold: 0.5 }
  )

  // 在文章各段落添加 data-read-depth 属性后，observer 自动追踪
  articleEl.querySelectorAll('[data-read-depth]').forEach((el) => {
    observer.observe(el)
  })
}
