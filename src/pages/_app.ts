/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-29 14:47:25
 * @LastEditTime: 2024-10-31 16:51:09
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/src/pages/_app.ts
 */
import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default (app: App) => {
  app.use(ElementPlus)
}
