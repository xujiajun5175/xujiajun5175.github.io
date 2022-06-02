# Vue.js

**文档更新日期: {docsify-updated}** 

#### 简介

1. 渐进式js框架
2. 尤雨溪
3. 特点
   1. 组件化
   2. 声明式编码,无需直接操作DOM
   3. [Vue](https://so.csdn.net/so/search?q=Vue&spm=1001.2101.3001.7020).config.productionTip = false  阻止启动生产消息，常用作指令。

#### 模版语法

1. 插值语法 {{}}
2. 指令语法  Ex: v-bind. 用于解析标签

#### 数据绑定

1. 单向绑定 v-bind
2. 双向绑定 v-model
   1. input类型的标签。可以使用v-model,搭配计算属性


#### el与data的两种写法

1. el

   ![image-20220124233642778](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220124233642778.png)

   

2. data

   1. 对象式 new Vue

   2. 函数式

      ![image-20220124233800245](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220124233800245.png)

#### 数据代理

1. Object.defineProperty 
   1. 为对象添加属性,
   2. 可以自定义添加配置项
      1. enumerable 控制属性是否可以枚举 默认false
      2. writable 是否可以修改 默认false
      3. configurable 是否可以删除 默认false
      4. value 设置属性的值
      5. get() 当访问属性时,会调用。 getter
      6. set(val) 
2. 数据代理的定义:通过一个对象代理对另一个对象中属性的操作
3. Vue的数据代理 :
   1. 第一步 加工data 
   2. vm获取data中的数据。vm._data


#### 事件处理

1. v-on   @

2. 事件方法 func(event) 

   1. event.target 获取到 触发主体 
   2. 有参数的用$event占位
   3. @scroll 滚动事件
   4. @wheel 鼠标滚轮事件

3. 事件修饰符

   1. @click.prevent 修饰符 阻止默认行为
   2. @ .stopPropagationTip  阻止事件冒泡 
   3. Once 只触发一次（常用)
   4. capture: 使用事件的捕获模式
   5. passive 直接执行默认行为 
   6. 修饰符可以连写

4. 键盘事件

   1. keyup keydown

   2. event.keycode 按键编码。13是回车 

   3. event.key 按键

   4. 大小写按键 需要-拼接

   5. vue 添加修饰符。  keyup.enter

      ![image-20220125235939790](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220125235939790.png)

#### 计算属性

1. 定义: 要用的属性不存在 要通过已有属性计算得来
2. 原理: 底层接住了Object.defineproperty提供的getter和 setter
3. 优势: 与methods相比,内部有缓存机制(复用) 效率更高 调试方便
4. get调用时机。初始化的时候 或者 依赖的数据发生变化的时候
5. set(value) 计算属性被修改的时候 调用
6. 备注: 计算属性最终会出现在vm上,可直接读取使用
7. 如果计算属性需要修改,必须写set函数,要引起依赖的数据改变
8. 允许套娃

#### watch 监视器 

1. 又名:侦听器,监听器

   ![image-20220126172903511](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220126172903511.png)

2. Immediate:true 初始化时handle调用一下

3. 可以监听 computed计算属性

4. vm.$watch('key",{配置对象}')  api写法

5. 多层对象。需要原始写法。需要加引号

6. 深度监视

   1. 用于监视对象和对象内属性
   2. deep:true

7. 简写,不需要其他配置项只有handler的时候

   ![image-20220126182731216](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220126182731216.png)

   ![image-20220126182819380](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220126182819380.png)

#### 计算属性和监视器区别

1. computed能完成的功能， watch都可以完成
2. watch能完成的功能， computed不一定能完成，例如： watchi可以进行异步操作
3. 重要的小原则：
   1. .所被ue管理的函数，最好写成普通函数，这样this的指向才是vm或组件实例对象
   2. 所有不被vue所管理的函数（定时器的回调函数、ajax的回调函数.promise等），最好写成箭头函数,这样this的指向才是vm或组件实例对象



#### class和style绑定

