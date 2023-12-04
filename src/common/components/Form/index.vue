<template>
  <div class="app-container">
    <div v-show="false">
      <a-button @click="validate">校验测试</a-button>
      <a-button @click="clearValidate">校验测试23</a-button>
    </div>
    <div id="components-form-demo-advanced-search">
      <a-form
        ref="formRef"
        :label-col="{ style: { width: '150px' } }"
        :labelWrap="true"
        class="ant-advanced-search-form"
        :disabled="
          (fieldModel && fieldModel.attr && fieldModel.attr.disabled) ||
          (fieldModel && fieldModel.disabled) ||
          false
        "
        v-bind="{
          ...fieldModel.attr,
          ...proxy?.$attrs,
        }"
        :model="formDataMap"
        :style="Object.assign({}, fieldModel.style)"
        :rules="fieldModel.rules"
      >
        <a-row
          :gutter="
            (fieldModel && fieldModel.gutter) || [
              fieldModel?.gutterX || 24,
              fieldModel?.gutterY || 0,
            ]
          "
        >
          <a-col
            v-for="(field, index) in fieldList"
            :key="field.key + index"
            :span="
              (field && field.span) || (fieldModel && fieldModel.span) || 6
            "
            :style="{
              display:
                index < (fieldModel.expandNum || fieldList.length)
                  ? 'block'
                  : 'none',
            }"
          >
            <!-- <template > -->
            <slot
              v-if="
                field.type &&
                (field.type === 'slot' || field.type === 'slotOut')
              "
              :name="`${field.key}Out`"
              :data="formDataMap"
              :model="fieldModel"
              :field="field"
            ></slot>
            <a-form-item
              v-if="field.type !== 'slotOut'"
              :ref="field.key"
              :name="field.key"
              :rules="field.rules"
              :label="field.label || ' '"
              :class="field.label === undefined ? 'opacity' : ''"
            >
              <template v-if="isFormFn(field)">
                <Shell
                  v-if="field.type && field.type !== 'slot'"
                  :tag="`a-${field.type}`"
                  v-model:value="formDataMap[field.key]"
                  v-bind="{
                    ...proxy?.$attrs,
                    placeholder: `请填写${field.label}`,
                    'allow-clear': true,
                    ...field.config,
                    disabled:
                      (field.config && field.config.hasOwnProperty('disabled')
                        ? field.config.disabled
                        : field.disabled) || false,
                  }"
                  :options="
                    fieldModel?.optionsData?.[field['key']] ||
                    (field && field.options) ||
                    (field.config && field.config.options) ||
                    []
                  "
                  @change="change($event, field)"
                  @dropdownVisibleChange="dropdownVisibleChange($event, field)"
                >
                </Shell>
                <div v-else-if="field.type !== 'slot'" style="width: 100%">
                  {{
                    findCodeName(formDataMap[field.key], field, field.division)
                  }}
                </div>
              </template>
              <span v-else-if="field.type !== 'slot'">
                {{
                  findCodeName(formDataMap[field.key], field, field.division)
                }}
              </span>
              <slot
                v-if="field.type && field.type === 'slot'"
                :name="`${field.key}In`"
                :data="formDataMap"
                :model="fieldModel"
                :field="field"
              />
            </a-form-item>
            <!-- </template> -->
            <!-- <span v-else :style="Object.assign({margin:'10px 0 11px 0px', display:'inline-block'},valueStyle(field))">
              ：<span>{{ findCodeName(formDataMap[field.key], field, field.division) }}</span>
            </span> -->
          </a-col>
        </a-row>
        <a-row>
          <slot name="formRow" :data="formDataMap" :model="fieldModel" />
        </a-row>
      </a-form>
      <slot name="formOut" :data="formDataMap" :model="fieldModel" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import type { FormInstance } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import Shell from '../Shell'

const proxy = getCurrentInstance()?.proxy

interface propMsg {
  fieldModel?: {
    [P: string]: any
  }
  fieldList: Array<any>
  formData: {
    [P: string]: any
  }
  extra?: any
}
const $emit = defineEmits(['change', 'dropdownVisibleChange'])
const props = withDefaults(defineProps<propMsg>(), {
  formData: () => {
    return {}
  },
  fieldList: () => [],
  fieldModel: () => {
    return {
      width: '100%',
      height: '55vh',
    }
  },
})
const { fieldModel, fieldList, formData } = toRefs(props)
const formRef = ref<any>()

