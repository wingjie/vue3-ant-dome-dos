<template>
  <SForm v-bind="templateForm" :name="name"> </SForm>
</template>

<script lang="ts" setup>
import { getConfigMaterialTemplates, getParseMaterialTemplates } from './api'

interface templateInt {
  modelValue?: any
  disabled?: boolean
  name?: (string | number)[]
}
const $emit = defineEmits(['update:modelValue'])
const $props = withDefaults(defineProps<templateInt>(), {
  disabled: false,
})
const { modelValue, disabled, name } = toRefs($props)

const configOption = ref([])
const parseOption = ref([])

const formData = ref({
  configMaterialTemplateId: undefined,
  parseMaterialTemplateId: undefined,
})
const templateForm = $defineForm(() => [
  formData,
  [
    {
      label: '配置模版',
      key: 'configMaterialTemplateId',
      type: 'select',
      options: configOption,
    },
    {
      label: '解析模版',
      key: 'parseMaterialTemplateId',
      type: 'select',
      options: parseOption,
    },
  ],
  {
    span: 24,
    disabled: () => disabled.value,
    formItemAttr: {
      labelCol: { span: 0, style: { width: '120px' } },
      wrapperCol: { span: 18 },
    },
    rules: {
      configMaterialTemplateId: [
        { required: true, trigger: 'change', message: '请选择' },
      ],
    },
    config: {
      change() {
        $emit('update:modelValue', formData.value)
      },
    },
  },
])

watch(
  $props,
  () => {
    nextTick(() => setFormData())
  },
  {
    immediate: true,
  }
)

function setFormData() {
  if (modelValue?.value) {
    formData.value = modelValue.value
  }
}
function getModuleList() {
  getConfigMaterialTemplates('ENABLED').then((res: any) => {
    configOption.value = res.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  })
  getParseMaterialTemplates('ENABLED').then((res: any) => {
    parseOption.value = res.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  })
}
onMounted(() => {
  getModuleList()
})
</script>

<style scoped lang="scss"></style>
