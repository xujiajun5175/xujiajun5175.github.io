# Vue3 <!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

!> 默认使用组合式 API

<!-- ### 相应式系统

> Vue 最标志性的功能就是其低侵入性的响应式系统。<br> 组件状态都是由响应式的 JavaScript 对象组成的。<br>当更改它们时，视图会随即自动更新。<br>

#### 响应式术语

- 副作用(作用,effect): 更改程序里的状态的函数
- 依赖(dependency): 被用来执行作用的值.作用也可以说是一个它依赖的订阅者 (subscriber)。
- 魔法函数 :能够在依赖变化时调用函数 (产生作用)。
  - 变量被读取时进行追踪
  - 如果一个变量在当前运行的副作用中被读取了，就将该副作用设为此变量的一个订阅者
  - 探测一个变量的变化。例如当我们给 A0 赋了一个新的值后，应该通知其所有订阅了的副作用重新执行。 -->

## **基础**

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
  publishedAt: '2016-04-10',
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
<button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>

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

### 生命周期

---

### 组件基础

#### 定义组件

?> 编写 SFC 组件

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

---

#### 使用组件

?> 父组件引用组件

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

?> 通过 `<script setup>`，导入的组件都在模板中直接可用。

?> 在单文件组件中，推荐为子组件使用 `PascalCase` 的标签名

---

#### 传递 props

> Props 是一种特别的 attributes，你可以在组件上声明注册

!> 要用到 `defineProps` 宏

<!-- tabs:start -->

##### **`<script setup>`**

- `defineProps` 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入
- 声明的 `props` 会自动暴露给模板
- `defineProps` 会返回一个对象，其中包含了可以传递给组件的所有 `props`：

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

```js
const props = defineProps(['title'])
console.log(props.title)
```

##### **`<script>`**

不使用` <script setup>``，props ` 必须以 `props` 选项的方式声明，`props` 对象会作为 `setup()` 函数的第一个参数被传入：

```js
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  },
}
```

?> 一个组件可以有任意多的 props，默认情况下，所有 prop 都接受任意类型的值。

<!-- tabs:end -->

---

#### 监听事件

组件实例提供了一个自定义事件系统

- 父组件可以通过 `v-on` 或 `@` 来选择性地监听子组件上抛的事件
- 子组件可以通过调用内置的 `$emit` 方法，通过传入事件名称来抛出一个事件

<!-- tabs:start -->

##### **`<script setup>`**

可以通过 defineEmits 宏来声明需要抛出的事件

```js
<script setup>
  const emit = defineEmits(['enlarge-text']) emit('enlarge-text')
</script>
```

##### **`<script>`**

可以通过 `emits` 选项定义组件会抛出的事件

?> 你可以从 `setup()` 函数的第二个参数，即 `setup` 上下文对象上访问到 `emit` 函数

```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  },
}
```

<!-- tabs:end -->

---

#### 通过插槽来分配内容

通过 Vue 的自定义 `<slot>` 元素来实现：

```vue
/* 子组件 */
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

使用 `<slot>` 作为一个占位符，父组件传递进来的内容就会渲染在这里

---

#### 动态组件

通过 Vue 的 `<component>` 元素和特殊的 `is` attribute 实现的

```html
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```

在上面的例子中，被传给 `:is` 的值可以是以下几种：

- 被注册的组件名
- 导入的组件对象

?> 也可以使用 `is` attribute 来创建一般的 HTML 元素

!> 当使用 `<component :is="...">` 来在多个组件间作切换时，被切换掉的组件会被卸载

?> 可以通过 `<KeepAlive>` 组件强制被切换掉的组件仍然保持“存活”的状态

---

#### DOM 模板解析注意事项

<!-- tabs:start -->

##### **大小写区分**

> HTML 标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写

无论是 `PascalCase` 形式的组件名称、`camelCase` 形式的 `prop` 名称还是 `v-on` 的事件名称，都需要转换为相应等价的 `kebab-case` (短横线连字符) 形式

```js
// JavaScript 中的 camelCase
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `,
}
```

