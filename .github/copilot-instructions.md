# GitHub Copilot 指令 - lyx058019.github.io (Vue 3 + Element Plus)

## 项目背景
这是一个基于 **Vue 3** 和 **Element Plus** 构建的个人项目，通过 GitHub Pages (`lyx058019.github.io`) 进行托管。作为资深前端开发专家，AI 代理应协助构建响应式、高性能、且易于扩展的现代单页应用 (SPA)。

## 技术栈与架构原则
- **核心框架**：Vue 3 (Composition API / <script setup>)
- **UI 组件库**：Element Plus (采用按需引入模式)
- **工具库**：@vueuse/core (处理跨组件状态及持久化)
- **站点结构**：
  - 必须采用 Vite 作为构建工具，输出静态产物至 `/dist`。
  - `/src/layout`: 全局布局容器（如 [src/layout/MainLayout.vue](src/layout/MainLayout.vue)）。
  - `/src/components`: 业务通用组件。
  - `/src/views`: 页面级组件。
- **路径规范**：
  - 使用 `@` 别名指向 `/src` 目录。
  - 确保 Vite 的 `base` 路径配置正确，以适配 GitHub Pages 环境。

## 开发规范
- **Vue 开发规范**：
  - 优先使用 `Composition API` 和 `<script setup>` 语法。
  - 组件命名采用大驼峰 (PascalCase)，多单词命名。
  - 复杂业务逻辑需抽离为共用函数 (Composables)。
- **深色模式 (Dark Mode)**：
  - 统一使用 `@vueuse/core` 的 `useDark` 管理。
  - 样式编写必须考虑深色模式，优先使用 Element Plus 提供的 CSS 变量（如 `var(--el-bg-color)`, `var(--el-text-color-primary)`）。
- **UI 规范 (Element Plus)**：
  - 优先使用原生组件。表单、弹窗等交互必须使用 `ElMessage` 或 `ElMessageBox` 提供反馈。

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
