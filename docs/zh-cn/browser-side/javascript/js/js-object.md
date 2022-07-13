### JavaScript Object 对象 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### 构造器

!> 通过 new Object()的写法生成新对象，与字面量的写法 o = {}是等价的。

---



#### 部署方法

<!-- tabs:start -->

##### **部署在`Object`对象本身**

```js
Object.print = function (o) {
  console.log(o)
}

var o = new Object()

Object.print(o)
// Object
```

##### **部署在`Object.prototype`对象**

所有构造函数都有一个prototype属性，指向一个原型对象

```js
Object.prototype.print = function(){ console.log(this)};

var o = new Object();

o.print() // Object
```

<!-- tabs:end -->

---

#### Object()

`Object`本身当作工具方法使用时，可以将任意值转为对象。这个方法常用于保证某个值一定是对象。

如果参数是原始类型的值，`Object`方法返回对应的包装对象的实例

#### Object 对象的静态方法

所谓“静态方法”，是指部署在`Object`对象自身的方法

##### Object.keys()，Object.getOwnPropertyNames()

`Object.keys`方法和`Object.getOwnPropertyNames`方法很相似，一般用来遍历对象的属性。它们的参数都是一个对象，都返回一个数组，该数组的成员都是对象自身的（而不是继承的）所有属性名。它们的区别在于，`Object.keys`方法只返回可枚举的属性（关于可枚举性的详细解释见后文），`Object.getOwnPropertyNames`方法还返回不可枚举的属性名。

```js
var a = ["Hello", "World"];

Object.keys(a)
// ["0", "1"]

Object.getOwnPropertyNames(a)
// ["0", "1", "length"]
```

由于JavaScript没有提供计算对象属性个数的方法，所以可以用这两个方法代替。

```js
Object.keys(a).length
Object.getOwnPropertyNames(a).length
```

?> 一般情况下，几乎总是使用`Object.keys`方法，遍历数组的属性



##### 其他方法



除了上面提到的方法，`Object`还有不少其他方法，将在后文逐一详细介绍。

**（1）对象属性模型的相关方法**

- `Object.getOwnPropertyDescriptor()`：获取某个属性的`attributes`对象。
- `Object.defineProperty()`：通过`attributes`对象，定义某个属性。
- `Object.defineProperties()`：通过`attributes`对象，定义多个属性。
- `Object.getOwnPropertyNames()`：返回直接定义在某个对象上面的全部属性的名称。

**（2）控制对象状态的方法**

- `Object.preventExtensions()`：防止对象扩展。
- `Object.isExtensible()`：判断对象是否可扩展。
- `Object.seal()`：禁止对象配置。
- `Object.isSealed()`：判断一个对象是否可配置。
- `Object.freeze()`：冻结一个对象。
- `Object.isFrozen()`：判断一个对象是否被冻结。

**（3）原型链相关方法**

- `Object.create()`：该方法可以指定原型对象和属性，返回一个新的对象。
- `Object.getPrototypeOf()`：获取对象的`Prototype`对象。



#### Object对象的实例方法

除了`Object`对象本身的方法，还有不少方法是部署在`Object.prototype`对象上的，所有`Object`的实例对象都继承了这些方法。

`Object`实例对象的方法，主要有以下六个。

- `valueOf()`：返回当前对象对应的值。
- `toString()`：返回当前对象对应的字符串形式。
- `toLocaleString()`：返回当前对象对应的本地字符串形式。
- `hasOwnProperty()`：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
- `isPrototypeOf()`：判断当前对象是否为另一个对象的原型。
- `propertyIsEnumerable()`：判断某个属性是否可枚举。

本节介绍前两个方法，其他方法将在后文相关章节介绍。

##### toString()的应用：判断数据类型

`Object.prototype.toString`方法返回对象的类型字符串，因此可以用来判断一个值的类型。

通过函数的`call`方法，可以在任意值上调用`Object.prototype.toString`方法，帮助我们判断这个值的类型。

```js
Object.prototype.toString.call(value)
```

不同数据类型的`Object.prototype.toString`方法返回值如下。

- 数值：返回`[object Number]`。
- 字符串：返回`[object String]`。
- 布尔值：返回`[object Boolean]`。
- undefined：返回`[object Undefined]`。
- null：返回`[object Null]`。
- 数组：返回`[object Array]`。
- arguments对象：返回`[object Arguments]`。
- 函数：返回`[object Function]`。
- Error对象：返回`[object Error]`。
- Date对象：返回`[object Date]`。
- RegExp对象：返回`[object RegExp]`。
- 其他对象：返回`[object Object]`。

也就是说，`Object.prototype.toString`可以得到一个实例对象的构造函数。



利用这个特性，可以写出一个比`typeof`运算符更准确的类型判断函数

```js
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"

//在上面这个type函数的基础上，还可以加上专门判断某种类型数据的方法。

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp',
 'NaN',
 'Infinite'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
```

