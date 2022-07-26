### html

#### 语义话的目的

用正确的标签做正确的事
提高代码可读性 ,页面内容结构化,有利于SEO(搜索引擎优化)

#### HTML5新特性

    1. canvas绘图 svg绘图
    2. 拖放API
    3. 语义化标签
    4. 音视频 API
    5. 地理定位
    6. 本地李现存储 localstorage 长期存储 关闭浏览器不丢失
    7. 会话存储 sessionstorage 关闭浏览器删除
    8. 表单控件
    9. web worker / web socket

#### cookie和sessionStorage和localStorage区别

保存方式

cookie存放在客户的浏览器上。

session都在客户端中保存，不参与服务器通讯。

生命周期

cookie可设置失效时间

localStorage除非手动清除否则永久保存

sessionStorage关闭当前页面或浏览器后失效

存储的大小
cookie 4kb左右
session 5M

易用性
cookie需自己封装
session可以接受原生接口

因为cookie每次请求都会携带在http请求中,所以它的主要用来识别用户登录,localStorage可以用来跨页面传参,sessionStorage可以用来保留一些临时数据。

### css

#### css有哪些基本的选择器，执行先后顺序？⭐

类选择器（class）、标签选择器、ID选择器
!important>内联样式（非选择器）>ID选择器>类选择器>标签选择器>通配符选择器（*）

#### 垂直居中DIV ⭐⭐⭐

```html
    <div class="father">
        <div class="son">我是垂直居中的div</div>
    </div>
```

<!-- tabs:start -->

###### **绝对定位(盒子宽高已知)**

```css
        .father {
            position: relative;
            width: 500px;
            height: 500px;
            background-color: red;
        }

        .son {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -150px;（-盒子一半宽度）
            margin-top: -150px;（-盒子一半高度）
            width: 300px;
            height:300px;
            background-color: blue;
        }

```

**或者**

```css
 .father {
            position: relative;
            width: 500px;
            height: 500px;
            background-color: red;
        }

        .son{
            position:absolute;
            margin:auto;
            top:0; left:0; bottom:0;right:0;
            width: 300px;
            height:300px;
            background-color: blue;
        }
```

###### **定位(宽高未知)**

```css
 .son {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: blue;
        }
```

##### **grid布局（父元素设置，宽高未知）**

```css
        .father {
            display: grid;
            align-items: center;
            justify-content: center;
            width: 500px;
            height: 500px;
            background-color: red;
        }
```

###### **flex布局（父元素设置，宽高未知）**

```css

        .father {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 500px;
            height: 500px;
            background-color: red;
        }

```

###### **表格布局（父元素设置，宽高未知）（兼容性较好）**

```css
        .father {
            display: flex;
            text-align: center;
            vertical-align: middle
            width: 500px;
            height: 500px;
            background-color: red;
        }
        .son {
         display: inline-block;
        }

```
<!-- tabs:end -->

3. 两栏布局左边固定右边自适应

```html
  <div class="father">
      <div class="left"></div>
      <div class="right"></div>
  </div>
```

<!-- tabs:start -->

###### **float布局**

```css
.left {
    width: 200px;
    height: 200px;
    float: left;
    background-color: blue;
}
.right {
    margin-left: 200px;
    height: 200px;
    background-color: red;
}

```

###### **绝对定位**

```css
.father {
    position: relative;
    height: 200px;
}

.left {
    position:absolute;
    width: 200px;
    height: 100%;
    float: left;
    background-color: blue;
}

.right {
    position:absolute;
    height: 100%;
    left:200px;
    right: 0;
    background-color: red;
}

```

###### **flex布局**

```css
.father {
    height: 300px;
    width: 100%;
    display: flex;
}

.left {
    width: 300px;
    height: 100%;
    background-color: blue;
}

.right {
    flex: 1;
    height: 100%;
    background-color: red;
}

```
<!-- tabs:end -->

#### 三栏布局左右固定中自适应

这与左中固定右边自适应，中右固定左边自适应，以及上下固定中间自适应是一个道理

```html
        <div class="father">
            <div class="left"></div>
            <div class="right"></div>
            <div class="main"> </div>
        </div>

```

<!-- tabs:start -->
###### **float布局**

