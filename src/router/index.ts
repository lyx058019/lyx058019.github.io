/*
 * @Author: liuyanxin
 * @Date: 2026-01-14 10:17:19
 * @LastEditTime: 2026-01-14 10:17:31
 * @LastEditors: liuyanxin
 * @Description: 
 * @FilePath: /lyx058019.github.io/src/router/index.ts
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

export default router
