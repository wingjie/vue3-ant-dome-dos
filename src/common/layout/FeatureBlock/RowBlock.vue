<template>
  <div>
    <CardBlock v-bind="attrs" :button="defaultButtonConfig" v-model="show">
      <template #icon>
        <slot name="icon">
          <span class="icon">
            <i-ion-arrow-forward-circle-outline v-if="show" />
            <i-ion-arrow-down-circle-outline v-else />
          </span>
        </slot>
      </template>
      <template v-for="(value, name) of $slots" #[name]="slotData">
        <slot :name="name" v-bind="{ ...slotData }"></slot>
      </template>
    </CardBlock>
  </div>
</template>

<script setup lang="ts">
import CardBlock from './CardBlock.vue'
import { assign } from '@/common/utils/traverseTree'

interface propMsg {
  // title: string
  // disabled?: boolean
  button?: any
}
const $emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<propMsg>(), {
  // title: '',
  // disabled: false,
})
const { button } = toRefs(props)
const $slots = useSlots()
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
const defaultButtonConfig = ref({
  type: 'link',
})
if (button && button.value) {
  watch(
    () => button.value,
    () => {
      assign(defaultButtonConfig.value, button.value)
    },
    {
      immediate: true,
      deep: true,
    }
  )
}
</script>

<style scoped lang="scss">
.icon {
  margin: 0 10px;
  display: flex;
  align-items: center;
}
</style>
