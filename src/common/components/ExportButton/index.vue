<template>
  <div>
    <SButtonGroup
      v-bind="{ ...$attrs }"
      :len="0"
      :more="{
        text: '导出',
        icon: { key: 'pure-operation-derive' },
      }"
      :setup="{
        ...assignSetup,
      }"
    ></SButtonGroup>
  </div>
</template>
<script setup lang="ts">
interface propMsg {
  setup?: any
}
// const emit = defineEmits([])
const props = withDefaults(defineProps<propMsg>(), {
  setup: () => ({}),
})
const { setup } = toRefs(props)
const $attrs = useAttrs()

const setupData = {
  exportAll: {
    text: '导出所有数据',
  },
  exports: {
    text: '导出当前数据',
  },
}

const assignSetup = computed(() => $assign({}, setupData, setup.value))
</script>
<style scoped lang="scss"></style>
