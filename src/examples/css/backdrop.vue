<script setup lang="ts">
import { ElButton, ElRadio, ElRadioGroup, ElSlider } from 'element-plus'
import { computed, ref } from 'vue'

defineOptions({
  name: 'example_css_backdrop'
})

const blur = ref('')
const saturate = ref(20)

const getBackDropClassName = computed(() => {
  return `backdrop-blur-${blur.value}px backdrop-saturate-${saturate.value}`
})
</script>
<template>
  <div
    class="not-content w-full min-h-400px b-1px b-solid b-gray-500 flex flex-col overflow-hidden"
  >
    <div class="h-36px bg-blue-100 b-0 b-b-1px b-solid">2222</div>
    <div class="flex-1 w-full flex overflow-hidden !mt-0">
      <div class="b-0 b-r-1px b-solid w-1/2 p-3 flex flex-col">
        <div>
          <p>blur 高斯模糊</p>
          <el-radio-group v-model="blur">
            <el-radio value="2" size="small">2px</el-radio>
            <el-radio value="4" size="small">4px</el-radio>
            <el-radio :value="16" size="small">16px</el-radio>
          </el-radio-group>
          <p>saturate 饱和度</p>
          <el-slider v-model="saturate" :max="200" />
        </div>
      </div>
      <div class="flex-1 overflow-y-auto !mt-0 relative">
        <div
          class="h-full w-full backdrop-filter bg-transparent"
          :class="getBackDropClassName"
        ></div>
        <img
          class="absolute -z-1 top-0 left-0 h-full w-full"
          src="/favicon.svg"
          alt="backgrop-example"
          style="filter: drop-shadow(0 0 3rem hsla(255, 60%, 60%, 0.2))"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
