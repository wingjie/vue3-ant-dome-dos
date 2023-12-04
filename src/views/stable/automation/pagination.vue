<template>
  <div>
    <STable v-bind="table"></STable>
    选中信息：{{ selectRowKeys }}<br />
    分页信息：{{ pagination }}
  </div>
</template>
<script setup lang="ts">
import { getUUID } from '@/common/utils/traverseTree'

const selectRowKeys = ref<string[]>([])
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
})
const table = reactive({
  tableData: [{ one: 1, two: 2 }],
  columns: [
    {
      title: '序号',
      key: 'order',
      dataIndex: 'order',
      customRender: (text: any) => `${text.index + 1}`,
    },
    {
      title: '编号一',
      key: 'one',
      dataIndex: 'one',
    },
    {
      title: '编号二',
      key: 'two',
      dataIndex: 'two',
    },
  ],
  fieldModel: {
    tableAttr: {
      rowKey: 'two', // 必须要有的
      pagination,
      onChange(msg?: any) {
        if (msg.current) {
          pagination.current = msg.current
          pagination.pageSize = msg.pageSize
          // pagination.total = 1000 // 后端做分页的时候用到此属性
        }
      },
      rowSelection: {
        checkStrictly: false,
        onChange: (
          _sRowKeys: (string | number)[],
          sRows: { [p: string]: any }[]
        ) => {
          // console.log(`selectedRowKeys: ${_sRowKeys}`, 'selectedRows: ', sRows)
          selectRowKeys.value = sRows.map((item) => item.two)
        },
        // onSelect: (record: { [p: string]: any }, selected: boolean, selectedRows: { [p: string]: any }[]) => {
        //   console.log(record, selected, selectedRows, 56)
        // },
        // onSelectAll: ( selected: boolean, sRows: { [p: string]: any }[], cRows: { [p: string]: any }[]) => {
        //   console.log(selected, sRows, cRows)
        // },
      },
    },
  },
})
let i = 100
while (i < 200) {
  table.tableData.push({ one: i, two: getUUID() })
  i += 1
}

const $config = ref({
  title: '分页使用',
  order: 2,
  context:
    '通过pagination属性将声明好的分页信息（响应式变量）传给组件，再通过chang时间改变预设的响应式变量，从而完成分页的功能。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
