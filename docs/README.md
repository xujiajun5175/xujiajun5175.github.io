# xujiajun0319

收录如下:
[前端学习笔记及参考手册](zh-cn/browser-side/)
[Java 学习笔记及参考手册](zh-cn/server-side/)
[游戏手册...](zh-cn/other/play/)
[其他](zh-cn/other/)

有问题请联系 微信:15151832830

!> 如果侵权请告知,会及时处理.均是本着学习意愿,不做商用及牟利

#### 兼容 vue

1. {{ msg }}
1. {{ version }}

<p v-if="false">Text for GitHub</p>

<ul>
<li v-for="i in 3">{{ i }}</li>
</ul>

<div id="counter">
  <button @click="count -= 1">-</button>
  {{ count }}
  <button @click="count += 1">+</button>
</div>

<script>
   new Vue({
       el:'main',
       data(){
           return{
               msg:"dasds",
               count:0
           }
       }
   })
</script>
