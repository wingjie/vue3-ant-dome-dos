<template>
  <div class="card-block">
    <header @click="showFn">
      <div class="icon-area" v-if="isShowIcon">
        <slot name="icon">
          <span class="i blue"></span>
          <span class="i cyan"></span>
        </slot>
      </div>
      <div class="title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="!disabled" class="arrow">
        <i-ant-design-caret-down-filled class="icon" :class="{ down: show }" />
      </div>
      <div class="counter" v-if="count !== undefined">{{ count }}</div>
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
  count?: number
  isShowIcon?: boolean
}
const $emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<propMsg>(), {
  title: '',
  disabled: false,
  isShowIcon: true,
})
const { title, disabled, button, count } = toRefs(props)
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
header {
  width: 100%;
  box-sizing: border-box;
  height: 48px;
  display: flex;
  align-items: center;
  background-color: transparent;
  border-bottom: 1px solid #dbe6f1;
  cursor: v-bind(cursor);
  .title {
    font-size: 12px;
    font-weight: bold;
    color: var(--galaxy-text-main-color);
    line-height: 20px;
  }
}
.icon-area {
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 4px;
  .i {
    position: absolute;
    display: block;
    width: 4px;
    height: 10px;
    border-radius: 2px;
  }
  .blue {
    left: 6px;
    top: 4px;
    background-color: var(--galaxy-primary-color);
  }
  .cyan {
    left: 10px;
    top: 7px;
    background-color: var(--galaxy-success-color);
  }
}
.right {
  margin-left: auto;
}
.arrow {
  display: flex;
  align-items: center;
  margin-left: 10px;
  .icon {
    font-size: 13px;
    color: #aeafaf;
    transition: all 0.3s;
    &.down {
      transform: rotate(180deg);
    }
  }
}
main {
  overflow: hidden;
  padding: $main-content-mp;
}
.counter {
  padding: 0 9px;
  height: 20px;
  background-color: #dbe6f1;
  font-size: 14px;
  color: #5b748b;
  font-weight: 400;
  line-height: 20px;
  border-radius: 10px;
  margin-left: 6px;
}
</style>
