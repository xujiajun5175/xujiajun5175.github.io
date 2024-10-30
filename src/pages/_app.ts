/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-29 14:47:25
 * @LastEditTime: 2024-10-29 14:48:29
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /my-astro/src/pages/_App.ts
 */
import type { App } from 'vue'
// Vuetify UI
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives
})
export default (app: App) => {
  app.use(vuetify)
}
