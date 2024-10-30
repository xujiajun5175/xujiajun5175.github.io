/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-28 09:17:05
 * @LastEditTime: 2024-10-29 23:17:29
 * @LastEditors: xujiajun xujiajun@vchangyi.com
 * @Description:
 * @FilePath: \my-astro\astro.config.mjs
 */
// @ts-check
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import vue from '@astrojs/vue'
import starlight from '@astrojs/starlight'
import mdx from '@astrojs/mdx';
// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(), vue(), starlight({
    title: '我的令人愉悦的文档网站'
  }), mdx()]
})