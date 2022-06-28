# JavaScript <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

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

#### 4.4.Undefined 和 Null

Undefined 这个值表示变量不含有值。

可以通过将变量的值设置为 null 来清空变量。

#### 4.5.声明变量类型

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

JavaScript for/in 语句循环遍历对象的属性

### 14.类型转换

#### 14.1.typeof 操作符

你可以使用 **typeof** 操作符来查看 JavaScript 变量的数据类型。

```js
typeof 'John' // 返回 string
typeof 3.14 // 返回 number
typeof NaN // 返回 number
typeof false // 返回 boolean
typeof [1, 2, 3, 4] // 返回 object
typeof { name: 'John', age: 34 } // 返回 object
typeof new Date() // 返回 object
typeof function () {} // 返回 function
typeof myCar // 返回 undefined (如果 myCar没有被实例化的话)
typeof null // 返回 object
```

!> 请注意：

- NaN 的数据类型是 number
- 数组(Array)的数据类型是 object
- 日期(Date)的数据类型为 object
- null 的数据类型是 object
- 未定义变量的数据类型为 undefined

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

#### 14.7.null

在 JavaScript 中 null 表示 "什么都没有"，是一个只有一个值的特殊类型，表示一个空对象引用。

?> 当设置为“null”时，可以用来清空对象：

#### 14.8.undefined

在 JavaScript 中 undefined 是一个没有设置值的变量。

?> 如果一个变量没有设置值的话，就会返回 undefined：

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

### 16.错误处理

- **try** 语句测试代码块的错误。
- **catch** 语句处理错误。
- **throw** 语句创建自定义错误。

#### 16.1.抛出（throw）错误

当错误发生时，当事情出问题时，JavaScript 引擎通常会停止，并生成一个错误消息。

描述这种情况的技术术语是：JavaScript 将**抛出**一个错误。

#### 16.2. try 和 catch

**try** 语句允许我们定义在执行时进行错误测试的代码块。

**catch** 语句允许我们定义当 try 代码块发生错误时，所执行的代码块。

JavaScript 语句 **try** 和 **catch** 是成对出现的。

### 16.3.Throw 语句

throw 语句允许我们创建自定义错误。

正确的技术术语是：创建或**抛出异常**（exception）。

如果把 throw 与 try 和 catch 一起使用，那么您能够控制程序流，并生成自定义的错误消息。

```js
throw exception
```

?> 异常可以是 JavaScript 字符串、数字、逻辑值或对象

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
