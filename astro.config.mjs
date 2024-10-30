/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-28 09:17:05
 * @LastEditTime: 2024-10-30 14:23:13
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/astro.config.mjs
 */
// @ts-check
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import vue from '@astrojs/vue'
import starlight from '@astrojs/starlight'
import mdx from '@astrojs/mdx'
// https://astro.build/config
export default defineConfig({
  site: 'https://xujiajun5175.github.io/',
  integrations: [
    UnoCSS(),
    vue(),
    starlight({
      title: '我的令人愉悦的文档网站'
    }),
    mdx()
  ]
})
