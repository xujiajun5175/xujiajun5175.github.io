# CSS 属性<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

### background

#### 标签定义及使用说明

背景缩写属性可以在一个声明中设置所有的背景属性。

可以设置的属性分别是：background-color, background-position, background-size, background-repeat, background-origin, background-clip, background-attachment,和background-image.

如果上述值缺少一个，这不要紧，例如background：＃FF0000 URL（smiley.gif）;是允许的。

| 默认值:          | 请参阅单独的属性                                             |
| :--------------- | ------------------------------------------------------------ |
| 继承:            | no                                                           |
| 版本:            | CSS1+ CSS3中的新的属性                                       |
| JavaScript 语法: | *object* object.style.background="red url(smiley.gif) top left no-repeat" |

---

#### 语法

```css
background:bg-color bg-image position/ bg-size bg-repeat bg-origin bg-clip bg-attachment initial|[inherit](zh-cn/browser-side/css/css-关键字#inherit);
```

| 值                                                           | 说明                                             | CSS  |
| :----------------------------------------------------------- | :----------------------------------------------- | :--- |
| *[background-color](#background-color)*                      | 指定要使用的背景颜色                             | 1    |
| *[background-position](#background-position)* | 指定背景图像的位置                               | 1    |
| *[background-size](#background-size)* | 指定背景图片的大小                               | 3    |
| *[background-repeat](#background-repeat)* | 指定如何重复背景图像                             | 1    |
| *[background-origin](#background-origin)* | 指定背景图像的定位区域                           | 3    |
| *[background-clip](#background-clip)* | 指定背景图像的绘画区域                           | 3    |
| *[background-attachment](#background-attachment)* | 设置背景图像是否固定或者随着页面的其余部分滚动。 | 1    |
| *[background-image](#background-image)* | 指定要使用的一个或多个背景图像                   | 1    |

---

#### 实例

在一个div元素中设置多个背景图像（并指定他们的位置）：

```css
body { background: #00ff00 url('smiley .gif') no-repeat fixed center ; }
```

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### background-attachment

#### 定义和用法

background-attachment设置背景图像是否固定或者随着页面的其余部分滚动。

| 默认值:          | scroll                                           |
| :--------------- | ------------------------------------------------ |
| 继承:            | no                                               |
| 版本:            | CSS1                                             |
| JavaScript 语法: | object object.style.backgroundAttachment="fixed" |

---

#### 属性值

| 值      | 说明                                            |
| :------ | :---------------------------------------------- |
| scroll  | 背景图片随页面的其余部分滚动。这是默认          |
| fixed   | 背景图像是固定的                                |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit) | 指定background-attachment的设置应该从父元素继承 |
| local   | 背景图片随滚动元素滚动                          |

---

#### 实例

指定一个固定的背景图像：

```css
body
{
background-image:url('smiley.gif');
background-repeat:no-repeat;
background-attachment:fixed;
}
```

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### background-blend-mode

#### 定义和用法

background-blend-mode 属性定义了背景层的混合模式（图片与颜色）。

| 默认值:          | normal                                                       |
| :--------------- | ------------------------------------------------------------ |
| Inherited:       | no                                                           |
| Animatable:      | no. [查看 *animatable*](https://www.w3cschool.cn/cssref/css-animatable.html) |
| 版本:            | CSS3                                                         |
| JavaScript 语法: | *object*.style.backgroundBlendMode="screen"                  |

---

#### CSS 语法

```css
background-blend-mode: normal|multiply|screen|overlay|darken|lighten|color-dodge|saturation|color|luminosity;
```

---

#### 属性值

| 值          | 描述                         | 实例                                                         |
| :---------- | :--------------------------- | :----------------------------------------------------------- |
| normal      | 默认值。设置正常的混合模式。 | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode) |
| multiply    | 正片叠底模式。               | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode-multiply) |
| screen      | 滤色模式。                   | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode-screen) |
| overlay     | 叠加模式。                   | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode-overlay) |
| darken      | 变暗模式。                   | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode-darken) |
| lighten     | 变亮模式。                   | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode-lighten) |
| color-dodge | 颜色减淡模式。               | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode-color-dodge) |
| saturation  | 饱和度模式。                 | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode-saturation) |
| color       | 颜色模式。                   | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode-color) |
| luminosity  | 亮度模式。                   | [尝试一下 »](https://www.w3cschool.cn/tryrun/showhtml/playcss_background-blend-mode-luminosity) |

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### background-clip

#### 定义和用法

background-clip属性指定背景绘制区域。

| 默认值:          | border-box                                         |
| :--------------- | -------------------------------------------------- |
| 继承:            | no                                                 |
| 版本:            | CSS3                                               |
| JavaScript 语法: | *object* object.style.backgroundClip="content-box" |

---

#### 语法

```css
background-clip: border-box|padding-box|content-box;
```

| 值          | 说明                                             |
| :---------- | :----------------------------------------------- |
| border-box  | 默认值。背景绘制在边框方框内（剪切成边框方框）。 |
| padding-box | 背景绘制在衬距方框内（剪切成衬距方框）。         |
| content-box | 背景绘制在内容方框内（剪切成内容方框）。         |

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### background-color

#### 定义和用法

background-color属性设置一个元素的背景颜色。

元素的背景是元素的总大小，包括填充和边界（但不包括边距）。

| 默认值:          | transparent                                     |
| :--------------- | ----------------------------------------------- |
| 继承:            | no                                              |
| 版本:            | CSS1                                            |
| JavaScript 语法: | *object* object.style.backgroundColor="#00FF00" |

---

#### 属性值

| 值          | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| *color*     | 指定背景颜色。在[CSS颜色值](https://www.w3cschool.cn/cssref/css-colors-legal.html)近可能的寻找一个颜色值的完整列表。 |
| transparent | 指定背景颜色应该是透明的。这是默认                           |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)     | 指定背景颜色，应该从父元素继承                               |

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### background-image

#### 定义和用法

background-image属性设置一个元素的背景图像。

元素的背景是元素的总大小，包括填充和边界（但不包括边距）。

默认情况下，background-image放置在元素的左上角，并重复垂直和水平方向。

| 默认值:          | none                                                   |
| :--------------- | ------------------------------------------------------ |
| 继承:            | no                                                     |
| 版本:            | CSS1                                                   |
| JavaScript 语法: | *object* object.style.backgroundImage="url(stars.gif)" |

!> **Tip:** 务必设置背景色，如果图像是不可用，将被使用。

---

#### 属性值

| 值           | 说明                         |
| :----------- | :--------------------------- |
| url(*'URL'*) | 图像的URL                    |
| none         | 无图像背景会显示。这是默认   |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)      | 指定背景图像应该从父元素继承 |

---

#### 实例

