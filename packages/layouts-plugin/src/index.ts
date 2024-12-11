/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 16:04:04
 * @LastEditTime: 2024-12-11 23:13:33
 * @LastEditors: 徐家俊 1515183820@163.com
 * @Description:
 * @FilePath: \xujiajun5175.github.io\packages\layouts-plugin\src\index.ts
 */
import { createVirtualModuleID, createVirtualModuleCode } from './virtual'

import type { Options } from './typescript'

export default function plugin(options: Partial<Options> = {}) {
    const { target = 'src/layouts', defaultLayout = 'default', importMode = process.env.VITE_SSG ? 'sync' : 'async', skipTopLevelRouteLayout = false } = options
    const { resolvedVirtualModuleId, virtualModuleId } = createVirtualModuleID('vue-layouts')
    return {
        name: '@admin-template/vite-layouts-plugin',
        resolveId(id: string) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        load(id: string) {
            if (id === resolvedVirtualModuleId) {
                return createVirtualModuleCode({
                    target,
                    importMode,
                    defaultLayout,
                    skipTopLevelRouteLayout,
                })
            }
        },
    }
}
