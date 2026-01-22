<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  backUrl: {
    type: String,
    default: '/tools'
  },
  maxWidth: {
    type: String,
    default: '1200px'
  }
})

const router = useRouter()
</script>

<template>
  <div class="tool-container" :style="{ maxWidth: props.maxWidth }">
    <div class="tool-header">
      <el-button @click="router.push(props.backUrl)" :icon="ArrowLeft" link>返回工具箱</el-button>
      <h1>{{ props.title }}</h1>
      <slot name="header-actions"></slot>
    </div>
    <div class="tool-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tool-container {
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;

  .tool-header {
    margin-bottom: 2rem;

    h1 {
      margin-top: 1rem;
      font-size: 2rem;
    }
  }
}
</style>