定义多重背景图像

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<meta charset="utf-8" />
<title>Multiple backgrounds</title>
<style>
.test{
height:300px;
background:url(/statics/images/w3c/ct_beatles.jpg) no-repeat scroll 10px 20px,url(/statics/images/w3c/ct_beatles.jpg) no-repeat scroll 50px 60px,url(/statics/images/w3c/ct_beatles.jpg) no-repeat scroll 90px 100px;
background-origin:content-box;
background-clip:padding-box;
background-size:100px 120px;
}
</style>
</head>
<body>
<div class="test">定义多重背景图像</div>
</body>
</html>
```

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### background-origin

---

#### 定义和用法

background-Origin属性指定background-position属性应该是相对位置。

**注意**如果背景图像background-attachment是"固定"，这个属性没有任何效果。

| 默认值:          | padding-box                                        |
| :--------------- | -------------------------------------------------- |
| 继承:            | no                                                 |
| 版本:            | CSS3                                               |
| JavaScript 语法: | object object.style.backgroundOrigin="content-box" |

---

#### 语法

```css
background-origin: padding-box|border-box|content-box;
```

---

#### 属性

| 值          | 描述                       |
| :---------- | :------------------------- |
| padding-box | 背景图像填充框的相对位置   |
| border-box  | 背景图像边界框的相对位置   |
| content-box | 背景图像的相对位置的内容框 |

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### background-position

#### 定义和用法

background-position属性设置背景图像的起始位置。

**注意**对于这个工作在Firefox和Opera，background-attachment必须设置为 "fixed（固定）"。

| 默认值:          | 0% 0%                                           |
| :--------------- | ----------------------------------------------- |
| 继承:            | no                                              |
| 版本:            | CSS1                                            |
| JavaScript 语法: | object object.style.backgroundPosition="center" |

---

#### 语法

```css
background-position: horizontal vertical
```

水平是

```css
percentage | length | left | center | right
```

垂直是

```css
percentage | length | top | center | bottom
```

---

#### 属性值

| 值                                                           | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| left top left center left bottom right top right center right bottom center top center center center bottom | 如果仅指定一个关键字，其他值将会是"center"                   |
| *x% y%*                                                      | 第一个值是水平位置，第二个值是垂直。左上角是0％0％。右下角是100％100％。如果仅指定了一个值，其他值将是50％。 。默认值为：0％0％ |
| *xpos ypos*                                                  | 第一个值是水平位置，第二个值是垂直。左上角是0。单位可以是像素（0px0px）或任何其他 [CSS单位](https://www.w3cschool.cn/cssref/css-units.html)。如果仅指定了一个值，其他值将是50％。你可以混合使用％和positions |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)                                                      | 指定background-position属性设置应该从父元素继承              |

---

#### 实例

如何定位background-image：

```css
body
{
background-image:url('smiley.gif');
background-repeat:no-repeat;
background-attachment:fixed;
background-position:center;
}
```

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### background-repeat

#### 标签定义及使用说明

设置如何平铺对象的 background-image 属性。

默认情况下，重复background-image的垂直和水平方向。

| 默认值:          | repeat                                   |
| :--------------- | ---------------------------------------- |
| 继承:            | no                                       |
| 版本:            | CSS1                                     |
| JavaScript 语法: | object.style.backgroundRepeat="repeat-y" |

!> **提示:** background-position属性设置背景图像位置。如果指定的位置是没有任何背景，图像总是放在元素的左上角。

---

#### 属性值

| 值        | 说明                                         |
| :-------- | :------------------------------------------- |
| repeat    | 背景图像将向垂直和水平方向重复。这是默认     |
| repeat-x  | 只有水平位置会重复背景图像                   |
| repeat-y  | 只有垂直位置会重复背景图像                   |
| no-repeat | background-image不会重复                     |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)   | 指定background-repea属性设置应该从父元素继承 |

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### background-size

#### 标签定义及使用说明

background-size属性指定背景图片大小。

| 默认值:          | auto                                             |
| :--------------- | ------------------------------------------------ |
| 继承:            | no                                               |
| 版本:            | CSS3                                             |
| JavaScript 语法: | *object* object.style.backgroundSize="60px 80px" |

---

#### 语法

```css
background-size: length|percentage|cover|contain;
```

| 值         | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| length     | 设置背景图片高度和宽度。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)" |
| percentage | 将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)" |
| cover      | 此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。 |
| contain    | 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。 |

---

#### 实例

拉伸背景图像完全覆盖内容面积。

```css
div
{
 background:url(/statics/images/course/img_flwr.gif);
 background-size:100% 100%;
 background-repeat:no-repeat;
}
```

拉伸4个横向背景图片

```css
div
{
background:url(/statics/images/course/img_flwr.gif);
background-size:25%;
border:2px solid #92b901;
}
```

---

#### 相关文章

CSS 教程: [CSS 背景](zh-cn/browser-side/css/README#_4css-背景)

---

### border

#### 标签定义及使用说明

缩写边框属性设置在一个声明中所有的边框属性。

可以设置的属性分别（按顺序）：[border-width](#border-width), [border-style](#border-style),和[border-color](#border-color).

如果上述值缺少一个没有关系，例如border：＃FF0000;是允许的

| 默认值:          | *not specified*                               |
| :--------------- | --------------------------------------------- |
| 继承:            | no                                            |
| 版本:            | CSS1                                          |
| JavaScript 语法: | *object* object.style.border="3px solid blue" |

---

#### 属性值

| 值                                                           | 说明                             |
| :----------------------------------------------------------- | :------------------------------- |
| [border-width](#border-width)                                | 指定边框的宽度                   |
| [border-style](#border-style)                                | 指定边框的样式                   |
| [border-color](#border-color)                                | 指定边框的颜色                   |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit) | 指定应该从父元素继承border属性值 |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-bottom

### border-left

### border-right

#### 标签定义及使用说明

border-bottom缩写属性设置一个声明中所有底部边框属性。

可以设置的属性分别（按顺序）：border-bottom-width, border-bottom-style,和border-bottom-color.

如果上述值缺少一个没有关系，例如border-bottom：＃FF0000;是允许的

| 默认值:          | *not specified*                                     |
| :--------------- | --------------------------------------------------- |
| 继承:            | no                                                  |
| 版本:            | CSS1                                                |
| JavaScript 语法: | *object* object.style.borderBottom="3px solid blue" |

---

#### 属性值

| 值                                                           | 描述                                       |
| :----------------------------------------------------------- | :----------------------------------------- |
| [border-bottom-width](#border-bottom-width)   | 指定底部边框宽度                           |
| [border-bottom-style](#border-bottom-style)   | 指定底部边框样式                           |
| [border-bottom-color](#border-bottom-color)  | 指定底部边框颜色                           |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)         | 指定border-bottom 属性值，应该从父元素继承 |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-bottom-color

### border-left-color

### border-right-color

#### 标签定义及使用说明

border-bottom-color属性设置元素的底部边框颜色。

**注意** 使用border-bottom颜色属性前，必须先声明border样式属性。元素必须有边框，你才可以改变颜色。

| 默认值:          | *not specified*                                |
| :--------------- | ---------------------------------------------- |
| 继承:            | no                                             |
| 版本:            | CSS1                                           |
| JavaScript 语法: | *object* object.style.borderBottomColor="blue" |

---

#### 属性值

| 值          | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| *color*     | 指定背景颜色。在CSS[颜色值 ](https://www.w3cschool.cn/cssref/css-colors-legal.html)查找颜色值的完整列表。 |
| transparent | 指定边框的颜色应该是透明的。这是默认                         |
| inherit     | 指定边框的颜色，应该从父元素继承                             |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-bottom-left-radius

### border-bottom-right-radius

#### 实例

向 div 元素的左下角添加圆角边框：

```css
div
{
border:2px solid;
border-bottom-left-radius:2em;
}
```

---

#### 定义和用法

border-bottom-left-radius 属性定义左下角边框的形状。

提示：该属性允许您向元素添加圆角边框。

| 默认值：          | 0                                           |
| :---------------- | ------------------------------------------- |
| 继承性：          | no                                          |
| 版本：            | CSS3                                        |
| JavaScript 语法： | *object*.style.borderBottomLeftRadius="5px" |

#### 语法

```css
border-bottom-left-radius: length|% [length|%];
```

**注释：**border-bottom-left-radius 属性的长度值和百分比值定义四分之一椭圆（定义外部边框边缘的边角形状）的半径（radii）。第一个值是水平半径，第二个值是垂直半径。如果省略第二个值，则复制第一个值。如果长度为零，则边角为方形，而不是圆形。水平半径的百分比值参考边框盒的宽度，而垂直半径的百分比值参考边框盒的高度。

| 值       | 描述                         | 测试                                                         |
| :------- | :--------------------------- | :----------------------------------------------------------- |
| *length* | 定义左下角的形状。           | [测试](https://www.w3cschool.cn/tryrun/showhtml/css_border-bottom-left-radius) |
| *%*      | 以百分比值定义左下角的形状。 | [测试](https://www.w3cschool.cn/tryrun/showhtml/css_border-bottom-left-radiuspercent) |

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---



### border-bottom-style

### border-left-style

### border-right-style

#### 属性定义及使用说明

border-bottom-style属性设置元素底部边框样式。

| 默认值:          | *not specified*                                  |
| :--------------- | ------------------------------------------------ |
| 继承:            | no                                               |
| 版本:            | CSS1                                             |
| JavaScript 语法: | *object* object.style.borderBottomStyle="dotted" |

---

#### 属性值

| 值      | 说明                                                         |
| :------ | :----------------------------------------------------------- |
| none    | 指定无边框                                                   |
| hidden  | 与"none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。 |
| dotted  | 指定点状边框                                                 |
| dashed  | 指定虚线边框                                                 |
| solid   | 指定实线边框                                                 |
| double  | 指定一个双边框                                               |
| groove  | 定义双线。双线的宽度等于 border-width 的值                   |
| ridge   | 定义三维菱形边框。其效果取决于 border-color 的值             |
| inset   | 定义三维凹边框。其效果取决于 border-color 的值               |
| outset  | 定义三维凸边框。其效果取决于 border-color 的值               |
| inherit | 指定应该从父元素继承边框样式                                 |

---



#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-bottom-width

### border-left-width

### border-right-width

#### 属性定义及使用说明

border-bottom-width属性设置元素的底部边框宽度。

**注意**务必先声明border-style属性才可以设置border-bottom-width属性。元素必须有边框，你才可以改变宽度。

| 默认值:          | medium                                          |
| :--------------- | ----------------------------------------------- |
| 继承:            | no                                              |
| 版本:            | CSS1                                            |
| JavaScript 语法: | *object* object.style.borderBottomWidth="thick" |

---



#### 属性值

| 值       | 说明                         |
| :------- | :--------------------------- |
| thin     | 定义细的下边框               |
| medium   | 默认值。定义中等的下边框     |
| thick    | 定义粗的下边框               |
| *length* | 允许您自定义下边框的宽度     |
| inherit  | 规定应该从父元素继承边框宽度 |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-collapse

#### 属性定义及使用说明

border-collapse 属性设置表格的边框是否被合并为一个单一的边框，还是象在标准的 HTML 中那样分开显示。

| 默认值:          | separate                                        |
| :--------------- | ----------------------------------------------- |
| 继承:            | yes                                             |
| 版本:            | CSS2                                            |
| JavaScript 语法: | *object* object.style.borderCollapse="collapse" |

---

#### 有可能的值

| 值       | 说明                                                         |
| :------- | :----------------------------------------------------------- |
| collapse | 如果可能，边框会合并为一个单一的边框。会忽略 border-spacing 和 empty-cells 属性 |
| separate | 默认值。边框会被分开。不会忽略 border-spacing 和 empty-cells 属性 |
| inherit  | 规定应该从父元素继承 border-collapse 属性的值                |

---

#### 相关文章

CSS 教程: [CSS 表格](zh-cn/browser-side/css/README#css-表格), [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-color



#### 属性定义及使用说明

border-color属性属性设置四条边框的颜色,此属性可设置 1 到 4 种颜色。

border-color 属性是一个简写属性，可设置一个元素的所有边框中可见部分的颜色，或者为 4 个边分别设置不同的颜色。请看下面的例子：

实例:

**border-color:红，绿，蓝,粉红色;**

- 上边框是红色
- 右边框是绿色
- 底部边框是蓝
- 左边框是粉红色

**border-color：红，绿，蓝;**

- 上边框是红色
- 左，右边框是绿色
- 底部边框是蓝

**border-color：红，绿;**

- 顶部和底部边框是红色
- 左右边框是绿色

**border-color：红色;**

- 所有四个边框是红色

**注意：**请始终把 border-style 属性声明到 border-color 属性之前。元素必须在您改变其颜色之前获得边框。

| 默认值:          | *not specified*                                  |
| :--------------- | ------------------------------------------------ |
| 继承:            | no                                               |
| 版本:            | CSS1                                             |
| JavaScript 语法: | *object* object.style.borderColor="#FF0000 blue" |

---

#### 属性值

| 值          | 说明                                                         |
| :---------- | :----------------------------------------------------------- |
| *color*     | 指定背景颜色。在[CSS颜色值](zh-cn/browser-side/css/README#css-颜色)查找颜色值的完整列表 |
| transparent | 指定边框的颜色应该是透明的。这是默认                         |
| inherit     | 指定边框的颜色，应该从父元素继承                             |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-image

#### 定义和用法

border-image 属性是一个简写属性，用于设置以下属性：

- border-image-source
- border-image-slice
- border-image-width
- border-image-outset
- border-image-repeat

如果省略值，会设置其默认值。

提示：请使用 border-image-* 属性来构造漂亮的可伸缩按钮！

| 默认值：          | none 100% 1 0 stretch                                    |
| :---------------- | -------------------------------------------------------- |
| 继承性：          | no                                                       |
| 版本：            | CSS3                                                     |
| JavaScript 语法： | *object*.style.borderImage="url(border.png) 30 30 round" |



---

#### 可能的值

| 值                    | 描述                                                         | 测试                                                         |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| *border-image-source* | 用在边框的图片的路径。                                       |                                                              |
| *border-image-slice*  | 图片边框向内偏移。                                           |                                                              |
| *border-image-width*  | 图片边框的宽度。                                             |                                                              |
| *border-image-outset* | 边框图像区域超出边框的量。                                   |                                                              |
| *border-image-repeat* | 图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)。 | [测试](https://www.w3cschool.cn/statics/demosource/css-border-image.html) |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-image-outset



#### 定义和用法

border-image-outset 属性规定边框图像超过边框盒的量。

| 默认值：          | 0                                        |
| :---------------- | ---------------------------------------- |
| 继承性：          | no                                       |
| 版本：            | CSS3                                     |
| JavaScript 语法： | *object*.style.borderImageOutset="30 30" |

---

#### 可能的值

```
border-image-outset: length|number;
```

**注释：**border-image-outset 属性规定边框图像超出边框盒的量。在上、右、下、左侧。如果忽略第四个值，则与第二个值相同。如果省略第三个值，则与第一个值相同。如果省略第二个值，则与第一个值相同。不允许任何负值作为 border-image-outset 值。

| 值       | 描述                             |
| :------- | :------------------------------- |
| *length* |                                  |
| *number* | 代表对应的 border-width 的倍数。 |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-image-repeat

#### 实例

规定如何重复图像边框：

```css
div
{
border-image-source: url(border.png);
border-image-repeat: round;
}
```

---

#### 定义和用法

border-image-repeat 属性规定图像边框是否应该被重复（repeated）、拉伸（stretched）或铺满（rounded）。

| 默认值：          | stretch                                  |
| :---------------- | ---------------------------------------- |
| 继承性：          | no                                       |
| 版本：            | CSS3                                     |
| JavaScript 语法： | *object*.style.borderImageRepeat="round" |

#### 可能的值

```
border-image-repeat: stretch|repeat|round;
```

注释：该属性规定如何延展和铺排边框图像的边缘和中间部分。因此，您可以规定两个值。如果省略第二个值，则采取与第一个值相同的值。

| 值      | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| stretch | 拉伸图像来填充区域                                           |
| repeat  | 平铺（重复）图像来填充区域。                                 |
| round   | 类似 repeat 值。如果无法完整平铺所有图像，则对图像进行缩放以适应区域。 |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-image-source

#### 实例

使用一幅图像作为围绕 div 元素的边框：

```css
div
{
  border-image-source: url(border.png);}
