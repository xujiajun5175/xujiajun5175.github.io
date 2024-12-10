/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-10 17:43:47
 * @LastEditTime: 2024-12-10 17:43:48
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/packages/components/src/utils/typescript.ts
 */
import type { AppContext, EmitsOptions, Plugin, SetupContext } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null
}

export type EmitFn<E extends EmitsOptions> = SetupContext<E>['emit']
