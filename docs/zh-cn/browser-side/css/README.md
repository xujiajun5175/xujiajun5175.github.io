# CSS<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

## 1.CSS 简介

### 1.1.什么是 CSS?

---

- CSS 指层叠样式表 ( **C**ascading **S**tyle **S**heets )
- 样式定义**如何显示** HTML 元素
- 样式通常存储在**样式表**中
- 把样式添加到 HTML 4.0 中，是为了**解决内容与表现分离的问题**
- **外部样式表**可以极大提高工作效率
- 外部样式表通常存储在 **CSS 文件**中
- 多个样式定义可**层叠**为一
- 样式对网页中元素位置的排版进行像素级精确控制

### 1.2.样式层叠

---

样式层叠就是对一个元素多次设置同一个样式，这将使用最后一次设置的属性值。

#### 样式层叠次序

当同一个 HTML 元素定义了多个样式时，应该使用哪个样式？

一般而言，所有的样式会根据下面的规则层叠于一个新的虚拟样式表中，其中数字 4 拥有最高的优先权。

1. 浏览器缺省设置
2. 外部样式表
3. 内部样式表（位于 `<head>` 标签内部）
4. 内联样式（在 HTML 元素内部）

因此，内联样式（在 HTML 元素内部）拥有最高的优先权，这意味着它将优先于以下的样式声明： 标签中的样式声明，外部样式表中的样式声明，或者浏览器中的样式声明（缺省值）。

### 1.3.语法

---

CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明:

![img](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/5OSHLb000selector.gif)

选择器通常是您需要改变样式的 HTML 元素。

每条声明由一个属性和一个值组成。

属性（property）是您希望设置的样式属性（style attribute）。每个属性有一个值。属性和值被冒号分开。

#### 1.3.1.CSS 颜色值的写法

在描述颜色的时候，除了使用英文单词 red，我们还可以使用十六进制的颜色值 #ff0000：

```css
p {
  color: #ff0000;
}
或者 p {
  color: #f00;
}
```

还可以通过两种方法使用 RGB 值：

```css
p {
  color: rgb(255, 0, 0);
}
p {
  color: rgb(100%, 0%, 0%);
}
```

!> **提示：**当使用 RGB 百分比时，即使当值为 0 时也要写百分比符号。但是在其他的情况下就不需要这么做了。比如说，当尺寸为 0 像素时，0 之后不需要使用 px 单位。

### 1.4.CSS 注释

---

注释是用来解释你的代码，并且可以随意编辑它，浏览器会忽略它。

CSS 注释以 "`/*`" 开始, 以 "`*/`" 结束

## 2.CSS 选择器

参考[CSS3 选择器](zh-cn/browser-side/css/css3/css3-选择器)

## 3.CSS 创建

### 3.1.如何插入样式表

---

插入样式表的方法有三种:

- 外部样式表
- 内部样式表
- 内联样式

#### 3.1.1.外部样式表

标签在（文档的）头部

```html
<head>
  <link rel="stylesheet" type="text/css" href="mystyle.css" />
</head>
```

浏览器会从文件 mystyle.css 中读到样式声明，并根据它来格式文档

#### 3.1.2.内部样式表

当单个文档需要特殊的样式时，就应该使用内部样式表。你可以使用 `<style>`标签在文档头部定义内部样式表，就像这样:

```html
<head>
  <style>
    hr {
      color: sienna;
    }

    p {
      margin-left: 20px;
    }

    body {
      background-image: url('images/back40.gif');
    }
  </style>
</head>
```

3.1.3.内联样式

由于要将表现和内容混杂在一起，内联样式会损失掉样式表的许多优势。请慎用这种方法，例如当样式仅需要在一个元素上应用一次时。

要使用内联样式，你需要在相关的标签内使用样式（style）属性。Style 属性可以包含任何 CSS 属性。本例展示如何改变段落的颜色和左外边距：

```html
<p style="color:sienna;margin-left:20px">这是一个段落。</p>
```

### 3.2.多重样式

---

如果某些属性在不同的样式表中被同样的选择器定义，那么属性值将从更具体的样式表中被继承过来。

#### 3.2.1.多重样式将层叠为一个

样式表允许以多种方式规定样式信息。样式可以规定在单个的 HTML 元素中，在 HTML 页的头元素中，或在一个外部的 CSS 文件中。甚至可以在同一个 HTML 文档内部引用多个外部样式表。

##### 3.2.1.1.层叠次序

当同一个 HTML 元素被不止一个样式定义时，会使用哪个样式呢？

一般而言，所有的样式会根据下面的规则层叠于一个新的虚拟样式表中，其中数字 4 拥有最高的优先权。

1. 浏览器缺省设置
2. 外部样式表
3. 内部样式表（位于 head 标签内部）
4. 内联样式（在 HTML 元素内部）

因此，内联样式（在 HTML 元素内部）拥有最高的优先权，这意味着它将优先于以下的样式声明： 标签中的样式声明，外部样式表中的样式声明，或者浏览器中的样式声明（缺省值）。

##### 3.2.1.2.多重样式优先级顺序

下列是一份优先级逐级增加的选择器列表，其中数字 7 拥有最高的优先权：

1. 通用选择器（\*）
2. 元素(类型)选择器
3. 类选择器
4. 属性选择器
5. 伪类
6. ID 选择器
7. 内联样式

##### 3.2.1.3.!important 规则例外

当 !important 规则被应用在一个样式声明中时，该样式声明会覆盖 CSS 中任何其他的声明，无论它处在声明列表中的哪里。尽管如此，!important 规则还是与优先级毫无关系。使用 !important 不是一个好习惯，因为它改变了你样式表本来的级联规则，从而使其难以调试。

