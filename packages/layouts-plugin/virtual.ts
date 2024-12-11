/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 16:10:45
 * @LastEditTime: 2024-12-11 16:34:57
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/packages/layouts-plugin/virtual.ts
 */
import { normalizePath } from './utils'
export function createVirtualModuleID(name: string) {
    const virtualModuleId = `virtual:${name}`
    const resolvedVirtualModuleId = `\0${virtualModuleId}`
    return {
        virtualModuleId,
        resolvedVirtualModuleId,
    }
}

export async function createVirtualGlob(target: string, isSync: boolean) {}