```

---

#### 定义和用法

border-image-source 属性规定要使用的图像，代替 border-style 属性中设置的边框样式。

提示：如果值为 "none"，或者如果图像无法显示，则使用边框样式。

| 默认值：          | none                                               |
| :---------------- | -------------------------------------------------- |
| 继承性：          | no                                                 |
| 版本：            | CSS3                                               |
| JavaScript 语法： | *object*.style.borderImageSource="url(border.png)" |

---



#### 语法

```css
border-image-source: none|image;
```

| 值      | 描述                   |
| :------ | :--------------------- |
| none    | 不使用图像。           |
| *image* | 用作边框的图像的路径。 |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-image-width

#### 定义和用法

border-image-width 属性规定图像边框的宽度。

| 默认值：          | none                                    |
| :---------------- | --------------------------------------- |
| 继承性：          | no                                      |
| 版本：            | CSS3                                    |
| JavaScript 语法： | *object*.style.borderImageWidth="30 30" |

---

#### 语法

```
border-image-width: number|%|auto;
```

**注意：**border-image -width的4个值指定用于把border图像区域分为九个部分。他们代表上，右，底部，左，两侧向内距离。如果第四个值被省略，它和第二个是相同的。如果也省略了第三个，它和第一个是相同的。如果也省略了第二个，它和第一个是相同的。负值是不允许的。

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| *number* | 代表对应的 border-width 的倍数。                             |
| *%*      | 参考边框图像区域的尺寸：区域的高度影响水平偏移，宽度影响垂直偏移。 |
| *auto*   | 如果规定该属性，则宽度为对应的图像切片的固有宽度。           |

---

#### 实例

规定图像边框的宽度：

```css
div
{
border-image-source: url(border.png);
border-image-width: 30 30;
}
```

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-image-slice 

#### 实例

规定图像边框的向内偏移：

```css
div
{
border-image-source: url(border.png);
border-image-slice: 50% 50%;
}
```

---

#### 定义和用法

border-image-slice 属性规定图像边框的向内偏移。

| 默认值：          | 100%                                      |
| :---------------- | ----------------------------------------- |
| 继承性：          | no                                        |
| 版本：            | CSS3                                      |
| JavaScript 语法： | *object*.style.borderImageSlice="50% 50%" |

---

#### 语法

```
border-image-slice: number|%|fill;
```

注释：该属性规定图像的上、右、下、左侧边缘的向内偏移，图像被分割为九个区域：四个角、四条边以及一个中间区域。除非使用了关键词 fill，否则中间的图像部分会被丢弃。如果省略第四个数值/百分比，则与第二个值相同。如果省略第三个值，则与第一个值相同。如果省略第二个值，则与第一个值相同。

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| *number* | 数字值，代表图像中像素（如果是光栅图像）或矢量坐标（如果是矢量图像）。 |
| *%*      | 相对于图像尺寸的百分比值：图像的宽度影响水平偏移，高度影响垂直偏移。 |
| fill     | 保留边框图像的中间部分。                                     |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-radius

#### 实例

向 div 元素添加圆角边框：

```css
div
{
border:2px solid;
border-radius:25px;
}
```

---

#### 定义和用法

border-radius 属性是一个简写属性，用于设置四个 border-*-radius 属性。

提示：该属性允许您为元素添加圆角边框！

| 默认值：          | 0                                 |
| :---------------- | --------------------------------- |
| 继承性：          | no                                |
| 版本：            | CSS3                              |
| JavaScript 语法： | *object*.style.borderRadius="5px" |

---

#### 语法

```
border-radius: 1-4 length|% / 1-4 length|%;
```

注释：按此顺序设置每个 radii 的四个值。如果省略 bottom-left，则与 top-right 相同。如果省略 bottom-right，则与 top-left 相同。如果省略 top-right，则与 top-left 相同。

| 值       | 描述                     | 测试                                                         |
| :------- | :----------------------- | :----------------------------------------------------------- |
| *length* | 定义圆角的形状。         | [测试](https://www.w3cschool.cn/statics/demosource/css-border-radius.html) |
| *%*      | 以百分比定义圆角的形状。 | [测试](https://www.w3cschool.cn/statics/demosource/css-border-radius.html) |

##### 例子 1

```css
border-radius:2em;
```

等价于：

```css
border-top-left-radius:2em;
border-top-right-radius:2em;
border-bottom-right-radius:2em;
border-bottom-left-radius:2em;
```

##### 例子 2

```css
border-radius: 2em 1em 4em / 0.5em 3em;
```

等价于：

```css
border-top-left-radius: 2em 0.5em;
border-top-right-radius: 1em 3em;
border-bottom-right-radius: 4em 0.5em;
border-bottom-left-radius: 1em 3em;
```

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-spacing

#### 实例

为表格设置 border-spacing：

```css
table
  {
  border-collapse:separate;
  border-spacing:10px 50px;
  }
