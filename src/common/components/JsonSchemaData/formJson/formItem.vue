<template>
  <div style="width: 100%; display: flex">
    <a-input
      v-if="
        (jsonSchema.type === 'string' || jsonSchema.type.includes('string')) &&
        typeof formData === 'string'
      "
      :disabled="formData === null || disabled"
      :value="formData"
      @change="($event: any) => changeFn($event.target.value)"
    />
    <a-input-number
      style="width: 100%"
      v-if="
        (jsonSchema.type === 'number' || jsonSchema.type.includes('number')) &&
        (typeof formData === 'number' || formData === null)
      "
      :value="formData"
      :disabled="disabled"
      @change="($event: any) => changeFn($event)"
    />
    <a-switch
      style="margin: auto"
      v-if="
        (jsonSchema.type === 'boolean' ||
          jsonSchema.type.includes('boolean')) &&
        (formData !== null || typeof formData === 'boolean')
      "
      :disabled="formData === null || disabled"
      :checked="formData"
      checked-children="true"
      un-checked-children="false"
      @change="($event: any) => changeFn($event)"
    />
  </div>
</template>
<script setup lang="ts">
import { Form } from 'ant-design-vue'

const formItemContext = Form.useInjectFormItemContext()

const { onFieldChange } = formItemContext
interface propMsg {
  formData: any
  jsonSchema: {
    [p: string]: any
  }
  config?: {
    column: { title: string; span: number }[]
  }
  name: (string | number)[]
  disabled?: boolean
}
const emit = defineEmits(['update:modelValue', 'changeData'])
const props = withDefaults(defineProps<propMsg>(), { disabled: false })
const { jsonSchema, formData, disabled } = toRefs(props)
console.log('formData', formData)

// const formData = useVModel(props, 'modelValue', emit)
function changeFn(val: any) {
  emit('changeData', val)
  nextTick(() => {
    onFieldChange()
  })
}
</script>

<style scoped lang="scss">
.disabled {
  :deep(div[class*='form-item-explain-error']) {
    display: none;
  }
}
</style>