1. 绑定class

   1. 字符串写法:适用于样式类名不确定,需要动态指定

   2. 数组写法:要绑定的样式个数不确定,名字也不确定

   3. 对象写法:样式个数确定,名字确定,动态决定用不用

      ![image-20220126184106713](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220126184106713.png)

2. 绑定style 

   1. 对象绑定 key就是css样式的控制
   2. 数组绑定。绑定多个对象

#### 条件渲染

1. v-show 结构存在 不显示
2. v-if 结构消除
3. v-else-if
4. v-else 后面不跟条件
5. template 模板 不影响结构 编译渲染之后会不存在。 只能配合v-if

#### 列表渲染

1. v-for 搭配 key  需要独一无二

2. 遍历指定次数 

   ![image-20220126185012629](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220126185012629.png)

3. 遍历对象

   ![image-20220126185041661](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220126185041661.png)

4. key的作用

   1. 数据的唯一标识,类似于身份证

   2. 影响效率。 虚拟dom对比算法。根据标识对比

   3. 影响数据准确性

      ![image-20220126185447462](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220126185447462.png)

   4. 列表过滤

      1. 用watch实现

         ![image-20220126185837421](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220126185837421.png)

      2. 用计算属性过滤

#### Vue监测数据改变的原理

1. 创建一个监视的实例对象,用于监视data中属性的变化

   ![image-20220126211147298](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220126211147298.png)

2. 赋值给 vm._data

3. 

#### 过滤器

1. 时间插件
   1. day.js 体积小
   2. moment.js
2. {{ 属性 | 过滤器名称}}
3. 局部过滤器 定义
   1. 写在filters
   2. 本质就是个函数
   3. 是对数据加工。 默认参数 value
   4. return 返回值就是替换
   5. 可以写多个 管道符`|`
4. 全局过滤器
5. 用于 插值表达式。或者v-bind。  
6. 对要显示的数据进行特定格式化后再显示,适合简单逻辑的处理

#### vue其他指令

1. 内置指令

   1. v-text

      1. `<div v-text="data"></div`
      2. 会替换节点内的内容

   2. v-html

      1. 相比html支持结构解析
      2. 存在安全问题,会导致cookie泄漏

   3. v-cloak

      1. 在vue实例创建并接管容器后,就会注销

      2. 用来配合

         ```js
         [属性选择器]{
         display:none;
         }
         ```

      3. 主要解决网速慢导致显示{{}}的问题

   4. v-once

      1. 在初次动态渲染之后,就变成静态内容了
      2. 以后的数据改变不会因此v-once所在结构的更新,用于优化性能

   5. v-pre

      1. 跳过节点的编译过程
      2. 利用它跳过:没有使用指令语法、没有使用差值语法的节点,会加快编译

2. 自定义指令

   1. 使用配置项 directives
   2. 指令与元素成功绑定的时候调用函数
   3. 指令所在的模版被重新解析的时候调用函数

#### 生命周期

1. vue完成模版的解析并把真实的DOM元素放入页面后调用mounted
1. beforeDestory 销毁之前
1. 钩子函数 activated 被激活
1. 钩子函数 deactivated 失活
1. 钩子函数 $nextTick()

#### 组件

1. 组件不能写el配置项,因为最终所有的组件都要被一个vm管理

2. components 注册组件

   ![image-20220202210119971](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220202210119971.png)

   

3. Vue.component()注册全局组件

4. Vue.extend({}) 创建组件

5. VueComponent

   1. 是构造函数
   2. 是Vue.extend生成的
   3. 写标签的时候,vue解析时帮我们执行了构造函数,创建了对应组件的实例对象
   4. 每次调用vue.extend都返回一个新的VueComponent
   5. this指向
      1. 使用VueComponent 均指向VueComponent实例对象
      2. 使用 new Vue指向Vue实例对象
   6. vue实例对象简称vm,vuecomponent实例对象简称vc

6. 内置关系

   1. `vuecomponent.prototype.__proto__ === Vue.proptotype`

      ![image-20220204201040533](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220204201040533.png)

   2. 让组件实例对象可以访问到vue原型上的属性和方法

