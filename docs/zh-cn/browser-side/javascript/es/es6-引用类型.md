### 引用类型 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**



**引用类型通常叫做类（class）。**

**本教程会讨论大量的 ECMAScript 预定义引用类型。**



#### 引用类型 <!-- {docsify-ignore} -->

---

引用类型通常叫做类（class），也就是说，遇到引用值，所处理的就是对象。

!> 注意：从传统意义上来说，ECMAScript并不真正具有类。事实上，除了说明不存在类，在ECMA-262中根本没有出现“类”这个词。ECMAScript定义了“对象定义”，逻辑上等价于其他程序设计语言中的类。

?> 提示：本教程将使用术语“对象”。

对象是由 new 运算符加上要实例化的对象的名字创建的。

例如，下面的代码创建Object对象的实例：

```js
var o = new Object();
```

?> 没有参数，如以下代码所示，括号可以省略



#### Object 对象

---

ECMAScript中的所有对象都由这个对象继承而来，Object对象中的所有属性和方法都会出现在其他对象中



##### Object 对象属性

- **constructor**

  对创建对象的函数的引用（指针）。

  对于Object对象，该指针指向原始的Object()函数。

- **Prototype**

  对该对象的对象原型的引用。

  对于所有的对象，它默认返回Object对象的一个实例。

##### Object 对象方法：

- hasOwnProperty(property)

  判断对象是否有某个特定的属性。必须用字符串指定该属性。

  (例如，o.hasOwnProperty("name"))

- IsPrototypeOf(object)

  判断该对象是否为另一个对象的原型。

- PropertyIsEnumerable

  判断给定的属性是否可以用for...in语句进行枚举。

- ToString()

  返回对象的原始字符串表示。对于Object对象，ECMA-262没有定义这个值，所以不同的ECMAScript实现具有不同的值。

- ValueOf()

  返回最适合该对象的原始值。对于许多对象，该方法返回的值都与ToString()的返回值相同。

注释：上面列出的每种属性和方法都会被其他对象覆盖。





#### Boolean 对象

---

Boolean对象是Boolean原始类型的引用类型。

要创建Boolean对象，只需要传递Boolean值作为参数

1. Boolean对象将覆盖Object对象的ValueOf()方法，返回原始值，即true和false。

2. ToString()方法也会被覆盖，返回字符串"true"或"false"。

!> 注意：虽然你应该了解Boolean对象的可用性，不过最好还是使用Boolean原始值，避免发生这一节提到的问题。







#### Number 对象

---

Number对象是Number原始类型的引用类型

要得到数字对象的Number原始值，只需要使用valueOf()方法：

```js
var iNumber = oNumberObject.valueOf();
```



?> 所有特殊值都是Number对象的静态属性



##### toFixed() 方法

toFixed()方法返回的是具有指定位数小数的数字的字符串表示

##### toExponential() 方法

与格式化数字相关的另一个方法是toExponential()，它返回的是用科学计数法表示的数字的字符串形式。



##### toPrecision() 方法

toPrecision()方法根据最有意义的形式来返回数字的预定形式或指数形式。它有一个参数，即用于表示数的数字总数（不包括指数）。

```js
var oNumberObject = new Number(68);
alert(oNumberObject.toPrecision(1));  //输出 "7e+1"

alert(oNumberObject.toPrecision(2));  //输出 "68"

alert(oNumberObject.toPrecision(3));  //输出 "68.0"
```

!> toFixed()、toExponential()和toPrecision()方法都会进行舍入操作，以便用正确的小数位数正确地表示一个数。

?> 与Boolean对象相似，Number对象也很重要，不过应该少用这种对象，以避免潜在的问题。只要可能，都使用数字的原始表示法。



#### String 对象

---

String对象的valueOf()方法和toString()方法都会返回String类型的原始值

##### length 属性

String对象具有属性length，它是字符串中的字符个数：

##### charAt() 和 charCodeAt() 方法

两个方法都有一个参数，即要操作的字符的位置

