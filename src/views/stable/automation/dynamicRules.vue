<template>
  <div>
    {{ tableData.tableData }}
    <STable ref="tableRef" v-bind="tableData">
      <template #operationIn="data">
        <!-- {{ data }} -->
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
const tableData = reactive({
  tableData: [
    { name: 'wing', isAge: false, like: undefined },
    { name: 'ring', isAge: true, like: 'sing' },
  ],
  columns: [
    { title: '名称', key: 'name', type: 'input' },
    {
      title: '是否成年',
      key: 'isAge',
      type: 'switch',
      config: {
        change(data: any) {
          tableRef.value.validateRow(data.record)
        },
      },
    },
    { title: '爱好', key: 'like', type: 'select' },
    { title: '操作', key: 'operation', type: 'slot', align: 'center' },
  ],
  fieldModel: {
    isForm: false,
    config: {
      isForm: true,
    },
    optionsData: {
      isAge: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
      like: [
        { label: '唱歌', value: 'sing' },
        { label: '跳舞', value: 'dance' },
      ],
    },
    rules: {
      like: [
        {
          // ! 核心代码
          async validator(rule: any, value: string) {
            const data = tableRef.value.resRules(rule, value)
            if (data.record.isAge && !value) {
              return Promise.reject(new Error('成年后爱好必填！'))
            }
            return Promise.resolve(true)
          },
          trigger: 'change',
        },
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
  way.validateRow().then((res: any) => {
    if (res.status) {
      way.confirm()
    }
  })
}

const $config = ref({
  title: '动态校验',
  order: 8,
  context:
    '动态校验，可以通过validator方法进行动态设置，原生的这个方法没有当前行的信息，这里可以借助STable中封装的resRules方法，解析出当前行的信息。拿到当前行的信息后则可以动态设置了。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
