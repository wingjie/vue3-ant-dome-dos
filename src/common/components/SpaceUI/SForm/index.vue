<template>
  <div class="app-container">
    <div v-show="false">
      <a-button @click="validate()">校验测试</a-button>
      <a-button @click="clearValidate()">清除校验测试</a-button>
    </div>
    <div id="components-form-demo-advanced-search">
      <a-form
        v-if="!isScattered"
        ref="formRef"
        v-bind="{
          ...$attrs,
          ...modelData.formAttr,
          ...$attrs.formAttr,
        }"
        :model="formDataMap"
      >
        <SFormLayout
          v-bind="{
            ...$attrs,
            ...($attrs?.['onUpdate:formData']
                ? {
                    ['onUpdate:formData'](value: any) {
                      $attrs?.['onUpdate:formData']({
                        ...formData,
                        ...value,
                      })
                    },
                    ['onUpdate:formDataMap'](value: any) {
                      $attrs?.['onUpdate:formData']({
                        ...formData,
                        ...value,
                      })
                    },
                  }
                : {}),
          }"
          :modelData="modelData"
          :formData="formData"
          :formDataMap="formDataMap"
          :fieldListMap="fieldListMap"
          :rowMsg="rowMsg"
          :name="name ? name : []"
        >
          <template v-for="(value, name) of $slots" #[name]="slotData">
            <slot
              :name="name"
              :model="modelData"
              :way="wayData"
              :extra="extra"
              v-bind="slotData"
            ></slot>
          </template>
        </SFormLayout>
      </a-form>
      <template v-else>
        <SFormLayout
          v-bind="{
            ...$attrs,
            ...($attrs?.['onUpdate:formData']
                ? {
                    ['onUpdate:formData'](value: any) {
                      $attrs?.['onUpdate:formData']({
                        ...formData,
                        ...value,
                      })
                    },
                    ['onUpdate:formDataMap'](value: any) {
                      $attrs?.['onUpdate:formData']({
                        ...formData,
                        ...value,
                      })
                    },
                  }
                : {}),
          }"
          :modelData="modelData"
          :formData="formData"
          :formDataMap="formDataMap"
          :fieldListMap="fieldListMap"
          :rowMsg="rowMsg"
          :name="name ? name : []"
        >
          <template v-for="(value, name) of $slots" #[name]="slotData">
            <slot
              :name="name"
              :model="modelData"
              :way="wayData"
              :extra="extra"
              v-bind="slotData"
            ></slot>
          </template>
        </SFormLayout>
      </template>
      <slot name="formOut" :data="formDataMap" :model="formModel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
import { unref } from 'vue'
// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep } from 'lodash-es'
import SFormLayout from './SFormLayout.vue'
import { initData, assignFormItemAttr } from '../../../componentsFn/assignProp'
import { typeOf } from '@/common/utils/traverseTree'
import { assign } from '@/common/componentsFn/assign'
// import Shell from '../Shell'
import { mapPlainTableAttr } from '@/common/componentsFn'
import { formModelType, fieldListType } from '@/common/componentsFn/propType'

const $attrs: any = useAttrs()
const $slots: any = useSlots()

interface propMsg {
  formModel?: formModelType
  fieldList: Array<fieldListType>
  formData: object
  extra?: any
  name?: (string | number)[]
}
// const $emit = defineEmits(['change', 'dropdownVisibleChange'])
const props = withDefaults(defineProps<propMsg>(), {
  formData: () => {
    return {}
  },
  fieldList: () => [],
  formModel: () => {
    return {
      // width: '100%',
      // height: '55vh',
    }
  },
})
const { formModel, fieldList, formData, name } = toRefs(props)
const formRef = ref<FormInstance>()
const formItemRef = ref<FormInstance>()
const formDataMap = ref<any>({})
const fieldListMap = ref<fieldListType[]>([])
// ? 参数配置 ////////////////

