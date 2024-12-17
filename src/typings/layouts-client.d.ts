/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 15:48:12
 * @LastEditTime: 2024-12-11 15:48:14
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/play/src/typings/layouts-client.d.ts
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
