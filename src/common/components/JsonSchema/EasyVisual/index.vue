<template>
  <div class="easy-visual json-view-mode">
    <a-row class="j-row">
      <a-col class="header attr">属性</a-col>
      <a-col class="header is-required">是否必须</a-col>
      <a-col class="header type">类型</a-col>
      <a-col class="header remark">备注</a-col>
      <a-col class="header value">参数值</a-col>
    </a-row>
    <a-row class="j-row">
      <a-col class="col attr">root</a-col>
      <a-col class="col is-required">是</a-col>
      <a-col class="col type">{{ schema.type }}</a-col>
      <a-col class="col remark">{{ schema.description }}</a-col>
      <a-col class="col value"></a-col>
    </a-row>
    <template v-for="(item, key) in schema.properties" :key="key">
      <a-row class="j-row">
        <a-col class="col attr">{{ key }}</a-col>
        <a-col class="col is-required">{{ isRequired(key) }}</a-col>
        <a-col class="col type">{{ getType(item.type) }}</a-col>
        <a-col class="col remark">{{ item?.description }}</a-col>
        <a-col class="col value">
          <div class="base-area">
            <a-input-number
              v-if="getType(item.type) === 'number'"
              class="base-input"
              v-model:value="jsonValue[key]"
              @change="(v) => inputChange(v, key)"
              :placeholder="`请输入${key}`"
              :disabled="disabled"
            ></a-input-number>
            <a-switch
              v-else-if="getType(item.type) === 'boolean'"
              v-model:checked="jsonValue[key]"
              @change="(v) => inputChange(v, key)"
            >
            </a-switch>
            <a-input
              v-else
              class="base-input"
              v-model:value="jsonValue[key]"
              @change="(v) => inputChange(v, key)"
              :placeholder="`请输入${key}`"
              :disabled="disabled"
            ></a-input>
          </div>
        </a-col>
      </a-row>
    </template>
  </div>
</template>

<script setup lang="ts">
interface PropsInt {
  schema: any
  value: any
  disabled?: boolean
  onChange?: (value: any) => void
}
const $props = withDefaults(defineProps<PropsInt>(), {
  schema: {},
  value: {},
  onChange: () => {},
  disabled: false,
})
const $emit = defineEmits(['update:value', 'change'])
const { schema, value, disabled } = toRefs($props)
const jsonValue: any = ref({})
function isRequired(key: string) {
  return schema.value?.required?.includes(key) ? '是' : '否'
}

function inputChange() {
  const updateData: any = {}
  // eslint-disable-next-line guard-for-in
  for (const k in jsonValue.value) {
    const item = jsonValue.value[k]
    if (item !== '' && item !== null && item !== undefined) {
      updateData[k] = jsonValue.value[k]
    }
  }
  $emit('update:value', updateData)
  $emit('change', updateData)
}
watch(
  value,
  () => {
    // eslint-disable-next-line guard-for-in
    setPropsData()
  },
  {
    immediate: true,
    deep: true,
  }
)
function getType(schemaType: any) {
  if (schemaType instanceof Array) {
    const list = ['boolean', 'number', 'string', 'undefined', 'array', 'object']
    return list.find((i: any) => schemaType.includes(i))
  }
  return schemaType
}
function setPropsData() {
  const { properties = {} } = schema.value
  const current = value.value
  Object.keys(properties).forEach((k: any) => {
    jsonValue.value[k] = current ? current[k] : ''
  })
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
