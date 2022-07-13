### JavaScript 属性描述对象 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

JavaScript提供了一个内部数据结构，用来描述一个对象的属性的行为，控制它的行为。这被称为“属性描述对象”（attributes object）。

每个属性都有自己对应的属性描述对象，保存该属性的一些元信息

```js
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

属性描述对象提供6个元属性。

1. `value`:存放该属性的属性值，默认为`undefined`。
2. `writable`存放一个布尔值，表示属性值（value）是否可改变，默认为`true`。
3. `enumerable`存放一个布尔值，表示该属性是否可枚举，默认为`true`。如果设为`false`，会使得某些操作（比如`for...in`循环、`Object.keys()`）跳过该属性。
4. `configurable`存放一个布尔值，表示“可配置性”，默认为`true`。如果设为`false`，将阻止某些操作改写该属性，比如，无法删除该属性，也不得改变该属性的属性描述对象（`value`属性除外）。也就是说，`configurable`属性控制了属性描述对象的可写性。
5. `get`存放一个函数，表示该属性的取值函数（getter），默认为`undefined`。
6. `set`存放一个函数，表示该属性的存值函数（setter），默认为`undefined`。







#### Object.getOwnPropertyDescriptor()

`Object.getOwnPropertyDescriptor`方法可以读出对象自身属性的属性描述对象。

```js
var o = { p: 'a' };

