<template>
  <div>
    <CodeEditor v-model="obj.txt" />
    {{ obj.txt }}
  </div>
</template>
<script setup lang="ts">
const obj = reactive({ txt: '' })
const $config = reactive({
  title: '基本使用',
  context:
    '什么都不用配置，像input框那样使用即可，默认语言为javascript，风格为白色。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
