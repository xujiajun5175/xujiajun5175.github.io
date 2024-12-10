/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-10 17:47:32
 * @LastEditTime: 2024-12-10 17:53:50
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/packages/components/button/index.ts
 */
import { withInstall } from '../utils'
import Button from './src/button.vue'
import type { SFCWithInstall } from '../utils/typescript'
export const BdButton: SFCWithInstall<typeof Button> = withInstall(Button, {})
export default BdButton
