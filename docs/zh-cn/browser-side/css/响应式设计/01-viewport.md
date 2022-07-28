# Viewport<!-- {docsify-ignore} -->

**文档更新日期: {docsify-updated}**

## 什么是 Viewport?

`viewport `是用户网页的可视区域。

`viewport` 翻译为中文可以叫做"视区"。

手机浏览器是把页面放在一个虚拟的"窗口"`（viewport）`中，通常这个虚拟的"窗口"`（viewport）`比屏幕宽，这样就不用把每个网页挤到很小的窗口中（这样会破坏没有针对手机浏览器优化的网页的布局），用户可以通过平移和缩放来看网页的不同部分。

---

## 设置 Viewport

一个常用的针对移动网页优化过的页面的 `viewport meta` 标签大致如下：

- `width`：控制 `viewport` 的大小，可以指定的一个值，如果 600，或者特殊的值，如` device-width` 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
- `height`：和 `width` 相对应，指定高度。
- `initial-scale`：初始缩放比例，也即是当页面第一次 `load` 的时候缩放比例。
- `maximum-scale`：允许用户缩放到的最大比例。
- `minimum-scale`：允许用户缩放到的最小比例。
- `user-scalable`：用户是否可以手动缩放。

以下实例演示了使用 `viewport` 和没使用 `viewport` 在移动端上的效果：

##### 实例1、没有添加 `viewport`：[点击查看](https://www.w3cschool.cn/statics/demosource/example_withoutviewport.html)

![img](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/Ute3X3000img_viewport1.png)

##### 实例2、添加 viewport：[点击查看](https://www.w3cschool.cn/statics/demosource/example_withviewport.html)

![img](https://typora-img-1257000606.cos.ap-beijing.myqcloud.com/uPic/htnrXP000img_viewport2.png)

如果你在平板电脑或手机上访问，可以直接点击查看效果。