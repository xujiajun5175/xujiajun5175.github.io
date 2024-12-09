/*
 * @Author: 徐家俊 1515183820@163.com
 * @Date: 2024-12-11 20:41:51
 * @LastEditTime: 2024-12-11 23:08:26
 * @LastEditors: 徐家俊 1515183820@163.com
 * @Description:
 * @FilePath: \xujiajun5175.github.io\play\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
// import VueLayouts from './build/layouts-plugin'
import VueLayouts from '@admin-template/vite-layouts-plugins'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        vue(),
        Unocss(),
        VueRouter({
            exclude: ['**/components/**/*'],
            dts: './src/typings/typed-router.d.ts',
            routesFolder: [
                {
                    src: 'src/pages/_internal',
                    path: 'auth/',
                },
                {
                    src: 'src/pages/modules/module1',
                    path: 'module1/',
                },
                {
                    src: 'src/pages/modules/module2',
                    path: 'module2/',
                },
            ],
        }),
        VueLayouts({
            skipTopLevelRouteLayout: true,
        }),
        AutoImport({
            dts: './src/typings/auto-imports.d.ts',
            imports: [VueRouterAutoImports],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            dts: './src/typings/components.d.ts',
            resolvers: [ElementPlusResolver()],
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                module1: path.resolve(__dirname, 'modules/module1/index.html'),
                module2: path.resolve(__dirname, 'modules/module2/index.html'),
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: { api: 'modern-compiler' },
        },
    },
})
