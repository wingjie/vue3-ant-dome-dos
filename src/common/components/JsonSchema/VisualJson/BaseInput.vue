<template>
  <div class="base-area">
    <a-input
      class="base-input"
      v-model:value="currentValue"
      @change="change"
      :placeholder="field"
    ></a-input>
  </div>
</template>

<script setup lang="ts">
interface PropInt {
  field: any
  value: any
}

const $emit = defineEmits(['update:value', 'change'])
const $props = withDefaults(defineProps<PropInt>(), {
  field: '',
  value: '',
})

const currentValue = ref('')

const { field, value } = toRefs($props)

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
function change() {
  $emit('update:value', currentValue.value)
  $emit('change', field.value, currentValue.value)
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
