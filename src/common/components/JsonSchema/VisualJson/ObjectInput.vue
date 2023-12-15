<template>
  <div class="object-input">
    <div v-for="(item, key) in properties" :key="key">
      <ObjectInput
        v-if="item.type === 'object'"
        v-model:value="currentValue[key]"
        :properties="item.properties"
        @change="change"
      />
      <ArrayInput
        v-else-if="item.type === 'array'"
        v-model:value="currentValue[key]"
        :items="item.items"
        :field="{ item, key, required: main.required }"
        @change="change"
      />
      <a-row v-else class="j-row">
        <a-col class="col attr">{{ key }}</a-col>
        <a-col class="col is-required">{{ isRequired(key) }}</a-col>
        <a-col class="col type">{{ item.type }}</a-col>
        <a-col class="col remark">{{ item.description }}</a-col>
        <a-col class="col value">
          <BaseInput :field="key" @change="change" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import ArrayInput from './ArrayInput.vue'

interface PropsInt {
  main?: any
  properties: any
  value: any
  deep?: number
}
const $emit = defineEmits(['update:value', 'change'])
const $props = withDefaults(defineProps<PropsInt>(), {
  properties: () => ({}),
  value: () => ({}),
  main: () => ({}),
})
const { value, properties, main } = toRefs($props)

const currentValue: any = ref({})
const isRequired = (key: any) => {
  const { required = [] } = main.value
  const bol = required.some((i: any) => i === key)
  return bol ? '是' : '否'
}
watch(
  value,
  (v) => {
    currentValue.value = v
  },
  {
    immediate: true,
    deep: true,
  }
)
function change(key: any, val: any) {
  currentValue.value[key] = val
  console.log(key, val)
  $emit('update:value', currentValue.value)
  $emit('change', currentValue.value)
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
