/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 09:51:37
 * @LastEditTime: 2024-12-17 09:19:56
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/src/router/index.ts
 */
import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router/auto'
import { routes as _routes, handleHotUpdate } from 'vue-router/auto-routes'
import { createRouterGuard } from './guard'
_routes.push({
  path: '/',
  redirect: '/_internal/login',
})
function setupLayouts(routes: RouteRecordRaw[]) {
  const modules = import.meta.glob('../layouts/**/*.vue', { eager: false })
  const layouts: Record<string, any> = {}
  Object.entries(modules).forEach(([key, value]) => {
    layouts[key.replace('../layouts/', '').replace('.vue', '')] = value
  })
  /** ### flatten routes */
  function flattenRoutes(routes: RouteRecordRaw[]) {
    const __: any[] = []
    routes.forEach(route => {
      const currentPath = (route.path && route.path.startsWith('/')) ? route.path : route.name
      if (route.children) {
        __.push(...flattenRoutes(route.children))
      } else {
        if (currentPath) {
          __.push({
            ...route,
            path: currentPath
          })
        }
      }
    })
    return __
  }
  routes = flattenRoutes(routes)
  /** ### add layout */
  routes = routes.map(route => {
    if (route.redirect) return route
    if (route.meta) {
      if (route.meta.layout) {
        return {
          ...route,
          name: '',
          component: layouts[route.meta.layout as string],
          children: [
            {
              ...route,
              path: '',
            }
          ]
        }
      }
    }
    return {
      ...route,
      name: '',
      component: layouts['default'],
      children: [
        {
          ...route,
          path: '',
        }
      ]
    }
  })
  return routes
}
const routes = setupLayouts(_routes)
// if (import.meta.env.MODE === 'development') {
console.log("🚀 ~ routes:", routes);
// }
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
createRouterGuard(router)
if (import.meta.hot) {
  handleHotUpdate(router)
}
export default router
