<script setup lang="ts">
import postsIndex from '@/data/posts.index.json'
import { projectList } from '@/data/projects'
import { tools } from '@/data/tools'
import { ArrowRight, Monitor, Promotion } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Get the absolute #1 project
const mainProject = computed(() => projectList.find(p => p.isFeatured) || projectList[0])

type PostMeta = { id: string; title: string; date: string; description: string; tags: string[] }
const latestPosts = computed<PostMeta[]>(() => {
  const list = (Array.isArray(postsIndex) ? postsIndex : [])
  return list.slice(0, 3).map((p: any) => ({
    id: typeof p?.id === 'string' ? p.id : '',
    title: typeof p?.title === 'string' ? p.title : 'Untitled',
    date: typeof p?.date === 'string' ? p.date : '',
    description: typeof p?.description === 'string' ? p.description : '',
    tags: Array.isArray(p?.tags) ? p.tags.filter((t: any) => typeof t === 'string') : [],
  }))
})

// Get top 5 tools to fill the bento grid perfectly (4x3 layout)
const quickTools = computed(() => tools.slice(0, 5))

const goBlog = () => router.push('/blog')
const goProjects = () => router.push('/projects')
const goTools = () => router.push('/tools')
const goPost = (id: string) => router.push(`/blog/${id}`)
const goTool = (path: string) => router.push(path)
const openExternal = (url?: string) => {
  if (!url || typeof window === 'undefined') {
    return
  }

  window.open(url, '_blank')
}
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero bg-hero-grid">
      <!-- Ambient Orbs Removed -->

      <div class="hero-content">
        <div class="hero-badge">
          Available for collaboration
        </div>
        <h1 class="animate-drop">MicRabbit<br><span class="highlight">把AI变成产品</span></h1>
        <p class="subtitle animate-fade">AI 工具创造者 · 全栈工程师<br>专注将前沿技术落地为可用产品与工作流。</p>

        <div class="hero-actions">
          <el-button type="primary" size="large" :icon="Promotion" class="pk-btn-primary"
            @click="goBlog">看我的作品</el-button>
          <el-button size="large" class="pk-btn-secondary" @click="goTools">试试我的AI工具</el-button>
        </div>
      </div>
    </section>

    <section class="home-sections">
      <div class="section-block identity-block">
        <div class="identity-main">
          <p class="identity-title">AI 工具创造者 · 全栈工程师</p>
          <p class="identity-desc">用全栈能力把 AI 落地成可用的工具和产品，专注 RAG 与工程化。</p>
        </div>
        <div class="identity-side">
          <div class="identity-pill">内容冷启动 · 两周一篇</div>
          <div class="identity-note">博客是基地，内容先做深。</div>
        </div>
      </div>

      <div class="section-block category-block">
        <div class="category-card">
          <div class="category-head">
            <span class="category-tag">AI 产品实战</span>
            <el-icon>
              <ArrowRight />
            </el-icon>
          </div>
          <p>选型、架构、工程化与踩坑。记录从0到1的产品落地。</p>
          <el-button text class="category-action" @click="goBlog">进入文章</el-button>
        </div>
        <div class="category-card">
          <div class="category-head">
            <span class="category-tag">AI 工具与工作流</span>
            <el-icon>
              <ArrowRight />
            </el-icon>
          </div>
          <p>提示词工程、工具链评测、AI工作流配置与效率实践。</p>
          <el-button text class="category-action" @click="goBlog">进入文章</el-button>
        </div>
      </div>

      <div class="section-block post-block">
        <div class="section-title">
          <h2>最新文章</h2>
          <el-button text @click="goBlog">查看全部</el-button>
        </div>
        <div class="post-list">
          <div class="post-card" v-for="post in latestPosts" :key="post.id" @click="goPost(post.id)">
            <div class="post-meta">
              <span>{{ new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}</span>
              <span v-if="post.tags?.length">{{ post.tags[0] }}</span>
            </div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.description }}</p>
          </div>
        </div>
      </div>

      <div class="section-block tool-block">
        <div class="section-title">
          <h2>在线工具</h2>
          <el-button text @click="goTools">进入工具箱</el-button>
        </div>
        <div class="tool-grid">
          <div class="tool-item" v-for="tool in quickTools" :key="tool.id" @click="goTool(tool.path)">
            <div class="tool-icon">
              <component :is="tool.icon" />
            </div>
            <div class="tool-info">
              <span class="tool-name">{{ tool.name }}</span>
            </div>
          </div>
          <div class="tool-item tool-more" @click="goTools">
            <div class="tool-icon">
              <el-icon>
                <Monitor />
              </el-icon>
            </div>
            <span class="tool-name">更多工具</span>
          </div>
        </div>
      </div>

      <div class="section-block project-block" v-if="mainProject">
        <div class="section-title">
          <h2>正在做的产品</h2>
        </div>
        <div class="project-card" @click="openExternal(mainProject.link)">
          <div class="project-head">
            <el-tag type="warning" effect="dark" class="pk-tag-indicator">FEATURED PROJECT</el-tag>
            <el-icon>
              <ArrowRight />
            </el-icon>
          </div>
          <h3>{{ mainProject.title }}</h3>
          <p>{{ mainProject.description }}</p>
          <div class="tech-stack">
            <span v-for="t in mainProject.tech" :key="t">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home-view {
  padding-bottom: 80px;
}

