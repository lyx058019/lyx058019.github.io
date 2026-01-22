<script setup lang="ts">
import ToolPageLayout from '@/components/common/ToolPageLayout.vue'
import { Timer } from '@element-plus/icons-vue'
import { useDateFormat, useNow } from '@vueuse/core'
import { ref, watch } from 'vue'

const now = useNow()
const currentTimestamp = computed(() => Math.floor(now.value.getTime() / 1000))
const currentTimestampMs = computed(() => now.value.getTime())
const currentTimeStr = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss')

// Converter State
const inputTs = ref('')
const resultDate = ref('')
const inputDate = ref('')
const resultTs = ref('')
const isMs = ref(false)

// Init input with current
inputTs.value = currentTimestamp.value.toString()
inputDate.value = currentTimeStr.value

import { computed } from 'vue'

const convertTsToDate = () => {
  if (!inputTs.value) return
  const ts = parseInt(inputTs.value)
  if (isNaN(ts)) {
    resultDate.value = '无效的时间戳'
    return
  }

  // Auto detect ms (if year > 3000 assume ms, vague heuristic but common)
  // Or strictly rely on checkbox
  const date = new Date(isMs.value ? ts : ts * 1000)
  resultDate.value = date.toLocaleString() + ` (毫秒: ${date.getTime()})`
}

const convertDateToTs = () => {
  if (!inputDate.value) return
  const date = new Date(inputDate.value)
  if (isNaN(date.getTime())) {
    resultTs.value = '无效的日期格式'
    return
  }
  resultTs.value = Math.floor(date.getTime() / 1000).toString()
}

// Watch inputs to auto convert
watch([inputTs, isMs], convertTsToDate, { immediate: true })
watch(inputDate, convertDateToTs) // Don't immediate invoke to avoid overwriting initial state logic if needed

// Helper to pause/resume
// useNow handles this, but maybe a pause button? Not strictly necessary for MVP.
const isPaused = ref(false)
</script>

<template>
  <ToolPageLayout title="Unix 时间戳转换" maxWidth="800px">

    <!-- Current Time Card -->
    <el-card shadow="never" class="current-card">
      <template #header>
        <div class="card-header">
          <h3><el-icon>
              <Timer />
            </el-icon> 当前时间</h3>
          <span class="live-tag">LIVE</span>
        </div>
      </template>
      <div class="current-display">
        <div class="item">
          <div class="label">Unix 时间戳 (秒)</div>
          <div class="value link-color">{{ currentTimestamp }}</div>
        </div>
        <div class="item">
          <div class="label">Unix 时间戳 (毫秒)</div>
          <div class="value">{{ currentTimestampMs }}</div>
        </div>
        <div class="item">
          <div class="label">北京时间</div>
          <div class="value highlight">{{ currentTimeStr }}</div>
        </div>
      </div>
    </el-card>

    <!-- Converter Form -->
    <div class="converter-section">

      <!-- Timestamp -> Date -->
      <el-card shadow="never" class="tool-card">
        <div class="form-row">
          <div class="input-group">
            <div class="label">时间戳</div>
            <el-input v-model="inputTs" placeholder="输入时间戳">
              <template #append>
                <el-select v-model="isMs" style="width: 80px">
                  <el-option label="秒" :value="false" />
                  <el-option label="毫秒" :value="true" />
                </el-select>
              </template>
            </el-input>
          </div>
          <div class="arrow">➜</div>
          <div class="input-group">
            <div class="label">北京时间</div>
            <el-input v-model="resultDate" readonly />
          </div>
          <el-button type="primary" @click="convertTsToDate">转换</el-button>
        </div>
      </el-card>

      <!-- Date -> Timestamp -->
      <el-card shadow="never" class="tool-card">
        <div class="form-row">
          <div class="input-group">
            <div class="label">北京时间 / 日期字符串</div>
            <el-input v-model="inputDate" placeholder="YYYY-MM-DD HH:mm:ss" />
          </div>
          <div class="arrow">➜</div>
          <div class="input-group">
            <div class="label">Unix 时间戳 (秒)</div>
            <el-input v-model="resultTs" readonly />
          </div>
          <el-button type="primary" @click="convertDateToTs">转换</el-button>
        </div>
      </el-card>

    </div>

  </ToolPageLayout>
</template>

<style scoped lang="scss">
.current-card {
  margin-bottom: 2rem;

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;

    h3 {
      margin: 0;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .live-tag {
      background: var(--el-color-danger);
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: bold;
      animation: pulse 2s infinite;
    }
  }

  .current-display {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    text-align: center;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    .item {
      .label {
        color: var(--el-text-color-secondary);
        font-size: 0.9rem;
        margin-bottom: 5px;
      }

      .value {
        font-family: monospace;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .link-color {
        color: var(--el-color-primary);
      }

      .highlight {
        color: var(--el-color-success);
      }
    }
  }
}

.converter-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  flex-wrap: wrap;

  .input-group {
    flex: 1;
    min-width: 200px;

    .label {
      margin-bottom: 8px;
      font-weight: 500;
    }
  }

  .arrow {
    padding-bottom: 8px;
    font-size: 1.2rem;
    color: var(--el-text-color-secondary);
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
</style>
