<script setup lang="ts">
import { Calendar } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Eager load all meta data
// unplugin-vue-markdown allows importing frontmatter
const modules = import.meta.glob('@/data/posts/*.md', { eager: true })

interface Post {
  path: string
  id: string
  title: string
  date: string
  description: string
  tags: string[]
}

const posts: Post[] = Object.entries(modules).map(([path, mod]: [string, any]) => {
  // path like /src/data/posts/hello-world.md
  const id = path.split('/').pop()?.replace('.md', '') || ''
  const fm = mod.frontmatter || {}
  return {
    path,
    id,
    title: fm.title || 'Untitled',
    date: fm.date || '',
    description: fm.description || '',
    tags: fm.tags || []
  }
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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

    <div class="post-list">
      <el-card v-for="post in posts" :key="post.id" class="post-item" shadow="hover" @click="goToPost(post.id)">
        <div class="post-content">
          <h2 class="post-title">{{ post.title }}</h2>
          <div class="post-meta">
            <span class="meta-item"><el-icon>
                <Calendar />
              </el-icon> {{ post.date }}</span>
            <span class="meta-item" v-if="post.tags.length">
              <el-tag v-for="tag in post.tags" :key="tag" size="small" effect="plain">{{ tag }}</el-tag>
            </span>
          </div>
          <p class="post-desc">{{ post.description }}</p>
        </div>
      </el-card>
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
</style>
