<script setup lang="ts">
import { projectList } from '@/data/projects'
import { skills } from '@/data/skills'
import { tools } from '@/data/tools'
import postsIndex from '@/data/posts.index.json'
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
              <div class="tool-icon" :style="{ backgroundColor: (tool.color || '#409eff') + '1f', color: tool.color || '#409eff' }">
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
    padding: 4rem 0;
  }

  .section-head {
    max-width: 1000px;
    margin: 0 auto 3rem;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding: 0 4px;
  }

  .section-more {
    font-weight: 600;
  }

  .section-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 4px;
      background: var(--el-color-primary);
      border-radius: 2px;
    }
  }
}

.hero {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(circle at top right, var(--el-color-primary-light-9), transparent);
  border-radius: 16px;
  margin-bottom: 2rem;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;

    .highlight {
      color: var(--el-color-primary);
    }
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--el-text-color-secondary);
    margin-bottom: 2rem;
  }
}

.post-card {
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
  }

  .post-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
  }

  .post-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--el-text-color-primary);
    line-height: 1.35;
  }

  .post-date {
    flex-shrink: 0;
    font-size: 0.85rem;
    color: var(--el-text-color-secondary);
    padding-top: 2px;
  }

  .post-desc {
    color: var(--el-text-color-regular);
    line-height: 1.6;
    margin: 0 0 10px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
}

.tool-card {
  cursor: pointer;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-4px);
  }

  .tool-content {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .tool-icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .tool-name {
    font-weight: 700;
    margin-bottom: 4px;
  }

  .tool-desc {
    color: var(--el-text-color-secondary);
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.skill-card {
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin: 1rem 0;
  }
}

.project-card {
  height: 100%;

  .project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

/* 简单动画 */
.animate-drop {
  animation: dropIn 0.8s ease-out;
}

.animate-fade {
  animation: fadeIn 1.2s ease-out;
}

@keyframes dropIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .home-view .section-head {
    margin-bottom: 2rem;
  }
}
</style>
