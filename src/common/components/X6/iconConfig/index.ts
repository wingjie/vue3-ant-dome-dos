/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { Graph, Addon } from '@antv/x6'
import '@antv/x6-vue-shape'
import { assign } from '@/common/utils/autoImport'

import basicsShape from '../vueCell/index'

interface installStencilType {
  bindDom: string | HTMLElement
  target: Graph
  [prop: string]: any
}
export interface setupCellType {
  base?: { [p: string]: any }
  async?: { [p: string]: any }
  groupsCell?: {
    [p: string]: { shape: string; className: string; [p: string]: any }[]
  }
  stencil?: { [p: string]: any }
  groups?: { [p: string]: any }[] // 完全替换的逻辑，其他的参数为合并的逻辑
  [p: string]: any
}

// 向左边栏中添加cell的配置
export const groupsCell = {
  event: [
    {
      shape: 'bpmn:startEvent',
      className: 'bpmn:startEvent',
    },
    {
      shape: 'bpmn:endEvent',
      className: 'bpmn:endEvent',
    },
    {
      shape: 'bpmn:intermediateCatchEvent',
      className: 'bpmn:intermediateCatchEvent',
      data: {
        cell: {
          label: '消息立即捕获事件',
          type: 'MESSAGE',
        },
      },
    },
    {
      shape: 'bpmn:intermediateCatchEvent',
      data: {
        cell: {
          label: '计时器立即捕获事件',
          type: 'TIMEER',
        },
      },
    },
  ],
  nodes: [
    { shape: 'bpmn:manualTask' },
    { shape: 'galaxy:autoTask' },
    { shape: 'bpmn:callActivity' },
  ],
  gateway: [
    { shape: 'bpmn:parallelGateway' },
    { shape: 'bpmn:inclusiveGateway' },
    { shape: 'galaxy:orderedExclusiveGateway' },
  ],
}
// 单独类的配置
export const registerNodeData = {
  'bpmn:startEvent': {
    config: {
      inherit: 'event',
      data: {
        cell: {
          label: '开始',
        },
      },
    },
    threeArgument: true,
  },
  'bpmn:endEvent': {
    config: {
      inherit: 'event',
      data: {
        cell: {
          label: '结束',
        },
      },
    },
    threeArgument: true,
  },
  'bpmn:intermediateCatchEvent': {
    config: {
      inherit: 'event',
      data: {
        cell: {
          label: '消息立即捕获事件',
        },
      },
    },
    threeArgument: true,
  },
  'bpmn:manualTask': {
    config: {
      inherit: 'node',
      data: {
        cell: {
          label: '人工',
        },
      },
    },
    threeArgument: true,
  },
  'galaxy:autoTask': {
    config: {
      inherit: 'node',
      data: {
        cell: {
          label: '自动任务',
        },
      },
    },
    threeArgument: true,
  },
  'bpmn:callActivity': {
    config: {
      inherit: 'node',
      data: {
        cell: {
          label: '外部流程',
        },
      },
    },
    threeArgument: true,
  },
  'bpmn:parallelGateway': {
    config: {
      inherit: 'gateway',
      data: {
        cell: {
          label: '并行拆分',
        },
      },
    },
    threeArgument: true,
  },
  'bpmn:inclusiveGateway': {
    config: {
      inherit: 'gateway',
      data: {
        cell: {
          label: '相容',
        },
      },
    },
    threeArgument: true,
  },
  'galaxy:orderedExclusiveGateway': {
    config: {
      inherit: 'gateway',
      data: {
        cell: {
          label: '顺序排他',
        },
      },
    },
    threeArgument: true,
  },
}
// 创建cell的逻辑，以及向左边栏添加cell
function initGraph(stencil: any, graph: any, setupCell: setupCellType) {
  for (const [key, item] of Object.entries(
    assign({}, basicsShape, setupCell?.base ? setupCell.base : {})
  ) as any) {
    // 创建基础类
    Graph.registerNode(key, item.config, item.threeArgument)
  }
  for (const [key, item] of Object.entries(
    assign({}, registerNodeData, setupCell?.async ? setupCell.async : {})
  ) as any) {
    // 创建个体的类
    Graph.registerNode(key, item.config, item.threeArgument)
  }
  for (const [key, item] of Object.entries(
    assign({}, groupsCell, setupCell?.groupsCell ? setupCell.groupsCell : {})
  ) as any) {
    // 向左边栏添加
    const event = item.map((items: any) => graph.createNode(items))
    stencil.load(event, key)
  }
}

