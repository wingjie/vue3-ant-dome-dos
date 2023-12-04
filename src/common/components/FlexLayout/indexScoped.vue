<template>
  <span
    :class="[model?.wrapperClass, field?.wrapperClass]"
    :style="{ ...model?.wrapperStyle, ...field?.wrapperStyle }"
  >
    {{ txt }}
  </span>
</template>
<script setup lang="ts">
import { findCodeName } from '@/common/componentsFn'

interface propMsg {
  field: any
  record: any
  division: any
  index: any
  model: any
}
// const emit = defineEmits([])
const props = withDefaults(defineProps<propMsg>(), {})
const { field, record, division, index, model } = toRefs(props)
const txt = ref<any>(record.value[field.value.key])
watchEffect(() => {
  findCodeName({
    field: field.value,
    record: record.value,
    division: division.value,
    index: index.value,
    model: model.value,
  }).then((res: any) => {
    txt.value = res
  })
})
</script>
<style scoped lang="scss"></style>
