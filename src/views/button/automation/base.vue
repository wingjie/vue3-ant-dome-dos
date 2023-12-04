<template>
  <div class="box">
    <Button
      @add="() => {}"
      @del="() => {}"
      @edit="() => {}"
      @look="() => {}"
    ></Button>
  </div>
</template>
<script setup lang="ts">
const $config = ref({
  title: '基础使用',
  context: '使用预设的自定义方法就会构建相应的按钮',
  // contextType: 'pre',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss">
// .box {
//   display: flex;
//   align-items: center;
// }
</style>
