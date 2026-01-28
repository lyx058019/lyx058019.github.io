<script setup lang="ts">
import ToolPageLayout from '@/components/common/ToolPageLayout.vue'
import { CopyDocument, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

// UUID State
const uuidCount = ref(1)
const uuidHyphens = ref(true)
const uuidUppercase = ref(false)
const uuidVersion = ref('v4')
const uuidResult = ref('')

// Password State
const pwLength = ref(16)
const pwCount = ref(1)
const pwIncludeUppercase = ref(true)
const pwIncludeLowercase = ref(true)
const pwIncludeNumbers = ref(true)
const pwIncludeSymbols = ref(true)
const pwResult = ref('')

// UUID Logic
const generateUuid = () => {
  const arr = []
  for (let i = 0; i < uuidCount.value; i++) {
    // crypto.randomUUID() is typed as a template-literal UUID; force string so we can transform it.
    let uuid: string = crypto.randomUUID()
    if (!uuidHyphens.value) {
      uuid = uuid.replace(/-/g, '')
    }
    if (uuidUppercase.value) {
      uuid = uuid.toUpperCase()
    }
    arr.push(uuid)
  }
  uuidResult.value = arr.join('\n')
}

// Password Logic
const generatePassword = () => {
  const chars = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  }

  let validChars = ''
  if (pwIncludeLowercase.value) validChars += chars.lower
  if (pwIncludeUppercase.value) validChars += chars.upper
  if (pwIncludeNumbers.value) validChars += chars.number
  if (pwIncludeSymbols.value) validChars += chars.symbol

  if (!validChars) {
    pwResult.value = '请至少选择一种字符类型'
    return
  }

  const arr = []
  for (let i = 0; i < pwCount.value; i++) {
    let pass = ''
    const cryptoObj = globalThis.crypto
    if (!cryptoObj?.getRandomValues) {
      pwResult.value = '当前环境不支持安全随机数 (crypto.getRandomValues)'
      return
    }
    const randomValues = new Uint32Array(pwLength.value)
    cryptoObj.getRandomValues(randomValues)

    for (let j = 0; j < pwLength.value; j++) {
      pass += validChars[randomValues[j] % validChars.length]
    }
    arr.push(pass)
  }
  pwResult.value = arr.join('\n')
}


const copyToClipboard = async (text: string) => {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('复制成功')
  } catch (e) {
    ElMessage.error('复制失败')
  }
}

// Init
generateUuid()
generatePassword()
</script>

<template>
  <ToolPageLayout title="UUID & 密码生成器" maxWidth="1000px">
    <el-tabs type="border-card" class="tool-tabs">
      <!-- UUID Tab -->
      <el-tab-pane label="UUID 生成">
        <div class="controls-area">
          <el-form :inline="true" class="controls-form">
            <el-form-item label="生成数量">
              <el-input-number v-model="uuidCount" :min="1" :max="100" />
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="uuidHyphens" label="包含连字符 (-)" border />
              <el-checkbox v-model="uuidUppercase" label="大写字母" border />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :icon="Refresh" @click="generateUuid">重新生成</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="result-area">
          <el-input v-model="uuidResult" type="textarea" :rows="10" readonly resize="none" class="code-input" />
          <el-button class="copy-btn" :icon="CopyDocument" @click="copyToClipboard(uuidResult)">复制结果</el-button>
        </div>
      </el-tab-pane>

      <!-- Password Tab -->
      <el-tab-pane label="随机密码生成">
        <div class="controls-area">
          <el-form :inline="true" class="controls-form">
            <el-form-item label="密码长度">
              <el-input-number v-model="pwLength" :min="4" :max="64" />
            </el-form-item>
            <el-form-item label="数量">
              <el-input-number v-model="pwCount" :min="1" :max="50" style="width: 100px" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :icon="Refresh" @click="generatePassword">生成</el-button>
            </el-form-item>
            <div class="checkbox-group">
              <el-checkbox v-model="pwIncludeUppercase" label="大写 (A-Z)" />
              <el-checkbox v-model="pwIncludeLowercase" label="小写 (a-z)" />
              <el-checkbox v-model="pwIncludeNumbers" label="数字 (0-9)" />
              <el-checkbox v-model="pwIncludeSymbols" label="符号 (@#$%)" />
            </div>
          </el-form>
        </div>

        <div class="result-area">
          <el-input v-model="pwResult" type="textarea" :rows="10" readonly resize="none" class="code-input" />
          <el-button class="copy-btn" :icon="CopyDocument" @click="copyToClipboard(pwResult)">复制结果</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
.tool-tabs {
  min-height: 500px;
}

.controls-area {
  margin-bottom: 20px;
  padding: 10px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
}

.controls-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  .el-form-item {
    margin-bottom: 10px;
    margin-right: 15px;
  }
}

.checkbox-group {
  width: 100%;
  margin-top: 5px;
  display: flex;
  gap: 15px;
}

.result-area {
  position: relative;

  .copy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
}

:deep(.code-input textarea) {
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}
</style>
