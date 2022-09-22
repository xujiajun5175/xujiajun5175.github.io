
# Vue3 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

!> 默认使用组合式API

<!-- ### 相应式系统

> Vue 最标志性的功能就是其低侵入性的响应式系统。<br> 组件状态都是由响应式的 JavaScript 对象组成的。<br>当更改它们时，视图会随即自动更新。<br>

#### 响应式术语

- 副作用(作用,effect): 更改程序里的状态的函数
- 依赖(dependency): 被用来执行作用的值.作用也可以说是一个它依赖的订阅者 (subscriber)。
- 魔法函数 :能够在依赖变化时调用函数 (产生作用)。
  - 变量被读取时进行追踪
  - 如果一个变量在当前运行的副作用中被读取了，就将该副作用设为此变量的一个订阅者
  - 探测一个变量的变化。例如当我们给 A0 赋了一个新的值后，应该通知其所有订阅了的副作用重新执行。 -->

## 基础

### 相应式系统

#### 声明响应式状态

?> `reactive()` : 创建一个响应式对象或数组

---

### 列表渲染

#### `v-for` 遍历数组

```js
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

```html
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

- 第一个参数是数组项
- 第二个参数是索引

使用 of 作为分隔符来替代 in，这更接近 JavaScript 的迭代器语法

```js
<div v-for="item of items"></div>
```

---

#### `v-for` 遍历对象

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

```html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

- 第一个参数是值
- 第二个参数是键
- 第三个参数是位置索引

---

#### `v-for` 使用范围值

`v-for`可以直接接受一个整数值。在这种用例中，会将该模板基于 1...n 的取值范围重复多次。

```html
<span v-for="n in 10">{{ n }}</span>
```

!> 注意此处 n 的初值是从 1 开始而非 0。

---

#### `<template>`上的 `v-for`

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

---

#### 数组变化侦测

Vue 能够侦听响应式数组的变更方法，并在它们被调用时触发相关的更新。这些变更方法包括：

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

!> 在计算属性中使用 reverse() 和 sort() 的时候务必小心！这两个方法将变更原始数组，计算函数中不应该这么做。

---

### 事件处理

#### 监听事件

使用 `v-on` 指令 (简写为 `@`) 来监听 DOM 事件

---

#### 内联事件处理器

```js
const count = ref(0)
```

```html
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

---

#### 方法事件处理器

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}
```

---

```html
<!-- `greet` 是上面定义过的方法名 -->
<button @click="greet">Greet</button>
```

?> 我们能够通过被触发事件的 event.target.tagName 访问到该 DOM 元素。

---

#### 在内联事件处理器中访问事件参数

- 特殊的 `$event` 变量

```html
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>

```

```js
function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

---

### 表单输入绑定

!> `v-model` 指令

#### 修饰符

<!-- tabs:start -->

##### **`.lazy`**

默认情况下，`v-model` 会在每次 `input` 事件后更新数据.可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据：

```html
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

##### **`.number`**

让用户输入自动转换为数字

```html
<input v-model.number="age" />
```

?> 如果该值无法被 `parseFloat()` 处理，那么将返回原始值。<br>number 修饰符会在输入框有 `type="number"` 时自动启用。

##### **`.trim`**

默认自动去除用户输入内容中两端的空格

```html
<input v-model.trim="msg" />
```

<!-- tabs:end -->

---

#### 生命周期
