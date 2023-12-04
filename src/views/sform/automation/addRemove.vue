<template>
  <div>
    <SForm v-bind="form">
      <template #likeIn="data">
        <a-form-item-rest>
          <SForm
            :name="['like']"
            v-for="(item, index) in data.data.like"
            :key="index"
            v-bind="formIn"
            :formData="item"
          >
            <template #operationIn>
              <a-space
                :size="8"
                style="cursor: pointer; font-size: 16px; color: #108de9"
              >
                <i-ion-ios-add-circle-outline
                  @click="add(data.data.like, index)"
                />
                <i-ion-remove-circle-outline
                  v-if="data.data.like.length > 1"
                  @click="del(data.data.like, index)"
                />
              </a-space>
            </template>
          </SForm>
        </a-form-item-rest>
      </template>
    </SForm>
  </div>
</template>
<script setup lang="ts">
const form = reactive({
  formData: { name: 'wing', age: '18', like: [{}] },
  fieldList: [
    { label: '姓名', key: 'name', type: 'input' },
    { label: '年纪', key: 'ages', type: 'select' },
    {
      label: '爱好',
      key: 'like',
      type: 'slot',
      span: 24,
      formItemAttr: {
        wrapperCol: { span: 24 },
      },
    },
  ],
  formModel: {
    isForm: true,
    span: 10,
    formItemAttr: {
      'label-col': { style: { width: '150px' } }, // ! 写style样式的时候记得用—分隔的形式书写
      wrapperCol: { span: 14 },
    },
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
const formIn = reactive({
  fieldList: [
    {
      label: '',
      key: 'time',
      config: { placeholder: '请输入日期' },
      type: 'input',
      span: 6,
    },
    {
      label: '',
      key: 'sing',
      config: { placeholder: '请输入歌曲' },
      type: 'select',
      span: 6,
    },
    {
      label: '',
      key: 'dance',
      config: { placeholder: '请输入舞曲' },
      type: 'select',
      span: 6,
    },
    {
      label: '',
      key: 'operation',
      type: 'slot',
      align: 'center',
      span: 6,
    },
  ],
  formModel: {
    span: 8,
    formItemAttr: {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    },
  },
})
const tableItem = { sing: undefined, dance: undefined }
function creakTableItem() {
  return { ...tableItem }
}
function add(arr: { [p: string]: any }[], index: number) {
  arr.splice(index + 1, 0, creakTableItem())
}
function del(arr: { [p: string]: any }[], index: number) {
  arr.splice(index, 1)
}

const $config = ref({
  title: '增加删除操作',
  order: 5,
  context:
    "这里label对齐,则需将'label-col'使用style的写法，值得注意的是需要写成'label-col':{}, 而不是labeCol:{}",
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
