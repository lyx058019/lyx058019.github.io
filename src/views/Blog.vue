<script setup lang="ts">
import { Calendar } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import postsIndex from '@/data/posts.index.json'

const router = useRouter()

interface Post {
  id: string
  title: string
  date: string
  description: string
  tags: string[]
  readingTime?: string
}

const posts: Post[] = (Array.isArray(postsIndex) ? postsIndex : [])
  .map((p: any) => ({
    id: typeof p?.id === 'string' ? p.id : '',
    title: typeof p?.title === 'string' ? p.title : 'Untitled',
    date: typeof p?.date === 'string' ? p.date : '',
    description: typeof p?.description === 'string' ? p.description : '',
    tags: Array.isArray(p?.tags) ? p.tags.filter((t: any) => typeof t === 'string') : [],
    readingTime: typeof p?.readingTime === 'string' ? p.readingTime : undefined,
  }))
  .filter((p) => !!p.id)

const query = ref('')
const activeTags = ref<string[]>([])

const allTags = computed(() => {
  const set = new Set<string>()
  for (const p of posts) {
    for (const t of p.tags || []) {
      if (typeof t === 'string' && t.trim()) set.add(t)
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b))
})

const filteredPosts = computed(() => {
  const q = query.value.trim().toLowerCase()
  const tags = activeTags.value

  return posts.filter((p) => {
    if (q) {
      const hay = `${p.title || ''} ${p.description || ''}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    if (tags.length) {
      const postTags = Array.isArray(p.tags) ? p.tags : []
      for (const t of tags) {
        if (!postTags.includes(t)) return false
      }
    }
    return true
  })
})

const formatDate = (raw: string) => {
  if (!raw) return ''
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return raw
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const goToPost = (id: string) => {
  router.push(`/blog/${id}`)
}
</script>

<template>
  <div class="blog-list-view">
    <div class="page-header">
      <h1 class="page-title">博客文章</h1>
      <p class="page-subtitle">分享技术、思考与生活</p>
    </div>

    <div class="filters">
      <el-input v-model="query" clearable placeholder="搜索标题 / 描述" class="search" />
      <el-select v-model="activeTags" multiple clearable collapse-tags collapse-tags-tooltip placeholder="按标签筛选" class="tags">
        <el-option v-for="tag in allTags" :key="tag" :label="tag" :value="tag" />
      </el-select>
    </div>

    <div class="post-list">
      <el-card v-for="post in filteredPosts" :key="post.id" class="post-item" shadow="hover" @click="goToPost(post.id)">
        <div class="post-content">
          <h2 class="post-title">{{ post.title }}</h2>
          <div class="post-meta">
            <span class="meta-item"><el-icon>
              <Calendar />
              </el-icon> {{ formatDate(post.date) }}</span>
            <span class="meta-item" v-if="post.tags.length">
              <el-tag v-for="tag in post.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
            </span>
            <span class="meta-item" v-if="post.readingTime">（{{ post.readingTime }}）</span>
          </div>
          <p class="post-desc">{{ post.description }}</p>
        </div>
      </el-card>

      <el-empty v-if="!filteredPosts.length" description="没有匹配的文章" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-list-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  .page-title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .page-subtitle {
    color: var(--el-text-color-secondary);
  }
}

.post-item {
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  .post-title {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    color: var(--el-text-color-primary);
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    color: var(--el-text-color-secondary);
    font-size: 0.9rem;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .post-desc {
    color: var(--el-text-color-regular);
    line-height: 1.6;
    margin: 0;
  }
}

.filters {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 0 auto 1.5rem;
  max-width: 800px;

  .search {
    flex: 1;
    min-width: 220px;
  }

  .tags {
    width: 280px;
  }
}

@media (max-width: 600px) {
  .filters {
    flex-direction: column;
    align-items: stretch;

    .tags {
      width: 100%;
    }
  }
}
</style>
