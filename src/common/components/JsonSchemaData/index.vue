<template>
  <div class="json-data">
    <a-form :model="formData" name="basic">
      <a-row style="background: #e7f0f8">
        <a-col
          v-for="(item, index) in configData.column"
          :key="index"
          :span="item.span"
        >
          <div style="padding: 10px 10px; font-weight: 500; text-align: center">
            {{ item.title }}
          </div></a-col
        >
      </a-row>
      <a-row class="row">
        <template v-for="column in configData.column" :key="column.key">
          <a-col
            v-if="column.key === 'nature' && column.show"
            :span="column.span"
            class="cell"
            style="justify-content: flex-start"
          >
            <div class="icon">
              <Icons
                :font-size="20"
                class="active"
                v-if="!isClose"
                @click="isClose = !isClose"
                icon="icon-default"
              ></Icons>
              <Icons
                v-else
                :font-size="20"
                class="active"
                @click="isClose = !isClose"
                icon="icon-down"
              ></Icons>
            </div>
            root
          </a-col>
          <a-col
            v-if="column.key === 'required' && column.show"
            :span="column.span"
            class="cell"
          >
            <span> 是 </span>
          </a-col>
          <a-col
            v-if="column.key === 'nullable' && column.show"
            :span="column.span"
            class="cell"
          >
            <HandleCol
              :json-schema="{ ...jsonSchema, isRequired: true }"
              :formData="formData"
              :formDataFather="formData"
              @changeData="changeDataFn"
              @isNoneFn="isNoneFn"
              :name="[]"
              :disabled="disabled"
            ></HandleCol>
          </a-col>
          <a-col
            v-if="column.key === 'type' && column.show"
            :span="column.span"
            class="cell"
          >
            <span v-if="typeof jsonSchema.type === 'string'">
              {{ jsonSchema.type }}
            </span>
            <span v-else-if="Array.isArray(jsonSchema.type)">
              {{ jsonSchema.type.filter((e: any) => e !== 'null').toString() }}
            </span>
          </a-col>
          <a-col
            v-if="column.key === 'value' && column.show"
            :span="column.span"
            class="cell"
          >
            <!-- <FormItemVue
              v-if="
                jsonSchema.type !== 'object' &&
                !jsonSchema.type.includes('object') &&
                jsonSchema.type !== 'array' &&
                !jsonSchema.type.includes('array')
              "
              :json-schema="{
                ...jsonSchema,
                isRequired: isRequired(rowKey, jsonSchema.required),
              }"
              :formData="formData[rowKey]"
              :name="[...name, rowKey]"
            ></FormItemVue> -->
            <div
              class="cell"
              style="width: 100%; height: 40px; justify-content: center"
              v-if="!disabled"
            >
              <a-tooltip>
                <template #title>添加子元素</template>
                <Icons
                  v-if="
                    jsonSchema.type === 'array' ||
                    (jsonSchema.type?.includes('array') && formData)
                  "
                  class="icon-box"
                  icon="pure-add"
                  style="color: #999"
                  @click="addFn"
                />
              </a-tooltip>
            </div>
          </a-col>
          <a-col
            v-if="column.key === 'operation' && column.show"
            :span="column.span"
            class="cell"
          >
          </a-col>
        </template>
      </a-row>
      <ObjectVue
        v-if="
          jsonSchema.type == 'object' ||
          (jsonSchema.type?.includes('object') && formData)
        "
        v-show="isClose"
        :config="configData"
        :json-schema="jsonSchema"
        :formData="formData"
        @changeData="changeDataFn"
        :name="[]"
        :disabled="disabled"
      ></ObjectVue>
      <ArrayVue
        v-if="
          jsonSchema.type == 'array' ||
          (jsonSchema.type?.includes('array') && formData)
        "
        v-show="isClose"
        :formData="formData"
        @changeData="changeDataFn"
        :json-schema="jsonSchema"
        :json-schema-father="jsonSchema"
        :config="configData"
        :name="[]"
        :disabled="disabled"
      />
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { assign } from '@/common/componentsFn/assign'
import ObjectVue from './object.vue'
import ArrayVue from './array.vue'
import { typeOf } from '@/common/utils/traverseTree'
import HandleCol from './handleCol.vue'

import { type judgeType } from './utils'

