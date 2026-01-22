<script setup lang="ts">
import ToolPageLayout from '@/components/common/ToolPageLayout.vue'
import { CopyDocument } from '@element-plus/icons-vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

// Basic color state (default #409EFF)
const hex = ref('#409EFF')
const rgb = ref('rgb(64, 158, 255)')
const hsl = ref('hsl(210, 100%, 63%)')
const colorPickerVal = ref('#409EFF')

const { copy } = useClipboard()

// Regex patterns
const hexPattern = /^#?([a-f\d]{3}|[a-f\d]{6})$/i

// Helper: Hex to RGB
const hexToRgb = (h: string) => {
  let r = 0, g = 0, b = 0
  // 3 digits
  if (h.length === 4) {
    r = parseInt("0x" + h[1] + h[1])
    g = parseInt("0x" + h[2] + h[2])
    b = parseInt("0x" + h[3] + h[3])
  } else if (h.length === 7) {
    r = parseInt("0x" + h[1] + h[2])
    g = parseInt("0x" + h[3] + h[4])
    b = parseInt("0x" + h[5] + h[6])
  }
  return [r, g, b]
}

// Helper: RGB to HSL
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

// Helper: RGB to Hex
const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

// Handler: Picker Change
const handlePickerChange = (val: string) => {
  if (!val) return
  updateFromHex(val)
}

// Handler: Hex Input
const handleHexInput = (val: string) => {
  if (hexPattern.test(val)) {
    // Normalize
    let clean = val
    if (!clean.startsWith('#')) clean = '#' + clean

    // Update picker
    // Only update if full 6 chars (picker expects full hex)
    if (clean.length === 7) {
      colorPickerVal.value = clean
      const [r, g, b] = hexToRgb(clean)
      const [h, s, l] = rgbToHsl(r, g, b)
      rgb.value = `rgb(${r}, ${g}, ${b})`
      hsl.value = `hsl(${h}, ${s}%, ${l}%)`
    } else if (clean.length === 4) {
      const [r, g, b] = hexToRgb(clean)
      colorPickerVal.value = rgbToHex(r, g, b) // Picker needs 6 digits
    }
  }
}

// Core updater
const updateFromHex = (val: string) => {
  hex.value = val
  const [r, g, b] = hexToRgb(val)
  const [h, s, l] = rgbToHsl(r, g, b)
  rgb.value = `rgb(${r}, ${g}, ${b})`
  hsl.value = `hsl(${h}, ${s}%, ${l}%)`
}

const copyValue = (text: string) => {
  copy(text)
  ElMessage.success('已复制: ' + text)
}

// Init
updateFromHex(colorPickerVal.value)

</script>

<template>
  <ToolPageLayout title="颜色格式转换" maxWidth="800px">
    <div class="color-tool-layout">

      <!-- Visual Picker -->
      <el-card shadow="never" class="preview-card">
        <template #header>
          <div class="card-header">
            <span>颜色预览</span>
          </div>
        </template>
        <div class="picker-area">
          <el-color-picker v-model="colorPickerVal" @change="handlePickerChange" size="large" />
          <div class="color-box" :style="{ backgroundColor: hex }"></div>
        </div>
      </el-card>

      <!-- Values -->
      <el-card shadow="never" class="values-card">
        <div class="format-row">
          <div class="label">HEX</div>
          <el-input v-model="hex" @input="handleHexInput" placeholder="#000000">
            <template #append>
              <el-button :icon="CopyDocument" @click="copyValue(hex)" />
            </template>
          </el-input>
        </div>

        <div class="format-row">
          <div class="label">RGB</div>
          <el-input v-model="rgb" readonly>
            <template #append>
              <el-button :icon="CopyDocument" @click="copyValue(rgb)" />
            </template>
          </el-input>
        </div>

        <div class="format-row">
          <div class="label">HSL</div>
          <el-input v-model="hsl" readonly>
            <template #append>
              <el-button :icon="CopyDocument" @click="copyValue(hsl)" />
            </template>
          </el-input>
        </div>
      </el-card>
    </div>
  </ToolPageLayout>
</template>

<style scoped lang="scss">
.color-tool-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  align-items: stretch;
  /* Ensure cards are same height */

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.preview-card {
  display: flex;
  flex-direction: column;

  :deep(.el-card__body) {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .picker-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
  }

  .color-box {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    border: 1px solid var(--el-border-color);
    box-shadow: var(--el-box-shadow-light);
  }

  /* Override Element Plus Color Picker Size */
  :deep(.el-color-picker__trigger) {
    width: 100%;
    max-width: 200px;
    height: 40px;
  }
}

.values-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.format-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--el-text-color-primary);
  }
}
</style>