```

#### 定义和用法说明

border-spacing 属性设置相邻单元格的边框间的距离（仅用于“边框分离”模式）。

该属性指定分隔边框模型中单元格边界之间的距离。在指定的两个长度值中，第一个是水平间隔，第二个是垂直间隔。除非 border-collapse 被设置为 separate，否则将忽略这个属性。尽管这个属性只应用于表，不过它可以由表中的所有元素继承。

| 默认值：          | *not specified*                     |
| :---------------- | ----------------------------------- |
| 继承性：          | yes                                 |
| 版本：            | CSS2                                |
| JavaScript 语法： | *object*.style.borderSpacing="15px" |

---

#### 可能的值

| 值              | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| *length length* | 规定相邻单元的边框之间的距离。使用 px、cm 等单位。不允许使用负值。如果定义一个 *length* 参数，那么定义的是水平和垂直间距。如果定义两个 *length* 参数，那么第一个设置水平间距，而第二个设置垂直间距。 |
| inherit         | 规定应该从父元素继承 border-spacing 属性的值。               |

---

#### 相关文章

CSS 教程: [CSS 表格](zh-cn/browser-side/css/README#css-表格), [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-style 

#### 属性定义及使用说明

border-style属性设置一个元素的四个边框的样式。此属性可以有一到四个值。

实例:

**border-style:dotted solid double dashed;**

- 上边框是点状
- 右边框是实线
- 下边框是双线
- 左边框是虚线

**border-style:dotted solid double;**

- 上边框是点状
- 右边框和左边框是实线
- 下边框是双线

**border-style:dotted solid;**

- 上边框和下边框是点状
- 右边框和左边框是实线

**border-style:dotted;**

- 所有4个边框都是点状

| 默认值:          | *not specified*                                   |
| :--------------- | ------------------------------------------------- |
| 继承:            | no                                                |
| 版本:            | CSS1                                              |
| JavaScript 语法: | *object* object.style.borderStyle="dotted double" |

---



#### 属性值

| 值      | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| none    | 定义无边框。                                                 |
| hidden  | 与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。 |
| dotted  | 定义点状边框。在大多数浏览器中呈现为实线。                   |
| dashed  | 定义虚线。在大多数浏览器中呈现为实线。                       |
| solid   | 定义实线。                                                   |
| double  | 定义双线。双线的宽度等于 border-width 的值。                 |
| groove  | 定义 3D 凹槽边框。其效果取决于 border-color 的值。           |
| ridge   | 定义 3D 垄状边框。其效果取决于 border-color 的值。           |
| inset   | 定义 3D inset 边框。其效果取决于 border-color 的值。         |
| outset  | 定义 3D outset 边框。其效果取决于 border-color 的值。        |
| inherit | 规定应该从父元素继承边框样式。                               |

---



#### 实例

如何在元素的各边设置不同的边框

```css
<style>
    p.one {border-style:dotted solid dashed double;}
    p.two {border-style:dotted solid dashed;}
    p.three {border-style:dotted solid;}
    p.four {border-style:dotted;}
