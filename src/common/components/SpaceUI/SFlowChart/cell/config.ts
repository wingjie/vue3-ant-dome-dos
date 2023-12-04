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
              dy: -5,
            },
          },
          attrs: {
            circle: {
              r: 6,
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
        top: {
          // position: 'right',
          position: {
            name: 'ellipse',
            args: {
              start: 0,
              dy: -5,
            },
          },
          attrs: {
            circle: {
              r: 6,
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
              dy: -5,
            },
          },
          attrs: {
            circle: {
              r: 6,
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
          position: {
            name: 'ellipse',
            args: {
              start: 90,
              dx: 5,
            },
          },
          attrs: {
            circle: {
              r: 6,
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
              dy: 5,
            },
          },
          attrs: {
            circle: {
              r: 6,
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
          // position: 'right',
          position: {
            name: 'ellipse',
            args: {
              start: 180,
              dy: 5,
            },
          },
          attrs: {
            circle: {
              r: 6,
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
              dy: 5,
            },
          },
          attrs: {
            circle: {
              r: 6,
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
          position: {
            args: {
              dx: -5,
            },
          },
          attrs: {
            circle: {
              r: 6,
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
          group: 'top',
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
          group: 'bottom',
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
