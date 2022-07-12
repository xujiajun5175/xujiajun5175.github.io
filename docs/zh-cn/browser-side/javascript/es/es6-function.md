### Function 对象 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**



**ECMAScript 的函数实际上是功能完整的对象。**



Function 类可以表示开发者定义的任何函数。

用 Function 类直接创建函数的语法如下：

```js
var function_name = new function(arg1, arg2, ..., argN, function_body)
```

在上面的形式中，每个 *arg* 都是一个参数，最后一个参数是函数主体（要执行的代码）。这些参数必须是字符串。

记得下面这个函数吗？

```js
function sayHi(sName, sMessage) {
  alert("Hello " + sName + sMessage);
}
```

还可以这样定义它：

```js
var sayHi 
= 
new Function("sName", "sMessage", "alert(\"Hello \" + sName + sMessage);");
```

?> 虽然由于字符串的关系，这种形式写起来有些困难，但有助于理解函数只不过是一种引用类型，它们的行为与用 Function 类明确创建的函数行为是相同的。



#### Function 对象的 length 属性

---

ECMAScript 定义的属性 length 声明了函数期望的参数个数

记住，无论定义了几个参数，ECMAScript 可以接受任意多个参数（最多 25 个）