```css
.father{
    height: 50px;
      div{
        height: 100%;
    }
}

.left {
    width: 200px;
    float: left;
    background-color: red
}

.main {
    margin-left: 200px;
    margin-right: 200px;
    background-color: blue
}

.right {
    float: right;
    width: 200px;
    background-color: yellow
}

```

###### **绝对定位**

```css
.father{
    position: relative;
    height: 50px;
      div{
        position: absolute;
        height: 100%;
    }
}

.left {
    left: 0;
    width: 200px;
    background-color: red
}

.main {
    left: 200px;
    right: 200px;
    background-color: blue
}

.right {
    right: 0;
    width: 200px;
    background-color: yellow
}

```

###### **flex布局**

```html
<div class="father">
    <div class="left"></div>
    <div class="main"> </div>
    <div class="right"></div>
</div>
```

```css
.father {
    display: flex;
    height: 50px;
      div{
        height: 100%;
    }
}

.left {
    width: 200px;
    background-color: red
}

.main {
    flex: 1;
    background-color: blue
}

.right {
    width: 200px;
    background-color: yellow
}
```
<!-- tabs:end -->

#### 常用的块与行属性内标签有哪些？有什么特征⭐⭐

块标签：div、h1~h6、ul、li、table、p、br、form。
特征：独占一行，换行显示，可以设置宽高，可以嵌套块和行
行标签：span、a、img、textarea、select、option、input。
特征：只有在行内显示，内容撑开宽、高，不可以设置宽、高（img、input、textarea等除外）。

#### 清除浮动⭐⭐⭐⭐⭐

最常用的4种

<!-- tabs:start -->

##### **额外标签法**

给谁清除浮动，就在其后额外添加一个空白标签 。

优点： 通俗易懂，书写方便。（不推荐使用）

缺点： 添加许多无意义的标签，结构化比较差。

```html
<div class="fahter">
        <div class="big">big</div>
        <div class="small">small</div>
        <div class="clear">额外标签法</div>
</div>
```

```css
.clear{
        clear:both;
    }
```

##### **父级添加overflow方法**

可以通过触发BFC的方式，实现清除浮动效果。

必须定义width或zoom:1，同时不能定义height，

使用overflow:hidden时，浏览器会自动检查浮动区域的高度

优点： 简单、代码少、浏览器支持好

缺点： 内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素。不能和position配合使用，因为超出的尺寸的会被隐藏。

```html
<div class="fahter">
        <div class="big">big</div>
        <div class="small">small</div>
        <div class="clear">额外标签法</div>
</div>
```

```css
.fahter{
    width: 400px;
    border: 1px solid deeppink;
    overflow: hidden;
}
```

!> 注意： 别加错位置，是给父亲加（并不是所有的浮动都需要清除，谁影响布局，才清除谁。）

##### **使用after伪元素清除浮动**

`:after`方式为空元素的升级版，好处是不用单独加标签了。IE8以上和非IE浏览器才支持`:after`，zoom(IE专有属性)可解决ie6,ie7浮动问题（较常用推荐）

优点： 符合闭合浮动思想，结构语义化正确，不容易出现怪问题（目前：大型网站都有使用，如：腾迅，网易，新浪等等）

缺点： 由于IE6-7不支持：after，使用zoom：1

![在这里插入图片描述](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/1iuNl8000watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzYzODk2OA==,size_16,color_FFFFFF,t_70.png)

```css
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .clearfix{
        *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }

<body>
    <div class="father clearfix">
        <div class="big">big</div>
        <div class="small">small</div>
        <!--<div class="clear">额外标签法</div>-->
    </div>
    <div class="footer"></div>
</body>

```

##### **使用before和after双伪元素清除浮动<span class="tab-badge">推荐</span>**

![在这里插入图片描述](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/RZQaJK000watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzYzODk2OA==,size_16,color_FFFFFF,t_70-20220720172017836.png)

```css
<style>
            .father{
                border: 1px solid black;
                *zoom: 1;
            }
            .clearfix:after,.clearfix:before{
                   content: "";
                   display: block;
                   clear: both;
               }
               .big ,.small{
                width: 200px;
                height: 200px;
                float: left;
               }
               .big{
                background-color: red;
               }
               .small{
                background-color: blue;
               }
        </style>
   <div class="father clearfix">
        <div class="big">big</div>
        <div class="small">small</div>
   </div>
    <div class="footer"></div>

</div>


```

