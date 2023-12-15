<template>
  <div>
    <template v-if="currentSchema.type === 'object'">
      <a-row class="j-row" v-for="(item, key) in currentSchema.properties" :key="key">
        <a-row v-if="item.type === 'object'">
          <a-col class="col attr">{{ key }}</a-col>
          <a-col class="col is-required">{{ item.isRequired }}</a-col>
          <a-col class="col type">{{ item.type }}</a-col>
          <a-col class="col remark">{{ item.description }}</a-col>
          <a-col class="col value"></a-col>
          <ViewMode
            v-model:value="item.default"
            :schema="item"
            class="items-row"
            @change="(e) => valueInputChange(e, item, key)"
          ></ViewMode>
        </a-row>
        <template v-else>
          <a-col class="col attr">{{ key }}</a-col>
          <a-col class="col is-required">{{ item.isRequired }}</a-col>
          <a-col class="col type">{{ item.type }}</a-col>
          <a-col class="col remark">{{ item.description }}</a-col>
          <a-col class="col value">
            <a-input
              class="value-input"
              v-model:value="item.default"
              @change="(e) => valueInputChange(e, item, key)"
            ></a-input>
          </a-col>
        </template>
        {{ key }}{{ item }}
      </a-row>
    </template>
    <div class="items-row" v-if="currentSchema.type === 'array'">
      <a-row class="j-row">
        <a-col class="col attr">items</a-col>
        <a-col class="col is-required"></a-col>
        <a-col class="col type"></a-col>
        <a-col class="col remark"></a-col>
        <a-col class="col value">
          <div class="ope-area">
            <SvgIcon
              name="pure-add"
              class="ope-btn"
              @click="addHandle(currentSchema)"
            ></SvgIcon>
          </div>
        </a-col>
      </a-row>
      {{ currentSchema.default }}
      <template v-for="(si, index) in currentSchema.default" :key="index">
        <ViewMode
          v-model="currentSchema.default[index]"
          :schema="currentSchema.items"
          class="items-row"
        ></ViewMode>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'

interface SchemaInt {
  modelValue?: any
  schema: any
}
const $emit = defineEmits(['update:modelValue', 'change'])
const $props = withDefaults(defineProps<SchemaInt>(), {
  schema: () => ({}),
  modelValue: () => ({}),
})
const { schema, modelValue } = toRefs($props)

const current = ref()
const currentSchema = ref({})

function addHandle(obj: any) {
  obj.default.push({})
}
function valueInputChange(e: any, item: any, key: any) {
  const val = e.target.value
  const r = { ...modelValue.value, [key]: val }
  console.log('r', val, item, key)
  $emit('update:modelValue', r)
  $emit('change', e, item, key)
}
watch(
  modelValue,
  () => {
    current.value = modelValue.value
  },
  {
    deep: true,
    immediate: true,
  }
)
watch(
  schema,
  () => {
    const data = cloneDeep(schema.value)
    if (data.type !== 'object') {
      data.default = ''
      if (data.type === 'array') {
        data.default = []
      }
    }
    currentSchema.value = data
  },
  {
    deep: true,
    immediate: true,
  }
)
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
