<template>
  <div>
    <a-radio-group
      v-model:value="mode"
      button-style="outline"
      class="json-radio"
      @change="groupChange"
    >
      <a-radio-button value="view" class="radio-btn">视图显示</a-radio-button>
      <a-radio-button value="code" class="radio-btn">代码显示</a-radio-button>
      <a-radio-button value="example" class="radio-btn">示例值</a-radio-button>
    </a-radio-group>

    <a-space class="space" v-if="false">
      <div>校验版本：</div>
      <a-select
        v-model:value="$schema"
        style="width: 250px"
        :options="$schemaList"
        placeholder="请选择版本"
        @change="versionChange"
      ></a-select>
    </a-space>
    <SJsonSchema
      class="schema"
      :value="{ root: jsonData }"
      v-show="mode === 'view'"
      :is-disabled="isDisabled"
      :is-show-icon="isShowIcon"
    ></SJsonSchema>
    <div v-if="mode === 'code'">
      <CodeEditor
        style="width: 90%"
        v-model="jsonSchema"
        :disabled="isDisabled"
        @blur="jsonSchemaBlur"
        :type="[, 'oneDark']"
      />
    </div>
    <CodeEditor
      v-if="mode === 'example'"
      style="width: 90%"
      v-model="jsonExample"
      :disabled="isDisabled"
      :type="[, 'oneDark']"
    />
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import SJsonSchema from './SJsonSchema.vue'
import { jsonSchemaToJSON } from './util'

interface propInfo {
  data?: object | ''
  isShowIcon?: boolean
  isDisabled?: boolean
}
const $props = withDefaults(defineProps<propInfo>(), {
  data: () => {
    return {
      type: 'object',
      $schema: 'http://json-schema.org/draft-07/schema#',
    }
  },
  isShowIcon: true,
  isDisabled: false,
})

const { data, isShowIcon, isDisabled } = toRefs($props)
const $emit = defineEmits(['update:data'])

const mode = ref('view')
const $schema = ref('http://json-schema.org/draft-07/schema#')
const $schemaList = ref([
  { value: 'http://json-schema.org/draft-07/schema#', label: '版本七' },
  {
    value: 'http://json-schema.org/draft-06/schema#',
    label: '版本六',
    disabled: true,
  },
  {
    value: 'http://json-schema.org/draft-05/schema#',
    label: '版本五',
    disabled: true,
  },
  {
    value: 'http://json-schema.org/draft-04/schema#',
    label: '版本四',
    disabled: true,
  },
])
const jsonData = ref<any>({
  type: 'object',
  $schema: 'http://json-schema.org/draft-07/schema#',
})
watch(
  () => data.value,
  (newV) => {
    console.log(newV, 'newV')
    if (newV) {
      jsonData.value = newV
    }
    $emit('update:data', jsonData.value)
  },
  { immediate: true }
)

const groupChange = () => {
  if (mode.value === 'code') {
    $schema.value = jsonData.value.$schema
    const copyData = $cloneDeep(jsonData.value)
    delete copyData.$schema
    jsonSchema.value = JSON.stringify(copyData, null, 2)
  }
  if (mode.value === 'example') {
    jsonExample.value = jsonSchemaToJSON(jsonData.value as any)
  }
}
let jsonSchema = ref()
const jsonSchemaBlur = (val: string) => {
  if (isJSON(val)) {
    const copyJ = $cloneDeep(JSON.parse(val))
    copyJ.$schema = $schema.value
    jsonData.value = copyJ
    $emit('update:data', jsonData.value)
  } else {
    message.warning('格式错误!')
  }
}
function isJSON(json: any) {
  try {
    JSON.parse(json)
    return true
  } catch (error) {
    return false
  }
}
const versionChange = () => {
  jsonData.value.$schema = $cloneDeep($schema.value)
  $emit('update:data', jsonData.value)
}
const jsonExample = ref()
// 导出Json Schema格式
const getJsonString = () => {
  return jsonData.value
}
// 导出json格式
const getJsonInfo = () => {
  return jsonSchemaToJSON(jsonData.value as any)
}
defineExpose({
  getJsonInfo,
  getJsonString,
})
</script>

<style scoped lang="scss">
.json-radio {
  margin: 20px 0;
  padding: 5px;
  background-color: #fff;
  border-radius: 8px;
  .radio-btn {
    border-radius: 8px;
    margin: 0 5px;
    border: none;
  }
  .radio-btn::before {
    display: none;
  }
  .galaxy-radio-button-wrapper-checked {
    background-color: #e7f0f8;
  }
  .galaxy-radio-button-wrapper:focus-within {
    box-shadow: none;
  }
}
.space {
  margin-left: 20px;
}
.schema {
  padding: 12px 16px;
}
</style>