interface propMsg {
  modelValue: any
  jsonSchema: {
    [p: string]: any
  }
  config?: {
    column?: { title: string; span: number; key: string; show: boolean }[]
  }
  mode?: 'object' | 'string'
  disabled?: boolean
}
const emit = defineEmits(['update:modelValue', 'changeData'])
const props = withDefaults(defineProps<propMsg>(), {
  config: () => ({}),
  mode: 'object',
  disabled: false,
})
const { jsonSchema, config, mode, modelValue, disabled } = toRefs(props)
const isClose = ref(true)
const defaultConfig = {
  column: [
    { title: '属性', key: 'nature', span: 5, show: true },
    { title: '是否必须', key: 'required', span: 3, show: true },
    { title: '特殊操作', key: 'nullable', span: 3, show: true },
    { title: '类型', key: 'type', span: 3, show: true },
    { title: '参数值', key: 'value', span: 7, show: true },
    { title: '', key: 'operation', span: 3, show: true },
  ],
}
const configData = assign({}, defaultConfig, config.value)

// const formData = useVModel(props, 'modelValue', emit)
const typeMode = computed(() => {
  if (mode?.value) return mode.value
  if (typeof toRaw(modelValue.value) === 'object') return 'object'
  return 'string'
})
const formData = ref()

watch(
  () => modelValue.value,
  (val: any) => {
    if (typeof val === 'string') {
      // 空字符串的时候
      if (!val) {
        if (
          jsonSchema.value.type === 'array' ||
          jsonSchema.value.type.includes('array')
        ) {
          formData.value = []
        } else if (
          jsonSchema.value.type === 'object' ||
          jsonSchema.value.type.includes('object')
        ) {
          formData.value = {}
        }
        judge(jsonSchema.value.type)
        return
      }
      let obj
      try {
        obj = JSON.parse(val)
      } catch {
        judge(jsonSchema.value.type)
        return
      }
      formData.value = obj
    } else {
      formData.value = val
    }
    judge(jsonSchema.value.type)
  },
  { deep: true, immediate: true }
)

function judge(type: judgeType | judgeType[]) {
  if (
    typeOf(formData.value) !== type &&
    !type.includes(typeOf(formData.value))
  ) {
    if (type === 'array' || type.includes('array')) {
      // formData.value = []
      changeDataFn([])
    } else if (type === 'object' || type.includes('object')) {
      // formData.value = {}
      changeDataFn({})
    }
    //  else {
    // formData.value = {}
    //   changeDataFn(undefined)
    // }
    // if (type === 'string') {
    //   formData.value = ''
    // }
    // if (type === 'number') {
    //   formData.value = undefined
    // }
    // if (type === 'boolean') {
    //   formData.value = undefined
    // }
  }
}
function addFn() {
  const typeScoped = jsonSchema.value.items.type
  const arrProp = formData.value
  emit('update:modelValue', [...arrProp, pushData(typeScoped)])
}

function isNoneFn() {
  const types = jsonSchema.value.properties
  if (modelValue.value !== null) {
    changeDataFn(null)
  } else if (types.type === 'object' || types.type.includes('object')) {
    changeDataFn({})
  } else if (types.type === 'array' || types.type.includes('array')) {
    changeDataFn([])
  }
  //  else if (types.type === 'boolean' || types.type.includes('boolean')) {
  //   changeDataFn(false)
  // } else if (types.type === 'string' || types.type.includes('string')) {
  //   changeDataFn('')
  // } else if (types.type === 'number' || types.type.includes('number')) {
  //   changeDataFn(null)
  // } else {
  //   changeDataFn(undefined)
  // }
}
function pushData(typeScoped: any) {
  if (typeScoped === 'object' || typeScoped?.includes('object')) {
    return {}
  }
  if (typeScoped === 'array' || typeScoped?.includes('array')) {
    return []
  }
  return undefined
}
function changeDataFn(val: any) {
  if (typeMode.value === 'object') {
    emit('update:modelValue', val)
  } else {
    emit('update:modelValue', JSON.stringify(val, null, 2))
  }
}
</script>
<style scoped lang="scss">
.json-data {
  padding-bottom: 10px;
  background: #f5f7f9;
  border-radius: 8px;
  overflow: hidden;
  .row {
    border-radius: 8px;
    &:hover {
      background-color: #e6eff7;
    }
  }
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-box {
  width: 20px;
  height: 20px;
  box-sizing: content-box;
  border-radius: 8px;
  border: 1.5px solid #bbcedf;
  &:hover {
    background: #e7f0f8;
  }
}
.color {
  border: 1.5px solid #ff8080;
  &:hover {
    background: #ffd1d1;
  }
}
.icon {
  width: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .active {
    cursor: pointer;
  }
}
</style>
