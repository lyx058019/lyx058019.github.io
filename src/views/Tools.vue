<script setup lang="ts">
import { tools } from '@/data/tools'
import { Search } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const filteredTools = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return tools
  return tools.filter(t =>
    t.name.toLowerCase().includes(query) ||
    t.description.toLowerCase().includes(query)
  )
})

const openTool = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="tools-view">
    <div class="page-header">
      <h1 class="page-title">在线工具箱</h1>
      <p class="page-subtitle">开发者常用的便捷小工具集合</p>
      <div class="tools-intro-area">
        <p class="intro-text">更多 AI 生产力工具即将上线...</p>
      </div>
    </div>

    <!-- Search Section -->
    <div class="site-controls">
      <el-input v-model="searchQuery" placeholder="搜索工具..." clearable class="search-input" size="large">
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
    </div>

    <el-row :gutter="24" class="tool-list">
      <el-col :xs="24" :sm="12" :md="8" v-for="tool in filteredTools" :key="tool.id" class="tool-col">
        <el-card class="tool-card pk-tool-card" shadow="hover" @click="openTool(tool.path)">
          <div class="tool-content">
            <div class="tool-icon"
              :style="{
                '--tool-color': tool.color || 'var(--pk-color-primary)',
              }">
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
    <el-empty v-if="filteredTools.length === 0" description="未找到相关工具" />
  </div>
</template>

<style scoped lang="scss">
.tools-view {
  max-width: 1000px;
  /* Swiss consistent width */
  margin: 0 auto;
}

.page-header {
  text-align: left;
  /* Swiss alignment */
  margin-bottom: 60px;

  .tools-intro-area {
    margin-top: 24px;
    padding: 16px 24px;
    background: var(--pk-color-bg-card);
    border: 1px dashed var(--pk-border-color);
    border-radius: var(--border-radius-sm);
    display: inline-block;

    .intro-text {
      margin: 0;
      font-size: 0.9rem;
      color: var(--pk-color-text-secondary);
      font-weight: 500;
    }
  }
}

.site-controls {
  margin-bottom: 40px;
  display: flex;
  justify-content: flex-start;
  /* Left align search */
}

.search-input {
  max-width: 400px;
  width: 100%;

  :deep(.el-input__wrapper) {
    background-color: var(--pk-color-bg-card);
    box-shadow: none;
    border: 1px solid var(--pk-border-color);
    border-radius: var(--border-radius-sm);
    transition: all 0.2s ease;

    &.is-focus {
      border-color: var(--pk-color-primary);
      box-shadow: 0 0 0 1px var(--pk-color-primary) inset;
    }
  }
}

.tool-col {
  margin-bottom: 32px;
}

.pk-tool-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: var(--pk-color-bg-card);
  border: 1px solid var(--pk-border-color);
  border-radius: var(--border-radius-lg);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--pk-color-primary);
    box-shadow: 0 10px 22px -12px var(--pk-shadow-soft);
  }

  .tool-content {
    display: flex;
    align-items: flex-start;
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
    background: color-mix(in srgb, var(--tool-color), transparent 88%);
    background-color: var(--pk-ambient-1);
    color: var(--tool-color);
  }

  .tool-info {
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.15rem;
      color: var(--pk-color-text-primary);
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    p {
      margin: 0;
      color: var(--pk-color-text-secondary);
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}
</style>