const defaultFormModel = reactive<formModelType>({
  isForm: true,
  formAttr: {
    // labelCol: { style: { width: '150px', 'text-align': 'right' } },
    // wrapperCol: { style: { width: '150px', 'text-align': 'right' } },
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
    labelWrap: true,
    class: 'ant-advanced-search-form',
    style: {},
    model: formDataMap.value,
  },
  rowAttr: {
    gutter: [24, 0],
  },
  colAttr: {
    span: 8,
    style: {},
  },
  follow: true,
  expandNum: undefined,
  formItemAttr: {
    labelCol: { span: 6, offset: 0 },
    // wrapperCol: { span: 18 },
  },
  config: {
    'auto-size': { minRows: 1, maxRows: 5 },
    trim: true,
    isShowFindCodeName: true,
    isForm: true,
    isCore: true,
    disabled: false,
    placeholder: `请填选`,
    'allow-clear': true,
    maxlength: 200,
  },
})
const isScattered = computed(() => name?.value)

initData(defaultFormModel, ['disabled'])
onMounted(() => {
  if (Object.prototype.hasOwnProperty.call(formModel.value, 'async')) {
    mapPlainTableAttr(formModel.value, formModel.value.async)
  }
})
const modelData = ref<formModelType>({}) // 合并后的数据
function initColumnsComputed(col: { [p: string]: any }[]) {
  return col.map((item) => {
    return assignFormItemAttr(item, modelData.value)
  })
}
watchEffect(() => {
  initData(formModel.value, ['disabled', 'span', 'rules'])
  modelData.value = assign({}, toRaw(defaultFormModel), toRaw(formModel.value))
  fieldListMap.value = initColumnsComputed(fieldList.value)
})

function update() {
  const follow = modelData.value?.follow !== false
  if (follow) {
    formDataMap.value = formData.value
  } else {
    formDataMap.value = cloneDeep(formData.value)
  }
  return { formDataMap: formDataMap.value, formData: formData.value }
}
function cancel() {
  clearValidate()
  formDataMap.value = null
}
function confirm() {
  Object.assign(formData.value, formDataMap.value)
  cancel()
  return formData.value
}

watch(
  () => [modelData.value.isForm, formData.value],
  ([isForm]) => {
    if (isForm === true) {
      update()
    } else {
      cancel()
    }
  },
  { immediate: true, deep: true }
)
function getData() {
  return cloneDeep(formDataMap.value)
}
function validate(
  itemName?:
    | string[]
    | string
    | ((arg0: { status: boolean; data: { [p: string]: any } }) => void),
  fn?: (arg0: { status: boolean; data: { [p: string]: any } }) => void
) {
  if (unref(formModel.value.isForm) === false) return
  return new Promise((resolve) => {
    ;(formRef as any).value
      .validate(
        typeOf(itemName) === 'array' || typeOf(itemName) === 'string'
          ? itemName
          : undefined
      )
      .then((valid: any) => {
        resolve({ status: true, data: { ...valid } })
        if (typeOf(itemName) === 'function') {
          ;(itemName as Function)({ status: true, data: { ...valid } })
        }
        if (fn) fn({ status: true, data: { ...valid } })
      })
      .catch((err: any) => {
        resolve({ status: false, data: { ...err } })
        if (fn) fn({ status: false, data: { ...err } })
      })
  })
}
function clearValidate(itemName?: string[] | string) {
  ;(formRef as any).value?.clearValidate(itemName)
}
function findCodeItem(value: string | any[], field: { [p: string]: any }) {
  return (formItemRef as any).value.findCodeItem(value, field)
}

const rowMsg = reactive({
  options: {},
  unit: {},
})
const wayData = ref({
  confirm,
  update,
  cancel,
})
const exposeObj: { [p: string]: any } = {
  clearValidate,
  getData,
  validate,
  findCodeItem,
  update,
  cancel,
  confirm,
  formRef,
  mapData: formDataMap,
}
const exposeData: { [p: string]: any } = reactive({})
onMounted(() => {
  if (formRef.value) {
    const formRefKeys = Object.keys(formRef.value)
    formRefKeys.forEach((key: string) => {
      exposeData[key] = (formRef.value as any)[key]
    })
  }
  const exposeObjKeys = Object.keys(exposeObj)
  exposeObjKeys.forEach((key: string) => {
    exposeData[key] = exposeObj[key]
  })
})
defineExpose(exposeData)
</script>
