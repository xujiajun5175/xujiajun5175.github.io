/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-11-11 12:13:29
 * @LastEditTime: 2024-11-11 12:13:31
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:
 * @FilePath: /xujiajun.github.io/src/components/Button/index.tsx
 */

import React from 'react'

interface MyComponentProps {
  title: string
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>This is a simple component.</p>
    </div>
  )
}

export default MyComponent