7. 单文件组件

   1. 文件后缀`.vue`文件

   2. 必须存在App.vue组件文件

      1. 汇总所有的组件

   3. main.js

      ![image-20220204204907567](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220204204907567.png)

#### vue 脚手架

1. 官方提供的标准化开发工具(开放平台)

2. CLI  command line interface

3. 创建项目

   1. 全局安装脚手架 `npm install -g @vue/cli`

   2. 创建目录。`vue create xxxx`

   3. 启动项目 `npm run serve`

   4. render函数

      1. ![image-20220204205736494](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220204205736494.png)
      2. `render: h => h(App)`

   5. 修改默认配置

      1. vue cli隐藏了所有webpack相关的配置,若想查看具体的webpack配置 需要执行 `vue inspect > output.js`

   6. 项目结构

      ```
      ├── node_modules 
      ├── public
      │   ├── favicon.ico: 页签图标
      │   └── index.html: 主页面
      ├── src
      │   ├── assets: 存放静态资源
      │   │   └── logo.png
      │   │── component: 存放组件
      │   │   └── HelloWorld.vue
      │   │── App.vue: 汇总所有组件
      │   │── main.js: 入口文件
      ├── .gitignore: git版本管制忽略的配置
      ├── babel.config.js: babel的配置文件
      ├── package.json: 应用包配置文件 
      ├── README.md: 应用描述文件
      ├── package-lock.json：包版本控制文件
      ```

      

      ![image-20220204210454168](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220204210454168.png)

#### ref 属性

1. ​	`this.$refs.id`
2. 如果用在组件标签上,获取到的就是相对应的vc对象
3. 用在普通标签是获取的真实dom元素



#### props配置

1. 接收到vc对象中

2. 接收类型

   ![image-20220204220031766](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220204220031766.png)

3. required 必需的

4. default 默认值

5. type 类型

6. 传入的值不能修改,只读,Vue底层会检测对props的修改,修改会发生警告。(不能用v-model绑定)

7. 传入的值不能与data中的值相同,会以外部传入为主

   ![image-20220204222738119](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220204222738119.png)

#### mixin 混入

1. 导入可复用的代码。或者函数
2. 使用配置项 mixins配置项接收 数组
3. 如果混入data,相同的按照当前组件的为主
4. mounted就全部混入
5. Vue.mixin 全局混入



#### 插件

1. 功能:增强Vue

2. 需要在创建vue之前引入插件

3. `Vue.use()`全局使用插件

4. 也可以传入一个可选的选项对象：

   ```js
   Vue.use(MyPlugin, { someOption: true })
   ```

5. 应用

   1. 可以使用过滤器 filter
   2. 自定义指令
   3. 混入
   4. 原型上添加方法

6. 参数

   1. 第一个是插件
   2. 选项对象



#### scoped样式

1. 作用域 局部样式
2. 使用lang 设置其他预编译样式语言



#### 浏览器本地存储

1. localStorage
2. sessionStorage



#### 组件自定义事件

1. `this.$emit`用来触发vc上的自定义事件
2. 使用v-on在父组件绑定
3. 简写使用`@`
4. 事件名称 大小写不敏感
5. 两种方式
   1. 通过ref实现
   2. 使用v-model和porps接收
   3. 通过v-on方式
6. 可以通过ref绑定事件。 `this.$refs.xxxx.$on.('xxxx',this.xxxx)`,通过这种方式,函数使用普通函数或者箭头函数,否则this指向会出问题
7. once 只能触发一次 `this.$refs.xxxx.$once('xxxx',this.xxxx)`
8. 传递多参数,两种做法
   1. 封装成一个对象
   2. 使用`...params`接收形参
9. 事件的解绑 
   1. 子组件解绑
   2. `this.$off("xxxx")`解绑一个事件
   3. 传递数组或者不传递参数可以解绑多个事件
10. 事件销毁 `this.$destroy()`销毁当前vc实例



