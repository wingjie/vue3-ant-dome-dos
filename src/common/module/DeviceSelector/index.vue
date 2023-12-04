<template>
  <SForm
    v-bind="{
      ...formConf,
      ...(name ? { name, 'onUpdate:formData': updateFormData } : {}),
    }"
  >
    <template #content="{ data }">
      <template v-if="data.type === 'SPECIFIC'">
        <div class="device-area">
          <a-button @click="addDeviceHandle" :disabled="disabled"
            >选择设备</a-button
          >
          <div style="padding-bottom: 15px">
            <DeviceListSelect
              v-if="Array.isArray(data.content) && data.content.length"
              class="device-list"
              mode="display"
              v-model:deviceIds="data.content"
              :disabled="disabled"
            />
          </div>
          <a-modal
            title="选择设备"
            v-model:visible="visible"
            :width="1000"
            @ok="confirmSelect"
          >
            <DeviceListSelect
              mode="select"
              @select="modalSelectHandle"
              :deviceIds="data.content"
            />
          </a-modal>
        </div>
      </template>
      <template v-else-if="data.type === 'CONDITION'">
        <s-form
          v-bind="{
              ...deviceFormConf,
              ...(name
                ? {
                    formData: modelValue.content,
                    'onUpdate:formData': (val: any) => {
                      $emit('update:modelValue', { ...formConf.formData, content: val })
                    },
                  }
                : {}),
            }"
          :name="[...(name ? name : []), 'content']"
        ></s-form>
      </template>
    </template>
    <template #pythonProject="innerData">
      <PythonModule
        :name="[...(name ? name : []), 'content']"
        v-model="innerData.data.content"
        :disabled="disabled"
        :formModal="{
          formItemAttr: {
            ...formConf.formModel.formItemAttr,
          },
        }"
      />
    </template>
  </SForm>
</template>

<script setup lang="ts">
import LinkageDeviceHook from '@/common/hook/deviceLinkageHook'
import { defineForm } from '@/common/utils/define'
import DeviceListSelect from './DeviceSelect.vue'
import sceneTagsHook from './hook/SceneTags'
import { deviceTypeDict } from './hook/FieldConfig'

interface DeviceSelectorInt {
  modelValue?: any
  type?: any
  content?: any
  name?: (string | number)[]
  disabled?: boolean
}
const $emit = defineEmits([
  'update:type',
  'update:content',
  'update:modelValue',
])
const $props = withDefaults(defineProps<DeviceSelectorInt>(), {
  type: '',
  content: '',
})
const { modelValue, type, content, disabled } = toRefs($props)
const [deviceFieldList] = LinkageDeviceHook()

const visible = ref(false)
const selectIds = ref([])
const formData = reactive({
  type: '',
  content: {},
})
const [, tagsField] = sceneTagsHook([
  {},
  {
    checked: computed(() => formData.type === 'SCENE_TAGS'),
    span: 24,
    rules: [{ required: true, trigger: 'change', message: '请选择' }],
  },
])

const formConf = defineForm(() => {
  return [
    formData,
    [
      {
        label: '方式',
        key: 'type',
        type: 'radio-group',
        span: 24,
        config: {
          options: [
            { label: '全部', value: 'ALL' },
            { label: '指定', value: 'SPECIFIC' },
            { label: '条件', value: 'CONDITION' },
            { label: '标签', value: 'SCENE_TAGS' },
            { label: 'PYTHON', value: 'PYTHON' },
          ],
          change: typeChangeHandle,
        },
        rules: [{ required: true, trigger: 'change', message: '请选择' }],
      },
      tagsField,
      {
        label: ' ',
        key: 'pythonProject',
        type: 'slotOut',
        span: 24,
        checked: computed(() => ['PYTHON'].includes(formData.type)),
      },
      {
        label: '内容',
        key: 'content',
        type: 'slotOut',
        span: 24,
        checked: computed(() =>
          ['SPECIFIC', 'CONDITION'].includes(formData.type)
        ),
      },
    ],
    {
      isForm: computed(() => !disabled.value),
      formItemAttr: {
        labelCol: { span: 0, style: { width: '120px' } },
        wrapperCol: { span: 18 },
      },
      rules: {
        type: [{ required: true, trigger: 'change', message: '请选择' }],
      },
    },
  ]
})
const deviceFormData = reactive({
  type: null,
  vendor: null,
  softwarePlatform: null,
  softwareVersion: null,
})
const deviceFormConf = reactive(
  defineForm(() => {
    const vendorField: any = deviceFieldList[0]
    const softwareField: any = deviceFieldList[1]
    const versionField: any = deviceFieldList[2]
    return [
      deviceFormData,
      [
        {
          label: '设备类型',
          key: 'type',
          type: 'select',
          config: {
            options: deviceTypeDict,
          },
        },
        vendorField,
        softwareField,
        versionField,
      ],
      {
        span: 6,
        isForm: computed(() => !disabled.value) as any,
        formItemAttr: {
          labelCol: { span: 0, style: { width: '120px' } },
          wrapperCol: { span: 18 },
        },
        rules: {
          vendor: [{ required: true, trigger: 'change', message: '请选择' }],
          type: [{ required: true, trigger: 'change', message: '请选择' }],
        },
      },
    ]
  })
)
function typeChangeHandle() {
  const fType = formData.type
  if (fType === 'ALL') {
    formData.content = {}
  } else if (fType === 'SPECIFIC') {
    formData.content = []
  } else if (fType === 'CONDITION') {
    formData.content = deviceFormData
  }
  $emit('update:type', formData.type)
  $emit('update:modelValue', formData)
}

function updateFormData(val: any) {
  $emit('update:modelValue', val)
}

watch(deviceFormConf, () => {
  formData.content = deviceFormData
  $emit('update:content', deviceFormData)
  $emit('update:modelValue', formData)
})

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
    formData.type = modelValue.value.type
    formData.content = modelValue.value.content
  }
  if (type?.value) {
    formData.type = type.value.type
  }
  if (content?.value) {
    formData.content = content.value
  }
}
function addDeviceHandle() {
  visible.value = true
  selectIds.value = []
}
// function deviceChange() {
//   console.log(deviceFormData)
// }
function confirmSelect() {
  formData.content = selectIds.value
  visible.value = false
  $emit('update:modelValue', formConf.formData)
}
function modalSelectHandle(deviceIds: any) {
  selectIds.value = deviceIds
}
</script>

<style scoped lang="scss">
.device-area {
  padding-left: 120px;
}
.device-list {
  margin-top: 10px;
}
</style>
