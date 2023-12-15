<template>
  <div style="margin: 0 10px">
    <template v-for="(item, key) in jsonSchema.properties" :key="key">
      <RowVue
        @add="addFn"
        @addRow="addRowFn"
        @delRow="delRowFn"
        :jsonSchema="jsonSchema"
        :config="config"
        :row-item="item"
        :row-key="key"
        :name="name"
        :formData="formData"
        @changeData="(val: any) => {
          changeDataFn(val, key)
        }"
        @isNoneFn="isNoneFn"
        :disabled="disabled"
      >
        <!-- <template #none>
          <a-switch
            v-if="
              jsonSchema.properties[key].type !== 'array' &&
              !jsonSchema.properties[key].type.includes('array')
            "
            :checked="!Object.prototype.hasOwnProperty.call(formData, key)"
            @change="
                (e: any) => {
                  isNoneFn(e, key)
                }
              "
          />
        </template> -->
        <template #default="{ isClose }">
          <Object
            v-if="
              (item.type === 'object' || item.type?.includes('object')) &&
              typeOf(formData[key]) === 'object'
            "
            v-show="isClose"
            :formData="formData[key]"
            @changeData="(val: any) => {
              changeDataFn(val, key)
            }"
            :json-schema="item"
            :config="config"
            :name="[...name, key]"
            :disabled="disabled"
          />
          <ArrayVue
            v-if="
              item.type === 'array' ||
              (item.type?.includes('array') && Array.isArray(formData[key]))
            "
            v-show="isClose"
            :formData="formData[key]"
            @changeData="(val: any) => {
              changeDataFn(val, key)
            }"
            :json-schema="item"
            :jsonSchemaFather="jsonSchema"
            :config="config"
            :name="[...name, key]"
            :disabled="disabled"
          />
        </template>
      </RowVue>
    </template>
  </div>
</template>
<script setup lang="ts">
import { pick } from 'lodash-es'
import { typeOf } from '@/common/utils/traverseTree/index'
import ArrayVue from './array.vue'
import RowVue from './row.vue'

interface propMsg {
  formData: any
  jsonSchema: {
    [p: string]: any
  }
  config: {
    column: { title: string; span: number; key: string; show: boolean }[]
  }
  name: (string | number)[]
  disabled?: boolean
}
const emit = defineEmits(['update:modelValue', 'changeData'])
const props = withDefaults(defineProps<propMsg>(), { disabled: false })
const { config, jsonSchema, formData, disabled } = toRefs(props)
// const formData = useVModel(props, 'modelValue', emit)

watch(
  () => formData.value,
  () => {
    if (typeOf(formData.value) !== 'object') {
      emit('changeData', {})
    } else {
      judgeScoped(jsonSchema.value.properties)
    }
  },
  { deep: true, immediate: true }
)

function judgeScoped(types: { [p: string]: any }) {
  if (!types) return // 为了兼容未定义对项内部内容以后的判断 obj: { type: ['object', 'null'] },
  for (const key of Object.keys(types)) {
    if (
      (jsonSchema.value.required?.includes(key) ||
        Object.prototype.hasOwnProperty.call(formData.value, key)) &&
      types[key].type !== formData.value[key] &&
      !types[key].type.includes(typeOf(formData.value[key]))
    ) {
      if (types[key].type === 'object' || types[key].type.includes('object')) {
        changeDataFn({}, key)
      } else if (
        types[key].type === 'array' ||
        types[key].type.includes('array')
      ) {
        changeDataFn([], key)
      } else if (
        types[key].type === 'string' ||
        types[key].type.includes('string')
      ) {
        changeDataFn('', key)
      } else if (
        (types[key].type === 'number' || types[key].type.includes('number')) &&
        formData.value[key] !== null
      ) {
        changeDataFn(null, key)
      } else if (
        types[key].type === 'boolean' ||
        types[key].type.includes('boolean')
      ) {
        changeDataFn(false, key)
      } else if (!Object.prototype.hasOwnProperty.call(formData.value, key)) {
        changeDataFn(undefined, key)
      }
    }
  }
}

function addFn(data: any) {
  const typeScoped = data.jsonSchema.items.type
  // formData.value[data.rowKey].push(pushData(typeScoped))
  const arrProp = formData.value[data.rowKey]
  emit('changeData', {
    ...formData.value,
    [data.rowKey]: [...arrProp, pushData(typeScoped)],
  })
}
function addRowFn(data: any) {
  const typeScoped = data.jsonSchema.items.type
  // formData.value.splice(data.rowKey + 1, 0, pushData(typeScoped))
  const arrProp = formData.value
  const arr = [...arrProp]
  arr.splice(data.rowKey + 1, 0, pushData(typeScoped))
  emit('changeData', arr)
}
function delRowFn(data: any) {
  // formData.value.splice(data.rowKey, 1)
  const arrProp = formData.value
  const arr = [...arrProp]
  arr.splice(data.rowKey, 1)
  emit('changeData', arr)
}

function pushData(typeScoped: string | string[]) {
  if (typeScoped === 'object' || typeScoped?.includes('object')) {
    return {}
  }
  if (typeScoped === 'array' || typeScoped?.includes('array')) {
    return []
  }
  return undefined
}
function isNoneFn(bool: boolean, key: string) {
  const types = jsonSchema.value.properties
  if (!bool) {
    const data = { ...formData.value }
    delete data[key]
    changeDataFn({ ...data }, key)
    emit('changeData', {
      ...pick(data, Object.keys(jsonSchema.value.properties)),
    })
  } else if (
    types[key].type === 'object' ||
    types[key].type.includes('object')
  ) {
    changeDataFn({}, key)
  } else if (types[key].type === 'array' || types[key].type.includes('array')) {
    changeDataFn([], key)
  } else if (
    types[key].type === 'boolean' ||
    types[key].type.includes('boolean')
  ) {
    changeDataFn(false, key)
  } else if (
    types[key].type === 'string' ||
    types[key].type.includes('string')
  ) {
    changeDataFn('', key)
  } else if (
    types[key].type === 'number' ||
    types[key].type.includes('number')
  ) {
    changeDataFn(null, key)
  } else {
    changeDataFn(undefined, key)
  }
}

function changeDataFn(val: any, key: string | number) {
  let data
  if (Array.isArray(formData.value)) {
    const arr = [...formData.value]
    const index = key as number
    arr[index] = val
    data = arr
  } else {
    data = { ...formData.value, [key]: val }
  }
  emit('changeData', {
    ...pick(data, Object.keys(jsonSchema.value.properties)),
  })
}
</script>
<style scoped lang="scss"></style>
