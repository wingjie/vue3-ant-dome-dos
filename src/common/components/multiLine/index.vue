<template>
  <div class="box">
    <Line
      :config="config"
      :data="data"
      :showCount="showCount"
      :onOff="onOff"
      :header="header"
    ></Line>
    <span
      v-if="!header"
      style="
        position: absolute;
        right: -5px;
        top: 0px;
        cursor: pointer;
        font-size: 18px;
        color: #108de9;
      "
    >
      <slot :method="{ open, close }">
        <template v-if="showIcon">
          <i-tabler-chevrons-down v-if="onOff === 'off'" @click="open" />
          <i-tabler-chevrons-up v-else @click="close" />
        </template>
      </slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import Line from './line.vue'

interface propIn {
  data?: any[]
  config?: { [p: string]: any }
  showCount?: number | undefined
  header?: any
}
const props = withDefaults(defineProps<propIn>(), {
  config: () => ({}), // 配置
  data: () => [], // 数据
  showCount: 1, // 展示几行
  header: undefined,
})
const { config, data, showCount, header } = toRefs(props)

const onOff = ref('off')
const showIcon = computed(() => {
  return recursion(data.value, config.value)
})
function recursion(datas: any[], configs: { [x: string]: any }) {
  if (datas?.length > 1) {
    return true
  }
  let bool = false
  const rowConfigs = configs?.[configs?.configData]
  datas?.forEach((dataItem: any) => {
    const rowData = dataItem?.[configs.configData]
    bool = recursion(rowData, rowConfigs)
  })
  return bool
}
// ? 打开的方法
function open() {
  onOff.value = 'on'
}
// ? 关闭的方法
function close() {
  onOff.value = 'off'
}
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
}
.box {
  overflow: hidden;
}
div:last-child {
  border-bottom: none !important;
}
</style>
