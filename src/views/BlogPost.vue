<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { shallowRef, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { applySeo } from '@/seo/head'

const route = useRoute()
const router = useRouter()
// 必须与实际文件路径匹配，使用 absolute path pattern 或 relative to root
const modules = import.meta.glob('@/data/posts/*.md')

const postComponent = shallowRef<any>(null)
const error = shallowRef(false)

// 动态加载 Markdown 组件
watchEffect(async () => {
  const id = route.params.id
  if (!id) return

  const path = `/src/data/posts/${id}.md`
  const importer = modules[path]

  if (!importer) {
    error.value = true
    return
  }

  try {
    const comp = await importer()
    postComponent.value = (comp as any).default

    const fm = (comp as any).frontmatter || (postComponent.value as any)?.frontmatter || {}
    const fmTitle = typeof fm.title === 'string' ? fm.title : undefined
    const fmDesc = typeof fm.description === 'string' ? fm.description : undefined

    applySeo({
      title: fmTitle ? `${fmTitle} | 博客 | LYX.DEV` : undefined,
      description: fmDesc,
      canonicalPath: `/blog/${id}`,
    })
  } catch (e) {
    console.error(e)
    error.value = true
  }
})

const goBack = () => {
  router.push('/blog')
}
</script>

<template>
  <div class="blog-post-view">
    <el-button @click="goBack" :icon="ArrowLeft" plain class="back-btn">返回列表</el-button>

    <div v-if="error" class="error-state">
      <el-empty description="文章未找到或加载失败" />
    </div>

    <article v-else-if="postComponent" class="markdown-body">
      <!-- 渲染 Markdown 组件 -->
      <!-- Markdown 组件通常自带 frontmatter，如果需要在外部显示标题可读取 postComponent.frontmatter -->
      <component :is="postComponent" />
    </article>

    <el-skeleton v-else :rows="10" animated />
  </div>
</template>

<style lang="scss">
// 修复 PrismJS 在深色模式下的背景，或者自定义 markdown 样式
.blog-post-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .back-btn {
    margin-bottom: 2rem;
  }
}

// 简单的 Markdown 样式增强，由于 unplugin-vue-markdown 生成的是原生 HTML
// 你可能需要引入 github-markdown-css 或类似的库，这里简单写一点
.markdown-body {
  line-height: 1.8;
  color: var(--el-text-color-primary);

  h1,
  h2,
  h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--el-text-color-regular);
  }

  h1 {
    font-size: 2.2em;
    border-bottom: 1px solid var(--el-border-color);
    padding-bottom: 0.3em;
  }

  h2 {
    font-size: 1.8em;
  }

  p {
    margin-bottom: 1.2rem;
  }

  ul,
  ol {
    padding-left: 2rem;
    margin-bottom: 1.2rem;
  }

  a {
    color: var(--el-color-primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  blockquote {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    border-left: 4px solid var(--el-color-primary);
    background-color: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
  }

  pre[class*="language-"] {
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
  }
}
</style>
