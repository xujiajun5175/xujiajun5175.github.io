/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 15:16:29
 * @LastEditTime: 2024-12-11 15:17:38
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/play/build/utils.ts
 */
import { posix } from 'node:path'
export function normalizePath(path: string) {
    path = path.startsWith('/') ? path : `/${path}`
    return posix.normalize(path)
}
