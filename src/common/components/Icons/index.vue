<template>
  <span class="iconBox">
    <template v-if="icon">
      <IconVue
        v-if="/^.*:/.test(icon)"
        :icon="icon"
        :style="style"
        v-bind="bindAttrs"
        :class="icon"
        :name="icon"
      />
      <SvgIcon
        v-else
        :icon="icon"
        :style="style"
        v-bind="bindAttrs"
        :name="icon"
      >
      </SvgIcon>
    </template>
  </span>
</template>

<script setup lang="ts">
import { Icon as IconVue } from '@iconify/vue'

interface Props {
  /** 图标名称 */
  icon?: string
}
const props = withDefaults(defineProps<Props>(), {
  icon: 'no-icon',
})
const { icon } = toRefs(props)

const attrs = useAttrs()
const style = reactive({
  fontSize: '20px',
})

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || '',
}))
</script>

<style scoped lang="scss">
.iconBox {
  overflow: hidden;
  display: flex;
  align-items: center;
}
</style>
