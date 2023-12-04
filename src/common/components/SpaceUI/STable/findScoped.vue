<template>
  <div
    :class="{ ellipsis: column.ellipsis }"
    :title="
      Object.prototype.hasOwnProperty.call(column, 'tooltip')
        ? typeof column?.tooltip === 'function'
          ? column?.tooltip(
              {
                rowIndex: index,
                field: column,
                dataAt: record,
                record,
                value: record[column.key],
              },
              formData,
              tableModel
            )
          : column?.tooltip
        : unit.label
    "
  >
    <div v-if="Object.prototype.hasOwnProperty.call(column, 'customRender')">
      <ScopeCustomRender />
    </div>
    <template v-else-if="column.showConfig !== true">
      {{ unit.label }}
    </template>
    <template v-else>
      {{ unit.label === '-' ? '' : unit.label }}
    </template>
  </div>
</template>
<script setup lang="ts">
import { findCodeItem } from '@/common/componentsFn'
import { rowMsgType } from '@/common/componentsFn/propType/form'

interface propMsg {
  column: any
  index: string | number
  tableModel: any
  formData?: any
  record: any
  rowMsg?: rowMsgType
}
const props = withDefaults(defineProps<propMsg>(), {
  column: () => [],
  tableModel: () => ({}),
  formData: () => ({ data: [] }),
})
const { column, formData, tableModel, record, index, rowMsg } = toRefs(props)
const unit = ref<any>({ label: record.value[record.value.key], cursorDic: [] })

watchEffect(() => {
  findCodeItem({
    value: record.value[column.value.key],
    field: column.value,
    record: record.value,
    index: index?.value,
    model: tableModel.value,
    optionsScoped: [],
    rowMsg: rowMsg?.value,
  }).then((unitRes: any) => {
    unit.value = unitRes
    if (rowMsg && rowMsg.value) {
      rowMsg.value.unit[column.value.key] = unitRes
    }
  })
})

const ScopeCustomRender = defineComponent({
  render() {
    return column.value?.customRender({
      column: column.value,
      index: index.value,
      record: record.value,
      renderIndex: index,
      text: unit.value.label ?? record.value[column.value.key],
      value: record.value[column.value.key],
      unit: unit.value,
      label: unit.value.label,
    })
  },
})
</script>
<style scoped lang="scss">
// 翻译溢出隐藏
.ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