</style>
```

---

#### 相关文章

CSS 教程: [CSS 表格](zh-cn/browser-side/css/README#css-表格), [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-top

#### 属性定义及使用说明

border-top 简写属性把上边框的所有属性设置到一个声明中

可以按顺序设置如下属性： border-top-width, border-top-style, and border-top-color.

如果不设置其中的某个值，也不会出问题，比如 border-top:solid #ff0000; 也是允许的。

| 默认值：          | *not specified*                           |
| :---------------- | ----------------------------------------- |
| 继承性：          | no                                        |
| 版本：            | CSS1                                      |
| JavaScript 语法： | *object*.style.borderTop="3px solid blue" |

---

#### 属性值

| 值                 | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| *border-top-width* | 规定上边框的宽度。参阅：[border-top-width](#border-top-width) 中可能的值。 |
| *border-top-style* | 规定上边框的样式。参阅：[border-top-style](#border-top-style) 中可能的值。 |
| *border-top-color* | 规定上边框的颜色。参阅：[border-top-color](#border-top-color) 中可能的值。 |
| inherit            | 规定应该从父元素继承 border-top 属性的设置。                 |

---

#### 相关文章

CSS 教程: [CSS 表格](zh-cn/browser-side/css/README#css-表格), [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-top-color



#### 属性定义及使用说明

border-top-color 设置元素的上边框的颜色。

**注意：**请始终把border-style属性声明到border-top-color属性之前。元素必须在您改变其颜色之前获得边框。

| 默认值：          | *not specified*                      |
| :---------------- | ------------------------------------ |
| 继承性：          | no                                   |
| 版本：            | CSS1                                 |
| JavaScript 语法： | *object*.style.borderTopColor="blue" |

---

#### 属性值

| 值           | 描述                                                   |
| :----------- | :----------------------------------------------------- |
| *color_name* | 规定颜色值为颜色名称的边框颜色（比如 red）。           |
| *hex_number* | 规定颜色值为十六进制值的边框颜色（比如 #ff0000）。     |
| *rgb_number* | 规定颜色值为 rgb 代码的边框颜色（比如 rgb(255,0,0)）。 |
| transparent  | 默认值。边框颜色为透明。                               |
| inherit      | 规定应该从父元素继承边框颜色。                         |

---

#### 相关文章

CSS 教程: [CSS 表格](zh-cn/browser-side/css/README#css-表格), [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-top-left-radius

### border-top-right-radius

```css
div
{
border:2px solid;
border-top-left-radius:2em;
}

