### 原始类型 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**



**ECMAScript有5种原始类型（primitive type），即Undefined、Null、Boolean、Number和String。**



#### typeof运算符

---

typeof运算符有一个参数，即要检查的变量或值。

对变量或值调用typeof运算符将返回下列值之一：

- undefined - 如果变量是Undefined类型的
- boolean - 如果变量是Boolean类型的
- number - 如果变量是Number类型的
- string - 如果变量是String类型的
- object - 如果变量是一种引用类型或Null类型的

```js
console.log(typeof undefined) //undefined
console.log(typeof Boolean()) //boolean
console.log(typeof Number())// number
console.log(typeof NaN)// number
console.log(typeof String())//string
console.log(typeof Object())//object
let object = {}
console.log(typeof object)//object
console.log(typeof null)//object
console.log(typeof new Error())//object
```



#### Undefined 类型

----

Undefined类型具有唯一的值，即undefined。

当声明的变量未初始化时，该变量的默认值是undefined。

1. 测试该变量的值是否等于undefined：

```js
var oTemp;
alert(oTemp == undefined);
//或
alert(Object.is(temp,undefined))
//或者
alert(typeof oTemp); //输出 "undefined"
```

2. 变量未声明情况只能使用typeof判断,否则报错

```js
var oTemp;
alert(oTemp2 == undefined); //ReferenceError: oTemp2 is not defined

var oTemp;
alert(typeof oTemp2 == "undefined");//正确 true
```

3. 当函数无明确返回值时，返回的也是值"undefined"，如下所示：

```js
function testFunc() {
   let a = 1+2 +3
}

alert(testFunc() == undefined);  //输出 "true"
```



#### Null 类型

---

另一种只有一个值的类型是Null，它有唯一专用值null，即它的字面量

?> 值undefined实际上是从值null派生来的，因此ECMAScript把它们定义为相等的

```js
alert(null == undefined);  //输出 "true"
```

?> 尽管这两个值相等，但它们的含义不同。undefined是声明了变量但未对其初始化时赋予该变量的值，null则用于表示尚未存在的对象



#### Boolean 类型

---

Boolean类型是ECMAScript中最常用的类型之一。它有两个值true和false （即两个Boolean字面量）

即使false不等于0，0也可以在必要时被转换成false，这样在Boolean语句中使用两者都是安全的。

```js
var bFound = true;
var bLost = false;

var test = 1;

alert(bFound == test) //true
alert(bFound === test) //false
```





#### Number 类型

---

这种类型既可以表示32位的整数，还可以表示64位的浮点数。

直接输入的（而不是从另一个变量访问的）任何数字都被看做Number类型的字面量。例如，下面的代码声明了存放整数值的变量，它的值由字面量86定义：

```js
var iNum = 86;
```

##### 八进制数和十六进制数

整数也可以被表示为八进制（以8为底）或十六进制（以16为底）的字面量。八进制字面量的首数字必须是0，其后的数字可以是任何八进制数字（0-7），如下面的代码所示：

```js
var iNum = 070;  //070 等于十进制的 56
```

要创建十六进制的字面量，首位数字必须为0，后面接字母x，然后是任意的十六进制数字（0到9和A到F）。这些字母可以是大写的，也可以是小写的。例如：

```js
var iNum = 0x1f;  //0x1f 等于十进制的 31
var iNum = 0xAB;  //0xAB 等于十进制的 171
```

?> 尽管所有整数都可以表示为八进制或十六进制的字面量，但所有数学运算返回的都是十进制结果。

##### 浮点数

?> **对于浮点字面量的有趣之处在于，用它进行计算前，真正存储的是字符串**

##### 科学计数法

对于非常大或非常小的数，可以用科学计数法表示浮点数，可以把一个数表示为数字（包括十进制数字）加e（或 E），后面加乘以10的倍数。例如：

```js
var fNum = 5.618e7
```

该符号表示的是数56180000。把科学计数法转化成计算式就可以得到该值：5.618 x 107。

?> 也可用64位IEEE 754形式存储浮点值，这意味着十进制值最多可以有17个十进制位。17位之后的值将被裁去，从而造成一些小的数学误差。

##### 特殊的 Number 值

###### Number.MAX_VALUE和Number.MIN_VALUE

它们定义了Number值集合的外边界。所有ECMAScript数都必须在这两个值之间。不过计算生成的数值结果可以不落在这两个值之间。

###### Number.POSITIVE_INFINITY

当计算生成的数大于 Number.MAX_VALUE 时，它将被赋予值Number.POSITIVE_INFINITY，意味着不再有数字值。

###### Number.NEGATIVE_INFINITY

生成的数值小于Number.MIN_VALUE 的计算也会被赋予值Number.NEGATIVE_INFINITY，也意味着不再有数字值。

!> 如果计算返回的是无穷大值，那么生成的结果不能再用于其他计算。

###### Infinity 和 -Infinity

事实上，有专门的值表示无穷大,即Infinity。Number.POSITIVE_INFINITY的值为Infinity。Number.NEGATIVE_INFINITY的值为-Infinity。

###### isFinite()方法

可用一个方法判断一个数是否是有穷的（而不是单独测试每个无穷数）。可以对任何数调用isFinite()方法，以确保该数不是无穷大。例如：

```js
var iResult = iNum * some_really_large_number;

if (isFinite(iResult))
 {
    alert("finite");
}

else {
    alert("infinite");
}
```

###### NaN

表示非数（Not a Number）

1. 一般说来，这种情况发生在类型（String、Boolean 等）转换失败时

2. NaN的另一个奇特之处在于，它与自身不相等，这意味着下面的代码将返回false：

```js
console.log(NaN === NaN) //false
console.log(Object.is(NaN,NaN)) //true

alert(isNaN("blue"));  //输出 "true"
alert(isNaN("666"));  //输出 "false"
```



#### String 类型

---

?> String类型的独特之处在于，它是唯一没有固定大小的原始类型

- 可以用字符串存储0或更多的Unicode字符，有16位整数表示

- 字符串字面量是由双引号（"）或单引号（'）声明的

下面列出了ECMAScript的字符字面量：

| 字面量   | 含义                                                         |
| :------- | :----------------------------------------------------------- |
| \n       | 换行                                                         |
| \t       | 制表符                                                       |
|          | 空格                                                         |
| \r       | 回车                                                         |
| \f       | 换页符                                                       |
| \\       | 反斜杠                                                       |
| \'       | 单引号                                                       |
| \"       | 双引号                                                       |
| \0*nnn*  | 八进制代码*nnn*表示的字符（*n*是0到7中的一个八进制数字）     |
| \x*nn*   | 十六进制代码*nn*表示的字符（*n*是0到F中的一个十六进制数字）  |
| \u*nnnn* | 十六进制代码*nnnn*表示的Unicode字符（*n*是0到F中的一个十六进制数字） |