charAt()方法返回的是包含指定位置处的字符的字符串,

如果想得到的不是字符，而是字符代码，那么可以调用charCodeAt()方法：

```js
var oStringObject = new String("hello world");
alert(oStringObject.charAt(1));	//输出 "e"

alert(oStringObject.charCodeAt(1));	//输出 "101"
```

##### concat() 方法

接下来是concat()方法，用于把一个或多个字符串连接到String对象的原始值上

该方法返回的是String原始值，保持原始的String对象不变

```js
var oStringObject = new String("hello ");
var sResult = oStringObject.concat("world");
alert(sResult);		//输出 "hello world"
alert(oStringObject);	//输出 "hello "
```



##### indexOf() 和 lastIndexOf() 方法

`indexOf()`和`lastIndexOf()`方法返回的都是指定的子串在另一个字符串中的位置，如果没有找不到子串，则返回-1

```js
var oStringObject = new String("hello world!");
alert(oStringObject.indexOf("o"));		输出 "4"
alert(oStringObject.lastIndexOf("o"));	输出 "7"
```





##### localeCompare() 方法

对字符串进行排序。该方法有一个参数 - 要进行比较的字符串，返回的是下列三个值之一：

- 如果String对象按照字母顺序排在参数中的字符串之前，返回负数。
- 如果String对象等于参数中的字符串，返回0
- 如果String对象按照字母顺序排在参数中的字符串之后，返回正数。

```js
var oStringObject = new String("yellow");
alert(oStringObject.localeCompare("brick"));		//输出 "1"
alert(oStringObject.localeCompare("yellow"));		//输出 "0"
alert(oStringObject.localeCompare("zoo"));		//输出 "-1"
```

?> 如果返回负数，那么最常见的是-1，不过真正返回的是由实现决定的。如果返回正数，那么同样的，最常见的是1，不过真正返回的是由实现决定的

```js
//改进
var oStringObject1 = new String("yellow");
var oStringObject2 = new String("brick");

var iResult = oStringObject1.localeCompare(oStringObject2);

if(iResult < 0) {
  alert(oStringObject1 + " comes before " + oStringObject2);
} else if (iResult > 0) {
  alert(oStringObject1 + " comes after " + oStringObject2);
} else {
  alert("The two strings are equal");
}
```

?> 在美国，英语是ECMAScript实现的标准语言，localeCompare()是区分大小写的，大写字母在字母顺序上排在小写字母之后。不过，在其他区域，情况可能并非如此



##### slice() 和 substring()

ECMAScript提供了两种方法从子串创建字符串值，即slice()和substring()

这两种方法返回的都是要处理的字符串的子串，都接受一个或两个参数:第一个参数是要获取的子串的起始位置，第二个参数（如果使用的话）是要获取子串终止前的位置（也就是说，获取终止位置处的字符不包括在返回的值内）。如果省略第二个参数，终止位就默认为字符串的长度。



?> 与concat()方法一样，slice()和substring()方法都不改变String对象自身的值。它们只返回原始的String值，保持String对象不变。



?> 对于负数参数，slice()方法会用字符串的长度加上参数，substring()方法则将其作为0处理（也就是说将忽略它）



##### toLowerCase()、toLocaleLowerCase()、toUpperCase() 和 toLocaleUpperCase()

最后一套要讨论的方法涉及大小写转换。有4种方法用于执行大小写转换，即

- toLowerCase()
- toLocaleLowerCase()
- toUpperCase()
- toLocaleUpperCase()

从名字上可以看出它们的用途，前两种方法用于把字符串转换成全小写的，后两种方法用于把字符串转换成全大写的。



!> 记住，String对象的所有属性和方法都可应用于String原始值上，因为它们是伪对象。



#### instanceof 运算符

----

在使用typeof运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回"object"。

ECMAScript引入了另一个Java运算符instanceof来解决这个问题。

instanceof运算符与typeof运算符相似，用于识别正在处理的对象的类型。与typeof方法不同的是，instanceof方法要求开发者明确地确认对象为某特定类型。