// 左边栏的设置
export const installStencil = (
  configObj: installStencilType,
  setupCell: setupCellType
) => {
  const obj = { ...configObj }
  const { bindDom, target } = obj
  const stencilConfig = {
    title: '流程图',
    stencilGraphWidth: 200,
    stencilGraphHeight: 130,
    collapsable: true,
    groups: setupCell?.groups
      ? setupCell.groups
      : [
          {
            title: '事件',
            name: 'event',
          },
          {
            title: '节点',
            name: 'nodes',
          },
          {
            title: '网关',
            name: 'gateway',
          },
        ],
    layoutOptions: {
      columns: 2,
      columnWidth: 80,
      rowHeight: 55,
    },
    bindDom,
    target,
  }
  const stencil = new Addon.Stencil(
    assign({}, stencilConfig, setupCell.stencil ?? {})
  )
  if (typeof bindDom === 'string') {
    document.getElementById(bindDom)?.appendChild(stencil.container)
  } else {
    bindDom.appendChild(stencil.container)
  }
  initGraph(stencil, target, setupCell)
  return stencil
}
export default installStencil

// const basicsShape = {
//   event: {
//     config: {
//       inherit: 'rect',
//       width: 66,
//       height: 36,
//       attrs: {
//         body: {
//           strokeWidth: 1,
//           stroke: '#5F95FF',
//           fill: '#EFF4FF'
//         },
//         text: {
//           fontSize: 12,
//           fill: '#262626'
//         }
//       },
//       ports: { ...ports }
//     },
//     threeArgument: true
//   },
//   node: {
//     config: {
//       inherit: 'rect',
//       width: 66,
//       height: 36,
//       attrs: {
//         body: {
//           strokeWidth: 1,
//           stroke: '#5F95FF',
//           fill: '#EFF4FF'
//         },
//         text: {
//           fontSize: 12,
//           fill: '#262626'
//         }
//       },
//       ports: { ...ports }
//     },
//     threeArgument: true
//   },
//   gateway: {
//     config: {
//       inherit: 'polygon',
//       width: 66,
//       height: 36,
//       attrs: {
//         body: {
//           strokeWidth: 1,
//           stroke: '#5F95FF',
//           fill: '#EFF4FF',
//           refPoints: '0,10 10,0 20,10 10,20'
//         },
//         text: {
//           fontSize: 12,
//           fill: '#262626'
//         }
//       },
//       ports: {
//         ...ports
//       }
//     },
//     threeArgument: true
//   },
//   'bpmn:events': {
//     config: {
//       inherit: 'vue-shape',
//       label: 'test',
//       width: 66,
//       height: 36,
//       data: {
//         cell: {
//           label: 'polygon'
//         },
//         num: 12
//       },
//       ports: { ...ports },
//       component: {
//         template: `<Event />`,
//         components: {
//           Event
//         }
//       }
//     },
//     threeArgument: true
//   },
//   'bpmn:nodes': {
//     config: {
//       inherit: 'vue-shape',
//       width: 66,
//       height: 36,
//       data: {
//         cell: {
//           label: 'node'
//         }
//       },
//       ports: { ...ports },
//       component: {
//         template: `<Node />`,
//         components: {
//           Node
//         }
//       }
//     },
//     threeArgument: true
//   },
//   'bpmn:test': {
//     config: {
//       inherit: 'vue-shape',
//       label: 'test',
//       width: 66,
//       height: 36,
//       data: {
//         cell: {
//           label: 'test'
//         },
//         num: 12
//       },
//       ports: { ...ports },
//       component: {
//         template: `<Gateway />`,
//         components: {
//           Gateway
//         }
//       }
//     },
//     threeArgument: true
//   }
// }
