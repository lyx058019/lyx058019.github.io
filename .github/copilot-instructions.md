# GitHub Copilot 指令 - lyx058019.github.io (Vue 3 + Element Plus)

## 项目背景

这是一个基于 **Vue 3** 和 **Element Plus** 构建的个人项目，通过 GitHub Pages (`lyx058019.github.io`) 进行托管。作为资深前端开发专家，AI 代理应协助构建响应式、高性能、且易于扩展的现代单页应用 (SPA)。

## 技术栈与架构原则

- **核心框架**：Vue 3.5+ (Composition API / `<script setup>`)
- **状态管理**：Pinia (用于管理全局 UI 状态)
- **UI 组件库**：Element Plus (按需引入模式)
- **样式预处理**：SCSS (Scoped)
- **工具库**：@vueuse/core (处理跨组件状态及持久化)
- **站点结构**：
  - 必须采用 Vite 作为构建工具，输出静态产物至 `/dist`。
  - `/src/layout`: 全局布局容器（如 [src/layout/MainLayout.vue](src/layout/MainLayout.vue)）。
  - `/src/data`: **核心数据中心**。所有的静态内容（如项目列表、技能树、时间线）必须提取为 TypeScript 强类型的常量数据，**禁止在组件内硬编码大量文本**。
  - `/src/components`: 业务通用组件。
  - `/src/views`: 页面级组件。
- **路径规范**：
  - 使用 `@` 别名指向 `/src` 目录。
  - 确保 Vite 的 `base` 路径配置正确，以适配 GitHub Pages 环境。

## 开发规范

- **Vue & TypeScript 规范**：
  - 优先使用 `Composition API` 和 `<script setup>` 语法。
  - **严格类型**：所有数据文件 (`/src/data/*.ts`) 必须导出相应的 TypeScript Interface。组件 Props 必须定义类型。
  - 组件命名采用大驼峰 (PascalCase)，多单词命名。
  - 复杂业务逻辑需抽离为共用函数 (Composables)。
- **样式规范 (SCSS)**：
  - 组件样式统一使用 `<style scoped lang="scss">`。
  - 严禁使用硬编码颜色值，**必须**使用 Element Plus 的 CSS 变量（如 `var(--el-bg-color-overlay)`, `var(--el-border-color-light)`）以确保深色模式的自动适配。
- **深色模式 (Dark Mode)**：
  - 统一使用 `@vueuse/core` 的 `useDark` 管理。
- **UI 规范 (Element Plus)**：
  - 优先使用原生组件。表单、弹窗等交互必须使用 `ElMessage` 或 `ElMessageBox` 提供反馈。

## 数据与内容管理 (New)

- **数据抽离**：当用户请求修改页面内容（如“由于我新学了 React...”）时，不仅要修改显示文案，更应检查是否需要更新 `/src/data` 下的数据源。
- **博客系统**（规划中）：未来涉及博客文章时，应推荐使用 Markdown 文件管理内容，并利用 Vite 插件进行解析。

## 关键工作流

- **文档维护**：每次发生重大功能变更、架构调整或库升级时，**必须更新 [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md)**。
- **构建与部署**：执行 `npm run build` 生成静态文件。推送到 `main` 分支触发自动化部署。
- **提交规范**：遵循 Angular 提交规范（`feat:`, `fix:`, `docs:`, `style:`）。

## 技术规范

- **性能优化**：路由级代码分割、组件按需加载、静态资源压缩。
- **可访问性 (a11y)**：利用 Element Plus 内置支持，确保交互组件符合 a11y 标准。

## 代码链接规范 (重要)

在输出 Markdown 文档或回复时，提及代码文件或行号必须使用以下格式：

- 文件：[path/file.ts](path/file.ts)
- 行号：[file.ts](file.ts#L10)

## 参考文件

- [README.md](README.md): 项目基础描述。
- [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md): 详细技术背景与记录。
