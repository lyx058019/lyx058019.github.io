<script setup lang="ts">
import { ArrowLeft, Check, Close, CopyDocument, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const input = ref('')
const output = ref('')
const hasError = ref(false)

const handleFormat = () => {
  if (!input.value) {
    output.value = ''
    hasError.value = false
    return
  }

  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, 2)
    hasError.value = false
    ElMessage.success('格式化成功')
  } catch (e) {
    hasError.value = true
    // 尝试显示简单的错误堆栈，但不覆盖原来的输出以便用户修改
    ElMessage.error('JSON 解析失败：格式不正确')
  }
}

const handleCompress = () => {
  if (!input.value) return
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed)
    hasError.value = false
    ElMessage.success('压缩成功')
  } catch (e) {
    hasError.value = true
    ElMessage.error('JSON 解析失败')
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
  hasError.value = false
}

const goBack = () => {
  router.push('/tools')
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-header">
      <el-button @click="goBack" :icon="ArrowLeft" link>返回工具箱</el-button>
      <h1>JSON 格式化</h1>
    </div>

    <el-card shadow="never">
      <div class="controls">
        <div class="status">
          <el-tag v-if="hasError" type="danger" effect="dark"><el-icon>
              <Close />
            </el-icon> 格式错误</el-tag>
          <el-tag v-else-if="output" type="success" effect="dark"><el-icon>
              <Check />
            </el-icon> 格式有效</el-tag>
        </div>
        <div class="actions">
          <el-button @click="handleFormat" type="primary">格式化</el-button>
          <el-button @click="handleCompress">压缩</el-button>
          <el-button @click="clearAll" :icon="Delete">清空</el-button>
        </div>
      </div>

      <div class="io-area">
        <div class="input-section">
          <h3 class="label">输入 JSON</h3>
          <el-input v-model="input" type="textarea" :rows="12" placeholder="在此粘贴 JSON 字符串..." resize="none"
            class="code-input" />
        </div>

        <div class="output-section">
          <div class="section-header">
            <h3 class="label">输出结果</h3>
            <el-button size="small" :icon="CopyDocument" @click="copyResult" :disabled="!output">复制</el-button>
          </div>
          <el-input v-model="output" type="textarea" :rows="12" readonly resize="none" class="code-input"
            placeholder="格式化后的结果..." />
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.tool-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;

  .tool-header {
    margin-bottom: 2rem;

    h1 {
      margin-top: 1rem;
      font-size: 2rem;
    }
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.io-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

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

// 模拟代码编辑器的字体
:deep(.code-input textarea) {
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
}
</style>
