<template>
  <div>
    <a-input
      allowClear
      @pressEnter="search"
      v-bind="{ placeholder: '请输入关键字，进行模糊搜索', ...$attrs }"
      v-model:value="keyString"
    >
      <template #prefix>
        <Icons
          style="cursor: pointer; color: #bbcedf"
          icon="pure-search"
          @click="search"
        />
      </template>
    </a-input>
  </div>
</template>
<script setup lang="ts">
const $emit = defineEmits(['search', 'update:value'])
const $attrs = useAttrs()

const keyValue = ref<string>('')
const keyString = computed<any>({
  get() {
    if (Object.prototype.hasOwnProperty.call($attrs, 'value')) {
      return $attrs.value
    }
    return keyValue.value
  },
  set(val) {
    if (Object.prototype.hasOwnProperty.call($attrs, 'value')) {
      $emit('update:value', val)
    } else {
      keyValue.value = val
    }
  },
})
function search(e: any) {
  $emit('search', $attrs.value ?? keyValue.value, e)
}
</script>
<style scoped lang="scss"></style>
