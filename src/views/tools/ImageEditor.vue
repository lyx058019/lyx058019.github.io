<script setup lang="ts">
import ToolPageLayout from '@/components/common/ToolPageLayout.vue'
import { Download, RefreshLeft, RefreshRight, UploadFilled } from '@element-plus/icons-vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ElMessage } from 'element-plus'
import { nextTick, onUnmounted, ref, watch } from 'vue'

// Refs
const imageInput = ref<HTMLInputElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
// Not using Vue ref for cropper instance to avoid proxy issues
let cropper: Cropper | null = null
const imageUrl = ref('')
const originalSize = ref(0)
const compressedSize = ref(0)
const fileName = ref('image')

// Settings
const outputFormat = ref('image/jpeg')
const quality = ref(80)
const showCropper = ref(true)

// State
const hasImage = ref(false)
const processing = ref(false)
const resultUrl = ref('')

const formats = [
  { label: 'JPEG', value: 'image/jpeg' },
  { label: 'PNG', value: 'image/png' },
  { label: 'WebP', value: 'image/webp' },
]

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Reset
  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
  if (resultUrl.value) URL.revokeObjectURL(resultUrl.value)

  hasImage.value = true
  originalSize.value = file.size
  fileName.value = file.name.split('.')[0]
  imageUrl.value = URL.createObjectURL(file)

  // Clear input value to allow re-selecting the same file if needed in the future
  target.value = ''

  nextTick(() => {
    initCropper()
    generateResult()
  })
}

const initCropper = () => {
  if (cropper) cropper.destroy()
  if (!imageRef.value) return

  cropper = new Cropper(imageRef.value, {
    viewMode: 1, // 限制剪裁框不超过画布
    dragMode: 'move', // 默认允许拖拽图片
    autoCropArea: 0.9, // 默认剪裁区域大小
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    background: false, // 关闭网格背景以突出图片
    ready() {
      // cropper ready
      generateResult() // Initial generation
    },
    cropend() {
      // Optional
    }
  })
}

const triggerSelect = () => {
  imageInput.value?.click()
}

const rotate = (deg: number) => {
  cropper?.rotate(deg)
  generateResult()
}

const reset = () => {
  cropper?.reset()
  generateResult()
}

const generateResult = () => {
  if (!cropper) return
  processing.value = true

  const canvas = cropper.getCroppedCanvas({
    // Optional: limit max resolution here if needed
  })

  if (!canvas) {
    processing.value = false
    return
  }

  canvas.toBlob((blob: Blob | null) => {
    if (!blob) return

    if (resultUrl.value) URL.revokeObjectURL(resultUrl.value)
    resultUrl.value = URL.createObjectURL(blob)
    compressedSize.value = blob.size
    processing.value = false
  }, outputFormat.value, quality.value / 100)
}

