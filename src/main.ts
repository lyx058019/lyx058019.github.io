import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 导入 Element Plus 样式
import "element-plus/dist/index.css";
// 导入 Element Plus 暗黑模式样式
import "element-plus/theme-chalk/dark/css-vars.css";
// 导入 PrismJS 代码高亮样式
import "prismjs/themes/prism-tomorrow.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
