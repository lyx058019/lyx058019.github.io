<script setup lang="ts">
import ToolPageLayout from '@/components/common/ToolPageLayout.vue'
import { CopyDocument, Delete, Switch } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const mode = ref<'encode' | 'decode'>('encode')
const encodeAll = ref(false) // Encode all characters or standard encodeURIComponent

const handleConvert = () => {
  if (!input.value) {
    output.value = ''
    return
  }

  try {
    if (mode.value === 'encode') {
      if (encodeAll.value) {
        // Aggressive encoding
        output.value = input.value.split('').map(c => {
          const code = c.charCodeAt(0)
          return '%' + code.toString(16).toUpperCase()
        }).join('')
      } else {
        // Standard
        output.value = encodeURIComponent(input.value)
      }
    } else {
      output.value = decodeURIComponent(input.value)
    }
  } catch (e) {
    output.value = '转换错误：无效的 URL 编码字符串'
  }
}

const copyResult = async () => {
  if (!output.value) return
  try {
    await navigator.clipboard.writeText(output.value)
    ElMessage.success('复制成功')
  } catch (e) {
    ElMessage.error('复制失败')
  }
}

const clearAll = () => {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <ToolPageLayout title="URL 编码/解码" maxWidth="800px">
    <el-card shadow="never">
      <div class="controls">
        <div class="mode-select">
          <el-radio-group v-model="mode" @change="handleConvert">
            <el-radio-button label="encode">编码 (Encode)</el-radio-button>
            <el-radio-button label="decode">解码 (Decode)</el-radio-button>
          </el-radio-group>

          <el-checkbox v-if="mode === 'encode'" v-model="encodeAll" label="强制全编码" @change="handleConvert"
            title="编码所有字符，包括字母和数字" style="margin-left: 15px" />
        </div>

        <div class="actions">
          <el-button @click="handleConvert" type="primary" :icon="Switch">转换</el-button>
          <el-button @click="clearAll" :icon="Delete">清空</el-button>
        </div>
      </div>

      <div class="io-area">
        <div class="input-section">
          <h3 class="label">输入 URL / 文本</h3>
          <el-input v-model="input" type="textarea" :rows="6" placeholder="在此输入..." resize="none"
            @input="handleConvert" />
        </div>

        <div class="output-section">
          <div class="section-header">
            <h3 class="label">结果</h3>
            <el-button size="small" :icon="CopyDocument" @click="copyResult" :disabled="!output">复制</el-button>
          </div>
          <el-input v-model="output" type="textarea" :rows="6" readonly resize="none" placeholder="结果将显示在这里..." />
        </div>
      </div>
    </el-card>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;

  .mode-select {
    display: flex;
    align-items: center;
  }
}

.io-area {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .label {
    margin: 0 0 10px 0;
    font-size: 1rem;
    color: var(--el-text-color-regular);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .label {
      margin: 0;
    }
  }
}
</style>
