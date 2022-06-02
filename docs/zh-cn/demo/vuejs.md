# vue Demo

**文档更新日期: {docsify-updated}**

### 实现图片列表单选功能

- 参考文章

  > [vue.js 实现图片单选功能](https://blog.csdn.net/qq_37842366/article/details/96976608)

- 实现效果

  ![2022-02-12 23.27.44](https://gitee.com/xujiajun0319/typora_imgs/raw/master/uPic/2022-02-12%2023.27.44.gif)

- 实现代码

```vue
<template>
  <div>
    ...
    <img
      :class="{
        chart_li_active: item.id == checked,
        chart_li: true,
      }"
      v-for="item in imgs"
      :key="item.id"
      :src="item.url"
      alt=""
      @click="select(index)"
    />
    ...
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false,
     imgs: [
        {
          id: "1",
          type: "line",
          url: require("@/assets/cause_analyse/pollutant_degree_rate-zhe-1.jpg")
        },
        {
          id: "2",
          type: "zhu",
          url: require("@/assets/cause_analyse/pollutant_degree_rate-zhu-1.jpg")
        },
        {
          id: "3",
          type: "mian",
          url: require("@/assets/cause_analyse/pollutant_degree_rate-mian-1.jpg")
        },
      ],
    };
  },
  methods: {
    select (event, index) {
      if (this.checked == index) {
        this.checked = !this.checked;
      } else {
        this.checked = index;
      }
    },
};
</script>

<style scoped>
.chart_li {
  width: 160px;
  height: auto;
  margin: 10px;
  border: 3px solid white;
}
.chart_li_active {
  border: 3px solid orange;
}
</style>
```

### 禁止鼠标事件

```js
oncontextmenu = 'return false;' //禁止鼠标右键

ondragstart = 'return false;' //禁止鼠标拖动

onselectstart = 'return false;' //文字禁止鼠标选中

onselect = 'document.selection.empty();' //禁止复制文本
```

> 例如：`<img src="img/logo.jpg" ondragstart="return false;" />`
