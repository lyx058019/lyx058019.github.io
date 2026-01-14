# 项目详细上下文 (PROJECT_CONTEXT.md)

## 1. 项目概览
- **项目名称**: lyx058019.github.io
- **核心定位**: 个人门户/简历网站，展示技术栈、项目经验及个人简介。
- **部署地址**: [https://lyx058019.github.io/](https://lyx058019.github.io/)

## 2. 技术栈
- **前端框架**: Vue 3 (Composition API / `<script setup>`)
- **构建工具**: Vite 7 (要求 Node.js 20.19+ 或 22.12+)
- **UI 组件库**: Element Plus (按需引入, 集成深色模式)
- **状态管理**: Pinia (用于跨组件状态共享)
- **路由管理**: Vue Router 4 (支持异步加载和过渡动画)
- **工具库**: @vueuse/core (核心功能：`useDark` 处理主题持久化)
- **样式语言**: SCSS (用于组件级样式开发)
- **编程语言**: TypeScript (严格模式开启，确保类型安全)

## 3. 架构设计
### 3.1 布局系统 (`/src/layout`)
- **MainLayout.vue**: 全局核心布局，包含：
  - 吸顶式导航栏 (适配暗黑模式，带菜单联动)
  - 动态路由内容区 (使用 `<router-view>` + `<transition>`)
  - 全局页脚 (版权信息与社交链接)
  - 主题切换逻辑：通过 `@vueuse/core` 持久化至 LocalStorage

### 3.2 路由结构 (`/src/router`)
- 顶级容器为 `MainLayout`。
- 子路由配置：
  - `path: ''`: 首页 (`Home.vue`) - Hero 区域 + 技能矩阵 + 精选项目
  - `path: 'projects'`: 项目页 (`Projects.vue`) - 展示作品集卡片
  - `path: 'about'`: 关于页 (`About.vue`) - 个人履历 + 时间线

### 3.3 目录规范
- `/src/assets`: 静态资源。
- `/src/components`: 全局通用/业务原子组件。
- `/src/layout`: 页面骨架布局。
- `/src/views`: 页面级组件。
- `/src/router`: 路由定义。

## 4. 关键功能实现
- **深色模式 (Dark Mode)**: 
  - 基于 `vueuse/useDark` 实现，状态同步至 `localStorage`。
  - 通过注入 `element-plus/theme-chalk/dark/css-vars.css` 实现组件库一键变色。
- **SEO 优化**: 
  - `index.html` 已配置基础 Meta 信息（Description, Title）。
- **自动化部署**: 
  - 通过 GitHub Actions (`.github/workflows/deploy.yml`) 实现。
  - 触发条件：推送代码至 `main` 分支。
  - 环境：Node 20 / Vite 7。

## 5. 项目约束与规范 (遵循 .github/copilot-instructions.md)
- 组件命名：PascalCase。
- 逻辑提取：业务逻辑优先放入 Composables。
- 资源引用：始终使用相对于 `src` 的 `@` 别名或相对路径。

## 6. 更新日志/变更记录
- **2026-01-14**: 项目初始化，集成 Vue 3 + Element Plus，配置自动化部署及深色模式，完善首页、项目页和关于页面。
