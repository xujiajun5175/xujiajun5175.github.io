### 闭包 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

**闭包，指的是词法表示包括不被计算的变量的函数，也就是说，函数可以使用函数之外定义的变量。**



在 ECMAScript 中使用全局变量是一个简单的闭包实例

```js
var sMessage = "hello world";

function sayHelloWorld() {
  alert(sMessage);
}

sayHelloWorld();
```

在一个函数中定义另一个会使闭包变得更加复杂

```js
var iBaseNum = 10;

function addNum(iNum1, iNum2) {
  function doAdd() {
    return iNum1 + iNum2 + iBaseNum;
  }
  return doAdd();
}
```





!> 就像使用任何高级函数一样，使用闭包要小心，因为它们可能会变得非常复杂







