<template>
  <div class="schema-to-json">
    <a-space class="header">
      <!-- <a-radio-group v-model:value="radio">
        <a-radio-button
          v-for="(item, index) in modeConfig.group"
          :key="index"
          :value="item.value"
          >{{ item.label }}</a-radio-button
        >
      </a-radio-group> -->
      <!-- {{ modelValue }} -->
      <!-- {{ copySchema }} -->

      <div class="icon" @click="radio = 'single'">
        <Icons icon="pure-single" style="font-size: 16px; color: #8ea1b3" />
      </div>
      <div class="icon" @click="radio = 'double'">
        <Icons icon="pure-double" style="font-size: 16px; color: #8ea1b3" />
      </div>
      <a-button
        type="link"
        @click="showWhichFn('codeEditor')"
        v-if="showWhich !== 'codeEditor'"
      >
        文本输入
      </a-button>
      <a-button
        v-if="showWhich !== 'visualJson'"
        type="link"
        @click="showWhichFn('visualJson')"
      >
        格式化输入
      </a-button>
      <a-dropdown
        @click="autoCreateHandle"
        v-if="!disabled && showWhich !== 'visualJson'"
      >
        <span class="auto-create">自动生成</span>
        <template #overlay v-if="typeMode === 'string'">
          <a-menu>
            <a-menu-item @click="autoCreateHandle(false)"
              >仅生成字段名</a-menu-item
            >
          </a-menu>
        </template>
      </a-dropdown>
    </a-space>
    <div class="content">
      <div class="codeEditor" style="width: 50%">
        <!-- <EasyVisual
          v-if="
            !isJustLook && showWhich === 'visualJson' && isEasyMode(copySchema)
          "
          v-model:value="jsonObj"
          :schema="copySchema"
          :disabled="disabled"
        /> -->
        <JsonSchemaData
          v-if="!isJustLook && showWhich === 'visualJson'"
          :json-schema="copySchema"
          v-model="resultJson"
          :mode="typeMode"
          :disabled="disabled"
        ></JsonSchemaData>
        <CodeEditor
          v-else
          v-model="jsonStr"
          :type="[, jsonType]"
          :disabled="disabled"
          @change="changeJsonStr"
        />
      </div>
      <div class="codeEditor" v-show="radio === 'double'">
        <!-- <CodeEditor
          :modelValue="JSON.stringify(copySchema, null, 2)"
          :type="[, 'oneDark']"
          :disabled="true"
        /> -->
        <a-form-item-rest>
          <JsonSchema :isShowIcon="false" isDisabled :data="copySchema" />
        </a-form-item-rest>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { JSONSchemaFaker } from 'json-schema-faker'
import JsonSchema from './index.vue'
import { jsonSchemaToJSON } from './util'
// import VisualJson from './VisualJson/index.vue'
// import EasyVisual from './EasyVisual/index.vue'
import { isEasyMode } from './EasyVisual/setup'

interface SchemaInt {
  jsonType?: 'oneDark' | 'default'
  modelValue: any
  schema: any
  disabled?: boolean
  isJustLook?: boolean
  mode?: 'string' | 'object'
}
const $emit = defineEmits(['update:modelValue', 'change'])
const $props = withDefaults(defineProps<SchemaInt>(), {
  modelValue: () => ({}),
  schema: () => ({}),
  disabled: false,
  isJustLook: false,
  jsonType: 'default',
})
const { isJustLook, schema, disabled, mode, modelValue, jsonType } =
  toRefs($props)

const radio = ref('single')
// const modeConfig = reactive({
//   group: [
//     { label: '单', value: 'single' },
//     { label: '双', value: 'double' },
//   ],
// })
// const showWhich = ref(disabled.value ? 'codeEditor' : 'visualJson')
const showWhich: any = ref('codeEditor')
watch(
  schema,
  (cs: any) => {
    showWhich.value = isEasyMode(cs) ? 'visualJson' : 'codeEditor'
  },
  {
    immediate: true,
    deep: true,
  }
)
// const easyMode = computed(() => {
//   return isEasyMode(schema.value)
// })
function showWhichFn(val: string) {
  showWhich.value = val
  // if (val !== 'codeEditor') {
  //   jsonObj.value = {}
  // }
}

const resultJson = useVModel($props, 'modelValue', $emit)
const typeMode = computed(() => {
  if (mode?.value) return mode.value
  if (typeof toRaw(modelValue.value) === 'object') return 'object'
  return 'string'
})
const jsonStr =
  typeMode.value === 'object'
    ? computed({
        get() {
          return resultJson.value
            ? JSON.stringify(resultJson.value, null, 2)
            : ''
        },
        set(val: string) {
          let obj
          try {
            obj = JSON.parse(val)
          } catch {
            return
          }
          resultJson.value = obj
        },
      })
    : computed({
        get() {
          if (typeof resultJson.value === 'string') {
            return resultJson.value
          }
          return JSON.stringify(resultJson.value, null, 2)
        },
        set(val: string) {
          resultJson.value = val
        },
      })

const copySchema = computed(() => {
  const schemaData = $cloneDeep(schema.value)
  if (schemaData.$schema) {
    delete schemaData.$schema
  }
  return schemaData
})
function autoCreateHandle(isValue = true) {
  let json = JSON.parse(jsonSchemaToJSON(schema.value))
  if (!isValue) {
    json = $mapFilter(json, ({ value }: any, T: symbol) => {
      if (
        ['boolean', 'number', 'string', 'null', 'undefined'].includes(
          typeof value
        )
      ) {
        return '&&&&&&'
      }
      return T
    })
    json = JSON.stringify(json, null, 2)
    jsonStr.value = json.replace(/"&&&&&&"/g, '')
    changeJsonStr()
    return
  }
  jsonStr.value = JSON.stringify(json, null, 2)
  changeJsonStr()
}
const changeJsonStr = () => {
  nextTick(() => {
    $emit('change')
  })
}
</script>

<style scoped lang="scss">
.schema-to-json {
  .auto-create {
    cursor: pointer;
    &:hover {
      color: var(--galaxy-primary-color);
    }
  }
  .content {
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .codeEditor {
    &:nth-child(2) {
      margin-left: 10px;
    }
    overflow-y: auto;
    height: 1900px;
    flex: 1;
  }
}
.icon {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e7f0f8;
  }
}
</style>
