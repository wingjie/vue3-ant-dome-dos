<template>
  <div>
    <SForm ref="formRef" v-bind="form">
      <template #operationIn>
        <a-button type="primary" @click="submit">提交</a-button>
      </template>
    </SForm>
    <br />
    {{ form.formData }}
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { defineForm } from '@/common/utils/define/form'
import { valid } from '@/common/utils/validate'

const formRef = ref()
const Dong = ref([])
const dongV = computed(() => valid(Dong.value.join('') || undefined))
const obj = { required: false, trigger: 'change', validator: dongV.value }
watch(
  () => dongV.value,
  (val) => {
    obj.validator = val
    nextTick(() => {
      formRef.value.validate(['value'])
    })
  }
)
const form = reactive(
  defineForm(() => {
    return [
      {
        type: Dong,
        value: '',
      },
      [
        {
          label: '动态类型',
          key: 'type',
          type: 'select',
          config: {
            mode: 'multiple',
          },
          formItemAttr: { extra: "只能填包含在'ASRWYPL'中的字符" },
        },
        {
          label: '动态',
          key: 'value',
          type: 'textarea',
          formItemAttr: {
            extra: computed(
              () => `本条检验规则是' ${Dong.value.join('')} '中的字符`
            ) as any,
          },
        },
        { label: ' ', key: 'operation', type: 'slot' },
      ],
      {
        // isForm: false,
        span: 24,
        config: {
          isForm: true,
        },
        optionsData: {
          type: [
            { label: 'A', value: 'A' },
            { label: 'S', value: 'S' },
            { label: 'R', value: 'R' },
            { label: 'W', value: 'W' },
            { label: 'Y', value: 'Y' },
            { label: 'P', value: 'P' },
            { label: 'L', value: 'L' },
          ],
        },
        rules: {
          value: [obj],
        },
      },
    ]
  })
)

function submit() {
  formRef.value.validate().then(({ status }: any) => {
    if (!status) {
      return message.warning('请填写符合规则')
    }
    message.success('提交成功')
  })
}

const $config = ref({
  title: '动态生成，动态使用',
  order: 2,
  context:
    '本示例并非是想当做模版使用，是为了理解这种可自由拼接、拆卸的模式。所以仅做参考。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
