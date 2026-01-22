<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useDark } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeIndex = computed(() => {
  const path = route.path
  if (path === '/') return 'home'
  return path.split('/')[1] || 'home'
})

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
    <el-container class="layout-container">
      <el-header class="header">
        <div class="header-content">
          <div class="logo" @click="router.push('/')">
            <div class="logo-icon-wrapper">
              <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L4 28L12 36" stroke="CurrentColor" stroke-width="4" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M28 4L36 12L28 20" stroke="CurrentColor" stroke-width="4" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M19 6L21 34" stroke="CurrentColor" stroke-width="4" stroke-linecap="round" />
              </svg>
            </div>
            <div class="logo-text-wrapper">
              <span class="logo-title">LYX</span>
              <span class="logo-dot">.</span>
              <span class="logo-suffix">DEV</span>
            </div>
          </div>
          <el-menu :default-active="activeIndex" mode="horizontal" class="nav-menu" @select="handleSelect"
            :ellipsis="false">
            <el-menu-item index="home">首页</el-menu-item>
            <!-- <el-menu-item index="projects">项目</el-menu-item> -->
            <el-menu-item index="blog">博客</el-menu-item>
            <el-menu-item index="tools">工具箱</el-menu-item>
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

      <el-footer class="footer" height="auto">
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
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

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
    display: flex;
    align-items: center;
    gap: 12px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-1px);

      .logo-icon {
        filter: drop-shadow(0 0 8px var(--el-color-primary-light-5));
      }
    }

    .logo-icon-wrapper {
      width: 38px;
      height: 38px;
      padding: 4px;
      border-radius: 8px;
      background: var(--el-color-primary-light-9);
      display: flex;
      align-items: center;
      justify-content: center;

      .dark & {
        background: var(--el-color-primary-dark-2);
      }
    }

    .logo-icon {
      width: 100%;
      height: 100%;
      stroke: var(--el-color-primary);
    }

    .logo-text-wrapper {
      display: flex;
      align-items: baseline;
      line-height: 1;
      font-family: 'JetBrains Mono', monospace, sans-serif;
    }

    .logo-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--el-text-color-primary);
      letter-spacing: -1px;
    }

    .logo-dot {
      color: var(--el-color-primary);
      font-weight: bold;
      margin: 0 2px;
      font-size: 1.5rem;
    }

    .logo-suffix {
      font-size: 1rem;
      font-weight: 600;
      color: var(--el-text-color-secondary);
      letter-spacing: 1px;
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
  flex: 1;
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
