/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-28 09:17:05
 * @LastEditTime: 2024-10-29 15:25:56
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /my-astro/astro.config.mjs
 */
// @ts-check
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import vue from '@astrojs/vue'
// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS()]
})