const formDataMap = ref<any>({})
watch(
  () => formData.value,
  (val) => {
    const follow = fieldModel.value?.follow !== false
    if (follow) {
      formDataMap.value = val
    } else {
      formDataMap.value = cloneDeep(val)
    }
  },
  { immediate: true, deep: true }
)
// function labelStyle(field) {
//   let obj = {}
//   if (this.fieldModel.labelWidth) {
//     obj = { width: this.fieldModel.labelWidth }
//   }
//   if (
//     field &&
//     field.label &&
//     this.typeOf(field.label) === 'object' &&
//     this.typeOf(field.label.style) === 'object'
//   ) {
//     return { ...this.defaultLabelStyle, ...obj, ...field.label.style }
//   }
//   return { ...this.defaultLabelStyle, ...obj }
// }
// function valueStyle(field) {
//   if (
//     field &&
//     field.value &&
//     this.typeOf(field.value) === 'object' &&
//     this.typeOf(field.value.style) === 'object'
//   ) {
//     return { ...this.defaultValueStyle, ...field.value.style }
//   }
//   return this.defaultValueStyle
// }
function getData() {
  return cloneDeep(formDataMap.value)
}
function validate(fn?: ((arg0: any) => void) | MouseEvent) {
  return new Promise((resolve) => {
    ;(formRef as any).value
      .validate()
      .then((valid: any) => {
        resolve({ status: true, data: { ...valid } })
        if (fn)
          (fn as (arg0: any) => void)({ status: true, data: { ...valid } })
      })
      .catch((err: any) => {
        resolve({ status: false, data: { ...err } })
        if (fn) (fn as (arg0: any) => void)({ status: false, data: { ...err } })
      })
  })
}
function clearValidate() {
  // let model = ''
  // if (fieldModel && fieldModel.ref) {
  //   model = this.$refs[this.fieldModel.ref]
  // } else if (this.fieldModel && this.fieldModel.attr && this.fieldModel.attr.ref) {
  //   model = this.$refs[this.fieldModel.attr.ref]
  // } else {
  //   model = this.$refs.form
  // }
  ;(formRef as any).value.clearValidate()
}
function typeOf(keyVal: any) {
  // 数据类型判断
  return Object.prototype.toString
    .call(keyVal)
    .replace('[object ', '')
    .replace(']', '')
    .toLowerCase()
}
// 暴露函数====> 通过行找label名字
function findCodeName(value: any, field: any, division = '、') {
  if (value === '' || value === undefined || value === null) return ''
  let unit: any = ''
  if (typeOf(value) === 'array') {
    for (const iVal of value) {
      const arrItem: any = findCodeItem(iVal, field)
      const arrStr = (arrItem && arrItem.label) || iVal
      unit += `${arrStr}${division}`
    }
    unit = unit.substr(0, unit.length - 1)
  } else {
    unit = findCodeItem(value, field)
    unit = (unit && unit.label) || `${value}`
  }
  return unit || value.join(division)
}
function findCodeItem(value: string | any[], field: { [p: string]: any }) {
  let unit: any = ''
  if (field.options && typeOf(field.options) === 'array') {
    const { options } = field
    if (typeof value === 'object' && value !== null) {
      unit = []
      for (const iVal of value) {
        const arrItem = options.find(
          (item: { value: any }) => item.value === iVal
        )
        unit.push(arrItem)
      }
    } else {
      unit = options.find((item: { value: any }) => item.value === value)
    }
  } else {
    unit = value
  }
  return unit
}
function isFormFn(field: any = {}) {
  if (field && Object.prototype.hasOwnProperty.call(field, 'isForm'))
    return field.isForm
  if (Object.prototype.hasOwnProperty.call(fieldModel.value, 'isForm'))
    return fieldModel.value.isForm
  return true
}
function change(e: any, field: { type?: any; options?: any }) {
  let value = ''
  if (field.type === 'select') {
    value = e
  } else if (field.type === 'input') {
    value = e.target.value
  }
  const unit = findCodeItem(value, field)
  $emit('change', { e, value, field, unit, data: formDataMap })
}
function dropdownVisibleChange(
  status: boolean,
  field: { type?: any; options?: any }
) {
  $emit('dropdownVisibleChange', { status, field, data: formDataMap })
}
defineExpose({
  clearValidate,
  getData,
  validate,
  findCodeItem,
  formRef,
})
</script>
<style scoped lang="scss">
// .ant-advanced-search-form {
// padding: 24px;
// }
// .ant-advanced-search-form .ant-form-item {
//   display: flex;
// }
// :deep(.ant-advanced-search-form).ant-form-item-control-wrapper {
//   flex: 1;
// }
// #components-form-demo-advanced-search .ant-form {
//   max-width: none;
// }

// #components-form-demo-advanced-search .search-result-list {
//   margin-top: 16px;
//   border: 1px dashed #e9e9e9;
//   border-radius: 6px;
//   background-color: #fafafa;
//   min-height: 200px;
//   text-align: center;
//   padding-top: 80px;
// }
.ant-advanced-search-form {
  :deep(.ant-form-item-label) label {
    display: block;
    line-height: 250%;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  // :deep(.ant-form-item-children) {
  //   width: 100%;
  //   display: inline-block;
  // }
  :deep(.opacity) label {
    display: none;
  }
}
</style>