```html
<!-- HTML 中的 kebab-case -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```

##### **闭合标签**

Vue 的模板解析器支持任意标签使用 `/>` 作为标签关闭的标志

```html
<MyComponent />
```

在 DOM 模板中，我们必须显式地写出关闭标签：

```html
<my-component></my-component>
```

##### **元素位置限制**

> 某些 HTML 元素对于放在其中的元素类型有限制，例如 `<ul>`，`<ol>`，`<table>` 和`<select>`，相应的，某些元素仅在放置于特定元素中时才会显示，例如 `<li>`，`<tr>` 和 `<option>`。

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

自定义的组件 `<blog-post-row>` 将作为无效的内容被忽略，使用`is`attribute 作为一种解决方案：

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```

!> 当使用在原生 HTML 元素上时，`is` 的值必须加上前缀 `vue:` 才可以被解析为一个 Vue 组件

<!-- tabs:end -->

---

## **深入组件**

### 注册

#### 全局注册

全局注册虽然很方便，但有以下几个问题：

1. 全局注册，但并没有被使用的组件无法在生产打包时被自动移除 (也叫“tree-shaking”)。

2. 全局注册在大型项目中使项目的依赖关系变得不那么明确。

---

#### 局部注册

> 局部注册的组件需要在使用它的父组件中显式导入，并且只能在该父组件中使用。对 tree-shaking 更加友好

<!-- tabs:start -->

##### **`<script setup>`**

在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

##### **`<script>`**

需要使用 `components` 选项来显式注册：

```vue
<script>
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA,
  },
  setup() {
    // ...
  },
}
</script>
```

<!-- tabs:end -->

!> 请注意：局部注册的组件在后代组件中并不可用

---

#### 组件名格式

---

?> 使用 `PascalCase` 作为组件名的注册格式:

1. PascalCase 是合法的 JavaScript 标识符
2. `<PascalCase />` 在模板中更明显地表明了这是一个 Vue 组件，而不是原生 HTML 元素

?> 为了方便，Vue 支持将模板中使用 kebab-case 的标签解析为使用 PascalCase 注册的组件。<br>这意味着一个以 MyComponent 为名注册的组件，在模板中可以通过 `<MyComponent>` 或 `<my-component>` 引用

---

### Props

#### Props 声明

> 一个组件需要显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是[透传 attribute](#透传attribute)

<!-- tabs:start -->

##### **`<script setup>`**

使用 `defineProps()` 宏来声明

```js
<script setup>const props = defineProps(['foo']) console.log(props.foo)</script>
```

##### **`<script>`**

使用 [props 选项](/zh-cn/browser-side/vue/vue3/branch.md#props选项) 来声明

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo)
  },
}
```

<!-- tabs:end -->

!> 注意传递给 `defineProps()` 的参数和提供给 `props` 选项的值是相同的，两种声明方式背后其实使用的都是 `prop` 选项

---

#### 传递 prop 的细节

<!-- tabs:start -->

##### **Prop 名字格式**

如果一个 prop 的名字很长，应使用 `camelCase` 形式

```js
defineProps({
  greetingMessage: String,
})
```

```html
<span>{{ greetingMessage }}</span>
```

> 理论上你也可以在向子组件传递 props 时使用 camelCase 形式,但实际上为了和 HTML attribute 对齐，我们通常会将其写为 kebab-case 形式：

```html
<MyComponent greeting-message="hello" />
```

##### **动态 Prop**

使用 `v-bind` 或缩写 `:` 来进行动态绑定的 props