一些经验法则：

- Always 要优化考虑使用样式规则的优先级来解决问题而不是 !important
- Only 只在需要覆盖全站或外部 css（例如引用的 ExtJs 或者 YUI ）的特定页面中使用 !important
- Never 永远不要在全站范围的 CSS 上使用 !important
- Never 永远不要在你的插件中使用 !important

### 3.3.权重计算

---

![201712181559548677](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/FXIF3C0001513584051697589.png)

以下是对于上图的解释：

- 内联样式表的权值最高 1000
- ID 选择器的权值为 100
- Class 类选择器的权值为 10
- HTML 标签选择器的权值为 1

### 3.4.CSS 优先级法则

---

- A 选择器都有一个权值，权值越大越优先；
- B 当权值相等时，后出现的样式表设置要优于先出现的样式表设置；
- C 创作者的规则高于浏览者：即网页编写者设置的 CSS 样式的优先权高于浏览器所设置的样式；
- D 继承的 CSS 样式不如后来指定的 CSS 样式；
- E 在同一组属性设置中标有 "!important" 规则的优先级最大；

## 4.CSS 背景

CSS 背景属性用于定义 HTML 元素的背景。

CSS 属性定义背景效果：

- [`background`](zh-cn/browser-side/css/css3-属性#background)
- [`background-color`](zh-cn/browser-side/css/css3-属性#background-color)
- [`background-image`](zh-cn/browser-side/css/css3-属性#background-image)
- [`background-repeat`](zh-cn/browser-side/css/css3-属性#background-repeat)
- [`background-attachment`](zh-cn/browser-side/css/css3-属性#background-attachment)
- [`background-position`](zh-cn/browser-side/css/css3-属性#background-position)

### 4.1.背景颜色

---

`background-color` 属性定义了元素的背景颜色。

```css
body {
  background-color: #b0c4de;
}
```

?> **提示：**`background-color` 不能继承，其默认值是`transparent`。如果一个元素没有指定背景色，那么背景就是透明的，这样其父元素的背景才可见。

### 4.2.背景图像

#### 4.2.1.平铺

---

`background-image` 属性描述了元素的背景图像.

默认情况下，背景图像进行平铺重复显示，以覆盖整个元素实体。

#### 4.2.2. 水平或垂直平铺

---

如果需要在 HTML 页面上对背景图像进行平铺，可以使用 [`background-repeat`](zh-cn/browser-side/css/css3-属性#background-repeat) 属性。

默认情况下 `background-image` 属性会在页面的水平或者垂直方向平铺。

一些图像如果在水平方向与垂直方向平铺，这样看起来很不协调，如下所示:

```css
body {
  background-image: url('gradient2.png');
}
```

如果图像只在水平方向平铺`(repeat-x)`, 页面背景会更好些:

```css
body {
  background-image: url('gradient2.png');
  background-repeat: repeat-x;
}
```

#### 4.2.3.设置定位与不平铺

---

?> 让背景图像不影响文本的排版

如果你不想让图像平铺，你可以使用 `background-repeat` 属性:

```css
body {
  background-image: url('img_tree.png');
  background-repeat: no-repeat;
}
```

以上实例中，背景图像与文本显示在同一个位置，为了让页面排版更加合理，不影响文本的阅读，我们可以改变图像的位置。

可以利用 `background-position` 属性改变图像在背景中的位置:

```css
body {
  background-image: url('img_tree.png');
  background-repeat: no-repeat;
  background-position: right top;
}
```

?> **提示：**为 `background-position` 属性提供值有很多方法。首先，可以使用一些关键字：`top`、`bottom`、`left`、`right` 和 `center`；<br>其次，可以使用长度值，如 100px 或 5cm；<br>最后也可以使用百分数值。<br>不同类型的值对于背景图像的放置稍有差异。

##### 关键字

图像放置关键字最容易理解的作用就像其名字的意义。例如，`top` `left` 使图像放置在元素内边距区的左上角。

!> 只要保证不超过两个关键字：一个对应水平方向，另一个对应垂直方向，那么你可以设置位置关键字以任何顺序出现。

如果只有一个关键字，则会默认另一个关键字为 `center`。

下面是等价的位置关键字：

| 单一关键字 | 等价的关键字                   |
| :--------- | :----------------------------- |
| center     | center center                  |
| top        | top center 或 center top       |
| bottom     | bottom center 或 center bottom |
| right      | right center 或 center right   |
| left       | left center 或 center left     |

##### 百分数值

百分数值的表现方式更为复杂。假设你希望用百分数值将图像在其元素中居中，你可以按照下面的代码进行设置：

```css
body {
  background-image: url('img_tree.png');

  background-repeat: no-repeat;

  background-position: 50% 50%;
}
```

##### 长度值

长度值解释的是元素内边距区左上角的偏移，偏移点是图像的左上角。

比如，如果设置值为 50px 100px，图像的左上角将在元素内边距区左上角向右 50 像素、向下 100 像素的位置上：

```css
body {
  background-image: url('img_tree.png');

  background-repeat: no-repeat;

  background-position: 50px 100px;
}
```

!> 注意，这一点与百分数值不同，因为偏移只是从一个左上角到另一个左上角。也就是说，图像的左上角与 `background-position` 声明中的指定的点对齐。

### 4.3.背景- 简写属性

---

在以上实例中我们可以看到页面的背景颜色通过了很多的属性来控制。

为了简化这些属性的代码，我们可以将这些属性合并在同一个属性中.

背景颜色的简写属性为 "background":

```css
body {
  background: #ffffff url('img_tree.png') no-repeat right top;
}
```

当使用简写属性时，属性值的顺序为：:

- `background-color`
- `background-image`
- `background-repeat`
- `background-attachment`
- `background-position`

以上属性无需全部使用，你可以按照页面的实际需要使用.

## CSS 文本

**CSS Text 文本格式**

通过 CSS 的 Text 属性，你可以改变页面中文本的颜色、字符间距、对齐文本、装饰文本、对文本进行缩进等等，你可以观察下述的一段简单的应用了 CSS 文本格式的段落。

### 文本颜色

颜色是通过 CSS 最经常的指定：

- 十六进制值 - 如"＃FF0000"
- 一个 RGB 值 - "RGB（255,0,0）"
- 颜色的名称 - 如"红"

参阅 [CSS 颜色值](#CSS颜色名称) 查看完整的颜色值。

---

### 文本对齐

文本排列属性是用来设置文本的水平对齐方式。

文本可居中或对齐到左或右,两端对齐.

当 `text-align`设置为`justify`，每一行被展开为宽度相等，左，右外边距是对齐（如杂志和报纸）。

```css
h1 {
  text-align: center;
}
p.date {
  text-align: right;
}
p.main {
  text-align: justify;
}
```

?> **提示：**如果想把一个行内元素的第一行“缩进”，可以用左内边距或外边距创造这种效果。

---

### 文本修饰

`text-decoration`属性用来设置或删除文本的装饰。

从设计的角度看 `text-decoration` 属性主要是用来删除链接的下划线：

```css
a {
  text-decoration: none;
}
```

也可以这样装饰文字：

```css
h1 {
  text-decoration: overline;
}
h2 {
  text-decoration: line-through;
}
h3 {
  text-decoration: underline;
}
```

!> 不建议强调指出不是链接的文本，因为这常常混淆用户。

---

### 文本转换

文本转换属性是用来指定在一个文本中的大写和小写字母。

可用于所有字句变成大写或小写字母，或每个单词的首字母大写。

```css
p.uppercase {
  text-transform: uppercase;
}
p.lowercase {
  text-transform: lowercase;
}
p.capitalize {
  text-transform: capitalize;
}
```

---

### 文本缩进

文本缩进属性是用来指定文本的第一行的缩进。

CSS 提供了 `text-indent` 属性，该属性可以方便地实现文本缩进。

通过使用 `text-indent` 属性，所有元素的第一行都可以缩进一个给定的长度。

```css
p {
  text-indent: 50px;
}
```

---

### 文本间隔

`word-spacing` 属性可以改变字（单词）之间的标准间隔。其默认值 `normal`与设置值为 0 是一样的。

指定段字之间的空间，应该是 30 像素：

```css
p {
  word-spacing: 30px;
}
```

---

### 所有 CSS 文本属性

| 属性                                                                | 描述                     |
| :------------------------------------------------------------------ | :----------------------- |
| [color](zh-cn/browser-side/css/css3-属性#color)                     | 设置文本颜色             |
| [direction](zh-cn/browser-side/css/css3-属性#direction)             | 设置文本方向。           |
| [letter-spacing](zh-cn/browser-side/css/css3-属性#letter-spacing)   | 设置字符间距             |
| [line-height](zh-cn/browser-side/css/css3-属性#line-height)         | 设置行高                 |
| [text-align](zh-cn/browser-side/css/css3-属性#text-align)           | 对齐元素中的文本         |
| [text-decoration](zh-cn/browser-side/css/css3-属性#text-decoration) | 向文本添加修饰           |
| [text-indent](zh-cn/browser-side/css/css3-属性#text-indent)         | 缩进元素中文本的首行     |
| [text-shadow](zh-cn/browser-side/css/css3-属性#text-shadow)         | 设置文本阴影             |
| [text-transform](zh-cn/browser-side/css/css3-属性#text-transform)   | 控制元素中的字母         |
| [unicode-bidi](zh-cn/browser-side/css/css3-属性#unicode-bidi)       | 设置或返回文本是否被重写 |
| [vertical-align](zh-cn/browser-side/css/css3-属性#vertical-align)   | 设置元素的垂直对齐       |
| [white-space](zh-cn/browser-side/css/css3-属性#white-space)         | 设置元素中空白的处理方式 |
| [word-spacing](zh-cn/browser-side/css/css3-属性#word-spacing)       | 设置字间距               |

## CSS 字体

## CSS 链接

### 链接样式

不同的链接可以有不同的样式。

链接的样式，可以用任何 CSS 属性（如颜色，字体，背景等）。

特别的链接，可以有不同的样式，这取决于他们是什么状态。

这四个链接状态是：

- `a:link` - 正常，未访问过的链接
- `a:visited` - 用户已访问过的链接
- `a:hover` - 当用户鼠标放在链接上时
- `a:active` - 链接被点击的那一刻

```css
a:link {
  color: #ff0000;
} /* 未访问链接*/
a:visited {
  color: #00ff00;
} /* visited link */
a:hover {
  color: #ff00ff;
} /* mouse over link */
a:active {
  color: #0000ff;
} /* selected link */
```

当设置为若干链路状态的样式，也有一些顺序规则：

- `a:hover` 必须跟在`a:link` 和 `a:visited` 后面
- `a:active` 必须跟在 `a:hover` 后面

> 参考:[link 选择器](zh-cn/browser-side/css/css3/css3-选择器#link选择器),[hover 选择器](zh-cn/browser-side/css/css3/css3-选择器#hover选择器),[visited 选择器](zh-cn/browser-side/css/css3/css3-选择器#visited选择器),[active 选择器](zh-cn/browser-side/css/css3/css3-选择器#active选择器)

---

### 常见的链接样式

#### 文本修饰

`text-decoration` 属性主要用于删除链接中的下划线：

```css
a:link {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
a:active {
  text-decoration: underline;
}
```

#### 背景颜色

背景颜色属性指定链接背景色：

```css
a:link {
  background-color: #b2ff99;
}
a:visited {
  background-color: #ffff85;
}
a:hover {
  background-color: #ff704d;
}
a:active {
  background-color: #ff704d;
}
```

#### 鼠标形状

常用鼠标形状如下所示：

| 属性值    | 描述               |
| :-------- | :----------------- |
| default   | 默认光标，箭头     |
| pointer   | 超链接的指针，手型 |
| wait      | 指示程序正在忙     |
| help      | 指示可用的帮忙     |
| text      | 指示文本           |
| crosshair | 鼠标呈现十字状     |

```css
a:hover {
  color: green;

  cursor: crosshair;
}
```

---

### 实例

[添加不同样式的超链接](https://www.w3cschool.cn/tryrun/showhtml/trycss_link2)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>W3Cschool教程(w3cschool.cn)</title>
    <style>
      a.one:link {
        color: #ff0000;
      }
      a.one:visited {
        color: #0000ff;
      }
      a.one:hover {
        color: #ffcc00;
      }

      a.two:link {
        color: #ff0000;
      }
      a.two:visited {
        color: #0000ff;
      }
      a.two:hover {
        font-size: 150%;
      }

      a.three:link {
        color: #ff0000;
      }
      a.three:visited {
        color: #0000ff;
      }
      a.three:hover {
        background: #66ff66;
      }

      a.four:link {
        color: #ff0000;
      }
      a.four:visited {
        color: #0000ff;
      }
      a.four:hover {
        font-family: monospace;
      }

      a.five:link {
        color: #ff0000;
        text-decoration: none;
      }
      a.five:visited {
        color: #0000ff;
        text-decoration: none;
      }
      a.five:hover {
        text-decoration: underline;
      }
    </style>
  </head>

  <body>
    <p>将鼠标移至链接上改变样式.</p>

    <p>
      <b
        ><a class="one" href="/css/" target="_blank"
          >这个链接会改变字体颜色</a
        ></b
      >
    </p>
    <p>
      <b
        ><a class="two" href="/css/" target="_blank"
          >这个链接会改变字体大小</a
        ></b
      >
    </p>
    <p>
      <b
        ><a class="three" href="/css/" target="_blank"
          >这个链接会改变背景颜色</a
        ></b
      >
    </p>
    <p>
      <b
        ><a class="four" href="/css/" target="_blank"
          >这个链接会改变字体样式</a
        ></b
      >
    </p>
    <p>
      <b
        ><a class="five" href="/css/" target="_blank"
          >这个链接会改变下划线</a
        ></b
      >
    </p>
  </body>
</html>
```

[高级 - 创建链接框](https://www.w3cschool.cn/tryrun/showhtml/trycss_link_advanced)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>W3Cschool教程(w3cschool.cn)</title>
    <style>
      a:link,
      a:visited {
        display: block;
        font-weight: bold;
        color: #ffffff;
        background-color: #98bf21;
        width: 120px;
        text-align: center;
        padding: 4px;
        text-decoration: none;
      }
      a:hover,
      a:active {
        background-color: #7a991a;
      }
    </style>
  </head>

  <body>
    <a href="/css/" target="_blank">This is a link</a>
  </body>
</html>
```

---

## CSS 列表

在 HTML 中，有两种类型的列表:

- 无序列表 - 列表项的标记使用特殊图形（如小黑点、小方框等）
- 有序列表 - 列表项的标记使用数字或字母

使用 CSS，可以列出进一步的样式，并可用图像作列表项标记。

---

### 不同的列表项标记

`list-style-type` 属性指定列表项标记的类型是：

```css
ul.a {
  list-style-type: circle;
}
ul.b {
  list-style-type: square;
}

ol.c {
  list-style-type: upper-roman;
}
ol.d {
  list-style-type: lower-alpha;
}
```

一些值是无序列表，以及有些是有序列表。

下列是对 `list-style-type` 属性的常见属性值的描述：

- `none`：不使用项目符号
- `disc`：实心圆
- `circle`：空心圆
- `square`：实心方块
- `decimal`：阿拉伯数字
- `lower-alpha`：小写英文字母
- `upper-alpha`：大写英文字母
- `lower-roman`：小写罗马数字
- `upper-roman`：大写罗马数字

---

### 作为列表项标记的图像

要指定列表项标记的图像，使用列表样式图像属性：

```css
ul {
  list-style-image: url('sqpurple.gif');
}
```

上面的例子在各大主流浏览器中的显示有所差异，IE 和 Opera 显示图像标记比火狐（ Firefox ），Chrome 和 Safari 更高一点点。

> 提示：
>
> - 利用 `list-style-position` 可以确定标志出现在列表项内容之外还是内容内部。
> - 如果你想在所有的浏览器放置同样的形象标志，就应使用浏览器兼容性解决方案，方法如下。\*\*

---

### 浏览器兼容性解决方案

同样在所有的浏览器，下面的例子会显示的图像标记：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>W3Cschool教程(w3cschool.cn)</title>
    <style>
      ul {
        list-style-type: none;
        padding: 0px;
        margin: 0px;
      }
      ul li {
        background-image: url('/statics/images/w3c/sqpurple.gif');
        background-repeat: no-repeat;
        background-position: 0px 5px;
        padding-left: 14px;
      }
    </style>
  </head>

  <body>
    <ul>
      <li>咖啡</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ul>
  </body>
</html>
```

例子解释：

- ul :
  - 设置列表样式类型为没有列表项标记
  - 设置填充和边距 0px（浏览器兼容性）
- ul 中所有 li :
  - 设置图像的 URL ，并设置它只显示一次（无重复）
  - 您需要的定位图像位置（左 0px 和上下 5px ）
  - 用 `padding-left` 属性把文本置于列表中

---

### 列表 -简写属性

在单个属性中可以指定所有的列表属性。这就是所谓的简写属性。

为列表使用简写属性，列表样式属性设置如下：

```css
ul {
  list-style: square url('sqpurple.gif');
}
```

如果使用缩写属性值的顺序是：

1. `list-style-type`
2. `list-style-position` (有关说明，请参见下面的 CSS 属性表)
3. `list-style-image`

在简写属性时，如果上述值丢失一个，其余仍在指定的顺序，就没关系。

---

### 实例

所有不同的列表标记

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>W3Cschool教程(w3cschool.cn)</title>
    <style>
      ul.a {
        list-style-type: circle;
      }
      ul.b {
        list-style-type: disc;
      }
      ul.c {
        list-style-type: square;
      }

      ol.d {
        list-style-type: armenian;
      }
      ol.e {
        list-style-type: cjk-ideographic;
      }
      ol.f {
        list-style-type: decimal;
      }
      ol.g {
        list-style-type: decimal-leading-zero;
      }
      ol.h {
        list-style-type: georgian;
      }
      ol.i {
        list-style-type: hebrew;
      }
      ol.j {
        list-style-type: hiragana;
      }
      ol.k {
        list-style-type: hiragana-iroha;
      }
      ol.l {
        list-style-type: katakana;
      }
      ol.m {
        list-style-type: katagana-iroha;
      }
      ol.n {
        list-style-type: lower-alpha;
      }
      ol.o {
        list-style-type: lower-greek;
      }
      ol.p {
        list-style-type: lower-latin;
      }
      ol.q {
        list-style-type: lower-roman;
      }
      ol.r {
        list-style-type: upper-alpha;
      }
      ol.s {
        list-style-type: upper-latin;
      }
      ol.t {
        list-style-type: upper-roman;
      }

      ol.u {
        list-style-type: none;
      }
      ol.v {
        list-style-type: inherit;
      }
    </style>
  </head>

  <body>
    <ul class="a">
      <li>Circle 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ul>

    <ul class="b">
      <li>Disc 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ul>

    <ul class="c">
      <li>Square 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ul>

    <ol class="d">
      <li>Armenian 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="e">
      <li>Cjk-ideographic 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="f">
      <li>Decimal 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="g">
      <li>Decimal-leading-zero 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="h">
      <li>Georgian 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="i">
      <li>Hebrew 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="j">
      <li>Hiragana 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="k">
      <li>Hiragana-iroha 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="l">
      <li>Katakana 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="m">
      <li>Katakana-iroha 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="n">
      <li>Lower-alpha 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="o">
      <li>Lower-greek 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="p">
      <li>Lower-latin 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="q">
      <li>Lower-roman 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="r">
      <li>Upper-alpha 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="s">
      <li>Upper-latin 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="t">
      <li>Upper-roman 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="u">
      <li>None 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>

    <ol class="v">
      <li>inherit 样式</li>
      <li>茶</li>
      <li>可口可乐</li>
    </ol>
  </body>
</html>
```

---

### 所有属性

| 属性                                                                        | 描述                                               |
| :-------------------------------------------------------------------------- | :------------------------------------------------- |
| [list-style](zh-cn/browser-side/css/css3-属性#list-style)                   | 简写属性。用于把所有用于列表的属性设置于一个声明中 |
| [list-style-image](zh-cn/browser-side/css/css3-属性#list-style-image)       | 将图象设置为列表项标志。                           |
| [list-style-position](zh-cn/browser-side/css/css3-属性#list-style-position) | 设置列表中列表项标志的位置。                       |
| [list-style-type](zh-cn/browser-side/css/css3-属性#list-style-type)         | 设置列表项标志的类型。                             |

---

## CSS 表格

### 表格边框

指定 CSS 表格边框，使用 `border` 属性。

下面的例子指定了一个表格的 `th` 和 `td` 元素的黑色边框：

```css
table, th, td
{ border: 1px solid black; }
```

!> 请注意，在上面的例子中的表格有双边框。这是因为表和 `th / td` 元素有独立的边界。<br>为了显示一个表的单个边框，使用 `border-collapse`属性。

---

### 折叠边框

`border-collapse` 属性设置表格的边框是否被折叠成一个单一的边框或隔开：

```css
table
{ border-collapse:collapse; }
table,th, td { border: 1px solid black; }
```

---

### 表格宽度和高度

`width` 和`height` 属性定义表格的宽度和高度。

下面的例子是设置 100％ 的宽度，50 像素的 th 元素的高度的表格：

```css
table
{ width:100%; }
th { height:50px; }
```

---

### 表格文字对齐

表格中的文本对齐和垂直对齐属性。

text-align 属性设置水平对齐方式，像左，右，或中心：

```css
td
{ text-align:right; }
```

垂直对齐属性设置垂直对齐，比如顶部，底部或中间：

```css
td
{ height:50px; vertical-align:bottom; }
```

---

### 表格填充

如果在表的内容中控制空格之间的边框，应使用 td 和 th 元素的填充属性：

```css
td
{ padding:15px; }
```

---

#### 表格颜色

下面的例子指定边框的颜色，和 th 元素的文本和背景颜色：

```css
table, td, th
{ border:1px solid green; }
th
{ background-color:green; color:white; }
```

---

### 更多实例

[制作一个个性表格](https://www.w3cschool.cn/tryrun/showhtml/trycss_table_fancy)
这个例子演示了如何创建一个个性的表格。

[设置表格标题的位置](https://www.w3cschool.cn/tryrun/showhtml/trycss_table_caption-side)
这个例子演示了如何定位表格标题。

[指定表格的宽度和高度](https://www.w3cschool.cn/tryrun/showhtml/trycss_table_width)

这个例子演示了如何指定表格的高度与宽度。

---

## CSS 盒子模型

**CSS Box Model (盒子模型)**

**所有 HTML 元素可以看作盒子，在 CSS 中，"box model "这一术语是用来设计和布局时使用。**

CSS 盒模型本质上是一个盒子，封装周围的 HTML 元素，它包括：边距，边框，填充，和实际内容。

盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

下面的图片说明了盒子模型 (Box Model)：

![img](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/WsaSki000box-model.gif)

不同部分的说明：

- **[Margin(外边距)](#css-外边距)** - 清除边框区域。Margin 没有背景颜色，它是完全透明
- **[Border（边框）](#css-边框)** - 边框周围的填充和内容。边框是受到盒子的背景颜色影响
- **[Padding（内边距）](css-内边距)** - 清除内容周围的区域。会受到框中填充的背景颜色影响
- **Content（内容）** - 盒子的内容，显示文本和图像

?> **提示：**在盒模型中，外边距可以是负值，而且在很多情况下都要使用负值的外边距。

> 扩展: [CSS盒子模型](zh-cn/browser-side/css/other/CSS-盒子模型.md)

---

## CSS 边框

CSS 边框 (border) 可以是围绕元素内容和内边距的一条或多条线，对于这些线条，您可以自定义它们的样式、宽度以及颜色。使用 CSS 边框属性，我们可以创建出比 HTML 中更加优秀的效果。

<div style="width:93%;border:10px groove #98bf21;padding:8px">
     <h2>CSS 边框属性</h2>
    <p>CSS边框属性允许你指定一个元素边框的样式和颜色。</p>
</div>

---

### 边框样式

边框样式属性指定要显示什么样的边界。

**border-style**属性用来定义边框的样式

#### border-style 值

<p style="border: 1px none #000000;padding:3px">none: 默认无边框</p>

<p style="border: 1px dotted #000000;padding:3px">dotted: 定义一个点线框</p>

<p style="border: 1px dashed #000000;padding:3px">dashed: 定义一个虚线框</p>

<p style="border: 1px solid #000000;padding:3px">solid: 定义实线边界</p>

<p style="border: 3px double #000000;padding:3px">double: 定义两个边界。 两个边界的宽度和border-width的值相同</p>

<p style="border: 5px groove #98bf21;padding:3px">groove: 定义3D沟槽边界。效果取决于边界的颜色值</p>

<p style="border: 5px ridge #98bf21;padding:3px">ridge: 定义3D脊边界。效果取决于边界的颜色值</p>

<p style="border: 5px inset #98bf21;padding:3px">inset:定义一个3D的嵌入边框。效果取决于边界的颜色值</p>

<p style="border: 5px outset #98bf21;padding:3px">outset: 定义一个3D突出边框。 效果取决于边界的颜色值</p>

```css
<style>
    p.none {border-style:none;}
    p.dotted {border-style:dotted;}
    p.dashed {border-style:dashed;}
    p.solid {border-style:solid;}
    p.double {border-style:double;}
    p.groove {border-style:groove;}
    p.ridge {border-style:ridge;}
    p.inset {border-style:inset;}
    p.outset {border-style:outset;}
    p.hidden {border-style:hidden;}
</style>
```

---

### 边框宽度

您可以通过 border-width 属性为边框指定宽度。

为边框指定宽度有两种方法：可以指定长度值，比如 2px 或 0.1em；或者使用 3 个关键字之一，它们分别是 thin 、medium（默认值） 和 thick。

!> **注意：**CSS 没有定义 3 个关键字的具体宽度，所以一个用户代理可能把 thin 、medium 和 thick 分别设置为等于 5px、3px 和 2px，而另一个用户代理则分别设置为 3px、2px 和 1px。

```css
p.one
{
border-style:solid;
border-width:5px;
}
p.two
{
border-style:solid;
border-width:medium;
}
```

!> **注意:** "border-width" 属性 如果单独使用则不起作用. 要先使用 "border-style" 属性来设置 borders .

---

### 边框颜色

border-color 属性用于设置边框的颜色，它一次可以接受最多 4 个颜色值。可以设置的颜色：

- name - 指定颜色的名称，如 "red"
- RGB - 指定 RGB 值, 如 "rgb(255,0,0)"
- Hex - 指定16进制值, 如 "#ff0000"

您还可以设置边框的颜色为"transparent"。

!> **注意：** border-color 单独使用是不起作用的，必须得先使用 border-style 来设置边框样式。

```css
p.one
{
border-style:solid;
border-color:red;
}
p.two
{
border-style:solid;
border-color:#98bf21;
}
```

---

### 边框-单独设置各边

在 CSS 中，可以指定不同的侧面不同的边框：

```css
p
{
border-top-style:dotted;
border-right-style:solid;
border-bottom-style:dotted;
border-left-style:solid;
}
```

等价于

```css
border-style:dotted solid;
```

border-style 属性可以有 1-4 个值：

- border-style:dotted solid double dashed;
  - 上边框是 dotted
  - 右边框是 solid
  - 底边框是 double
  - 左边框是 dashed
- border-style:dotted solid double;
  - 上边框是 dotted
  - 左、右边框是 solid
  - 底边框是 double
- border-style:dotted solid;
  - 上、底边框是 dotted
  - 左、右边框是 solid
- border-style:dotted;
  - 四面边框是 dotted

上面的例子用了 border-style。然而，它也可以和 border-width 、 border-color 一起使用。

---

### 透明边框

CSS2 引入了边框颜色值 transparent，这个值用于创建有宽度的不可见边框。

透明样式的定义如下：

```css
a:link, a:visited {

border-style: solid; border-width: 5px; border-color: transparent;

} a:hover {border-color: gray;}
```

利用 transparent，使用边框就像是额外的内边距一样；此外还有一个好处，就是能在你需要的时候使其可见。这种透明边框相当于内边距，因为元素的背景会延伸到边框区域（如果有可见背景的话）。

---

### 边框-简写属性

上面的例子用了很多属性来设置边框。

你也可以在一个属性中设置边框。

你可以在"border"属性中设置：

- border-width
- border-style (required)
- border-color

```css
border:5px solid red;
```

---

### 更多实例

[所有边框属性在一个声明之中](https://www.w3cschool.cn/tryrun/showhtml/trycss_border-top)
本例演示用简写属性来将所有四个边框属性设置于同一声明中。

[设置下边框的样式](https://www.w3cschool.cn/tryrun/showhtml/trycss_border-bottom-style)
本例演示如何设置下边框的样式。

[设置左边框的宽度](https://www.w3cschool.cn/tryrun/showhtml/trycss_border-left-width)
本例演示如何设置左边框的宽度。

[设置四个边框的颜色](https://www.w3cschool.cn/tryrun/showhtml/trycss_border-color)
本例演示如何设置四个边框的颜色。可以设置一到四个颜色。

[设置右边框的颜色](https://www.w3cschool.cn/tryrun/showhtml/trycss_border-right-color)
本例演示如何设置右边框的颜色。

---

### CSS 边框属性

| 属性                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [border](zh-cn/browser-side/css/css3-属性#border)     | 简写属性，用于把针对四个边的属性设置在一个声明。             |
| [border-style](zh-cn/browser-side/css/css3-属性#border-style) | 用于设置元素所有边框的样式，或者单独地为各边设置边框样式。   |
| [border-width](zh-cn/browser-side/css/css3-属性#border-width) | 简写属性，用于为元素的所有边框设置宽度，或者单独地为各边边框设置宽度。 |
| [border-color](zh-cn/browser-side/css/css3-属性#border-color) | 简写属性，设置元素的所有边框中可见部分的颜色，或为 4 个边分别设置颜色。 |
| [border-bottom](zh-cn/browser-side/css/css3-属性#border-bottom) | 简写属性，用于把下边框的所有属性设置到一个声明中。           |
| [border-bottom-color](zh-cn/browser-side/css/css3-属性#border-bottom-color) | 设置元素的下边框的颜色。                                     |
| [border-bottom-style](zh-cn/browser-side/css/css3-属性#border-bottom-style) | 设置元素的下边框的样式。                                     |
| [border-bottom-width](zh-cn/browser-side/css/css3-属性#border-bottom-width) | 设置元素的下边框的宽度。                                     |
| [border-left](zh-cn/browser-side/css/css3-属性#border-left) | 简写属性，用于把左边框的所有属性设置到一个声明中。           |
| [border-left-color](zh-cn/browser-side/css/css3-属性#border-left-color) | 设置元素的左边框的颜色。                                     |
| [border-left-style](zh-cn/browser-side/css/css3-属性#border-left-style) | 设置元素的左边框的样式。                                     |
| [border-left-width](zh-cn/browser-side/css/css3-属性#border-left-width) | 设置元素的左边框的宽度。                                     |
| [border-right](zh-cn/browser-side/css/css3-属性#border-right) | 简写属性，用于把右边框的所有属性设置到一个声明中。           |
| [border-right-color](zh-cn/browser-side/css/css3-属性#border-right-color) | 设置元素的右边框的颜色。                                     |
| [border-right-style](zh-cn/browser-side/css/css3-属性#border-right-style) | 设置元素的右边框的样式。                                     |
| [border-right-width](zh-cn/browser-side/css/css3-属性#border-right-width) | 设置元素的右边框的宽度。                                     |
| [border-top](zh-cn/browser-side/css/css3-属性#border-top) | 简写属性，用于把上边框的所有属性设置到一个声明中。           |
| [border-top-color](zh-cn/browser-side/css/css3-属性#border-top-color) | 设置元素的上边框的颜色。                                     |
| [border-top-style](zh-cn/browser-side/css/css3-属性#border-top-style) | 设置元素的上边框的样式。                                     |
| [border-top-width](zh-cn/browser-side/css/css3-属性#border-top-width) | 设置元素的上边框的宽度。                                     |

---

## CSS 轮廓

### **Outlines**

轮廓（outline）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。

轮廓（outline）属性指定了样式，颜色和外边框的宽度。

轮廓（outline）属性的位置让它不像边框那样参与到文档流中，因此轮廓出现或消失时不会影响文档流，即不会导致文档的重新显示。

---

### 轮廓（outline）实例

[在元素周围画线](https://www.w3cschool.cn/tryrun/showhtml/trycss_outline)
本例演示使用outline属性在元素周围画一条线。.

[设置轮廓的样式](https://www.w3cschool.cn/tryrun/showhtml/trycss_outline-style)
本例演示如何设置轮廓的样式。

[设置轮廓的颜色](https://www.w3cschool.cn/tryrun/showhtml/trycss_outline-color)
本例演示如何设置轮廓的颜色。

[设置轮廓的宽度](https://www.w3cschool.cn/tryrun/showhtml/trycss_outline-width)
本例演示如何设置轮廓的宽度。

---

### CSS 轮廓（outline）

轮廓（outline）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。

CSS outline 属性规定元素轮廓的样式、颜色和宽度。

![Outline](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/jKGZPf000box_outline.gif)

---

### 所有 CSS 轮廓（outline）属性

"CSS" 列中的数字表示哪个 CSS 版本定义了该属性 ( CSS1 或者 CSS2 )。

| 属性                                                         | 说明                             | 值                                                           | CSS  |
| :----------------------------------------------------------- | :------------------------------- | :----------------------------------------------------------- | :--- |
| [outline](zh-cn/browser-side/css/css3-属性#outline) | 在一个声明中设置所有的外边框属性 | *outline-color outline-style outline-width*inherit          | 2    |
| [outline-offset](zh-cn/browser-side/css/css3-属性#outline-offset) | outline-offset属性设置轮廓框架在 border 边缘外的偏移 | *length* inherit          | 2    |
| [outline-color](zh-cn/browser-side/css/css3-属性#outline-color) | 设置外边框的颜色                 | *color-name hex-number rgb-number*invert inherit            | 2    |
| [outline-style](zh-cn/browser-side/css/css3-属性#outline-style) | 设置外边框的样式                 | none dotted dashed solid double groove ridge inset outset inherit | 2    |
| [outline-width](zh-cn/browser-side/css/css3-属性#outline-width) | 设置外边框的宽度                 | thin medium thick *length*inherit                           | 2    |

---

## CSS 外边距

### CSS Margin(外边距)

CSS Margin (外边距)属性定义元素周围的空间。

CSS Margin 属性接受任何长度单位、百分数值甚至负值。

---

### Margin

margin 清除周围的元素（外边框）的区域。margin 没有背景颜色，是完全透明的

margin 可以单独改变元素的上，下，左，右边距。也可以一次改变所有的属性。

### 可能的值

| 值       | 说明                                        |
| :------- | :------------------------------------------ |
| auto     | 设置浏览器边距。 这样做的结果会依赖于浏览器 |
| *length* | 定义一个固定的margin（使用像素，pt，em等）  |
| *%*      | 定义一个使用百分比的边距                    |

---

## CSS 内边距

### CSS Padding（填充/内边距）

CSS Padding（填充）属性定义元素边框与元素内容之间的空间。

------

### Padding（填充/内边距）

当元素的 Padding（填充）（内边距）被清除时，所"释放"的区域将会受到元素背景颜色的填充。

单独使用填充属性可以改变上下左右的填充。缩写填充属性也可以使用，一旦改变一切都改变。

### 可能的值

| 值     | 说明                                |
| :----- | :---------------------------------- |
| length | 定义一个固定的填充(像素, pt, em,等) |
| %      | 使用百分比值定义一个填充            |

!> **提示：**CSS padding 属性可以使用长度值或百分比值，但与 margin 属性不同，它不允许使用负值。

---

### 内边距的百分比数值

CSS padding 属性的百分比数值是相对于其父元素的 width 计算的，如果改变了父元素的 width，则它们也会改变。

以下是将段落的内边距设置为父元素 width 的 20% 的示例：

```css
p {padding: 20%;}
```

假设一个段落的父元素是 div 元素，那么它的 padding 的 width 计算是根据 div 进行的：

!> **注意：**上下内边距与左右内边距一致，即上下内边距的百分数会相对于父元素宽度设置，而不是相对于高度。

---

### 填充- 单边内边距属性

在CSS中，它可以指定不同的侧面不同的填充：

```css
p.padding
{
 padding-top:25px;
 padding-bottom:25px;
 padding-right:50px;
 padding-left:50px;
}
```

---

### 填充 - 简写属性

为了缩短代码，它可以在一个属性中指定的所有填充属性。

这就是所谓的缩写属性。所有的填充属性的缩写属性是"padding":

```css
padding:25px 50px;
```

Padding 属性，可以有一到四个值。

**padding:25px 50px 75px 100px;**

- 上填充为25px
- 右填充为50px
- 下填充为75px
- 左填充为100px

**padding:25px 50px 75px;**

- 上填充为25px
- 左右填充为50px
- 下填充为75px

**padding:25px 50px;**

- 上下填充为25px
- 左右填充为50px

**padding:25px;**

- 所有的填充都是25px

---

### 更多实例

[在一个声明中的所有填充属性](https://www.w3cschool.cn/tryrun/showhtml/trycss_padding)
这个例子演示了使用缩写属性设置在一个声明中的所有填充属性，可以有一到四个值。

[设置左部填充](https://www.w3cschool.cn/tryrun/showhtml/trycss_padding-left)
这个例子演示了如何设置元素左填充。

[设置右部填充](https://www.w3cschool.cn/tryrun/showhtml/trycss_padding-right)
这个例子演示了如何设置元素右填充。.

[设置上部填充](https://www.w3cschool.cn/tryrun/showhtml/trycss_padding-top)
这个例子演示了如何设置元素上填充。

[设置下部填充](https://www.w3cschool.cn/tryrun/showhtml/trycss_padding-bottom)
这个例子演示了如何设置元素下填充。

---

### 所有的CSS填充属性

| 属性                                                         | 说明                                       |
| :----------------------------------------------------------- | :----------------------------------------- |
| [padding](zh-cn/browser-side/css/css3-属性#padding)          | 使用缩写属性设置在一个声明中的所有填充属性 |
| [padding-bottom](zh-cn/browser-side/css/css3-属性#padding-bottom) | 设置元素的底部填充                         |
| [padding-left](zh-cn/browser-side/css/css3-属性#padding-left) | 设置元素的左部填充                         |
| [padding-right](zh-cn/browser-side/css/css3-属性#padding-right) | 设置元素的右部填充                         |
| [padding-top](zh-cn/browser-side/css/css3-属性#padding-top) | 设置元素的顶部填充                         |

---

## CSS 分组和嵌套
