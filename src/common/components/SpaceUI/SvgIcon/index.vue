<template>
  <span :class="['svg-icon', name]" v-html="dataName" :style="style"></span>
</template>

<script setup lang="ts">
const modules = import.meta.glob(`./svg/*.svg`, {
  as: 'raw',
  eager: true,
} as any)

interface svgInt {
  name: string
  fontSize?: string
}
const $props = withDefaults(defineProps<svgInt>(), {
  name: '',
})
const { name, fontSize } = toRefs($props)
const style = computed(() => {
  const s: any = {}
  if (fontSize?.value) s.fontSize = fontSize.value
  return s
})
const dataName = computed(() => {
  const path = `./svg/${name.value}.svg`
  return modules[path]
})
</script>

<style scoped lang="scss">
.svg-icon {
  display: flex;
  align-items: center;
  :deep(svg) {
    display: inline-block;
    width: 1em;
    height: 1em;
    //vertical-align: -0.6em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
