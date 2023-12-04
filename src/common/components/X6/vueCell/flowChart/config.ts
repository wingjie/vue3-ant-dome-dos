export default {
  config: {
    inherit: 'vue-shape',
    label: 'test',
    width: 80,
    height: 80,
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
        {
          group: 'leftTop',
        },
        {
          group: 'rightTop',
        },
        {
          group: 'right',
        },
        {
          group: 'rightBottom',
        },
        {
          group: 'leftBottom',
        },
        {
          group: 'left',
        },
      ],
    },
  },
  threeArgument: true,
}
