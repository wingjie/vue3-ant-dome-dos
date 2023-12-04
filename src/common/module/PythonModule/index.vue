<template>
  <div>
    <SForm
      class="new-design"
      :name="name"
      :formData="formInfo"
      :field-list="fieldList"
      :form-model="confModal"
    >
      <template #other="{ data }">
        <template v-if="data.type === 'NORMAL'">
          <NormalType
            v-model="data.other"
            :disabled="disabled"
            :name="[...(name ? name : [])]"
            :form-modal="formModal"
          />
        </template>
        <template v-if="data.type === 'JINJA2'">
          <Jinjia2
            v-model="data.other"
            :disabled="disabled"
            :name="[...(name ? name : [])]"
            :form-modal="formModal"
          />
        </template>
        <template v-if="data.type === 'TEXT_FSM'">
          <a-form-item-rest>
            <TextFsm
              v-model="data.other.template"
              :disabled="disabled"
              :name="[...(name ? name : []), 'template']"
              :form-modal="formModal"
            />
          </a-form-item-rest>
        </template>
      </template>
    </SForm>
  </div>
</template>
<script setup lang="ts">
import { pythonProjectTypeDict } from './hook/FieldConfig'

type panesType = {
  name: string
  content: string
  key?: number
  closable?: boolean
}

type NormalType = {
  type: any
  entrance: string | undefined
  fileDefs: panesType[]
}
type JinJiaType = {
  type: any
  baseTemplate: string | undefined
  templates: panesType[]
}

type TextFsmType = {
  type: any
  template: {
    name: string
    content: string
  }
}

interface propMsg {
  modelValue?: JinJiaType | NormalType | TextFsmType
  disabled?: boolean
  name?: (string | number)[]
  formModal?: { [p: string]: any }
  mode?:
    | ('NORMAL' | 'JINJA2' | 'TEXT_FSM')
    | ('NORMAL' | 'JINJA2' | 'TEXT_FSM')[]
}

const $emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<propMsg>(), {
  formModal: () => ({}),
  mode: () => [],
})
const { modelValue, disabled, name, formModal, mode } = toRefs(props)

const fieldList = reactive([
  {
    label: '模式',
    key: 'type',
    type: 'select',
    disabled: disabled.value,
    options: computedAsync(async () => {
      const res = await pythonProjectTypeDict()
      let modeMap: any = mode.value
      if (typeof mode.value === 'string') {
        modeMap = [mode.value]
      }
      if (modeMap.length === 0) return res
      return res.filter((item: any) => modeMap.includes(item.value))
    }),
    span: 24,
    config: {
      change(data: any) {
        data.record.other = {}
        dataOtherChange()
      },
    },
    rules: [{ required: true, trigger: 'blur', message: '请选择' }],
  },
  {
    span: 24,
    label: ' ',
    key: 'other',
    type: 'slotOut',
    checked: computed(() => !!formInfo.type),
  },
])
const confModal = reactive({
  formItemAttr: {
    labelCol: {
      span: undefined,
      style: {
        width: '150px',
      },
    },
    wrapperCol: { span: 20 },
  },
  ...formModal.value,
})
const formInfo: any = reactive({
  type: undefined,
  other: {},
})
watch(
  () => modelValue?.value,
  (val) => {
    if (val) {
      formInfo.type = val.type
      formInfo.other = val
    }
  },
  { immediate: true }
)
function dataOtherChange() {
  $emit('update:modelValue', {
    type: formInfo.type,
    ...formInfo.other,
  })
}
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
