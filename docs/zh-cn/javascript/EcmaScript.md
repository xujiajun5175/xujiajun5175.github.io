### ECMAScript6特性
**文档更新日期: {docsify-updated}**
#### 扩展运算符

#### 迭代器

1. for...of...遍历方式 array、arguments、set、map、string、typedarray、nodelist

#### pormise

1. then返回的是一个promise对象,对象状态由毁掉函数的执行结果决定
2. 如回调函数返回的记过是非promise类型的属性,状态为成功,返回值为对象的成功的值

#### Set

1. add 增加元素。返回更新的set

2. delete 返回boolean

3. has 是否存在。返回 boolean

4. clear 清空 返回集合

5. size 返回长度

6. 数组api 

   ```js
   //数组去重
   let arr  =  [1,2,1,12,12,2,1,2]
   let result = [...new Set(arr)];
   
   // 交集
   let arr2 = [1,2,3,4,5,6]
   result = [...new Set(arr)].filter(item =>new Set(arr2).has(item))
   
   //并集
   let union= [ new Set( [ ...arr, ...arr2] )]
   
   //差集
   result = [...new Set(arr)].filter(item =>!(new Set(arr2).has(item)))
   ```

#### Map

1. 键不限于是字符串,可以是任何对象

#### class类

1. 可以看做是一个语法糖,更像面向对象编程

   ```javascript
   //ES5
   function Phone(brand,price){
     this.brand = brand;
     this.price = price;
   }
   
   Phone.prototype.call = function(){
     console.log("打电话")
   }
   
   
   let huawei = new Phone("华为",5000);
   huawei.call()
   
   
   //ES6
   classs Phone{
     //构造方法,固定名字,自动执行,没有也可以
     constructor(brand,price){
         this.brand = brand;
    		 this.price = price;
     }
     
     
     //静态属性 ,属于类
     static name = "手机";
     static change(){
       //todo
     }
     
     
     //getter setter
     get price(){
       return "dasds";  //动态属性的封装
     }
     
     
     //设置器
     set price(newVal){
       return "asdas"; 
     }
     
     
     //只能用这种方式,不能使用es5的完整对象方式
     call(){
       //todo
     }
     
     
     
     //类的继承
     class SmartPhone extends Phone{
       //构造方法
       
       constructor(...args){
         super(...args)
       }
       
     }
     
     
     
   }
   ```

#### 数值扩展

1. Number.EPSILON是js的最小精度 2.22^-16 用于浮点数运算精度的设置 
2. 二进制和八进制
   1. 二进制用 0b开头  0b1010‘
   2. 八进制 0o开头
   3. 十六进制 0x开头
3. Number.isFinite() 检测是否是有限数 有理数
4. Number,isNaN 是否是NaN
5. Math.trunc 将数字的小数部分抹掉 
6. Math.sign 判断是是否正数。正数返回1 0返回0 负数返回-1

#### 对象方法扩展

1. Object.is 判断两个值是否完全相等。boolean 
2. Object.assign 对象的合并 复制
3. Object.setPrototypeOf。设置原型对象

#### 模块化

1. 模块化的优势有以下几点：
   1. 防止命名冲突
   2. 代码复用
   3. 高维护性
2. ES6模块化语法
   1. export import 
      1.  export命令用于规定模块的对外接口
          1. 单独暴露
          2. 统一暴露 export { , ,}
          3. 默认暴露。任意类型。
      2.  Import命令用于输入其他模块提供的功能
          1. 使用as别名 解决重名冲突
          2. 导入默认暴露。 import {default as 'name'} from "....." 不能直接使用default。必须使用别名
          3. 

### ECMAScript 7特性

#### includes

1. 检测数组中是否存在。 返回 boolean

#### **运算符

1. 乘方。 2 ** 10 = 1024

### ECMAScript 8特性

#### async 和 await

1. async函数的返回值为 promise对象
2. promise对象的结果由函数执行的返回值决定
3. await必须写在 async函数中
4. await右侧的表达式一般为 promise对象
5. await返回的是 promise成功的值
6. await 的 promise失败了，就会抛出异常，需要通过try. catch捕获处理

#### 对象方法扩展

1. Object.keys(obj)
2. Object.values(obj)
3. Object.entries(obj) 返回键值对数组 用于创建map    new Map(Object.entries(obj))
4. Object,,getOwnPropertyDescription(obj) 返回对象属性的描述对象 
   1.  writable: . true  属性特性
   2.  configurable: true,
   3.  enumerable: . true

### ECMAScript 9特性

#### rest参数

#### 扩展运算符对对象的操作

#### 正则扩展

1. 命名捕获分组
2. 反向断言
3. dotAll模式
   1. dot 元字符。“.”  除换行符意外的任意单个字符
   2. 

#### 

### ECMAScript 10特性

#### 对象方法扩展

1. Object.fromEntries(数组)。创建一个对象。可以是二维数组 map 

#### 字符串方法扩展

1. trimStart  清除左侧空白
2. trimEnd 清除右侧空白

#### 数组方法扩展

1. flat 将多维数组转化为低维数组  参数是数字。表示深度 默认为1
2. flatMap 

#### Symbol.proptotype.descrition

### ECMAScript 11特性

#### 私有属性

1. #开头
2. 需要this.#属性名调用
3. 能构造。不能访问

#### Promise.allSettled

1. 接收一个promise数组
2. 返回一个promise对象 状态时fulfilled

#### Promise.all()

1. 接收一个promise数组
2. 只要有一个失败整体就是失败的
3. 返回值就是失败的那个的失败的值

#### String.prototype.matchAll()

1. 接收reg正则表达式

#### 可选链操作符

1.  ?.组合
2.  对象类型参数层级深的时候  判断对象是否传入

#### 动态import

1. `import(js路径).then(module =>{model.hello()})`

#### BigInt

1. n结尾的

#### globalThis

1. 始终指向全局对象