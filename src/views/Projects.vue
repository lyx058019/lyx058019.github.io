<script setup lang="ts">
import { projectList } from '@/data/projects';
</script>

<template>
  <div class="projects-view">
    <div class="page-header">
      <h2 class="page-title">我的项目</h2>
      <p class="page-subtitle">一些做过的尝试与练习（持续整理中）</p>
    </div>
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
              <el-link v-if="p.repo" :href="p.repo" target="_blank" :underline="false" class="button">查看源码</el-link>
              <el-link v-if="p.link" :href="p.link" target="_blank" :underline="false" class="button">在线预览</el-link>
              <el-tag v-if="!p.repo && !p.link" size="small" type="info">整理中</el-tag>
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
  text-align: center;
}

.page-header {
  text-align: center;
  margin-bottom: 2.5rem;

  .page-subtitle {
    margin: 0.5rem 0 0;
    color: var(--el-text-color-secondary);
  }
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
    align-items: center;
    gap: 10px;
  }
}
</style>
