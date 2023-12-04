<template>
  <div class="cell">
    <div class="iconBox">
      <!-- <svg version="1.1" width="66" height="36">
        <polygon
          fill="#EFF4FF"
          stroke="#5F95FF"
          stroke-width="1"
          points="0, 18 33, 0 66, 18 33, 36"
        ></polygon>
      </svg> -->
      <!-- <div class="shapeBox"></div> -->
      <div class="inner" @click="fn">
        <span>{{ nodeData.cell.label }}</span>
        <div class="shape">
          <!-- <span>{{ nodeData.cell.label }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'

// const getGraph = inject('getGraph')
const getNode = inject<any>('getNode')
let node: any = null
// let graph = ''
const nodeData = ref({
  cell: {
    label: '',
  },
})

function fn() {
  console.log('gateway', 'data')
}
function init() {
  node = getNode()
  nodeData.value = node.getData()
  // graph = getGraph()
}
onMounted(() => {
  init()
  // 监听数据改变事件
  node.on('change:data', ({ current }: any) => {
    nodeData.value = current.cell
  })
})
</script>

<style scoped lang="less">
.cell {
  width: 100%;
  height: 100%;
}
.iconBox {
  width: 100%;
  height: 100%;
  position: relative;
  // overflow: hidden;
}
.inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

// .iconBox:hover polygon {
//   stroke: '#5F95FF';
//   stroke-width: 2;
// }
.x6-node-selected polygon {
  stroke: #5f95ff;
  stroke-width: 2;
}

.x6-node-selected .inner .shape {
  box-shadow: rgba(95, 149, 255, 0.5) 0px 0px 0px 4px;
}
.inner:hover .shape {
  border: 2px #5f95ff solid;
}
.shape {
  position: absolute;
  left: 50%;
  top: 50%;
  background: #eff4ff;
  width: 33px;
  height: 33px;
  border: 1px #5f95ff solid;
  transform-origin: 0 0;
  transform: rotate(-45deg) skew(15deg, 15deg) translate(-50%, -50%);
  // overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
}
</style>
