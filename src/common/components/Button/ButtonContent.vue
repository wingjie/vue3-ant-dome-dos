<template>
  <div class="inner-btn-area">
    <slot
      :name="`${item.key}B`"
      :size="sizeCom"
      :type="type || item.type"
      v-bind="{ ...$attrs, ...item?.attr }"
      @click="$attrs[`on${toUpper(item.key)}`]"
    ></slot>
    <div v-if="more">
      <slot :name="`${item.key}IB`">
        <template v-if="item.icon">
          <Icons v-if="typeof item.icon === 'string'" :icon="item.icon"></Icons>
          <Icons v-else :icon="item.icon.key" v-bind="item.icon"></Icons>
        </template>
      </slot>
      <span style="padding: 0 2px">{{ item.text }}</span>
      <slot :name="`${item.key}IA`">
        <template v-if="item.iconA">
          <Icons
            v-if="typeof item.iconA === 'string'"
            :icon="item.iconA"
          ></Icons>
          <Icons v-else :icon="item.iconA.key" v-bind="item.iconA"></Icons>
        </template>
      </slot>
    </div>
    <a-button
      v-else-if="item.show"
      :size="sizeCom"
      :key="item.key"
      :type="item.type"
      v-bind="{ ...$attrs, ...item?.attr }"
      @click="$attrs[`on${toUpper(item.key)}`]"
    >
      <span class="row">
        <slot :name="`${item.key}IB`">
          <template v-if="item.icon">
            <Icons
              v-if="typeof item.icon === 'string'"
              :icon="item.icon"
            ></Icons>
            <Icons v-else :icon="item.icon.key" v-bind="item.icon"></Icons>
          </template>
        </slot>
        <span style="padding: 0 2px">{{ item.text }}</span>
        <slot :name="`${item.key}IA`">
          <template v-if="item.iconA">
            <Icons
              v-if="typeof item.iconA === 'string'"
              :icon="item.iconA"
            ></Icons>
            <Icons v-else :icon="item.iconA.key" v-bind="item.iconA"></Icons>
          </template>
        </slot>
      </span>
    </a-button>
    <slot
      :name="`${item.key}A`"
      :size="sizeCom"
      :type="type || item.type"
      v-bind="{ ...$attrs, ...item?.attr }"
    ></slot>
  </div>
</template>
<script setup lang="ts">
interface propMsg {
  item: any
  sizeCom: any
  type?: 'primary' | 'link' | undefined
  more?: boolean
}
// const emit = defineEmits([])
const props = withDefaults(defineProps<propMsg>(), {})
const { item, sizeCom, type, more } = toRefs(props)

const $attrs = useAttrs()

function toUpper(str: string) {
  return str.replace(/^\w/, (fStr) => fStr.toUpperCase())
}
</script>
<style scoped lang="scss">
.inner-btn-area {
  display: flex;
  align-content: center;
  & > button[class*='btn-link'][class*='btn-sm'] {
    padding: 0;
    margin: 0;
  }
  .row {
    display: flex;
  }
}
</style>
