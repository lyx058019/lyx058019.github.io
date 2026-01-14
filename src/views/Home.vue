<script setup lang="ts">
import { ref } from 'vue'
import { Eleme } from '@element-plus/icons-vue'

const welcomeMsg = ref('欢迎来到我的个人主页')
</script>

<template>
  <div class="home">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <el-icon><Eleme /></el-icon>
          <span>lyx058019.github.io</span>
        </div>
      </template>
      <h1>{{ welcomeMsg }}</h1>
      <p>这是一个基于 Vue 3 + Element Plus + Vite 构建的个人网站。</p>
      <div class="actions">
        <el-button type="primary">了解更多</el-button>
        <el-button>联系我</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  .welcome-card {
    width: 480px;
    text-align: center;
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: bold;
    }

    h1 {
      color: #409eff;
    }

    .actions {
      margin-top: 20px;
    }
  }
}
</style>
