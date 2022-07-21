# JavaScript <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

### 1.简介

#### 1.1.**JavaScript 是脚本语言**

JavaScript 是一种轻量级的编程语言。

#### 1.2.javaScript 和 ECMAScript 的关系

ECMAScript 是[欧洲计算机制造商协会](https://baike.baidu.com/item/欧洲计算机制造商协会)通过 ECMA-262 标准化的脚本程序设计语言。

JavaScript 已经由 ECMA 通过 ECMAScript 实现语言的标准化。

###### ECMAScript 版本

JavaScript 已经由 ECMA（欧洲电脑制造商协会）通过 ECMAScript 实现语言的标准化。

| 年份 | 名称           | 描述                                                |
| :--- | :------------- | :-------------------------------------------------- |
| 1997 | ECMAScript 1   | 第一个版本                                          |
| 1998 | ECMAScript 2   | 版本变更                                            |
| 1999 | ECMAScript 3   | 添加正则表达式 添加 try/catch                       |
|      | ECMAScript 4   | 没有发布                                            |
| 2009 | ECMAScript 5   | 添加 "strict mode"，严格模式 添加 JSON 支持         |
| 2011 | ECMAScript 5.1 | 版本变更                                            |
| 2015 | ECMAScript 6   | 添加类和模块                                        |
| 2016 | ECMAScript 7   | 增加指数运算符 (\*\*) 增加 Array.prototype.includes |

### 2.输出

JavaScript 可以通过不同的方式来输出数据：

- 使用 **window.alert()** 弹出警告框。
- 使用 **document.write()** 方法将内容写到 HTML 文档中。
- 使用 **innerHTML** 写入到 HTML 元素。
- 使用 **console.log()** 写入到浏览器的控制台。

### 3.变量

- 变量必须以字母开头
- 变量也能以 $ 和 \_ 符号开头（不过我们不推荐这么做）
- 变量名称对大小写敏感（y 和 Y 是不同的变量）

?> JavaScript 语句和 JavaScript 变量都对大小写敏感。

#### 3.1.一条语句，多个变量

您可以在一条语句中声明很多变量。该语句以 var 开头，并使用逗号分隔变量即可：

```javascript
var lastname = 'Doe',
  age = 30,
  job = 'carpenter'
```

声明也可横跨多行：

```javascript
var lastname = 'Doe',
  age = 30,
  job = 'carpenter'
```

#### 3.2.Value = undefined

在计算机程序中，经常会声明无值的变量。未使用值来声明的变量，其值实际上是 undefined。

#### 3.3.重新声明 JavaScript 变量

如果重新声明 JavaScript 变量，该变量的值不会丢失：

在以下两条语句执行后，变量 carname 的值依然是 "Volvo"

### 4.数据类型

在 JavaScript 中有 5 种不同的数据类型：

- string
- number
- boolean
- object
- function

3 种对象类型：

- Object
- Date
- Array

2 个不包含任何值的数据类型：

- null
- undefined

#### 4.1.JavaScript 数字

JavaScript 只有一种数字类型。数字可以带小数点，也可以不带：

```javascript
var x1 = 34.0 // 使用小数点来写
var x2 = 34 // 不使用小数点来写
```

极大或极小的数字可以通过科学（指数）计数法来书写：

```js
var y = 123e5 // 12300000
var z = 123e-5 // 0.00123
```

#### 4.2.JavaScript 数组

下面的代码创建名为 cars 的数组：

```js
var cars = new Array()
cars[0] = 'Saab'
cars[1] = 'Volvo'
cars[2] = 'BMW'
```

或者 (condensed array):

```js
var cars = new Array('Saab', 'Volvo', 'BMW')
```

或者 (literal array):

```js
var cars = ['Saab', 'Volvo', 'BMW']
```

#### 4.3.JavaScript 对象

对象由花括号分隔。在括号内部，对象的属性以名称和值对的形式 (name : value) 来定义

对象属性有两种寻址方式：

```js
let person = { firstName: 'john', lastName: 'Doe' }
name = person.lastName
name = person['lastName']
```

#### 4.4.声明变量类型

当您声明新变量时，可以使用关键词 "new" 来声明其类型：

```js
var carname = new String()
var x = new Number()
var y = new Boolean()
var cars = new Array()
var person = new Object()
```

!> JavaScript 变量均为对象。当您声明一个变量时，就创建了一个新的对象。

**提示：**JavaScript 具有隐含的全局概念，意味着你不声明的任何变量都会成为一个全局对象属性。

### 5.函数

### 6.作用域

**在 JavaScript 中, 作用域为可访问变量，对象，函数的集合。**

#### 6.1.HTML 中的全局变量

在 HTML 中, 全局变量是 window 对象: 所有数据变量都属于 window 对象。

### 7.事件

事件是可以被 JavaScript 侦测到的行为。

### 8.字符串

?> 可以使用索引位置来访问字符串中的每个字符,字符串的索引从 0 开始

#### 8.1.字符串长度

可以使用内置属性 **length** 来计算字符串的长度：

#### 8.2.转义字符

| 代码 | 输出        |
| :--- | :---------- |
| \'   | 单引号      |
| \"   | 双引号      |
| \\   | 反斜杠      |
| \n   | 换行        |
| \r   | 回车        |
| \t   | tab(制表符) |
| \b   | 退格符      |
| \f   | 换页符      |

#### 8.3.字符串对象

通常， JavaScript 字符串是原始值，可以使用字符创建： **var firstName = "John"**

但我们也可以使用 new 关键字将字符串定义为一个对象： **var firstName = new String("John")**

!> 不要创建 String 对象。它会拖慢执行速度，并可能产生其他副作用：

#### 8.4.字符串属性

| 属性        | 描述                       |
| :---------- | :------------------------- |
| constructor | 返回创建字符串属性的函数   |
| length      | 返回字符串的长度           |
| prototype   | 允许您向对象添加属性和方法 |

#### 8.5.字符串方法

| Method              | 描述                                                                                     |
| :------------------ | :--------------------------------------------------------------------------------------- |
| charAt()            | 返回指定索引位置的字符                                                                   |
| charCodeAt()        | 返回指定索引位置字符的 Unicode 值                                                        |
| concat()            | 连接两个或多个字符串，返回连接后的字符串                                                 |
| fromCharCode()      | 将指定的 Unicode 值转换为字符串                                                          |
| indexOf()           | 返回字符串中检索指定字符第一次出现的位置                                                 |
| lastIndexOf()       | 返回字符串中检索指定字符最后一次出现的位置                                               |
| localeCompare()     | 用本地特定的顺序来比较两个字符串                                                         |
| match()             | 找到一个或多个正则表达式的匹配                                                           |
| replace()           | 替换与正则表达式匹配的子串                                                               |
| search()            | 检索与正则表达式相匹配的值                                                               |
| slice()             | 提取字符串的片断，并在新的字符串中返回被提取的部分                                       |
| split()             | 把字符串分割为子字符串数组                                                               |
| substr()            | 从起始索引号提取字符串中指定数目的字符                                                   |
| substring()         | 提取字符串中两个指定的索引号之间的字符                                                   |
| toLocaleLowerCase() | 根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射 |
| toLocaleUpperCase() | 根据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射 |
| toLowerCase()       | 把字符串转换为小写                                                                       |
| toString()          | 返回字符串对象值                                                                         |
| toUpperCase()       | 把字符串转换为大写                                                                       |
| trim()              | 移除字符串首尾空白                                                                       |
| valueOf()           | 返回某个字符串对象的原始值                                                               |

### 9.运算符

### 10.比较和逻辑运算符

#### 10.1 逻辑运算符

?> JavaScript 逻辑运算符的优先级是：`！`、`&&` 、`||`。

#### 10.2.条件运算符

JavaScript 还包含了基于某些条件对变量进行赋值的条件运算符。

###### 语法

```js
variablename = condition ? value1 : value2
```

### 11.位运算

?> 与 Java 等语言不同，JavaScript 的数值型默认是浮点型，在进行位运算的时候需要先转换为整型才能运算，所以 JavaScript 的位运算效率比较低。

#### 11.1.运算符

| 运算符 | 名称         | 描述                                                     |
| :----- | :----------- | :------------------------------------------------------- |
| &      | AND          | 如果两位都是 1 则设置每位为 1                            |
| \|     | OR           | 如果两位之一为 1 则设置每位为 1                          |
| ^      | XOR          | 如果两位只有一位为 1 则设置每位为 1                      |
| ~      | NOT          | 反转所有位                                               |
| <<     | 零填充左位移 | 通过从右推入零向左位移，并使最左边的位脱落。             |
| >>     | 有符号右位移 | 通过从左推入最左位的拷贝来向右位移，并使最右边的位脱落。 |
| >>>    | 零填充右位移 | 通过从左推入零来向右位移，并使最右边的位脱落。           |

#### 11.2.使用 32 位按位运算数

JavaScript 将数字存储为 64 位浮点数，但所有按位运算都以 32 位二进制数执行。

在执行位运算之前，JavaScript 将数字转换为 32 位有符号整数。

执行按位操作后，结果将转换回 64 位 JavaScript 数。

上面的例子使用 4 位无符号二进制数。所以 ~ 5 返回 10。

由于 JavaScript 使用 32 位有符号整数，JavaScript 将返回 -6。

00000000000000000000000000000101 (5)

11111111111111111111111111111010 (~5 = -6)

有符号整数使用最左边的位作为减号。

#### 11.3.把十进制转换为二进制

###### 实例

```js
function dec2bin(dec) {
  return (dec >>> 0).toString(2)
}
```

#### 11.4.把二进制转换为十进制

###### 实例

```js
function bin2dec(bin){
    return parseInt(bin, 2).toString(10);
```

### 12.条件语句

- **if 语句** - 只有当指定条件为 true 时，使用该语句来执行代码
- **if...else 语句** - 当条件为 true 时执行代码，当条件为 false 时执行其他代码
- **JavaScript 三目运算 -** 当条件为 true 时执行代码，当条件为 false 时执行其他代码
- **if...else if....else 语句**- 使用该语句来选择多个代码块之一来执行
- **switch 语句** - 使用该语句来选择多个代码块之一来执行

#### 12.1.switch 语句

##### 12.1.1.细节

?> 如果多种 case 匹配一个 case 值，则选择第一个 case。

?> 如果未找到匹配的 case，程序将继续使用默认 label。

?> 如果未找到默认 label，程序将继续 switch 后的语句。

##### 12.1.2.严格的比较

?> Switch case 使用严格比较（===）。值必须与要匹配的类型相同。

### 13.循环

- **for** - 循环代码块一定的次数
- **for/in** - 循环遍历对象的属性
- **while** - 当指定的条件为 true 时循环指定的代码块
- **do/while** - 同样当指定的条件为 true 时循环指定的代码块

#### 13.1.For/In 循环

`for...in`循环用来遍历一个对象的全部属性。

- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性
- 它不仅遍历对象自身的属性，还遍历继承的属性。

```js
// name 是 Person 本身的属性
function Person(name) {
  this.name = name
}

// describe是Person.prototype的属性
Person.prototype.describe = function () {
  return 'Name: ' + this.name
}

var person = new Person('Jane')

// for...in循环会遍历实例自身的属性（name），
// 以及继承的属性（describe）
for (var key in person) {
  console.log(key)
}
// name
// describe
```

上面代码中，`name`是对象本身的属性，`describe`是对象继承的属性，`for...in`循环的遍历会包括这两者。

如果只想遍历对象本身的属性，可以使用`hasOwnProperty`方法，在循环内部判断一下是不是自身的属性。

```js
for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key)
  }
}
// name
```

### 14.类型转换

#### 14.1.typeof 操作符

JavaScript 有三种方法，可以确定一个值到底是什么类型。

- `typeof`运算符
- `instanceof`运算符
- `Object.prototype.toString`方法

你可以使用 **typeof** 操作符来查看 JavaScript 变量的数据类型。

```js
//原始类型
typeof 123 //返回 "number"
typeof '123' //返回 "string"
typeof false //返回 "boolean"
typeof NaN // 返回 number

//函数
function f() {}
typeof f // 返回"function"
typeof function () {} // 返回 function

//undefinded
typeof undefined //返回"undefined"

//其他
typeof window // "object"
typeof {} // "object"
typeof [] // "object"
typeof null // "object"
```

!> 请注意：

- NaN 的数据类型是 number
- 数组(Array)的数据类型是 object
- 日期(Date)的数据类型为 object
- null 的数据类型是 object
- 未定义变量的数据类型为 undefined

既然`typeof`对数组（array）和对象（object）的显示结果都是`object`，那么怎么区分它们呢？`instanceof`运算符可以做到。

```js
<span class="kd">var</span> <span class="nx">o</span> <span class="o">=</span> <span class="p">{};</span>
<span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="p">[];</span>

<span class="nx">o</span> <span class="k">instanceof</span> <span class="nb">Array</span> <span class="c1">// false</span>
<span class="nx">a</span> <span class="k">instanceof</span> <span class="nb">Array</span> <span class="c1">// true</span>

```

#### 14.2.constructor 属性

**constructor** 属性返回所有 JavaScript 变量的构造函数

```js
"John".constructor            // 返回函数 String()  { [native code] }
(3.14).constructor            // 返回函数 Number()  { [native code] }
false.constructor             // 返回函数 Boolean() { [native code] }
[1,2, 3,4].constructor        // 返回函数 Array()   { [native code] }
{name:'John', age:34}.constructor // 返回函数 Object()  { [native code] }
new Date().constructor         // 返回函数 Date()    { [native code] }
function() {}.constructor    // 返回函数 Function(){ [native code] }
```

可以使用 constructor 属性来查看对象是否为数组 (包含字符串 "Array"):

可以使用 constructor 属性来查看是对象是否为日期 (包含字符串 "Date"):

```js
function isArray(myArray) {
  return myArray.constructor.toString().indexOf('Array') > -1
}
function isDate(myDate) {
  return myDate.constructor.toString().indexOf('Date') > -1
}
```

#### 14.3. 类型转换

JavaScript 变量可以转换为新变量或其他数据类型：

- 通过使用 JavaScript 函数
- 通过 JavaScript 自身自动转换

##### 14.3.1.数字转换为字符串

?> 全局方法 **String()** 可以将数字转换为字符串。该方法可用于任何类型的数字，字母，变量，表达式：

?> Number 方法 **toString()** 也是有同样的效果。

---

更多数字转换为字符串的方法：

| toExponential() | 把对象的值转换为指数计数法。                         |
| --------------- | ---------------------------------------------------- |
| toFixed()       | 把数字转换为字符串，结果的小数点后有指定位数的数字。 |
| toPrecision()   | 把数字格式化为指定的长度。                           |

##### 14.3.2.日期转换为字符串

---

更多关于日期转换为字符串的函数：

| 方法              | 描述                                        |
| :---------------- | :------------------------------------------ |
| getDate()         | 从 Date 对象返回一个月中的某一天 (1 ~ 31)。 |
| getDay()          | 从 Date 对象返回一周中的某一天 (0 ~ 6)。    |
| getFullYear()     | 从 Date 对象以四位数字返回年份。            |
| getHours()        | 返回 Date 对象的小时 (0 ~ 23)。             |
| getMilliseconds() | 返回 Date 对象的毫秒(0 ~ 999)。             |
| getMinutes()      | 返回 Date 对象的分钟 (0 ~ 59)。             |
| getMonth()        | 从 Date 对象返回月份 (0 ~ 11)。             |
| getSeconds()      | 返回 Date 对象的秒数 (0 ~ 59)。             |
| getTime()         | 返回 1970 年 1 月 1 日至今的毫秒数。        |

##### 14.3.3.字符串转换为数字

?>全局方法 **Number()** 可以将字符串转换为数字。 空字符串转换为 0。其他的字符串会转换为 NaN (不是个数字)。

---

更多关于字符串转为数字的方法：

| 方法         | 描述                               |
| :----------- | :--------------------------------- |
| parseFloat() | 解析一个字符串，并返回一个浮点数。 |
| parseInt()   | 解析一个字符串，并返回一个整数。   |

#### 14.4.一元运算符 +

**Operator +** 可用于将变量转换为数字：

```js
var y = '5' // y 是一个字符串
var x = +y // x 是一个数字
```

?> 如果变量不能转换，它仍然会是一个数字，但值为 NaN (不是一个数字):

```js
var y = 'John' // y 是一个字符串
var x = +y // x 是一个数字 (NaN)
```

#### 14.5.自动转换类型 Type Conversion

当 JavaScript 尝试操作一个 "错误" 的数据类型时，会自动转换为 "正确" 的数据类型。

以下输出结果不是你所期望的：

```js
5 + null // 返回 5     because null is converted to 0
'5' + null // 返回"5null"  because null is converted to "null"
'5' + 1 // 返回 "51"   because 1 is converted to "1"
'5' - 1 // 返回 4     because "5" is converted to 5
```

#### 14.6.自动转换为字符串

?> 当你尝试输出一个对象或一个变量时 JavaScript 会自动调用变量的 toString() 方法：

#### 14.7.null && undefined

> `null`的类型也是`object`，这是由于历史原因造成的。1995 年 JavaScript 语言的第一版，所有值都设计成 32 位，其中最低的 3 位用来表述数据类型，`object`对应的值是`000`。当时，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），完全没考虑`null`，只把它当作`object`的一种特殊值，32 位全部为 0。这是`typeof null`返回`object`的根本原因。
>
> 为了兼容以前的代码，后来就没法修改了。这并不是说`null`就属于对象，本质上`null`是一个类似于`undefined`的特殊值。

在 JavaScript 中 null 表示 "什么都没有"，是一个只有一个值的特殊类型，表示一个空对象引用。

?> 当设置为“null”时，可以用来清空对象：

在 JavaScript 中 undefined 是一个没有设置值的变量。

?> 如果一个变量没有设置值的话，就会返回 undefined：

!> JavaScript 的标识名区分大小写，所以`undefined`和`null`不同于`Undefined`和`Null`（或者其他仅仅大小写不同的词形），后者只是普通的变量名。

对于`null`和`undefined`，可以大致可以像下面这样理解。

`null`表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时就可以传入`null`。比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入`null`，表示未发生错误。

```js
// 变量声明了，但没有赋值
var i
i // undefined

// 调用函数时，应该提供的参数没有提供，该参数等于undefined
function f(x) {
  return x
}
f() // undefined

// 对象没有赋值的属性
var o = new Object()
o.p // undefined

// 函数没有返回值时，默认返回undefined
function f() {}
f() // undefined
```

### 15.正则表达式

正则表达式（英语：Regular Expression，在代码中常简写为 regex、regexp 或 RE）

正则表达式是由一个字符序列形成的搜索模式。

正则表达式可以是一个简单的字符，或一个更复杂的模式。

正则表达式可用于所有文本搜索和文本替换的操作。

#### 15.1.字符串方法

- **search() 方法** 用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，并返回子字符串的起始位置。
- **replace() 方法** 用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子字符串。

##### 15.1.1.search() 方法使用正则表达式

```js
var str = 'Visit w3cschool'
var n = str.search(/w3cschool/i) //6
```

##### 15.1.2.search() 方法使用字符串

search 方法可使用字符串作为参数。字符串参数会转换为正则表达式：

```js
var str = 'Visit w3cschool!'
var n = str.search('w3cschool')
```

##### 15.1.3.replace() 方法使用正则表达式

```js
var str = 'Visit Microsoft!'
var res = str.replace(/microsoft/i, 'w3cschool') //Visit w3cschool!
```

##### 15.1.4.replace() 方法使用字符串

replace() 方法将接收字符串作为参数：：

```js
var str = 'Visit Microsoft!'
var res = str.replace('Microsoft', 'w3cschool')
```

---

### 17.调试

### 18.保留关键字

| abstract  | arguments | boolean    | break     | byte         |
| --------- | --------- | ---------- | --------- | ------------ |
| case      | catch     | char       | class\*   | const        |
| continue  | debugger  | default    | delete    | do           |
| double    | else      | enum\*     | eval      | export\*     |
| extends\* | false     | final      | finally   | float        |
| for       | function  | goto       | if        | implements   |
| import\*  | in        | instanceof | int       | interface    |
| let       | long      | native     | new       | null         |
| package   | private   | protected  | public    | return       |
| short     | static    | super\*    | switch    | synchronized |
| this      | throw     | throws     | transient | true         |
| try       | typeof    | var        | void      | volatile     |
| while     | with      | yield      |           |              |

| Array     | Date     | eval     | function      | hasOwnProperty |
| --------- | -------- | -------- | ------------- | -------------- |
| Infinity  | isFinite | isNaN    | isPrototypeOf | length         |
| Math      | NaN      | name     | Number        | Object         |
| prototype | String   | toString | undefined     | valueOf        |

| getClass | java | JavaArray | javaClass | JavaObject | JavaPackage |
| -------- | ---- | --------- | --------- | ---------- | ----------- |

| alert          | all                | anchor      | anchors            | area               |
| -------------- | ------------------ | ----------- | ------------------ | ------------------ |
| assign         | blur               | button      | checkbox           | clearInterval      |
| clearTimeout   | clientInformation  | close       | closed             | confirm            |
| constructor    | crypto             | decodeURI   | decodeURIComponent | defaultStatus      |
| document       | element            | elements    | embed              | embeds             |
| encodeURI      | encodeURIComponent | escape      | event              | fileUpload         |
| focus          | form               | forms       | frame              | innerHeight        |
| innerWidth     | layer              | layers      | link               | location           |
| mimeTypes      | navigate           | navigator   | frames             | frameRate          |
| hidden         | history            | image       | images             | offscreenBuffering |
| open           | opener             | option      | outerHeight        | outerWidth         |
| packages       | pageXOffset        | pageYOffset | parent             | parseFloat         |
| parseInt       | password           | pkcs11      | plugin             | prompt             |
| propertyIsEnum | radio              | reset       | screenX            | screenY            |
| scroll         | secure             | select      | self               | setInterval        |
| setTimeout     | status             | submit      | taint              | text               |
| textarea       | top                | unescape    | untaint            | window             |

| onblur    | onclick    | onerror     | onfocus     |
| --------- | ---------- | ----------- | ----------- |
| onkeydown | onkeypress | onkeyup     | onmouseover |
| onload    | onmouseup  | onmousedown | onsubmit    |

### 19.函数

#### 19.1.函数定义

##### 19.1.1.Function() 构造函数

函数同样可以通过内置的 JavaScript 函数构造器（Function()）定义

```js
var myFunction = new Function('a', 'b', 'return a * b')
var x = myFunction(4, 3)
//等同
var myFunction = function (a, b) {
  return a * b
}
var x = myFunction(4, 3)
```

##### 19.1.2.函数提升（Hoisting）

提升（Hoisting）是 JavaScript 默认将当前作用域提升到前面去的的行为。

提升（Hoisting）应用在变量的声明与函数的声明。

因此，函数可以在声明之前调用：

```js
myFunction(5)
function myFunction(y) {
  return y * y
}
```

使用表达式定义函数时无法提升。

##### 19.1.3.自调用函数

函数表达式可以 "自调用"。

自调用表达式会自动调用。

如果表达式后面紧跟 () ，则会自动调用。

不能自调用声明的函数。

通过添加括号，来说明它是一个函数表达式：

```js
;(function () {
  var x = 'Hello!!' // 我将调用自己
})()
```

?> 以上函数实际上是一个 **匿名自我调用的函数** (没有函数名)。

#### 19.2. 函数参数

?> JavaScript 函数对参数的值(arguments)没有进行任何的检查。

?> JavaScript 函数参数与大多数其他语言的函数参数的区别在于：它不会关注有多少个参数被传递，不关注传递的参数的数据类型。

##### 19.2.1.参数规则

JavaScript 函数定义时参数没有指定数据类型。

JavaScript 函数对隐藏参数(arguments)没有进行检测。

JavaScript 函数对隐藏参数(arguments)的个数没有进行检测。

##### 19.2.2.默认参数

如果函数在调用时缺少参数，参数会默认设置为： **undefined**

有时这是可以接受的，但是建议最好为参数设置一个默认值：

```js
function myFunction(x, y) {
  if (y === undefined) {
    y = 0
  }
}

//优
function myFunction(x, y) {
  y = y || 0
}
```

!> 如果 y 已经定义 ， y || 0 返回 y, 因为 y 是 true, 否则返回 0, 因为 undefined 为 false。

##### 19.2.3.Arguments 对象

JavaScript 函数有个内置的对象 arguments 对象.

argument 对象包含了函数调用的参数数组。

通过这种方式你可以很方便的找到最后一个参数的值：

```js
x = findMax(1, 123, 500, 115, 44, 88)

function findMax() {
  var i,
    max = arguments[0]

  if (arguments.length < 2) return max

  for (i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i]
    }
  }

  return max
}
```

##### 19.2.4.通过对象传递参数

!> 在 JavaScript 中，可以引用对象的值。因此我们在函数内部修改对象的属性就会修改其初始的值。修改对象属性可作用于函数外部（全局变量）。

```js
var obj = { x: 1 }
// 通过对象传递参数
function myFunction(obj) {
  obj.x++ //修改参数对象obj.x的值，函数外定义的obj也将会被修改
  console.log(obj.x)
}
myFunction(obj) // 2
console.log(obj.x) // 2
```

#### 19.3.函数调用

?> JavaScript 函数有 4 种调用方式。每种方式的不同在于 **this** 的初始化。

19.3.1.**_this_** 关键字

在 Javascript 中，this 指向函数执行时的当前对象。

##### 19.3.1.作为函数方法调用函数

在 JavaScript 中, 函数是对象。JavaScript 函数有它的属性和方法。

**call()** 和 **apply()** 是预定义的函数方法。 两个方法可用于调用函数，两个方法的第一个参数必须是对象本身。

```js
function myFunction(a, b) {
  return a * b
}
myFunction.call(myObject, 10, 2) // 返回

function myFunction(a, b) {
  return a * b
}
myArray = [10, 2]
myFunction.apply(myObject, myArray) // 返回 20
```

apply 传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而 call 则作为 call 的参数传入（从第二个参数开始）

在 JavaScript 严格模式(strict mode)下, 在调用函数时第一个参数会成为 **this** 的值， 即使该参数不是一个对象。

在 JavaScript 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。

#### 19.4.闭包

##### 19.4.1.JavaScript 内嵌函数

JavaScript 支持嵌套函数。嵌套函数可以访问上一层的函数变量。

##### 19.4.2.JavaScript 闭包

```js
var add = (function () {
  var counter = 0
  return function () {
    return (counter += 1)
  }
})()

add()
add()
add()

// 计数器为 3
```

变量 **add** 指定了函数自我调用的返回字值。

自我调用函数只执行一次。设置计数器为 0。并返回函数表达式。

add 变量可以作为一个函数使用。非常棒的部分是它可以访问函数上一层作用域的计数器。

这个叫作 JavaScript **闭包。**它使得函数拥有私有变量变成可能。

计数器受匿名函数的作用域保护，只能通过 add 方法修改。

!> 闭包是可访问上一层函数作用域里变量的函数，即便上一层函数已经关闭。

### 20.对象

#### 20.1.对象

##### 20.1.1.使用对象构造器创建对象

```js
function person(firstname, lastname, age, eyecolor) {
  this.firstname = firstname
  this.lastname = lastname
  this.age = age
  this.eyecolor = eyecolor
}
```

一旦您有了对象构造器，就可以创建新的对象实例，就像这样：

```js
var myFather = new person('John', 'Doe', 50, 'blue')
var myMother = new person('Sally', 'Rally', 48, 'green')
```

##### 20.1.2.原型链的理解

###### `__proto__`?

> 每个对象都会在其内部初始化一个属性，就是 **proto**，当我们访问一个对象的属性 时，如果这个对象内部不存在这个属性，那么他就会去**proto**里找这个属性，这个**proto**又会有自己的**proto**，于是就这样 一直找下去，也就是我们平时所说的原型链的概念。

###### new 究竟做了什么？

> 我们把 new 的过程拆分成以下三步：
>
> \1. var p={}; 也就是说，初始化一个对象 p。
>
> \2. p.**proto**=Person.prototype;
>
> \3. Person.call(p);也就是说构造 p，也可以称之为初始化 p。

---

##### 查看所有属性

查看一个对象本身的所有属性，可以使用`Object.keys`方法。

```js
var o = {
  key1: 1,
  key2: 2,
}

Object.keys(o)
// ['key1', 'key2']
```

##### delete 命令

`delete`命令用于删除对象的属性，删除成功后返回`true`。

```js
var o = { p: 1 }
Object.keys(o) // ["p"]

delete o.p // true
o.p // undefined
Object.keys(o) // []
```

!> 删除一个不存在的属性，`delete`不报错，而且返回`true`。

只有一种情况，`delete`命令会返回`false`，那就是该属性存在，且不得删除。

```js
var o = Object.defineProperty({}, 'p', {
  value: 123,
  configurable: false,
})

o.p // 123
delete o.p // false
```

?> `delete`命令只能删除对象本身的属性，无法删除继承的属性

```js
var o = {}
delete o.toString // true
o.toString // function toString() { [native code] }
```

`toString`是对象`o`继承的属性，虽然`delete`命令返回`true`，但该属性并没有被删除，依然存在。

`delete`命令不能删除`var`命令声明的变量，只能用来删除属性。

```js
var p = 1
delete p // false
delete window.p // false
```

`p`是`var`命令声明的变量，`delete`命令无法删除它，返回`false`。因为`var`声明的全局变量都是顶层对象的属性，而且默认不得删除。

#### 20.2.Number()对象

##### 20.2.1.所有 JavaScript 数字均为 64 位

JavaScript 不是类型语言。与许多其他编程语言不同，JavaScript 不定义不同类型的数字，比如整数、短、长、浮点等等。

在 JavaScript 中，数字不分为整数类型和浮点型类型，所有的数字都是由 浮点型类型。JavaScript 采用 IEEE754 标准定义的 64 位浮点格式表示数字，它能表示最大值为 ±1.7976931348623157 x 10308，最小值为 ±5 x 10 -324

| 值 (aka Fraction/Mantissa) | 指数              | Sign       |
| :------------------------- | :---------------- | :--------- |
| 52 bits (0 - 51)           | 11 bits (52 - 62) | 1 bit (63) |

##### 20.2.2.精度

整数（不使用小数点或指数计数法）最多为 15 位。

小数的最大位数是 17，但是浮点运算并不总是 100% 准确：

```js
var x = 0.2 + 0.1 // result will be 0.30000000000000004
```

##### 20.2.3.八进制和十六进制

如果前缀为 0，则 JavaScript 会把数值常量解释为八进制数，如果前缀为 0 和 "x"，则解释为十六进制数。

!> 绝不要在数字前面写零，除非您需要进行八进制转换。

##### 20.2.4.无穷大（Infinity）

当数字运算结果超过了 JavaScript 所能表示的数字上限（溢出），结果为一个特殊的无穷大（infinity）值，在 JavaScript 中以 Infinity 表示。同样地，当负数的值超过了 JavaScript 所能表示的负数范围，结果为负无穷大，在 JavaScript 中以-Infinity 表示。无穷大值的行为特性和我们所期望的是一致的：基于它们的加、减、乘和除运算结果还是无穷大（当然还保留它们的正负号）。

##### 20.2.5.NaN - 非数字值

NaN 属性是代表非数字值的特殊值。该属性用于指示某个值不是数字。可以把 Number 对象设置为该值，来指示其不是数字值。

!> 除以 0 是无穷大，无穷大是一个数字:

?> 在 JavaScript 中，如果参数无法被转换为数字，则返回 NaN。

---

`NaN`不等于任何值，包括它本身。

```js
NaN === NaN // false
```

由于数组的`indexOf`方法，内部使用的是严格相等运算符，所以该方法对`NaN`不成立。

```js
;[NaN].indexOf(NaN) // -1
```

`NaN`在布尔运算时被当作`false`。

```js
Boolean(NaN) // false
```

`NaN`与任何数（包括它自己）的运算，得到的都是`NaN`。

```js
NaN + 32 // NaN
NaN - 32 // NaN
NaN * 32 // NaN
NaN / 32 // NaN
```

`isNaN`方法可以用来判断一个值是否为`NaN`。

```js
isNaN(NaN) // true
isNaN(123) // false

isNaN({}) // true
// 等同于
isNaN(Number({})) // true

isNaN(['xzy']) // true
// 等同于
isNaN(Number(['xzy'])) // true

isNaN([]) // false
isNaN([123]) // false
isNaN(['123']) // false
```

##### 20.2.6.数字属性

- MAX_VALUE
- MIN_VALUE
- NEGATIVE_INFINITY
- POSITIVE_INFINITY
- NaN
- prototype
- constructor

##### 20.2.7.数字方法

- toExponential()
- toFixed()
- toPrecision()
- toString()
- valueOf()

#### 20.3.字符串（String）对象

##### 20.3.1.字符串转为数组

字符串使用 string>split()函数转为数组:

#### 20.4.Date（日期）对象

#### 20.5.Array（数组）对象

!> 本质上，数组属于一种特殊的对象。`typeof`运算符会返回数组的类型是`object`。

数组对象的作用是：使用单独的变量名来存储一系列的值。

##### 20.5.1.参数

参数 size 是期望的数组元素个数。返回的数组，length 字段将被设为 size 的值。

参数 `element ...; elementn` 是参数列表。当使用这些参数来调用构造函数 Array() 时，新创建的数组的元素就会被初始化为这些值。它的 length 字段也会被设置为参数的个数。

##### 20.5.2.返回值

返回新创建并被初始化了的数组。

如果调用构造函数 Array() 时没有使用参数，那么返回的数组为空，length 字段为 0。

当调用构造函数时只传递给它一个数字参数，该构造函数将返回具有指定个数、元素为 undefined 的数组。

当其他参数调用 Array() 时，该构造函数将用参数指定的值**初始化数组**。

当把构造函数作为函数调用，不使用 `new 运算符`时，它的行为与使用 `new 运算符`调用它时的行为完全一样。

##### 20.5.3.Array 对象属性

| 属性        | 描述                               |
| :---------- | :--------------------------------- |
| constructor | 返回对创建此对象的数组函数的引用。 |
| length      | 设置或返回数组中元素的数目。       |
| prototype   | 使您有能力向对象添加属性和方法。   |

####

##### 20.5.4.**栈方法**

pop 和 push 能够让我们使用堆栈那样先入后出使用数组

```js
var a = new Array(1, 2, 3)
a.push(4)
console.log(a) //[1, 2, 3, 4]
console.log(a.length) //4
console.log(a.pop(a)) //4
console.log(a) //[1, 2, 3]
console.log(a.length) //3
```

##### 20.5.5.**队列方法**

先入先出的队列

```js
var a = new Array(1, 2, 3)
a.unshift(4)
console.log(a) //[4, 1, 2, 3]
console.log(a.length) //4
console.log(a.shift(a)) //4
console.log(a) //[1, 2, 3]
console.log(a.length) //3
```

##### 20.5.6.splice 方法

方法有三个参数

1. 开始索引
2. 删除元素的位移
3. 插入的新元素，当然也可以写多个

splice 方法返回一个由删除元素组成的新数组，没有删除则返回空数组

```js
var a = new Array(1, 2, 3, 4, 5)

//删除
var a = new Array(1, 2, 3, 4, 5)
console.log(a.splice(1, 3)) //[2, 3, 4]
console.log(a.length) //2
console.log(a) //[1,5]

//插入 替换
//只要方法第二个参数，也就是删除动作执行的次数设为0
var a = new Array(1, 2, 3, 4, 5)
a.splice(1, 0, 9, 99, 999)
console.log(a.length) //8
console.log(a) //[1, 9, 99, 999, 2, 3, 4, 5]
a.splice(1, 3, 8, 88, 888)
console.log(a.length) //8
console.log(a) //[1, 8, 88, 888, 2, 3, 4, 5]
```

#### 20.6.Boolean（布尔）对象

Boolean（布尔）对象用于将非布尔值转换为布尔值（true 或者 false），是三种包装对象：Number、String 和 Boolean 中最简单的一种，它没有大量的实例属性和方法。

如果布尔对象无初始值或者其值为:

- 0
- -0
- null
- ""
- false
- undefined
- NaN

那么对象的值为 false。否则，其值为 true（即使当自变量为字符串 "false" 时）！

#### 20.7. Math（算数）对象

Math（算数）对象的作用是：执行常见的算数任务。

!> Math 对象无需在使用这个对象之前对它进行定义。

!> Math 对象不能使用 new 关键字创建对象实例。直接用 “对象名.成员”的格式来访问其属性或者方法。

##### 20.7.1.算数值

JavaScript 提供 8 种可被 Math 对象访问的算数值：

你可以参考如下 Javascript 常量使用方法：

```js
Math.E
Math.PI
Math.SQRT2
Math.SQRT1_2
Math.LN2
Math.LN10
Math.LOG2E
Math.LOG10E
```

##### 20.7.2.算数方法

#### 20.8.RegExp 对象

RegExp：是正则表达式（regular expression）的简写。

RegExp 对象用于规定在文本中检索的内容。

##### 20.8.1.语法

```js
var patt = new RegExp(pattern, modifiers)
```

另一种更简单的方式：

```js
var patt=/pattern/modifiers;
```

- 模式描述了一个表达式模型。
- 修饰符描述了检索是否是全局，区分大小写等。

##### 20.8.2.RegExp 修饰符

修饰符用于执行不区分大小写和全文的搜索。

**i** - 修饰符是用来执行不区分大小写的匹配。

**g** - 修饰符是用于执行全文的搜索（而不是在找到第一个就停止查找,而是找到所有的匹配）。

##### 20.8.3.test()

The test()方法搜索字符串指定的值，根据结果并返回真或假。

下面的示例是从字符串中搜索字符 "e" ：

```js
var patt1 = new RegExp('e')
document.write(patt1.test('The best things in life are free')) //true
```

##### 20.8.4.exec()

exec() 方法检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。

下面的示例是从字符串中搜索字符 "e" ：

```js
var patt1 = new RegExp('e')
document.write(patt1.exec('The best things in life are free')) //e
```

#### 20.9. Window 对象

Window 对象表示浏览器中打开的窗口。

Window 对象表示一个浏览器窗口或一个框架。在客户端 JavaScript 中，Window 对象是全局对象，所有的表达式都在当前的环境中计算。

##### 20.9.1.Window 子对象

Window 的子对象主要有如下几个：

1. JavaScript document 对象
2. JavaScript frames 对象
3. JavaScript history 对象
4. JavaScript location 对象
5. JavaScript navigator 对象
6. JavaScript screen 对象

##### 20.9.2.浏览器对象模型 (BOM)

浏览器对象模型（**B**rowser **O**bject **M**odel (BOM)）尚无正式标准。

由于现代浏览器已经（几乎）实现了 JavaScript 交互性方面的相同方法和属性，因此常被认为是 BOM 的方法和属性。

##### 20.9.3.Window 尺寸

有三种方法能够确定浏览器窗口的尺寸（浏览器的窗口，不包括工具栏和滚动条）。

对于 Internet Explorer、Chrome、Firefox、Opera 以及 Safari：

- window.innerHeight - 浏览器窗口的内部高度
- window.innerWidth - 浏览器窗口的内部宽度

##### 20.9.4.Window Screen

###### 20.9.4.1.Window Screen

**window.screen**对象在编写时可以不使用 window 这个前缀。

一些属性：

- screen.availWidth - 可用的屏幕宽度
- screen.availHeight - 可用的屏幕高度

###### 20.9.4.2.Window Screen 可用宽度

screen.availWidth 属性返回访问者屏幕的宽度，以像素计，减去界面特性，比如窗口任务栏。

###### 20.9.4.3.Window Screen 可用高度

screen.availHeight 属性返回访问者屏幕的高度，以像素计，减去界面特性，比如窗口任务栏。

##### 20.9.5.Window Location

window.location 对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。

这种方法既可以用于具有 onclick 事件的标签，也可以用于满足某些条件进行跳转，特点是方便且灵活。

**window.location** 对象在编写时可不使用 window 这个前缀。 一些例子：

一些实例:

- [location.hostname](https://www.w3cschool.cn/jsref/prop-loc-hostname.html) 返回 web 主机的域名
- [location.pathname](https://www.w3cschool.cn/jsref/prop-loc-pathname.html) 返回当前页面的路径和文件名
- [location.port](https://www.w3cschool.cn/jsref/prop-loc-port.html) 返回 web 主机的端口 （80 或 443）
- [location.protocol](https://www.w3cschool.cn/jsref/prop-loc-protocol.html) 返回所使用的 web 协议（http:// 或 https://）
- location.href 属性返回当前页面的 URL。

##### 20.9.6.Window History

window.history 对象包含浏览器的历史。

**window.history**对象在编写时可不使用 window 这个前缀。

为了保护用户隐私，对 JavaScript 访问该对象的方法做出了限制。

一些方法：

- [history.back()](https://www.w3cschool.cn/jsref/met-his-back.html) - 与在浏览器点击后退按钮相同
- [history.forward()](https://www.w3cschool.cn/jsref/met-his-forward.html) - 与在浏览器中点击向前按钮向前相同

##### 20.9.7.Window Navigator

window.navigator 对象包含有关访问者浏览器的信息。

**window.navigator** 对象在编写时可不使用 window 这个前缀。

!> 警告!!!

来自 navigator 对象的信息具有误导性，不应该被用于检测浏览器版本，这是因为：

- navigator 数据可被浏览器使用者更改
- 一些浏览器对测试站点会识别错误
- 浏览器无法报告晚于浏览器发布的新操作系统

##### 20.9.8.弹窗

可以在 JavaScript 中创建三种消息框：警告框、确认框、提示框。

##### 20.9.9.计时事件

通过使用 JavaScript，我们有能力做到在一个设定的时间间隔之后来执行代码，而不是在函数被调用后立即执行。我们称之为计时事件。

在 JavaScritp 中使用计时事件是很容易的，两个关键方法是:

- [setInterval()](https://www.w3cschool.cn/jsref/met-win-setinterval.html)- 间隔指定的毫秒数不停地执行指定的代码。
- [setTimeout()](https://www.w3cschool.cn/jsref/met-win-settimeout.html)- 暂停指定的毫秒数后执行指定的代码

?> setInterval() 和 setTimeout() 是 HTML DOM Window 对象的两个方法

##### 20.9.9.1.setInterval()方法

###### 定义和用法

setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。

setInterval() 方法会不停地调用函数，直到 [clearInterval()](https://www.w3cschool.cn/jsref/met-win-clearinterval.html) 被调用或窗口被关闭。由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。

**提示：** 1000 毫秒= 1 秒。

```js
setInterval(code, millisec, lang)

window.clearInterval(intervalVariable) //停止执行
```

?> **window.clearInterval()** 方法可以不使用 window 前缀，直接使用函数**clearInterval()**。

| 参数     | 描述                                                   |
| :------- | :----------------------------------------------------- |
| code     | 必需。要调用的函数或要执行的代码串。                   |
| millisec | 必须。周期性执行或调用 code 之间的时间间隔，以毫秒计。 |
| lang     | 可选。 JScript \| VBScript \| JavaScript               |

##### 20.9.9.2.setTimeout() 方法

###### 定义和用法

setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。

**提示:** 1000 毫秒 = 1 秒.

###### 语法

```js
setTimeout(code, millisec, lang)

window.clearTimeout(timeoutVariable) //停止
```

| 参数     | 描述                                                    |
| :------- | :------------------------------------------------------ |
| code     | 必需。要调用的函数后要执行的 JavaScript 代码串。        |
| millisec | 必需。在执行代码前需等待的毫秒数。                      |
| lang     | 可选。脚本语言可以是：JScript \| VBScript \| JavaScript |

##### 20.9.10.Cookies

Cookies 是一些数据, 存储于你电脑上的文本文件中。

当 web 服务器向浏览器发送 web 页面时，在连接关闭后，服务端不会记录用户的信息。

Cookies 的作用就是用于解决 "如何记录客户端的用户信息":

- 当用户访问 web 页面时，他的名字可以记录在 cookie 中。
- 在用户下一次访问该页面时，可以在 cookie 中读取用户访问记录。

Cookies 以名/值对形式存储，如下所示:

```js
username=John Doe
```

###### 20.9.10.1.创建 Cookie

JavaScript 可以使用 **document.cookie** 属性来创建 、读取、及删除 cookies。

JavaScript 中，创建 cookie 如下所示：

```js
document.cookie = 'username=John Doe'
```

您还可以为 cookie 添加一个过期时间（以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除：

```js
document.cookie = 'username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 GMT'
```

您可以使用 path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面。

```js
document.cookie =
  'username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 GMT; path=/'
```

###### 20.9.10.2.使用 JavaScript 读取 Cookie

在 JavaScript 中, 可以使用以下代码来读取 cookies：

```js
var x = document.cookie
```

?> document.cookie 将以字符串的方式返回所有的 cookies，类型格式： cookie1=value; cookie2=value; cookie3=value;

![img](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/49s1PS0001470710607319368.gif)

#### 20.10.execCommand 函数

execCommand 方法是执行一个对当前文档，当前选择或者给出范围的命令

### 21.浏览器端数据储存

**Web Storage**

这个 API 的作用是，使得网页可以在浏览器端储存数据。它分成两类：sessionStorage 和 localStorage。

- sessionStorage 保存的数据用于浏览器的一次会话，当会话结束（通常是该窗口关闭），数据被清空；
- localStorage 保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。除了保存期限的长短不同，这两个对象的属性和方法完全一样。

通过检查 window 对象是否包含 sessionStorage 和 localStorage 属性，可以确定浏览器是否支持这两个对象。

```js
function checkStorageSupport() {
  // sessionStorage
  if (window.sessionStorage) {
    return true
  } else {
    return false
  }

  // localStorage
  if (window.localStorage) {
    return true
  } else {
    return false
  }
}
```

#### 21.1.操作方法

```js
//存入/读取数据
sessionStorage.setItem('key', 'value')
localStorage.setItem('key', 'value')

//读取数据
var valueSession = sessionStorage.getItem('key')
var valueLocal = localStorage.getItem('key')

//清除数据
sessionStorage.removeItem('key')
localStorage.removeItem('key')

//clear方法用于清除所有保存的数据
sessionStorage.clear()
localStorage.clear()

//storage事件
window.addEventListener('storage', onStorageChange)
//回调函数接受一个event对象作为参数。这个event对象的key属性，保存发生变化的键名。
function onStorageChange(e) {
  console.log(e.key)
}
```

除了 key 属性，event 对象的属性还有三个：

- oldValue：更新前的值。如果该键为新增加，则这个属性为 null。
- newValue：更新后的值。如果该键被删除，则这个属性为 null。
- url：原始触发 storage 事件的那个网页的网址。

如果浏览器同时打开一个域名下面的多个页面，当其中的一个页面改变 sessionStorage 或 localStorage 的数据时，其他所有页面的 storage 事件会被触发，而原始页面并不触发 storage 事件。

可以通过这种机制，实现多个窗口之间的通信。

所有浏览器之中，只有 IE 浏览器除外，它会在所有页面触发 storage 事件。
