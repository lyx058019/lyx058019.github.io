# GitHub Copilot 指令 - lyx058019.github.io (Vue 3 + Element Plus)

## 项目背景
这是一个基于 **Vue 3** 和 **Element Plus** 构建的个人项目，通过 GitHub Pages (`lyx058019.github.io`) 进行托管。作为资深前端开发专家，AI 代理应协助构建响应式、高性能、且易于扩展的现代单页应用 (SPA)。

## 技术栈与架构原则
- **核心框架**：Vue 3 (Composition API / <script setup>)
- **UI 组件库**：Element Plus (采用按需引入模式)
- **站点结构**：
  - 必须采用 Vite 作为构建工具，输出静态产物至 `/dist`。
  - `/src/components`: 业务通用组件。
  - `/src/views`: 页面级组件。
  - `/src/assets`: 静态资源（CSS, Images）。
- **路径规范**：
  - 使用 `@` 别名指向 `/src` 目录。
  - 确保 Vite 的 `base` 路径配置正确，以适配 GitHub Pages 环境。

## 开发规范
- **Vue 开发规范**：
  - 优先使用 `Composition API` 和 `<script setup>` 语法。
  - 遵循 Vue 官方风格指南，组件命名采用大驼峰 (PascalCase)。
  - 业务逻辑需抽离为共用函数 (Composables)。
- **UI 规范 (Element Plus)**：
  - 优先使用 Element Plus 的原生组件，避免重复造轮子。
  - 对于表单、弹窗等交互，统一使用 Element Plus 的反馈组件（如 `ElMessage`, `ElMessageBox`）。

## 关键工作流
- **构建与部署**：执行 `npm run build` 生成静态文件。推送到 `main` 分支应触发 CI/CD 将 `dist` 目录部署到 GitHub Pages。
- **代码提交**：遵循 Angular 提交规范（如 `feat:`, `fix:`, `docs:`, `style:`）。

## 技术规范
- **性能优化**：
  - 路由级代码分割 (Dynamic Import)。
  - Element Plus 组件按需加载（使用 unplugin-vue-components/unplugin-auto-import）。
- **可访问性 (a11y)**：利用 Element Plus 内置支持，确保交互组件符合 a11y 标准。

## 参考文件
- [README.md](README.md): 记录项目初始化状态及依赖安装指令。
