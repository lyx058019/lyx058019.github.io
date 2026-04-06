<script setup lang="ts">
import { ref } from 'vue'
import { Message, Coffee, Newsletter, Check } from '@element-plus/icons-vue'

interface CTAButton {
  text: string
  type: 'primary' | 'default' | 'success'
  icon?: string
  action: () => void
}

interface Props {
  ctas?: CTAButton[]
  showSubscribe?: boolean
  consultingText?: string
  donationText?: string
}

const props = withDefaults(defineProps<Props>(), {
  ctas: () => [
    {
      text: '在线咨询',
      type: 'primary' as const,
      icon: 'Message',
      action: () => window.open('/consulting', '_self')
    },
    {
      text: '请我喝咖啡',
      type: 'default' as const,
      icon: 'Coffee',
      action: () => {
        const donationSection = document.querySelector('.donation-section')
        donationSection?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  ],
  showSubscribe: true,
  consultingText: '有疑问？想要更深入的解决方案',
  donationText: '觉得有用？支持一下'
})

const email = ref('')
const subscribeStatus = ref<'idle' | 'success' | 'error'>('idle')

const handleSubscribe = () => {
  if (!email.value || !email.value.includes('@')) {
    return
  }
  // Placeholder subscription logic
  subscribeStatus.value = 'success'
  setTimeout(() => {
    subscribeStatus.value = 'idle'
    email.value = ''
  }, 3000)
}
</script>

<template>
  <div class="article-cta">
    <div class="cta-header">
      <h3 class="cta-title">如果你觉得这篇文章有价值</h3>
      <p class="cta-subtitle">{{ consultingText }}</p>
    </div>

    <div class="cta-buttons">
      <el-button
        v-for="(cta, index) in ctas"
        :key="index"
        :type="cta.type"
        size="large"
        @click="cta.action"
      >
        <el-icon v-if="cta.icon === 'Message'"><Message /></el-icon>
        <el-icon v-else-if="cta.icon === 'Coffee'"><Coffee /></el-icon>
        {{ cta.text }}
      </el-button>
    </div>

    <div class="cta-divider">
      <el-divider>
        <span class="divider-text">或者</span>
      </el-divider>
    </div>

    <div class="subscribe-section" v-if="showSubscribe">
      <div class="subscribe-header">
        <el-icon><Newsletter /></el-icon>
        <span>订阅更新</span>
      </div>
      <p class="subscribe-desc">第一时间获取新文章和工作流优化技巧</p>

      <div class="subscribe-form" v-if="subscribeStatus !== 'success'">
        <el-input
          v-model="email"
          placeholder="your@email.com"
          size="large"
          class="subscribe-input"
          @keyup.enter="handleSubscribe"
        />
        <el-button
          type="primary"
          size="large"
          @click="handleSubscribe"
          :disabled="!email || !email.includes('@')"
        >
          订阅
        </el-button>
      </div>

      <div class="subscribe-success" v-else>
        <el-icon><Check /></el-icon>
        <span>订阅成功！</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-cta {
  margin-top: 60px;
  padding: 40px;
  background: var(--pk-color-bg-card);
  border: 1px solid var(--pk-border-color);
  border-radius: var(--border-radius-lg);
  text-align: center;

  .cta-header {
    margin-bottom: 24px;

    .cta-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--pk-color-text-primary);
      margin: 0 0 8px;
      letter-spacing: -0.02em;
    }

    .cta-subtitle {
      color: var(--pk-color-text-secondary);
      margin: 0;
      font-size: 0.95rem;
    }
  }

  .cta-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;

    .el-button {
      min-width: 140px;
      font-weight: 600;
    }
  }

  .cta-divider {
    margin: 32px 0;

    :deep(.el-divider) {
      margin: 0;

      .el-divider__text {
        background: var(--pk-color-bg-card);
        color: var(--pk-color-text-secondary);
        font-size: 0.85rem;
        padding: 0 16px;
      }
    }

    .divider-text {
      font-size: 0.85rem;
    }
  }

  .subscribe-section {
    max-width: 400px;
    margin: 0 auto;

    .subscribe-header {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 1rem;
      color: var(--pk-color-text-primary);
      margin-bottom: 8px;

      .el-icon {
        color: var(--pk-color-primary);
      }
    }

    .subscribe-desc {
      color: var(--pk-color-text-secondary);
      font-size: 0.9rem;
      margin: 0 0 16px;
    }

    .subscribe-form {
      display: flex;
      gap: 8px;

      .subscribe-input {
        flex: 1;

        :deep(.el-input__wrapper) {
          border-radius: var(--border-radius-sm);
        }
      }

      .el-button {
        flex-shrink: 0;
        font-weight: 600;
      }
    }

    .subscribe-success {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--el-color-success);
      font-weight: 600;

      .el-icon {
        font-size: 18px;
      }
    }
  }
}

@media (max-width: 600px) {
  .article-cta {
    padding: 24px 20px;

    .cta-buttons {
      flex-direction: column;

      .el-button {
        width: 100%;
      }
    }

    .subscribe-form {
      flex-direction: column;

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