.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 40px;

  .hero-content {
    max-width: 800px;
    z-index: 2;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: var(--pk-ambient-1);
    color: var(--pk-color-primary);
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid var(--pk-border-color);
  }

  h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    line-height: 1.1;
    margin-bottom: 32px;
    letter-spacing: -0.04em;
    font-weight: 900;
    font-family: 'Plus Jakarta Sans', sans-serif;

    .highlight {
      color: var(--pk-color-primary);
    }
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--pk-color-text-secondary);
    margin-bottom: 40px;
    max-width: 500px;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
  }
}


.home-sections {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 20px;
}

.section-block {
  border: 1px solid var(--pk-border-color);
  border-radius: var(--border-radius-lg);
  padding: 28px 32px;
  background: var(--pk-color-bg-card);
}

.identity-block {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .identity-title {
    margin: 0 0 8px;
    font-weight: 700;
    color: var(--pk-color-text-primary);
  }

  .identity-desc {
    margin: 0;
    color: var(--pk-color-text-secondary);
    line-height: 1.7;
  }

  .identity-side {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    color: var(--pk-color-text-secondary);
    font-size: 0.9rem;
  }

  .identity-pill {
    padding: 6px 12px;
    border-radius: 99px;
    border: 1px solid var(--pk-border-color);
    color: var(--pk-color-primary);
    font-weight: 600;
  }
}

.category-block {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  .category-card {
    border: 1px solid var(--pk-border-color);
    border-radius: var(--border-radius-lg);
    padding: 20px 24px;
    transition: var(--transition-smooth);

    &:hover {
      transform: translateY(-2px);
      border-color: var(--pk-color-primary);
    }

    .category-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .category-tag {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--pk-color-text-primary);
    }

    p {
      margin: 0 0 16px;
      color: var(--pk-color-text-secondary);
      line-height: 1.6;
    }

    .category-action {
      padding: 0;
      font-weight: 600;
    }
  }
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  h2 {
    margin: 0;
    font-size: 1.4rem;
  }
}

.post-block {
  .post-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .post-card {
    border: 1px solid var(--pk-border-color);
    border-radius: var(--border-radius-lg);
    padding: 18px 20px;
    cursor: pointer;
    transition: var(--transition-smooth);
    background: var(--pk-color-bg-card);

    &:hover {
      transform: translateY(-2px);
      border-color: var(--pk-color-primary);
    }

    .post-meta {
      display: flex;
      gap: 10px;
      font-size: 0.8rem;
      color: var(--pk-color-text-secondary);
      margin-bottom: 10px;
    }

    h3 {
      margin: 0 0 8px;
      font-size: 1.05rem;
      line-height: 1.4;
      color: var(--pk-color-text-primary);
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: var(--pk-color-text-secondary);
      line-height: 1.6;
    }
  }
}

.tool-block {
  .tool-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .tool-item {
    border: 1px solid var(--pk-border-color);
    border-radius: var(--border-radius-lg);
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: var(--transition-smooth);

    &:hover {
      transform: translateY(-2px);
      border-color: var(--pk-color-primary);
    }
  }

  .tool-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--pk-ambient-1);
    color: var(--pk-color-primary);
    font-size: 20px;
  }

  .tool-name {
    font-weight: 600;
  }

  .tool-more {
    border-style: dashed;
  }
}

.project-block {
  .project-card {
    border: 1px solid var(--pk-border-color);
    border-radius: var(--border-radius-lg);
    padding: 24px 28px;
    cursor: pointer;
    transition: var(--transition-smooth);
    background: var(--pk-color-surface-strong);
    color: var(--pk-color-text-on-strong);

    &:hover {
      transform: translateY(-2px);
      border-color: var(--pk-color-primary);
    }

    .project-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    h3 {
      margin: 0 0 12px;
      font-size: 2rem;
    }

    p {
      margin: 0 0 16px;
      color: var(--pk-color-text-on-strong-muted);
    }
  }

  .tech-stack {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    span {
      padding: 4px 12px;
      border: 1px solid var(--pk-color-border-on-strong);
      border-radius: 99px;
      font-size: 0.8rem;
      color: var(--pk-color-text-on-strong);
    }
  }

  .pk-tag-indicator {
    background: var(--pk-color-primary);
    border: none;
    color: var(--pk-color-text-on-strong);
    font-weight: 800;
    letter-spacing: 0.05em;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 3rem;
  }

  .home-sections {
    gap: 20px;
  }

  .identity-block {
    flex-direction: column;
  }

  .category-block {
    grid-template-columns: 1fr;
  }

  .post-block .post-list,
  .tool-block .tool-grid {
    grid-template-columns: 1fr;
  }

  .project-block .project-card h3 {
    font-size: 1.5rem;
  }
}
</style>
