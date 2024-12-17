/*
 * @Author: 徐家俊 1515183820@163.com
 * @Date: 2024-12-11 20:41:51
 * @LastEditTime: 2024-12-17 09:48:09
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
// import VueLayouts from 'vite-plugin-vue-layouts'

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
        'src/pages',
      ],
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
  server: {
    port: 5177,
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: { cssModules: true }

  },
  build: {
    cssMinify: "lightningcss"
  }
})
