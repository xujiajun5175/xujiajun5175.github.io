# CSS 选择器<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

## 1.CSS 基础选择器

### `.class`选择器

---

多个类值可以链接在一起。

```css
element1.classname element1.classname1.classname2
```

如果在点之前没有元素名称，则选择器匹配包含该类值的所有元素。

### `#id`选择器

---

`#id` 选择器指定具有 id 的元素的样式。

`#id` 选择器使用 “#” 来选择具有包含特定值的 ID 的元素。

id 值的名称必须紧跟在 octothorpe（＃）后面。

```css
element1#idname
```

如果没有元素名称在＃之前，则选择器匹配包含该 ID 值的所有元素。

id 通常在 HTML 文档中是唯一的。

### `*`选择器

---

`*`选择器选择所有元素。

`*`选择器匹配文档中的每个元素，包括 html 和 body 元素。

`*`选择器可用于为另一个元素内的所有元素添加样式。

```css
div *
```

### `element`选择器

---

`element`选择器将样式添加到具有指定元素名称的所有元素。

```css
body {
  background: #fff;
}
p {
  font-size: 1em;
}
```

## 2.CSS 组合选择器

### `element,element`

---

用于选取第一个指定的元素之后(不是内部)紧跟的元素。

要使用相同的样式来样式化多个元素，我们可以使用逗号分隔每个元素名称。这样，我们将选择器分组在一起，并对它们进行同样的样式。

`element,element`称为组选择器。

例如，在样式表中，通常有具有相同样式的元素。

```css
h1 {
  color: green;
}
h2 {
  color: green;
}
p {
  color: green;
}
```

我们可以分组选择器。用逗号分隔每个选择器。

```css
h1,
h2,
p {
  color: green;
}
```

### `element element`

---

`element element`称为嵌套选择器或后代选择器。它用于选择元素内部的元素。

我们可以使用后代选择器来根据它的状态选择一个元素作为另一个元素的后代。

匹配的元素可以是祖先元素的孩子，孙子，曾孙等等。

**例子：**

```css
body h1 {
  font-size: 100%;
}
table tr td div ul li {
  color: red;
}
```

### `element>element`

---

`element>element` 选择器为特定父元素的元素添加样式。

`element1>element2` 也称为子选择器。

此选择器将基于其状态的元素作为另一个元素的子元素。这比后代选择器更具限制性，因为只有一个孩子将被匹配。

**注意:** 元素没有被选中是不能直接指定父级的子元素。

**例子：**

```css
div > p {
  color: yellow;
}
ul > li {
  font-weight: bold;
}
```

### `element+element`

---

`element+element` 选择器用于选择（不是内部）指定的第一个元素之后紧跟的元素。

`element+element` 也称为相邻同级选择器。

此选择器选择作为另一个元素的以下相邻兄弟的元素。两个元素之间的任何文本都将被忽略;仅考虑元素及其在文档树中的位置。

**例子：**

```css
table + p {
  margin-top: 2em;
}
h1 + * {
  margin-top: 0;
}
```

### `element1~element2`

---

`element1~element2` 选择器选择前面有 element1 的 element2。

element1 和 element2 这两个元素必须具有相同的父元素。element2 不必紧跟在 element1 之前。

设置同一父元素下的 p 元素之后的每一个 ul 元素的背景颜色：

```css
p~ul
{
background:#ff0000;
}
```

## 3.CSS 属性选择器

### [attribute]选择器

---

[attribute]选择器选择具有指定属性的元素。

element1 [attribute]也称为简单属性选择器。

简单属性选择器根据属性的存在选择任何元素，而不管属性的值。

**例子：**

```css
a[rel] {
  border-bottom: 3px double gray;
}
p[class] {
  border: 1px dotted silver;
}
```

选择所有带有 target 属性的 <a>元素：

```css
a[target] {
  background-color: yellow;
}
```

### [attribute=value] 选择器

---

[attribute = value] 选择器选择具有指定属性和值的元素。

