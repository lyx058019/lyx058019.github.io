<script setup lang="ts">
import { projectList } from '@/data/projects'
import { skills } from '@/data/skills'
import { Promotion } from '@element-plus/icons-vue'
import { computed } from 'vue'

const featuredProjects = computed(() => projectList.filter(p => p.isFeatured))
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="animate-drop">你好，我是 <span class="highlight">lyx058019</span></h1>
        <p class="subtitle animate-fade">一名专注于前端工程化与用户体验的资深开发者</p>
        <div class="hero-actions">
          <el-button type="primary" size="large" :icon="Promotion">联系我</el-button>
          <el-button size="large">查看项目</el-button>
        </div>
      </div>
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
      <h2 class="section-title">精选项目</h2>
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
  </div>
</template>

<style scoped lang="scss">
.home-view {
  .section {
    padding: 4rem 0;
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
}
</style>
