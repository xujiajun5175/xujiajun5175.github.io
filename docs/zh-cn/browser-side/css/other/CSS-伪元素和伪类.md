# CSS-伪元素和伪类<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

> [CSS教程:伪元素和伪类](zh-cn/browser-side/css/README#CSS-伪类)

在CSS中，模式匹配（pattern match）规则决定文档树上的元素使用究竟哪个样式规则。这个模式就叫做选择器（selector）。

---

## CSS选择器

CSS中的元素选择器除了可以id（`#`）、class（`.`）、属性（`[]`）选取元素以外，还有很重要的一类，就是根据元素的状态来选取元素，包括伪类（pseudo-class）和伪元素(pseudo-element)。

- 这些传统的选择器，包括**id选择器**、**class选择器**、**属性选择器**、**派生选择器**等等，他们是直接从HTML文档的DOM树中获取元素的
- 而**伪类**和**伪元素**选择器是预定义的，且是独立文档元素的。

?> 它们获取元素的途径也不是基于id、class、属性这些基础的元素特征，而是基于**处于特殊状态的元素（伪类）**，或者是**元素中特别的内容（伪元素）**

?> 伪类和伪元素的表示形式也使用`:`（或者`::`）与其它选择器相区分

---

## CSS伪类

**伪类**是基于元素的*特征*而不是他们的id、class、属性或者内容

一般来说，元素的特征是不可以从DOM树上推断得到的，而且其是动态的，当用户和DOM进行交互的时候，元素可以获得或者失去一个伪类。

?> 这里有一个例外，就是`:first-child`和`:lang`是可以从DOM树中推断出来的。

CSS的现有标准中，伪类包括：

| 选择器                                                       | 示例          | 示例说明                                         |
| :----------------------------------------------------------- | :------------ | :----------------------------------------------- |
| [:link](zh-cn/browser-side/css/css3/css3-选择器#link选择器)  | a:link        | 选择所有未访问链接                               |
| [:visited](zh-cn/browser-side/css/css3/css3-选择器#visited选择器) | a:visited     | 选择所有访问过的链接                             |
| [:active](zh-cn/browser-side/css/css3/css3-选择器#active选择器) | a:active      | 选择正在活动链接                                 |
| [:hover](zh-cn/browser-side/css/css3/css3-选择器#hover选择器) | a:hover       | 把鼠标放在链接上的状态                           |
| [:focus](zh-cn/browser-side/css/css3/css3-选择器#focus选择器) | input:focus   | 选择元素输入后具有焦点                           |
| [:first-child](zh-cn/browser-side/css/css3/css3-选择器#lfirst-child选择器) | p:first-child | 选择器匹配属于任意元素的第一个子元素的 <]p> 元素 |
| [:lang(*language*)](zh-cn/browser-side/css/css3/css3-选择器#lang选择器) | p:lang(it)    | 为<p>元素的lang属性选择一个开始值                |

---

## CSS伪元素

**伪元素**是创造文档树之外的对象

伪元素的内容实际上和普通DOM元素是相同的，但是它本身只是基于元素的抽象，并不存在于文档中，所以叫伪元素。



| 选择器                                                       | 示例           | 示例说明                     |
| :----------------------------------------------------------- | :------------- | :--------------------------- |
| [:first-letter](zh-cn/browser-side/css/css3/css3-选择器#first-letter选择器) | p:first-letter | 选择每个<p> 元素的第一个字母 |
| [:first-line](zh-cn/browser-side/css/css3/css3-选择器#first-line选择器) | p:first-line   | 选择每个<p> 元素的第一行     |
| [:before](zh-cn/browser-side/css/css3/css3-选择器#before选择器) | p:before       | 在每个<p>元素之前插入内容    |
| [:after](zh-cn/browser-side/css/css3/css3-选择器#after选择器) | p:after        | 在每个<p>元素之后插入内容    |

---

## 两者之间区别

首先说一下**伪类**和**伪元素**的相同之处，

> 伪类和伪元素都不出现在源文件和文档树中。也就是说在html源文件中是看不到伪类和伪元素的。

他们的不同之处，

> 伪类其实就是基于普通DOM元素而产生的不同状态，他是DOM元素的某一特征。伪元素能够创建在DOM树中不存在的抽象对象，而且这些抽象对象是能够访问到的。

!> **伪元素产生新对象，在DOM树中看不到，但是可以操作；伪类不产生新的对象，仅是DOM中一个元素的不同状态；**

---

## `:before`和`:after`使用场景

现在在一些主流的css框架中，比如[Bootstrap](http://www.bootcss.com/)，[Foundation](http://foundation.zurb.com/)等中，对`:before`及`:after`的使用较多，而且这两个伪元素在一些特定场景下的确有许多妙用。

下面，说一下我之前使用`:before`及`:after`的一个场景。

现在我们需要使用纯CSS做一个下图中的镂空箭头符号，

![img](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/UZsqOa000001.png)

对应的html代码如下:

```html
<div class="arrow arrow-top"></div>
<div class="arrow arrow-right"></div>
<div class="arrow arrow-bottom"></div>
<div class="arrow arrow-left"></div>
```

样式如下:

```css
div.arrow:before, div.arrow:after {
    content: ' ';
    height: 0;
    width: 0;
    top: 100px;
    left: 255px;
    position: absolute;
    border: 10px solid transparent;
}
div.arrow-top:before {
    border-bottom-color: #fff;
    z-index: 2;
    top: 102px;
}
div.arrow-top:after {
    border-bottom-color: #333;
    z-index: 1;
}
div.arrow-right:before {
    border-left-color: #fff;
    z-index: 2;
    left: 297px;
    top: 104px;
}
div.arrow-right:after {
    border-left-color: #333;
    z-index: 1;
    left: 300px;
    top: 104px;
}
div.arrow-bottom:before {
    border-top-color: #fff;
    top: 107px;
    left: 330px;
    z-index: 2;
}
div.arrow-bottom:after {
    border-top-color: #333;
    top: 110px;
    left: 330px;
    z-index: 1;
}
div.arrow-left:before {
    border-right-color: #fff;
    top: 103px;
    left: 355px;
    z-index: 2;
}
div.arrow-left:after {
    border-right-color: #333;
    top: 103px;
    left: 352px;
    z-index: 1;
}
```

其实原理很简单，

> 设置`.arrow`属性的`:before`和`:after`的`border`属性为`10px`，颜色为透明的。然后将`:before`和`:after`中的任意一层的`border-color`设置为可辨识的，然后使用`z-index`值较高的层遮盖`z-index`值较低的层，通过微调`top`和`left`的值达到目的

这里我们当然可以通过一些美化的手段，使得我们的箭头看起来更加好看一点，比如像下面这样，

![img](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/zIUAqk000002.png)



> [demo1](http://www.jiawin.com/css-before-after/)是一个专门介绍使用`:before`及`:after`的博文，可以学习下。



