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
    <ObjectInput
      v-if="schema.type === 'object'"
      v-model:value="currentValue"
      :properties="schema.properties"
      :main="schema"
      @change="change"
    ></ObjectInput>
    <ArrayInput
      v-else-if="schema.type === 'array'"
      v-model:value="currentValue"
      :items="schema.items"
      :main="{ item: schema, key: 'items' }"
      @change="change"
    ></ArrayInput>
    <BaseInput
      v-else
      v-model:value="currentValue"
      :field="schema"
      @change="baseChange"
    ></BaseInput>
  </div>
</template>

<script setup lang="ts">
import ObjectInput from './ObjectInput.vue'
import BaseInput from './BaseInput.vue'
import ArrayInput from './ArrayInput.vue'

interface PropsInt {
  schema: any
  value: any
  onChange?: (value: any) => void
}
const $props = withDefaults(defineProps<PropsInt>(), {
  schema: {},
  value: {},
  onChange: () => {},
})
const $emit = defineEmits(['update:value', 'change'])
const { schema } = toRefs($props)

const currentValue = ref()

function change() {
  $emit('update:value', currentValue.value)
}
function baseChange(key: any, val: any) {
  currentValue.value[key] = val
  $emit('update:value', currentValue.value)
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
