<template>
  <div>
    <SForm
      :name="name"
      :formData="data"
      :field-list="fieldList"
      :form-model="{
        formItemAttr: {
          labelCol: {
            span: undefined,
            style: {
              width: '150px',
            },
          },
          wrapperCol: { span: 20 },
        },
        ...formModal,
      }"
    >
      <template #contentIn="{ data }">
        <div style="height: 200px; width: calc(100%)">
          <CodeEditor v-model="data.content" :disabled="disabled"></CodeEditor>
        </div>
      </template>
    </SForm>
  </div>
</template>
<script setup lang="ts">
// import { message } from 'ant-design-vue'

interface panesType {
  name: string
  content: string
  key?: number
  closable?: boolean
}

interface propMsg {
  modelValue?: panesType
  disabled?: boolean
  name?: (string | number)[]
  formModal?: { [p: string]: any }
}
const $emit = defineEmits(['update:modelValue', 'change'])
const props = withDefaults(defineProps<propMsg>(), { formModal: () => ({}) })
const { modelValue, disabled, name } = toRefs(props)

const data = ref<panesType>({
  name: '',
  content: '',
})
const fieldList = reactive([
  {
    label: '文件名',
    key: 'name',
    type: 'input',
    disabled: disabled.value,
    span: 24,
    rules: [
      {
        required: true,
        trigger: 'blur',
        message: '不能为空',
      },
    ],
  },
  {
    label: '内容',
    key: 'content',
    type: 'slot',
    span: 24,
    rules: [
      {
        required: true,
        trigger: 'blur',
        message: '不能为空',
      },
    ],
  },
])
watch(
  () => modelValue?.value,
  (val) => {
    if (val) {
      data.value = val
    }
  },
  { immediate: true }
)
watch(
  () => data.value,
  (val) => {
    $emit('update:modelValue', val)
    $emit('change', val)
  },
  {
    deep: true,
    immediate: true,
  }
)
// watch(
//   () => data.value.template,
//   (val) => {
//     const index = val?.findIndex?.(
//       (item) => item.name === data.value.entrance
//     )
//     if (index === -1) {
//       data.value.entrance = undefined
//     }
//   },
//   { deep: true }
// )
</script>
<style scoped lang="scss">
:deep(.ant-tabs-tab-remove) {
  margin-left: auto;
  padding-right: 0;
}
.green {
  color: green;
}
label {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
</style>
