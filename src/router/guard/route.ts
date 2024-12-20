/*
 * @Author: 徐家俊 1515183820@163.com
 * @Date: 2024-12-11 23:22:04
 * @LastEditTime: 2024-12-17 09:46:20
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/src/router/guard/route.ts
 */
import { Router } from 'vue-router'

export function createRouteGuard(router: Router) {
  router.beforeEach(async (_, __, next) => {
      // console.log(`vue-router/guard => \nto:${JSON.stringify(to)},\nfrom:${JSON.stringify(from)}`)
        next()
    })
}
