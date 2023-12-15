<template>
  <div>
    <a-row class="j-row">
      <a-col class="col attr">{{ field.key }}</a-col>
      <a-col class="col is-required">{{ isRequired(field.key) }}</a-col>
      <a-col class="col type">{{ items.type }}</a-col>
      <a-col class="col remark">{{ field.item.description }}</a-col>
      <a-col class="col value"></a-col>
      <SvgIcon class="ope-btn" name="pure-operation-add" @click="addHandle" />
    </a-row>
    <div>
      <div class="array-item-list" v-if="currentValue.length">
        <div
          class="array-item"
          v-for="(item, index) in currentValue"
          :key="index"
        >
          <SvgIcon
            class="ope-btn remove-btn"
            name="pure-disable"
            @click="removeHandle(index)"
          />
          <ObjectInput
            v-model:value="currentValue[index]"
            v-if="items.type === 'object'"
            :properties="items.properties"
            :main="items"
            @change="change"
          ></ObjectInput>
          <ArrayInput
            v-model:value="currentValue[index]"
            v-else-if="items.type === 'array'"
            :items="items.items"
            :field="{ item: items, key: 'items' }"
            @change="change"
          ></ArrayInput>
          <a-row v-else class="j-row">
            <a-col class="col attr">{{ item }}</a-col>
            <a-col class="col is-required">{{ item.required }}</a-col>
            <a-col class="col type">{{ item.type }}</a-col>
            <a-col class="col remark">{{ item.description }}</a-col>
            <a-col class="col value">
              <BaseInput :field="index" @change="arrayChange"></BaseInput>
            </a-col>
          </a-row>
          <div v-if="index !== currentValue.length - 1" class="division-line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import ObjectInput from './ObjectInput.vue'

interface PropsInt {
  items: any
  value: any
  field?: any
  required?: any
}
const $emit = defineEmits(['update:value', 'change'])
const $props = withDefaults(defineProps<PropsInt>(), {
  items: () => ({}),
  value: () => [],
  field: () => ({
    key: 'items',
    item: {},
  }),
})
const { value, items, field } = toRefs($props)

const currentValue: any = ref([])

const isRequired = (key: any) => {
  const { required = [] } = field.value
  const bol = required.some((i: any) => i === key)
  return bol ? '是' : '否'
}

watch(
  value,
  (v: any) => {
    console.log('v', v)
    currentValue.value = v instanceof Array ? v : []
  },
  {
    immediate: true,
    deep: true,
  }
)
function addHandle() {
  currentValue.value.push({})
  $emit('update:value', currentValue.value)
  $emit('change', currentValue.value)
}
function removeHandle(index: any) {
  currentValue.value = currentValue.value.filter(
    (item: any, i: any) => i !== index
  )
  $emit('update:value', currentValue.value)
  $emit('change', currentValue.value)
}
function arrayChange(key: any, val: any) {
  currentValue.value[key] = val
  $emit('update:value', currentValue.value)
  $emit('change', currentValue.value)
}
function change() {
  $emit('update:value', currentValue.value)
  $emit('change', currentValue.value)
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