优点： 代码更简洁

##### **父级div定义 height<span class="tab-badge-2">补充</span>**

父级div手动定义height，就解决了父级div无法自动获取到高度的问题。

优点： 简单、代码少、容易掌握

缺点： 只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题

<!-- tabs:end -->

#### 介绍一下盒模型⭐⭐

答：

盒模型由内容(content)、内边距(padding)、边框(border)、外边距(margin)组成。
盒模型分为IE盒模型和W3C标准盒模型。
W3C标准盒模型又叫content-box，元素宽度/高度由border+padding+content组成。
（属性width,height只包含内容content，不包含border和padding）
IE盒模型又叫border-box，元素宽度/高度由content组成。
（属性width,height包含border和padding，指的是content+padding+border。）
PS：盒模型这个东西需要多理解。。。

#### CSS中有哪些长度单位？⭐⭐

1. 绝对长度单位：**px**
2. 百分比: **%**
3. 相对父元素字体大小单位: **em**
4. 相对于根元素字体大小的单位: **rem**
5. 相对于视口*宽度的百分比（100vw即视窗宽度的100%）: **vw**
6. 相对于视口*高度的百分比（100vh即视窗高度的100%）: **vh**

#### display:none和visibility:hidden的区别⭐

display:none：隐藏元素，在文档布局中不在给它分配空间（从文档中移除），会引起回流（重排）。
visibility:hidden: 隐藏元素，但是在文档布局中仍保留原来的空间（还在文档中），不会引起回流（重绘）。

#### 用CSS 实现长宽为浏览器窗口一半的正方形⭐

<!-- tabs:start -->

##### **用%**

已知父元素宽高

```css
                width: 50%;
                padding-top: 50%;
                background-color: red;

```

##### **用vw**

```css
                width: 50vw;
                height: 50vh;
                background-color: red;

```

<!-- tabs:end -->

#### 用CSS实现高度为0.5像素的线条

这个可以用伪类来实现

```css
        .line::before {
            display: block;
            content: "";
            height: 1px;
            left: -50%;
            position: absolute;
            background-color: #333333;
            width: 200%; //设置为插入元素的两倍宽高
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
            box-sizing: border-box;
        }

```

#### 用CSS 实现三角形

向上

```css
                width:0;
                height:0;
                border-left:30px solid transparent;
                border-right:30px solid transparent;
                border-bottom:30px solid red;

```

#### 伪类和伪元素的区别⭐⭐

**伪类**
![在这里插入图片描述](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/ZwbL10000cb244f221003440ea81110e61684c696.png)
**伪元素**
![在这里插入图片描述](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/C26lWb0000905ecc76f554ccca9ab57dc6412c854.png)
**区别**

- 伪类只能使用“**：**”，伪元素既可以使用“:”，也可以使用“::”
- 伪元素其实相当于伪造了一个元素，伪类没有伪造元素，例如first-child只是给子元素添加样式而已。（本质区别就是**是否抽象创造了新元素**）

#### 重绘和重排是什么？如何避免？⭐⭐

重排：当DOM的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。
重绘：当一个元素的外观发生改变，但没有改变布局，重新把元素外观绘制出来的过程，所以重绘跳过了创建布局树和分层的阶段。

重排需要重新计算布局树，重绘不需要，重排必定发生重绘，但是涉及到重绘不一定要重排 。涉及到重排对性能的消耗更多一些。

触发重排的方法： 页面初始渲染、添加/删除可见的DOM元素、改变元素位置、改变元素尺寸、改变元素内容、改变元素字体大小、改变浏览器窗口尺寸、设置 style 属性的值等。
避免重排的方式：样式集中改变、使用 absolute 或 fixed 脱离文档流。

### js

#### ES6新特性？⭐⭐⭐

1. 新增块级作用域**let**定义变量和**const**定义常量
2. 变量的解构赋值
3. 模板字符串 （‘${}’）
4. 默认参数（key=value）
5. 箭头函数（=>）
6. 扩展运算符（…）
7. 模块（import/export）
8. 类（class/extends）
9. Promise
10. Proxy
11. Symbol

#### 闭包的理解⭐⭐

