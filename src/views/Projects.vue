<template>
  <div class="projects-view">
    <div class="page-header">
      <h1 class="page-title">全部项目</h1>
      <p class="page-subtitle">探索我的个人项目与技术练习</p>
    </div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="8" v-for="p in projectList" :key="p.title" class="project-col">
        <el-card :body-style="{ padding: '0px' }" class="project-card" shadow="hover">
          <div class="image-wrapper">
            <img :src="p.image" class="image" />
            <div class="image-overlay" v-if="p.link || p.repo">
              <el-button-group>
                <el-button v-if="p.link" type="primary" @click="openLink(p.link)">预览</el-button>
                <el-button v-if="p.repo" @click="openLink(p.repo)">源码</el-button>
              </el-button-group>
            </div>
          </div>
          <div class="content">
            <h3>{{ p.title }}</h3>
            <p class="desc">{{ p.description }}</p>
            <div class="tech-tags">
              <el-tag v-for="t in p.tech" :key="t" size="small" effect="plain" round>{{ t }}</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { projectList } from '@/data/projects';
const openLink = (url: string) => window.open(url, '_blank')
</script>

<style scoped lang="scss">
.projects-view {
  padding-bottom: 60px;
}

.project-col {
  margin-bottom: 24px;
}

.project-card {
  height: 100%;
  display: flex;
  flex-direction: column;

  .image-wrapper {
    position: relative;
    height: 200px;
    overflow: hidden;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-smooth);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition-smooth);
      backdrop-filter: blur(4px);
    }
  }

  &:hover {
    .image {
      transform: scale(1.05);
    }

    .image-overlay {
      opacity: 1;
    }
  }

  .content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;

    h3 {
      margin: 0 0 12px;
      font-size: 1.25rem;
    }

    .desc {
      font-size: 0.95rem;
      color: var(--el-text-color-secondary);
      line-height: 1.6;
      margin-bottom: 20px;
      flex: 1;
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
}
</style>
