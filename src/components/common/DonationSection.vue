<script setup lang="ts">
import { ref } from 'vue'
import { Message, Wechat, Alipay, Mail } from '@element-plus/icons-vue'

const activeTab = ref<'wechat' | 'alipay'>('wechat')

const contactEmail = 'micrabbit@example.com'
</script>

<template>
  <div class="donation-section">
    <div class="donation-header">
      <h3 class="donation-title">请我喝杯咖啡</h3>
      <p class="donation-subtitle">如果这篇文章对你有帮助，欢迎支持一下~</p>
    </div>

    <el-card class="donation-card">
      <el-tabs v-model="activeTab" class="donation-tabs">
        <el-tab-pane label="微信支付" name="wechat">
          <div class="qrcode-container">
            <el-image
              src="/images/wechat-pay.jpg"
              alt="微信支付收款码"
              class="qrcode-image"
              :preview-src-list="['/images/wechat-pay.jpg']"
              fit="contain"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="支付宝" name="alipay">
          <div class="qrcode-container">
            <el-image
              src="/images/alipay-pay.jpeg"
              alt="支付宝收款码"
              class="qrcode-image"
              :preview-src-list="['/images/alipay-pay.jpeg']"
              fit="contain"
            />
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="fallback-contact">
        <el-divider>
          <el-icon><Message /></el-icon>
        </el-divider>
        <p class="fallback-text">没有二维码？也可以通过邮箱联系我</p>
        <a :href="`mailto:${contactEmail}`" class="contact-link">
          <el-icon><Mail /></el-icon>
          <span>{{ contactEmail }}</span>
        </a>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.donation-section {
  margin-top: 60px;
  padding: 32px;
  background: var(--pk-color-bg-card);
  border: 1px solid var(--pk-border-color);
  border-radius: var(--border-radius-lg);
  text-align: center;

  .donation-header {
    margin-bottom: 24px;

    .donation-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--pk-color-text-primary);
      margin: 0 0 8px;
      letter-spacing: -0.02em;
    }

    .donation-subtitle {
      color: var(--pk-color-text-secondary);
      margin: 0;
      font-size: 0.95rem;
    }
  }

  .donation-card {
    max-width: 360px;
    margin: 0 auto;
    border: 1px solid var(--pk-border-color);
    border-radius: var(--border-radius-lg);

    :deep(.el-card__body) {
      padding: 24px;
    }
  }

  .donation-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 20px;
    }

    :deep(.el-tabs__item) {
      font-weight: 600;
      font-size: 0.95rem;

      &.is-active {
        color: var(--pk-color-primary);
      }
    }

    :deep(.el-tabs__nav-wrap::after) {
      height: 1px;
    }

    :deep(.el-tabs__active-bar) {
      height: 2px;
      background: var(--pk-color-primary);
    }
  }

  .qrcode-container {
    display: flex;
    justify-content: center;
  }

  .qrcode-image {
    width: 200px;
    height: 200px;
    border-radius: var(--border-radius-lg);
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  .qrcode-placeholder {
    width: 200px;
    height: 200px;
    background: var(--pk-ambient-1);
    border: 1px dashed var(--pk-border-color);
    border-radius: var(--border-radius-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--pk-color-text-secondary);
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--pk-color-primary);
      background: var(--pk-ambient-2);
    }

    .qrcode-hint {
      font-size: 0.8rem;
      margin: 0;
      opacity: 0.7;
    }
  }

  .fallback-contact {
    margin-top: 24px;

    :deep(.el-divider) {
      margin: 0 0 16px;

      .el-divider__text {
        background: var(--pk-color-bg-card);
        color: var(--pk-color-text-secondary);
        font-size: 0.85rem;
      }
    }

    .fallback-text {
      color: var(--pk-color-text-secondary);
      font-size: 0.9rem;
      margin: 0 0 12px;
    }

    .contact-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--pk-color-primary);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
