/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 09:51:37
 * @LastEditTime: 2024-12-11 23:07:21
 * @LastEditors: 徐家俊 1515183820@163.com
 * @Description:
 * @FilePath: \xujiajun5175.github.io\play\src\router\index.ts
 */

import { createWebHistory, createRouter } from 'vue-router'
import { routes as _routes, handleHotUpdate } from 'vue-router/auto-routes'

import { setupLayouts } from 'virtual:vue-layouts'

const routes = setupLayouts(_routes)
console.log(routes, _routes)
const router = createRouter({
    history: createWebHistory(),
    routes,
})

if (import.meta.hot) {
    handleHotUpdate(router)
}

export default router
