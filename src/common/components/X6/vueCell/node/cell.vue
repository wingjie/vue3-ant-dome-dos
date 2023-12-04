<template>
  <div class="cell">
    <div class="iconBox">
      <div class="inner" @click="fn">
        <div class="shape">
          <span>{{ nodeData.cell.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'

// const getGraph = inject('getGraph')
const getNode = inject<any>('getNode')
let node: any = ''
// let graph = ''
const nodeData = ref({
  cell: {
    label: '',
  },
})

function fn() {
  console.log('nodeCell', 'data')
}
function init() {
  node = getNode()
  nodeData.value = node.getData()
  // graph = getGraph()
}
onMounted(() => {
  init()
  // 监听数据改变事件
  node.on('change:data', ({ current }: { current: any }) => {
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
}
.inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 10px;
}

.x6-node-selected .inner .shape {
  box-shadow: rgba(95, 149, 255, 0.5) 0px 0px 0px 4px;
}
.inner:hover .shape {
  border: 2px #5f95ff solid;
}
.shape {
  position: absolute;
  display: inline-block;
  background: #eff4ff;
  width: 100%;
  height: 100%;
  border: 1px #5f95ff solid;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