- 理解：主要是为了设计私有的方法和变量。
- 优点：可以避免全局变量造成污染。
- 缺点：闭包会常驻内存，增加内存使用量，使用不当会造成内存泄漏。
- 特征：（1）函数嵌套函数。（2）在函数内部可以引用外部的参数和变量。（3）参数和变量不会以垃圾回收机制回收。

#### call()、apply()、bind（）的区别⭐

- 都是改变this指向
- 参数形式不同:
  - 第一个参数都是要指向的对象,默认指向window
  - call,bind多参数直接逗号隔开
  - apply多参数使用数组传递
- 执行
  - call,apply直接执行
  - bind返回的是一个函数,可以调用执行

#### 原型，原型链⭐⭐⭐

用来继承和扩展对象

每个函数对象都有一个 prototype 属性，这个属性就是函数的原型对象。

原型链是JavaScript实现继承的重要方式，原型链的形成是真正是靠__proto__ 而非prototype。

所有的引用类型（包括数组，对象，函数）都有隐性原型属性（proto）, 值也是一个普通的对象。
所有的引用类型的 proto 属性值都指向构造函数的 prototype 属性值。
构造函数 new 出来一个对象，而每个对象都有一个 constructor 属性，该属性指向创建该实例的构造函数。
实例对象通过__proto__或者 object.getPrototype 的方法获取原型。
原型链其实就是有限的实例对象和原型之间组成有限链，就是用来实现共享属性和继承的。

#### 基本数据类型⭐

1. 基本类型

   Number:数值，包括整型和浮点型。
   String:字符型。
   Undefined:未定义，声明变量时未赋值。
   Null：定义为空或者不存在。
   Boolean：布尔值，true or false。
   Symbol：独一无二的值。

2. 引用数据类型
   Object：对象。
   Array：数组。
   Function：函数。

!> 注：**Object.prototype.toString.call()**适用于所有类型的判断检测

#### export和export default的区别⭐

- 均可导出常量、函数、文件、模块等。
- 在一个文件或模块中，export、import可以有多个。export default仅有一个。
- 通过export方式导出，在导入时要加{ }，export default则不需要。

#### 箭头函数和普通函数的区别⭐⭐

语法更加简洁、清晰，=>()
箭头函数是匿名函数，不能作为构造函数，不能使用new
箭头函数不能使用arguments，而用rest参数…解决
箭头函数没有自己的this,会捕获其所在的上下文的this值,并且不能通过call()和apply()来改变其this
箭头函数没有原型

#### GET和POST的区别⭐⭐⭐

表面区别

后退/刷新：GET无害，POST数据会被重新提交。
书签：GET产生的URL地址可以被收藏为书签，而POST不可以。
数据：GET一般是用来获取数据，POST提交数据。
数据类型：GET只允许ASCII字符,POST无限制。
数据大小：GET大小有限制（一般来说1024字节）,POST理论上来说没有大小限制。
安全性：GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
可见性：GET参数通过URL传递对所有人可见，POST数据不可见。
历史保留：GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。

#### forEach和map的区别⭐

**forEach**没有返回值，**map**返回新的数组。
**map**创建新数组，**forEach**不修改原数组。

#### JS基本数据类型的比较⭐⭐

?> 黄色表示ture

![黄色表示ture](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/qhAW3x000watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0pldF9Mb3Zlcg==,size_16,color_FFFFFF,t_70.jpeg)

#### 对象的继承⭐

常见的：

1. 原型链继承
2. 借用构造函数继承
3. 原型链+借用构造函数的组合继承（使用 call 或 applay 方法）
4. ES6中class 的继承（class可以通过extends关键字实现继承）

#### 简述一下你理解的面向对象⭐

抽象,封装,继承,多态

#### == 和 ===的区别⭐

相同点：都是判定两个**值**是否相等
不同点：== 只比较**值**不比较**类型**，而 ===会判断**类型**

#### 数组有哪些方法⭐⭐

<https://blog.csdn.net/Jet_Lover/article/details/107061795>

#### 普通的数组去重⭐⭐

（笔试一般都会有）

在不涉及去重对象、NaN等情况下。

1. **IndexOf()**
2. 双重for循环
3. es6的 **[…new Set()]**
4. **filter()**
5. **sort()**
   面试随便写一两种就行、项目直接用**new Set()**（方便）

!> 注 ：如果有多维数组如 [1,[2],[3,[2,3,4,5]] ] 先扁平化再去重,
用**Array.flat(Infinity)**实现扁平化。

