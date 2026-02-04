<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { computed, nextTick, shallowRef, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { applySeo } from '@/seo/head'
import postsIndex from '@/data/posts.index.json'

const route = useRoute()
const router = useRouter()
// 必须与实际文件路径匹配，使用 absolute path pattern 或 relative to root
const modules = import.meta.glob('@/data/posts/*.md')

const postComponent = shallowRef<any>(null)
const error = shallowRef(false)
const frontmatter = shallowRef<Record<string, any>>({})
const contentEl = shallowRef<HTMLElement | null>(null)

type TocItem = { id: string; text: string; level: number }
const toc = shallowRef<TocItem[]>([])

type PostMeta = { id: string; title: string; date: string; description: string; tags: string[] }
const allPosts = computed<PostMeta[]>(() => {
  return (Array.isArray(postsIndex) ? postsIndex : [])
    .map((p: any) => ({
      id: typeof p?.id === 'string' ? p.id : '',
      title: typeof p?.title === 'string' ? p.title : 'Untitled',
      date: typeof p?.date === 'string' ? p.date : '',
      description: typeof p?.description === 'string' ? p.description : '',
      tags: Array.isArray(p?.tags) ? p.tags.filter((t: any) => typeof t === 'string') : [],
    }))
    .filter((p) => !!p.id)
})

const title = computed(() => {
  const v = frontmatter.value?.title
  return typeof v === 'string' ? v : ''
})

const description = computed(() => {
  const v = frontmatter.value?.description
  return typeof v === 'string' ? v : ''
})

const readingTime = computed(() => {
  const v = frontmatter.value?.readingTime
  return typeof v === 'string' ? v : ''
})

const tags = computed(() => {
  const v = frontmatter.value?.tags
  return Array.isArray(v) ? v.filter((t) => typeof t === 'string') : []
})

const dateText = computed(() => {
  const raw = frontmatter.value?.date
  if (typeof raw !== 'string' || !raw) return ''
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return raw
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
})

const currentId = computed(() => {
  const raw = route.params.id
  if (Array.isArray(raw)) return raw[0] || ''
  return typeof raw === 'string' ? raw : ''
})

const currentIndex = computed(() => allPosts.value.findIndex((p) => p.id === currentId.value))
const prevPost = computed(() => (currentIndex.value > 0 ? allPosts.value[currentIndex.value - 1] : null))
const nextPost = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < allPosts.value.length - 1
    ? allPosts.value[currentIndex.value + 1]
    : null,
)

const goToPost = (id: string) => {
  router.push(`/blog/${id}`)
}

const slugifyHeading = (text: string) => {
  const base = text
    .trim()
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return base
}

const buildToc = () => {
  const root = contentEl.value
  if (!root) {
    toc.value = []
    return
  }

  const headings = Array.from(root.querySelectorAll('.markdown-body h2, .markdown-body h3')) as HTMLElement[]
  const used = new Map<string, number>()
  const items: TocItem[] = []

  for (const el of headings) {
    const level = el.tagName === 'H3' ? 3 : 2
    const text = (el.textContent || '').trim()
    if (!text) continue

    let id = el.id || slugifyHeading(text)
    if (!id) id = `section`

    const seen = used.get(id) || 0
    used.set(id, seen + 1)
    if (seen > 0) id = `${id}-${seen + 1}`

    el.id = id
    items.push({ id, text, level })
  }

  toc.value = items
}

// 动态加载 Markdown 组件
watchEffect((onCleanup) => {
  let cancelled = false
  onCleanup(() => {
    cancelled = true
  })

  const id = currentId.value
  if (!id) return

  const path = `/src/data/posts/${id}.md`
  const importer = modules[path]

  error.value = false
  postComponent.value = null
  frontmatter.value = {}
  toc.value = []

  if (!importer) {
    error.value = true
    return
  }

  ;(async () => {
    try {
      const comp = await importer()
      if (cancelled) return

      postComponent.value = (comp as any).default

      const fm = (comp as any).frontmatter || (postComponent.value as any)?.frontmatter || {}
      frontmatter.value = fm && typeof fm === 'object' ? fm : {}
      const fmTitle = typeof frontmatter.value.title === 'string' ? frontmatter.value.title : undefined
      const fmDesc = typeof frontmatter.value.description === 'string' ? frontmatter.value.description : undefined

      // 阅读时间/关键词等元数据（如有提供）将被用于 SEO 与页面显示
      const fmKeywords = Array.isArray(frontmatter.value?.keywords)
        ? frontmatter.value.keywords.filter((k: any) => typeof k === 'string')
        : []

      applySeo({
        title: fmTitle ? `${fmTitle} | 博客 | LYX.DEV` : undefined,
        description: fmDesc,
        canonicalPath: `/blog/${id}`,
        type: 'article',
        keywords: fmKeywords.length ? fmKeywords.join(', ') : undefined,
      })

      await nextTick()
      if (cancelled) return
      buildToc()
    } catch (e) {
      console.error(e)
      if (cancelled) return
      error.value = true
    }
  })()
})

