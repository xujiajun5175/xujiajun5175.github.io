# vue-router

**文档更新日期: {docsify-updated}**

### 理解

---

#### vue-router

vue 的**核心插件**,专门来实现 SPA 应用

vue 原生有 router

#### SPA 应用

- single page web application 单页 Web 应用
- 整个页面只有一个完整的页面
- 点击页面中的导航链接**不会刷新**页面,只会做页面的**局部更新**
- 数据需要通过 ajax 请求获取

#### 路由

##### 什么是路由?

- 一个路由就是一组**映射关系**(key-value)
- key 为路径
- value 可以是`function`或者`component`

##### 路由分类

1. 后端路由

   - 理解

     value 是 function,用于处理客户端提交的请求

   - 工作流程

     服务器接收到一个请求时,根据请求路径找到匹配的函数来处理请求,返回相应数据

     > 即是 接口的实现

2. 前端路由

   - 理解:

     value 是 component,用于展示页面的内容

   - 工作过程

     当浏览器的路径改变时,对应的组件就会显示

### 基本使用

---

#### 安装

<!-- tabs:start -->

##### **vue2**

```bash
npm install vue-router@3
```

##### **vue3**

```bash
npm install vue-router@4
```

<!-- tabs:end -->

#### 更新

```bash
npm update vue-router --save
```

#### 配置

!> 基于 vue-cli 创建项目工程

1. 准备两个组件 About 和 Home

   ```vue
   <!-- path: /components/about.vue -->
   <template>
     <div>
       <p>about page</p>
     </div>
   </template>

   <script>
   export default {}
   </script>

   <style></style>
   ```

   ```vue
   <!-- path: /components/home.vue -->
   <template>
     <div>
       <p>home page</p>
     </div>
   </template>

   <script>
   export default {}
   </script>

   <style></style>
   ```

2. 创建 router 文件夹和 index.js

   ```js
   // path: /router/index.js

   // 引入 是一个构造器
   import VueRouter from 'vue-router'
   //引入组件
   import About from '../components/about.vue'
   import Home from '../components/home.vue'

   //创建一个路由器

   export default new VueRouter({
     //路由
     routes: [
       {
         path: '/about',
         component: About,
       },
       {
         path: '/home',
         component: Home,
       },
     ],
   })
   ```

3. 配置 main.js

   ```js
   ...
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入路由器
   import router from './router/index'

   ...
   Vue.use(VueRouter)

   new Vue({
     ...
     router,
     ...
   }).$mount('#app')

   ```

   编写 index.html 或者 App.vue

   ```vue
   <template>
     <div id="app">
       ...
       <div>
         <router-link to="/about">about</router-link>
       </div>
       <div>
         <router-link to="/home">home</router-link>
       </div>
       ...
       <div>
         <router-view></router-view>
       </div>
     </div>
   </template>
   ```

#### 使用

编写 index.html 或者 App.vue

```vue
<template>
  <div id="app">
    ...
    <div>
      <router-link to="/about">about</router-link>
    </div>
    <div>
      <router-link to="/home">home</router-link>
    </div>
    ...
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
```

##### 效果

![2022-02-15 00.04.20](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/2022-02-15%2000.04.20.gif)

### router-link

---

Vue 中截住 router-link 标签实现路由的切换,用于替换 html 中`a`标签

路径的切换不需要发送网络请求

- to 属性
  - 类似` a`标签的 href 属性
- active-class
  - 用于触发 to 事件之后的样式的 className

!> 配置在 router 中的组件,称之为**路由组件**,一般防止在 pages 文件夹中;配置在 components 文件夹中的一般称之为**一般组件**

### router-view

---

指定组件的呈现位置

`<router-view></router-view>`

!> 切换了的路由组件是被销毁了!!!可以通过组件中配置`beforeDestroy()`钩子函数测试

!> 每个组件都有自己的`$route`属性,里面存储路由信息,不同路由组件的信息是不同的

!>整个应用只有一个 router,可以通过组件的`$router`属性获取

### 嵌套路由

---

又称为**多级路由**

#### 配置

