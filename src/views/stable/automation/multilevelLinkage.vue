<template>
  <div>
    <STable v-bind="tableData"></STable>
  </div>
</template>
<script setup lang="ts">
import linkageHookTable from '@/common/hook/linkageHookTable'

const optionData = [
  {
    label: 'A',
    value: 'a',
    menuItems: [
      {
        label: 'A-1',
        value: 'a-1',
        menuItems: [
          { label: 'A-1-1', value: 'a-1-1' },
          { label: 'A-1-2', value: 'a-1-2' },
        ],
      },
      {
        label: 'B-1',
        value: 'b-1',
        menuItems: [
          { label: 'B-1-1', value: 'b-1-1' },
          { label: 'B-1-2', value: 'b-1-2' },
        ],
      },
    ],
  },
  {
    label: 'B',
    value: 'b',
    menuItems: [
      {
        label: 'B-1',
        value: 'b-1',
        menuItems: [{}],
      },
    ],
  },
]

const [fieldList] = linkageHookTable([
  {
    config: {
      options() {
        return optionData
      },
    },
  },
])

const tableData = reactive({
  tableData: [
    { one: 'a', two: 'a-1', three: undefined },
    { one: undefined, two: undefined, three: undefined },
  ],
  columns: [
    fieldList[0],
    fieldList[1],
    fieldList[2],
    { title: '其他', key: 'three', type: 'select' },
  ],
  fieldModel: {
    isForm: true,
    config: {
      isForm: true,
    },
    tableAttr: {
      pagination: false,
    },
  },
})

const $config = ref({
  title: '多级联动(hook:linkageHookTable)',
  order: 4,
  context:
    '表格行内多级联动。使用hook linkageHookTable,入参linkageHookTable(option)可以对默认值进行覆盖更改(key、title...)。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
