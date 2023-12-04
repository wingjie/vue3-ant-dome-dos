<template>
  <div class="cell">
    <div class="iconBox">
      <div class="inner">
        <div class="shape">
          <!-- <span @click="fn" v-if="nodeData.cell.type !== 'TIMEER'">{{ nodeData.cell.label }}</span> -->
          <!-- <span @click="fn" v-if="isTexToverflow()">{{ nodeData.cell.label }}</span> -->
          <!-- :disabled="txt" -->
          <tooltip overlayClassName="box-item" color="dark" placement="topLeft">
            <template #title v-if="txt.length > 8">{{ txt }}</template>
            <span id="txt" class="txt">{{ txt }}</span>
          </tooltip>
          <!-- <span v-istextoverflow class="txt">{{ txt }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue'
import { onMounted, ref, inject, computed } from 'vue'

// const getGraph = inject('getGraph')
const getNode = inject<any>('getNode')
const EVENTKEY: string[] = ['cell:click']
let node: any = ''
// let graph = ''
const nodeData = ref({
  cell: {
    label: '',
    type: '',
  },
})
const txt = computed(() => nodeData.value.cell.label)
// console.log(useStore(), 'storestorestore')

function init() {
  node = getNode()
  nodeData.value = node.getData()
  node.setData({
    EVENTAPPOINT: () => {},
    EVENTKEY,
  })
}
onMounted(() => {
  init()
  // 监听数据改变事件
  node.on('change:data', ({ current }: any) => {
    nodeData.value = current
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
  box-sizing: border-box;
  position: absolute;
  border-radius: 18px;
  display: inline-block;
  background: #eff4ff;
  width: 100%;
  height: 100%;
  border: 1px #5f95ff solid;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  text-align: center;
}
span.txt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
