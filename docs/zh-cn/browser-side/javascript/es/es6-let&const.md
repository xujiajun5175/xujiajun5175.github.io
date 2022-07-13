### let和const命令 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**



#### let命令

---

##### 不存在变量提升

`let`不像`var`那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。



##### 暂时性死区

只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称TDZ）。

```javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

?> 在没有`let`之前，`typeof`运算符是百分之百安全的，永远不会报错。

##### 不允许重复声明

let不允许在相同作用域内，重复声明同一个变量。

```js
function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```





#### 块级作用域

---

`let`实际上为JavaScript新增了块级作用域。

ES6允许块级作用域的任意嵌套。

```javascript
{{{{{let insane = 'Hello World'}}}}};
```

内层作用域可以定义外层作用域的同名变量。

```javascript
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};
```

块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了。

```javascript
// IIFE写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

##### 块级作用域与函数声明

函数能不能在块级作用域之中声明，是一个相当令人混淆的问题。

ES5规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```javascript
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch(e) {
}
```

上面代码的两种函数声明，根据ES5的规定都是非法的。

但是，浏览器没有遵守这个规定，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。不过，“严格模式”下还是会报错。

```javascript
// ES5严格模式
'use strict';
if (true) {
  function f() {}
}
// 报错
```

ES6引入了块级作用域，明确允许在块级作用域之中声明函数。

```javascript
// ES6严格模式
'use strict';
if (true) {
  function f() {}
}
// 不报错
```

并且ES6规定，块级作用域之中，函数声明语句的行为类似于`let`，在块级作用域之外不可引用。

```javascript
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

上面代码在ES5中运行，会得到“I am inside!”，因为在`if`内声明的函数`f`会被提升到函数头部，实际运行的代码如下。

```javascript
// ES5版本
function f() { console.log('I am outside!'); }
(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());
```

ES6的运行结果就完全不一样了，会得到“I am outside!”。因为块级作用域内声明的函数类似于`let`，对作用域之外没有影响，实际运行的代码如下。

```javascript
// ES6版本
function f() { console.log('I am outside!'); }
(function () {
  f();
}());
```

很显然，这种行为差异会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6在[附录B](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-block-level-function-declarations-web-legacy-compatibility-semantics)里面规定，浏览器的实现可以不遵守上面的规定，有自己的[行为方式](http://stackoverflow.com/questions/31419897/what-are-the-precise-semantics-of-block-level-functions-in-es6)。

- 允许在块级作用域内声明函数。
- 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

注意，上面三条规则只对ES6的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作`let`处理。



前面那段代码，在Chrome环境下运行会报错。

```javascript
// ES6的浏览器环境
function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

上面的代码报错，是因为实际运行的是下面的代码。

```javascript
// ES6的浏览器环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

!> 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```js
// 函数声明语句
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

!> 还有一个需要注意的地方。ES6的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。

```js
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}
```





#### const命令

---

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。

`const`声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

`const`命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。`const`命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。

?> 如果真的想将对象冻结，应该使用`Object.freeze`方法。

```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

下面是一个将对象彻底冻结的函数。

```javascript
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

> ES5只有两种声明变量的方法：`var`命令和`function`命令。ES6除了添加`let`和`const`命令，后面章节还会提到，另外两种声明变量的方法：`import`命令和`class`命令。

?> 所以，ES6一共有6种声明变量的方法。





#### 全局对象的属性

---

全局对象是最顶层的对象

在浏览器环境指的是`window`对象，在Node.js指的是`global`对象。

ES5之中，全局对象的属性与全局变量是等价的。

全局对象的属性赋值与全局变量的赋值，是同一件事

?> 对于Node来说，这一条只对REPL环境适用，模块环境之中，全局变量必须显式声明成`global`对象的属性

未声明的全局变量，自动成为全局对象`window`的属性，这被认为是JavaScript语言最大的设计败笔之一

> 这样的设计带来了两个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道，其次程序员很容易不知不觉地就创建了全局变量（比如打字出错）。另一方面，从语义上讲，语言的顶层对象是一个有实体含义的对象，也是不合适的。

ES6为了改变这一点，一方面规定，为了保持兼容性:

- `var`命令和`function`命令声明的全局变量，依旧是全局对象的属性；
- 一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于全局对象的属性。也就是说，从ES6开始，全局变量将逐步与全局对象的属性脱钩。

```js
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```

























