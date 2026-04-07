<script setup lang="ts">
import { computed } from 'vue'
import { Link, Star } from '@element-plus/icons-vue'

interface Props {
  icon?: string
  title: string
  description: string
  affiliateUrl: string
  badge?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'Star',
  badge: '推荐'
})

const iconComponent = computed(() => {
  const iconMap: Record<string, any> = {
    Star,
    Link,
  }
  return iconMap[props.icon] || Star
})

const openAffiliateLink = () => {
  window.open(props.affiliateUrl, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="affiliation-card" data-track="affiliate" @click="openAffiliateLink">
    <div class="card-badge" v-if="badge">
      <el-icon><Star /></el-icon>
      <span>{{ badge }}</span>
    </div>

    <div class="card-content">
      <div class="card-icon">
        <el-icon :size="28">
          <component :is="iconComponent" />
        </el-icon>
      </div>

      <div class="card-info">
        <h4 class="card-title">{{ title }}</h4>
        <p class="card-description">{{ description }}</p>
      </div>
    </div>

    <div class="card-footer">
      <span class="affiliate-link">
        <el-icon><Link /></el-icon>
        <span>访问链接</span>
      </span>
      <span class="affiliate-disclosure">包含推广链接</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.affiliation-card {
  border: 1px solid var(--pk-border-color);
  border-radius: var(--border-radius-lg);
  padding: 20px;
  background: var(--pk-color-bg-card);
  cursor: pointer;
  transition: var(--transition-smooth);
  position: relative;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--pk-color-primary);
    box-shadow: 0 8px 20px -12px var(--pk-shadow-soft);
  }

  .card-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: var(--pk-color-primary);
    color: white;
    border-radius: 99px;
    font-size: 0.75rem;
    font-weight: 600;

    .el-icon {
      font-size: 12px;
    }
  }

  .card-content {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 16px;

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: var(--pk-ambient-1);
      color: var(--pk-color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.3s ease;

      .affiliation-card:hover & {
        background: var(--pk-ambient-2);
      }
    }

    .card-info {
      flex: 1;
      min-width: 0;

      .card-title {
        margin: 0 0 6px;
        font-size: 1rem;
        font-weight: 700;
        color: var(--pk-color-text-primary);
        line-height: 1.3;
      }

      .card-description {
        margin: 0;
        font-size: 0.85rem;
        color: var(--pk-color-text-secondary);
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid var(--pk-border-color);

    .affiliate-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--pk-color-primary);
      font-size: 0.85rem;
      font-weight: 600;

      .el-icon {
        font-size: 14px;
      }
    }

    .affiliate-disclosure {
      font-size: 0.75rem;
      color: var(--pk-color-text-secondary);
      opacity: 0.7;
    }
  }
}
</style>
