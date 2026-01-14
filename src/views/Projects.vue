<script setup lang="ts">
import { Promotion } from '@element-plus/icons-vue'

const projectList = [
  {
    title: '项目 A',
    description: '一个高性能的 Web 应用。',
    tech: ['Vue 3', 'TypeScript', 'Sass'],
    image: 'https://via.placeholder.com/400x200'
  },
  {
    title: '项目 B',
    description: '基于 Node.js 的后端服务。',
    tech: ['Node.js', 'Express', 'MongoDB'],
    image: 'https://via.placeholder.com/400x200'
  }
]
</script>

<template>
  <div class="projects-view">
    <h2 class="page-title">我的项目</h2>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="12" :md="8" v-for="p in projectList" :key="p.title">
        <el-card :body-style="{ padding: '0px' }" class="p-card" shadow="hover">
          <img :src="p.image" class="image" />
          <div style="padding: 14px">
            <h3>{{ p.title }}</h3>
            <p class="desc">{{ p.description }}</p>
            <div class="tech-tags">
              <el-tag v-for="t in p.tech" :key="t" size="small">{{ t }}</el-tag>
            </div>
            <div class="bottom">
              <el-button text class="button">查看源码</el-button>
              <el-button text class="button">在线预览</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.p-card {
  margin-bottom: 2rem;
  .image {
    width: 100%;
    display: block;
  }
  .desc {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    margin: 10px 0;
  }
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
