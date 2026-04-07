<script setup lang="ts">
import { Moon, Sunny, Expand, Close } from '@element-plus/icons-vue'
import { useDark } from '@vueuse/core'
import { computed, ref } from 'vue'
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

const mobileMenuOpen = ref(false)

const handleNavSelect = (key: string) => {
  mobileMenuOpen.value = false
  if (key === 'home') router.push('/')
  else router.push(`/${key}`)
}
</script>

<template>
  <div class="common-layout">
    <!-- Skip Navigation Link -->
    <a href="#main-content" class="skip-link">跳过导航</a>

    <el-container class="layout-container">
      <el-header class="header">
        <div class="header-inner">
          <div class="logo" @click="router.push('/')">
            <span class="logo-text">MicRabbit</span>
          </div>

          <el-menu :default-active="activeIndex" mode="horizontal" class="nav-menu" @select="handleNavSelect"
            :ellipsis="false">
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="blog">博客</el-menu-item>
            <el-menu-item index="tools">工具箱</el-menu-item>
          </el-menu>

          <!-- Mobile Hamburger -->
          <el-button :icon="mobileMenuOpen ? Close : Expand" circle plain @click="mobileMenuOpen = !mobileMenuOpen"
            class="mobile-menu-btn" />

          <div class="header-right">
            <el-button :icon="isDark ? Moon : Sunny" circle plain @click="toggleDark" class="theme-toggle" />
            <el-link href="https://github.com/lyx058019" target="_blank" :underline="false" class="github-link">
              GitHub
            </el-link>
          </div>
        </div>
      </el-header>

      <!-- Mobile Drawer -->
      <el-drawer v-model="mobileMenuOpen" direction="rtl" size="60%" :show-close="false" class="mobile-drawer">
        <template #header>
          <div class="drawer-header">
            <span class="drawer-title">导航</span>
            <el-button :icon="Close" circle text @click="mobileMenuOpen = false" />
          </div>
        </template>
        <el-menu :default-active="activeIndex" @select="handleNavSelect" class="mobile-nav-menu">
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="blog">博客</el-menu-item>
          <el-menu-item index="tools">工具箱</el-menu-item>
        </el-menu>
      </el-drawer>

      <el-main class="main-content" id="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>

      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-left">
            <div class="footer-brand">MicRabbit</div>
            <p class="footer-tagline">MicRabbit · 把AI变成产品</p>
          </div>
          <div class="footer-right">
            <div class="footer-links">
              <a href="https://github.com/lyx058019" target="_blank">GitHub</a>
              <el-divider direction="vertical" />
              <span>© {{ new Date().getFullYear() }}</span>
            </div>
            <div class="footer-icp">
              <a href="https://beian.miit.gov.cn/" target="_blank">辽ICP备2026003242号-1</a>
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

  .footer-icp {
    margin-top: 12px;
    font-size: 0.8rem;
    color: var(--pk-color-text-secondary);

    a {
      color: var(--pk-color-text-secondary);
      text-decoration: none;

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
  }

  .mobile-menu-btn {
    display: flex !important;
  }

  .site-footer .footer-inner {
    flex-direction: column;
    gap: 32px;
  }
}

.skip-link {
  position: absolute;
  top: -9999px;
  left: 16px;
  z-index: 99999;
  padding: 8px 16px;
  background: var(--pk-color-primary);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--border-radius-sm);

  &:focus {
    top: 16px;
  }
}

.mobile-menu-btn {
  display: none;
}

.mobile-drawer {
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .drawer-title {
    font-weight: 700;
    font-size: 1rem;
  }

  .mobile-nav-menu {
    border: none;

    .el-menu-item {
      height: 56px;
      line-height: 56px;
      font-size: 1.1rem;
      font-weight: 600;
    }
  }
}
</style>
