<script setup lang="ts">
import postsIndex from '@/data/posts.index.json'
import { Search, Timer } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

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

    <div class="filters glass-effect">
      <el-input v-model="query" clearable placeholder="搜索标题 / 描述" class="search">
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
      <el-select v-model="activeTags" multiple clearable collapse-tags collapse-tags-tooltip placeholder="按标签筛选"
        class="tags">
        <el-option v-for="tag in allTags" :key="tag" :label="tag" :value="tag" />
      </el-select>
    </div>

    <div class="post-list">
      <el-card v-for="post in filteredPosts" :key="post.id" class="post-item" shadow="hover" @click="goToPost(post.id)">
        <div class="post-content">
          <div class="post-top">
            <h2 class="post-title">{{ post.title }}</h2>
            <div class="post-date">{{ formatDate(post.date) }}</div>
          </div>
          <div class="post-meta">
            <span class="meta-tags" v-if="post.tags.length">
              <el-tag v-for="tag in post.tags" :key="tag" size="small" effect="plain" round>{{ tag }}</el-tag>
            </span>
            <span class="meta-info" v-if="post.readingTime">
              <el-icon>
                <Timer />
              </el-icon> {{ post.readingTime }}
            </span>
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
  max-width: 900px;
  margin: 0 auto;
}

.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  padding: 20px;
  border-radius: var(--border-radius-lg);

  .search {
    flex: 2;
  }

  .tags {
    flex: 1;
  }
}

.post-item {
  margin-bottom: 24px;
  cursor: pointer;

  .post-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 16px;
  }

  .post-title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--el-text-color-primary);
  }

  .post-date {
    font-size: 0.9rem;
    color: var(--el-text-color-secondary);
    white-space: nowrap;
    padding-top: 6px;
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;

    .meta-tags {
      display: flex;
      gap: 8px;
    }

    .meta-info {
      font-size: 0.85rem;
      color: var(--el-text-color-secondary);
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .post-desc {
    color: var(--el-text-color-regular);
    line-height: 1.6;
    margin: 0;
    font-size: 1.05rem;
  }
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .post-top {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
