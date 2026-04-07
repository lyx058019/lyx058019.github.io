import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initAnalytics } from "./analytics/events";

// 导入 Element Plus 样式
import "element-plus/dist/index.css";
// 导入 Element Plus 暗黑模式样式
import "element-plus/theme-chalk/dark/css-vars.css";
// 导入自定义全局样式
import "./styles/main.scss";
// 导入 PrismJS 代码高亮样式
import "prismjs/themes/prism-tomorrow.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 初始化 GA4 事件追踪（事件委托模式）
initAnalytics();

app.mount("#app");