```html
<!-- 根据一个变量的值动态传入 -->
<BlogPost :title="post.title" />

<!-- 根据一个更复杂表达式的值动态传入 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

##### **传递不同的值类型**

?> 任何类型的值都可以作为 props 的值被传递

- Number
- String
- Boolean
- Array
- Object

##### **使用一个对象绑定多个 prop**

如果你想要将一个对象的所有属性都当作 props 传入，你可以使用没有参数的 `v-bind`,即只使用 `v-bind` 而非 `:prop-name`

```js
const post = {
  id: 1,
  title: 'My Journey with Vue',
}
```

```html
<BlogPost v-bind="post" />
<!-- 等价于  -->
<BlogPost :id="post.id" :title="post.title" />
```

<!-- tabs:end -->

---

#### 单向数据流

!> 所有的 props 都遵循着单向绑定原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递

!> 每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你不应该在子组件中去更改一个 prop

##### 修改 prop 的需求场景

1. prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性

最好是新定义一个局部数据属性，从 props 上获取初始值

```js
const props = defineProps(['initialCounter'])

// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter)
```

2. 需要对传入的 prop 值做进一步的转换

在这种情况中，最好是基于该 prop 值定义一个计算属性：

```js
const props = defineProps(['size'])

// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

---

#### Prop 校验

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true,
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100,
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    },
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    },
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    },
  },
})
```

!> `defineProps()` 宏中的参数不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中

- `required` : 所有 prop 默认都是可选的，除非声明了 `required: true`
- 默认值: 除 `Boolean` 外的未传递的可选 prop 将会有一个默认值 `undefined`
- `Boolean` : `Boolean` 类型的未传递 prop 将被转换为 `false`

##### 运行时类型检查

校验选项中的 type 可以是下列这些原生构造函数：

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol
- 自定义的类或构造函数

type 也可以是自定义的类或构造函数，Vue 将会通过 instanceof 来检查类型是否匹配

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

```js
defineProps({
  author: Person,
})
```

Vue 会通过 `instanceof Person` 来校验 `author` prop 的值是否是 Person 类的一个实例。

---

#### Boolean 类型转换

> 为了更贴近原生 boolean attributes 的行为，声明为 `Boolean` 类型的 props 有特别的类型转换规则

```js
defineProps({
  disabled: Boolean,
})
```

```html
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />

<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```

当一个 prop 被声明为允许多种类型时，例如：

```js
defineProps({
  disabled: [Boolean, Number],
})
```

无论声明类型的顺序如何，Boolean 类型的特殊转换规则都会被应用

---

### 事件

#### 触发与监听事件

在组件的模板表达式中，可以直接使用 $emit 方法触发自定义事件

```html
<!-- 子组件 -->
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

父组件可以通过 `v-on` (缩写为 `@`) 来监听事件：

```html
<MyComponent @some-event="callback" />
```

?> 组件的事件监听器也支持修饰符

!> 和原生 DOM 事件不一样，组件触发的事件没有冒泡机制。你只能监听直接子组件触发的事件。平级组件或是跨越多层嵌套的组件间通信，应使用一个外部的事件总线，或是使用一个[全局状态管理方案](/zh-cn/browser-side/vue/vue3/branch.md#状态管理)。

---

#### 事件参数

!> 所有传入 `$emit()`的额外参数都会被直接传向监听器。举例来说，`$emit('foo', 1, 2, 3)` 触发后，监听器函数将会收到这三个参数值。

---

#### 声明触发的事件

<!-- tabs:start -->

##### **`<script setup>`**

组件要触发的事件可以显式地通过 `defineEmits()` 宏来声明

```js
<script setup>defineEmits(['inFocus', 'submit'])</script>
```

我们在 `<template>` 中使用的 $emit 方法不能在组件的`<script setup>` 部分中使用，但 `defineEmits()` 会返回一个相同作用的函数供我们使用：

```js
<script setup>
  const emit = defineEmits(['inFocus', 'submit']) function buttonClick(){' '}
  {emit('submit')}
</script>
```

!> `defineEmits()` 宏不能在子函数中使用。如上所示，它必须直接放置在 `<script setup>` 的顶级作用域下。

##### **`<script>`**

事件需要通过 [emits](/zh-cn/browser-side/vue/vue3/branch.md#emits选项) 选项来定义

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}

/* 解构 */

export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}

