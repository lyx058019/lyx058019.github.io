import { describe, it, expect, beforeEach } from 'vitest'
import { applySeo } from '../src/seo/head'
import { SITE_NAME, SITE_ORIGIN, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../src/seo/site'

function clearHead() {
  // remove all meta and link elements from head to ensure clean slate
  document.head.querySelectorAll('meta, link').forEach((el) => el.parentNode?.removeChild(el))
}

describe('SEO: applySeo', () => {
  beforeEach(() => {
    clearHead()
    document.title = ''
  })

  it('should apply provided SEO inputs', () => {
    applySeo({
      title: 'Test Page',
      description: 'Desc for test page',
      path: '/test',
      image: '/assets/test.png',
      type: 'article',
      keywords: 'vue, test',
      noindex: false,
    })

    expect(document.title).toBe('Test Page')
    // description meta
    const desc = document.head.querySelector('meta[name="description"]') as HTMLMetaElement
    expect(desc?.getAttribute('content')).toBe('Desc for test page')

    // canonical
    const canon = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement
    expect(canon?.href).toBe(SITE_ORIGIN + "/test")

    // keywords
    const kw = document.head.querySelector('meta[name="keywords"]') as HTMLMetaElement
    expect(kw?.getAttribute('content')).toBe('vue, test')

    // og/title and og/image
    const ogTitle = document.head.querySelector('meta[property="og:title"]') as HTMLMetaElement
    const ogImage = document.head.querySelector('meta[property="og:image"]') as HTMLMetaElement
    const ogType = document.head.querySelector('meta[property="og:type"]') as HTMLMetaElement
    expect(ogTitle?.getAttribute('content')).toBe('Test Page')
    expect(ogImage?.getAttribute('content')).toBe(SITE_ORIGIN + '/assets/test.png')
    expect(ogType?.getAttribute('content')).toBe('article')
  })

  it('should fallback to defaults when no input is provided', () => {
    applySeo({})
    expect(document.title).toBe(DEFAULT_TITLE)
    const desc = document.head.querySelector('meta[name="description"]') as HTMLMetaElement
    expect(desc?.getAttribute('content')).toBe(DEFAULT_DESCRIPTION)
    const ogSite = document.head.querySelector('meta[property="og:site_name"]') as HTMLMetaElement
    expect(ogSite?.getAttribute('content')).toBe(SITE_NAME)
  })
})
