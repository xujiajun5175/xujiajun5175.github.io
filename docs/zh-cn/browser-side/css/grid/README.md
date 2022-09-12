<!--
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2022-09-12 15:53:43
 * @LastEditors: 徐家俊 15151832830@163.com
 * @LastEditTime: 2022-09-12 16:19:07
 * @FilePath: /18626428291/docs/zh-cn/browser-side/css/grid/README.md
 * @Description: 网格布局
-->

# 网格布局

### 定义网格布局显示

display:grid

---

### 定义列和行

- grid-template-columns
- grid-template-rows
- grid-template :  grid-template-rows / grid-template-columns

```css
{
  display:grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;

}
```

?> 可是配合 `repeat(列数,占比)`来设置

创建8列，每列占12.5%的宽度

```css
{
  display:grid;
  grid-template-columns: repeat(8, 12.5%)
}
```

不仅仅只接受百分比的值，也接受像像素或em这样的长度单位

```css
{
  display:grid;
  grid-template-columns:100px 3em 40%;
}
```

?> 新单位 `fr`分数

平均分配为6份,第一列占1/6,其余5/6

```css
#garden {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 20% 20% 20% 20% 20%;
}
```

?> 当列的宽度采用像素，百分比或者em的单位的时候，其他使用fr单位设置的列将会平分剩下的空间

---

### 指定子项行或列位置

- grid-column-start : 索引(从1开始,-1结束)
- grid-column-end :  索引(从1开始,-1结束)
- grid-column: grid-column-start / grid-column-end
- grid-row-start : 索引(从1开始,-1结束)
- grid-row-end :  索引(从1开始,-1结束)
- grid-row: grid-row-start / grid-row-end
- grid-area: grid-row-start /  grid-column-start / grid-row-end / grid-column-end

```css
#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
grid-column: 2/-1;
grid-row: 1/-1;
}
```

### 调整顺序

- order :默认0
