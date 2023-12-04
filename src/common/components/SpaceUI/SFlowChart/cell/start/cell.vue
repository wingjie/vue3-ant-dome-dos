<template>
  <div class="cell">
    <div class="main">创建需求</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'

// const getGraph = inject('getGraph')
const getNode = inject<any>('getNode')
let node: any = ''
const nodeData = ref<any>({
  cell: {
    label: '',
  },
})
function init() {
  node = getNode()
  nodeData.value = node.getData()
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
.main {
  width: 100%;
  height: 100%;
  // border-radius: 50%;
  background-image: url('../../../../../assets/flow-start.png');
  color: #05586c;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
