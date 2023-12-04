<template>
  <Content :modules="modules">
    <template #header>
      <h2>Icon</h2>
      <p>小图标的使用方法说明</p>
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
