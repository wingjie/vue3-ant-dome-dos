<template>
  <div class="content">
    <slot></slot>
    <slot name="content"></slot>
  </div>
</template>
<script setup lang="ts">
onMounted(() => {
  setContentHeight()
})
const contentHeight = ref<any>('100px')
function setContentHeight() {
  const contentDom: any = document.documentElement.querySelector('.content')
  const bodyHeight = document.body.offsetHeight
  const top = contentDom?.offsetTop || 150
  const height = bodyHeight - (top + 56 + 24)
  contentHeight.value = height > 150 ? `${height}px` : `${150}px`
}
defineExpose({
  update: setContentHeight,
})
</script>
<style scoped lang="scss">
.content {
  width: 100%;
  min-height: v-bind('contentHeight');
  box-sizing: border-box;
  border-radius: 8px;
}
</style>
