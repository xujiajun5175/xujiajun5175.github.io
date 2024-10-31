<!--
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-31 16:12:09
 * @LastEditTime: 2024-10-31 16:31:17
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description: 
 * @FilePath: /xujiajun.github.io/src/components/Radio/vue/radio.vue
-->
<script setup lang="ts">
defineOptions({
  name: ''
})

const props = withDefaults(
  defineProps<{ label?: string; checked: boolean; value?: string | number }>(),
  { label: '', number: '' }
)
const emits = defineEmits<{ change: [e: Event] }>()
function onchange(e: Event) {
  emits('change', e)
}
</script>

<template>
  <label class="radio-label">
    <input
      type="radio"
      :value="props.value"
      :checked="props.checked"
      @change.prevent="onchange"
    />
    <span class="radio-circle"></span>
    <span class="radio-text">{{ props.label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.radio-circle {
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 8px;
}
.radio-text {
  font-size: 14px;
}
input[type='radio']:checked + .radio-circle {
  border-color: #007bff;
  background-color: #007bff;
}

input[type='radio'] {
  position: absolute;
  border: 0;
  border-radius: inherit;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}
</style>
