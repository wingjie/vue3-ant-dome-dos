<template>
  <div>
    <STable v-bind="{ fieldModel, columns, tableData }">
      <template #header-great="data">
        <SMultiLine v-bind="data" :header="true" />
      </template>
      <template #great="data">
        <SMultiLine v-bind="data" :defaultOnOff="true" />
      </template>
    </STable>
  </div>
</template>
<script setup lang="ts">
import { defineColumnsList } from '@/common/utils/define/table'

const fieldModel = reactive({
  tableAttr: {
    pagination: false,
  },
})
const columns = reactive(
  defineColumnsList(() => {
    return [
      { title: '工单1', key: 'order22', dataIndex: 'order' },
      { title: '工单2', key: 'order23', dataIndex: 'order' },
      {
        title: '级别',
        key: 'great',
        type: 'slot', // 插槽
        slotHead: true, // 自定义表头
        configData: 'content', // 配置数据的key
        // minWidth: 200, // 总共拆分列的长度
        // width: null, // 总共拆分列的长度
        content: {
          borderColor: 'red', // 下划线颜色
          before: [
            { width: 200, title: '类型', key: 'type', dataIndex: 'type' },
          ],
          configData: 'msg',
          msg: {
            // 如果此处需要继续拆分
            borderColor: 'pink', // 下划线颜色
            before: [
              {
                width: 200,
                title: '姓名',
                key: 'name',
                dataIndex: 'name',
                checked: false,
              },
              { width: 200, title: '年龄', key: 'age', dataIndex: 'age' },
            ],
          },
          after: [{ width: 200, title: '日期', key: 'time' }],
        },
      },
      { title: '工单1', key: 'order1', dataIndex: 'order', checked: false },
      { title: '工单', key: 'order2', dataIndex: 'order' },
      { title: '工单', key: 'order3', dataIndex: 'order' },
      { title: '工单', key: 'order4', dataIndex: 'order' },

      { title: '操作', key: 'handle', type: 'slot', showConfig: true },
    ]
  })
)
const tableData = reactive([
  {
    order: '23232323-23',
    content: [
      {
        type: 'A',
        time: '2022/23/23',
        msg: [
          { name: 'wing', age: '17' },
          { name: 'ring', age: '18' },
        ],
      },
      {
        type: 'B',
        time: '2022/23/21',
        msg: [{ name: 'name', age: 'age' }],
      },
    ],
  },
  {
    order: '23232323-21',
    content: [
      {
        type: 'C',
        time: '2022/23/22',
        msg: [{ name: 'wing', age: '17' }],
      },
    ],
  },
])
const $config = reactive({
  title: '基本使用',
  context:
    '通过配置columns可以无限的拆分;configData是自定义拆分的key，如示例中msg字段（key）',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