const goBack = () => {
  router.push('/blog')
}
</script>

<template>
  <div class="blog-post-view">
    <el-button @click="goBack" :icon="ArrowLeft" plain class="back-btn">返回列表</el-button>

    <div v-if="error" class="error-state">
      <el-empty description="文章未找到或加载失败" />
    </div>

    <article v-else-if="postComponent" class="post" ref="contentEl">
        <header class="post-header">
          <h1 class="post-title" v-if="title">{{ title }}</h1>
          <p class="post-desc" v-if="description">{{ description }}</p>
          <div class="post-meta" v-if="dateText || tags.length || readingTime">
            <span class="post-date" v-if="dateText">{{ dateText }}</span>
            <span class="post-reading" v-if="readingTime">（{{ readingTime }}）</span>
            <span class="post-tags" v-if="tags.length">
            <el-tag v-for="tag in tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
          </span>
        </div>
      </header>

      <el-card v-if="toc.length" class="toc" shadow="never">
        <div class="toc-title">目录</div>
        <div class="toc-list">
          <a v-for="item in toc" :key="item.id" class="toc-link" :class="{ h3: item.level === 3 }" :href="`#${item.id}`">
            {{ item.text }}
          </a>
        </div>
      </el-card>

      <div class="markdown-body">
        <component :is="postComponent" />
      </div>

      <div class="post-nav" v-if="prevPost || nextPost">
        <el-button v-if="prevPost" plain @click="goToPost(prevPost.id)">上一篇：{{ prevPost.title }}</el-button>
        <el-button v-if="nextPost" plain @click="goToPost(nextPost.id)">下一篇：{{ nextPost.title }}</el-button>
      </div>
    </article>

    <el-skeleton v-else :rows="10" animated />
  </div>
</template>

<style lang="scss">
// 修复 PrismJS 在深色模式下的背景，或者自定义 markdown 样式
.blog-post-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .back-btn {
    margin-bottom: 2rem;
  }
}

.post {
  .post-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--el-border-color);
  }

  .post-title {
    margin: 0 0 0.5rem;
    font-size: 2rem;
    letter-spacing: 0.2px;
    color: var(--el-text-color-primary);
  }

  .post-desc {
    margin: 0 0 0.75rem;
    color: var(--el-text-color-regular);
    line-height: 1.7;
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    color: var(--el-text-color-secondary);
    font-size: 0.9rem;
  }

  .post-tags {
    display: inline-flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .toc {
    margin: 1rem 0 1.25rem;
    border-radius: 12px;
    background: var(--el-fill-color-lighter);
  }

  .toc-title {
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin-bottom: 8px;
  }

  .toc-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .toc-link {
    color: var(--el-text-color-regular);
    text-decoration: none;
    line-height: 1.5;
  }

  .toc-link:hover {
    color: var(--el-color-primary);
    text-decoration: underline;
  }

  .toc-link.h3 {
    padding-left: 14px;
    font-size: 0.95em;
  }

  .post-nav {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }
}

// 简单的 Markdown 样式增强，由于 unplugin-vue-markdown 生成的是原生 HTML
// 你可能需要引入 github-markdown-css 或类似的库，这里简单写一点
.markdown-body {
  line-height: 1.8;
  color: var(--el-text-color-primary);

  h1,
  h2,
  h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--el-text-color-regular);
  }

  h1 {
    font-size: 2.2em;
    border-bottom: 1px solid var(--el-border-color);
    padding-bottom: 0.3em;
  }

  h2 {
    font-size: 1.8em;
  }

  p {
    margin-bottom: 1.2rem;
  }

  ul,
  ol {
    padding-left: 2rem;
    margin-bottom: 1.2rem;
  }

  a {
    color: var(--el-color-primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  blockquote {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    border-left: 4px solid var(--el-color-primary);
    background-color: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
  }

  pre[class*="language-"] {
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
  }
}
</style>
