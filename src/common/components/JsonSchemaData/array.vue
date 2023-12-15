<template>
  <div style="margin: 0 10px">
    <!-- array:{{ formData }}<br /> -->
    <!-- jsonSchema>>>:{{ jsonSchema }}<br />
    {{ jsonSchemaFather.type }} -->
    <template v-for="(item, key) in formData" :key="key">
      <RowVue
        @add="addFn"
        @addRow="addRowFn"
        @delRow="delRowFn"
        :jsonSchema="jsonSchema"
        :config="config"
        :row-item="jsonSchema.items"
        :row-key="key"
        :name="name"
        :formData="formData"
        @changeData="(val: any) => {changeDataFn(val, key)}"
        :disabled="disabled"
      >
        <template #default="{ isClose }">
          <ObjectVue
            v-if="
              (jsonSchema.items.type === 'object' ||
                jsonSchema.items.type?.includes('object')) &&
              formData[key]
            "
            v-show="isClose"
            :formData="formData[key]"
            @changeData="(val: any, string) => {
              changeDataFn(val, key)
            }"
            :json-schema="jsonSchema.items"
            :config="config"
            :name="[...name, key]"
            :disabled="disabled"
          />
          <Array
            v-if="
              jsonSchema.items.type === 'array' ||
              (jsonSchema.items.type?.includes('array') && formData[key])
            "
            v-show="isClose"
            :formData="formData[key]"
            @changeData="(val: any) => {changeDataFn(val, key)}"
            :json-schema="jsonSchema.items"
            :json-schema-father="jsonSchema"
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
import { typeOf } from '@/common/utils/traverseTree/index'
import ObjectVue from './object.vue'
import RowVue from './row.vue'

interface propMsg {
  formData: any
  jsonSchema: {
    [p: string]: any
  }
  jsonSchemaFather: any
  config: {
    column: { title: string; span: number; key: string; show: boolean }[]
  }
  name: (string | number)[]
  disabled: boolean
}
const emit = defineEmits(['update:modelValue', 'changeData'])
const props = withDefaults(defineProps<propMsg>(), {
  disabled: false,
})
const { config, jsonSchema, formData, jsonSchemaFather, disabled } =
  toRefs(props)
// const formData = useVModel(props, 'modelValue', emit)
// const isClose = ref(true)

watch(
  () => formData.value,
  () => {
    if (
      (jsonSchemaFather.value?.type === 'array' ||
        jsonSchemaFather.value?.type?.includes('array')) &&
      typeOf(formData.value) !== 'array'
    ) {
      emit('changeData', [])
    } else {
      judgeScoped(jsonSchema.value.items)
    }
  },
  { deep: true, immediate: true }
)

function judgeScoped(types: { [p: string]: any }) {
  formData.value?.forEach?.((item: any, key: number) => {
    if (types.type !== item && !types.type.includes(typeOf(item))) {
      if (types.type === 'object' || types.type.includes('object')) {
        changeDataFn({}, key)
      } else if (types.type === 'array' || types.type.includes('array')) {
        changeDataFn([], key)
      } else if (types.type === 'string' || types.type.includes('string')) {
        changeDataFn('', key)
      } else if (
        (types.type === 'number' || types.type.includes('number')) &&
        item !== null
      ) {
        changeDataFn(null, key)
      } else if (types.type === 'boolean' || types.type.includes('boolean')) {
        changeDataFn(false, key)
      } else if (!Object.prototype.hasOwnProperty.call(formData.value, key)) {
        changeDataFn(undefined, key)
      }
    }
  })
}

function addFn(data: any) {
  const typeScoped = data.jsonSchema.items.type
  const arrProp = formData.value
  arrProp[data.rowKey] = [...arrProp[data.rowKey], pushData(typeScoped)]
  emit('changeData', [...arrProp])
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
function changeDataFn(val: any, key: string | number) {
  let data
  if (Array.isArray(formData.value)) {
    const arrProp = formData.value
    const arr = [...arrProp]
    const index = key as number
    arr[index] = val
    data = arr
  } else {
    data = { ...formData.value, [key]: val }
  }
  emit('changeData', data)
}
</script>
<style scoped lang="scss"></style>