#### 全局事件总线

1. 任意组件间通信

   ![image-20220205165719488](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220205165719488.png)

2. 最好在beforeDestroy,用$off解绑当前组件用到的事件



#### 消息订阅与发布

1. pubsub-js 第三方库

2. import pubsub from 'pubsub-js'

3. 订阅消息

   ![image-20220205170450015](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220205170450015.png)

   两个参数:第一个参数msgName。消息名称。第二参数才是data

4. 发布消息

   ![image-20220205170523127](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220205170523127.png)

5. 取消订阅

   ![image-20220205170800864](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220205170800864.png)



####  $nextTick

1. `this.$nextTick(回调)`
2. 作用:下一次DOM更新结束后执行其指定的回调
3. 什么时候用:当改变数据后,要基于更新后的新DOM进行某些操作时候,要在nextTick所指定的回调函数中执行



#### 动画

1. 使用`transition`标签

2. 样式需要使用 `.v-enter-active`进入。离开使用 `.v-leave-active`

   ![image-20220207150407573](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220207150407573.png)

3. 使用name命名了.需要替换`v`



#### 配置代理

1. 发送请求的方式
   1. xhr
   2. jQuery
   3. axios 使用多 vue推荐
   4. fetch IE浏览器兼容性差
   5. vue-resource
2. cors用来解决跨域问题
3. 代理服务器
   1. nginx
   2. vue-cli
      <!-- tabs:start -->

#### **方式一**

  ```js
      // vue-config.js
      //方式一
      module.exports = {
         devServer: {
            proxy: 'http://localhost:4000'  //需要请求的服务器
           }
         }
  ```

#### **方式二**
      ```js
      //方式二
      module.exports = {
         devServer: {
            proxy: {
               '/api': { //前缀
               target: 'http://localhost:4000',
               pathRewrite:{'^/api':''} //匹配前缀编程空字符串
               ws: true, //webSocket
               changeOrigin: true  // 用于控制请求头中的host值
               },
               '/foo': {
               target: 'http://localhost:4001'
               }
            }
         }
         }
      
      ```

<!-- tabs:end -->
    


#### vue-resource

1. 安装
   ```js
   npm i vue-resource
   ```

2. 使用

   ![image-20220207172817578](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220207172817578.png)

3. 了解即可 vue1.0使用



#### 插槽

1. 作用:让父组件可以向子组件指定位置插入html结构 也是一种组件通信方式

2. 默认插槽 `<slot>默认值</slot>`

3. 具名插槽 

   ```js
   <slot name="插槽名称">默认值</slot>
   
   //父组件
   //添加 slot= “插槽名称" 属性
   ```

4. 作用域插槽

   1. 理解:数据在组件的自身,但根据数据生成的结构需要组件的使用者来决定

   2. 给slot添加数据属性,作用给使用者(父组件)

   3. 使用者(父组件) 必须使用template标签包裹 并 添加scope属性

      或者直接使用如图

      ![image-20220207234210797](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220207234210797.png)

   4. 可以传递多个数据属性




#### vuex

1.  概念:专门在Vue中实现集中式状态(数据)管理的一个Vue插件

   1. 对vue应用中多个组件的共享状态进行集中式管理
   2. 是一种组件通信方式,适用于任意组件通信

2. 什么时候使用

   1. 多个组件依赖于同一个状态
   2. 来自不同组件的行为需要变更同一状态

3. 通信方式区别

   ![image-20220207235026044](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220207235026044.png)

   ![image-20220207235145240](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220207235145240.png)

4. vuex工作原理图

   ![image-20220207235715511](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220207235715511.png)

5. dispatch派发,

   1. 第一个参数:动作类型,String
   2. 数据

