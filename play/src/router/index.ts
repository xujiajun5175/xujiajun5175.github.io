/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 09:51:37
 * @LastEditTime: 2024-12-11 23:58:07
 * @LastEditors: 徐家俊 1515183820@163.com
 * @Description:
 * @FilePath: \xujiajun5175.github.io\play\src\router\index.ts
 */

import { createWebHistory, createRouter } from 'vue-router'
import { routes as _routes, handleHotUpdate } from 'vue-router/auto-routes'

import { setupLayouts } from 'virtual:vue-layouts'

import {createRouterGuard} from './guard'

// TODO 未解决中间空白路径上的默认布局

_routes.push({
  path:'/',
  redirect:'/auth/login'
})

console.log("🚀 ~ _routes:", _routes);

const routes = setupLayouts(_routes)
console.log(routes)
const router = createRouter({
    history: createWebHistory(),
    routes,
})


createRouterGuard(router)

if (import.meta.hot) {
    handleHotUpdate(router)
}

export default router
