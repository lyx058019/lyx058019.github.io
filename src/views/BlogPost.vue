<script setup lang="ts">
import postsIndex from '@/data/posts.index.json'
import { applySeo } from '@/seo/head'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useScroll } from '@vueuse/core'
import { computed, nextTick, shallowRef, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { y } = useScroll(window) // 监听页面滚动

// 计算阅读进度
const scrollProgress = computed(() => {
  const el = document.documentElement
  const scrollTop = y.value
  const scrollHeight = el.scrollHeight - el.clientHeight
  if (scrollHeight <= 0) return 0
  return Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))
})
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

  ; (async () => {
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
    <!-- Reading Progress Bar -->
    <div class="reading-progress-bar" :style="{ transform: `scaleX(${scrollProgress / 100})` }"></div>

    <div v-if="error" class="error-state">
      <el-empty description="文章加载失败或不存在" />
      <el-button @click="goBack">返回列表</el-button>
    </div>

    <div v-else class="post-layout">
      <!-- Left Sidebar (Desktop) -->
      <aside class="post-sidebar desktop-only">
        <div class="sidebar-sticky">
          <div class="sidebar-back" @click="goBack">
            <el-icon>
              <ArrowLeft />
            </el-icon>
            <span>Back</span>
          </div>
          <div class="sidebar-toc" v-if="toc.length">
            <div class="toc-title">ON THIS PAGE</div>
            <ul class="toc-list">
              <li v-for="item in toc" :key="item.id" :class="['toc-item', `level-${item.level}`]"
                @click="router.push(`#${item.id}`)">
                <a :href="`#${item.id}`">{{ item.text }}</a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <article class="post-content">
        <header class="post-header">
          <div class="post-meta">
            <span class="meta-item date">{{ dateText }}</span>
            <span class="meta-item dot">·</span>
            <span class="meta-item read-time">{{ readingTime }}</span>
          </div>
          <h1 class="post-title">{{ title }}</h1>
          <div class="post-tags">
            <el-tag v-for="tag in tags" :key="tag" class="pk-tag">{{ tag }}</el-tag>
          </div>
        </header>

        <!-- Mobile TOC -->
        <div class="mobile-toc mobile-only" v-if="toc.length">
          <el-collapse>
            <el-collapse-item name="1">
              <template #title>
                <span class="mobile-toc-title">目录导航</span>
              </template>
              <ul class="toc-list">
                <li v-for="item in toc" :key="item.id" :class="['toc-item', `level-${item.level}`]"
                  @click="router.push(`#${item.id}`)">
                  <a :href="`#${item.id}`">{{ item.text }}</a>
                </li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="markdown-body" ref="contentEl">
          <component :is="postComponent" />
        </div>

        <div class="post-footer">
          <div class="post-nav">
            <div class="nav-prev" v-if="prevPost" @click="goToPost(prevPost.id)">
              <span class="nav-label">Previous</span>
              <span class="nav-title">{{ prevPost.title }}</span>
            </div>
            <div class="nav-next" v-if="nextPost" @click="goToPost(nextPost.id)">
              <span class="nav-label">Next</span>
              <span class="nav-title">{{ nextPost.title }}</span>
            </div>
          </div>
        </div>
      </article>

      <!-- Right Safe Area / Mobile TOC placeholder if needed -->
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Swiss / Pro Max Style */
.blog-post-view {
  min-height: 100vh;
  padding-bottom: 80px;
}

.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--pk-color-primary);
  transform-origin: 0 50%;
  z-index: 2000;
  transition: transform 0.1s ease-out;
}

.post-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 60px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
  align-items: start;
}

/* Sidebar */
.post-sidebar.desktop-only {
  display: block;

  .sidebar-sticky {
    position: sticky;
    top: 100px;
  }

  .sidebar-back {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 600;
    color: var(--pk-color-text-secondary);
    margin-bottom: 40px;
    transition: color 0.2s;

    &:hover {
      color: var(--pk-color-primary);
    }
  }

  .toc-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--pk-color-text-primary);
    letter-spacing: 0.1em;
    margin-bottom: 16px;
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-left: 1px solid var(--pk-border-color);

    .toc-item {
      padding-left: 16px;
      margin-bottom: 12px;

      &.level-3 {
        padding-left: 32px;
        font-size: 0.9em;
      }

      a {
        text-decoration: none;
        color: var(--pk-color-text-secondary);
        font-size: 0.9rem;
        display: block;
        transition: color 0.2s;

        &:hover {
          color: var(--pk-color-primary);
        }
      }
    }
  }
}

