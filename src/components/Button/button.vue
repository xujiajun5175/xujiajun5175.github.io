<!--
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-29 14:49:07
 * @LastEditTime: 2024-11-11 12:47:51
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description: 
 * @FilePath: /xujiajun.github.io/src/components/Button/button.vue
-->

<script setup lang="ts">
import { ref, computed } from 'vue'
interface Props {
  text?: boolean
  type?: 'primary' | 'info' | 'success' | 'error' | 'warn'
}

const props = withDefaults(defineProps<Props>(), {
  text: false,
  type: 'info'
})

const getDefaultClassName = computed(() => {
  let className =
    'items-center justify-center gap-4 flex px-8 py-1  rounded cursor-pointer b-0 '

  if (props.text) {
    className += ' bg-transparent hover:bg-gray-100 '
    switch (props.type) {
      case 'info':
        className += ' text-gray-500 '
        break

      case 'primary':
        className += ' text-blue-500 '
        break

      case 'success':
        className += ' text-green-500'
        break

      case 'error':
        className += ' text-red-500 '
        break

      case 'warn':
        className += ' text-orange-500 '
        break
    }
  } else {
    switch (props.type) {
      case 'info':
        className += 'text-white bg-gray-500 hover:bg-gray-400 '
        break

      case 'primary':
        className += 'text-white bg-blue-500 hover:bg-blue-400'
        break

      case 'success':
        className += 'text-white bg-green-500 hover:bg-green-400'
        break

      case 'error':
        className += 'text-white bg-red-500 hover:bg-red-400'
        break

      case 'warn':
        className += 'text-white bg-orange-500 hover:bg-orange-400'
        break
    }
  }
  return className
})
</script>

<template>
  <button :class="getDefaultClassName">
    <span v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </span>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss"></style>
