<template>
  <div>
    <STable ref="tableRef" v-bind="{ fieldModel, columns, tableData }">
      <template #header-great="data">
        <SMultiLine v-bind="data" :header="true" />
      </template>
      <template #great="data">
        <SMultiLine v-bind="data" :defaultOnOff="true" />
      </template>
    </STable>
    <a-button type="primary" @click="fn">校验</a-button>
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
    width: 100,
    formItemAttr: {
      rules: [{ required: true, trigger: 'change', message: '不能为空' }],
    },
    type: 'select',
    isForm: true,
    config: {
      options() {
        return optionData
      },
    },
  },
  { width: 100, type: 'select', isForm: true },
  { width: 100, type: 'select', isForm: true },
  { width: 100, type: 'select', isForm: true },
  { width: 100, type: 'select', isForm: true },
])

const tableRef = ref()
const fieldModel = reactive({
  isForm: true,
  config: {
    isForm: true,
  },
  follow: true,
  tableAttr: {
    rowKey: 'key',
    pagination: false,
  },
})
const columns = reactive([
  {
    title: '工单',
    key: 'order',
    dataIndex: 'order',
    type: 'input',
    width: 150,
    rules: [{ required: true, trigger: 'change', message: '不能为空' }],
  },
  {
    title: '级别',
    key: 'great',
    type: 'slotOut', // ?!这里需要用slotOut，因为要舍弃自带的formItem
    slotHead: true, // 自定义表头
    configData: 'content', // 配置数据的key
    width: 600, // 总共拆分列的长度
    content: {
      borderColor: 'red', // 下划线颜色
      before: [
        {
          width: 50,
          title: '类型',
          key: 'type',
          type: 'input',
          formItemAttr: {
            rules: [{ required: true, trigger: 'change', message: '不能为空' }],
          },
          isForm: true,
        },
      ],
      configData: 'content',
      content: {
        width: 500,
        // 如果此处需要继续拆分
        borderColor: 'pink', // 下划线颜色
        before: [...fieldList],
      },
      after: [{ width: 50, title: '日期', key: 'time' }],
    },
  },
])
const tableData = reactive([
  {
    order: '23232323-23',
    content: [
      {
        type: '',
        time: '2022/23/23',
        content: [
          { one: 'a', two: 'a-1', three: 'a-1-1' },
          { one: 'b', two: 'b-2' },
        ],
      },
      {
        type: 'B',
        time: '2022/23/21',
        content: [{}],
      },
    ],
  },
  {
    order: '23232323-21',
    content: [
      {
        type: 'C',
        time: '2022/23/22',
        content: [{}],
      },
    ],
  },
])
function fn() {
  tableRef.value.validate()
}

const $config = ref({
  title: '多级联动(hook:linkageHookTable)',
  context:
    '表格行内多级联动。使用hook linkageHookTable,入参linkageHookTable(option)可以对默认值进行覆盖更改(key、title...)。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