```

`emits` 选项还支持对象语法，它允许我们对触发事件的参数进行验证

```js
<script setup>
const emit = defineEmits({
 submit(payload) {
   // 通过返回值为 `true` 还是为 `false` 来判断
   // 验证是否通过
 }
})
</script>
```

<!-- tabs:end -->

!> 如果一个原生事件的名字 (例如 `click`) 被定义在 `emits` 选项中，则监听器只会监听组件触发的 `click` 事件而不会再响应原生的 `click` 事件。

---

#### 事件校验

> 和对 props 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。<br>要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个布尔值来表明事件是否合法。

```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  },
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

---

#### 配合 v-model 使用

自定义事件可以用于开发支持 v-model 的自定义表单组件

`v-model` 在原生元素上的用法：

```html
<input v-model="searchText" />

<!-- 上面的代码其实等价于下面这段 (编译器会对 v-model 进行展开)： -->

<input :value="searchText" @input="searchText = $event.target.value" />
```

而当使用在一个组件上时，`v-model` 会被展开为如下的形式：

```html
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

要让这个例子实际工作起来，`<CustomInput>` 组件内部需要做两件事：

1. 将内部原生 `input` 元素的 `value` attribute 绑定到 `modelValue` prop
2. 输入新的值时在 `input` 元素上触发 `update:modelValue` 事件

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

现在 `v-model` 也可以在这个组件上正常工作了：

```html
<CustomInput v-model="searchText" />
```

另一种在组件内实现 `v-model` 的方式是使用一个可写的，同时具有 `getter` 和 `setter` 的计算属性。

- `get` 方法需返回 `modelValue` prop
- `set` 方法需触发相应的事件：

```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <input v-model="value" />
</template>
```

##### `v-model` 的参数

默认情况下，`v-model` 在组件上都是使用 `modelValue` 作为 prop，并以 `update:modelValue` 作为对应的事件

可以通过给 `v-model` 指定一个参数来更改这些名字：

```html
<MyComponent v-model:title="bookTitle" />
```

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

##### 多个 `v-model` 绑定

```html
<UserName v-model:first-name="first" v-model:last-name="last" />
```

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String,
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

##### 处理 `v-model` 修饰符

- [内置的修饰符](#修饰符)
- 自定义的修饰符

举例:创建一个自定义的修饰符 `capitalize`，它会自动将 `v-model` 绑定输入的字符串值第一个字母转为大写

```html
<MyComponent v-model.capitalize="myText" />
```

?> 组件的 `v-model` 上所添加的修饰符，可以通过 `modelModifiers` prop 在组件内访问到。

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) },
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

对于又有参数又有修饰符的 `v-model`绑定，生成的 prop 名将是 `arg + "Modifiers"`。举例来说：

```html
<MyComponent v-model:title.capitalize="myText"></MyComponent>
```

相应的声明应该是：

```js
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
```

---

### 透传 attribute

#### Attributes 继承

> “透传 attribute”指的是传递给一个组件，却没有被该组件声明为 `props` 或 `emits` 的 `attribute` 或者 `v-on` 事件监听器.<br>最常见的例子就是 `class`、`style` 和 `id`。

```html
<!-- <MyButton> 的模板 -->
<button>click me</button>

<!-- 父组件使用了这个组件，并且传入了 class： -->
<MyButton class="large" />

<!-- 最后渲染出的 DOM 结果是： -->
<button class="large">click me</button>
```

##### 对 class 和 style 的合并

```html
<!-- <MyButton> 的模板 -->
<button class="btn">click me</button>

