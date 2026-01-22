/*
 * @Author: liuyanxin
 * @Date: 2026-01-14 10:17:36
 * @LastEditTime: 2026-01-14 10:17:40
 * @LastEditors: liuyanxin
 * @Description:
 * @FilePath: /lyx058019.github.io/src/env.d.ts
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.md" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
