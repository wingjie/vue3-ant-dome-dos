<template>
  <div>
    <SForm ref="formRef" v-bind="form">
      <template #operationIn>
        <a-space>
          <a-button type="primary" @click="submit">提交</a-button>
          <a-button type="primary" @click="reset">重置</a-button>
        </a-space>
      </template>
    </SForm>
    <br />
    {{ form.formData }}
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'

interface formInfo {
  isMan?: boolean | undefined
  firstOrder?: string | undefined
  secondOrder?: string | undefined
  thirdOrder?: string | undefined
  fourthOrder?: string | undefined
}

// 排序列表
const manList = ref([
  { value: 'score', label: '成绩' },
  { value: 'age', label: '年龄' },
  { value: 'height', label: '身高' },
  { value: 'weight', label: '体重' },
])
const unManList = ref([
  { value: 'score', label: '成绩' },
  { value: 'age', label: '年龄' },
])

const formRef = ref()
const formData = reactive({
  isMan: false,
  firstOrder: undefined,
  secondOrder: undefined,
  thirdOrder: undefined,
  fourthOrder: undefined,
})
// 排序是否显示
const options = computed(() =>
  formData.isMan ? manList.value : unManList.value
)

const isFormThirdFourth = computed(() => formData.isMan)
const form = reactive({
  formData,
  fieldList: [
    {
      label: '是否男孩',
      key: 'isMan',
      type: 'switch',
      config: {
        change: () => {
          Object.assign(formData, {
            firstOrder: undefined,
            secondOrder: undefined,
            thirdOrder: undefined,
            fourthOrder: undefined,
          })
          formRef.value?.clearValidate()
        },
      },
    },
    {
      label: '第一排序',
      key: 'firstOrder',
      type: 'select',
      config: {
        config: {
          disabled: (
            {
              item,
            }: { item: { label?: string; value?: any; [p: string]: any } },
            { record: R }: { record: formInfo }
          ) => {
            return [R.secondOrder, R.thirdOrder, R.fourthOrder].includes(
              item.value
            )
          },
        },
      },
    },
    {
      label: '第二排序',
      key: 'secondOrder',
      type: 'select',
      config: {
        config: {
          disabled: (
            {
              item,
            }: { item: { label?: string; value?: any; [p: string]: any } },
            { record }: { record: formInfo }
          ) => {
            return [
              record.firstOrder,
              record.thirdOrder,
              record.fourthOrder,
            ].includes(item.value)
          },
        },
      },
    },
    {
      label: '第三排序',
      key: 'thirdOrder',
      isForm: isFormThirdFourth,
      type: 'select',
      config: {
        config: {
          disabled: (
            {
              item,
            }: { item: { label?: string; value?: any; [p: string]: any } },
            { record }: { record: formInfo }
          ) => {
            return [
              record.firstOrder,
              record.secondOrder,
              record.fourthOrder,
            ].includes(item.value)
          },
        },
      },
    },
    {
      label: '第四排序',
      key: 'fourthOrder',
      isForm: isFormThirdFourth,
      type: 'select',
      config: {
        config: {
          disabled: (
            {
              item,
            }: {
              item: {
                label?: string
                value?: any
                [p: string]: any
              }
            },
            { record }: { record: formInfo }
          ) => {
            return [
              record.firstOrder,
              record.secondOrder,
              record.thirdOrder,
            ].includes(item.value)
          },
        },
      },
    },
    {
      key: 'operation',
      label: ' ',
      type: 'slot',
    },
  ],
  formModel: {
    config: {
      isForm: true,
      change() {
        formRef.value.validate()
      },
    },
    optionsData: {
      firstOrder: options,
      secondOrder: options,
      thirdOrder: options,
      fourthOrder: options,
      isMan: [
        { value: true, label: '是' },
        { value: false, label: '否' },
      ],
    },
    rules: {
      firstOrder: [
        {
          required: computed(() => !!formData.secondOrder),
          message: '请选择第一排序',
        },
      ],
      secondOrder: [
        {
          required: computed(() => !!formData.thirdOrder),
          message: '请选择第二排序',
        },
      ],
      thirdOrder: [
        {
          required: computed(() => !!formData.fourthOrder),
          message: '请选择第三排序',
        },
      ],
    },
  },
})
// 重置
const reset = () => {
  formRef.value?.formRef.resetFields()
  formRef.value?.clearValidate()
}
function submit() {
  formRef.value.validate().then(({ status }: any) => {
    if (!status) {
      return message.warning('请填写完整')
    }
    message.success('提交成功')
  })
}

const $config = ref({
  title: '动态options与互斥下拉框',
  order: 6,
  context:
    '动态options需要将option写在fieldList中与type同级,常用计算属性获取数据;\n多个下拉框共用一个options,使用disabled()实现互斥,需要在fieldList的config.config中配置',
  contextType: 'pre',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
