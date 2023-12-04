<template>
  <div>
    <STable
      v-model:expandedRowKeys="expandedRowKeys"
      ref="tableRef"
      v-bind="table"
    >
      <template #expandIcon="data">
        <span @click="open(data.record)">
          <i-openmoji-backhand-index-pointing-right v-if="!data.expanded" />
          <i-openmoji-backhand-index-pointing-up v-else />
        </span>
      </template>
      <template #expandedRowRender="{ record, actionData: { propName } }">
        <STable
          v-bind="nestTable"
          :name="[...propName, 'like']"
          :tableData="record.like"
        >
        </STable>
      </template>
      <template #likeIn="{ data }">
        <a-button type="primary" size="small" @click="open(data)"
          >点击详情</a-button
        >
      </template>
    </STable>
    <a-button type="primary" @click="validate">校验</a-button>
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'

const tableRef = ref()
const expandedRowKeys = ref(['1_1'])
const table = reactive({
  tableData: [
    {
      name: 'wing',
      age: '',
      sex: '0',
      like: [
        { writing: '', sing: '以父之名' },
        { writing: '', sing: '' },
      ],
      key: '1_1',
    },
    {
      name: 'ring',
      age: '19', // 值没有匹配的项，则会直接展示值
      sex: '1',
      like: [
        { writing: '', sing: '乱舞春秋' },
        { writing: '', sing: '' },
      ],
      key: '2_2',
    },
  ],
  columns: [
    { title: '姓名', key: 'name', dataIndex: 'name' },
    { title: '年龄', key: 'age', type: 'input' },
    {
      title: '性别',
      key: 'sex',
      type: 'select',
      config: {
        options() {
          return [
            { label: '男', value: '0' },
            { label: '女', value: '1' },
          ]
        },
      },
    },
    { title: '爱好', key: 'like', type: 'slot', align: 'center' },
  ],
  fieldModel: {
    isForm: true,
    follow: true,
    rules: {
      age: [{ required: true, trigger: 'change', message: '不能为空' }],
    },
    tableAttr: {
      // expandRowByClick: false, // 点击行任意地方都能生效
      defaultExpandAllRows: true,
      rowKey: 'key', // 必须要有的
      pagination: false,
    },
    config: {
      isForm: true,
    },
  },
})
const nestTable = reactive({
  // tableData: [],
  columns: [
    { title: '日期', key: 'date', type: 'input' },
    { title: '唱歌', key: 'sing', type: 'input' },
    { title: '写字', key: 'writing', type: 'input' },
  ],
  fieldModel: {
    isForm: true,
    follow: true,
    rules: {
      sing: [{ required: true, trigger: 'change', message: '不能为空' }],
    },
    tableAttr: {
      rowKey: 'key', // 必须要有的
      pagination: false,
    },
    config: {
      isForm: true,
    },
  },
})
function validate() {
  tableRef.value.validate().then(({ status }: any) => {
    if (!status) {
      message.warning('校验没通过！')
    }
  })
}
function open(data: any) {
  console.log('data', data)

  const index = expandedRowKeys.value.findIndex((val) => val === data.key)
  if (index >= 0) {
    expandedRowKeys.value.splice(index, 1)
  } else {
    expandedRowKeys.value.push(data.key)
  }
}

const $config = ref({
  order: 5,
  title: '嵌套表格（STable）',
  context: '表格嵌套表格时候,嵌套table时候',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