```

#### 属性定义及使用说明

border-top-left-radius属性定义了左上角的边框形状。

**提示:** 这个属性允许你为元素添加圆角边框！

| 默认值:          | 0                                               |
| :--------------- | ----------------------------------------------- |
| 继承:            | no                                              |
| 版本:            | CSS3                                            |
| JavaScript 语法: | *object* object.style.borderTopLeftRadius="5px" |



------

#### 语法

```
border-top-left-radius: length|% [length|%];  
```

**注意:** border-top-left--radius属性的两个长度或百分比值定义了椭圆的四分之一外边框的边缘角落的形状。第一个值是水平半径，第二个是垂直半径。如果省略第二个值，它是从第一个复制。如果任一长度为零，角落里是方的，不圆润。水平半径的百分比是指边界框的宽度，而垂直半径的百分比是指边界框的高度。

| 值       | 描述                    |
| :------- | :---------------------- |
| *length* | 定义左上角的形状。      |
| *%*      | 使用%定义左上角的形状。 |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-top-style

设置顶部边框样式

```css
p 
{
border-style:solid;
}
p.none {border-top-style:none;}
p.dotted {border-top-style:dotted;}
p.dashed {border-top-style:dashed;}
p.solid {border-top-style:solid;}
p.double {border-top-style:double;}
p.groove {border-top-style:groove;}
p.ridge {border-top-style:ridge;}
p.inset {border-top-style:inset;}
p.outset {border-top-style:outset;}
```

---

#### 属性定义及使用说明

border-top-style属性设置一个元素的顶部边框样式。

| 默认值：          | *not specified*                        |
| :---------------- | -------------------------------------- |
| 继承性：          | no                                     |
| 版本：            | CSS1                                   |
| JavaScript 语法： | *object*.style.borderTopStyle="dotted" |

------

#### 属性值

| 值      | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| none    | 定义无边框。                                                 |
| hidden  | 与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。 |
| dotted  | 定义点状边框。在大多数浏览器中呈现为实线。                   |
| dashed  | 定义虚线。在大多数浏览器中呈现为实线。                       |
| solid   | 定义实线。                                                   |
| double  | 定义双线。双线的宽度等于 border-width 的值。                 |
| groove  | 定义 3D 凹槽边框。其效果取决于 border-color 的值。           |
| ridge   | 定义 3D 垄状边框。其效果取决于 border-color 的值。           |
| inset   | 定义 3D inset 边框。其效果取决于 border-color 的值。         |
| outset  | 定义 3D outset 边框。其效果取决于 border-color 的值。        |
| inherit | 规定应该从父元素继承边框样式。                               |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-top-width

设置顶部边框的宽度：

```css
p
{
border-style:solid;
border-top-width:15px;
}
```

---

#### 属性定义及使用说明

border-top-width属性设置一个元素的顶部边框的宽度。

**注意:**请始终在 border-top-width 属性之前声明 border-style 属性。元素只有在获得边框之后，才能改变其边框的宽度。

| 默认值:          | medium                                       |
| :--------------- | -------------------------------------------- |
| 继承:            | no                                           |
| 版本:            | CSS1                                         |
| JavaScript 语法: | *object* object.style.borderTopWidth="thick" |

---

#### 属性值

| 值       | 描述                           |
| :------- | :----------------------------- |
| thin     | 定义细的上边框。               |
| medium   | 默认值。定义中等的上边框。     |
| thick    | 定义粗的上边框。               |
| *length* | 允许您自定义上边框的宽度。     |
| inherit  | 规定应该从父元素继承边框宽度。 |

---

#### 相关文章

CSS 教程: [CSS 边框](zh-cn/browser-side/css/README#css-边框)

---

### border-width

#### 属性定义及使用说明

border-width属性设置一个元素的四个边框的宽度。此属性可以有一到四个值。

实例:

**border-width:thin medium thick 10px;**

- 上边框是细边框
- 右边框是中等边框
- 下边框是粗边框
- 左边框是 10px 宽的边框

**border-width:thin medium thick;**

- 上边框是细边框
- 右边框和左边框是中等边框
- 下边框是粗边框

**border-width:thin medium;**

- 上边框和下边框是细边框
- 右边框和左边框是中等边框

**border-width:thin;**

- 所有4个边框都是细边框

| 默认值：          | medium                                  |
| :---------------- | --------------------------------------- |
| 继承性：          | no                                      |
| 版本：            | CSS1                                    |
| JavaScript 语法： | *object*.style.borderWidth="thin thick" |

---

#### 属性值

| 值       | 描述                           |
| :------- | :----------------------------- |
| thin     | 定义细的边框。                 |
| medium   | 默认。定义中等的边框。         |
| thick    | 定义粗的边框。                 |
| *length* | 允许您自定义边框的宽度。       |
| inherit  | 规定应该从父元素继承边框宽度。 |

---



















### color

#### 属性定义及使用说明

Color属性指定文本的颜色。

| 默认值:          | *not specified*                |
| :--------------- | ------------------------------ |
| 继承:            | no                             |
| 版本:            | CSS1                           |
| JavaScript 语法: | *object*.style.color="#FF0000" |

---

#### 属性

| 值           | 描述                                               |
| :----------- | :------------------------------------------------- |
| *color_name* | 规定颜色值为颜色名称的颜色（比如 red）。           |
| *hex_number* | 规定颜色值为十六进制值的颜色（比如 #ff0000）。     |
| *rgb_number* | 规定颜色值为 rgb 代码的颜色（比如 rgb(255,0,0)）。 |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)      | 规定应该从父元素继承颜色。                         |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### direction

#### 属性定义及使用说明

direction属性指定文本方向/书写方向。

| 默认值：          | ltr                            |
| :---------------- | ------------------------------ |
| 继承：            | yes                            |
| 版本：            | CSS2                           |
| JavaScript 语法： | *object*.style.direction="rtl" |

---

#### 属性值

| 值      | 描述                                      |
| :------ | :---------------------------------------- |
| ltr     | 默认。文本方向从左到右。                  |
| rtl     | 文本方向从右到左。                        |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit) | 规定应该从父元素继承 direction 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### letter-spacing

#### 属性定义及使用说明

letter-spacing 属性增加或减少字符间的空白（字符间距）

| 默认值：          | normal                             |
| :---------------- | ---------------------------------- |
| 继承：            | yes                                |
| 版本：            | CSS1                               |
| JavaScript 语法： | *object*.style.letterSpacing="3px" |

---

#### 属性值

| 值       | 描述                                           |
| :------- | :--------------------------------------------- |
| normal   | 默认。规定字符间没有额外的空间。               |
| *length* | 定义字符间的固定空间（允许使用负值）。         |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)  | 规定应该从父元素继承 letter-spacing 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### line-height

#### 属性定义及使用说明

设置以百分比计的行高：.

!> **注意：** 负值是不允许的

| 默认值：          | normal                        |
| :---------------- | ----------------------------- |
| 继承：            | yes                           |
| 版本：            | CSS1                          |
| JavaScript 语法： | *object*.style.lineHeight="2" |

---

#### 属性值

| 值       | 描述                                                 |
| :------- | :--------------------------------------------------- |
| normal   | 默认。设置合理的行间距。                             |
| *number* | 设置数字，此数字会与当前的字体尺寸相乘来设置行间距。 |
| *length* | 设置固定的行间距。                                   |
| *%*      | 基于当前字体尺寸的百分比行间距。                     |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)  | 规定应该从父元素继承 line-height 属性的值。          |

---

#### 实例

使用像素值设置行间距

```css
p.small
{
 line-height: 10px
}
p.big
{
 line-height: 30px
}
```

使用一个数值来设置段落中的行间距。

```css
p.small
{
line-height: 0.5
}
p.big
{
line-height: 2
}
```

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### list-style

#### 属性定义及使用说明

list-style 简写属性在一个声明中设置所有的列表属性。

可以设置的属性（按顺序）： list-style-type, list-style-position, list-style-image.

可以不设置其中的某个值，比如 "list-style:circle inside;" 也是允许的。未设置的属性会使用其默认值。

| 默认值：          | disc outside none                         |
| :---------------- | ----------------------------------------- |
| 继承：            | yes                                       |
| 版本：            | CSS1                                      |
| JavaScript 语法： | *object*.style.listStyle="decimal inside" |

------

#### 属性值

| 值                    | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- |
| *list-style-type*     | 设置列表项标记的类型。参阅：[list-style-type](#list-style-type) 中可能的值。 |
| *list-style-position* | 设置在何处放置列表项标记。参阅：[list-style-position](#list-style-position) 中可能的值。 |
| *list-style-image*    | 使用图像来替换列表项的标记。参阅：[list-style-image](#list-style-image) 中可能的值。 |
| *initial*             | 将这个属性设置为默认值。参阅：[initial](zh-cn/browser-side/css/css-关键字#initial) 中可能的值。 |
| inherit               | 规定应该从父元素继承 list-style 属性的值。参阅：[inherit](zh-cn/browser-side/css/css-关键字#inherit) 中可能的值。 |

---

#### 相关文章

CSS 教程: [CSS 列表](zh-cn/browser-side/css/README#CSS-列表)

---

### list-style-image

#### 属性定义及使用说明

list-style-image 属性使用图像来替换列表项的标记。

!> **注意:** 请始终规定一个 "list-style-type" 属性以防图像不可用。

| 默认值：          | none                                                        |
| :---------------- | ----------------------------------------------------------- |
| 继承：            | yes                                                         |
| 版本：            | CSS1                                                        |
| JavaScript 语法： | *object*.style.listStyleImage="url('/images/blueball.gif')" |

---

#### 属性值

| 值      | 描述                                             |
| :------ | :----------------------------------------------- |
| *URL*   | 图像的路径。                                     |
| none    | 默认。无图形被显示。                             |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit) | 规定应该从父元素继承 list-style-image 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS 列表](zh-cn/browser-side/css/README#CSS-列表)

---

### list-style-position

#### 属性定义及使用说明

`list-style-position`属性指示如何相对于对象的内容绘制列表项标记。

| 默认值：          | outside                                   |
| :---------------- | ----------------------------------------- |
| 继承：            | yes                                       |
| 版本：            | CSS1                                      |
| JavaScript 语法： | *object*.style.listStylePosition="inside" |

---

#### 属性值

| 值      | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| inside  | 列表项目标记放置在文本以内，且环绕文本根据标记对齐。         |
| outside | 默认值。保持标记位于文本的左侧。列表项目标记放置在文本以外，且环绕文本不根据标记对齐。 |
| inherit | 规定应该从父元素继承 list-style-position 属性的值。          |

---

#### 相关文章

CSS 教程: [CSS 列表](zh-cn/browser-side/css/README#CSS-列表)

---

### list-style-type

#### 属性定义及使用说明

list-style-type 属性设置列表项标记的类型。

| 默认值：          | "disc" for \<ul\> and "decimal" for \<ol\> |
| :---------------- | ------------------------------------------ |
| 继承：            | yes                                        |
| 版本：            | CSS1                                       |
| JavaScript 语法： | *object*.style.listStyleType="square"      |

------

#### 属性值

| 值                   | 描述                                                        |
| :------------------- | :---------------------------------------------------------- |
| none                 | 无标记。                                                    |
| disc                 | 默认。标记是实心圆。                                        |
| circle               | 标记是空心圆。                                              |
| square               | 标记是实心方块。                                            |
| decimal              | 标记是数字。                                                |
| decimal-leading-zero | 0开头的数字标记。(01, 02, 03, 等。)                         |
| lower-roman          | 小写罗马数字(i, ii, iii, iv, v, 等。)                       |
| upper-roman          | 大写罗马数字(I, II, III, IV, V, 等。)                       |
| lower-alpha          | 小写英文字母The marker is lower-alpha (a, b, c, d, e, 等。) |
| upper-alpha          | 大写英文字母The marker is upper-alpha (A, B, C, D, E, 等。) |
| lower-greek          | 小写希腊字母(alpha, beta, gamma, 等。)                      |
| lower-latin          | 小写拉丁字母(a, b, c, d, e, 等。)                           |
| upper-latin          | 大写拉丁字母(A, B, C, D, E, 等。)                           |
| hebrew               | 传统的希伯来编号方式                                        |
| armenian             | 传统的亚美尼亚编号方式                                      |
| georgian             | 传统的乔治亚编号方式(an, ban, gan, 等。)                    |
| cjk-ideographic      | 简单的表意数字                                              |
| hiragana             | 标记是：a, i, u, e, o, ka, ki, 等。（日文片假名）           |
| katakana             | 标记是：A, I, U, E, O, KA, KI, 等。（日文片假名）           |
| hiragana-iroha       | 标记是：i, ro, ha, ni, ho, he, to, 等。（日文片假名）       |
| katakana-iroha       | 标记是：I, RO, HA, NI, HO, HE, TO, 等。（日文片假名）       |

---

#### 实例

所有不同的列表项标记

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
    ul.a {list-style-type:circle;}
    ul.b {list-style-type:disc;}
    ul.c {list-style-type:square;}

    ol.d {list-style-type:armenian;}
    ol.e {list-style-type:cjk-ideographic;}
    ol.f {list-style-type:decimal;}
    ol.g {list-style-type:decimal-leading-zero;}
    ol.h {list-style-type:georgian;}
    ol.i {list-style-type:hebrew;}
    ol.j {list-style-type:hiragana;}
    ol.k {list-style-type:hiragana-iroha;}
    ol.l {list-style-type:katakana;}
    ol.m {list-style-type:katagana-iroha;}
    ol.n {list-style-type:lower-alpha;}
    ol.o {list-style-type:lower-greek;}
    ol.p {list-style-type:lower-latin;}
    ol.q {list-style-type:lower-roman;}
    ol.r {list-style-type:upper-alpha;}
    ol.s {list-style-type:upper-latin;}
    ol.t {list-style-type:upper-roman;}

    ol.u {list-style-type:none;}
    ol.v {list-style-type:inherit;}

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

#### 相关文章

CSS 教程: [CSS 列表](zh-cn/browser-side/css/README#CSS-列表)

---

#### text-align

#### 属性定义及使用说明

text-align属性指定元素文本的水平对齐方式。

| 默认值：          | left if direction is ltr, and right if direction is rtl |
| :---------------- | ------------------------------------------------------- |
| 继承：            | yes                                                     |
| 版本：            | CSS1                                                    |
| JavaScript 语法： | object.style.textAlign="right"                          |

---

#### 属性值

| 值      | 描述                                       |
| :------ | :----------------------------------------- |
| left    | 把文本排列到左边。默认值：由浏览器决定。   |
| right   | 把文本排列到右边。                         |
| center  | 把文本排列到中间。                         |
| justify | 实现两端对齐文本效果。                     |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit) | 规定应该从父元素继承 text-align 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### outline

#### 属性定义及使用说明

outline（轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。

outline简写属性在一个声明中设置所有的轮廓属性。

可以设置的属性分别是（按顺序）：outline-color, outline-style, outline-width

如果不设置其中的某个值，也不会出问题，比如 outline:solid #ff0000; 也是允许的。

| 默认值：          | invert none medium                           |
| :---------------- | -------------------------------------------- |
| 继承：            | no                                           |
| 版本：            | CSS2                                         |
| JavaScript 语法： | *object*.style.outline="#0000FF dotted thin" |

---

#### 属性值

| 值              | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| *outline-color* | 规定边框的颜色。参阅：[outline-color](https://www.w3cschool.cn/cssref/pr-outline-color.html) 中可能的值。 |
| *outline-style* | 规定边框的样式。参阅：[outline-style](https://www.w3cschool.cn/cssref/pr-outline-style.html) 中可能的值。 |
| *outline-width* | 规定边框的宽度。参阅：[outline-width](https://www.w3cschool.cn/cssref/pr-outline-width.html) 中可能的值。 |
| inherit         | 规定应该从父元素继承 outline 属性的设置。                    |

---

#### 相关文章

CSS 教程: [CSS 轮廓](zh-cn/browser-side/css/README#CSS-轮廓)

---

### outline-color

#### 属性定义及使用说明

outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围。

outline-color属性指定轮廓颜色。

**注意：** 请始终在 outline-color 属性之前声明 outline-style 属性。元素只有获得轮廓以后才能改变其轮廓的颜色。

| 默认值：          | invert                                |
| :---------------- | ------------------------------------- |
| 继承：            | no                                    |
| 版本：            | CSS2                                  |
| JavaScript 语法： | *object*.style.outlineColor="#00FF00" |

---

#### 属性值

| 值      | 描述                                                         |      |
| :------ | :----------------------------------------------------------- | ---- |
| *color* | 指定轮廓颜色。在[CSS颜色值](https://www.w3cschool.cn/cssref/css-colors-legal.html)寻找颜色值的完整列表。 |      |
| invert  | 默认。执行颜色反转（逆向的颜色）。可使轮廓在不同的背景颜色中都是可见。 |      |
| inherit | 规定应该从父元素继承轮廓颜色的设置。                         |      |

---

#### 相关文章

CSS 教程: [CSS 轮廓](zh-cn/browser-side/css/README#CSS-轮廓)

---

### outline-offset

#### 属性定义及使用说明

outline-offset属性设置轮廓框架在 border 边缘外的偏移

Outlines在两个方面不同于边框：

- Outlines 不占用空间
- Outlines 可能非矩形

| 默认值：          | 0                                   |
| :---------------- | ----------------------------------- |
| 继承：            | no                                  |
| 版本：            | CSS3                                |
| JavaScript 语法： | *object*.style.outlineOffset="15px" |

---

#### 语法

```
outline-offset: length|inherit:
```

| 值       | 描述                                         |
| :------- | :------------------------------------------- |
| *length* | 轮廓与边框边缘的距离。                       |
| inherit  | 规定应从父元素继承 outline-offset 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS 轮廓](zh-cn/browser-side/css/README#CSS-轮廓),[CSS3 用户界面](zh-cn/browser-side/css/css3/css3-用户界面)

---

### outline-style



#### 属性定义及使用说明

outline（轮廓）是绘制于元素周围的一条线，位于边框边缘的外围。

outline-style属性指定outline的样式。

| 默认值：          | none                                 |
| :---------------- | ------------------------------------ |
| 继承：            | no                                   |
| 版本：            | CSS2                                 |
| JavaScript 语法： | *object*.style.outlineStyle="dotted" |

---

#### 提示和注释

outline是围绕元素。它是围绕元素的边距。但是，它是来自不同的边框属性。

!> outline不是元素尺寸的一部分，因此元素的宽度和高度属性不包含轮廓的宽度。

------

#### 属性值

| 值      | 描述                                                |
| :------ | :-------------------------------------------------- |
| none    | 默认。定义无轮廓。                                  |
| dotted  | 定义点状的轮廓。                                    |
| dashed  | 定义虚线轮廓。                                      |
| solid   | 定义实线轮廓。                                      |
| double  | 定义双线轮廓。双线的宽度等同于 outline-width 的值。 |
| groove  | 定义 3D 凹槽轮廓。此效果取决于 outline-color 值。   |
| ridge   | 定义 3D 凸槽轮廓。此效果取决于 outline-color 值。   |
| inset   | 定义 3D 凹边轮廓。此效果取决于 outline-color 值。   |
| outset  | 定义 3D 凸边轮廓。此效果取决于 outline-color 值。   |
| inherit | 规定应该从父元素继承轮廓样式的设置。                |

---

#### 更多实例

[设置outline的样式](https://www.w3cschool.cn/tryrun/showhtml/trycss_outline-style)
这个例子演示了如何设置outline的样式。

------

#### 相关文章

CSS 教程: [CSS 轮廓](zh-cn/browser-side/css/README#CSS-轮廓)

---

### outline-width

#### 属性定义及使用说明

outline（轮廓）是绘制于元素周围的一条线，位于边框边缘的外围。

outline-width指定轮廓的宽度。

**注意：** 请始终在outline-wicth属性之前声明outline-style属性。元素只有获得轮廓以后才能改变其轮廓的宽度。

| 默认值：          | medium                             |
| :---------------- | ---------------------------------- |
| 继承：            | no                                 |
| 版本：            | CSS2                               |
| JavaScript 语法： | *object*.style.outlineWidth="thin" |

---

#### 提示和注释

outline是围绕元素。它是围绕元素的边距。但是，它是来自不同的边框属性。

outline不是元素尺寸的一部分，因此元素的宽度和高度属性不包含轮廓的宽度。

---



#### 属性值

| 值       | 描述                                 |
| :------- | :----------------------------------- |
| thin     | 规定细轮廓。                         |
| medium   | 默认。规定中等的轮廓。               |
| thick    | 规定粗的轮廓。                       |
| *length* | 允许您规定轮廓粗细的值。             |
| inherit  | 规定应该从父元素继承轮廓宽度的设置。 |

---

#### 相关文章

CSS 教程: [CSS 轮廓](zh-cn/browser-side/css/README#CSS-轮廓)

---

### padding

//todo

---

#### 相关文章

CSS 教程: [CSS 内边距](zh-cn/browser-side/css/README#CSS-内边距)

---

### padding-bottom

### padding-left

### padding-right

### padding-top

//todo

---

#### 相关文章

CSS 教程: [CSS 内边距](zh-cn/browser-side/css/README#CSS-内边距)

---

### 



### text-decoration

#### 属性定义及使用说明

text-decoration 属性规定添加到文本的修饰。

**注意：** 修饰的颜色由 "color" 属性设置。

| 默认值：          | none                                     |
| :---------------- | ---------------------------------------- |
| 继承：            | no                                       |
| 版本：            | CSS1                                     |
| JavaScript 语法： | *object*.style.textDecoration="overline" |

---

#### 属性值

| 值           | 描述                                            |
| :----------- | :---------------------------------------------- |
| none         | 默认。定义标准的文本。                          |
| underline    | 定义文本下的一条线。                            |
| overline     | 定义文本上的一条线。                            |
| line-through | 定义穿过文本下的一条线。                        |
| blink        | 定义闪烁的文本。                                |
| inherit      | 规定应该从父元素继承 text-decoration 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### text-indent

#### 属性定义及使用说明

text-indent 属性规定文本块中首行文本的缩进。

**注意：** 负值是允许的。如果值是负数，将第一行左缩进。

| 默认值：          | 0                                |
| :---------------- | -------------------------------- |
| 继承：            | yes                              |
| 版本：            | CSS1                             |
| JavaScript 语法： | *object*.style.textIndent="50px" |

---

#### 属性值

| 值       | 描述                                        |
| :------- | :------------------------------------------ |
| *length* | 定义固定的缩进。默认值：0。                 |
| *%*      | 定义基于父元素宽度的百分比的缩进。          |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)  | 规定应该从父元素继承 text-indent 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### text-shadow

#### 属性定义及使用说明

text-shadow 属性应用于阴影文本。

| 默认值：          | *none*                                      |
| :---------------- | ------------------------------------------- |
| 继承：            | yes                                         |
| 版本：            | CSS3                                        |
| JavaScript 语法： | *object*.style.textShadow="2px 2px #ff0000" |

---

#### 语法

```css
text-shadow: h-shadow v-shadow blur color;
```

!> **注意：** text-shadow属性连接一个或更多的阴影文本。<br>属性是阴影，指定的每2或3个长度值和一个可选的颜色值用逗号分隔开来。<br>已失时效的长度为0。

| 值         | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| *h-shadow* | 必需。水平阴影的位置。允许负值。                             |
| *v-shadow* | 必需。垂直阴影的位置。允许负值。                             |
| *blur*     | 可选。模糊的距离。                                           |
| *color*    | 可选。阴影的颜色。参阅 [CSS 颜色值](https://www.w3cschool.cn/cssref/css-colors-legal.html)。 |

---

#### 实例

文字阴影模糊效果

```css
h1 {text-shadow:2px 2px 8px #FF0000;}
```

![image-20220720145320122](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/rq7RGX000image-20220720145320122.png)

白色的文本文字阴影

```css
h1
{
color:white;
text-shadow:2px 2px 4px #000000;
}
```

![image-20220720145355038](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/fRBHyc000image-20220720145355038.png)

用霓虹灯的光芒文字阴影(氖辉光)

```css
h1
{
text-shadow:0 0 3px #FF0000;
}
```

![image-20220720145428085](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/McVk6e000image-20220720145428085.png)

---

#### 相关文章

CSS 教程: [CSS 文本](zh-cn/browser-side/css/README#CSS-文本),[CSS 文本效果](zh-cn/browser-side/css/README#CSS-文本效果)

---

### text-transform

#### 属性定义及使用说明

text-transform 属性控制文本的大小写。

| 默认值：          | none                                     |
| :---------------- | ---------------------------------------- |
| 继承：            | yes                                      |
| 版本：            | CSS1                                     |
| JavaScript 语法： | *object*.style.textTransform="uppercase" |

---

#### 属性值

| 值         | 描述                                           |
| :--------- | :--------------------------------------------- |
| none       | 默认。定义带有小写字母和大写字母的标准的文本。 |
| capitalize | 文本中的每个单词以大写字母开头。               |
| uppercase  | 定义仅有大写字母。                             |
| lowercase  | 定义无大写字母，仅有小写字母。                 |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)    | 规定应该从父元素继承 text-transform 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### 













### unicode-bidi

unicode-bidi 属性与 [direction](#direction) 属性一起使用，来设置或返回文本是否被重写，以便在同一文档中支持多种语言。

| 默认值：          | normal                                                       |
| :---------------- | ------------------------------------------------------------ |
| 继承：            | 是                                                           |
| 可动画化：        | 否。请参阅 [*可动画化（animatable）*](https://www.w3cschool.cn/cssref/css-animatable.html)。 |
| 版本：            | CSS2                                                         |
| JavaScript 语法： | *object*.style.unicodeBidi="bidi-override"                   |

---

#### CSS 语法

```css
unicode-bidi: normal|embed|bidi-override|initial|inherit;
```

#### 属性值

| 值            | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| normal        | 默认。不使用附加的嵌入层面。                                 |
| embed         | 创建一个附加的嵌入层面。                                     |
| bidi-override | 创建一个附加的嵌入层面。重新排序取决于 direction 属性。      |
| initial       | 设置该属性为它的默认值。请参阅 [*initial*](https://www.w3cschool.cn/cssref/css-initial.html)。 |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)       | 从父元素继承该属性。|

---

#### 实例

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
div.ex1
{
 direction:rtl;
 unicode-bidi:bidi-override;
}
</style>
</head>
<body>

<div>一些文本。默认的书写方向。</div>
<div class="ex1">一些文本 。从右向左的方向。</div>

</body>
</html>
```

![image-20220720152325347](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/H3ZwSg000image-20220720152325347.png)

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### vertical-align

#### 属性定义及使用说明

vertical-align属性设置一个元素的垂直对齐。

| 默认值：          | baseline                              |
| :---------------- | ------------------------------------- |
| 继承：            | no                                    |
| 版本：            | CSS1                                  |
| JavaScript 语法： | *object*.style.verticalAlign="bottom" |

---

#### 属性值

| 值          | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| baseline    | 默认。元素放置在父元素的基线上。                             |
| sub         | 垂直对齐文本的下标。                                         |
| super       | 垂直对齐文本的上标                                           |
| top         | 把元素的顶端与行中最高元素的顶端对齐                         |
| text-top    | 把元素的顶端与父元素字体的顶端对齐                           |
| middle      | 把此元素放置在父元素的中部。                                 |
| bottom      | 把元素的顶端与行中最低的元素的顶端对齐。                     |
| text-bottom | 把元素的底端与父元素字体的底端对齐。                         |
| length      |                                                              |
| %           | 使用 "line-height" 属性的百分比值来排列此元素。允许使用负值。 |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)     | 规定应该从父元素继承 vertical-align 属性的值。               |

