<template>
  <div>
    <!-- <JsonSchema v-model:data="jsonSchema" :is-disabled="false"></JsonSchema> -->
    formData: {{ formData }}<br />
    <SchemaToJson
      mode="string"
      :schema="jsonSchema"
      v-model="formData"
    ></SchemaToJson>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const jsonSchema = {
  type: ['array', 'null'],
  description: '跟',
  items: {
    type: 'object',
    properties: {
      bool: {
        type: ['boolean', 'null'],
      },
      attNum: {
        type: ['array', 'null'],
        items: {
          type: 'number',
        },
      },
      arr: {
        type: ['array', 'null'],
        items: {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
        },
      },
    },
    required: ['bool', 'arr'],
  },
}

const formData = ref({})

const $config = ref({
  title: 'jsonSchema示例',
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
