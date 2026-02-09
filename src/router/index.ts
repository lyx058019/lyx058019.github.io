/*
 * @Author: liuyanxin
 * @Date: 2026-01-14 10:17:19
 * @LastEditTime: 2026-02-09 11:11:35
 * @LastEditors: liuyanxin
 * @Description:
 * @FilePath: /lyx058019.github.io/src/router/index.ts
 */
import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layout/MainLayout.vue";
import { applySeoFromRouteMeta } from "../seo/head";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
          meta: {
            title: "MicRabbit | 把AI变成产品",
            description: "MicRabbit 的个人网站：博客、项目与在线工具箱。",
            canonicalPath: "/",
          },
        },
        {
          path: "projects",
          name: "projects",
          component: () => import("../views/Projects.vue"),
          meta: {
            title: "项目 | MicRabbit",
            description: "项目作品与技术栈概览。",
            canonicalPath: "/projects",
          },
        },
        {
          path: "blog",
          name: "blog",
          component: () => import("../views/Blog.vue"),
          meta: {
            title: "博客 | MicRabbit",
            description:
              "记录技术与思考，包含前端工程化、Vue、TypeScript 等主题。",
            canonicalPath: "/blog",
          },
        },
        {
          path: "tools",
          name: "tools",
          component: () => import("../views/Tools.vue"),
          meta: {
            title: "工具箱 | MicRabbit",
            description:
              "在线开发者工具箱：JSON、Base64、URL、Hash、二维码、时间戳、UUID 等。",
            canonicalPath: "/tools",
          },
        },
        {
          path: "tools/base64",
          name: "tool-base64",
          component: () => import("../views/tools/Base64Converter.vue"),
        },
        {
          path: "tools/json",
          name: "tool-json",
          component: () => import("../views/tools/JsonFormatter.vue"),
        },
        {
          path: "tools/image",
          name: "tool-image",
          component: () => import("../views/tools/ImageEditor.vue"),
        },
        {
          path: "tools/uuid",
          name: "tool-uuid",
          component: () => import("../views/tools/UuidGenerator.vue"),
        },
        {
          path: "tools/timestamp",
          name: "tool-timestamp",
          component: () => import("../views/tools/TimestampConverter.vue"),
        },
        {
          path: "tools/qrcode",
          name: "tool-qrcode",
          component: () => import("../views/tools/QrCodeGenerator.vue"),
        },
        {
          path: "tools/url",
          name: "tool-url",
          component: () => import("../views/tools/UrlEncoder.vue"),
        },
        {
          path: "tools/hash",
          name: "tool-hash",
          component: () => import("../views/tools/HashCalculator.vue"),
        },
        {
          path: "tools/color",
          name: "tool-color",
          component: () => import("../views/tools/ColorConverter.vue"),
        },
        {
          path: "blog/:id",
          name: "blog-post",
          component: () => import("../views/BlogPost.vue"),
          meta: {
            title: "博客文章 | MicRabbit",
            description: "博客文章详情。",
          },
        },
      ],
    },
  ],
});

router.afterEach((to) => {
  applySeoFromRouteMeta(to);
});

export default router;