<!-- 最后渲染出的 DOM 结果会变成 -->
<button class="btn large">click me</button>
```

##### `v-on`监听器继承

##### 深层组件继承

父组件 > 子组件 1 > 子组件 2

- 透传的 `attribute` 不会包含 子组件 1 上声明过的 props 或是针对 emits 声明事件的 v-on 侦听函数，换句话说，声明过的 props 和侦听函数被 子组件 1 “消费”了。

- 透传的 attribute 若符合声明，也可以作为 props 传入 子组件 2。

---

#### 禁用 Attributes 继承

如果你不想要一个组件自动地继承 `attribute`，你可以在组件选项中设置 `inheritAttrs: false`。

!> 使用了 `<script setup>`，你需要一个额外的 `<script>` 块来书写这个选项声明

```js
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>
```

最常见的需要禁用 attribute 继承的场景就是 attribute 需要应用在根节点以外的其他元素上

?> 这些透传进来的 attribute 可以在模板的表达式中直接用 `$attrs` 访问到

```html
<span>Fallthrough attribute: {{ $attrs }}</span>
```

> 这个 `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 `attribute`，例如 class，style，v-on 监听器等等

有时候我们可能为了样式，需要在 `<button>` 元素外包装一层 `<div>`：

```html
<div class="btn-wrapper">
  <button class="btn">click me</button>
</div>
```

我们想要所有像 class 和 v-on 监听器这样的透传 attribute 都应用在内部的 `<button>` 上而不是外层的 <div> 上。我们可以通过设定 `inheritAttrs: false` 和使用 `v-bind="$attrs"` 来实现：

```html
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

---

#### 多根节点的 Attributes 继承

和单根节点组件有所不同，有着多个根节点的组件没有自动 `attribute` 透传行为。

如果 `$attrs`没有被显式绑定，将会抛出一个运行时警告。

如果 `$attrs` 被显式绑定，则不会有警告

```html
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```

---

#### 在 JavaScript 中访问透传 Attributes

<!-- tabs:start -->

##### **`<script setup>`**

使用 `useAttrs()` API 来访问一个组件的所有透传 attribute：

```vue
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

##### **`<script>`**

`attrs` 会作为 `setup()` 上下文对象的一个属性暴露：

```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  },
}
```

<!-- tabs:end -->

!> 这里的 `attrs` 对象总是反映为最新的透传 attribute，但它并不是响应式的 (考虑到性能因素)<br>不能通过侦听器去监听它的变化<br>如果你需要响应性，可以使用 prop<br>或者你也可以使用 `onUpdated()` 使得在每次更新时结合最新的 `attrs` 执行副作用

---

### 插槽 Slots

#### 插槽内容与出口

`<slot>` 元素是一个**插槽出口** (slot outlet)，标示了父元素提供的**插槽内容** (slot content) 将在哪里被渲染。

![插槽图示](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/GiZQcy000slots.dbdaf1e8.png)

---

#### 渲染作用域

插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的

```html
<span>{{ message }}</span> <FancyButton>{{ message }}</FancyButton>
```

!> 插槽内容无法访问子组件的数据

---

#### 默认内容

---

#### 具名插槽

带 `name` 的插槽被称为**具名插槽** (named slots)。
没有提供 name 的 `<slot>` 出口会隐式地命名为“default”。

父组件中

要为具名插槽传入内容，我们需要使用一个含 `v-slot` 指令的 `<template>` 元素，并将目标插槽的名字传给该指令：

```html
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

?> `v-slot` 有对应的简写 `#`,因此 `<template v-slot:header>` 可以简写为 `<template #header>`。
其意思就是“将这部分模板片段传入子组件的 header 插槽中”。

![具名插槽图示](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/RTZv1U000named-slots.ebb7b207.png)

```html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

等价于

```html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- 隐式的默认插槽 -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

---

#### 动态插槽名

---

#### 作用域插槽

某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。

