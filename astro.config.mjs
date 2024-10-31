/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-28 09:17:05
 * @LastEditTime: 2024-10-31 16:58:06
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
    vue(),

    // AutoImport({
    //   imports: [
    //     'vue',
    //     {
    //       'naive-ui': [
    //         'useDialog',
    //         'useMessage',
    //         'useNotification',
    //         'useLoadingBar'
    //       ]
    //     }
    //   ]
    // }),
    // Components({
    //   resolvers: [NaiveUiResolver()]
    // }),
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
      customCss: process.env.NO_GRADIENTS ? [] : ['./src/assets/landing.css']
    }),
    mdx()
  ]
})
