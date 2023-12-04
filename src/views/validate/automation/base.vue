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

const A = valid('a')
const S = valid('S')
const R = valid('R')
const W = valid('W')
const Y = valid('Y')
const P = valid('P')
const all = valid()

const formRef = ref()
const form = reactive(
  defineForm(() => {
    return [
      {},
      [
        {
          label: 'A',
          key: 'A',
          type: 'textarea',
          formItemAttr: { extra: '如: 10.10.10.10' },
        },
        {
          label: 'S',
          key: 'S',
          type: 'textarea',
          formItemAttr: {
            extra: '如: 10.10.10.10/24或者10.10.10.0 255.255.255.0',
          },
        },
        {
          label: 'R',
          key: 'R',
          type: 'textarea',
          formItemAttr: { extra: '如: 1.1.1.1-2.3.4.5' },
        },
        {
          label: 'W',
          key: 'W',
          type: 'textarea',
          formItemAttr: { extra: '如: 0.0.8.0 255.255.0.255' },
        },
        {
          label: 'Y',
          key: 'Y',
          type: 'textarea',
          formItemAttr: { extra: '如: Any' },
        },
        {
          label: 'P',
          key: 'P',
          type: 'textarea',
          formItemAttr: { extra: '如: 1-3/5/7.*/11.22/23' },
        },
        {
          label: 'ASRWPYL',
          key: 'ASRWPYL',
          type: 'textarea',
          formItemAttr: {
            extra: '以上任意个，并支持多个，以回车(/n)空格(/s)逗号(,)分隔',
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
        optionsData: {},
        rules: {
          A: [{ required: false, trigger: 'change', validator: A }],
          S: [{ required: false, trigger: 'change', validator: S }],
          R: [{ required: false, trigger: 'change', validator: R }],
          W: [{ required: false, trigger: 'change', validator: W }],
          P: [{ required: false, trigger: 'change', validator: P }],
          Y: [{ required: false, trigger: 'change', validator: Y }],
          ASRWPYL: [{ required: false, trigger: 'change', validator: all }],
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
  title: '动态生成使用',
  order: 1,
  contextType: 'pre',
  context: ` import { valid } from '@/common/utils/validate'; \n const A = valid('A')生成规则; \n { required: false, trigger: 'change', validator: A }使用规则`,
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