Object.getOwnPropertyDescriptor(o, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

上面代码表示，使用`Object.getOwnPropertyDescriptor`方法，读取`o`对象的`p`属性的属性描述对象。

#### Object.defineProperty()，Object.defineProperties()

1. `Object.defineProperty`方法允许通过定义属性描述对象，来定义或修改一个属性，然后返回修改后的对象。它的格式如下。

```js
Object.defineProperty(object, propertyName, attributesObject)
```

2. 上面代码中，`Object.defineProperty`方法接受三个参数，第一个是属性所在的对象，第二个是属性名（它应该是一个字符串），第三个是属性的描述对象。比如，新建一个`o`对象，并定义它的`p`属性，写法如下。

```js
var o = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false
});

o.p
// 123

o.p = 246;
o.p
// 123
// 因为writable为false，所以无法改变该属性的值
```

如果属性已经存在，`Object.defineProperty`方法相当于更新该属性的属性描述对象。

!> 需要注意的是，`Object.defineProperty`方法和后面的`Object.defineProperties`方法，都有性能损耗，会拖慢执行速度，不宜大量使用。

3. 如果一次性定义或修改多个属性，可以使用`Object.defineProperties`方法。

```js
var o = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});

o.p1 // 123
o.p2 // "abc"
o.p3 // "123abc"
```

!> 需要注意的是，一旦定义了取值函数`get`（或存值函数`set`），就不能将`writable`设为`true`，或者同时定义`value`属性，会报错。

```js
var o = {};

Object.defineProperty(o, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value,
```

4. `Object.defineProperty()`和`Object.defineProperties()`的第三个参数，是一个属性对象。它的`writable`、`configurable`、`enumerable`这三个属性的默认值都为`false`。

?> `writable`属性默认为`false`，导致无法对`p`属性重新赋值，但是不会报错（严格模式下会报错）

5. `configurable`属性为`false`，将无法删除该属性，也无法修改`attributes`对象（`value`属性除外）。

6. `enumerable`属性为`false`，表示对应的属性不会出现在`for...in`循环和`Object.keys`方法中。



---

#### 元属性

属性描述对象的属性，被称为“元属性”，因为它可以看作是控制属性的属性。

##### 可枚举性（enumerable）

如果一个属性的`enumerable`为`false`，下面三个操作不会取到该属性。

- `for..in`循环
- `Object.keys`方法
- `JSON.stringify`方法



?> 基本上，JavaScript原生提供的属性都是不可枚举的，用户自定义的属性都是可枚举的。

?> 如果需要获取对象自身的所有属性，不管是否可枚举，可以使用`Object.getOwnPropertyNames`方法

##### 可配置性（configurable）

可配置性（configurable）决定了是否可以修改属性描述对象。也就是说，当`configurable`为`false`的时候，`value`、`writable`、`enumerable`和`configurable`都不能被修改了。

```js
var o = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(o,'p', {value: 2})
// TypeError: Cannot redefine property: p

Object.defineProperty(o,'p', {writable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(o,'p', {enumerable: true})
// TypeError: Cannot redefine property: p

Object.defineProperties(o,'p',{configurable: true})
// TypeError: Cannot redefine property: p
```

!> `writable`只有在从`false`改为`true`会报错，从`true`改为`false`则是允许的。

?> 至于`value`，只要`writable`和`configurable`有一个为`true`，就允许改动

?> `configurable`为`false`时，直接对该属性赋值，不报错，但不会成功。

?> 当使用`var`命令声明变量时，变量的`configurable`为`false`<br>而不使用`var`命令声明变量时（或者使用属性赋值的方式声明变量），变量的可配置性为`true`

##### 可写性（writable）

可写性（writable）决定了属性的值（value）是否可以被改变。

?> 正常模式下，对可写性为`false`的属性赋值不会报错，只会默默失败。但是，严格模式下会报错，即使是对`a`属性重新赋予一个同样的值。

关于可写性，还有一种特殊情况。就是如果原型对象的某个属性的可写性为`false`，那么派生对象将无法自定义这个属性。

```js
var proto = Object.defineProperty({}, 'foo', {
  value: 'a',
  writable: false
});

var o = Object.create(proto);

o.foo = 'b';
o.foo // 'a'
```

面代码中，对象`proto`的`foo`属性不可写，结果`proto`的派生对象`o`，也不可以再自定义这个属性了。在严格模式下，这样做还会抛出一个错误。但是，有一个规避方法，就是通过覆盖属性描述对象，绕过这个限制，原因是这种情况下，原型链会被完全忽视。

```js
Object.defineProperty(o, 'foo', {
  value: 'b'
});

o.foo // 'b'
```





---

#### Object.getOwnPropertyNames()

`Object.getOwnPropertyNames`方法返回直接定义在某个对象上面的全部属性的名称，而不管该属性是否可枚举。

?> 一般来说，系统原生的属性（即非用户自定义的属性）都是不可枚举的。

```js
// 比如，数组实例自带length属性是不可枚举的
Object.keys([]) // []
Object.getOwnPropertyNames([]) // [ 'length' ]

// Object.prototype对象的自带属性也都是不可枚举的
Object.keys(Object.prototype) // []
Object.getOwnPropertyNames(Object.prototype)
// ['hasOwnProperty',
//  'valueOf',
//  'constructor',
//  'toLocaleString',
//  'isPrototypeOf',
//  'propertyIsEnumerable',
//  'toString']
```

---



#### Object.prototype.propertyIsEnumerable()

对象实例的`propertyIsEnumerable`方法用来判断一个属性是否可枚举。

```js
var o = {};
o.p = 123;

o.propertyIsEnumerable('p') // true
o.propertyIsEnumerable('toString') // false
```





---

#### 存取器（accessor）

除了直接定义以外，属性还可以用存取器（accessor）定义。其中，存值函数称为`setter`，使用`set`命令；取值函数称为`getter`，使用`get`命令。

!> 注意，取值函数Getter不能接受参数，存值函数Setter只能接受一个参数（即属性的值）。

!> 另外，对象也不能有与取值函数同名的属性

存取器往往用于，属性的值需要依赖对象内部数据的场合。

```js
var o ={
  $n : 5,
  get next() { return this.$n++ },
  set next(n) {
    if (n >= this.$n) this.$n = n;
    else throw '新的值必须大于当前值';
  }
};

o.next // 5

o.next = 10;
o.next // 10
```

存取器也可以通过`Object.defineProperty`定义。

```js
var d = new Date();

Object.defineProperty(d, 'month', {
  get: function () {
    return d.getMonth();
  },
  set: function (v) {
    d.setMonth(v);
  }
});
```

存取器也可以使用`Object.create`方法定义。

```js
var o = Object.create(Object.prototype, {
  foo: {
    get: function () {
      return 'getter';
    },
    set: function (value) {
      console.log('setter: '+value);
    }
  }
});
```

##### 对象的拷贝

```js
var extend = function (to, from) {
  for (var property in from) {
    var descriptor = Object.getOwnPropertyDescriptor(from, property);

    if (descriptor && ( !descriptor.writable
      || !descriptor.configurable
      || !descriptor.enumerable
      || descriptor.get
      || descriptor.set)) {
      Object.defineProperty(to, property, descriptor);
    } else {
      to[property] = from[property];
    }
  }
}
```

上面的这段代码，可以很好地拷贝对象所有可遍历（enumerable）的属性。

---

#### 控制对象状态

JavaScript提供了三种方法，精确控制一个对象的读写状态，防止对象被改变。最弱一层的保护是`Object.preventExtensions`，其次是`Object.seal`，最强的`Object.freeze`。

##### Object.preventExtensions()

`Object.preventExtensions`方法可以使得一个对象无法再添加新的属性。

```js
var o = new Object();

Object.preventExtensions(o);

Object.defineProperty(o, 'p', {
  value: 'hello'
});
// TypeError: Cannot define property:p, object is not extensible.

o.p = 1;
o.p // undefined

```

?> 对于使用了`preventExtensions`方法的对象，可以用`delete`命令删除它的现有属性

##### Object.isExtensible()

`Object.isExtensible`方法用于检查一个对象是否使用了`Object.preventExtensions`方法。也就是说，检查是否可以为一个对象添加属性。

```js
var o = new Object();

Object.isExtensible(o) // true
Object.preventExtensions(o);
Object.isExtensible(o) // false
```

##### Object.seal()

`Object.seal`方法使得一个对象既无法添加新属性，也无法删除旧属性。

```js
var o = {
  p: 'hello'
};

Object.seal(o);

delete o.p;
o.p // "hello"

o.x = 'world';
o.x // undefined
```

##### Object.isSealed()

`Object.isSealed`方法用于检查一个对象是否使用了`Object.seal`方

##### Object.freeze()

`Object.freeze`方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。

```js
var o = {
  p: 'hello'
};

Object.freeze(o);

o.p = 'world';
o.p // hello

o.t = 'hello';
o.t // undefined
```

##### Object.isFrozen()

`Object.isFrozen`方法用于检查一个对象是否使用了`Object.freeze()`方法。

##### 局限性

需要注意的是，使用上面这些方法锁定对象的可写性，但是依然可以通过改变该对象的原型对象，来为它增加属性。

```js
var obj = new Object();
Object.preventExtensions(o);

var proto = Object.getPrototypeOf(obj);
proto.t = 'hello';
obj.t
// hello
```

一种解决方案是，把原型也冻结住。

```js
var obj = Object.seal(
  Object.create(
    Object.freeze({x: 1}),
    {
      y: {
        value: 2,
        writable: true
      }
    }
  )
);

Object.getPrototypeOf(obj).t = "hello";
obj.hello // undefined
```

另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。

```js
var obj = {
  foo: 1,
  bar: ['a', 'b']
};
Object.freeze(obj);

obj.bar.push('c');
obj.bar // ["a", "b", "c"]
```

