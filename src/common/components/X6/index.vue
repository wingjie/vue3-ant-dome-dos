<template>
  <div class="containers">
    <div id="stencil" v-if="isShowStencil"></div>
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, defineProps, ref, defineExpose } from 'vue'
// import { ElMessageBox } from 'element-plus'
import { insertCss } from 'insert-css'

import installStencil from './iconConfig' // 初始化左边图标
import { installCutKey, bindEvent, eventConfigType } from './shortcutKeyConfig'
import installCss from './insertCss'
import installGraph from './graphConfig'

interface propsType {
  flowData?: {
    [p: string]: any
  }
  eventConfig?: eventConfigType
  baseConfig?: {
    [p: string]: any
  }
  setupCell?: {
    base?: { [p: string]: any }
    async?: { [p: string]: any }
    stencil?: { [p: string]: any }
    groups?: { [p: string]: any }[] // 完全替换的逻辑，其他的参数为合并的逻辑
    [p: string]: any
  }
  css?: string
  action?: 'setup' | 'look'
}

const props = withDefaults(defineProps<propsType>(), {
  flowData: () => ({}),
  eventConfig: () => ({}),
  baseConfig: () => ({}),
  setupCell: () => ({}),
  action: 'look',
})
const { flowData, eventConfig, action, baseConfig, setupCell, css } =
  toRefs(props)

// todo：主体
let graph: any = null // 初始化画布
const graphConfig = {
  ...baseConfig.value,
  container: 'container',
}

// todo: 左侧
const stencilConfig: any = () => {
  return {
    ...(setupCell.value?.stencil || {}),
    target: graph,
    bindDom: 'stencil',
  }
}
const isShowStencil = computed(() => action.value !== 'look')

function initData(data: any) {
  graph.fromJSON(data)
}

function preWork() {
  // 这里协助演示的代码，在实际项目中根据实际情况进行调整
  installCss()
  if (css?.value) {
    insertCss(css.value)
  }
}

onMounted(() => {
  preWork() // 为了协助代码演示
  // graph.use(ElementPlus, { locale, size: 'default' })
  // console.log('>>>>>>>...', graph.isPannable())
})
function getData() {
  return graph.toJSON()
}
function setup() {
  graph = installGraph(graphConfig) // 实例化画布
  installStencil(stencilConfig(), setupCell.value) // 初始化Stencil
  installCutKey(graph) // 快捷键与事件
  bindEvent(graph, eventConfig.value) // 绑定事件
}
function lookPower() {
  graph = installGraph({ ...graphConfig, interacting: false }) // 实例化画布
  installStencil(stencilConfig(), setupCell.value) // 初始化Stencil
  graph.disableKeyboard() // 禁止使用快捷键
  graph.disablePanning() // 禁止画布平移拖拽
}
function handPower() {
  graph.enableKeyboard() // 启用使用快捷键
  graph.enablePanning() // 启用画布平移
}
watch(
  () => action.value,
  (val) => {
    nextTick(() => {
      if (val === 'look') {
        return lookPower()
      }
      setup()
      handPower()
    })
  },
  {
    immediate: true,
  }
)
watch(
  () => flowData.value,
  () => {
    nextTick(() => {
      initData(flowData.value) // 画面回显
    })
  },
  {
    immediate: true,
  }
)
// 暴露出去
defineExpose({
  getData,
  initData,
  lookPower,
  handPower,
})
</script>

<style scoped lang="less">
.containers {
  position: relative;
  display: flex;
  height: 87vh;
}
#stencil {
  height: 100%;
  display: inline-block;
  // z-index: 1;
}
#container {
  display: inline-block;
  flex: 1;
  height: 100%;
}
</style>
./shortcutKeyConfig
