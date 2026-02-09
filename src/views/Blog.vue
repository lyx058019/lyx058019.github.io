<script setup lang="ts">
import postsIndex from '@/data/posts.index.json'
import { ArrowRight, Timer } from '@element-plus/icons-vue'
import { computed } from 'vue'
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

const filteredPosts = computed(() => posts)

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
      <p class="page-subtitle">AI 产品实战与工具工作流</p>
    </div>

    <div class="blog-intro">
      <div class="intro-left">
        <p class="intro-title">MicRabbit · 把AI变成产品</p>
        <p class="intro-desc">从0到1做AI工具：实战、踩坑、工具链与可复用的工程方法。</p>
      </div>
      <div class="intro-right">
        <div class="intro-hint">
          <span class="hint-label">Phase 1</span>
          <span>聚焦内容冷启动，先把文章做深做实</span>
        </div>
      </div>
    </div>

    <div class="category-entry">
      <div class="entry-card">
        <div class="entry-head">
          <span class="entry-tag">分类 01</span>
          <el-icon>
            <ArrowRight />
          </el-icon>
        </div>
        <h3>AI 产品实战</h3>
        <p>选型、架构、工程化与踩坑，记录把AI落地成产品的全过程。</p>
      </div>
      <div class="entry-card">
        <div class="entry-head">
          <span class="entry-tag">分类 02</span>
          <el-icon>
            <ArrowRight />
          </el-icon>
        </div>
        <h3>AI 工具与工作流</h3>
        <p>提示词工程、工具链评测、AI工作流配置与效率实践。</p>
      </div>
    </div>

    <div class="post-list">
      <el-card v-for="post in filteredPosts" :key="post.id" class="post-item" shadow="hover" @click="goToPost(post.id)">
        <div class="post-content">
          <div class="post-top">
            <h2 class="post-title">{{ post.title }}</h2>
          </div>
          <div class="post-meta">
            <span class="meta-info" v-if="post.readingTime">
              <el-icon>
                <Timer />
              </el-icon> {{ post.readingTime }}
            </span>
            <span class="post-date">{{ formatDate(post.date) }}</span>
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

.blog-intro {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 40px;
  padding: 24px 28px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--pk-border-color);
  background: var(--pk-color-bg-card);

  .intro-title {
    margin: 0 0 8px;
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--pk-color-text-primary);
  }

  .intro-desc {
    margin: 0;
    color: var(--pk-color-text-secondary);
    line-height: 1.7;
  }

  .intro-hint {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--pk-color-text-secondary);
    font-size: 0.9rem;

    .hint-label {
      display: inline-flex;
      padding: 4px 10px;
      border-radius: 99px;
      border: 1px solid var(--pk-border-color);
      color: var(--pk-color-primary);
      font-weight: 600;
    }
  }
}

.category-entry {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 48px;

  .entry-card {
    border: 1px solid var(--pk-border-color);
    border-radius: var(--border-radius-lg);
    padding: 20px 24px;
    background: var(--pk-color-bg-card);
    transition: var(--transition-smooth);

    &:hover {
      transform: translateY(-2px);
      border-color: var(--pk-color-primary);
    }

    .entry-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      color: var(--pk-color-text-secondary);
    }

    .entry-tag {
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--pk-color-text-secondary);
    }

    h3 {
      margin: 0 0 10px;
      font-size: 1.25rem;
      color: var(--pk-color-text-primary);
    }

    p {
      margin: 0;
      color: var(--pk-color-text-secondary);
      line-height: 1.6;
    }
  }
}

.post-item {
  margin-bottom: 24px;
  cursor: pointer;

  .post-top {
    display: flex;
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
    gap: 12px;
    margin-bottom: 12px;

    .meta-info {
      font-size: 0.85rem;
      color: var(--el-text-color-secondary);
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .post-date {
    font-size: 0.85rem;
    color: var(--el-text-color-secondary);
  }

  .post-desc {
    color: var(--el-text-color-regular);
    line-height: 1.6;
    margin: 0;
    font-size: 1.05rem;
  }
}

@media (max-width: 768px) {
  .post-top {
    flex-direction: column;
    gap: 4px;
  }

  .blog-intro {
    flex-direction: column;
    padding: 20px;
  }

  .category-entry {
    grid-template-columns: 1fr;
  }
}
</style>
