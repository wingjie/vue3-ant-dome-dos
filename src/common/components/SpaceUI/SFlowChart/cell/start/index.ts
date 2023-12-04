import { h } from 'vue'
import Components from './cell.vue'
import { assign } from '@/common/utils/autoImport'

const data = assign(
  {},
  {
    config: {
      inherit: 'vue-shape',
      label: 'test',
      width: 160,
      height: 170,
      data: {
        cell: {
          label: 'gateway',
        },
      },
      ports: {
        groups: {
          leftTop: {
            // position: 'top',
            position: {
              name: 'ellipse',
              args: {
                start: -20,
              },
            },
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
          rightTop: {
            // position: 'top',
            position: {
              name: 'ellipse',
              args: {
                start: 20,
              },
            },
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
            // position: 'right',
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
          leftBottom: {
            position: {
              name: 'ellipse',
              args: {
                start: 200,
              },
            },
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
          rightBottom: {
            position: {
              name: 'ellipse',
              args: {
                start: 160,
              },
            },
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
            // position: 'left',
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
          //   group: 'leftTop',
          // },
          // {
          //   group: undefined,
          // },
          // {
          //   group: undefined,
          // },
          // {
          //   group: undefined,
          // },
          // {
          //   group: undefined,
          // },
          // {
          //   group: undefined,
          // },
        ],
      },
      component: {
        render: () => {
          return h(Components)
        },
      },
    },
    threeArgument: true,
  }
)

export default data
