# Flex 布局 基础

**文档更新日期: {docsify-updated}**

> 参考文档: [阮一峰的网络日志:Flex 布局教程](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

### 骰子布局

---

骰子的一面，最多可以放置 9 个点。

![bg2015071328](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071328-20220217211115.png)

下面，就来看看 Flex 如何实现，从 1 个点到 9 个点的布局。你可以到[codepen](https://codepen.io/LandonSchropp/pen/KpzzGo)查看 Demo。

![bg2015071329](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071329.png)

如果不加说明，本节的 HTML 模板一律如下。

```html
<div class="box">
  <span class="item"></span>
</div>
```

上面代码中，div 元素（代表骰子的一个面）是 Flex 容器，span 元素（代表一个点）是 Flex 项目。如果有多个项目，就要添加多个 span 元素，以此类推。

#### 单项目

<!-- tabs:start -->

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217223606773-20220217223606.png" alt="image-20220217223606773" style="zoom:25%;pointer-events: none;" />**

**左对齐**

Flex 布局默认就是首行左对齐

![bg2015071301](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071301-20220217211400.png)

```css
.box {
  display: flex;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217223648204-20220217223648.png" alt="image-20220217223648204" style="zoom:25%;pointer-events: none;" />**

**居中对齐**

![bg2015071302](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071302-20220217211540.png)

```css
.box {
  display: flex;
  justify-content: center;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217223708370-20220217223708.png" alt="image-20220217223708370" style="zoom:25%;pointer-events: none;" />**

**右对齐**

![bg2015071303](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071303-20220217211552.png)

```css
.box {
  display: flex;
  justify-content: flex-end;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217223733562-20220217223733.png" alt="image-20220217223733562" style="zoom:25%;pointer-events: none;" />**

**交叉轴对齐**

设置交叉轴对齐方式，可以垂直移动主轴。

![bg2015071304](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071304-20220217212052.png)

```css
.box {
  display: flex;
  align-items: center;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217223752523-20220217223752.png" alt="image-20220217223752523" style="zoom:25%;pointer-events: none;" />**

![bg2015071305](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071305-20220217212138.png)

```css
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217223816617-20220217223816.png" alt="image-20220217223816617" style="zoom:25%;pointer-events: none;" />**

![bg2015071306](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071306-20220217212210.png)

```css
.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217223830983-20220217223831.png" alt="image-20220217223830983" style="zoom:25%;pointer-events: none;" ondragstart="return false;"  />**

![bg2015071307](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071307-20220217212236.png)

```css
.box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
```

<!-- tabs:end -->

#### 双项目

---

<!-- tabs:start -->

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225010803-20220217225010.png" alt="image-20220217225010803" style="zoom:25%;pointer-events: none;" />**

![bg2015071308](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071308-20220217222034.png)

```css
.box {
  display: flex;
  justify-content: space-between;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225028502-20220217225028.png" alt="image-20220217225028502" style="zoom:25%;pointer-events: none;" />**

![bg2015071309](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071309-20220217222131.png)

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225037187-20220217225037.png" alt="image-20220217225037187" style="zoom:25%;pointer-events: none;" />**

![bg2015071310](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071310-20220217222155.png)

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225059194-20220217225059.png" alt="image-20220217225059194" style="zoom: 25%;pointer-events: none;" />**

![bg2015071311](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071311.png)

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225108809-20220217225108.png" alt="image-20220217225108809" style="zoom:25%;pointer-events: none;" />**

![bg2015071312](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071312-20220217222402.png)

```css
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225117810-20220217225117.png" alt="image-20220217225117810" style="zoom: 25%;pointer-events: none;" />**

![bg2015071313](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071313-20220217222420.png)

```css
.box {
  display: flex;
  justify-content: space-between;
}

.item:nth-child(2) {
  align-self: flex-end;
}
```

<!-- tabs:end -->

#### 三项目

---

<!-- tabs:start -->

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225127009-20220217225127.png" alt="image-20220217225127009" style="zoom:25%;pointer-events: none;" />**

![bg2015071314](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071314.png)

```css
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}

.item:nth-child(3) {
  align-self: flex-end;
}
```

<!-- tabs:end -->

#### 四项目

---

<!-- tabs:start -->

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225136043-20220217225136.png" alt="image-20220217225136043" style="zoom:25%;pointer-events: none;" />**

![bg2015071315](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071315-20220217222825.png)

```css
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-between;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225144562-20220217225144.png" alt="image-20220217225144562" style="zoom:25%;pointer-events: none;" />**

![bg2015071316](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071316.png)

```html
<div class="box">
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
```

<!-- tabs:end -->

#### 六项目

---

<!-- tabs:start -->

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225154958-20220217225155.png" alt="image-20220217225154958" style="zoom:25%;pointer-events: none;" />**

![bg2015071317](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071317-20220217223203.png)

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225202955-20220217225203.png" alt="image-20220217225202955" style="zoom:25%;pointer-events: none;" />**

![bg2015071318](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071318-20220217223219.png)

```css
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
}
```

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225212375-20220217225212.png" alt="image-20220217225212375" style="zoom:25%;pointer-events: none;" />**

![bg2015071319](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071319-20220217223316.png)

```html
<div class="box">
  <div class="row">
    <span class="item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="row">
    <span class="item"></span>
  </div>
  <div class="row">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
}

.row {
  flex-basis: 100%;
  display: flex;
}

.row:nth-child(2) {
  justify-content: center;
}

.row:nth-child(3) {
  justify-content: space-between;
}
```

<!-- tabs:end -->

#### 九项目

---

<!-- tabs:start -->

###### **<img src="https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/image-20220217225222252-20220217225222.png" alt="image-20220217225222252" style="zoom:25%;pointer-events: none;" />**

![bg2015071320](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071320-20220217223418.png)

```css
.box {
  display: flex;
  flex-wrap: wrap;
}
```

<!-- tabs:end -->

### 网格布局

---

#### 基本网格布局

---

最简单的网格布局，就是平均分布。在容器里面平均分配空间，跟上面的骰子布局很像，但是需要设置项目的自动缩放

![bg2015071321](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071321-20220217225457.png)

```html
<div class="Grid">
  <div class="Grid-cell">...</div>
  <div class="Grid-cell">...</div>
  <div class="Grid-cell">...</div>
</div>
```

```css
.Grid {
  display: flex;
}

.Grid-cell {
  flex: 1;
}
```

#### 百分比布局

---

某个网格的宽度为固定的百分比，其余网格平均分配剩余的空间。![bg2015071322](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071322-20220217225539.png)

```html
<div class="Grid">
  <div class="Grid-cell u-1of4">...</div>
  <div class="Grid-cell">...</div>
  <div class="Grid-cell u-1of3">...</div>
</div>
```

```css
.Grid {
  display: flex;
}

.Grid-cell {
  flex: 1;
}

.Grid-cell.u-full {
  flex: 0 0 100%;
}

.Grid-cell.u-1of2 {
  flex: 0 0 50%;
}

.Grid-cell.u-1of3 {
  flex: 0 0 33.3333%;
}

.Grid-cell.u-1of4 {
  flex: 0 0 25%;
}
```

### 圣杯布局

---

[圣杯布局](<https://en.wikipedia.org/wiki/Holy_Grail_(web_design)>)（Holy Grail Layout）指的是一种最常见的网站布局。

页面从上到下，分成三个部分：

- 头部（header）
- 躯干（body）,又水平分成三栏，从左到右为：
  - 导航
  - 主栏
  - 副栏
- 尾部（footer）

![bg2015071323](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071323-20220217225757.png)

```html
<body class="HolyGrail">
  <header>...</header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">...</main>
    <nav class="HolyGrail-nav">...</nav>
    <aside class="HolyGrail-ads">...</aside>
  </div>
  <footer>...</footer>
</body>
```

```css
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

header,
footer {
  flex: 1;
}

.HolyGrail-body {
  display: flex;
  flex: 1;
}

.HolyGrail-content {
  flex: 1;
}

.HolyGrail-nav,
.HolyGrail-ads {
  /* 两个边栏的宽度设为12em */
  flex: 0 0 12em;
}

.HolyGrail-nav {
  /* 导航放到最左边 */
  order: -1;
}
```

!> 如果是小屏幕，躯干的三栏自动变为垂直叠加。

```css
@media (max-width: 768px) {
  .HolyGrail-body {
    flex-direction: column;
    flex: 1;
  }
  .HolyGrail-nav,
  .HolyGrail-ads,
  .HolyGrail-content {
    flex: auto;
  }
}
```

### 输入框的布局

---

常常需要在输入框的前方添加提示，后方添加按钮。

![bg2015071324](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071324-20220217225924.png)

```html
<div class="InputAddOn">
  <span class="InputAddOn-item">...</span>
  <input class="InputAddOn-field" />
  <button class="InputAddOn-item">...</button>
</div>
```

```css
.Media {
  display: flex;
  align-items: flex-start;
}

.Media-figure {
  margin-right: 1em;
}

.Media-body {
  flex: 1;
}
```

### 固定的底栏

---

有时，页面内容太少，无法占满一屏的高度，底栏就会抬高到页面的中间。这时可以采用 Flex 布局，让底栏总是出现在页面的底部。

![bg2015071326](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071326-20220217230021.png)

```html
<body class="Site">
  <header>...</header>
  <main class="Site-content">...</main>
  <footer>...</footer>
</body>
```

```css
.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;
}
```

### 流式布局

---

每行的项目数固定，会自动分行。

![bg2015071330](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/bg2015071330-20220217230405.png)

```css
.parent {
  width: 200px;
  height: 150px;
  background-color: black;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}

.child {
  box-sizing: border-box;
  background-color: white;
  flex: 0 0 25%;
  height: 50px;
  border: 1px solid red;
}
```

?> 版权声明：自由转载-非商用-非衍生-保持署名（[创意共享 3.0 许可证](https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh)）
