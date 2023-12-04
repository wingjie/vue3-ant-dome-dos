<template>
  <div>
    <X6
      ref="x6Ref"
      :action="action"
      :setupCell="setupCell"
      :eventConfig="eventConfig"
      :flowData="data"
      :css="css"
      :baseConfig="{ grid: action === 'setup' }"
      v-bind="{
        style: {
          height: '300px',
          margin: 'auto',
          ...$attrs.style as object,
        },
      }"
    ></X6>
    <div v-if="action === 'setup'">
      <a-button @click="getData">获取数据</a-button>
      {{ data }}
    </div>
    <a-drawer
      v-model:visible="visible"
      class="custom-class"
      style="color: red"
      title="Basic Drawer"
      placement="right"
    >
      <template #extra>
        <a-button style="margin-right: 8px" @click="visible = false"
          >Cancel</a-button
        >
        <a-button type="primary" @click="submit">Submit</a-button>
      </template>
      <SForm ref="formFef" v-bind="formData"></SForm>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { defineForm } from '@/common/utils/define'
import X6 from '../../X6/index.vue'
import base from './cell'
import SForm from '../SForm/index.vue'

interface propMsg {
  action?: 'setup' | 'look'
  layoutData: any
  flowData: any
}
// const emit = defineEmits([])
const props = withDefaults(defineProps<propMsg>(), {
  action: 'look',
})
const { layoutData, action, flowData } = toRefs(props)
const $attrs = useAttrs()
const css = ref(`
    .x6-edge:hover path:nth-child(2) {
      stroke: #6CCDE5;
    }
    .x6-edge-selected path:nth-child(2) {
      stroke: #6CCDE5;
    }
`)
const setupCell = reactive({
  base,
  groupsCell: {
    flowChart: [{ shape: 'start' }, { shape: 'process' }],
  },
  stencil: {
    collapsable: false,
    stencilGraphWidth: 200,
    stencilGraphHeight: 930,
    layoutOptions: {
      columns: 1,
      columnWidth: 100,
      rowHeight: 155,
    },
  },
  groups: [
    {
      title: '流程',
      name: 'flowChart',
    },
  ],
})
const cellData = ref()
const visible = ref()
const eventConfig = shallowReactive<any>({
  node: {
    click(_a: any, b: any) {
      console.log('_a', _a, b)

      cellData.value = b.data
      formData.formData = {
        ...(b.data?.refData?.value || b.data?.refData || { status: 'wait' }),
      }
      visible.value = true
    },
  },
})

const formData = defineForm(() => {
  return [
    { status: 'wait' },
    [
      { label: 'label', key: 'label', type: 'input' },
      { label: 'key', key: 'key', type: 'input' },
      { label: 'status', key: 'status', type: 'select' },
    ],
    {
      span: 24,
      config: {
        isForm: true,
      },
      optionsData: {
        status: [
          { label: '等待', value: 'wait' },
          { label: '完成', value: 'finish' },
          { label: '正在执行', value: 'process' },
          { label: '错误', value: 'error' },
        ],
      },
      rules: {
        label: [{ required: true, trigger: 'change', message: '必填' }],
        key: [{ required: true, trigger: 'change', message: '必填' }],
      },
    },
  ]
})
const formFef = ref()
function submit() {
  formFef.value.validate().then((res: any) => {
    if (res.status) {
      visible.value = false
      cellData.value.refData = ref({ ...formData.formData })
      formFef.value.resetFields()
      data.value = x6Ref.value.getData()
      data.value = mapX6Data(data.value)
      x6Ref.value.initData(data.value)
    }
  })
}

const data = ref()
const x6Ref = ref()
function getData() {
  data.value = x6Ref.value.getData()
  data.value = mapX6Data(data.value)
  // x6Ref.value.initData(data.value)
  return data.value
}

function mapX6Data(d: any) {
  const edgeArr: any[] = []
  const cellObj: { [p: string]: any } = {}
  d.cells.forEach((item: any) => {
    if (item.shape === 'edge') {
      edgeArr.push(item)
    }
    if (item.shape === 'process') {
      cellObj[item.id] = item
    }
  })
  edgeArr.forEach((item: any) => {
    const targetCell = cellObj?.[item.target.cell]
    if (targetCell?.data?.refData?.status !== 'wait') {
      item.attrs.line.stroke = '#6CCDE5'
    } else {
      item.attrs.line.stroke = '#F0F0F0'
    }
  })
  return d
}
watch(
  () => flowData.value,
  (val: any) => {
    console.log('val', val)
    nextTick(() => {
      // x6Ref.value.initData(layoutData.value)
      data.value = mergeData(val)
    })
  },
  {
    immediate: true,
    deep: true,
  }
)
function mergeData(flowDataArg: any, layoutDataArg: any = layoutData.value) {
  const layoutDataScope = cloneDeep(layoutDataArg)
  const mapData: { [p: string]: any } = {}
  layoutDataScope.cells.forEach((item: any) => {
    if (item.data?.refData) {
      item.data.refData.status = getStatus('NOT_RUN')
    }
    mapData[item.id] = item
    if (item.shape === 'edge') {
      mapData[`${item.source.cell}_${item.target.cell}`] = item
    } else {
      const itemKey = item?.data?.refData?.key
      if (itemKey) {
        mapData[itemKey] = item
      }
    }
  })
  flowDataArg?.operations?.forEach((item: any) => {
    const { to, afterStatus, from, beforeStatus } = item
    // todo:线前面的节点
    if (from && mapData?.[from]?.data?.refData) {
      mapData[from].data.refData.status = getStatus(beforeStatus)
    }
    // todo:线
    if (
      mapData?.[from]?.id &&
      mapData?.[to]?.id &&
      mapData?.[`${mapData[from].id}_${mapData[to].id}`]
    ) {
      mapData[`${mapData[from].id}_${mapData[to].id}`].attrs.line.stroke =
        '#6CCDE5'
    }
    // todo:线后面的节点
    if (to && mapData?.[to]?.data?.refData) {
      mapData[to].data.refData.status = getStatus(afterStatus)
    }
  })
  return layoutDataScope
}
// 节点状态和颜色
const nodeStatus: any = {
  NOT_RUN: { label: '未运行', color: '#ccc', value: 'wait' },
  RUNNING: { label: '运行中', color: '#1890ff', value: 'process' },
  COMPLETED: { label: '完成', color: '#52c41a', value: 'finish' },
  STOPPED: { label: '停止', color: '#ff4d4f', value: 'error' },
}
function getStatus(status: any) {
  return nodeStatus[status].value
}
</script>
<style scoped lang="scss"></style>
