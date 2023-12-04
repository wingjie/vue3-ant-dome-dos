import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

import readme from '@/router/module/readme'
/**
 * constantRoutes
 * 不需要权限的基础路由
 * 所有角色都可以访问
 * */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    meta: { title: '主页', icon: 'HomeOutlined' },
    component: Layout,
  },
  readme,
  // {
  //   path: '/404',
  //   component: Layout,
  //   meta: { hidden: true },
  //   children: [
  //     {
  //       path: '/404',
  //       name: '404',
  //       component: () => import('@/views/error-page/404.vue'),
  //     },
  //   ],
  // },
  // // 404铺底路由
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   redirect: '/404',
  //   meta: { hidden: true },
  // },
]
/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 * */

export const asyncRoutes: Array<RouteRecordRaw> = []

const router = createRouter({
  // history: createWebHistory(import.meta.env.VITE_BASE_BUILD_DIR as string),
  history: createWebHashHistory(),
  routes: constantRoutes,
})
export default router
