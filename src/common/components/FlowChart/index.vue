<template>
  <div class="chart-area">
    <div class="flow-chart" ref="flowChartRef"></div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-extraneous-dependencies
import { Graph } from '@antv/x6'
// eslint-disable-next-line import/no-extraneous-dependencies
import { cloneDeep } from 'lodash-es'

// 流程图配置
const defaultOptions = {
  // 第一个点的开始位置 (px)
  start: 400,
  // 节点的间隔(px)
  step: 100,
  // 默认的轴坐标 (px)
  axis: 100,
}
// 节点状态和颜色
const nodeStatus: any = {
  NOT_RUN: { label: '未运行', color: '#ccc', value: 'NOT_RUN' },
  RUNNING: { label: '运行中', color: '#1890ff', value: 'RUNNING' },
  COMPLETED: { label: '完成', color: '#52c41a', value: 'COMPLETED' },
  STOPPED: { label: '停止', color: '#ff4d4f', value: 'STOPPED' },
}

interface flowProp {
  data?: any
  current?: any
  config?: any
}
const $props = withDefaults(defineProps<flowProp>(), {
  data: () => {
    return {
      nodes: [],
      edges: [],
    }
  },
  current: () => ({ operations: [] }),
  config: () => ({}),
})
const { data, current, config }: any = toRefs($props)
const flowOriginData = computed(() => {
  const baseNodeInfo = {
    shape: 'ellipse',
    width: 18,
    height: 18,
    attrs: {
      body: {
        stroke: '#bbb',
        fill: '#ccc',
      },
      label: {
        refX: 0.5,
        refY: '100%',
        refY2: 4,
        textAnchor: 'middle',
        textVerticalAnchor: 'top',
      },
    },
  }
  const lineAttr = {
    line: {
      stroke: '#ccc',
    },
  }
  const { nodes, edges } = createFlowData(data.value)
  return {
    nodes: nodes.map((i: any) => {
      return { ...cloneDeep(baseNodeInfo), ...i }
    }),
    edges: edges.map((i: any) => {
      return { attrs: cloneDeep(lineAttr), ...i }
    }),
  }
})

let chartInstance: any = null
const flowChartRef = ref()
onMounted(() => {
  initChart()
})
function initChart() {
  const { width } = config.value
  chartInstance = new Graph({
    container: flowChartRef.value,
    height: 200,
    width: width || 1000,
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    },
    interacting: false,
  })
  upDateChart()
}
// 根据节点状态获取节点颜色
function getNodeColorByStatus(status: any) {
  const color = {
    fill: nodeStatus.NOT_RUN.color,
    stroke: nodeStatus.NOT_RUN.color,
  }
  const matchStatus = nodeStatus[status]
  if (matchStatus) {
    color.fill = matchStatus.color
    color.stroke = matchStatus.color
  }
  return color
}
// 合并参数配置
function mergeOptions(options: any) {
  const opt = options || {}
  return { ...defaultOptions, ...opt }
}
// 根据元素节点数据生成节点和边
function createFlowData(nodeOrigin: any) {
  const {
    nodes = [],
    specialNode = [],
    specialEdges = [],
    options = [],
  } = nodeOrigin
  const edges: any = []
  const mergeOpt = mergeOptions(options)
  nodes.forEach((i: any, index: any) => {
    const currentItem = i
    const nextItem = nodes[index + 1]
    currentItem.x = mergeOpt.step * index + mergeOpt.start
    currentItem.y = mergeOpt.axis
    if (nextItem) {
      edges.push({ source: currentItem.id, target: nextItem.id })
    }
  })
  return {
    nodes: [...nodes, ...specialNode],
    edges: [...edges, ...specialEdges],
  }
}
// 变量节点流程处理节点状态变化
function renderNodeStatus() {
  const flowData: any = cloneDeep(flowOriginData.value)
  const statusList = toRaw(current.value)
  const operations: any = statusList.operations || []
  const { currentNode }: any = statusList
  const originNodes: any = flowData.nodes
  const originEdges: any = flowData.edges
  operations.forEach((op: any) => {
    const { to, from, afterStatus, beforeStatus } = op
    const matchNodeTo = originNodes.find((i: any) => i.id === to)
    const matchNodeForm = originNodes.find((i: any) => i.id === from)
    const matchEdge = originEdges.find(
      (i: any) => i.source === from && i.target === to
    )
    if (matchNodeTo) {
      matchNodeTo.attrs.body = getNodeColorByStatus(afterStatus)
    }
    if (matchEdge) {
      matchEdge.attrs.line = { stroke: nodeStatus.COMPLETED.color }
    }
    if (matchNodeForm) {
      matchNodeForm.attrs.body = getNodeColorByStatus(beforeStatus)
    }
  })
  if (currentNode) {
    const matchCurrent = originNodes.find((i: any) => i.id === currentNode)
    if (matchCurrent) {
      const lastItem = operations.at(-1)
      // 节点直接结束时没有 afterStatus
      if (lastItem.beforeStatus)
        matchCurrent.attrs.body = getNodeColorByStatus(
          nodeStatus[lastItem.beforeStatus].value
        )
      if (lastItem.afterStatus)
        matchCurrent.attrs.body = getNodeColorByStatus(
          nodeStatus[lastItem.afterStatus].value
        )
    }
  }
  return flowData
}
function upDateChart() {
  chartInstance.fromJSON(renderNodeStatus())
}
watch(
  current,
  () => {
    if (chartInstance) {
      upDateChart()
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
watch(
  data,
  () => {
    if (chartInstance) {
      upDateChart()
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<style scoped lang="scss">
.span {
  color: #52c41a;
}
</style>
