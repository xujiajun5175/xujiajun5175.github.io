/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 09:51:37
 * @LastEditTime: 2024-12-11 12:31:25
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/play/src/router/index.ts
 */

import { createWebHistory, createRouter } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import Main from '../App.vue'
import Login from '../pages/_internal/login.vue'
import Module1 from '../pages/modules/module1/index.vue'
import Module2 from '../pages/modules/module2/index.vue'

/** layouts */
import DefaultLayout from '@/layouts/default.vue'

console.log(routes)
const router = createRouter({
    history: createWebHistory(),
    routes,
})

if (import.meta.hot) {
    handleHotUpdate(router)
}

export default router
