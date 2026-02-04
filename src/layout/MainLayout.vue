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
    <div class="bg-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
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
  position: relative;
  z-index: 1;
}

.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  .circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    animation: float 20s infinite alternate ease-in-out;

    .dark & {
      opacity: 0.1;
    }
  }

  .circle-1 {
    width: 400px;
    height: 400px;
    background: var(--el-color-primary);
    top: -100px;
    left: -100px;
  }

  .circle-2 {
    width: 300px;
    height: 300px;
    background: var(--el-color-success);
    bottom: -50px;
    right: -50px;
    animation-delay: -5s;
  }

  .circle-3 {
    width: 250px;
    height: 250px;
    background: var(--el-color-warning);
    top: 40%;
    right: 15%;
    animation-delay: -10s;
    opacity: 0.05;
  }
}

.header {
  border-bottom: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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
    padding: 0 20px;
  }

  .logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: var(--transition-smooth);

    &:hover {
      transform: translateY(-2px);

      .logo-icon {
        filter: drop-shadow(0 0 12px var(--el-color-primary));
      }

      .logo-title {
        color: var(--el-color-primary);
      }
    }

    .logo-icon-wrapper {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon {
      width: 100%;
      height: 100%;
      stroke: var(--el-color-primary);
      transition: var(--transition-smooth);
    }

    .logo-text-wrapper {
      display: flex;
      align-items: baseline;
      line-height: 1;
    }

    .logo-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--el-text-color-primary);
      letter-spacing: -0.5px;
      transition: var(--transition-smooth);
    }

    .logo-dot {
      color: var(--el-color-primary);
      font-weight: bold;
      margin: 0 1px;
    }

    .logo-suffix {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--el-text-color-secondary);
      letter-spacing: 0.5px;
    }
  }

  .nav-menu {
    border-bottom: none;
    flex-grow: 1;
    margin: 0 2rem;
    background: transparent;

    :deep(.el-menu-item) {
      font-weight: 500;
      height: 60px;
      line-height: 60px;
      transition: var(--transition-smooth);

      &:hover,
      &.is-active {
        background: transparent !important;
        color: var(--el-color-primary) !important;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 40px 20px;
}

.footer {
  border-top: 1px solid var(--el-border-color-extra-light);
  padding: 60px 20px 40px;
  background-color: var(--el-bg-color-page);

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    color: var(--el-text-color-secondary);

    p {
      margin-bottom: 20px;
      font-size: 0.95rem;
    }
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
}
</style>
