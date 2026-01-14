<template>
  <div class="about-view">
    <el-row :gutter="40">
      <el-col :md="10" :xs="24">
        <div class="avatar-container">
          <el-avatar :size="200" src="https://via.placeholder.com/200" />
          <h2>lyx058019</h2>
          <p>全栈开发工程师</p>
        </div>
      </el-col>
      <el-col :md="14" :xs="24">
        <div class="bio">
          <h3>关于我</h3>
          <p>
            我是一名热爱技术的开发者，专注于构建高效、可扩展且用户友好的 Web
            应用。拥有多年的前端开发经验，精通 Vue 生态系统，并对工程化实践有深入理解。
          </p>
          <h3>教育背景</h3>
          <el-timeline>
            <el-timeline-item timestamp="2020 - 2024" placement="top">
              <h4>计算机科学与技术</h4>
              <p>某某大学 · 学士学位</p>
            </el-timeline-item>
          </el-timeline>
          <h3>联系方式</h3>
          <p>Email: example@mail.com</p>
          <p>Location: Shanghai, China</p>
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
}
</style>
