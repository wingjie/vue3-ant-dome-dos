<template>
  <div>
    <SForm v-bind="formConf" ref="formRef" :name="name">
      <template #oidIn="{ data }">
        <a-input-group compact>
          <a-input
            v-if="!disabled"
            disabled
            v-model:value="data.oid"
            placeholder="请选择！"
            style="width: calc(100% - 64px)"
          />
          <span v-else>
            {{ data.oid }}
          </span>
          <a-button v-if="!disabled" type="primary" @click="mibVisible = true"
            >选择</a-button
          >
        </a-input-group>
      </template>
    </SForm>
    <a-modal v-model:visible="mibVisible" width="1400" :footer="null">
      <mib-select @onSelect="selectMIB" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { defineForm } from '@/common/utils/define'
import { snmpPduTypeDict } from '../hook/index'

provide('isRightClick', true)
provide('isSelect', true)

const formRef = ref()
// const selectedMIB = ref()
const $emit = defineEmits(['update:modelValue'])
type CollectInt = {
  modelValue: {
    pduType: string | undefined
    oid: string
  }
  disabled: boolean
  name?: (string | number)[]
  formModel: any
}
const $props = withDefaults(defineProps<CollectInt>(), {
  modelValue: () => ({
    pduType: undefined,
    oid: '',
  }),
})
const { modelValue, disabled, name, formModel } = toRefs($props)
const mibVisible = ref(false)
const formConf = defineForm(() => {
  return [
    modelValue.value,
    [
      {
        label: '采集方式',
        key: 'pduType',
        span: 24,
        disabled: disabled as any,
        type: 'select',
        config: {
          options: snmpPduTypeDict,
          // change(a, b) {
          //   changeForm(a, b)
          // },
        },
      },
      { label: 'OID', key: 'oid', span: 24, type: 'slot' },
    ],
    {
      formItemAttr: {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
      },
      ...formModel.value,
      rules: {
        pduType: [{ required: true, trigger: 'change', message: '不能为空' }],
        oid: [{ required: true, trigger: 'change', message: '不能为空' }],
      },
      config: {
        change(data) {
          changeForm(data.field.key, data?.value)
        },
      },
      span: 24,
    },
  ]
})
function selectMIB(mibInfo: any) {
  const { oid = '' } = mibInfo
  formConf.formData.oid = oid
  changeForm('oid', oid)
  mibVisible.value = false
}
// function confirmSelect() {
//   const { oid } = selectedMIB.value
//   formConf.formData.oid = oid
//   changeForm('oid', oid)
//   mibVisible.value = false
// }
watch(
  () => modelValue.value,
  (val) => {
    formConf.formData = val
  },
  {
    immediate: true,
    deep: true,
  }
)

function changeForm(key: string, value: any) {
  $emit('update:modelValue', { ...formConf.formData, [key]: value })
}

defineExpose({})
</script>

<style scoped lang="scss"></style>
