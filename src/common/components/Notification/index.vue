<template>
  <div>
    <div>code: {{ errorInfo?.code }}</div>
    <div>type: {{ errorInfo?.type }}</div>
    <div>level: {{ errorInfo?.level }}</div>
    <div>description: {{ errorInfo?.description }}</div>
    <div>
      <div v-for="(item, index) in txt.split('\n')" :key="index">
        {{ index === 0 ? 'message:' : '' }} {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type info = {
  code: any
  type: any
  level: any
  description: any
  message: any
}
const props = defineProps<info>()
const errorInfo = toRefs(props)
const txt = computed(() => errorInfo.message.value || '')
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
</style>
