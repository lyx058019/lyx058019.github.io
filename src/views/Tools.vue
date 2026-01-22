<script setup lang="ts">
import { tools } from '@/data/tools'
import { useRouter } from 'vue-router'

const router = useRouter()

const openTool = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="tools-view">
    <div class="page-header">
      <h1 class="page-title">在线工具箱</h1>
      <p class="page-subtitle">开发者常用的便捷小工具集合</p>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" v-for="tool in tools" :key="tool.id">
        <el-card class="tool-card" shadow="hover" @click="openTool(tool.path)">
          <div class="tool-content">
            <div class="tool-icon" :style="{ backgroundColor: tool.color + '20', color: tool.color }">
              <component :is="tool.icon" />
            </div>
            <div class="tool-info">
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 占位提示 -->
    <el-empty v-if="tools.length === 0" description="暂无工具，敬请期待" />
  </div>
</template>

<style scoped lang="scss">
.tools-view {
  max-width: 1000px;
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

.tool-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-5px);
  }

  .tool-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .tool-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
  }

  .tool-info {
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.2rem;
      color: var(--el-text-color-primary);
    }

    p {
      margin: 0;
      color: var(--el-text-color-secondary);
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
}
</style>
