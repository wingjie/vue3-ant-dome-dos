<template>
  <Content :modules="modules">
    <template #header>
      <h2>SSearchForm</h2>
      <p>构建通用的搜索条件的模块,统一样式</p>
      <hr />
    </template>
    <template #footer>
      <ParseMd name="SSearchForm.md" />
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
