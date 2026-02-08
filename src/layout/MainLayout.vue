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
        <div class="header-inner">
          <div class="logo" @click="router.push('/')">
            <span class="logo-text">LYX</span>
          </div>

          <el-menu :default-active="activeIndex" mode="horizontal" class="nav-menu" @select="handleSelect"
            :ellipsis="false">
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="blog">博客</el-menu-item>
            <el-menu-item index="tools">工具箱</el-menu-item>
          </el-menu>

          <div class="header-right">
            <el-button :icon="isDark ? Moon : Sunny" circle plain @click="toggleDark" class="theme-toggle" />
            <el-link href="https://github.com/lyx058019" target="_blank" :underline="false" class="github-link">
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

      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-left">
            <div class="footer-brand">LYX.DEV</div>
            <p class="footer-tagline">micrabbit · 把AI变成产品</p>
          </div>
          <div class="footer-right">
            <div class="footer-links">
              <a href="https://github.com/lyx058019" target="_blank">GitHub</a>
              <el-divider direction="vertical" />
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </footer>
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
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--pk-border-color);
  padding: 0;

  .header-inner {
    max-width: 1000px;
    /* Swiss Style - tighter clean width */
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
  }
}

.logo {
  cursor: pointer;

  .logo-text {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    letter-spacing: -0.05em;
    color: var(--pk-color-text-primary);
  }
}

.nav-menu {
  border: none;
  background: transparent;
  flex: 1;
  display: flex;
  justify-content: center;

  :deep(.el-menu-item) {
    background: transparent !important;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--pk-color-text-secondary);
    height: 70px;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;

    &:hover,
    &.is-active {
      color: var(--pk-color-text-primary) !important;
    }

    &.is-active {
      border-bottom-color: var(--pk-color-primary);
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;

  .github-link {
    font-weight: 600;
    font-size: 0.9rem;
  }
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 24px;
}

.site-footer {
  border-top: 1px solid var(--pk-border-color);
  background: var(--pk-color-bg);
  padding: 60px 0;

  .footer-inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .footer-brand {
    font-weight: 900;
    font-size: 1.1rem;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  .footer-tagline {
    color: var(--pk-color-text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  .footer-links {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--pk-color-text-secondary);

    a {
      color: var(--pk-color-text-primary);
      text-decoration: none;
      font-weight: 600;

      &:hover {
        color: var(--pk-color-primary);
      }
    }
  }
}

@media (max-width: 768px) {
  .header .header-inner {
    padding: 0 16px;
  }

  .nav-menu {
    display: none;
    /* In a real app we'd need a mobile menu drawer */
  }

  .site-footer .footer-inner {
    flex-direction: column;
    gap: 32px;
  }
}
</style>