#### Promise⭐⭐⭐

<https://es6.ruanyifeng.com/#docs/promise>

#### JS中new操作符有什么用？⭐⭐

- 创建临时对象，并将this指向临时对象
- 将构造函数的**原型属性**和**方法**挂载到新对象的__proto__(原型指针)上
- return 临时对象

#### JS获取HTML DOM元素的方法⭐⭐

通过ID获取（getElementById）
通过name属性（getElementsByName）
通过标签名（getElementsByTagName）
通过类名（getElementsByClassName）
获取html的方法（document.documentElement）
获取body的方法（document.body）
通过选择器获取一个元素（querySelector）
通过选择器获取一组元素（querySelectorAll）
用法以及防坑可看JS获取HTML DOM元素的方法

#### 事件捕获和事件冒泡⭐⭐

事件捕获和事件冒泡主要解决了页面事件流的问题。页面的事件流经过了三个阶段，分别是事件捕获、目标阶段和事件冒泡阶段。
事件捕获是由外向内；而事件冒泡则是由内向外。
event.stopPropagation() 可以阻止事件流的进一步传播。
采用事件代理的方式，能够节省内存消耗，对于动态改变子元素的时候，也非常有利，避免了很多麻烦的步骤，比如重新绑定事件。（把子元素的事件委托给父元素来处理）

#### 虚拟dom⭐

定义：虚拟DOM就是普通的js对象。用来描述真实dom结构的js对象，因为它不是真实的dom，所以才叫做虚拟dom。
作用：虚拟dom可以很好地跟踪当前dom状态，因为它会根据当前数据生成一个描述当前dom结构的虚拟dom，然后数据发生变化时，有生成一个新的虚拟dom，而两个虚拟dom恰好保存了变化前后的状态。然后通过diff算法，计算出当前两个虚拟dom之间的差异，得出一个更好的替换方案。

#### 排序方式⭐

冒泡排序：比较所有相邻元素,如果第一个比第二个大，则交换它们。
选择排序：找到数组中的最小值，选中它并将其放置在第一位。
插入排序：从第二个数开始往前比，比它大就往后排。
归并排序：把数组劈成两半，再递归地对数组进行“分”操作，直到分成一个个单独的数。
快速排序：从数组中任意选择一个基准，所有比基准小的元素放到基准前面，比基准大的元素放到基准的后面

#### 数组操作方法会改变原数组⭐⭐

会改变：**push()**，pop(),shift(),unshift() ,splice(),sort(),reverse()。
不变：concat(),split(),slice()。

#### JS有几种方法判断变量的类型？⭐⭐⭐

typeof
判断基本数据类型，对于引用数据类型除了function返回’function‘，其余全部返回’object’。

instanceof
区分引用数据类型，检测方法是检测的类型在当前实例的原型链上，用其检测出来的结果都是true，不太适合用于简单数据类型的检测，检测过程繁琐且对于简单数据类型中的undefined, null, symbol检测不出来。

constructor
检测引用数据类型，检测方法是获取实例的构造函数判断和某个类是否相同，如果相同就说明该数据是符合那个数据类型的，这种方法不会把原型链上的其他类也加入进来，避免了原型链的干扰。

Object.prototype.toString.call()
适用于所有类型的判断检测，检测方法是Object.prototype.toString.call(数据) 返回的是该数据类型的字符串。(举例：字符串返回的是[object String])

instanceof的实现原理：验证当前类的原型prototype是否会出现在实例的原型链__proto__上，只要在它的原型链上，则结果都为true。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，找到返回true，未找到返回false。
Object.prototype.toString.call原理：Object.prototype.toString 表示一个返回对象类型的字符串，call()方法可以改变this的指向，那么把Object.prototype.toString()方法指向不同的数据类型上面，返回不同的结果

#### 如何判断一个对象是否存在？⭐

建议使用**typeof**运算符，

#### 深拷贝，浅拷贝⭐⭐⭐

浅拷贝：创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

深拷贝：将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。

总而言之，浅拷贝改动拷贝的数组原数组也会变（慎用！项目中很多地方共用的数组都会变）。深拷贝修改新数组不会改到原数组。
实现方法
浅拷贝：

Object.assign()
函数库lodash的 _.clone 方法
es6的展开运算符 …
Array.prototype.concat()
Array.prototype.slice()

