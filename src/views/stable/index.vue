<template>
  <Content :modules="modules">
    <template #header>
      <h2>STable</h2>
      <p>应对表格中使用form表单并校验、翻译等一系列场景。</p>
      <hr />
    </template>
    <template #footer>
      <ParseMd name="STable.md" />
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