6. 搭建环境

   ![image-20220208000724766](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/image-20220208000724766-20220211160742908.png)

   1. 安装

      1. 直接安装

         ```bash
         npm install vuex@next --save
         ```

      2. vue2
   
         ```bash
         npm install vuex@3 --save
         ```
   
      3. Vue3  
   
         ``` bash
         npm install vuex@4 --save
         ```
   
          
   
   2. 配置基础文件(直接使用模块方式)
   
      1. 创建文件夹和配置文件
   
         ```js
         // 创建store文件夹
         // 创建index.js文件
         //  src/store/index.js
         
         import Vue from 'vue'
         import Vuex from 'vuex'
         import getters from './getters'
         import 模块名 from '模块路径'
         
         Vue.use(Vuex)
         
         const store = new Vuex.Store({
             modules: {
                 ...
                 模块名
                 ...
             },
             getters // 单独暴露 getters
         })
         
         export default store
         ```
   
         **配置getters**

         - 新增,非必需  
         - 类似于computed 计算属性
   
         !> 如果不使用getters,需要把index.js文件中的getter相关去除
   
         ```js
         //创建getters文件
         const getters = {
             // getter名: state => state.模块名.数据属性名
           	//准备getters - 用于将state中的数据进行加工
             sidebar: state => state.app.sidebar,
             ...
           }
           export default getters
         ```
   
      2. 创建文件夹和单模块文件
   
         ```js
         //创建modules文件夹
         //创建单独模块文件 
         // src/store/modules/xxx.js
         
         const 模块名 = {
         
             //准备state - 存储数据
             state: {
               
               //举例
               pickerCity: "1111",
               pickerDateRange: "1111",
               
             },
         
             //准备mutations - 操作数据(state)
         	  //一般使用大写
             mutations: {
         
               // 举例
                 UPDATE_PICKER_CITY(state, newValue) {
                     state.pickerCity = newValue;
                 },
         			
               // 举例
                 UPDATE_PICKER_DATERANGE(state, newValue) {
                     state.pickerDateRange = newValue;
                 },
             },
         
             //准备actions - 用于相应组件中的动作
             actions: {
                 ...
             },
         }
         
         export default 模块名;
         ```
   
      3. 配置main.js
   
         ```js
         //  src/main.js
         import store from './store'
         
         new Vue({
           ...
           store,
           ...
         })
         ```
   
   3. 使用 mapState && mapGetters
   
      - 作用: 借助mapState生成计算属性,从state中读取数据
   
      - 使用:
   
        !> 哪里需要获取值就在哪里单独导入
   
        ```js
        import { mapState, mapGetters } from "vuex"
        export default{
                computed:{
                        //对象写法
                        ...mapState(xxx:'xxxx')
        
                          //数组写法
                        ..mapGetters(['xxxx','xxxx'])
                  
                      }
        }
        ```
   
   4. mapMutations && mapActions
   
      1. 需要在模版中传递参数
   
         ```js
         ...mapMutations(['xxxxx','xxxxxx'])
         
         
         ...mapActions(['xxxxx','xxxxxx'])
         ```
   
   5. vuex模块化

#### vue路由

1. 需要引入 vue-router插件 

2. npm i vue-router

3. SPA

   1. single page web application 单页web应用
   2. 整个应用只有一个完整的页面
   3. 点击页面中导航链接不会刷新页面 只会做页面的局部更新
   4. 数据通过ajax获取

4. 路由

   1. 一个路由就是一组映射关系
   2. key是路径,value可以是function或者component
   3. 后端路由响应数据 前端路由显示页面

5. 基本使用

   1. 创建 router/index.js

      ```js
      import VueRouter from "vue-router"
      
      //引入组件
      import componentName from "..."
      ...
      
      //创建一个路由器
      export default new VueRouter({
        routes:[
          {
            path:'/',
            component:componentName
          },
        ]
      })
      ```

   2. 引入router `import router from './router'` 

   3. Vue.use(VueRouter)

   4. 添加router配置项

      1. 页面使用

         1. html使用router-link代替a标签 	`to="/path"`

         2. 控制激活状态时的样式属性 active-class

         3. Router-view标签控制指定组件的呈现位置

            !> page文件夹中放置路由组件。component中放置一般组件

         4. 每个组件都有自己的$route属性,里面存储着自己的路由信息

         5. 整个应用只有一个router,可以通过组件的$router属性获取

