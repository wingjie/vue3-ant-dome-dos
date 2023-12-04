<template>
  <div class="parse-material">
    <SForm ref="materialFormRef" class="formHeader" v-bind="form" :name="name">
      <template #content="{ data }">
        <template v-if="data.parseMaterialType === 'PYTHON'">
          <PythonModule
            :mode="['NORMAL', 'TEXT_FSM']"
            v-model="data.content"
            :disabled="disabled"
            :name="[...(name ? name : []), 'content']"
          />
        </template>
      </template>
    </SForm>
  </div>
</template>

<script setup lang="ts">
import { engine } from '../MaterialEditor/materialSetup'

interface panesType {
  name: string
  content: string
  closable?: boolean
}
type materialType =
  | {
      parseMaterialType: 'PYTHON'
      timeout: number
      content: {
        type?: any
        entrance?: string | undefined
        fileDefs?: panesType[]
      }
      [p: string]: any
    }
  | { [p: string]: any }

interface formEditorInt {
  modelValue: any | materialType
  disabled?: boolean
  name?: (string | number)[]
  mode?: 1 | 2
}

const $props = withDefaults(defineProps<formEditorInt>(), {
  disabled: false,
  mode: 1,
})
const { disabled, modelValue, name, mode } = toRefs($props)

// 表单formData
// ref
const materialFormRef = ref()
const commonFormData = {
  parseMaterialType: 'PYTHON',
  pythonContent: {
    entrance: 'main.py',
    fileDefs: [{ name: 'main.py', content: '' }],
  },
}
const mateFormData: any = reactive({})
const form: any = $defineForm(() => {
  const list = mode.value === 2 ? [engine.field] : []
  return [
    mateFormData,
    [
      {
        label: '类型',
        key: 'parseMaterialType',
        type: 'radio-group',
        span: 12,
        config: {
          options() {
            return [{ label: 'PYTHON', value: 'PYTHON' }]
          },
          change({ value, record }: any) {
            switch (value) {
              case 'PYTHON':
                record.content = $cloneDeep(commonFormData.pythonContent)
                break
              default:
                record.content = $cloneDeep(commonFormData.pythonContent)
            }
            record.engineType = null
          },
        },
      },
      ...list,
      {
        label: '超时时间(毫秒)',
        key: 'timeout',
        type: 'input-number',
        config: { min: 0 },
        disabled: disabled.value,
        span: 12,
        rules: [
          { required: true, trigger: 'change', message: '请填写超时时间' },
        ],
      },
      {
        span: 24,
        key: 'content',
        type: 'slotOut',
      },
    ],
    {
      disabled: disabled.value,
      span: 24,
      formItemAttr: {
        labelCol: {
          span: undefined,
          style: {
            width: '150px',
          },
        },
        wrapperCol: { span: 20 },
      },
      rules: {
        parseMaterialType: [
          { required: true, trigger: 'change', message: '请选择类型' },
        ],
        engineType: [
          { required: false, trigger: 'change', message: '请选择类型' },
        ],
      },
    },
  ]
})

const $emit = defineEmits(['update:modelValue'])
if (modelValue?.value) {
  watch(
    () => modelValue.value,
    (val: any) => {
      if (val) {
        if (val && typeof val === 'string') {
          setFormData(val)
        } else {
          setFormData(val)
        }
      }
    },
    { immediate: true, deep: true }
  )
  watch(
    mateFormData,
    () => {
      $emit('update:modelValue', mateFormData)
    },
    {
      deep: true,
      immediate: true,
    }
  )
}
function setFormData(target: any) {
  Object.keys(target).forEach((key: any) => {
    mateFormData[key] =
      target[key] === undefined ? mateFormData[key] : target[key]
  })
}
onMounted(() => {
  form.formModel.rules.engineType[0].required = mode.value === 2
})
const validate = () => materialFormRef.value.formRef.validate()
defineExpose({
  validate,
})
</script>

<style scoped lang="scss"></style>
