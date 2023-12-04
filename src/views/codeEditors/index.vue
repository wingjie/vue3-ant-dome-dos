<template>
  <Content :modules="modules">
    <template #header>
      <h2>CodeEditors</h2>
      <p>
        将codemirror封装成跟input框一样。默认配置语言为javascript，风格为白色，尺寸默认跟随父节点的尺寸。
      </p>
      <h4>参数配置:</h4>
      <p>
        <span>type:</span>[语言， 风格] (['javascript',
        'myTheme']），都可以下载其他包，或者自定义设置。详情请参考codeEditors组件内的默认设置。
      </p>
      <p><span>disabled:</span>是否禁用。（true）</p>
      <p><span>options:</span>其它更详细的参数配置。请参考vue-codemirror文档</p>
      <p><span>placeholder</span></p>
      <p><span>v-model</span></p>
      <hr />
      <hr />
    </template>
  </Content>
</template>
<script setup lang="ts">
import Content from '@/components/layout.vue'

const modules = import.meta.glob('./automation/**/*.vue', {
  eager: true,
  import: 'default',
} as any)
</script>