```html
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

?> 当需要接收插槽 props 时，默认插槽和具名插槽的使用方式有一些小区别

<!-- tabs:start -->

##### **默认插槽**

通过子组件标签上的 v-slot 指令，直接接收到了一个插槽 props 对象

```html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```

这类能够接受参数的插槽被称为作用域插槽 (scoped slots)，因为它们接受的参数只在该插槽作用域内有效

![scoped slots diagram](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/o69Urp000scoped-slots.1c6d5876.svg)

##### **具名插槽**

插槽 props 可以作为 v-slot 指令的值被访问到：`v-slot:name="slotProps"`。

当使用缩写时是这样：

```html
<MyComponent>
  <template #header="headerProps"> {{ headerProps }} </template>

  <template #default="defaultProps"> {{ defaultProps }} </template>

  <template #footer="footerProps"> {{ footerProps }} </template>
</MyComponent>
```

向具名插槽中传入 props：

```html
<slot name="header" message="hello"></slot>
```

!> 注意插槽上的 `name` 是一个 Vue 特别保留的 attribute，不会作为 props 传递给插槽。因此最终 `headerProps` 的结果是`{ message: 'hello' }`。

<!-- tabs:end -->

---

### 依赖注入

#### prop 逐级透传

?> `provide` 和 `inject` 可以帮助我们解决这一问题

一个父组件相对于其所有的后代组件，会作为**依赖提供者**

任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖。

![Provide/inject 模式](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/picgo/provide-inject.3e0505e4.png)

---

#### Provide (提供)

要为组件后代提供数据，需要使用到 `provide()` 函数：

x

<!-- tabs:start -->

##### **`<script setup>`**

```vue
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```

##### **`<script>`**

不使用 `<script setup>`，请确保 `provide()` 是在 `setup()` 同步调用的

```js
import { provide } from 'vue'

export default {
  setup() {
    provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
  },
}
```

<!-- tabs:end -->

`provide()` 函数接收两个参数:

- 第一个参数被称为注入名，可以是一个字符串或是一个 Symbol。后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。
- 第二个参数是提供的值，值可以是任意类型，包括响应式的状态，比如一个 ref：

```js
import { ref, provide } from 'vue'

const count = ref(0)
provide('key', count)
```

?> 提供的响应式状态使后代组件可以由此和提供者建立响应式的联系

---

#### Inject (注入)

要注入上层组件提供的数据，需使用 `inject()` 函数

?> 如果提供的值是一个 ref，注入进来的会是该 ref 对象，而不会自动解包为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接

<!-- tabs:start -->

##### **`<script setup>`**

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

##### **`<script>`**

如果没有使用 `<script setup>`，`inject()` 需要在 `setup()` 内同步调用：

```js
import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  },
}
```

<!-- tabs:end -->

##### 注入默认值

> 默认情况下，`inject` 假设传入的注入名会被某个祖先链上的组件提供。如果该注入名的确没有任何组件提供，则会抛出一个运行时警告。

如果在注入一个值时不要求必须有提供者，那么我们应该声明一个默认值，和 `props` 类似：

```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```

在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：

```js
const value = inject('key', () => new ExpensiveClass())
```

---

#### 和响应式数据配合使用

> 当提供 / 注入响应式的数据时，建议尽可能将任何对响应式状态的变更都保持在**供给方组件中**

**注入方组件中更改数据,推荐在供给方组件内声明并提供一个更改数据的方法函数**

```vue
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation,
})
</script>
```

```vue
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

**提供的数据不能被注入方的组件更改,可以使用 `readonly()` 来包装提供的值。**

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

---

#### 使用 Symbol 作注入名

如果你正在构建大型的应用，包含非常多的依赖提供，或者你正在编写提供给其他开发者使用的组件库，建议最好使用 Symbol 来作为注入名以避免潜在的冲突。

通常推荐在一个单独的文件中导出这些注入名 Symbol：