/* Header */
.post-header {
  margin-bottom: 40px;
  text-align: left;

  .post-meta {
    font-size: 0.95rem;
    color: var(--pk-color-text-secondary);
    margin-bottom: 16px;
    font-family: 'Plus Jakarta Sans', sans-serif;

    .dot {
      margin: 0 8px;
    }

    .date {
      font-weight: 600;
      color: var(--pk-color-primary);
    }
  }

  .post-title {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: -0.04em;
  }

  .post-tags {
    display: flex;
    gap: 8px;

    .pk-tag {
      background: transparent;
      border: 1px solid var(--pk-border-color);
      color: var(--pk-color-text-primary);
      border-radius: 4px;
      font-weight: 500;
    }
  }
}

.mobile-toc {
  margin-bottom: 40px;
  border: 1px solid var(--pk-border-color);
  border-radius: var(--border-radius-sm);

  :deep(.el-collapse-item__header) {
    padding: 0 16px;
    font-weight: 700;
  }

  :deep(.el-collapse-item__content) {
    padding: 16px;
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .toc-item {
      margin-bottom: 8px;

      a {
        text-decoration: none;
        color: var(--pk-color-text-primary);
        font-size: 0.9rem;
      }

      &.level-3 {
        padding-left: 16px;
        color: var(--pk-color-text-secondary);
      }
    }
  }
}

.post-nav {
  margin-top: 80px;
  padding-top: 40px;
  border-top: 1px solid var(--pk-border-color);
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .nav-prev,
  .nav-next {
    flex: 1;
    border: 1px solid var(--pk-border-color);
    padding: 24px;
    border-radius: var(--border-radius-lg);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: var(--pk-color-primary);
    }

    .nav-label {
      display: block;
      font-size: 0.8rem;
      text-transform: uppercase;
      color: var(--pk-color-text-secondary);
      margin-bottom: 8px;
      letter-spacing: 0.05em;
    }

    .nav-title {
      font-weight: 700;
      font-size: 1.1rem;
      line-height: 1.3;
    }
  }

  .nav-next {
    text-align: right;
  }
}

