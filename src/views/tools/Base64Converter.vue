<script setup lang="ts">
import { ArrowLeft, CopyDocument, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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

const goBack = () => {
  router.push('/tools')
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-header">
      <el-button @click="goBack" :icon="ArrowLeft" link>返回工具箱</el-button>
      <h1>Base64 编解码器</h1>
    </div>

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
  </div>
</template>

<style scoped lang="scss">
.tool-container {
  max-width: 800px;
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