```js
// path: /router/index.js

  routes: [
    ...
    {
      path: '/home', // 一级路由
      component: Home,
      children:[  // 二级路由
        {
          path: 'homechild1', // 不需要"/"了
     			component: homechild1,
        },
         {
          path: 'homechild2',
     			component: homechild3,
        },
      ],
    },
    ...
  ],
})
```

#### 编写

```vue
// path: /components/home.vue
<template>
  <div>
    <p>home page hjkasdhjjkasdhksahdjk</p>
    <div>
      <div>
        <router-link to="/home/homechild1">child1</router-link>
      </div>
      <div>
        <router-link to="/home/homechild2">child2</router-link>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

```vue
<template>
  <div>我是home路由的子路由1</div>
</template>

<script>
export default {}
</script>

<style></style>
```

#### 效果

![ ](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/2022-02-15%2000.44.05.gif)

!> 实际项目中,很少会嵌套至六级,一般三级及以下

### 路由传参

路由能够携带两种参数,一种是` query`,一种是` params`

#### query 参数

- 优点

  不干扰路由器中路由配置信息,不需要添加更多配置项

- 实现

  1. 新增组件

     ```vue
     <!-- path: /components/detail.vue -->

     <template>
       <div>
         <ul>
           <li>消息编号:{{ $route.query.id }}</li>
           <li>消息:{{ $route.query.title }}</li>
         </ul>
       </div>
     </template>

     <script>
     export default {
       mounted() {
         // console.log(this.$route) //输出路由配置信息
       },
     }
     </script>

     <style></style
     ```

  2. 配置路由信息

     ```js
     routes: [
         ...
         {
           path: '/home',
           component: Home,
           children: [
             {
               path: 'homechild1',
               component: HomeChild1,
               children: [
                 {
                   path: 'detail',
                   component: Detail,
                 },
               ],
             },
            ...
           ],
         },
       ],
     ```

  3. 编写

     ```vue
     <template>
       <div>
         <ul>
           <li v-for="item in messageList" :key="item.id">
             <!-- 挑战路由并携带query参数,to的字符串写法 -->
             <!-- <router-link
               :to="`/home/homechild1/detail?id=${item.id}&title=${item.title}`"
               >{{ item.title }}</router-link
             > -->

             <!-- to的 对象写法-->
             <router-link
               :to="{
                 path: '/home/homechild1/detail',
                 query: {
                   id: item.id,
                   title: item.title,
                 },
               }"
             >
               {{ item.title }}</router-link
             >
           </li>
         </ul>
         <hr />
         <router-view></router-view>
       </div>
     </template>

     <script>
     export default {
       data() {
         return {
           messageList: [
             {
               id: '001',
               title: '消息titile 001',
             },
             {
               id: '002',
               title: '消息titile 002',
             },
             {
               id: '003',
               title: '消息titile 003',
             },
           ],
         }
       },
     }
     </script>

     <style></style>
     ```

- 效果

  ![2022-02-15 22.27.32](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/2022-02-15%2022.27.32.gif)

#### params 参数

- 优点

- 实现

  1. 直接拼接路由 path 的方式

     需要配置路由信息 使用**占位符**对参数占位

     ![image-20220215224911422](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220215224911422.png)

     然后`to`属性中直接拼接相应的参数

     ![image-20220215225045635](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220215225045635.png)

     组件取值 `$route.params`

     ![image-20220215225217728](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220215225217728.png)

  2. 对象方式

     使用与 query 形式相似

  !> 使用 param 配置参数,不允许使用 path 配置,必须使用 name 配置项

- 效果

### 命名路由

---

![image-20220215222912302](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220215222912302.png)

!> 一般名称需要见名知义,原则上是可以随便命名

#### 在 router-link 中使用

![image-20220215223300223](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220215223300223.png)

!> 需要使用对象写法为`to`属性赋值,优点就是为了简化长路径

### 路由的 props 配置

---

#### 写法

1. 值为对象

   对象中所有`key-value`都会以`props`下形式传给路由组件

   ```js
   ...
   	props:{
       a:1,
       b:'hello'
     }
   ...
   ```

   组件接收

   ```vue
   <script>
   export default{
     ...
     props:['a','b']
   }
   </script>
   ```

   !> 这种方式的缺点是 传输的数据是固定的

2. 值为布尔值

   若布尔值为真,就会把该路由组件收到的所有`param`参数,以`props`形式传递路由组件

   ```js
   ...
   	props:true // true || false
   ...
   ```

   !> 这种方式仅应用于`params`参

3. <span class="props_func">值为函数</span>

   ```js
   ...
   props($route){ // 回调函数自带$route参数
     return {
       	id: $route.query.id,
       	title: $route.query.title
     }; // 返回的需要是对象
   }

   //简化
   ...
   props(query){ // 结构赋值 优化
     return {
       	id: query.id,
       	title: query.title
     };
   }

   //再简化
   ...
   props(query:{id,title}){ // 结构赋值 连续写法
     return {
       	id,
       	title
     };
   }

   ```

   !> 这种方式的优点是相对灵活,并且可以使用于`params`和`query`

### replace 属性

---

不能使用浏览器的后退和前进按钮

> 浏览器的历史记录有两种写入方式,分别是`push`和`replace`
>
> `push`是追加历史记录
>
> `replace`是替换当前记录
>
> 默认是`push`方式

#### 搭配 router-link 使用

添加`replace`属性

![image-20220215233124357](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220215233124357.png)

### 编程式路由导航

---

不使用`router-link`实现路由跳转

####

!> `this.$router`原型中包含如下方法用来实现编程式路由操作,可以用来模拟浏览器前进后退或跳转指定路由

<!-- tabs:start -->

##### **push() && replace()**

**实现**

新增两个`button`

```vue
//path homechild1
<button @click="pushShow(item)">push查看</button>
<button @click="replaceShow(item)">replace查看</button>