element1 [attr =“value"] 也称为精确属性值选择器。

element1 [attr =“value”] 基于属性的精确和完整值选择任何元素。

**例子：**

```css
a[rel='Start'] {
  font-weight: bold;
}
p[class='urgent'] {
  color: red;
}
```

选择所有使用 target="\_blank"的 a 元素

```css
a[target='_blank'] {
  background-color: yellow;
}
```

### [attribute~=value] 选择器

---

[attribute〜= value] 选择器选择具有包含指定单词的属性值的元素。

element1 [attr〜=“value”] 也称为部分属性值选择器

部分属性值选择器基于属性的空格分隔值的一部分选择任何元素。

**例子：**

```css
a[rel~='friend'] {
  text-transform: uppercase;
}
p[class~='warning'] {
  background: yellow;
}
```

选择标题属性包含单词"flower"的所有元素

````css
[title~=flower]
{
 background-color:yellow;
}```
````

### [attribute|=value] 选择器

---

[_attribute_|=_value_]选择器用于选择指定属性具有指定值开始的元素。

element1 [lang | =“lc”]也称为语言属性选择器。

语言属性选择器选择任何具有 lang 属性的元素，其值为连字符分隔的值列表，从选择器中提供的值开始。

!> **注意:** 该值是整个单词，无论是单独像 lang="en"，或者像连字符(-)连接的如 lang ="en-us"都可以。

**例子：**

```css
html[lang|='tr'] {
  color: red;
}
```

### [attribute^=value] 选择器

---

[attribute^=value] 选择器匹配元素属性值带指定的值开始的元素。

设置 class 属性值以"test"开头的所有 div 元素的背景颜色：

```css
div[class^='test'] {
  background: #ffff00;
}
```

### [attribute$=value] 选择器

---

[attribute$=value] 选择器匹配元素属性值带指定的值结尾的元素。

设置 class 属性值以"test"结尾的所有元素的背景颜色：

```css
[class$='test'] {
  background: #ffff00;
}
```

### [*attribute\*\*=*value\*] 选择器

---

[attribute\*=value] 选择器匹配元素属性值包含指定值的元素。

## 4.CSS 伪元素选择器

### `:active`选择器

---

`:active` 向活动的链接添加特殊的样式，当你点击一个链接时它变成活动链接。

`:active` 选择器匹配激活元素，不限于用户可以与之交互的元素。

`:active` 是一个伪类选择器，它适用于被激活的元素。

最常见的示例是单击 HTML 文档中的超链接：当按住鼠标按钮时，链接处于活动状态。

**提示:** [:link](#link选择器) 选择器设置了未访问过的页面链接样式, [:visited](#visited选择器) 选择器设置访问过的页面链接的样式, [:hover](#hover选择器) 选择器当有鼠标悬停在其上的链接样式。

!> 注意: 为了产生预期的效果，在 CSS 定义中，:active 必须位于:hover 之后！！

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>W3Cschool教程(w3cschool.cn)</title>
    <style>
      a:link {
        color: green;
      }
      a:visited {
        color: green;
      }
      a:hover {
        color: red;
      }
      a:active {
        color: yellow;
      }
    </style>
  </head>
  <body>
    <p>
      将鼠标移上并点击此链接: <a href="http://www.w3cschool.cn">w3cschool.cn</a>
    </p>
  </body>
</html>
```

### `:after`选择器

---

`:after` 选择器向选定的元素之后插入内容。

`:after` 是伪元素，并且它生成包含放置在元素中的内容之后的生成内容的伪元素。

使用[content](zh-cn/browser-side/css/css3-属性#content) 属性来指定要插入的内容。

?> 默认情况下，此伪元素是内联的，但是可以使用属性显示更改。

**例子：**

```css
a.external:after  {content: " "  url(image.gif);)
p:after {content: " | ";}
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>W3Cschool教程(w3cschool.cn)</title>
    <style>
      p:after {
        content: '- Remember this';
        background-color: yellow;
        color: red;
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    <p>My name is Donald</p>
    <p>I live in Ducksburg</p>

    <p>
      <b>注意:</b>:after作用于IE8 以及更早版本的浏览器,DOCTYPE 必须已经声明.
    </p>
  </body>
</html>
```

### `:before`选择器

---

`:before` 选择器向选定的元素前插入内容。

`:before` 是伪元素，并且它生成包含放置在元素中的内容之前的生成内容的伪元素。

使用[content](zh-cn/browser-side/css/css3-属性#content)属性来指定要插入的内容。

默认情况下，生成的伪元素是内联的，但这可以使用属性显示更改。

**例子：**

```css
a[href]:before  {content: "[LINK]";)
p:before {content: attr(class);}
```

### `:checked`选择器

---

`:checked`选择器匹配每个选中的输入元素

!> 仅适用于单选按钮或复选框。

您可以组合`:checked` 与`:not` 选择器以选择未选中的元素。

为所有选中的输入元素设置背景颜色：

````css
input:checked
{
  background:#ff0000;
}```
````

### `:disabled`选择器

一些元素具有启用和禁用状态，例如表单元素。

:disabled 选择器匹配每个禁用的的元素（主要用于表单元素）。

!> :enabled 选择器不匹配任何无法禁用的元素。

设置所有 type="text"的禁用的输入元素的背景颜色：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>W3Cschool教程(w3cschool.cn)</title>
    <style>
      input[type='text']:enabled {
        background: #ffff00;
      }
      input[type='text']:disabled {
        background: #dddddd;
      }
    </style>
  </head>
  <body>
    <form action="">
      First name: <input type="text" value="Mickey" /><br />
      Last name: <input type="text" value="Mouse" /><br />
      Country:
      <input type="text" disabled="disabled" value="Disneyland" /><br />
    </form>
  </body>
</html>
```

### `:empty`选择器

:empty 选择器选择每个没有任何子级的元素，包括文本节点。

指定空的 p 元素的背景色：

```css
p:empty {
  background: #ff0000;
}
```

### `:enabled`选择器

一些元素具有启用和禁用状态，例如表单元素。

:enabled 选择器匹配每个启用的的元素（主要用于表单元素）。:enabled 选择器不匹配任何无法禁用的元素。

设置所有 type="text"的启用的输入元素的背景颜色：

```css
input[type='text']:enabled {
  background: #ffff00;
}
```

### `:first-child`选择器

:first-child 选择器匹配第一个子元素。

:first-child 是一个伪类，它适用于任何元素，它是另一个元素的第一个子元素。

使用:first-child 伪类，一个元素只有当它是另一个元素的第一个子元素时才匹配。例如，p:first-child 将选择作为某个其他元素的第一个子元素的任何 p 元素。如果要选择段落的第一个子元素，我们可以使用 p>\*:first-child。

例子：

```css
body *:first-child {
  font-weight: bold;
}
p:first-child {
  font-size: 125%;
}
```

匹配属于父元素中第一个子元素的每个<p>元素

```css
p:first-child {
  background-color: yellow;
}
```

### `:first-letter`选择器

:first-letter 选择器用来指定元素第一个字母的样式。

:first-letter 是伪元素，它生成包含元素的第一个字母的伪元素。

:first-letter 样式是元素的第一个字母。

任何引导标点符号都应与第一个字母一起设置样式。

在 CSS2.1 之前，:first-letter 可以只附加到块级元素。CSS2.1 扩展其范围，包括块，列表项，表调用，表标题和内联块元素。可以应用到首字母的属性是有限的。

例子：

```css
h1:first-letter {
  font-size: 166%;
}
p:first-letter {
  text-decoration: underline;
}
```

:first-letter 选择器用来指定元素第一个字母的样式。

:first-letter 是伪元素，它生成包含元素的第一个字母的伪元素。

:first-letter 样式是元素的第一个字母。

任何引导标点符号都应与第一个字母一起设置样式。

在 CSS2.1 之前，:first-letter 可以只附加到块级元素。CSS2.1 扩展其范围，包括块，列表项，表调用，表标题和内联块元素。可以应用到首字母的属性是有限的。

例子：

```css
h1:first-letter {
  font-size: 166%;
}
p:first-letter {
  text-decoration: underline;
}
```

?> 提示: :first-letter 选择器可以使用以下属性：

- font properties
- color properties
- background properties
- margin properties
- padding properties
- border properties
- text-decoration
- vertical-align (only if float is 'none')
- text-transform
- line-height
- float
- clear

!> 注意: "first-letter" 选择器仅适用于在块级元素中.

每个 <p>元素的第一个字母选择的样式：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>W3Cschool教程(w3cschool.cn)</title>
    <style>
      p:first-letter {
        font-size: 200%;
        color: #8a2be2;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to My Homepage</h1>
    <p>My name is Donald.</p>
    <p>I live in Duckburg.</p>
    <p>My best friend is Mickey.</p>
  </body>
</html>
```

### `:first-line`选择器

:first-line 选择器用来指定选择器第一行的样式。

:first-line 是伪元素，它生成包含元素的第一个格式化行的伪元素。

:first-line 样式表示元素中的第一行文本，无论该行中可能出现多少个词。

:first-line 只能附加到块级元素。可以应用到首字母的属性是有限的。

例子：

```css
p.lead:first-line {
  font-weight: bold;
}
```

?> 注意: :first-line 选择器可以使用以下属性：

- font properties
- color properties
- background properties
- word-spacing
- letter-spacing
- text-decoration
- vertical-align
- text-transform
- line-height
- clear

!> 注意: "first-line" 选择器适用于块级元素中。

### `:first-of-type`选择器

:first-of-type 选择器匹配元素其父级是特定类型的第一个子元素。

?> 提示: 等同于 :nth-of-type(1)。

指定其父级的第一个 p 元素的背景色：

```css
p:first-of-type {
  background: #ff0000;
}
```

### `:focus`选择器

:focus 选择器用于选择具有焦点的元素。

:focus 是一个伪类，它适用于具有焦点的元素。

:focus 应用于元素具有焦点的时间内。

一个例子是其中具有文本输入光标的输入框。其他元素，如超链接，也可以有焦点。

例子：

```css
a:focus {
  outline: 1px dotted red;
}
input:focus {
  background: yellow;
}
```

?> 提示: :focus 选择器接受键盘事件或其他用户输入的元素。

### `:hover`选择器

:hover 在鼠标移到链接上时添加的特殊样式。

:hover 是一个伪类，它适用于处于悬停状态的元素。

最常见的例子是将鼠标指针移动到超链接的边界内。

例子：

```css
a[href]:hover {
  text-decoration: underline;
}
p:hover {
  background: yellow;
}
```

?> 提示: :hover 选择器可用于所有元素，不仅是链接。

?> 提示: [:link选择器](#link选择器)置了未访问过的页面链接样式, [:visited选择器](#visited选择器) 选择器设置访问过的页面链接的样式 [:active 选择器](#active选择器)设置当你点击链接时的样式。

!> 注意: 为了产生预期的效果，在 CSS 定义中，:hover 必须位于 :link 和 :visited 之后！！

选择鼠标移到链接上的样式：

```css
a:hover
{
  background-color:yellow;
}
```

### `:in-range`选择器

:in-range 选择器匹配范围内的输入元素，用于标签的值在指定区间值时显示的样式。

!> 注意： :in-range 选择器只作用于能指定区间值的元素，例如 input 元素中的 min 和 max 属性。

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
input:in-range
{
 border:2px solid yellow;
}
</style>
</head>
<body>

<h3>:in-range 选择器实例演示。</h3>

<input type="number" min="5" max="10" value="7" />

<p>在input中输入一个值 (小于 5 或者 大于 10), 查看样式的变化。</p>

</body>
</html>
```

### `:invalid`选择器

[:valid](#valid选择器) 和 :invalid 选择器分别匹配已满足或失败其输入验证要求的输入元素。

:invalid 选择器用于在表单元素中的值是非法时设置指定样式。

!> 注意： :invalid 选择器只作用于能指定区间值的元素，例如 input 元素中的 min 和 max 属性，及正确的 email 字段, 合法的数字字段等。

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
input:invalid
{
 border:2px solid red;
}
</style>
</head>
<body>

<h3> :invalid 选择器实例演示。</h3>

<input type="email" value="supportEmail" />

<p>请输入合法 e-mail 地址，查看样式变化。</p>

</body>
</html>
```

### `:lang`选择器

:lang 向带有指定 lang 属性开始的元素添加样式。

:lang 是一个伪类，它适用于具有相关联的语言编码信息的任何元素。

:lang 基于其人类语言编码匹配元素。这种语言信息必须包含在文档中或以其他方式与文档相关联。处理 :lang与 |= 属性选择器相同。

例如，在HTML文档中，元素的语言由其lang属性确定。

例子：

```css
html:lang(en)  {background: silver;}
*:lang(fr) {quotes: 'q ' ' q';}
```

!> 注意: 值是整个单词，单独像lang="en"，或者使用连字符(-)如lang ="en-us"。

每个<p>元素lang属性值等于"it(Italian)" 的选择的样式：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
p:lang(it)
{
 background:yellow;
}
</style>
</head>
<body>

<p>I live in Italy.</p>
<p lang="it">Ciao bella!</p>

<p><b>注意:</b> :lang 作用于IE8,  DOCTYPE必须已经声明.</p>

</body>
</html>
```

### `:last-child`选择器

:last-child选择器用来匹配父元素中最后一个子元素。

?> 提示: p:last-child等同于p:nth-last-child(1)。

### `:last-of-type`选择器

:last-of-type选择器匹配元素其父级是特定类型的最后一个子元素。

?> 提示: 和:nth-last-of-type(1)是一个意思。

### `:link`选择器

:link 选择器选择未访问的链接，向未访问的链接添加特殊的样式。

:link 是一个伪类，它适用于到另一个未被访问的资源的超链接。

:link 适用于未访问的URL的链接。未访问的URL是链接点不会显示在用户代理的历史记录中的URL。

此状态与 :visited 状态互斥。

例子：

```css
a:link  {color: blue;}
*:link {text-decoration: underline;}
```

!> 注意: :link 选择器对已经访问的链接没有样式。

?> 提示: 使用 [:visited选择器](#visited选择器)设置访问过的页面链接的样式，[:hover选择器](#hover选择器)当有鼠标悬停在其上的链接样式，[:active选择器](#active选择器)设置当你点击链接时的样式。

### `:not`选择器

:not 选择器匹配每个元素不是指定的元素/选择器。

否定选择器允许您反转任何选择。此选择器在CSS3中添加。它具有以下格式：

`not(selector)`

为每个并非<p>元素的元素设置背景颜色：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
p {
    color: yellow;
}

:not(p) {
    color: red;
}
</style>
</head>
<body>

<h1>这是一个标题</h1>

<p>这是一个段落.</p>
<p>这是另一个段落.</p>

<div>这是div元素的一些文本。</div>

<a href="http://www.w3cschool.cn/" target="_blank">链接到W3Cschool教程</a>


</body>
</html>
```

### `:nth-child()`选择器

:nth-child(n)选择器匹配父元素中的第n个子元素。参数是元素的索引。

索引从1开始。

n 可以是一个数字，一个关键字，或者一个公式。

?> 提示: 请参阅[:nth-of-type()选择器](#nth-of-type选择器)。该选择器匹配同类型中的第n个同级兄弟元素。

指定每个p元素匹配父元素中的第2个子元素的背景色：

```css
p:nth-child(2)
{
  background:#ff0000;
}
```

### `:nth-last-child()`选择器

:nth-last-child(n)选择器匹配同类型中的倒数第n个同级兄弟元素。

参数是元素的索引。

索引从1开始。

n 可以是一个数字，一个关键字，或者一个公式。

?> 提示: 请参阅 [:nth-last-of-type()选择器](#nth-last-of-type选择器)。该选择器匹配父元素中的倒数第n个结构子元素。

### `:nth-last-of-type`选择器

:nth-last-of-type(n)选择器匹配同类型中的倒数第n个同级兄弟元素(CSS3)。参数是元素的索引。索引从1开始。

n 可以是一个数字，一个关键字，或者一个公式。

?> 提示: 请参阅: [:nth-last-child()选择器](#nth-last-child选择器)。该选择器匹配父元素中的倒数第n个结构子元素

### `:nth-of-type()`选择器

:nth-of-type(n)选择器匹配同类型中的第n个同级兄弟元素。参数是元素的索引。索引从1开始。

n可以是一个数字，一个关键字，或者一个公式。

提示: 请参阅 [:nth-child() 选择器](#nth-child选择器)。该选择器匹配父元素中的第n个子元素。

### `:only-of-type`选择器

:only-of-type选择器匹配属于同类型中唯一同级元素。

### `:only-child`选择器

:only-child选择器匹配属于父元素中唯一子元素的元素。

### `:optional`选择器

:optional 选择器选择没有必需属性的表单元素，在表单元素是可选项时设置指定样式。

表单元素中如果没有特别设置 required 属性即为 optional 属性。

!> 注意: :optional 选择器只适用于表单元素: input, select 和 textarea。

如果 input 元素没有设置 "required" 属性，设置其为黄色:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
input:optional
{
background-color: yellow;
}
</style>
</head>
<body>

<h3>:optional 选择器演示实例。</h3>

<p>可选的 input 元素:<br><input></p>

<p>必填的 input 元素:<br><input required></p>

<p> :optional 选择器用于表单中未设置"required" 属性的元素。</p>

</body>
</html>
```

### `:out-of-range`选择器

:out-of-range 选择器用于标签的值在指定区间之外时显示的样式。

!> 注意： :out-of-range 选择器只作用于能指定区间之外值的元素，例如 input 元素中的 min 和 max 属性。

### `:read-only`选择器

:read-only 选择器用于选取设置了 "readonly" 属性的元素。

表单元素可以设置 "readonly" 属性来定义元素只读。

!> 注意： 目前，大多数浏览器, :read-only 选择器适用于 input 和 textarea 元素，但是它也适用于设置了 "readonly" 属性的元素。

### `:read-write`选择器

:read-write 选择器用于匹配可读及可写的元素。

!> 注意: 目前, 在大多浏览器中, :read-write 选择器只使用于设置了input 和 textarea 元素。

### `:required`选择器

:required 选择器选择具有必需属性的表单元素，在表单元素是必填项时设置指定样式。

表单元素可以使用 required 属性来设置必填项。

!> 注意： :required 选择器只适用于表单元素: input, select 和 textarea。

### `:root`选择器

:root 选择器选择文档中的根元素。它总是返回html元素。

:root 由CSS3添加。

### `::selection`选择器

::selection 选择器匹配元素中被用户选中或处于高亮状态的部分。

::selection 只可以应用于少数的CSS属性：color, background, cursor,和outline。

### `:target`选择器

＃ 锚的名称是在一个文件中链接到某个元素的URL。元素被链接到目标元素。例如，example.html＃myelement转到在example.html中的id为“myelement”的元素。

:target选择器可用于当前活动的target元素的样式。

### `:valid`选择器

:valid 和 [:invalid 选择器](#invalid选择器)分别匹配已满足或失败其输入验证要求的输入元素。
:valid 选择器在表单元素的值需要根据指定条件验证时设置指定样式。

!> 注意: :valid 选择器只作用于能指定区间值的元素，例如 input 元素中的 min 和 max 属性，及正确的 email 字段, 合法的数字字段等。

### `:visited`选择器

:visited 向访问过的链接添加特殊的样式。

:visited 是伪类，并且它适用于到已经访问的另一资源的超链接。

:visited 适用于指向已访问的URL的链接，访问URL是链接点显示在用户代理的历史记录中的网址。

这种状态与 [:link](#link选择器) 状态互斥。

例子：

```css
a:visited  {color: purple;}
*:visited {color: gray;}
```

!> 提示：使用:visited选择器设置访问过的页面链接的样式， [:hover选择器](#hover选择器)当有鼠标悬停在其上的链接样式，[:active 选择器](#active选择器)设置当你点击链接时的样式。
