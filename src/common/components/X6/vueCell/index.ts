import { assign } from '@/common/utils/traverseTree'
import event from './event'
import node from './node'
import gateway from './gateway'
import round from './flowChart/process'

// const modules = import.meta.glob(`../vueCell/**/*.ts`, {
//   eager: true,
//   import: 'default',
// } as any)
// console.log('modules', modules)

// const obj = Object.entries(modules)
//   .filter(([key]: any) => {
//     const reg = /\.\.\/vueCell\/.*\/index.ts/
//     return reg.test(key)
//   })
//   .map(([key, item]: any) => {
//     const name = key.replace(/\.\.\/vueCell\//, '').replace(/\/index.ts/, '')
//     return { [name]: item }
//   })
// console.log('obj', obj)

// 端口的配置
const defaultConfig = {
  config: {
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        // {
        //   group: 'top'
        // },
        {
          group: 'right',
        },
        // {
        //   group: 'bottom'
        // },
        {
          group: 'left',
        },
      ],
    },
  },
}

function assignData(data: any) {
  return assign({}, defaultConfig, data)
}

// 基础图形类的配置
export default {
  event: assignData(event),
  node: assignData(node),
  gateway: assignData(gateway),
  round: assignData(round),
}
