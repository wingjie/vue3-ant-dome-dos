<template>
  <Content :modules="modules">
    <template #header>
      <h2>X6使用</h2>
      <!-- <p>快速构建form表单，以数据配置构建页面，包括布局、校验等功能。</p> -->
      <hr />
    </template>
    <template #footer>
      <!-- <ParseMd name="SForm.md" /> -->
    </template>
  </Content>
</template>
<script setup lang="ts">
import Content from '@/components/layout.vue'
// import ParseMd from '@/components/parseMd.vue'

const modules = import.meta.glob('./automation/**/*.vue', {
  eager: true,
  import: 'default',
} as any)
</script>
