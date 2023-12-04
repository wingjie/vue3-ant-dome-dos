import { Graph, Shape } from '@antv/x6'
import { assign } from '@/common/utils/autoImport'

const data = {
  // container: document.getElementById('container'),
  grid: true,
  // 缩放
  transforming: {
    clearAll: true,
    clearOnBlankMouseDown: true,
  },
  mousewheel: {
    enabled: false, // 不可以缩放
    zoomAtMousePosition: true,
    modifiers: 'ctrl',
    minScale: 0.5,
    maxScale: 3,
  },
  panning: {
    enabled: true, // 画布能移动
  },
  connecting: {
    allowLoop: false, // 不允许起始节点和终止节点为同一节点
    allowMulti: false, // 在起始和终止节点之间只允许创建一条边
    router: {
      name: 'manhattan',
      args: {
        // padding: 1,
      },
    },
    connector: {
      name: 'rounded',
      args: {
        radius: 8,
      },
    },
    anchor: 'center',
    connectionPoint: 'anchor',
    allowBlank: false,
    snap: {
      radius: 20,
    },
    createEdge() {
      return new Shape.Edge({
        attrs: {
          // stroke: '#C2C8D5',
          line: {
            stroke: '#C2C8D5',
            strokeWidth: 2,
            targetMarker: {
              name: 'block',
              width: 12,
              height: 8,
            },
          },
        },
        zIndex: 0,
      })
    },
    validateConnection({ targetMagnet }: any) {
      return !!targetMagnet
    },
  },
  highlighting: {
    magnetAdsorbed: {
      name: 'stroke',
      args: {
        attrs: {
          fill: '#5F95FF',
          stroke: '#5F95FF',
        },
      },
    },
  },
  resizing: false, // 关闭调整节点大小的功能
  rotating: false, // 关闭角度的功能
  selecting: {
    // 交互方式
    enabled: true,
    rubberband: false, // 是否能框选
    // showNodeSelectionBox: true
  },
  snapline: true,
  keyboard: true,
  clipboard: true,
  translating: {
    restrict: true,
  },
}

const installGraph = (configObj: any) => {
  const arg = { ...configObj }
  if (arg.container && typeof arg.container === 'string') {
    arg.container = document.getElementById(arg.container)
  }
  const defaultData = assign({}, data, arg)
  // 默认配置项
  return new Graph(defaultData)
}
export default installGraph