/* Markdown Customization */
:deep(.markdown-body) {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--pk-color-text-secondary);

  h2,
  h3,
  h4 {
    color: var(--pk-color-text-primary);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-top: 2em;
  }

  p {
    margin-bottom: 1.5em;
  }

  a {
    color: var(--pk-color-primary);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;

    &:hover {
      border-bottom-color: var(--pk-color-primary);
    }
  }

  pre {
    background: var(--pk-color-bg);
    border: 1px solid var(--pk-border-color);
    border-radius: var(--border-radius-sm);
  }

  img {
    border-radius: var(--border-radius-lg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
}

@media (max-width: 900px) {
  .post-layout {
    grid-template-columns: 1fr;
  }

  .post-sidebar.desktop-only {
    display: none;
  }

  .post-header .post-title {
    font-size: 2.2rem;
  }

  .post-nav {
    flex-direction: column;
  }

  .nav-next {
    text-align: left !important;
  }
}

.mobile-only {
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
}
</style>
.post-layout {
display: flex;
gap: 60px;
align-items: flex-start;
}

.post-main {
flex: 1;
min-width: 0;

.back-btn {
margin-bottom: 20px;
font-size: 0.95rem;
color: var(--el-text-color-secondary);

&:hover {
color: var(--el-color-primary);
}
}
}

.post-sidebar {
width: 260px;
flex-shrink: 0;
position: sticky;
top: 100px;
display: none;

@media (min-width: 1024px) {
display: block;
}
}

.toc-container {
padding: 24px;
max-height: calc(100vh - 120px);
overflow-y: auto;
border-radius: var(--border-radius-lg);

.toc-header {
font-weight: 800;
margin-bottom: 20px;
font-size: 1.1rem;
padding-bottom: 15px;
border-bottom: 1px solid var(--el-border-color-lighter);
color: var(--el-text-color-primary);
}

.toc-list {
display: flex;
flex-direction: column;
gap: 12px;
}

.toc-link {
font-size: 0.95rem;
color: var(--el-text-color-regular);
text-decoration: none;
line-height: 1.4;
transition: all 0.2s;
border-left: 2px solid transparent;
padding-left: 12px;
display: block;

&:hover {
color: var(--el-color-primary);
border-left-color: var(--el-color-primary);
}

&.level-3 {
padding-left: 28px;
font-size: 0.9rem;
color: var(--el-text-color-secondary);
}
}
}

/* Post Styling */
.post-header {
margin-bottom: 50px;
text-align: center;
padding-bottom: 30px;
border-bottom: 1px solid var(--el-border-color-lighter);

.post-title {
font-size: 2.5rem;
font-weight: 800;
margin-bottom: 24px;
line-height: 1.3;
background: var(--primary-gradient);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}

.post-meta {
display: flex;
justify-content: center;
align-items: center;
gap: 24px;
color: var(--el-text-color-secondary);
font-size: 0.95rem;

.meta-item {
display: flex;
align-items: center;
gap: 6px;
}
}
}

.post-nav {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 24px;
margin-top: 80px;
padding-top: 40px;
border-top: 1px solid var(--el-border-color-lighter);

.nav-item {
cursor: pointer;
padding: 24px;
border-radius: var(--border-radius-lg);
border: 1px solid var(--el-border-color-lighter);
transition: var(--transition-smooth);
display: flex;
flex-direction: column;

&:hover {
border-color: var(--el-color-primary);
background: var(--el-fill-color-light);
transform: translateY(-2px);
}

&.next {
text-align: right;
}

.label {
font-size: 0.85rem;
color: var(--el-text-color-secondary);
margin-bottom: 10px;
}

.link-title {
font-weight: 700;
color: var(--el-text-color-primary);
font-size: 1.05rem;
}
}
}

.toc-mobile {
margin-bottom: 30px;
border: 1px solid var(--el-border-color-lighter);
border-radius: 8px;
overflow: hidden;

:deep(.el-collapse) {
border: none;
}

:deep(.el-collapse-item__header) {
padding-left: 15px;
font-weight: 600;
}

.toc-list {
padding: 0 15px 15px;
display: flex;
flex-direction: column;
gap: 10px;
}

.toc-link {
text-decoration: none;
color: var(--el-text-color-regular);
font-size: 0.95rem;
display: block;

&.level-3 {
padding-left: 15px;
color: var(--el-text-color-secondary);
}
}
}

// Markdown Styles
.markdown-body {
font-size: 1.1rem;
line-height: 1.8;
color: var(--el-text-color-primary);
font-family: 'Inter', system-ui, sans-serif;

h1,
h2,
h3,
h4,
h5,
h6 {
color: var(--el-text-color-primary);
font-weight: 700;
margin-top: 3rem;
margin-bottom: 1.5rem;
line-height: 1.3;
}

h1 {
font-size: 2.2em;
border-bottom: 1px solid var(--el-border-color-lighter);
padding-bottom: 0.5rem;
}

h2 {
font-size: 1.8em;
padding-bottom: 0.5rem;
border-bottom: 1px solid var(--el-border-color-lighter);
}

h3 {
font-size: 1.5em;
}

p {
margin-bottom: 1.8rem;
letter-spacing: 0.01em;
}

blockquote {
border-left: 4px solid var(--el-color-primary);
background: var(--el-color-primary-light-9);
padding: 20px 24px;
margin: 32px 0;
border-radius: 0 8px 8px 0;

p {
margin-bottom: 0;
color: var(--el-text-color-regular);
}
}

code {
background: var(--el-fill-color);
padding: 2px 6px;
border-radius: 4px;
font-family: 'JetBrains Mono', monospace;
font-size: 0.9em;
color: var(--el-color-danger);
}

pre {
background: #1e1e1e;
padding: 24px;
border-radius: 12px;
margin: 32px 0;
overflow-x: auto;

code {
background: none;
color: #d4d4d4;
padding: 0;
font-size: 0.9rem;
}
}

img {
max-width: 100%;
border-radius: 12px;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
display: block;
margin: 32px auto;
}

a {
color: var(--el-color-primary);
text-decoration: none;
border-bottom: 1px solid transparent;
transition: border-color 0.2s;

&:hover {
border-bottom-color: var(--el-color-primary);
}
}

ul,
ol {
padding-left: 24px;
margin-bottom: 24px;

li {
margin-bottom: 10px;
padding-left: 6px;
}
}
}
</style>
