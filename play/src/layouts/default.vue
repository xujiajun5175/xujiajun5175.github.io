<!--
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-12-11 10:47:17
 * @LastEditTime: 2024-12-11 23:16:38
 * @LastEditors: 徐家俊 1515183820@163.com
 * @Description: 
 * @FilePath: \xujiajun5175.github.io\play\src\layouts\default.vue
-->
<script setup lang="ts">
    defineOptions({
        name: 'default_layout',
    })
</script>

<template>
    <section class="h-screen w-screen overflow-hidden flex flex-col">
        <header class="h-50px flex justify-between items-center bg-blue-500">
            <span>icon</span>
            <span>other...</span>
        </header>
        <section class="flex flex-1 w-full overflow-hidden">
            <aside class="w-50 bg-gray-300 overflow-x-hidden overflow-y-auto"> 
              <p v-for="i in 200" class="text-center hover:bg-amber-1 py-2 cursor-pointer">this is a menu-item:{{i+1}}</p>
            </aside>
            <main class="flex-1 overflow-y-auto overflow-x-hidden">
                <router-view></router-view>
            </main>
        </section>
        <footer class="h-50px flex justify-center items-center bg-blue-500">
            <span>this is footer </span>
        </footer>
    </section>
</template>

<style lang="scss" scoped></style>