const downloadImage = () => {
  if (!resultUrl.value) return

  const link = document.createElement('a')
  link.href = resultUrl.value
  // Get extension from mime type
  const ext = outputFormat.value.split('/')[1]
  link.download = `${fileName.value}_edited.${ext}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  ElMessage.success('下载已开始')
}

// Watchers for settings change to regenerate
watch([quality, outputFormat], () => {
  if (hasImage.value) generateResult()
})

onUnmounted(() => {
  if (cropper) cropper.destroy()
  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
  if (resultUrl.value) URL.revokeObjectURL(resultUrl.value)
})
</script>

<template>
  <ToolPageLayout title="图片处理工具" maxWidth="1200px">
    <el-card shadow="never" class="main-card">
      <!-- Input 始终渲染，确保 ref 可用 -->
      <input type="file" ref="imageInput" accept="image/*" style="display: none" @change="handleFileChange">

      <div v-if="!hasImage" class="upload-area" @click="triggerSelect">
        <el-icon class="upload-icon">
          <UploadFilled />
        </el-icon>
        <div class="upload-text">点击或拖拽上传图片</div>
        <div class="upload-hint">支持 JPG, PNG, WebP 等常见格式</div>
      </div>

      <div v-else class="editor-layout">
        <div class="editor-main">
          <div class="canvas-container">
            <img ref="imageRef" :src="imageUrl" alt="Source Image">
          </div>
          <div class="toolbar">
            <el-button-group>
              <el-button :icon="RefreshLeft" @click="rotate(-90)">左旋转</el-button>
              <el-button :icon="RefreshRight" @click="rotate(90)">右旋转</el-button>
              <el-button @click="reset">重置</el-button>
            </el-button-group>
            <el-button type="primary" @click="generateResult">应用变更</el-button>
            <el-button type="danger" plain @click="hasImage = false">重新上传</el-button>
          </div>
        </div>

        <div class="editor-sidebar">
          <h3 class="panel-title">导出设置</h3>

          <div class="setting-item">
            <span class="label">输出格式</span>
            <el-select v-model="outputFormat" size="large">
              <el-option v-for="fmt in formats" :key="fmt.value" :label="fmt.label" :value="fmt.value" />
            </el-select>
          </div>

          <div class="setting-item">
            <span class="label">质量 {{ outputFormat === 'image/png' ? '(无损)' : `(${quality}%)` }}</span>
            <el-slider v-if="outputFormat !== 'image/png'" v-model="quality" :min="1" :max="100" />
            <el-alert v-else title="PNG 为无损压缩格式，不可调整质量" type="info" :closable="false" show-icon
              style="margin-top: 5px" />
          </div>

          <el-divider />

          <div class="preview-info">
            <div class="info-row">
              <span>原始大小:</span>
              <span class="val">{{ formatSize(originalSize) }}</span>
            </div>
            <div class="info-row highlight">
              <span>输出大小:</span>
              <span class="val">{{ formatSize(compressedSize) }}</span>
            </div>
            <div class="info-row">
              <span>压缩率:</span>
              <span class="val" :class="originalSize > compressedSize ? 'green' : 'red'">
                {{ Math.round((1 - compressedSize / originalSize) * 100) }}%
              </span>
            </div>
          </div>

          <div class="preview-image" v-if="resultUrl">
            <el-image :src="resultUrl" :preview-src-list="[resultUrl]" fit="contain" class="thumb"></el-image>
            <div class="preview-hint">点击预览大图</div>
          </div>

          <el-button type="primary" size="large" class="download-btn" :icon="Download" @click="downloadImage"
            :loading="processing">
            下载图片
          </el-button>
        </div>
      </div>
    </el-card>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
.upload-area {
  border: 2px dashed var(--el-border-color);
  border-radius: 8px;
  padding: 60px 0;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background-color: var(--el-fill-color-lighter);

  &:hover {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
  }

  .upload-icon {
    font-size: 60px;
    color: inherit;
    margin-bottom: 15px;
  }

  .upload-text {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .upload-hint {
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}

.editor-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.editor-main {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.canvas-container {
  height: 70vh; // 使用视口高度，提供更大的编辑区
  min-height: 500px;
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  position: relative; // 确保定位正确

  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
}

.toolbar {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.editor-sidebar {
  background: var(--el-fill-color-light);
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.panel-title {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.setting-item {
  .label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: var(--el-text-color-regular);
  }
}

.preview-info {
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .info-row {
    display: flex;
    justify-content: space-between;

    .val {
      font-family: monospace;
      font-weight: 600;
    }

    .green {
      color: var(--el-color-success);
    }

    .red {
      color: var(--el-color-danger);
    }

    &.highlight {
      font-size: 1rem;
      color: var(--el-color-primary);
    }
  }
}

.preview-image {
  margin-top: auto;
  text-align: center;
  border: 1px solid var(--el-border-color);
  background: var(--el-bg-color);
  padding: 5px;
  border-radius: 4px;

  .thumb {
    width: 100%;
    height: 150px;
    display: block;
  }

  .preview-hint {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin-top: 4px;
  }
}

.download-btn {
  width: 100%;
}
</style>
