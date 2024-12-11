/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 16:06:38
 * @LastEditTime: 2024-12-11 16:10:31
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/packages/layouts-plugin/utils.ts
 */

import { normalize } from 'node:path'
export function normalizePath(path: string) {
    path = path.startsWith('/') ? path : `/${path}`
    return normalize(path)
}
