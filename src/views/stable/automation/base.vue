<template>
  <div>
    <STable v-bind="tableData"></STable>
  </div>
</template>
<script setup lang="ts">
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

const tableData = reactive({
  tableData: [
    { one: 'a', two: 'a-1', three: 'a-1-1', base: 'base' },
    {
      one: 'c(没有匹配的项)',
      two: 'c-1', // 值没有匹配的项，则会直接展示值
      three: 'c-1-1',
      base: '和antD用法一样',
    },
  ],
  columns: [
    { title: '基础用法', key: 'base', dataIndex: 'base' },
    {
      title: '一级',
      key: 'one',
      type: 'select',
      options() {
        return optionData
      },
      isForm: true,
    },
    {
      title: '二级',
      key: 'two',
      type: 'select',
      config: {
        options(_val: any, data: any) {
          const { rowMsg } = data
          return rowMsg?.unit?.one?.cursorDic?.menuItems || []
        },
      },
    },
    {
      title: '三级',
      key: 'three',
      type: 'select',
      config: {
        options(_val: any, data: any) {
          const { rowMsg } = data
          return rowMsg?.unit?.two?.cursorDic?.menuItems || []
        },
      },
    },
  ],
  fieldModel: {
    isForm: false,
    config: {
      isForm: false,
    },
    tableAttr: {
      pagination: false,
    },
  },
})

const $config = ref({
  title: '基础使用',
  order: 1,
  context:
    '值得注意的是该组件有自动翻译的功能，像是select的反向推倒，若值没有匹配的项，则直接将值直接展示。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
