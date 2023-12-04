<template>
  <div>
    <Layout>
      <template #form>
        <SForm ref="formRef" v-bind="form" :formData="formData" />
      </template>
      <template #handleIn>
        <HandleInButton> 是多少 </HandleInButton>
      </template>
      <template #content>
        <STable v-bind="table"></STable>
      </template>
    </Layout>
    {{ addVisible }}
    <a-modal v-model:visible="addVisible">
      {{ addMsg }}
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { homePage, defineTable, defineForm } from '@/common/utils/autoImport'

const {
  HandleInButton,
  formRef,
  formData, // 表单数据
  tableData, // 表格数据
  selectedRowKeys, // 表格行选择的容器数据类型 Ref(string[])
  pagination, // 分页的数据, 边缘数据
  // upModal, // 上传(导入)的功能集合，// todo：一般写在<Layout :upModal="upModal"> 组件上；需要配置import、 downEx: ['import-firewall-logical-device-template.xlsx', 'venus-fara'],
  modal: [{ msg, open, visible }], // 打开弹框的时候用到的数据，msg是供给组件的参数集，如果有多个弹框的话，可以再解构一个对象，一共能结构出5个
  addModal: { msg: addMsg, visible: addVisible }, // 打开弹框的时候用到的数据，msg是供给组件的参数集，如果有多个弹框的话，可以再解构一个对象，一共能结构出5个
  // exportButton, // 导出与导出所有按钮的集，// todo: 结合<ExportButton v-bind="exportButton"></ExportButton>使用
  del, // del('id') | del()
  tableAttr,
  addRow, // 向数组中添加数据
  delRow, // 删除数组中的数据
  run, // 执行
  disable, // 禁用
  enable, // 开启
} = homePage(() => {
  return {
    // formRef: ref(), // 你可以单独在外声明一个ref变量，在此赋值，
    exports: () => {},
    exportAll: () => {},
    add(data) {
      data.open({ a: 'wing' })
    },
    import: () => {},
    del: () => {}, // 删除配置，跟结构出的del对应，
    run: () => {}, // 执行成功! // todo: 边缘功能 第2个参数为提示语言覆盖
    disable: () => {}, // 禁用成功! // todo: 边缘功能
    enable: () => {}, // 启用成功! // todo: 边缘功能
  }
}, false)

console.log(
  del,
  run,
  disable,
  enable,
  selectedRowKeys,
  pagination,
  msg,
  visible
)

open({ pageType: 'edit', id: '' }) //  执行完之后msg的值就是该对象

addRow(tableData, { id: '1' }) // 将{}添加至tableData的第1条，等同于addRow(tableData, 0， {})
addRow(tableData, 1, { id: '2' }) // 将{}添加至tableData的第2条，
delRow(tableData, 3) // 删除第3行数据

const form = defineForm(() => {
  return [formData, [{ label: 'name', key: 'name', type: 'input' }], {}]
})

const table = defineTable(() => {
  return [
    tableData,
    [
      {
        title: 'wing',
        key: 'wing',
      },
    ],
    {
      tableAttr: {
        ...tableAttr,
      },
    },
  ]
})

const $config = ref({
  title: 'homePages使用',
  order: 1,
  contextType: 'pre',
  context: ``,
})
defineExpose({
  $config,
})
// const d = {
//   options: { start: 250, step: 100, axis: 90 },
//   nodes: [
//     { id: 'FILLING_IN', label: '填写变更单', x: 250, y: 90 },
//     { id: 'SCRIPT_CONFIRMATION', label: '脚本确认', x: 350, y: 90 },
//     { id: 'CHANGE_APPROVAL', label: '变更审批', x: 450, y: 90 },
//     { id: 'CHANGE_OPERATION', label: '变更实施', x: 550, y: 90 },
//     { id: 'STATUS_WRITING_BACK', label: '状态回写', x: 650, y: 90 },
//   ],
//   specialNode: [],
//   specialEdges: [],
// }
</script>
<style scoped lang="scss"></style>
