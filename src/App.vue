<script setup lang="ts">
// 这里使用了自动按需导入，无需手动导入 ElConfigProvider
</script>

<template>
  <el-config-provider :button="{ autoInsertSpace: true }">
    <div class="app-container">
      <router-view />
    </div>
  </el-config-provider>
</template>

<style lang="scss">
.app-container {
  min-height: 100vh;
}
</style>
