<template>
  <span class="iconBox">
    <IconPersist
      class="icon"
      :name="name"
      v-bind="bindAttrs"
      :width="width"
      :height="height"
    />
  </span>
</template>

<script setup lang="ts">
import { Icon as IconPersist } from 'vite-plugin-iconify-preset/vue'

interface Props {
  /** 图标名称 */
  name?: string
  width?: string
  height?: string
}
const props = withDefaults(defineProps<Props>(), {
  name: 'no-icon',
})
const { name, width, height } = toRefs(props)

const attrs = useAttrs()
// const style = reactive({
//   fontSize: '20px',
// })

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || '',
}))
</script>

<style scoped lang="scss">
.iconBox {
  overflow: hidden;
  .icon {
    vertical-align: sub;
  }
}
</style>
