### 对象扩展 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

#### 属性名表达式

```js
let lastWord = 'last word';


const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};


a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

表达式还可以用于定义方法名。

```js
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};


obj.hello() // hi
```

!> 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串 [object Object] ，这一点要特别小心。

####  方法的 name 属性

函数的`name`属性，返回`函数名`。对象方法也是函数，因此也有 name 属性。

```js
const person = {
  sayName() {
    console.log('hello!');
  },
};


person.sayName.name   // "sayName"
```

如果对象的方法使用了取值函数（ getter ）和存值函数（ setter ），则 name 属性不是在该方法上面，而是该方法的属性的描述对象的 get 和 set 属性上面，返回值是方法名前加上 get 和 set 

```js
const obj = {
  get foo() {},
  set foo(x) {}
};


obj.foo.name
// TypeError: Cannot read property 'name' of undefined


const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');


descriptor.get.name // "get foo"
descriptor.set.name // "set foo"
```

?> 有两种特殊情况： bind 方法创造的函数， name 属性返回 bound 加上原函数的名字； <br>Function 构造函数创造的函数， name 属性返回 anonymous 。

```javascript
(new Function()).name // "anonymous"


var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```

如果对象的方法是一个 Symbol 值，那么 name 属性返回的是这个 Symbol 值的描述。

```javascript
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
  [key1]() {},
  [key2]() {},
};
obj[key1].name // "[description]"
obj[key2].name // ""
```

---

### 属性的可枚举性和遍历

##### 可枚举性

对象的每个属性都有一个`描述对象`（Descriptor），用来控制该属性的行为。 `Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。

目前，有四个操作会忽略 enumerable 为 false 的属性。



- for...in 循环：只遍历对象自身的和继承的可枚举的属性。
- Object.keys() ：返回对象自身的所有可枚举的属性的键名。
- JSON.stringify() ：只串行化对象自身的可枚举的属性。
- Object.assign() ： 忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举的属性。



?> ES6 规定，所有 Class 的原型的方法都是不可枚举的。

```js
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
```

!> 总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用 for...in 循环，而用 Object.keys() 代替。



##### 属性的遍历

ES6 一共有`5 种`方法可以遍历对象的属性。

**（1）for...in**

for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

**（2）Object.keys(obj)**

Object.keys 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

**（3）Object.getOwnPropertyNames(obj)**

Object.getOwnPropertyNames 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

**（4）Object.getOwnPropertySymbols(obj)**

Object.getOwnPropertySymbols 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

**（5）Reflect.ownKeys(obj)**

Reflect.ownKeys 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的`键名`，都遵守同样的属性遍历的次序规则。



- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

```js
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

### super 关键字

`this`关键字总是指向函数所在的`当前对象`，ES6 又新增了另一个类似的关键字 `super` ，指向当前对象的`原型对象`。

```javascript
const proto = {
  foo: 'hello'
};


const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};


Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

上面代码中，对象 `obj.find()`方法之中，通过 `super.foo`引用了原型对象`proto` 的 `foo` 属性。

!> 注意， super 关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。



```javascript
// 报错
const obj = {
  foo: super.foo
}


// 报错
const obj = {
  foo: () => super.foo
}


// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
```

上面三种 super 的用法都会报错，因为对于 JavaScript 引擎来说，这里的 super 都没有用在对象的方法之中。第一种写法是 super 用在属性里面，第二种和第三种写法是 super 用在一个函数里面，然后赋值给 foo 属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。

JavaScript 引擎内部， `super.foo`等同于 Object.getPrototypeOf(this).foo （属性）或 Object.getPrototypeOf(this).foo.call(this) （方法）。







#### 对象的扩展运算符

《[ES6 数组扩展](zh-cn/javascript/es/es6-数组扩展)》一章中，已经介绍过扩展运算符（ ... ）。ES2018 将这个运算符引入了对象。

##### 解构赋值

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

由于解构赋值要求等号右边是一个对象，所以如果等号右边是 undefined 或 null ，就会报错，因为它们无法转为对象。

```javascript
let { ...z } = null; // 运行时错误
let { ...z } = undefined; // 运行时错误
```

解构赋值必须是最后一个参数，否则会报错。

```javascript
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误
```

!> 注意，`解构赋值`的拷贝是`浅拷贝`，即如果一个键的值是`复合类型`的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的`引用`，而不是这个值的副本。

```javascript
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```

扩展运算符的解构赋值，不能复制继承自原型对象的属性。

```javascript
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined
```

##### 扩展运算符

对象的`扩展运算符`（ ... ）用于取出参数对象的所有`可遍历`属性，拷贝到当前对象之中

```javascript
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

//Array
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}
```

如果扩展运算符后面是一个空对象，则没有任何效果。

```javascript
{...{}, a: 1}
// { a: 1 }
```

如果扩展运算符后面不是对象，则会自动将其转为对象。

```javascript
// 等同于 {...Object(1)}
{...1} // {}
```

?> 会自动转为数值的包装对象 Number{1} 。由于该对象没有自身属性，所以返回一个空对象。

```javascript
// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}
```

!> 如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。

```javascript
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}
```

对象的扩展运算符等同于使用 `Object.assign()` 方法。

```javascript
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```

如果想**完整克隆一个对象**，还拷贝对象原型的属性，可以采用下面的写法。

```javascript
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二  推荐
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三 推荐
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```

**合并两个对象**。

```javascript
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
```

扩展运算符的参数对象之中，如果有取值函数 get ，这个函数是会执行的。

```javascript
let a = {
  get x() {
    throw new Error('not throw yet');
  }
}
let aWithXGetter = { ...a }; // 报错
```



---

#### 链判断运算符

