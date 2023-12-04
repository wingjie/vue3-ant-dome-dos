<template>
  <div>
    <SForm v-bind="httpFormConf" ref="formRef" :name="name">
      <template #queryParams="{ data }">
        <div style="margin: 0 25px">
          QueryParams:
          <params-table
            v-model="data.queryParams"
            :name="[...(name ? name : []), 'queryParams']"
            :disabled="disabled"
          />
        </div>
      </template>
      <template #Headers="{ data }">
        <div style="margin: 10px 25px">
          Headers:
          <params-table
            v-model="data.headers"
            :disabled="disabled"
            :name="[...(name ? name : []), 'headers']"
          />
        </div>
      </template>
      <template #bodyIn="{ data }">
        <code-editor
          style="height: 300px"
          class="code-editor"
          v-model="data.body"
          :disabled="disabled"
          @change="bodyChange"
        />
      </template>
    </SForm>
  </div>
</template>

<script setup lang="ts">
import { defineForm } from '@/common/utils/define'
import ParamsTable from './ParamsTable.vue'
import { httpMethodDict } from '../../hook/index'

interface httpInputInt {
  modelValue: { [p: string]: any }
  disabled?: boolean
  name?: (string | number)[]
  formModel?: any
}

const $props = withDefaults(defineProps<httpInputInt>(), {
  modelValue: () => ({}),
  disabled: false,
})

const { modelValue, disabled, formModel } = toRefs($props)

// modelValue.value.queryParams = queryParamsObj

// const $emit = defineEmits(['update:modelValue'])

const formRef: any = ref()
const httpFormConf = defineForm(() => {
  return [
    modelValue,
    [
      {
        label: 'Method',
        key: 'method',
        type: 'select',
        config: { options: httpMethodDict },
      },
      {
        label: 'url',
        key: 'urlPath',
        type: 'input',
        // config: { 'addon-before': 'http://' },
      },
      { label: 'QueryParams', key: 'queryParams', type: 'slotOut' },
      { label: 'Headers', key: 'Headers', type: 'slotOut' },
      { label: 'Body', key: 'body', type: 'slot' },
    ],
    {
      ...formModel.value,
      disabled: disabled.value,
      rules: {
        urlPath: [{ required: true, trigger: 'change', message: '不能为空' }],
        method: [{ required: true, trigger: 'change', message: '不能为空' }],
      },
      span: 24,
    },
  ]
})

// setTimeout(() => {
//   queryParamsObj.value = { wing: 'wing', '12': '23' }
// }, 1000)

// function formChange() {
//   $emit('update:modelValue', httpFormConf.formData)
// }
function bodyChange() {}
function validate() {
  return formRef.value.formRef.validate()
}
defineExpose({
  validate,
})
</script>

<style scoped lang="scss">
.code-editor {
  display: block !important;
  width: 100%;
}
</style>
