<script setup lang="ts">
import postsIndex from '@/data/posts.index.json'
import { projectList } from '@/data/projects'
import { tools } from '@/data/tools'
import { ArrowRight, Monitor, Promotion, Right } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Get the absolute #1 project
const mainProject = computed(() => projectList.find(p => p.isFeatured) || projectList[0])

type PostMeta = { id: string; title: string; date: string; description: string; tags: string[] }
const latestPost = computed<PostMeta | null>(() => {
  const list = (Array.isArray(postsIndex) ? postsIndex : [])
  if (!list.length) return null
  const p = list[0] as any
  return {
    id: typeof p?.id === 'string' ? p.id : '',
    title: typeof p?.title === 'string' ? p.title : 'Untitled',
    date: typeof p?.date === 'string' ? p.date : '',
    description: typeof p?.description === 'string' ? p.description : '',
    tags: Array.isArray(p?.tags) ? p.tags.filter((t: any) => typeof t === 'string') : [],
  }
})

// Get top 5 tools to fill the bento grid perfectly (4x3 layout)
const quickTools = computed(() => tools.slice(0, 5))

const goBlog = () => router.push('/blog')
const goProjects = () => router.push('/projects')
const goTools = () => router.push('/tools')
const goPost = (id: string) => router.push(`/blog/${id}`)
const goTool = (path: string) => router.push(path)
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero bg-hero-grid">
      <!-- Ambient Orbs -->
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>

      <div class="hero-content">
        <div class="hero-badge">
          <span class="pulse"></span> Available for work
        </div>
        <h1 class="animate-drop">构建<br><span class="highlight">数字化体验</span></h1>
        <p class="subtitle animate-fade">前端开发工程师 & 敏捷开发者。<br>专注于构建高性能、可访问的 Web 应用程序。</p>

        <div class="hero-actions">
          <el-button type="primary" size="large" :icon="Promotion" color="#FF4D00" class="pk-btn-primary"
            @click="goBlog">阅读博客</el-button>
          <el-button size="large" class="pk-btn-secondary" @click="goProjects">查看项目</el-button>
        </div>
      </div>
    </section>

    <!-- Bento Grid Dashboard -->
    <section class="dashboard">
      <div class="bento-grid">

        <!-- Large Block: Featured Project -->
        <div class="bento-card bento-item-large" v-if="mainProject" @click="window.open(mainProject.link, '_blank')">
          <div class="card-content project-highlight">
            <div class="card-header">
              <el-tag type="warning" effect="dark" class="pk-tag-indicator">FEATURED PROJECT</el-tag>
              <el-icon class="action-icon">
                <ArrowRight />
              </el-icon>
            </div>
            <div class="project-info">
              <h3>{{ mainProject.title }}</h3>
              <p>{{ mainProject.description }}</p>
              <div class="tech-stack">
                <span v-for="t in mainProject.tech" :key="t">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Medium Block: Latest Thought -->
        <div class="bento-card bento-item-tall" v-if="latestPost" @click="goPost(latestPost.id)">
          <div class="card-content post-highlight">
            <div class="card-header">
              <span class="date-label">{{ new Date(latestPost.date).toLocaleDateString('en-US', {
                month: 'short', day:
                  'numeric'
              }) }}</span>
              <el-icon class="action-icon">
                <Right />
              </el-icon>
            </div>
            <div class="post-info">
              <div class="label">LATEST THOUGHT</div>
              <h3>{{ latestPost.title }}</h3>
              <p>{{ latestPost.description }}</p>
            </div>
          </div>
        </div>

        <!-- Small Blocks: Tools -->
        <div class="bento-card tool-shortcut" v-for="tool in quickTools" :key="tool.id" @click="goTool(tool.path)">
          <div class="tool-icon-sm">
            <component :is="tool.icon" />
          </div>
          <span class="tool-name">{{ tool.name }}</span>
        </div>

        <!-- See More Block -->
        <div class="bento-card more-link" @click="goTools">
          <div class="more-content">
            <div class="circle-btn">
              <el-icon>
                <Monitor />
              </el-icon>
            </div>
            <span>工具箱</span>
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
  margin-bottom: 60px;

  .hero-content {
    max-width: 800px;
    z-index: 2;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: rgba(255, 77, 0, 0.1);
    color: var(--pk-color-primary);
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    .pulse {
      width: 8px;
      height: 8px;
      background: currentColor;
      border-radius: 50%;
      box-shadow: 0 0 0 rgba(255, 77, 0, 0.4);
      animation: pulse 2s infinite;
    }
  }

  h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    line-height: 0.95;
    margin-bottom: 32px;
    letter-spacing: -0.04em;
    font-weight: 900;
    font-family: 'Plus Jakarta Sans', sans-serif;

    .highlight {
      color: var(--pk-color-primary);
    }
  }

  .orb {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    z-index: 0;
    pointer-events: none;
    animation: floatOrb 10s infinite ease-in-out;
  }

  .orb-1 {
    background: var(--pk-color-primary);
    top: -50px;
    right: -50px;
    animation-delay: 0s;
  }

  .orb-2 {
    background: #4f46e5;
    /* Indigo */
    bottom: -50px;
    left: 20%;
    width: 200px;
    height: 200px;
    animation-delay: -5s;
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

@keyframes floatOrb {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(20px, -20px);
  }
}

