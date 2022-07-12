### arguments 对象 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**



在函数代码中，使用特殊对象 arguments，开发者*无需明确指出参数名*，就能访问它们。





#### 检测参数个数

---

还可以用 arguments 对象检测函数的参数个数，引用属性 arguments.length 即可

- 与其他程序设计语言不同，ECMAScript 不会验证传递给函数的参数个数是否等于函数定义的参数个数。
- 开发者定义的函数都可以接受任意个数的参数（根据 Netscape 的文档，最多可接受 255 个），而不会引发任何错误
- 任何遗漏的参数都会以 undefined 传递给函数，多余的函数将忽略。

