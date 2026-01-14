<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'

const router = useRouter()
const activeIndex = ref('home')

const isDark = useDark()
const toggleDark = () => {
  isDark.value = !isDark.value
}

const handleSelect = (key: string) => {
  if (key === 'home') router.push('/')
  else router.push(`/${key}`)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="header-content">
          <div class="logo" @click="router.push('/')">
            <span class="logo-text">LYX-DEV</span>
          </div>
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            class="nav-menu"
            @select="handleSelect"
            :ellipsis="false"
          >
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="projects">项目</el-menu-item>
            <el-menu-item index="about">关于</el-menu-item>
          </el-menu>
          <div class="header-right">
            <el-button :icon="isDark ? Moon : Sunny" circle @click="toggleDark" />
            <el-link href="https://github.com/lyx058019" target="_blank" :underline="false">
              GitHub
            </el-link>
          </div>
        </div>
      </el-header>

      <el-main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>

      <el-footer class="footer">
        <div class="footer-content">
          <p>© 2026 lyx058019. Built with Vue 3 & Element Plus</p>
          <div class="social-links">
            <el-link type="info" href="https://github.com/lyx058019" target="_blank">GitHub</el-link>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid var(--el-border-color-light);
  background-color: var(--el-bg-color);
  position: sticky;
  top: 0;
  z-index: 1000;

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .logo {
    cursor: pointer;
    .logo-text {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--el-color-primary);
    }
  }

  .nav-menu {
    border-bottom: none;
    flex-grow: 1;
    margin-left: 2rem;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.main-content {
  min-height: calc(100vh - 120px);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding-top: 2rem;
}

.footer {
  border-top: 1px solid var(--el-border-color-light);
  padding: 2rem 0;
  background-color: var(--el-bg-color-page);

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    color: var(--el-text-color-secondary);
  }
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
