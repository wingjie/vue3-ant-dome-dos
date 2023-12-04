<template>
  <div class="bo">
    <SForm ref="materialFormRef" class="formHeader" v-bind="form" :name="name">
      <template #content="{ data }">
        <template v-if="data.configMaterialType === 'CLI'">
          <SForm
            :fieldList="cmdForm"
            :formData="data.content"
            :form-model="{ ...form.formModel }"
            :name="[...(name ? name : []), 'content']"
          >
            <template #cmdIn="{ data }">
              <code-editor
                class="code-editor"
                v-model="data.cmd"
                :disabled="disabled"
                style="height: 200px; width: 100%"
              />
            </template>
          </SForm>
        </template>
        <template v-else-if="data.configMaterialType === 'HTTP'">
          <http-input
            :name="[...(name ? name : []), 'content']"
            v-model="data.content"
            :disabled="disabled"
            :formModel="{ ...form.formModel }"
            ref="httpInputRef"
          />
        </template>
        <template v-else-if="data.configMaterialType === 'SNMP'">
          <collection-input
            :formModel="{ ...form.formModel }"
            :name="[...(name ? name : []), 'content']"
            v-model="data.content"
            :disabled="disabled"
            ref="snmpRef"
          />
        </template>
        <template v-else-if="data.configMaterialType === 'PYTHON'">
          <PythonModule
            mode="NORMAL"
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
import { defineForm } from '@/common/utils/define'
import LinkageDeviceHook from '@/common/hook/deviceLinkageHook'
import HttpInput from './components/HttpInput/index.vue'
import CollectionInput from './components/CollectionInput.vue'
import { deviceTypeDict, authorityLevelDict, type } from './hook/index'
import { engine } from './materialSetup'

interface panesType {
  name: string
  content: string
  closable?: boolean
}
type materialType =
  | {
      configMaterialType: 'CLI'
      authorityLevel: string
      content: { cmd?: string }
      [p: string]: any
    }
  | {
      configMaterialType: 'HTTP'
      authorityLevel: string
      content: {
        method?: string
        urlPath?: string
        queryParams?: {
          [p: string]: string
        }
        headers?: {
          [p: string]: string
        }
        body?: string
      }
      [p: string]: any
    }
  | {
      configMaterialType: 'SNMP'
      authorityLevel: string
      content: {
        pduType?: string
        oid?: string
      }
      [p: string]: any
    }
  | {
      configMaterialType: 'PYTHON'
      authorityLevel: string
      content: {
        entrance?: string | undefined
        fileDefs?: panesType[]
      }
      [p: string]: any
    }
  | { [p: string]: any }

interface formEditorInt {
  modelValue: any
  disabled?: boolean
  mode?: 1 | 2 | 3
  name?: (string | number)[]
}

const $props = withDefaults(defineProps<formEditorInt>(), {
  disabled: false,
  mode: 1,
})
const { disabled, modelValue, mode, name } = toRefs($props)

// 表单formData
// ref
const materialFormRef = ref()
const httpInputRef = ref()
const snmpRef = ref()

const modeFields = () => {
  const [fieldList] = LinkageDeviceHook()
  const vendorField: any = fieldList[0]
  const softwareField: any = fieldList[1]
  const versionField: any = fieldList[2]
  vendorField.key = 'deviceVendor'
  versionField.config.mode = 'multiple'
  return {
    authorityLevel: {
      label: '权限级别',
      key: 'authorityLevel',
      type: 'select',
      span: 12,
      config: {
        options: authorityLevelDict,
      },
    },
    vendorField,
    deviceType: {
      label: '设备类型',
      key: 'deviceType',
      type: 'select',
      config: {
        options: deviceTypeDict,
        mode: 'multiple',
      },
    },
    softwareField,
    versionField,
    engineField: engine.field,
  }
}

const commonFormData = {
  configMaterialType: 'CLI',
  authorityLevel: undefined,
  httpContent: {
    method: undefined,
    urlPath: '',
    queryParams: {},
    headers: {},
    body: '',
  },
  cliContent: {
    cmd: '',
  },
  snmpContent: {
    pduType: undefined,
    oid: '',
  },
  pythonContent: {
    entrance: 'main.py',
    fileDefs: [{ name: 'main.py', content: '' }],
  },
}
const modeFormData = {
  authorityLevel: undefined,
  deviceVendor: undefined,
  deviceType: [],
  softwarePlatform: undefined,
  softwareVersion: [],
}
const form: any = defineForm(() => {
  const { authorityLevel, engineField } = modeFields()
  const list = computed(() => {
    if (mode.value === 1) {
      return [authorityLevel]
    }
    if (mode.value === 3) {
      return [engineField, authorityLevel]
    }
    return [authorityLevel]
  })
  const data = reactive<materialType>({
    ...(mode.value === 1 ? modeFormData : {}),
    ...(modelValue.value
      ? modelValue.value
      : {
          configMaterialType: 'CLI',
          authorityLevel: undefined,
          content: { cmd: '' },
        }),
  })
  return [
    data,
    [
      {
        label: '类型',
        key: 'configMaterialType',
        type: 'radio-group',
        span: mode.value === 3 ? 12 : 24,
        config: {
          options: type,
          change({ value }) {
            switch (value) {
              case 'CLI':
                data.content = $cloneDeep(commonFormData.cliContent)
                break
              case 'HTTP':
                data.content = $cloneDeep(commonFormData.httpContent)
                break
              case 'SNMP':
                data.content = $cloneDeep(commonFormData.snmpContent)
                break
              case 'PYTHON':
                data.content = $cloneDeep(commonFormData.pythonContent)
                break
              default:
                data.content = { cmd: '' }
            }
            form.formData.engineType = null
          },
        },
      },
      ...list.value,
      {
        label: '超时时间(毫秒)',
        key: 'timeout',
        type: 'input-number',
        config: { min: 0 },
        span: 12,
      },
      {
        // label: '材料内容',
        span: 24,
        key: 'content',
        type: 'slotOut',
        // formItemAttr: {
        //   labelCol: { span: 2 },
        //   wrapperCol: { span: 22 },
        // },
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
        configMaterialType: [
          { required: true, trigger: 'change', message: '请选择类型' },
        ],
        timeout: [
          { required: true, trigger: 'change', message: '请填写超时时间' },
        ],
        collectionMethod: [
          { required: true, trigger: 'change', message: '请选择采集方式' },
        ],
        authorityLevel: [
          { required: true, trigger: 'change', message: '请选择权限级别' },
        ],
        engineType: [
          { required: false, trigger: 'change', message: '请选择引擎' },
        ],
      },
      optionsData: {},
    },
  ]
})

const cmdForm = reactive([
  {
    label: '材料内容',
    key: 'cmd',
    type: 'slot',
    span: 24,
    rules: [{ required: true, trigger: 'change', message: '请填写' }],
  },
])
const $emit = defineEmits(['update:modelValue'])
if (modelValue?.value) {
  watch(
    () => modelValue.value,
    (val: any) => {
      if (val) {
        if (val && typeof val === 'string') {
          $assign(form.formData, val)
        } else {
          $assign(form.formData, val)
        }
      }
    },
    { immediate: true }
  )
  watch(
    () => form.formData,
    (val) => {
      $emit('update:modelValue', val)
    },
    {
      deep: true,
      immediate: true,
    }
  )
}

onMounted(() => {
  if (mode.value === 3) {
    form.formModel.rules.engineType[0].required = true
  }
})
const validate = () => materialFormRef.value.formRef.validate()
defineExpose({
  validate,
})
</script>

<style scoped lang="scss">
.bo {
  min-height: auto;
}
</style>
