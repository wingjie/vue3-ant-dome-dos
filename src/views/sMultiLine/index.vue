<template>
  <Content :modules="modules">
    <template #header>
      <h2>SMultiLine</h2>
      <p>
        专服务于STable，表格单行需要展示多层级数据时，此组件让事情变得简单。
      </p>
      <hr />
    </template>
    <template #footer>
      <ParseMd name="SMultiLine.md" />
    </template>
  </Content>
</template>
<script setup lang="ts">
import Content from '@/components/layout.vue'
import ParseMd from '@/components/parseMd.vue'

const modules = import.meta.glob('./automation/**/*.vue', {
  eager: true,
  import: 'default',
} as any)
</script>
<style scoped lang="scss"></style>
