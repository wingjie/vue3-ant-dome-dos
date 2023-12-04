<template>
  <div class="cell">
    <!-- <div class="iconBox">
      <div class="inner" @click="fn">
        <div class="shape">
          <span>{{ nodeData.cell.label }}</span>
        </div>
      </div>
    </div> -->
    <div class="main">
      <span v-if="!showInput" @dblclick="showInput = true">{{
        nodeData?.msg?.cell?.label ?? nodeData.cell.label
      }}</span>
      <input
        v-else
        style="width: 100%; color: black"
        :value="label"
        @change="change"
        @blur="fn"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'

// const getGraph = inject('getGraph')
const getNode = inject<any>('getNode')
let node: any = ''
// let graph = ''
const nodeData = ref<any>({
  cell: {
    label: '',
  },
})
const label = ref()
const showInput = ref(false)

function fn() {
  console.log('nodeCell', 'data')
  console.log('nodeData.value', nodeData.value)
  // nodeData.value.cell = { label: label.value }
}

function change(e) {
  const val = e.target.value
  nodeData.value.cell = { label: val }
  showInput.value = false
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
// .iconBox {
//   width: 100%;
//   height: 100%;
//   position: relative;
// }
// .inner {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   font-size: 10px;
// }

// .x6-node-selected .inner .shape {
//   box-shadow: rgba(95, 149, 255, 0.5) 0px 0px 0px 4px;
// }
// .inner:hover .shape {
//   border: 2px #5f95ff solid;
// }
// .shape {
//   position: absolute;
//   display: inline-block;
//   background: #eff4ff;
//   width: 100%;
//   height: 100%;
//   border: 1px #5f95ff solid;
//   overflow: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
.main {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #25b7db;
  box-shadow: 0px 4px 24px 0px #90c7d4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
