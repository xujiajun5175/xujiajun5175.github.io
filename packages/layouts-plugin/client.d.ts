/*
 * @Author: 徐家俊 1515183820@163.com
 * @Date: 2024-12-11 21:17:59
 * @LastEditTime: 2024-12-11 21:18:02
 * @LastEditors: 徐家俊 1515183820@163.com
 * @Description:
 * @FilePath: \xujiajun5175.github.io\packages\layouts-plugin\client.d.ts
 */
declare module 'virtual:vue-layouts' {
    import type { Router, RouteRecordNormalized, RouteRecordRaw } from 'vue-router'

    export const setupLayouts: (routes: RouteRecordRaw[]) => RouteRecordRaw[]

    export const createGetRoutes: (
        router: Router,
        /**
         * @default false
         */
        withLayout?: boolean
    ) => () => RouteRecordNormalized[]
}
