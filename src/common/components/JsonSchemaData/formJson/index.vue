<template>
  <div style="padding: 10px 10px 0; width: 100%">
    <a-form-item
      :name="name"
      :rules="[{ required, message: '必填' }, ...rulesFn()]"
      :class="{ disabled: formData === null }"
    >
      <FormItemJsonValue
        :formData="formData"
        :jsonSchema="jsonSchema"
        :config="config"
        :name="name"
        @changeData="changeFn"
        :disabled="disabled"
      >
      </FormItemJsonValue>
    </a-form-item>
  </div>
</template>
<script setup lang="ts">
import FormItemJsonValue from './formItem.vue'

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
const { jsonSchema, name, formData, disabled } = toRefs(props)
// const formData = useVModel(props, 'modelValue', emit)
const required = computed(
  () => !!(jsonSchema.value.isRequired && formData.value !== null)
)
function rulesFn() {
  return [
    // {
    //   required: false,
    //   message: '必填',
    // },
  ]
}
function changeFn(val: any) {
  emit('changeData', val)
}
</script>

<style scoped lang="scss">
.disabled {
  :deep(div[class*='form-item-explain-error']) {
    display: none;
  }
}
</style>
