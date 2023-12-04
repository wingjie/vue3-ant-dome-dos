<template>
  <div>
    {{ table.tableData }}
    <STable v-bind="table">
      <template #header-operation>
        <a-space :size="8">
          操作
          <i-ion-ios-add-circle-outline
            @click="outAdd(table.tableData)"
            style="cursor: pointer; font-size: 16px; color: #108de9"
          />
        </a-space>
      </template>
      <template #operationIn="{ scope: { index } }">
        <a-space
          :size="8"
          style="cursor: pointer; font-size: 16px; color: #108de9"
        >
          <i-ion-ios-add-circle-outline @click="add(table.tableData, index)" />
          <i-ion-remove-circle-outline @click="del(table.tableData, index)" />
        </a-space>
      </template>
    </STable>
  </div>
</template>
<script setup lang="ts">
const table = reactive({
  tableData: [{ name: 'wing', age: '18', like: 'sing', other: 'base' }],
  columns: [
    { title: '姓名', key: 'name' },
    { title: '年龄', key: 'age' },
    { title: '爱好', key: 'like' },
    { title: '其他', key: 'other' },
    {
      title: '操作',
      key: 'operation',
      type: 'slot',
      slotHead: true,
      align: 'center',
    },
  ],
  fieldModel: {
    isForm: true,
    follow: true,
    config: {
      isForm: true,
    },
    columnsConfig: {
      type: 'input',
    },
    tableAttr: {
      pagination: false,
    },
  },
})
const tableItem = { name: '', age: '', like: '', other: '' }
function creakTableItem() {
  return { ...tableItem }
}
function outAdd(arr: { [p: string]: any }[]) {
  arr.push(creakTableItem())
}
function add(arr: { [p: string]: any }[], index: number) {
  arr.splice(index + 1, 0, creakTableItem())
}
function del(arr: { [p: string]: any }[], index: number) {
  arr.splice(index, 1)
}

const $config = ref({
  title: '增加删除操作',
  order: 2,
  context: '利用插槽和表头插槽（slotHead）自定义操作',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