```js
// keys.js
export const myInjectionKey = Symbol()
```

```js
// 在供给方组件中
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /*
  要提供的数据
*/
})
```

```js
// 注入方组件
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

---

### 异步组件

#### 基本用法

Vue 提供了 `defineAsyncComponent` 方法来实现此功能

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

> 如你所见，`defineAsyncComponent` 方法接收一个返回 `Promise` 的加载函数。这个 `Promise` 的 `resolve` 回调方法应该在从服务器获得组件定义时调用。你也可以调用 `reject(reason)` 表明加载失败。

?> **ES 模块动态导入**也会返回一个 `Promise`，所以多数情况下我们会将它和 `defineAsyncComponent` 搭配使用。<br>类似 `Vite` 和 `Webpack` 这样的构建工具也支持此语法 (并且会将它们作为打包时的代码分割点)，因此我们也可以用它来导入 Vue 单文件组件：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

最后得到的 `AsyncComp` 是一个外层包装过的组件，仅在页面需要它渲染时才会调用加载内部实际组件的函数.它会将接收到的 props 和插槽传给内部组件，所以你可以使用这个异步的包装组件无缝地替换原始组件，同时实现延迟加载

?> 与普通组件一样，异步组件可以使用 app.component() 全局注册：

---

#### 加载与错误状态

`defineAsyncComponent()` 支持在高级选项中处理这些状态：

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000,
})
```

---

搭配 `Suspense` 使用

异步组件可以搭配内置的 `<Suspense>` 组件一起使用，若想了解` <Suspense>` 和异步组件之间交互，请参阅 [`<Suspense>`](#suspense-组件) 章节。

---

## 逻辑复用

### 组合式函数

---

<!-- todo -->

### 自定义指令

<!-- todo -->

---

### 插件

<!-- todo -->

---

## 内置组件

### Transition 组件

> `<Transition>` 是一个内置组件，这意味着它在任意别的组件中都可以被使用，无需注册。它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上

进入或离开可以由以下的条件之一触发：

- 由 `v-if` 所触发的切换
- 由 `v-show` 所触发的切换
- 由特殊元素 `<component>` 切换的动态组件

基本用法的示例：

```html
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

```css
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```

!> `<Transition> `仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素

当一个 `<Transition>` 组件中的元素被插入或移除时，会发生下面这些事情：

1. Vue 会自动检测目标元素是否应用了 CSS 过渡或动画。如果是，则一些 [CSS 过渡 class](#css过渡) 会在适当的时机被添加和移除。

2. 如果有作为监听器的 [JavaScript 钩子](#javascript-钩子)，这些钩子函数会在适当时机被调用。

3. 如果没有探测到 CSS 过渡或动画、也没有提供 JavaScript 钩子，那么 DOM 的插入、删除操作将在浏览器的下一个动画帧后执行。

---

#### css 过渡

<!-- todo -->

---

#### JavaScript 钩子

<!-- todo -->

---

### TransitionGroup 组件

<!-- todo  -->

---

### KeepAlive 组件

> 功能是在多个组件间动态切换时缓存被移除的组件实例

---

### Teleport 组件

> 它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去

---

### Suspense 组件

> 用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。

---

## 应用规模化

### 单文件组件

> Vue 的单文件组件 (即` *.vue` 文件，英文 Single-File Component，简称 SFC) 是一种特殊的文件格式，使我们能够将一个 Vue 组件的模板、逻辑与样式封装在单个文件中。

### 工具链

#### 项目脚手架

推荐使用 [Vite](https://cn.vitejs.dev/)

---

#### IDE 支持

推荐使用的 IDE 是 VSCode，配合 Volar 插件

!> Volar 取代了我们之前为 Vue 2 提供的官方 VSCode 扩展 Vetur。如果你之前已经安装了 Vetur，请确保在 Vue 3 的项目中禁用它。

---
