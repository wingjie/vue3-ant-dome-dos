<template>
  <div>
    <STable ref="tableRef" v-bind="{ fieldModel, columns, tableData }">
      <template #header-great="data">
        <SMultiLine v-bind="data" :header="true" />
      </template>
      <template #great="data">
        <SMultiLine v-bind="data" :defaultOnOff="true" />
      </template>
      <template #operationIn="data">
        <a-space>
          <a-button v-if="!data.isEdit" type="primary" @click="editRow(data)"
            >编辑</a-button
          >
          <template v-else>
            <a-button @click="cancelRow(data)">取消</a-button>
            <a-button type="primary" @click="confirmRow(data)">保存</a-button>
          </template>
        </a-space>
      </template>
    </STable>
  </div>
</template>
<script setup lang="ts">
const tableRef = ref()
const fieldModel = reactive({
  isForm: false,
  config: {
    isForm: true,
  },
  follow: false,
  tableAttr: {
    rowKey: 'key',
    pagination: false,
  },
  rules: {
    type: [{ required: true, trigger: 'change', message: '不能为空' }],
  },
})
const columns = reactive([
  {
    title: '工单',
    key: 'order',
    dataIndex: 'order',
    width: 100,
    type: 'input',
    rules: [{ required: true, trigger: 'change', message: '不能为空' }],
  },
  {
    title: '级别',
    key: 'great',
    type: 'slotOut', // ?!这里需要用slotOut，因为要舍弃自带的formItem
    slotHead: true, // 自定义表头
    configData: 'content', // 配置数据的key
    width: 250, // 总共拆分列的长度
    content: {
      borderColor: 'red', // 下划线颜色
      before: [
        {
          width: 50,
          title: '类型',
          key: 'type',
          type: 'input',
          isForm: true,
        },
      ],
      configData: 'msg',
      msg: {
        width: 150,
        // 如果此处需要继续拆分
        borderColor: 'pink', // 下划线颜色
        before: [
          {
            width: 100,
            title: '姓名',
            key: 'name',
            type: 'input',
            isForm: true,
            formItemAttr: {
              rules: [
                { required: true, trigger: 'change', message: '不能为空' },
              ],
            },
          },
          {
            width: 50,
            title: '年龄',
            key: 'age',
            type: 'select',
            isForm: true,
          },
        ],
      },
      after: [{ width: 50, title: '日期', key: 'time' }],
    },
  },
  {
    title: '操作',
    key: 'operation',
    type: 'slot',
    align: 'center',
  },
])
const tableData = reactive([
  {
    order: '23232323-23',
    content: [
      {
        type: '',
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
function editRow(data: any) {
  const { way } = data
  way.update()
}
function cancelRow(data: any) {
  const { way } = data
  way.cancel()
}
function confirmRow(data: any) {
  const { way } = data
  way.validateRow().then((res: any) => {
    if (res.status) {
      way.confirm()
    }
  })
}
// function confirmAll() {
//   tableRef.value.validate().then(({ status }: { status: boolean }) => {
//     if (status) {
//       tableRef.value.confirmAll()
//       isEdit.value = false
//     }
//   })
// }

const $config = reactive({
  title: '修改单行的form表单',
  context:
    '通过配置columns可以无限的拆分;configData是自定义拆分的key，如示例中msg字段（key）',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
