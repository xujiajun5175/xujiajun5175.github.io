### JavaScript 错误处理机制 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

- **try** 语句测试代码块的错误。
- **catch** 语句处理错误。
- **throw** 语句创建自定义错误。

---

#### Error 对象

```js
var err = new Error('出错了')
err.message // "出错了"
```

根据语言标准，`Error`对象的实例必须有`message`属性，表示出错时的提示信息，其他属性则没有提及。大多数 JavaScript 引擎，对`Error`实例还提供`name`和`stack`属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有。

- **message**：错误提示信息
- **name**：错误名称（非标准属性）
- **stack**：错误的堆栈（非标准属性）

利用`name`和`message`这两个属性，可以对发生什么错误有一个大概的了解。

```js
function throwit() {
  throw new Error('')
}

function catchit() {
  try {
    throwit()
  } catch (e) {
    console.log(e.stack) // print stack trace
  }
}

catchit()
// Error
//    at throwit (~/examples/throwcatch.js:9:11)
//    at catchit (~/examples/throwcatch.js:3:9)
//    at repl:1:5
```

---

##### JavaScript 的原生错误类型

Error 对象是最一般的错误类型，在它的基础上，JavaScript 还定义了其他 6 种错误，也就是说，存在 Error 的 6 个派生对象。

<!--- tabs:start -->

###### **SyntaxError**

`SyntaxError`是解析代码时发生的语法错误。

```js
// 变量名错误
var 1a;

// 缺少括号
console.log 'hello');
```

###### **ReferenceError**

`ReferenceError`是引用一个不存在的变量时发生的错误

```js
unknownVariable
// ReferenceError: unknownVariable is not defined
```

另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果或者 this 赋值。

```js
console.log() = 1
// ReferenceError: Invalid left-hand side in assignment

this = 1
// ReferenceError: Invalid left-hand side in assignment

```

上面代码对函数 console.log 的运行结果和 this 赋值，结果都引发了 ReferenceError 错误。

###### **RangeError**

`RangeError`是当一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是 Number 对象的方法参数超出范围，以及函数堆栈超过最大值。

```js
new Array(-1)(
  // RangeError: Invalid array length

  1234
).toExponential(21)
// RangeError: toExponential() argument must be between 0 and 20
```

###### **TypeError**

`TypeError`是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用`new`命令，就会抛出这种错误，因为`new`命令的参数应该是一个构造函数。

```js
new 123()
//TypeError: number is not a func

var obj = {}
obj.unknownMethod()
// TypeError: obj.unknownMethod is not a function
```

###### **URIError**

`URIError`是 URI 相关函数的参数不正确时抛出的错误，主要涉及`encodeURI()`、`decodeURI()`、`encodeURIComponent()`、`decodeURIComponent()`、`escape()`和`unescape()`这六个函数。

```js
decodeURI('%2')
// URIError: URI malformed
```

###### **EvalError**

`eval`函数没有被正确执行时，会抛出`EvalError`错误。该错误类型已经不再在 ES5 中出现了，只是为了保证与以前代码兼容，才继续保留。

<!--- tabs:end -->

以上这 6 种派生错误，连同原始的 Error 对象，都是构造函数。开发者可以使用它们，人为生成错误对象的实例。

```js
new Error('出错了！')
new RangeError('出错了，变量超出有效范围！')
new TypeError('出错了，变量类型无效！')
```

---

##### 自定义错误

除了 JavaScript 内建的 7 种错误对象，还可以定义自己的错误对象。

```js
function UserError(message) {
  this.message = message || '默认信息'
  this.name = 'UserError'
}

UserError.prototype = new Error()
UserError.prototype.constructor = UserError
```

上面代码自定义一个错误对象 UserError，让它继承 Error 对象。然后，就可以生成这种自定义的错误了

```js
new UserError('这是自定义的错误！')
```

---

#### throw 语句

`throw`可以接受各种值作为参数。JavaScript 引擎一旦遇到`throw`语句，就会停止执行后面的语句，并将`throw`语句的参数值，返回给用户。

```js
function UserError(message) {
  this.message = message || '默认信息'
  this.name = 'UserError'
}

UserError.prototype.toString = function () {
  return this.name + ': "' + this.message + '"'
}

throw new UserError('出错了！')
```

可以通过自定义一个`assert`函数，规范化`throw`抛出的信息。

```js
function assert(expression, message) {
  if (!expression) throw { name: 'Assertion Exception', message: message }
}
```

上面代码定义了一个`assert`函数，它接受一个表达式和一个字符串作为参数。一旦表达式不为真，就抛出指定的字符串。它的用法如下。

```js
assert(typeof myVar != 'undefined', 'myVar is undefined!')
```

`console`对象的`assert`方法，与上面函数的工作机制一模一样，所以可以直接使用。

```js
console.assert(typeof myVar != 'undefined', 'myVar is undefined!')
```

---

#### try...catch

`catch`代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

---

#### finally 代码块

```js
function f() {
  try {
    console.log(0)
    throw 'bug'
  } catch (e) {
    console.log(1)
    return true // 这句原本会延迟到finally代码块结束再执行
    console.log(2) // 不会运行
  } finally {
    console.log(3)
    return false // 这句会覆盖掉前面那句return
    console.log(4) // 不会运行
  }

  console.log(5) // 不会运行
}

var result = f()
// 0
// 1
// 3

result
// false
```

上面代码中，`catch`代码块结束执行之前，会先执行`finally`代码块。从`catch`转入`finally`的标志，不仅有`return`语句，还有`throw`语句。

```js
function f() {
  try {
    throw '出错了！'
  } catch (e) {
    console.log('捕捉到内部错误')
    throw e // 这句原本会等到finally结束再执行
  } finally {
    return false // 直接返回
  }
}

try {
  f()
} catch (e) {
  // 此处不会执行
  console.log('caught outer "bogus"')
}

//  捕捉到内部错误
```

进入`catch`代码块之后，一遇到`throw`语句，就会去执行`finally`代码块，其中有`return false`语句，因此就直接返回了，不再会回去执行`catch`代码块剩下的部分了
