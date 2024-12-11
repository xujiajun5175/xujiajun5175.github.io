/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 16:10:45
 * @LastEditTime: 2024-12-11 23:06:15
 * @LastEditors: 徐家俊 1515183820@163.com
 * @Description:
 * @FilePath: \xujiajun5175.github.io\packages\layouts-plugin\src\virtual.ts
 */
import { normalizePath } from './utils'

import type { Options } from './typescript'

export function createVirtualModuleID(name: string) {
    const virtualModuleId = `virtual:${name}`
    const resolvedVirtualModuleId = `\0${virtualModuleId}`
    return {
        virtualModuleId,
        resolvedVirtualModuleId,
    }
}

export async function createVirtualGlob(target: string, isSync: boolean) {
    return `import.meta.glob('${target}/**/*.vue',{eager:${isSync}})`
}

export async function createVirtualModuleCode(options: Partial<Options>) {
    const { target, defaultLayout, importMode, skipTopLevelRouteLayout } = options

    const normalizedTarget = normalizePath(target as string)

    const isSync = importMode === 'sync'

    const skipCode = /* ts */ `
    // unplugin-vue-router adds a top-level route to the routing group, which we should skip. (ref → https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134)
    const skipLayout = !route.component && route.children?.find(r => (r.path === '' || r.path === '/') && r.meta?.isLayout)
    if (skipLayout) {
      return route
    }
  `

    return /* ts */ `
    export function createGetRoutes(router, withLayout = false) {
      const routes = router.getRoutes()
      if (withLayout) {
        return routes
      }
      return () => routes.filter(route => !route.meta.isLayout)
    }

    export function setupLayouts(routes) {
      const layouts = {}

      const modules = ${await createVirtualGlob(normalizedTarget, isSync)}
      console.log("🚀 ~ setupLayouts ~ modules:", modules);

      Object.entries(modules).forEach(([name, module]) => {
        let key = name.replace("${normalizedTarget}/", '').replace('.vue', '')
        layouts[key] = ${isSync ? 'module.default' : 'module'}
      })

      function deepSetupLayout(routes, top = true) {
        return routes.map(route => {
          if (route.children?.length > 0) {
            route.children = deepSetupLayout(route.children, false)
          }

          if (top) {
            ${skipTopLevelRouteLayout ? skipCode : ''}
            if (route.meta?.layout !== false) {
              return { 
                path: route.path,
                component: layouts[route.meta?.layout || '${defaultLayout}'],
                // ref → https://github.com/JohnCampionJr/vite-plugin-vue-layouts/pull/97
                children: route.path === '/' ? [route] : [{...route, path: ''}],
                meta: {
                  isLayout: true
                }
              }
            }
          }

          if (route.meta?.layout) {
            return { 
              path: route.path,
              component: layouts[route.meta?.layout],
              children: [ {...route, path: ''} ],
              meta: {
                isLayout: true
              }
            }
          }

          return route
        })
      }

      return deepSetupLayout(routes)
    }
  `
}