...

<script>
methods: {
   pushShow(obj) {
     this.$router.push({
       name: 'detail',
       query: {
         id: obj.id,
         title: obj.title,
       },
     })
   },
   replaceShow(obj) {
     this.$router.replace({
       name: 'detail',
       query: {
         id: obj.id,
         title: obj.title,
       },
     })
   },
 },
</script>
```

**效果**

![dad](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/dad.gif)

##### **back() && forward()**

用来模拟浏览器的“前进”和“后退”按钮

```vue
<!-- path banner.vue -->
<template>
  <div>
    <button @click="back">后退</button>
    <button @click="forward">前进</button>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back()
    },
    forward() {
      this.$router.forward()
    },
  },
}
</script>

<style></style>
```

**效果**

![2022-02-16 00.00.48](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/2022-02-16%2000.00.48-20220216002031.gif)

##### **go() **

> `go()`方法接收一个数字参数
>
> 正数代表前进几步
>
> 负数代表后退几步

<!-- tabs:end -->

### 缓存路由组件

---

> 路由的切换,导致组件销毁
>
> 如果需要返回路由之后保存输入,需要使用缓存

!> 展示的组件属于哪个页面(组件),就去哪个页面(组件)使用`keep-alive`标签

```vue
...
<keep-alive include="HomeChild2">
      <router-view></router-view>
 </keep-alive>
...
```

!> 哪个组件需要缓存就针对哪个组件,最好使用`include`,而不是全部使用.`include`使用的是**组件名**(取自组件本身的`name`配置项)!!!

![2022-02-16 00.37.18](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/2022-02-16%2000.37.18-20220216003742.gif)

!> 如果组件较多或者想缓存多个组件,可以使用数组传入组件名

![image-20220216003952167](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220216003952167-20220216003952.png)

### 生命周期钩子函数

---

两个新的生命周期钩子函数,**仅属于路由**.

#### activated()

激活

> 当使用(看到,切换到)的时候就调用

#### deactivated()

失活(未激活)

> 当不使用(没看到,切走)的时候就调用

#### 实现

```vue
<template>
  <ul>
    <li :style="{ opacity }">学习vue</li>
    <li>news001 <input type="text" /></li>
    <li>news002 <input type="text" /></li>
    <li>news003 <input type="text" /></li>
  </ul>
