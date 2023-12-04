<template>
  <div>
    <SForm
      :form-model="
        assign({}, form.formModel, setup?.configData?.formModel ?? {})
      "
      :field-list="
        assign({}, form.fieldList, setup?.configData?.fieldList ?? [])
      "
      v-model:formData="formData"
      :name="setup?.configData?.name ? setup?.configData?.name : []"
    >
      <template #contentIn>
        <div style="width: 100%">
          <CodeEditor
            style="min-height: 100px"
            v-model="formData.content"
            :disabled="disabled"
          ></CodeEditor>
        </div>
      </template>
      <template v-for="(value, name) of $slots" #[fn(name)]="slotData">
        <slot :name="name" v-bind="{ ...slotData }"> </slot>
      </template>
    </SForm>
  </div>
</template>
<script setup lang="ts">
import { assign } from '@/common/componentsFn/assign'

interface propMsg {
  setup?: any
  modelValue: { [p: string]: any }
  prefix?: string
}
const $slots = useSlots()
function fn(nameStr: string | number) {
  return nameStr.toString().replace(`${prefix.value}_`, '')
}

const $emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<propMsg>(), {
  prefix: '',
})
const { prefix, setup } = toRefs(props)

const formData = useVModel(props, 'modelValue', $emit)
const disabled = inject('isReadonly', ref(false))

const form = $defineForm(() => {
  return [
    formData,
    [
      {
        label: '类型',
        key: 'type',
        type: 'select',
        options: [
          { label: 'NO', value: 'NO' },
          { label: '表达式', value: 'ex' },
        ],
        config: {
          change({ value }: any) {
            if (value !== 'ex') {
              formData.value.content = undefined
            }
          },
        },
      },
      {
        label: '内容',
        key: 'content',
        type: 'slot',
        checked: computed(() => formData?.value?.type === 'ex'),
      },
    ],
    {
      span: 24,
      disabled,
      rules: {
        type: [{ required: true, message: '请输入' }],
        content: [{ required: true, message: '请输入' }],
      },
    },
  ]
})
</script>
<style scoped lang="scss"></style>
