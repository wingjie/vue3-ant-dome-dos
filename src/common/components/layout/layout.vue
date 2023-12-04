<template>
  <div class="layout-box">
    <a-spin :spinning="loading">
      <div class="header-top" v-if="formTop.show !== false && $slot.formTop">
        <slot name="formTop"></slot>
      </div>
      <div
        :class="['header', { 'border-top': $slot.formTop }]"
        v-if="form.show !== false && $slot.form"
        v-show="show"
      >
        <slot name="form"></slot>
        <div class="header-b" v-if="$slot.formTop">
          <SvgIcon
            name="search-up"
            class="search-up"
            fontSize="100px"
            @click="show = !show"
          ></SvgIcon>
        </div>
      </div>
      <div class="header-null" v-show="!show" v-if="$slot.form">
        <SvgIcon
          name="search-unfold"
          fontSize="100px"
          class="search-up"
          @click="show = !show"
        ></SvgIcon>
      </div>
      <div
        :class="[
          'handle',
          'flex',
          {
            'handle-null': !(
              $slot.handleIn ||
              $slot.handleOut ||
              $slot.handleSearch
            ),
          },
        ]"
        v-if="handle.show !== false"
      >
        <a-space :size="handle.size || 15">
          <slot name="handleIn"> </slot>
        </a-space>
        <slot name="handleOut"></slot>
        <div class="flex">
          <a-space :size="handle.size || 15">
            <slot name="handleInRight"> </slot>
          </a-space>
          <div
            style="
              width: 20vw;
              min-width: 200px;
              max-width: 400px;
              margin-left: auto;
            "
            v-if="$slot.handleSearch"
          >
            <slot name="handleSearch"> </slot>
          </div>
        </div>
      </div>
      <slot name="content" v-if="!full"></slot>
      <FullHeightVue v-else>
        <template #content>
          <slot name="content"></slot>
        </template>
      </FullHeightVue>
    </a-spin>
    <UpModal v-if="upModal" v-model="upModal.visible" v-bind="upModal" />
  </div>
</template>
<script setup lang="ts">
import FullHeightVue from './FullHeight.vue'

const $slot = useSlots()
const show = ref(!$slot.formTop)
provide('isInLayout', Boolean($slot.formTop))

interface propIn {
  loading?: boolean
  upModal?: {
    visible: boolean
    onOk?: any
    onDown?: any
    [p: string]: any
  }
  formTop?: {
    header?: string
    show?: boolean
    [p: string]: any
  }
  form?: {
    header?: string
    show?: boolean
    [p: string]: any
  }
  handle?: {
    size?: number
    show?: boolean
    [p: string]: any
  }
  content?: {
    header?: string
  }
  full?: boolean
}
const props = withDefaults(defineProps<propIn>(), {
  handle: () => ({ size: 15, show: true }),
  content: () => ({ header: '列表' }),
  form: () => ({ show: true }),
  formTop: () => ({ show: true }),
  full: true,
  loading: false,
})
const {
  formTop,
  form,
  handle,
  upModal,
  full,
  loading,
  //  content
} = toRefs(props)

// const activeFlowKey = ref(['1', '2'])
</script>
<style>
div[class*='tabs-content'] > div > div > div.layout-box {
  padding: 4px 0 0 0;
}
</style>
<style scoped lang="scss">
.layout-box {
  .header {
    padding: 0;
  }
  padding: 20px $main-content-mp $main-content-mp;
  & > div:first-child {
    margin-top: 0;
  }
  .header-top {
    border-radius: 8px;
    margin-top: 24px;
  }
  .border-top {
    padding-top: 16px;
    border-top: 1px solid #dbe6f1;
  }
  .search-up {
    width: 100px;
    height: 20px;
    margin: 0 auto -16px;
    cursor: pointer;
  }
  .header-null,
  .header-b {
    padding: 0 0 16px;
    margin: 0 auto;
    display: flex;
    align-content: center;
    justify-content: center;
  }
  .header-null {
    border-top: 1px solid #dbe6f1;
  }
  .handle {
    width: 100%;
    margin: 0px 0 20px;
    :deep(.flex) button {
      margin: 0;
    }
    &.handle-null {
      margin: 0px 0 4px;
    }
  }
  .flex {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  & .content > :deep(.ant-collapse-content > .ant-collapse-content-box) {
    padding-top: 0;
  }
}
</style>