</template>

<script>
export default {
  name: 'HomeChild2',
  data() {
    return {
      opacity: 1,
    }
  },
  activated() {
    console.log('child2被激活了')
    this.timer = setInterval(() => {
      this.opacity -= 0.01
      if (this.opacity <= 0) this.opacity = 1
    }, 16)
  },
  deactivated() {
    console.log('child2失活了')
    clearInterval(this.timer)
  },
}
</script>

<style></style>
```

#### 效果

![2022-02-16 00.57.59](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/2022-02-16%2000.57.59-20220216005851.gif)

### 路由守卫

---

<!-- tabs:start -->

##### **全局守卫**

##### 全局前置

初始化的时候调用一次,以后每次路由的跳转或切换之前会调用前置方法

```js
...

const router = new VueRouter({
  //路由
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About,
      meta: { isAuth: true },
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        {
          name: 'homechild1',
          path: 'homechild1',
          component: HomeChild1,

          children: [
            {
              name: 'detail',
              path: 'detail',
              component: Detail,
              props($route) {
                return {
                  id: $route.query.id,
                  title: $route.query.title,
                }
              },
            },
          ],
        },
        {
          name: 'homechild2',
          path: 'homechild2',
          component: HomeChild2,
        },
      ],
    },
  ],
})

//全局前置路由守卫
router.beforeEach((to, from, next) => {
  console.log('@@@@@@')
  //是否需要权限
  if (to.meta.isAuth) {
    if (localStorage.getItem('school') === 'atguigu') {
      next() //放行
    }
  }
})

export default router

```

##### 全局路由后置

初始化的时候调用一次,以后每次路由切换之后调用

!> 实际项目使用不多,主要场景是切换路由更改当前标签页标题

```js
//全局后置路由守卫
router.afterEach((to, from) => {
  console.log('@@@@@@')
  document.title = to.meta.title || '首页'
})
```

##### **独享路由守卫**

设置在某一个,单独路由中,进入路由之前调用

```js
const router = new VueRouter({
  //路由
  routes: [
    ...
    {
      name: 'home',
      path: '/home',
      component: Home,
      meta: { title: 'home' },
      beforeEnter: (to, from, next) => {
        //进入之前调用
        ...
      },
      ...
    ],
})


export default router

```

##### **组件内路由守卫**

写到组件内,功能更强大,不仅仅适用于**路由规则**,还是用于**组件引用**

```vue
<script>
export default {
  //通过路由规则进入此组件的时候被调用
  beforeRouteEnter(to, from, next) {
    // ...
  },
  // 通过路由规则离开此组件的时候被调用
  beforeRouteLeave(to, from, next) {
    // ...
  },
}
</script>
```

<!-- tabs:end -->

### 路由器的工作模式

---

<!-- tabs:start -->

##### **history 模式**

**优缺点**

- 地址干净,美观
- 兼容性相比`hash`模式较差
- 应用部署上线时需要后端人员支持.解决刷新页面服务端 404 的问题

##### **hash 模式**

> url 中`#`后面的内容就是`hash`值
>
> `hash`值不包含在`HTTP`请求中,即:`hash`值不会带给服务器

**优缺点**

- 地址中带着`#`号,不美观
- 通过第三方手机 APP 分享,若 APP 教研严格,则地址会被标记为不合法
- 兼容性较好

<!-- tabs:end -->

### 异常问题解决

---

#### 路由重复点击问题

**报错信息**

`NavigationDuplicated: Avoided redundant navigation to current location: "/shopcart".`

![img](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/webp-20220218155447.jpg)

**问题解释**

报错显示路由频繁点击导致路由重复而报错，该报错对路由跳转功能没有任何影响

**解决方案**

?> 需要`vue-router`版本是`3.2.0`以上才可以

在`router`文件夹下`index.js`中添加如下代码:

```js
//解决路由重复点击报错的问题
import Router from "vue-router";
...
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
```

**参考文档**

> https://www.jianshu.com/p/68d933df4c70

<style>
  .props_func{
    color: red;
  }
</style>
