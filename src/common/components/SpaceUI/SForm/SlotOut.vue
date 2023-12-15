<template>
  <div>
    <slot :name="`${field.key}`" v-bind="attr" :field="field"></slot>
  </div>
</template>
<script setup lang="ts">
import { fieldListType } from '@/common/componentsFn/propType'

interface propMsg {
  field: fieldListType
}
// const emit = defineEmits([])
const props = withDefaults(defineProps<propMsg>(), {})
const { field } = toRefs(props)
const attr = useAttrs()
provide('field', field)
</script>
<style scoped lang="scss"></style>
