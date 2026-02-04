<script setup lang="ts">
import postsIndex from '@/data/posts.index.json'
import { projectList } from '@/data/projects'
import { skills } from '@/data/skills'
import { tools } from '@/data/tools'
import { Promotion } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const featuredProjects = computed(() => projectList.filter(p => p.isFeatured))

type PostMeta = { id: string; title: string; date: string; description: string; tags: string[] }
const latestPosts = computed<PostMeta[]>(() => {
  return (Array.isArray(postsIndex) ? postsIndex : [])
    .map((p: any) => ({
      id: typeof p?.id === 'string' ? p.id : '',
      title: typeof p?.title === 'string' ? p.title : 'Untitled',
      date: typeof p?.date === 'string' ? p.date : '',
      description: typeof p?.description === 'string' ? p.description : '',
      tags: Array.isArray(p?.tags) ? p.tags.filter((t: any) => typeof t === 'string') : [],
    }))
    .filter((p) => !!p.id)
    .slice(0, 3)
})

const featuredTools = computed(() => tools.slice(0, 6))

const formatDate = (raw: string) => {
  if (!raw) return ''
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return raw
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const goBlog = () => router.push('/blog')
const goProjects = () => router.push('/projects')
const goTools = () => router.push('/tools')
const goAbout = () => router.push('/about')
const goPost = (id: string) => router.push(`/blog/${id}`)
const goTool = (path: string) => router.push(path)
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="animate-drop">你好，我是 <span class="highlight">lyx058019</span></h1>
        <p class="subtitle animate-fade">一名专注于前端工程化与用户体验的资深开发者</p>
        <div class="hero-actions">
          <el-button type="primary" size="large" :icon="Promotion" @click="goAbout">联系我</el-button>
          <el-button size="large" @click="goProjects">查看项目</el-button>
        </div>
      </div>
    </section>

    <!-- Latest Posts Section -->
    <section class="section latest">
      <div class="section-head">
        <h2 class="section-title">最新文章</h2>
        <el-button text class="section-more" @click="goBlog">查看全部</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :xs="24" :md="8" v-for="p in latestPosts" :key="p.id">
          <el-card shadow="hover" class="post-card" @click="goPost(p.id)">
            <div class="post-top">
              <div class="post-title">{{ p.title }}</div>
              <div class="post-date">{{ formatDate(p.date) }}</div>
            </div>
            <div class="post-desc">{{ p.description }}</div>
            <div class="post-tags" v-if="p.tags.length">
              <el-tag v-for="t in p.tags.slice(0, 3)" :key="t" size="small" effect="plain">{{ t }}</el-tag>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-empty v-if="!latestPosts.length" description="暂无文章" />
    </section>

    <!-- Skills Section -->
    <section class="section skills">
      <h2 class="section-title">核心技能</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="6" v-for="skill in skills" :key="skill.name">
          <el-card shadow="hover" class="skill-card">
            <el-icon :size="40" :style="{ color: skill.color }">
              <component :is="skill.icon" />
            </el-icon>
            <h3>{{ skill.name }}</h3>
            <el-progress :percentage="skill.progress" :color="skill.color" />
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- Projects Section -->
    <section class="section projects">
      <div class="section-head">
        <h2 class="section-title">精选项目</h2>
        <el-button text class="section-more" @click="goProjects">查看全部</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" v-for="project in featuredProjects" :key="project.title">
          <el-card shadow="hover" class="project-card">
            <template #header>
              <div class="project-header">
                <span>{{ project.title }}</span>
                <el-tag size="small">{{ project.tech[0] }}</el-tag>
              </div>
            </template>
            <p>{{ project.description }}</p>
            <el-link type="primary" :underline="false" :href="project.link">查看详情 <el-icon>
                <Promotion />
              </el-icon></el-link>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- Tools Section -->
    <section class="section tools">
      <div class="section-head">
        <h2 class="section-title">常用工具</h2>
        <el-button text class="section-more" @click="goTools">打开工具箱</el-button>
      </div>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="12" :md="8" v-for="tool in featuredTools" :key="tool.id">
          <el-card shadow="hover" class="tool-card" @click="goTool(tool.path)">
            <div class="tool-content">
              <div class="tool-icon"
                :style="{ backgroundColor: (tool.color || '#409eff') + '1f', color: tool.color || '#409eff' }">
                <component :is="tool.icon" />
              </div>
              <div class="tool-info">
                <div class="tool-name">{{ tool.name }}</div>
                <div class="tool-desc">{{ tool.description }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home-view {
  .section {
    padding: 60px 0;
  }

  :deep(.el-row) {
    margin-bottom: -24px;
    /* 抵消最后一行的 margin-bottom */
  }

  :deep(.el-col) {
    margin-bottom: 24px;
  }

  .section-head {
    max-width: 1200px;
    margin: 0 auto 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .section-title {
      margin-bottom: 0;
      text-align: left;

      &::after {
        left: 0;
        transform: none;
        width: 40px;
        bottom: -8px;
      }
    }
  }

  .section-title {
    font-size: 2.2rem;
    margin-bottom: 50px;
    position: relative;
    font-weight: 800;

    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 5px;
      background: var(--primary-gradient);
      border-radius: 10px;
    }
  }
}

.hero {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  margin-bottom: 40px;
  background: radial-gradient(circle at 0% 0%, var(--el-color-primary-light-9) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, var(--el-color-success-light-9) 0%, transparent 50%);

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 800px;
    padding: 0 20px;
  }

  h1 {
    font-size: 4.5rem;
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: -2px;

    span.highlight {
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .subtitle {
    font-size: 1.5rem;
    color: var(--el-text-color-secondary);
    margin-bottom: 40px;
    font-weight: 400;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
}

.post-card,
.skill-card,
.tool-card {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: var(--border-radius-lg);
  transition: var(--transition-smooth);
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    border-color: var(--el-color-primary-light-5);
  }
}

.post-card {
  cursor: pointer;

  .post-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 12px;
  }

  .post-title {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.4;
  }

  .post-date {
    font-size: 0.85rem;
    color: var(--el-text-color-secondary);
    white-space: nowrap;
  }

  .post-desc {
    color: var(--el-text-color-regular);
    margin-bottom: 16px;
    font-size: 0.95rem;
  }
}

.skill-card {
  padding: 30px 20px;
  text-align: center;

  .el-icon {
    margin-bottom: 20px;
    transition: var(--transition-smooth);
  }

  &:hover .el-icon {
    transform: scale(1.1) rotate(5deg);
  }

  h3 {
    margin-bottom: 15px;
    font-size: 1.25rem;
  }
}

.tool-card {
  cursor: pointer;

  .tool-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .tool-icon {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    background: var(--el-fill-color-light);
  }

  .tool-name {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 4px;
  }

  .tool-desc {
    color: var(--el-text-color-secondary);
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.8rem;
    letter-spacing: -1px;
  }

  .hero .subtitle {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
