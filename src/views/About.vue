<template>
  <div class="about-view">
    <el-row :gutter="40">
      <el-col :md="10" :xs="24">
        <div class="avatar-container">
          <el-avatar :size="200" src="https://via.placeholder.com/200" />
          <h2>lyx058019</h2>
          <p>开发者 · 工程化 · 用户体验</p>
        </div>
      </el-col>
      <el-col :md="14" :xs="24">
        <div class="bio">
          <h3>关于我</h3>
          <p>
            这里主要记录我正在做的事情：持续维护个人站点、沉淀可复用的工具、把工程化与可维护性
            当作长期投入。
          </p>
          <h3>我关注的方向</h3>
          <el-row :gutter="12" class="focus">
            <el-col :xs="24" :sm="12">
              <el-card shadow="never" class="focus-card">
                <h4>前端工程化</h4>
                <p>类型约束、脚本化产物、构建与发布流程，让项目可持续增长。</p>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-card shadow="never" class="focus-card">
                <h4>用户体验</h4>
                <p>信息密度、交互路径、可访问性与一致性细节，让页面更“顺手”。</p>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-card shadow="never" class="focus-card">
                <h4>工具沉淀</h4>
                <p>把高频需求做成可复用的小工具，减少重复劳动。</p>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-card shadow="never" class="focus-card">
                <h4>内容写作</h4>
                <p>用博客记录实践过程：为什么这么做、踩过什么坑、如何复盘。</p>
              </el-card>
            </el-col>
          </el-row>

          <h3>站点说明</h3>
          <p>
            本站包含博客、项目与工具箱。博客内容使用 Markdown 编写，并在构建时生成文章索引以及
            sitemap/rss，方便检索与订阅。
          </p>

          <h3>联系方式</h3>
          <p>Email：<span class="placeholder">（可在此处替换为你的邮箱）</span></p>
          <p>GitHub：<el-link href="https://github.com/lyx058019" target="_blank" :underline="false">@lyx058019</el-link></p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.about-view {
  padding: 2rem 0;
}
.avatar-container {
  text-align: center;
  margin-bottom: 2rem;
  h2 { margin-top: 1rem; }
  p { color: var(--el-text-color-secondary); }
}
.bio {
  h3 {
    margin: 1.5rem 0 1rem 0;
    color: var(--el-color-primary);
  }
  p {
    line-height: 1.8;
    color: var(--el-text-color-regular);
  }

  .placeholder {
    color: var(--el-text-color-secondary);
  }
}

.focus {
  margin-top: 0.5rem;
}

.focus-card {
  border-radius: 12px;
  background: var(--el-fill-color-lighter);

  h4 {
    margin: 0 0 0.5rem;
    font-size: 1.05rem;
    color: var(--el-text-color-primary);
  }

  p {
    margin: 0;
    color: var(--el-text-color-regular);
  }
}
</style>
