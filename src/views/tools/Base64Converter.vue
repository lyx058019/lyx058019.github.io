<script setup lang="ts">
import ToolPageLayout from '@/components/common/ToolPageLayout.vue'
import { CopyDocument, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const mode = ref<'encode' | 'decode'>('encode')

const handleConvert = () => {
  if (!input.value) {
    output.value = ''
    return
  }

  try {
    if (mode.value === 'encode') {
      output.value = btoa(unescape(encodeURIComponent(input.value)))
    } else {
      output.value = decodeURIComponent(escape(atob(input.value)))
    }
  } catch (e) {
    ElMessage.error('转换失败：无效的输入内容')
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
  <ToolPageLayout title="Base64 编解码器" maxWidth="800px">
    <el-card shadow="never">
      <div class="controls">
        <el-radio-group v-model="mode" @change="handleConvert">
          <el-radio-button label="encode">编码 (Encode)</el-radio-button>
          <el-radio-button label="decode">解码 (Decode)</el-radio-button>
        </el-radio-group>
        <div class="actions">
          <el-button @click="handleConvert" type="primary">执行转换</el-button>
          <el-button @click="clearAll" :icon="Delete">清空</el-button>
        </div>
      </div>

      <div class="io-area">
        <div class="input-section">
          <h3 class="label">输入内容</h3>
          <el-input v-model="input" type="textarea" :rows="8" placeholder="请输入需要处理的文本..." resize="none"
            @input="handleConvert" />
        </div>

        <div class="output-section">
          <div class="section-header">
            <h3 class="label">转换结果</h3>
            <el-button size="small" :icon="CopyDocument" @click="copyResult" :disabled="!output">复制</el-button>
          </div>
          <el-input v-model="output" type="textarea" :rows="8" readonly resize="none" placeholder="结果将显示在这里..." />
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