在实际编程中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。比如，要读取 message.body.user.firstName ，安全的写法是写成下面这样。



```javascript
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
```

或者使用三元运算符 ?: ，判断一个对象是否存在。



```javascript
const fooInput = myForm.querySelector('input[name=foo]')
const fooValue = fooInput ? fooInput.value : undefined
```

这样的层层判断非常麻烦，因此 [ES2020](https://github.com/tc39/proposal-optional-chaining) 引入了“链判断运算符”（optional chaining operator） ?. ，简化上面的写法。

```javascript
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value
```

?> 上面代码使用了` ?. `运算符，直接在链式调用的时候判断，左侧的对象是否为 `null` 或 `undefined` 。如果是的，就不再往下运算，而是返回 `undefined` 。

**链判断运算符有三种用法:**

- `obj?.prop` // 对象属性
- `obj?.[expr] `// 同上
- `func?.(...args) `// 函数或对象方法的调用

下面是判断对象方法是否存在，如果存在就立即执行的例子。

```javascript
iterator.return?.()
```

下面是这个运算符常见的使用形式，以及不使用该运算符时的等价形式。

```javascript
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()
//如果 a?.b() 里面的 a.b 不是函数，不可调用，那么 a?.b() 是会报错的


a?.()
// 等同于
a == null ? undefined : a()
//如果 a 不是 null 或 undefined ，但也不是函数，那么 a?.() 会报错。
```

**使用这个运算符，有几个注意点:**

（1）短路机制



```javascript
a?.[++x]
// 等同于
a == null ? undefined : a[++x]
```

上面代码中，如果 a 是 undefined 或 null ，那么 x 不会进行递增运算。也就是说，链判断运算符一旦为真，右侧的表达式就不再求值。

（2）delete 运算符



```javascript
delete a?.b
// 等同于
a == null ? undefined : delete a.b
```

上面代码中，如果 a 是 undefined 或 null ，会直接返回 undefined ，而不会进行 delete 运算。

（3）括号的影响

如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响。



```javascript
(a?.b).c
// 等价于
(a == null ? undefined : a.b).c
```

上面代码中， ?. 对圆括号外部没有影响，不管 a 对象是否存在，圆括号后面的 .c 总是会执行。

一般来说，使用 ?. 运算符的场合，不应该使用圆括号

（4）报错场合

以下写法是禁止的，会报错。



```javascript
// 构造函数
new a?.()
new a?.b()


// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`


// 链判断运算符的左侧是 super
super?.()
super?.foo


// 链运算符用于赋值运算符左侧
a?.b = c
```

（5）右侧不得为十进制数值

为了保证兼容以前的代码，允许 foo?.3:0 被解析成 foo ? .3 : 0 ，因此规定如果 ?. 后面紧跟一个十进制数字，那么 ?. 不再被看成是一个完整的运算符，而会按照三元运算符进行处理，也就是说，那个小数点会归属于后面的十进制数字，形成一个小数。



---

####  Null 判断运算符

读取对象属性的时候，如果某个属性的值是 null 或 undefined ，有时候需要为它们指定默认值。常见做法是通过 || 运算符指定默认值。



```javascript
const headerText = response.settings.headerText || 'Hello, world!';
const animationDuration = response.settings.animationDuration || 300;
const showSplashScreen = response.settings.showSplashScreen || true;
```

上面的三行代码都通过 || 运算符指定默认值，但是这样写是错的。开发者的原意是，只要属性的值为 null 或 undefined ，默认值就会生效，但是属性的值如果为空字符串或 false 或 0 ，默认值也会生效。

为了避免这种情况，[ES2020](https://github.com/tc39/proposal-nullish-coalescing) 引入了一个新的 Null 判断运算符 ?? 。它的行为类似 || ，但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值。

```javascript
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;
```

上面代码中，默认值只有在属性值为 null 或 undefined 时，才会生效。

这个运算符的一个目的，就是跟链判断运算符 ?. 配合使用，为 null 或 undefined 的值设置默认值。

```javascript
const animationDuration = response.settings?.animationDuration ?? 300;
```

这个运算符很适合判断函数参数是否赋值。



```javascript
function Component(props) {
  const enable = props.enabled ?? true;
  // …
}
```

?> ?? 有一个运算优先级问题，它与 && 和 || 的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错。

~~~javascript
(lhs && middle) ?? rhs;
lhs && (middle ?? rhs);


(lhs ?? middle) && rhs;
lhs ?? (middle && rhs);


(lhs || middle) ?? rhs;
lhs || (middle ?? rhs);


(lhs ?? middle) || rhs;
lhs ?? (middle || rhs);
```ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
~~~



### ES6 对象的新增方法

#### Object.is()

ES6 提出`“Same-value equality”`（同值相等）算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。



```javascript
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
```

不同之处只有两个：一是 +0 不等于 -0 ，二是 NaN 等于自身。

```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

ES5 可以通过下面的代码，部署 Object.is 。

```javascript
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```

####  Object.assign()

##### 基本用法

`Object.assign`方法用于对象的合并，将`源对象`（source）的所有`可枚举`属性，复制到目标对象（target）。



```javascript
const target = { a: 1 };


const source1 = { b: 2 };
const source2 = { c: 3 };


Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

Object.assign 方法的第一个参数是目标对象，后面的参数都是源对象。

!> 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

由于 undefined 和 null 无法转成对象，所以如果它们作为参数，就会报错。



```javascript
Object.assign(undefined) // 报错
Object.assign(null) // 报错
```

如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果 undefined 和 null 不在首参数，就不会报错。



```javascript
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
```

?> Object.assign 拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝`不可枚举`的属性（ enumerable: false ）。

##### 注意点

**（1）浅拷贝**

`Object.assign`方法实行的是`浅拷贝`，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
