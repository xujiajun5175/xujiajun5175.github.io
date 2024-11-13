/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-28 09:17:05
 * @LastEditTime: 2024-11-13 16:26:10
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/astro.config.mjs
 */
// @ts-check
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import vue from '@astrojs/vue'
import starlight from '@astrojs/starlight'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import mdx from '@astrojs/mdx'
import ElementPlus from 'unplugin-element-plus/vite'
import react from '@astrojs/react'
// https://astro.build/config
export default defineConfig({
  site: 'https://xujiajun5175.github.io',
  trailingSlash: 'always',
  vite: {
    plugins: [ElementPlus({})],
    ssr: {
      noExternal: ['element-plus']
    }
  },
  integrations: [
    UnoCSS(),
    vue(), // AutoImport({
    react(),
    starlight({
      title: '令人愉悦的文档',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN'
        }
      },
      logo: {
        light: '/src/assets/logo-light.svg',
        dark: '/src/assets/logo-dark.svg',
        replacesTitle: true
      },
      head: [
        {
          tag: 'script',
          attrs: {
            src: '/observer.js',
            'data-site': 'MY-FATHOM-ID',
            defer: true
          }
        }
      ],
      customCss: process.env.NO_GRADIENTS ? [] : ['./src/assets/landing.css']
    }),
    mdx()
  ]
})
