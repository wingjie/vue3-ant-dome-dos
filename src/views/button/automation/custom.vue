<template>
  <div class="box">
    <Button
      width="200px"
      type="link"
      @add="() => {}"
      @del="() => {}"
      @edit="() => {}"
      @look="() => {}"
      @custom="() => {}"
      :setup="{
        add: {
          text: '新增',
          type: 'primary',
        },
        look: {
          icon: 'ant-design:linkedin-outlined',
        },
        del: {
          iconA: {
            key: 'ant-design:linkedin-outlined',
            class: 'spinner',
          },
        },
        custom: {
          text: '自定义',
        },
      }"
      :order="['custom', 'add']"
    >
      <template #delIB>
        <i-ant-design-close-circle-twotone />
      </template>
    </Button>
  </div>
</template>
<script setup lang="ts">
const $config = ref({
  title: '自定义构建使用、排序',
  context:
    'order：排序; 给icon加一个class:spinner,就会旋转；添加自定义按钮不建议使用插槽添加',
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