```js
let arr=[{name:"uzi"}]
let arr1= Object.assign({}, arr);   arr1[0].name="xiaoming"
let arr2= _.clone(arr);              arr2[0].name="mlxg"
let arr3= [...arr]                   arr3[0].name="xiaohu"
let arr4 = arr.concat()              arr4[0].name="zitai"
let arr5 = arr.slice();              arr5[0].name="clearLove"
console.log(arr[0].name==arr[1].name==arr[2].name==……);
//true  arr[0].name="clearLove"

```

**深拷贝**：

1. **JSON.parse(JSON.stringify())**
2. 函数库lodash的 **_.cloneDeep** 方法
3. **jQuery.extend()**方法
4. [**手写递归方法**](https://zhuanlan.zhihu.com/p/161061945)(转)

```JS
var $ = require('jquery');
            let arr=[{name:"theShy"，age:"21"}]
 1.             let arr1= JSON.parse(JSON.stringify(arr));   arr1[0].name="rookie"
 2.             let arr2= _.cloneDeep(arr);                  arr2[0].name="ning"
 3.             let arr3= $.extend(true, {}, arr);           arr3[0].name="baolan"
                console.log(arr[0].name==arr[1].name==arr[2].name==……);
               //fales arr1[0].name="rookie" arr2[0].name="ning"

```

#### require和import区别⭐

调用时间
require运行时调用，理论上可以运用在代码任何地，甚至不需要赋值给某个变量之后再使用。
lmport是编译时候调用，必须放在文件开头，而且使用格式也是确定的。
遵循规范
require 是 AMD规范引入方式
import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法
本质
require是赋值过程，其实require 的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量。
import是解构过程。
通过require 引入基础数据类型时，属于复制该变量。
通过require 引入复杂数据类型时，数据浅拷贝该对象。
出现模块之间的循环引用时,会输出已经执行的模块,而未执行的模块不输出(比较复杂）。CommonJS模块默认export的是一个对象，即使导出的是基础数据类型。

ES6 模块语法是 JavaScript 模块的标准写法，坚持使用这种写法，取代 Node.js 的 CommonJS 语法。
使用import取代require()。

#### 事件循环（Event Loop）⭐⭐⭐

原因：JavaScript是单线程，所有任务需要排队，前一个任务结束，才会执行后一个任务。

所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。
同步任务：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
异步任务：不进入主线程、而进入"任务队列"的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

同步和异步任务分别进入不同的执行环境， 先执行同步任务，把异步任务放入循环队列当中挂起，等待同步任务执行完，再执行队列中的异步任务。异步任务先执行微观任务，再执行宏观任务。一直这样循环，反复执行。

微任务：Promise.then、catch、finally、async/await。
宏任务：整体代码 Script、UI 渲染、setTimeout、setInterval、Dom事件、ajax事件。

<https://www.ruanyifeng.com/blog/2014/10/event-loop.html>

### vue

#### 数据双向绑定原理⭐⭐⭐

答：通过数据劫持结合发布—订阅模式，通过Object.defineProperty()为各个属性定义get、set方法，在数据发生改变时给订阅者发布消息，触发相应的事件回调。

#### vue生命周期⭐⭐⭐

概念：从创建、初始化数据、编译模板、挂载DOM、渲染-更新-渲染、卸载等一系列过程，称为为Vue 实例的生命周期。

**vue2.0**

- beforeCreate：创建前。此时，组件实例刚刚创建，还未进行数据观测和事件配置，拿不到任何数据。
- created：创建完成。vue 实例已经完成了数据观测，属性和方法的计算(比如props、methods、data、computed和watch此时已经拿得到)，未挂载到DOM，不能访问到el属性，el属性，ref属性内容为空数组常用于简单的ajax请求，页面的初始化。
- beforeMount：挂载前。挂在开始之前被调用，相关的render函数首次被调用（虚拟DOM）。编译模板，把data里面的数据和模板生成html，完成了el和data 初始化，注意此时还没有挂在html到页面上。
- mounted：挂载完成。也就是模板中的HTML渲染到HTML页面中，此时可以通过DOM API获取到DOM节点，$ref属性可以访问常用于获取VNode信息和操作，ajax请求，mounted只会执行一次。
- beforeUpdate：在数据更新之前被调用，发生在虚拟DOM重新渲染和打补丁之前，不会触发附加地重渲染过程。
- updated：更新后。在由于数据更改导致地虚拟DOM重新渲染和打补丁之后调用，
  beforeDestroy;销毁前。在实例销毁之前调用，实例仍然完全可用。（一般在这一步做一些重置的操作，比如清除掉组件中的定时器 和 监听的dom事件）
- destroyed：销毁后。在实例销毁之后调用，调用后，vue实列指示的所有东西都会解绑，所有的事件监听器会被移除。
- 其他：
  - activated：在keep-alive组件激活时调用
  - deactivated：在keep-alive组件停用时调用

**vue3.0**

- **onBeforeMount**
- **onMounted**
- **onBeforeUpdate**
- **onUpdated**
- **onBeforeUnmount**
- **onUnmounted**

![请添加图片描述](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/x8YOYc0001fd92fbb86104d7f81a506a74d551004.png)

#### 组件之间如何传值⭐⭐⭐

一、Vue父子 组件之间传值

子组件通过props来接受数据和通过$emit来触发父组件的自定义事件；
二、兄弟组件之间的传值

建一个公共组件bus.js.。传递方通过事件触发bus.$emit。接收方通过在mounted（）{}生命周期里触发bus.$on。
三、可以通过VUEX 来跨组件传参。

四、父孙传值 $attrs（向下）$listeners（向上）

五、 祖先和子孙传值provide/inject

六、获取父组件实例this.$parent

<https://blog.csdn.net/Jet_Lover/article/details/117418041>

#### 路由之间如何传参⭐⭐

- 通过router-link路由导航跳转传递

```VUE
<router-link to=`/a/${id}`>routerlink传参</router-link>
```

- 跳转时使用push方法拼接携带参数。

```js
  this.$router.push({
          path: `/getlist/${id}`,
        })
```

- 通过路由属性中的name来确定匹配的路由，通过params来传递参数。

```js
this.$router.push({
          name: 'Getlist',
          params: {
            id: id
          }
        })
```

- 使用path来匹配路由，然后通过query来传递参数。

```js
this.$router.push({
          path: '/getlist',
          query: {
            id: id
          }
        })
```

注意：**query**有点像ajax中的**get**请求，而**params**像**post**请求。

**params**在地址栏中不显示参数，刷新页面，参数丢失,
其余方法在地址栏中显示传递的参数，刷新页面，参数不丢失。

#### 谈一谈VUEX⭐⭐

原理：Vuex是专门为vue.js应用程序设计的状态管理工具。
构成:

state:vuex的基本数据，用来存储变量，存放的数据是响应式的。
mutations:提交更改数据，同步更新状态。
actions:提交mutations，可异步操作。
getters：是store的计算属性。
modules:模块，每个模块里面有四个属性

#### 如何解决vuex页面刷新数据丢失问题？⭐⭐

原因：因为vuex里的数据是保存在**运行内存**中的，当页面刷新时，页面会重新加载vue实例，vuex里面的数据就会被清空。
解决方法：将vuex中的数据直接保存到浏览器缓存中。（一般是用sessionStorage）

#### computed和watch的区别？⭐⭐⭐

computed值有缓存、触发条件是依赖值发生更改、 watch无缓存支持异步、监听数据变化

computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；
watch： 更多的是观察的作用，支持异步，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

computed应用场景：需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
watch应用场景：需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

#### Route和router的区别⭐

- **route**:是路由信息对象，包括“path,parms,hash,name“等路由信息参数。
- **Router**:是路由实例对象，包括了路由跳转方法，钩子函数等。

#### v-show和v-if的区别⭐

- **v-if**:组件的销毁和重建，更适合带有权限的操作，切换开大。如果开始条件为false则什么都不做，只有为true才会编译。
- **v-show**:css切换，隐藏显示更适合频繁切换。在任何情况下都会被编译，然后被缓存，而且dom元素会被保留。

#### vue中父子组件传值，父组件异步请求，子组件不能实时更新怎么解决？（vue中数据不能实时更新怎么解决？）⭐⭐⭐

首先了解父子组件生命周期执行顺序 ==>
加载渲染数据过程
父组件 beforeCreate -->
父组件 created -->
父组件 beforeMount -->
子组件 beforeCreate -->
子组件 created -->
子组件 beforeMount -->
子组件 mounted -->
父组件 mounted -->
原因：因为生命周期只会执行一次，数据是要等到异步请求以后才能拿到，那么子组件的mounted钩子执行的时候，还没有拿到父组件传递过来的数据，但是又必须要打印出来结果，那这样的话，就只能去打印props中的默认值空字符串了，所以打印的结果是一个空字符串。

解决办法：

1. **使用v-if控制组件渲染的时机**
   初始还没拿到后端接口的异步数据的时候，不让组件渲染，等拿到的时候再去渲染组件。使用v-if="变量"去控制，初始让这个变量为false，这样的话，子组件就不会去渲染，等拿到数据的时候，再让这个变量变成true，
   举例：

```js
  data() {
    return {
      isTrue:false // 初始为false
    };
  },
  monted(){
  this.$post.a.b.c.getData(res=>{
        if(res.result){
            this.isTrue = true
         }
     })
  }

```

1. **使用watch监听数据的变化**
   举例：

```js
  props: {
    tableData: {
      type: Array,
      default: [],
    },
  },
  watch: {
     tableData(val){
         console.log(val)
     }
  },

```

3. **使用VueX**

#### Vue 中 $nextTick 作用与原理？⭐⭐⭐

 $nextTick的作用是：该方法中的代码会在当前渲染完成后执行，就解决了异步渲染获取不到更新后DOM的问题了。 n e x t T i c k 的 原 理 ： nextTick的原理：nextTick的原理：nextTick本质是返回一个Promise 。

应用场景：在created()里面想要获取操作Dom，把操作DOM的方法放在$nextTick中

#### Vue 中 for循环为什么加 key？⭐⭐

为了性能优化， 因为vue是虚拟DOM，更新DOM时用diff算法对节点进行一一比对，比如有很多li元素，要在某个位置插入一个li元素，但没有给li上加key，那么在进行运算的时候，就会将所有li元素重新渲染一遍，但是如果有key，那么它就会按照key一一比对li元素，只需要创建新的li元素，插入即可，不需要对其他元素进行修改和重新渲染。
key也不能是li元素的index，因为假设我们给数组前插入一个新元素，它的下标是0，那么和原来的第一个元素重复了，整个数组的key都发生了改变，这样就跟没有key的情况一样了。

### http

#### 如何解决跨域⭐⭐

<https://juejin.cn/post/6844903882083024910#heading-4>

#### 浏览器如何渲染页面的？⭐

浏览器解析html源码，将HTML转换成dom树，
将CSS样式转换成stylesheet（CSS规则树），
浏览器会将CSS规则树附着在DOM树上，并结合两者生成渲染树（Render Tree）
生成布局（flow），浏览器通过解析计算出每一个渲染树节点的位置和大小，在屏幕上画出渲染树的所有节点
合成绘制生成页面。

#### 防抖与节流⭐⭐⭐

防抖：触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
应用场景：
提交按钮、用户注册时候的手机号验证、邮箱验证、

节流：高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。
应用场景：
window对象的resize、scroll事件
拖拽时候的mousemove
射击游戏中的mousedown、keydown事件
文字输入、自动完成的keyup事件
<https://blog.csdn.net/Jet_Lover/article/details/120372116>

#### webpack是怎么打包的，babel又是什么⭐

Webpack：把所有依赖打包成一个 bundle.js文件，通过代码分割成单元片段并按需加载。Webpack是以公共JS的形式来书写脚本的，但对AMD/CMD的支持也很全面，方便旧项目进行代码迁移。
把项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。

babel将es6、es7、es8等语法转换成浏览器可识别的es5或es3语法。

#### webSocket ⭐

webSocket：可以让服务器主动向客户端发送消息，适合开发聊天室，多人游戏等协作应用。

WebSocket协议是基于TCP的一种新的网络协议。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

### 其他

#### 合并多个对象并去重

**原因**：普通去重不能去除对象。
**解决方法**：可看[数组中有对象去除](https://blog.csdn.net/Jet_Lover/article/details/120826517)

#### 移动端1px问题

**原因**：手机分辨率高，它的实际物理像素数更多了，不同手机屏幕分辨率不同，一般都差不多2倍左右，所以显得更粗。
**解决方法**：可以参考[第二篇CSS的11题](#用css实现高度为05像素的线条)。
