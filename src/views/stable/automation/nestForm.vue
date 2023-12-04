<template>
  <div>
    <STable
      v-model:expandedRowKeys="expandedRowKeys"
      ref="tableRef"
      v-bind="table"
    >
      <template #expandedRowRender="{ record, actionData: { propName } }">
        <template v-for="(item, index) in record.like" :key="item.key">
          <SForm
            v-bind="nestForm"
            :name="[...propName, 'like', index]"
            :formData="item"
          />
        </template>
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
const expandedRowKeys = reactive<string[]>([])
nextTick(() => {
  table.tableData.forEach((item) => {
    expandedRowKeys.push(item.key)
  })
})
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
      expandIcon: () => '',
      defaultExpandAllRows: true,
      rowKey: 'key', // 必须要有的
      pagination: false,
    },
    config: {
      isForm: true,
    },
  },
})
const nestForm = reactive({
  // tableData: [],
  fieldList: [
    { label: '日期', key: 'date', type: 'input' },
    { label: '唱歌', key: 'sing', type: 'input' },
    { label: '写字', key: 'writing', type: 'input' },
  ],
  formModel: {
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
  const index = expandedRowKeys.findIndex((val) => val === data.key)
  if (index >= 0) {
    expandedRowKeys.splice(index, 1)
  } else {
    expandedRowKeys.push(data.key)
  }
}

const $config = ref({
  order: 6,
  title: '嵌套表单（SForm）',
  context: '表格嵌套表单时候,嵌套SForm时候',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
