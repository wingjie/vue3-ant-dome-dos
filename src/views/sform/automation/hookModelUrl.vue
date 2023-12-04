<template>
  <div>
    <SForm v-bind="form" ref="formRef">
      <template #argIn>
        <STable v-bind="table" :name="['arg']">
          <template #header-operation>
            <a-space :size="8">
              操作
              <i-ion-ios-add-circle-outline
                @click="add"
                style="cursor: pointer; font-size: 16px; color: #108de9"
              />
            </a-space>
          </template>
          <template #operationIn="data">
            <a-button @click="add">+</a-button>
            <a-button @click="cutDown(data)">-</a-button>
          </template>
        </STable>
      </template>
      <template #validateIn>
        <a-button type="primary" @click="validateFn"> 校验 </a-button>
      </template>
    </SForm>
    <div style="text-align: center">
      <p>url: {{ url }}</p>
      <p>obj: {{ form.formData.arg }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import map from '@/common/hook/urlMapQuery'

const [url, obj]: any = map()
const formRef = ref()
const form = reactive({
  formData: {
    url,
    arg: obj,
  },
  fieldList: [
    { label: 'url', key: 'url', type: 'input' },
    { label: '参数', key: 'arg', type: 'slot' },
    { label: ' ', key: 'validate', type: 'slot' },
  ],
  formModel: {
    span: 24,
    rules: {
      url: [{ required: true, trigger: 'change', message: '不能为空' }],
    },
  },
})
const table = reactive({
  tableData: obj,
  columns: [
    { title: 'key', key: 'key', type: 'input' },
    { title: 'value', key: 'value', type: 'input' },
    {
      title: '操作',
      key: 'operation',
      type: 'slot',
      align: 'center',
      slotHead: true,
    },
  ],
  fieldModel: {
    isForm: true,
    follow: true,
    rules: {
      key: [{ required: true, trigger: 'change', message: '不能为空' }],
      value: [{ required: true, trigger: 'change', message: '不能为空' }],
    },
    tableAttr: {
      pagination: false,
    },
    config: {
      isForm: true,
    },
  },
})
function validateFn() {
  console.log('formRef', formRef.value.validate())
  formRef.value.validate().then((res: any) => {
    console.log('formRef res validate', res)
  })
}
function add() {
  console.log('table', obj.value)
  obj.value.push({ key: '', value: '' })
}
function cutDown(data: any) {
  console.log('data', data)
  obj.value.splice(data.scope.index, 1)
}
const $config = ref({
  title: 'SForm嵌套STable、（hook:urlMapQuery）query参数双向绑定',
  order: 3,
  context:
    '使用这种嵌套是应对多层级数据结构form表单嵌套table表格的场景，可以进行一次性校验。需要使用属性name表述清楚数据结构。hook的用法(url路径的query参数和路径和表单对像的双向绑定)。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
