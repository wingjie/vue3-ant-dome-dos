<template>
  <div>
    {{ tableData.tableData }}
    <STable v-bind="tableData">
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
const tableData = reactive({
  tableData: [
    { name: 'wing', age: '18', like: undefined },
    { name: 'ring', age: '19', like: 'sing' },
  ],
  columns: [
    { title: '名称', key: 'name', type: 'input' },
    { title: '年龄', key: 'age', type: 'input' },
    { title: '爱好', key: 'like', type: 'select' },
    { title: '操作', key: 'operation', type: 'slot', align: 'center' },
  ],
  fieldModel: {
    isForm: false,
    follow: false,
    config: {
      isForm: true,
    },
    optionsData: {
      like: [
        { label: '唱歌', value: 'sing' },
        { label: '跳舞', value: 'dance' },
      ],
    },
    tableAttr: {
      pagination: false,
    },
  },
})
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
  way.confirm()
}

const $config = ref({
  title: '行修改、编辑、保存',
  order: 3,
  context: '行内编辑的功能。使用插槽slot,way中的操作方法。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
