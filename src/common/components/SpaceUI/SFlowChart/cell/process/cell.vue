<template>
  <div class="cell">
    <div
      :class="[
        'main',
        {
          wait: nodeData?.refData?.status === 'wait',
          process: nodeData?.refData?.status === 'process',
          finish: nodeData?.refData?.status === 'finish',
          error: nodeData?.refData?.status === 'error',
        },
      ]"
    >
      <div class="ing" v-if="nodeData?.refData?.status === 'process'"></div>
      <span
        class="txt"
        @dblclick="showInput = true"
        :title="nodeData?.refData?.label ?? nodeData?.cell?.label"
        >{{ nodeData?.refData?.label ?? nodeData?.cell?.label }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'

// const getGraph = inject('getGraph')
const getNode = inject<any>('getNode')
let node: any = ''
// let graph = ''
const nodeData = ref<{
  refData?: {
    status: 'process' | 'wait' | 'finish' | 'error'
    label: string
    key: string
  }
  cell?: {
    label: string
  }
}>({
  cell: {
    label: '',
  },
})
const showInput = ref(false)
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
.main {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e7e7e7;
  color: #454545;
}
.wait {
  background: #e7e7e7;
  color: #454545;
}
.process {
  background-color: #f0fbfe;
  color: #454545;
  &:hover {
    box-shadow: 0px 4px 24px #8ee3f8;
  }
}
.finish {
  background-color: #25b7db;
  color: white;
  &:hover {
    box-shadow: 0px 4px 24px #8ee3f8;
  }
}

.error {
  background: #fff2f2;
  color: #be1a1a;
  &:hover {
    box-shadow: 0px 4px 24px #ebc6c6;
  }
}

.ing {
  position: absolute;
  width: 98px;
  height: 98px;
  background: url('../../../../../assets/underway.png') no-repeat center center;
  background-size: 85%;
  background-position: center;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation: rotate360 5s infinite linear;
}
@keyframes rotate360 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.txt {
  width: 90%;
  text-align: center;
  display: -webkit-box; /*将对象转为弹性盒模型展示*/
  -webkit-box-orient: vertical; /*设置弹性盒模型子元素的排列方式*/
  -webkit-line-clamp: 2; /*限制文本行数*/
  overflow: hidden; /*超出隐藏*/
}
</style>