---

#### 实例

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
    img.top {vertical-align:text-top;}
    img.bottom {vertical-align:text-bottom;}
</style>
</head>

<body>
    <p>一个 <img src="/statics/images/w3c/intro.png" alt="w3cschool" width="121" height="74" /> 具有默认对齐方式的图像.</p>
    <p>一个 <img class="top" src="/statics/images/w3c/intro.png" alt="w3cschool" width="121" height="75" /> 文本顶部对齐的图像.</p>
    <p>一个 <img class="bottom" src="/statics/images/w3c/intro.png" alt="w3cschool" width="121" height="75" /> 图像与文本底部对齐.</p>
</body>
</html>
```

![image-20220720152553267](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/cIa5um000image-20220720152553267.png)

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### white-space

#### 属性定义及使用说明

white-space属性指定元素内的空白怎样处理。

| 默认值：          | normal                          |
| :---------------- | ------------------------------- |
| 继承：            | yes                             |
| 版本：            | CSS1                            |
| JavaScript 语法： | *object*.style.whiteSpace="pre" |

------

#### 属性值

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| normal   | 默认。空白会被浏览器忽略。                                   |
| pre      | 空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。    |
| nowrap   | 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 |
| pre-wrap | 保留空白符序列，但是正常地进行换行。                         |
| pre-line | 合并空白符序列，但是保留换行符。                             |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)  | 规定应该从父元素继承 white-space 属性的值。                  |

#### 实例

规定段落中的文本不进行换行：

```css
p
{
white-space:nowrap;
}
```

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### word-spacing

#### 属性定义及使用说明

word-spacing属性增加或减少字与字之间的空白。

!> **注意：** 负值是允许的。

| 默认值：          | normal                            |
| :---------------- | --------------------------------- |
| 继承：            | yes                               |
| 版本：            | CSS1                              |
| JavaScript 语法： | *object*.style.wordSpacing="10px" |

------

#### 属性值

| 值       | 描述                                         |
| :------- | :------------------------------------------- |
| normal   | 默认。定义单词间的标准空间。                 |
| *length* | 定义单词间的固定空间。                       |
| [inherit](zh-cn/browser-side/css/css-关键字#inherit)  | 规定应该从父元素继承 word-spacing 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---
