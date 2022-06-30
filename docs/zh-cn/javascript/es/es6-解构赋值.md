### 解构赋值 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

---

##### 数组解构赋值

?> 只要某种数据结构具有`Iterator`接口，都可以采用数组形式的解构赋值。

##### **默认值**

注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于 undefined，默认值才会生效。

```js
let [x = 1] = [undefined]
x // 1

let [x = 1] = [null]
x // null
```

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值

```js
function f() {
  console.log('aaa')
}
let [x = f()] = [1]

//等价于
let x
if ([1][0] === undefined) {
  x = f()
} else {
  x = [1][0]
}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

```js
let [x = 1, y = x] = [] // x=1; y=1
let [x = 1, y = x] = [2] // x=2; y=2
let [x = 1, y = x] = [1, 2] // x=1; y=2
let [x = y, y = 1] = [] // ReferenceError: y is not defined
```

##### 函数参数的解构赋值

```js
;[
  [1, 2],
  [3, 4],
].map(([a, b]) => a + b)
// [ 3, 7 ]
```

`函数参数`的`解构`也可以使用`默认值`。

```js
function move({ x = 0, y = 0 } = {}) {
  return [x, y]
}

move({ x: 3, y: 8 }) // [3, 8]
move({ x: 3 }) // [3, 0]
move({}) // [0, 0]
move() // [0, 0]
```

`undefined`就会触发函数参数的默认值。

```js
;[1, undefined, 3].map((x = 'yes') => x)
// [ 1, 'yes', 3 ]
```

##### 用途

```js
//1.交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];


//2.从函数返回多个值
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();


//3.函数参数的定义
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});

//4.提取 JSON 数据
//5.函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};

//6.遍历 Map 结构
//任何部署了 Iterator 接口的对象，都可以用for...of循环遍历
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');


for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
  // ...
}


// 获取键值
for (let [,value] of map) {
  // ...
}



//7.输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");





```
