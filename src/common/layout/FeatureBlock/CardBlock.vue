<template>
  <div>
    <header @click="showFn" :disabled="disabled">
      <slot name="icon"
        ><i-tabler-exclamation-circle
          style="vertical-align: sub; color: #108ee9; margin: 0 10px"
      /></slot>
      <slot name="title">{{ title }}</slot>
      <span class="right">
        <slot name="handle">
          <SButtonGroup v-if="button" v-bind="button"></SButtonGroup>
        </slot>
      </span>
    </header>
    <main v-show="slot.default && show">
      <slot name="default"></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
interface propMsg {
  title?: string
  disabled?: boolean
  button?: any
}
const $emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<propMsg>(), {
  title: '',
  disabled: false,
})
const { title, disabled, button } = toRefs(props)
const slot = useSlots()
const attrs = useAttrs()

const modelValueScope = ref(true)
const show = computed({
  get() {
    if (Object.prototype.hasOwnProperty.call(attrs, 'modelValue')) {
      return attrs.modelValue
    }
    return modelValueScope.value
  },
  set(val) {
    if (Object.prototype.hasOwnProperty.call(attrs, 'modelValue')) {
      $emit('update:modelValue', val)
    } else {
      modelValueScope.value = !modelValueScope.value
    }
  },
})
function showFn() {
  if (disabled.value) return
  show.value = !show.value
}
const cursor = computed(() => (!disabled.value ? 'pointer' : 'auto'))
</script>

<style scoped lang="scss">
header {
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  height: 34px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666666;
  background-color: #e6f3fc;
  border: 1px solid #d4f0fc;
  cursor: v-bind(cursor);
}
.right {
  margin-left: auto;
}
main {
  margin: 10px 0px;
  padding: 0px 30px;
}
</style>
