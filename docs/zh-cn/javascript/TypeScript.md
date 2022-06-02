# TypeScript

**文档更新日期: {docsify-updated}**

#### 简介

1. 以 js 为基础构建
2. js 的超集
3. 可以在任何支持 js 的平台执行
4. 扩展了 js 并添加了类型
5. ts 不能被 js 解析器直接执行,需要编译为 js 才能执行

#### 增加了什么

1. 类型
2. ES 新特性
3. ES 不具备的新特性
4. 丰富的配置选项
5. 强大的开发工具

#### 开发环境

1. ts 文件编译 `tsc xxx.ts`

#### 基本类型

1. 语法:

   ```js
   let 变量 : 类型
   let 变量:类型 = 值;

   function fn(参数: 类型, 参数: 类型): 类型{
       ...
   }

   ```

2. 自动类型判断

   1. TS 拥有自动的类型判断机制
   2. 当对变量的声明和赋值是同时进行的，TS 编译器会自动判断变量的类型
   3. 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明

3. 类型

   |  类型   |       例子        |              描述               |
   | :-----: | :---------------: | :-----------------------------: |
   | number  |    1, -33, 2.5    |            任意数字             |
   | string  | 'hi', "hi", `hi`  |           任意字符串            |
   | boolean |    true、false    |      布尔值 true 或 false       |
   | 字面量  |      其本身       |  限制变量的值就是该字面量的值   |
   |   any   |        \*         |            任意类型             |
   | unknown |        \*         |         类型安全的 any          |
   |  void   | 空值（undefined） |     没有值（或 undefined）      |
   |  never  |      没有值       |          不能是任何值           |
   | object  |  {name:'孙悟空'}  |         任意的 JS 对象          |
   |  array  |      [1,2,3]      |          任意 JS 数组           |
   |  tuple  |       [4,5]       | 元素，TS 新增类型，固定长度数组 |
   |  enum   |    enum{A, B}     |       枚举，TS 中新增类型       |

4. 类型断言

   1. 有些情况下，变量的类型对于我们来说是很明确，但是 TS 编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

      1. 第一种

         - ```typescript
           let someValue: unknown = 'this is a string'
           let strLength: number = (someValue as string).length
           ```

      2. 第二种

         - ```typescript
           let someValue: unknown = 'this is a string'
           let strLength: number = (<string>someValue).length
           ```
