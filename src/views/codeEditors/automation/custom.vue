<template>
  <div>
    <div style="width: 100%; height: 200px">
      <CodeEditor
        v-model="obj.txt"
        placeholder="请输入速度速度"
        :type="[html, 'oneDark']"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { html } from '@codemirror/lang-html'

const obj = reactive({ txt: '' })
setTimeout(() => {
  obj.txt = '<div>你好</div>'
}, 3000)

const $config = reactive({
  title: '自定义使用',
  context:
    '如果默认的配置，不能满足需求，可以自定义设置内置配置，甚至可以独立引入一个包进行配置，如示例中的html语言是通过独立引入的包，oneDark风格为内置配置',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
