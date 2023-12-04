<template>
  <div>
    <SFlowChart :layout-data="layoutData" :flow-data="flowData"></SFlowChart>
  </div>
</template>
<script setup lang="ts">
const flowData = ref({
  id: '183093236058611714',
  targetId: '183093227468677120',
  type: 'PROC_CHANGE_ORDER',
  currentNode: 'SCRIPT_CONFIRMATION',
  operations: [
    {
      to: 'FILLING_IN',
      afterStatus: 'RUNNING',
    },
    {
      from: 'FILLING_IN',
      to: 'SCRIPT_CONFIRMATION',
      beforeStatus: 'COMPLETED',
      afterStatus: 'RUNNING',
    },
    // {
    //   from: 'SCRIPT_CONFIRMATION',
    //   to: 'CHANGE_APPROVAL',
    //   beforeStatus: 'RUNNING',
    //   afterStatus: 'STOPPED',
    // },
  ],
})
setTimeout(() => {
  flowData.value.operations[2] = {
    from: 'SCRIPT_CONFIRMATION',
    to: 'CHANGE_APPROVAL',
    beforeStatus: 'COMPLETED',
    afterStatus: 'STOPPED',
  }
}, 3000)
const layoutData = shallowReactive({
  cells: [
    {
      shape: 'edge',
      attrs: {
        line: {
          stroke: '#F0F0F0',
          targetMarker: { name: 'block', width: 12, height: 8 },
        },
      },
      id: '532f7509-a5b7-42a1-93e7-dc170d12d3c1',
      zIndex: 0,
      source: {
        cell: '5d89fdcf-735e-4c24-a95b-f9b36f81963c',
        port: 'fd29582f-c4d0-4ec1-ab2e-afd6b184c1f2',
      },
      target: {
        cell: '06fd32ad-b580-4a32-be06-dc01e796444c',
        port: '7cb85d1d-a949-44b0-8ce0-5bc439d102f2',
      },
    },
    {
      shape: 'edge',
      attrs: {
        line: {
          stroke: '#F0F0F0',
          targetMarker: { name: 'block', width: 12, height: 8 },
        },
      },
      id: '4dd79caf-bb40-4b54-9293-6b896689236a',
      zIndex: 0,
      source: {
        cell: '06fd32ad-b580-4a32-be06-dc01e796444c',
        port: 'fd29582f-c4d0-4ec1-ab2e-afd6b184c1f2',
      },
      target: {
        cell: '56339259-7e50-42e9-807e-e01e95ea53e6',
        port: '7cb85d1d-a949-44b0-8ce0-5bc439d102f2',
      },
    },
    {
      shape: 'edge',
      attrs: {
        line: {
          stroke: '#F0F0F0',
          targetMarker: { name: 'block', width: 12, height: 8 },
        },
      },
      id: '2754a184-0a38-4e70-b2b8-78624e4a2c24',
      zIndex: 0,
      source: {
        cell: '56339259-7e50-42e9-807e-e01e95ea53e6',
        port: 'fd29582f-c4d0-4ec1-ab2e-afd6b184c1f2',
      },
      target: {
        cell: 'f61fec42-e1d3-4282-be62-88d2a817329e',
        port: '7cb85d1d-a949-44b0-8ce0-5bc439d102f2',
      },
    },
    {
      shape: 'edge',
      attrs: {
        line: {
          stroke: '#F0F0F0',
          targetMarker: { name: 'block', width: 12, height: 8 },
        },
      },
      id: '15be5a9e-e572-4aba-94d7-e67a8ab49a65',
      zIndex: 0,
      source: {
        cell: 'f61fec42-e1d3-4282-be62-88d2a817329e',
        port: 'fd29582f-c4d0-4ec1-ab2e-afd6b184c1f2',
      },
      target: {
        cell: '7b1dc835-ea59-4634-b5f3-e4602296502a',
        port: '7cb85d1d-a949-44b0-8ce0-5bc439d102f2',
      },
    },
    {
      position: { x: 60, y: 50 },
      size: { width: 160, height: 170 },
      view: 'vue-shape-view',
      shape: 'start',
      label: 'test',
      data: { cell: { label: 'gateway' } },
      component: {
        template: '<Components />',
        components: {
          Components: {
            __name: 'cell',
            __hmrId: '4b6e0a26',
            __scopeId: 'data-v-4b6e0a26',
            __file:
              '/Users/wing/code/galaxy-halo/src/common/components/SpaceUI/SFlowChart/cell/start/cell.vue',
          },
        },
      },
      ports: {
        groups: {
          leftTop: {
            position: { name: 'ellipse', args: { start: -20 } },
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightTop: {
            position: { name: 'ellipse', args: { start: 20 } },
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          right: {
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftBottom: {
            position: { name: 'ellipse', args: { start: 200 } },
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightBottom: {
            position: { name: 'ellipse', args: { start: 160 } },
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          left: {
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
        },
        items: [],
      },
      id: '18a2c4f7-aa53-49b9-9ffe-c8845bf2eaf8',
      zIndex: 1,
    },
    {
      position: { x: 230, y: 95 },
      size: { width: 80, height: 80 },
      view: 'vue-shape-view',
      shape: 'process',
      label: 'test',
      data: {
        cell: { label: '请修改...' },
        refData: { status: 'wait', label: '填写变更单', key: 'FILLING_IN' },
      },
      component: {
        template: '<Components />',
        components: {
          Components: {
            __name: 'cell',
            __hmrId: '49360400',
            __scopeId: 'data-v-49360400',
            __file:
              '/Users/wing/code/galaxy-halo/src/common/components/SpaceUI/SFlowChart/cell/process/cell.vue',
          },
        },
      },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          right: {
            position: { name: 'ellipse', args: { start: 90, dx: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          left: {
            position: { args: { dx: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftTop: {
            position: { name: 'ellipse', args: { start: -20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightTop: {
            position: { name: 'ellipse', args: { start: 20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftBottom: {
            position: { name: 'ellipse', args: { start: 200, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightBottom: {
            position: { name: 'ellipse', args: { start: 160, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
        },
        items: [
          { group: 'leftTop', id: 'e776ae22-d960-4828-856d-c74e740ee5aa' },
          { group: 'rightTop', id: 'e2b8af09-55de-4fa9-9b66-887105441662' },
          { group: 'right', id: 'fd29582f-c4d0-4ec1-ab2e-afd6b184c1f2' },
          { group: 'rightBottom', id: 'b653ea3a-137e-4806-889f-2cec12390b58' },
          { group: 'leftBottom', id: '0f178bfd-1252-478a-8bfe-dd4c5b7e00e7' },
          { group: 'left', id: '7cb85d1d-a949-44b0-8ce0-5bc439d102f2' },
        ],
      },
      id: '5d89fdcf-735e-4c24-a95b-f9b36f81963c',
      zIndex: 7,
    },
    {
      position: { x: 385, y: 95 },
      size: { width: 80, height: 80 },
      view: 'vue-shape-view',
      shape: 'process',
      label: 'test',
      data: {
        cell: { label: '请修改...' },
        refData: {
          status: 'wait',
          label: '脚本确认',
          key: 'SCRIPT_CONFIRMATION',
        },
      },
      component: {
        template: '<Components />',
        components: {
          Components: {
            __name: 'cell',
            __hmrId: '49360400',
            __scopeId: 'data-v-49360400',
            __file:
              '/Users/wing/code/galaxy-halo/src/common/components/SpaceUI/SFlowChart/cell/process/cell.vue',
          },
        },
      },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          right: {
            position: { name: 'ellipse', args: { start: 90, dx: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          left: {
            position: { args: { dx: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftTop: {
            position: { name: 'ellipse', args: { start: -20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightTop: {
            position: { name: 'ellipse', args: { start: 20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftBottom: {
            position: { name: 'ellipse', args: { start: 200, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightBottom: {
            position: { name: 'ellipse', args: { start: 160, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
        },
        items: [
          { group: 'leftTop', id: 'e776ae22-d960-4828-856d-c74e740ee5aa' },
          { group: 'rightTop', id: 'e2b8af09-55de-4fa9-9b66-887105441662' },
          { group: 'right', id: 'fd29582f-c4d0-4ec1-ab2e-afd6b184c1f2' },
          { group: 'rightBottom', id: 'b653ea3a-137e-4806-889f-2cec12390b58' },
          { group: 'leftBottom', id: '0f178bfd-1252-478a-8bfe-dd4c5b7e00e7' },
          { group: 'left', id: '7cb85d1d-a949-44b0-8ce0-5bc439d102f2' },
        ],
      },
      id: '06fd32ad-b580-4a32-be06-dc01e796444c',
      zIndex: 8,
    },
    {
      position: { x: 540, y: 95 },
      size: { width: 80, height: 80 },
      view: 'vue-shape-view',
      shape: 'process',
      label: 'test',
      data: {
        cell: { label: '请修改...' },
        refData: { status: 'wait', label: '变更审批', key: 'CHANGE_APPROVAL' },
      },
      component: {
        template: '<Components />',
        components: {
          Components: {
            __name: 'cell',
            __hmrId: '49360400',
            __scopeId: 'data-v-49360400',
            __file:
              '/Users/wing/code/galaxy-halo/src/common/components/SpaceUI/SFlowChart/cell/process/cell.vue',
          },
        },
      },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          right: {
            position: { name: 'ellipse', args: { start: 90, dx: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          left: {
            position: { args: { dx: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftTop: {
            position: { name: 'ellipse', args: { start: -20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightTop: {
            position: { name: 'ellipse', args: { start: 20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftBottom: {
            position: { name: 'ellipse', args: { start: 200, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightBottom: {
            position: { name: 'ellipse', args: { start: 160, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
        },
        items: [
          { group: 'leftTop', id: 'e776ae22-d960-4828-856d-c74e740ee5aa' },
          { group: 'rightTop', id: 'e2b8af09-55de-4fa9-9b66-887105441662' },
          { group: 'right', id: 'fd29582f-c4d0-4ec1-ab2e-afd6b184c1f2' },
          { group: 'rightBottom', id: 'b653ea3a-137e-4806-889f-2cec12390b58' },
          { group: 'leftBottom', id: '0f178bfd-1252-478a-8bfe-dd4c5b7e00e7' },
          { group: 'left', id: '7cb85d1d-a949-44b0-8ce0-5bc439d102f2' },
        ],
      },
      id: '56339259-7e50-42e9-807e-e01e95ea53e6',
      zIndex: 9,
    },
    {
      position: { x: 679, y: 95 },
      size: { width: 80, height: 80 },
      view: 'vue-shape-view',
      shape: 'process',
      label: 'test',
      data: {
        cell: { label: '请修改...' },
        refData: { status: 'wait', label: '变更实施', key: 'CHANGE_OPERATION' },
      },
      component: {
        template: '<Components />',
        components: {
          Components: {
            __name: 'cell',
            __hmrId: '49360400',
            __scopeId: 'data-v-49360400',
            __file:
              '/Users/wing/code/galaxy-halo/src/common/components/SpaceUI/SFlowChart/cell/process/cell.vue',
          },
        },
      },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          right: {
            position: { name: 'ellipse', args: { start: 90, dx: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          left: {
            position: { args: { dx: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftTop: {
            position: { name: 'ellipse', args: { start: -20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightTop: {
            position: { name: 'ellipse', args: { start: 20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftBottom: {
            position: { name: 'ellipse', args: { start: 200, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightBottom: {
            position: { name: 'ellipse', args: { start: 160, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
        },
        items: [
          { group: 'leftTop', id: 'e776ae22-d960-4828-856d-c74e740ee5aa' },
          { group: 'rightTop', id: 'e2b8af09-55de-4fa9-9b66-887105441662' },
          { group: 'right', id: 'fd29582f-c4d0-4ec1-ab2e-afd6b184c1f2' },
          { group: 'rightBottom', id: 'b653ea3a-137e-4806-889f-2cec12390b58' },
          { group: 'leftBottom', id: '0f178bfd-1252-478a-8bfe-dd4c5b7e00e7' },
          { group: 'left', id: '7cb85d1d-a949-44b0-8ce0-5bc439d102f2' },
        ],
      },
      id: 'f61fec42-e1d3-4282-be62-88d2a817329e',
      zIndex: 10,
    },
    {
      position: { x: 820, y: 160 },
      size: { width: 80, height: 80 },
      view: 'vue-shape-view',
      shape: 'process',
      label: 'test',
      data: {
        cell: { label: '请修改...' },
        refData: {
          status: 'wait',
          label: '状态回写',
          key: 'STATUS_WRITING_BACK',
        },
      },
      component: {
        template: '<Components />',
        components: {
          Components: {
            __name: 'cell',
            __hmrId: '49360400',
            __scopeId: 'data-v-49360400',
            __file:
              '/Users/wing/code/galaxy-halo/src/common/components/SpaceUI/SFlowChart/cell/process/cell.vue',
          },
        },
      },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          right: {
            position: { name: 'ellipse', args: { start: 90, dx: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
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
                style: { visibility: 'hidden' },
              },
            },
          },
          left: {
            position: { args: { dx: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftTop: {
            position: { name: 'ellipse', args: { start: -20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightTop: {
            position: { name: 'ellipse', args: { start: 20, dy: -5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          leftBottom: {
            position: { name: 'ellipse', args: { start: 200, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
          rightBottom: {
            position: { name: 'ellipse', args: { start: 160, dy: 5 } },
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: { visibility: 'hidden' },
              },
            },
          },
        },
        items: [
          { group: 'leftTop', id: 'e776ae22-d960-4828-856d-c74e740ee5aa' },
          { group: 'rightTop', id: 'e2b8af09-55de-4fa9-9b66-887105441662' },
          { group: 'right', id: 'fd29582f-c4d0-4ec1-ab2e-afd6b184c1f2' },
          { group: 'rightBottom', id: 'b653ea3a-137e-4806-889f-2cec12390b58' },
          { group: 'leftBottom', id: '0f178bfd-1252-478a-8bfe-dd4c5b7e00e7' },
          { group: 'left', id: '7cb85d1d-a949-44b0-8ce0-5bc439d102f2' },
        ],
      },
      id: '7b1dc835-ea59-4634-b5f3-e4602296502a',
      zIndex: 11,
    },
  ],
})
const $config = ref({
  title: '基础使用',
  order: 1,
  contextType: 'pre',
  context: ``,
})
defineExpose({
  $config,
})
// const d = {
//   options: { start: 250, step: 100, axis: 90 },
//   nodes: [
//     { id: 'FILLING_IN', label: '填写变更单', x: 250, y: 90 },
//     { id: 'SCRIPT_CONFIRMATION', label: '脚本确认', x: 350, y: 90 },
//     { id: 'CHANGE_APPROVAL', label: '变更审批', x: 450, y: 90 },
//     { id: 'CHANGE_OPERATION', label: '变更实施', x: 550, y: 90 },
//     { id: 'STATUS_WRITING_BACK', label: '状态回写', x: 650, y: 90 },
//   ],
//   specialNode: [],
//   specialEdges: [],
// }
</script>
<style scoped lang="scss"></style>
