<template>
  <div class="json-view-mode">
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
    <ViewMode
      v-if="schema.type === 'array' || schema.type === 'object'"
      :schema="schema"
      v-model:value="schema.default"
    ></ViewMode>
  </div>
</template>

<script setup lang="ts">
import ViewMode from './ViewMode.vue'

interface SchemaInt {
  modelValue: any
  schema: any
  disabled?: boolean
}
const $emit = defineEmits(['update:modelValue', 'change'])
const $props = withDefaults(defineProps<SchemaInt>(), {
  modelValue: () => ({}),
  schema: () => ({}),
  disabled: false,
})
const { schema, disabled, modelValue } = toRefs($props)
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
