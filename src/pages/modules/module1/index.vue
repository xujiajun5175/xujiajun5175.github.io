<!--
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 09:08:38
 * @LastEditTime: 2024-12-16 10:25:08
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description: 
 * @FilePath: /xujiajun.github.io/play/src/pages/modules/module1/index.vue
-->
<script setup lang='ts'>
defineOptions({
  name: ''
})
definePage({
  meta:{
    layout:'admin'
  }
})
</script>

<template>
  <div>this is module1 index page</div>
  <div>this is lastest version :{{ new Date().toLocaleString() }}</div>
</template>

<style lang='scss' scoped>

</style>
