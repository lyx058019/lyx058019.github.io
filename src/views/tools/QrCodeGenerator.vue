<script setup lang="ts">
import ToolPageLayout from '@/components/common/ToolPageLayout.vue'
import { Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import QRCode from 'qrcode'
import { ref, watch } from 'vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const inputText = ref('https://example.com')
const qrDataUrl = ref('')
const errorMsg = ref('')

// Settings
const size = ref(300)
const margin = ref(2)
const darkColor = ref(isDark.value ? '#ffffff' : '#000000')
const lightColor = ref(isDark.value ? '#0f172a' : '#ffffff')
const errorCorrectionLevel = ref<'L' | 'M' | 'Q' | 'H'>('M')

// Auto-adjust QR colors for dark mode
watch(isDark, (dark) => {
  darkColor.value = dark ? '#ffffff' : '#000000'
  lightColor.value = dark ? '#0f172a' : '#ffffff'
})

const generateQR = async () => {
  if (!inputText.value) {
    qrDataUrl.value = ''
    return
  }

  try {
    qrDataUrl.value = await QRCode.toDataURL(inputText.value, {
      width: size.value,
      margin: margin.value,
      color: {
        dark: darkColor.value,
        light: lightColor.value
      },
      errorCorrectionLevel: errorCorrectionLevel.value
    })
    errorMsg.value = ''
  } catch (err) {
    console.error(err)
    errorMsg.value = '生成失败：输入内容太长或无效'
    qrDataUrl.value = ''
  }
}

const downloadQR = () => {
  if (!qrDataUrl.value) return
  const link = document.createElement('a')
  link.href = qrDataUrl.value
  link.download = 'qrcode.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  ElMessage.success('已开始下载')
}

// Watch changes
watch([inputText, size, margin, darkColor, lightColor, errorCorrectionLevel], () => {
  // Debounce slightly if needed, but QR generation is fast enough usually
  generateQR()
}, { immediate: true })

</script>

<template>
  <ToolPageLayout title="二维码生成器" maxWidth="1000px">
    <div class="qr-layout">
      <!-- Settings Panel -->
      <el-card shadow="never" class="settings-card">
        <template #header>
          <div class="card-header">设置</div>
        </template>

        <el-form label-position="top">
          <el-form-item label="内容文本 / URL">
            <el-input v-model="inputText" type="textarea" :rows="4" placeholder="在此输入文字或网址..." />
          </el-form-item>

          <el-divider />

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="尺寸 (px)">
                <el-slider v-model="size" :min="100" :max="1000" :step="10" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="边距">
                <el-slider v-model="margin" :min="0" :max="10" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="前景色">
                <el-color-picker v-model="darkColor" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="背景色">
                <el-color-picker v-model="lightColor" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="纠错等级">
            <el-radio-group v-model="errorCorrectionLevel">
              <el-radio-button label="L">低 (L)</el-radio-button>
              <el-radio-button label="M">中 (M)</el-radio-button>
              <el-radio-button label="Q">四分 (Q)</el-radio-button>
              <el-radio-button label="H">高 (H)</el-radio-button>
            </el-radio-group>
            <div class="help-text">纠错等级越高，二维码越复杂，但抗遮挡能力越强。</div>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- Preview Panel -->
      <div class="preview-area">
        <el-card shadow="never" class="preview-card">
          <div v-if="qrDataUrl" class="qr-container">
            <img :src="qrDataUrl" alt="QR Code" class="qr-image" />
          </div>
          <el-empty v-else :description="errorMsg || '等待输入...'" />

          <div class="actions" v-if="qrDataUrl">
            <el-button type="primary" size="large" :icon="Download" @click="downloadQR">
              下载 PNG 图片
            </el-button>
          </div>
        </el-card>
      </div>
    </div>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
.qr-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 20px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}

.settings-card {
  height: 100%;
}

.help-text {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 5px;
}

.preview-card {
  text-align: center;
  position: sticky;
  top: 20px;

  .qr-container {
    padding: 20px;
    background: var(--el-fill-color-light); // Contrast bg
    border-radius: 8px;
    display: inline-block;

    .qr-image {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }

  .actions {
    margin-top: 20px;
  }
}
</style>
