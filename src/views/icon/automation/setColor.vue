<template>
  <div class="box">
    <i-mdi-book-plus-multiple-outline style="color: #096dd9; font-size: 20px" />
    <Icons :icon="icon" style="color: #d9363e; font-size: 30px" />
    <component :is="dynamic"></component>
  </div>
</template>
<script setup lang="ts">
// import Icons from '@/common/components/Icons'
import { iconRender } from '@/common/hook/icon'

const icon = ref('material-symbols:bring-your-own-ip')

const dynamic = iconRender('material-symbols:card-membership-outline', {
  style: { color: '#faad14', fontSize: '40px' },
})
const $config = ref({
  title: '设置颜色和大小',
  order: 2,
  context:
    '值得叙述的是第三种方式，iconRender第二个参数可以直接穿透作用到组件上。',
})

defineExpose({
  $config,
})
</script>
<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
}
</style>
