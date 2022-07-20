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
background:bg-color bg-image position/ bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;
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
| inherit | 指定background-attachment的设置应该从父元素继承 |
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
| inherit     | 指定背景颜色，应该从父元素继承                               |

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
| inherit      | 指定背景图像应该从父元素继承 |

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
| inherit                                                      | 指定background-position属性设置应该从父元素继承              |

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
| inherit   | 指定background-repea属性设置应该从父元素继承 |

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
| inherit      | 规定应该从父元素继承颜色。                         |

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
| inherit | 规定应该从父元素继承 direction 属性的值。 |

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
| inherit  | 规定应该从父元素继承 letter-spacing 属性的值。 |

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
| inherit  | 规定应该从父元素继承 line-height 属性的值。          |

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
| inherit | 规定应该从父元素继承 text-align 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

### text-decoration

### 属性定义及使用说明

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
| inherit  | 规定应该从父元素继承 text-indent 属性的值。 |

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
| inherit    | 规定应该从父元素继承 text-transform 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---

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
| inherit       | 从父元素继承该属性。请参阅 [*inherit*](https://www.w3cschool.cn/cssref/css-inherit.html)。 |

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
| inherit     | 规定应该从父元素继承 vertical-align 属性的值。               |



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
| inherit  | 规定应该从父元素继承 white-space 属性的值。                  |

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
| inherit  | 规定应该从父元素继承 word-spacing 属性的值。 |

---

#### 相关文章

CSS 教程: [CSS Text](zh-cn/browser-side/css/README#CSS-文本)

---