/* Bento Grid Specifics */
.bento-grid {
  /* Layout handled by global .bento-grid in main.scss */
}

/* Specific Card Styles */
.bento-card {
  cursor: pointer;

  .card-content {
    padding: 32px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}

.bento-item-large {
  grid-column: span 1;

  @media (min-width: 992px) {
    grid-column: span 2;
    grid-row: span 2;
  }

  background: #171717;
  /* Neutral-900: Always dark to support white text */
  /* Dark Card for Feature */
  border: none;

  .project-info {
    h3 {
      font-size: 2.5rem;
      color: white;
      margin: 0 0 16px;
      line-height: 1;
      letter-spacing: -0.03em;
    }

    p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 1.1rem;
      margin-bottom: 24px;
    }
  }

  .tech-stack {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    span {
      padding: 4px 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 99px;
      font-size: 0.8rem;
      color: white;
    }
  }

  .pk-tag-indicator {
    background: var(--pk-color-primary);
    border: none;
    color: white;
    font-weight: 800;
    letter-spacing: 0.05em;
  }

  .action-icon {
    font-size: 24px;
    color: white;
    transform: rotate(-45deg);
    transition: transform 0.3s;
  }

  &:hover .action-icon {
    transform: rotate(0deg);
  }
}

.bento-item-tall {
  @media (min-width: 992px) {
    grid-column: span 1;
    grid-row: span 2;
  }

  .post-highlight {
    background: var(--pk-color-bg-card);
  }

  .date-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: var(--pk-color-text-secondary);
  }

  .label {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--pk-color-primary);
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 1.1;
    margin-bottom: 12px;
    letter-spacing: -0.02em;

    /* Multiline truncation */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    font-size: 0.95rem;
    color: var(--pk-color-text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .action-icon {
    transition: transform 0.3s;
  }

  &:hover .action-icon {
    transform: translateX(4px);
  }
}

.tool-shortcut {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 16px;
  text-align: center;

  .tool-icon-sm {
    font-size: 32px;
    color: var(--pk-color-text-primary);
    transition: transform 0.3s;
  }

  .tool-name {
    font-weight: 700;
    font-size: 0.95rem;
  }

  &:hover {
    .tool-icon-sm {
      color: var(--pk-color-primary);
      transform: scale(1.1);
    }
  }
}

.more-link {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-style: dashed;

  .more-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: var(--pk-color-text-secondary);
  }

  .circle-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--pk-border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--pk-color-bg-card);
    transition: all 0.3s;
    font-size: 20px;
  }

  &:hover .circle-btn {
    border-color: var(--pk-color-primary);
    color: var(--pk-color-primary);
    transform: rotate(90deg);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 77, 0, 0.4);
  }

  70% {
    box-shadow: 0 0 0 6px rgba(255, 77, 0, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 77, 0, 0);
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 3rem;
  }

  .bento-item-large {
    .project-info h3 {
      font-size: 1.5rem;
    }
  }

  /* Reset grid specific layout on mobile so everything stacks */
  /* This is handled by default grid or media queries in main.scss,
     but we ensure specific item spans are reset if needed.
     Currently main.scss handles columns, but spans might persist.
  */
  .bento-item-large,
  .bento-item-tall {
    grid-column: span 1;
    grid-row: span 1;
  }
}
</style>