6. 路由嵌套

   1. 配置router

   2. 添加children配置项

      ```js
      //一级路由
      {
        ...
        children:[
          	//二级路由
          	{
            	...
          	}
        	]
      }
      ```

7. 路由的query参数

   1. 对象写法

      ```js
      <router-link :to="{
      // 或者使用路由名称 name: ‘xxxx'
      	path:'xxxxxxxxx',
          query:{
            xxxxx:xxxxx,
              ...
          }
      }">
      ...
      </router-link>
      ```

8. 命名路由 

   1. name属性
   2. 可以简化路由的跳转

9. 路由的params参数

   1. 普通方式

       ```js
         ...
         	path:"xxxxxx/xxxxx/:param1/:param2",
          ...
           
           // html
           :to="xxx/xxx/${ param1 }/${ param2 }"
       ```

   2. 对象方式

      ```js
      <router-link :to="{
      // 或者使用路由名称 name: ‘xxxx'
      	name:'xxxxxxxxx',
          params:{
            xxxxx:xxxxx,
              ...
          }
      }">
      ...
      </router-link>
      ```

         !> 如果使用对象方式,必须使用name方式,不能使用path方式

10. 路由的props配置

    1. 添加props配置项

       ```js
       //一级路由
       {
         ...
         children:[
           	//二级路由
           	{
             	...
               //第一种方法是传递对象,缺点:数据是固定的
               //第二种方法,值为boolean 若为真,就会把该路由组件的所有params参数,以props的形式传给页面路由组件
               props : true
               ...
               
               //第三种方法,值为funcation,用于解决query参数的问题
               props( $route ){
           			return {xx:$route.query.xxx,}
           			}
           	}
         	]
       }
       ```

11. router-link的replace属性

    1. router-link上添加 replace 属性。可以限制浏览器后退
    2. 作用:控制路由跳转时操作浏览器的历史记录
    3. 路由跳转的默认模式是push模式

12. 编程式路由导航

    1. 作用:不借助`router-link` 实现路由跳转 

    2. push && replace

       ```js
       this.$router.push({
         	name:'xxx',
         	params:{
             ...
           }
       })
         
         this.$router.replace({
         	name:'xxx',
         	params:{
             ...
           }
       })
       ```

    3. 后退 `this.$route.back()`

    4. 前进 `this.$route.forward()`

    5. 指定步数 正数前进负数后退 ` this.$route.go(x)`

13. 缓存路由组件

    让不展示的路由组件保持挂载,不被销毁

    ``` js 
    <keep-alive include="组件名称">  //多个传递数组
      	<router-view><route-view> //会被缓存,不会走销毁
      </keep-alive>
    ```

14. 路由守卫

    全局守卫

    ```js
    //全局前置 路由守卫
    //初始化的时候和切换路由之前调用
    router.beforeEach( (to,from,next) =>{
    	...
    })
    ```

    ```js
    routes:[{
      ...
      meta:{isAuth : false}
      ...
    }]
    
    //全局后置 路由守卫
    //初始化的时候和切换路由之后调用
    router.beforeEach( (to,from) =>{
    	...
    })
    
    ```

    独享守卫

    ?> *_TODO_* 

    组件内路由守卫

    ?> *_TODO_* 

15. 路由器模式 

    1. history模式
       1. 没有`/#/`
       2. 兼容性略差,
       3. 需要后端人员解决服务端页面404的问题

    2. hash模式
       1. 带有 `/#/`  
       2. 使用hash值.兼容性好
       3. hash值不会包含在http请求中, hah值不会带给服务器
       4. 




#### Vue UI组件库

1. 移动端常用ui组件库
   1. Vant https://youzan.github.io/vant 
   2. Cube UI https://didi.github.io/cube-ui 
   3.  Mint UI http://mint-ui.github.io 
2. PC 端常用 UI 组件库 
   1. Element UI https://element.eleme.cn 
   2. IView UI https://www.iviewui.co





#### 








​      













