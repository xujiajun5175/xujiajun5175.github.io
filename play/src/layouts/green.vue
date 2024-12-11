<!--
 * @Author: 徐家俊 1515183820@163.com
 * @Date: 2024-12-11 21:53:19
 * @LastEditTime: 2024-12-11 21:59:22
 * @LastEditors: 徐家俊 1515183820@163.com
 * @Description: 
 * @FilePath: \xujiajun5175.github.io\play\src\layouts\green.vue
-->


<script setup lang='ts'>
defineOptions({
  name: 'green-layout'
})
</script>

<template>
  <div class="relative flex flex-col ">
    <header class="w-full bg-green-500 h-100px sticky top-0 ">
      this is page header
    </header>
    <router-view></router-view>
  </div>
</template>

<style lang='scss' scoped>

</style>
