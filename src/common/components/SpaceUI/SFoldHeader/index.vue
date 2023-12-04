<template>
  <div class="fold-header">
    <header @click="showFn">
      <div v-if="!disabled" class="icon-area">
        <i-mingcute-add-fill v-if="!show" class="i plus" />
        <i-mingcute-minimize-fill v-else class="i minus" />
      </div>
      <div class="title">
        <slot name="title">{{ title }}</slot>
      </div>
      <span class="right">
        <slot name="handle">
          <SButtonGroup v-if="button" v-bind="button"></SButtonGroup>
        </slot>
      </span>
    </header>
    <transition name="slide-fade">
      <main v-show="slot.default && show">
        <slot name="default"></slot>
      </main>
    </transition>
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
@import 'src/common/style/custom-animation.scss';
.fold-header {
  margin-bottom: 2px;
}
header {
  display: flex;
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  align-items: center;
  background-color: #e7f0f8;
  border-radius: var(--galaxy-border-radius);
  cursor: v-bind(cursor);
  .title {
    font-size: 12px;
    color: var(--galaxy-text-main-color);
    line-height: 42px;
    margin-left: 4px;
  }
}
.icon-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-left: 8px;
  .i {
    font-size: 7px;
    &.plus {
      color: #8ea1b3;
    }
    &.minus {
      color: var(--galaxy-success-color);
    }
  }
}
.right {
  margin-left: auto;
}
main {
  overflow: hidden;
  padding: 6px 0;
}
</style>
