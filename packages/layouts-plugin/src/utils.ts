/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 16:06:38
 * @LastEditTime: 2024-12-11 23:09:41
 * @LastEditors: 徐家俊 1515183820@163.com
 * @Description:
 * @FilePath: \xujiajun5175.github.io\packages\layouts-plugin\src\utils.ts
 */

import { posix } from 'node:path'

export function normalizePath(path: string) {
    path = path.startsWith('/') ? path : `/${path}`
    return posix.normalize(path)
}
