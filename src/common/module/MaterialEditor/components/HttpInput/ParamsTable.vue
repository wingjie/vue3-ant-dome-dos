<template>
  <div>
    <STable v-bind="table" :name="name">
      <template #header-operation>
        <a-space :size="8">
          操作
          <i-ion-ios-add-circle-outline
            v-if="!disabled"
            class="icon"
            @click="add"
          />
        </a-space>
      </template>
      <template #operationIn="data">
        <a-button v-if="!disabled" type="link" @click="cutDown(data)"
          >删除</a-button
        >
      </template>
    </STable>
  </div>
</template>

<script setup lang="ts">
interface paramsInt {
  modelValue: object
  disabled?: boolean
  name: any
}

const $props = withDefaults(defineProps<paramsInt>(), {
  modelValue: () => ({}),
})
const $emit = defineEmits(['update:modelValue'])
const { modelValue, disabled, name } = toRefs($props)
const paramsData: any = ref([])
const table = reactive({
  tableData: paramsData,
  columns: [
    { title: 'key', key: 'key', dataIndex: 'key', type: 'input' },
    { title: 'value', key: 'value', dataIndex: 'value', type: 'input' },
    ...(!disabled.value
      ? [
          {
            title: '操作',
            key: 'operation',
            type: 'slot',
            align: 'center',
            slotHead: true,
          },
        ]
      : []),
  ],
  fieldModel: {
    disabled: disabled.value,
    config: {
      isForm: true,
      change() {
        inputChange()
      },
    },
    isForm: true,
    follow: true,
    rules: {
      key: [{ required: true, trigger: 'change', message: '不能为空' }],
      value: [{ required: true, trigger: 'change', message: '不能为空' }],
    },
    tableAttr: {
      size: 'small',
      pagination: false,
      style: {
        margin: '0px',
      },
    },
    formAttr: {
      // change() {
      //   console.log(1111)
      // },
    },
  },
})

// watch(
//   modelValue,
//   () => {
//     paramsToArray()
//   },
//   {
//     deep: true,
//     immediate: true,
//   }
// )
onMounted(() => {
  paramsToArray()
})

function paramsToArray() {
  const originObj: any = modelValue.value
  Object.keys(originObj).forEach((key: string) => {
    paramsData.value.push({
      key,
      value: originObj[key],
    })
  })
}
function paramsToObject() {
  const obj: any = {}
  paramsData.value.forEach((item: any) => {
    if (item.key) {
      obj[item.key] = item.value
    }
  })
  return obj
}
function add() {
  paramsData.value.push({ key: '', value: '' })
  $emit('update:modelValue', paramsToObject())
}
function cutDown(data: any) {
  paramsData.value.splice(data.scope.index, 1)
  $emit('update:modelValue', paramsToObject())
}
function inputChange() {
  $emit('update:modelValue', paramsToObject())
}
</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
  font-size: 16px;
  color: #108de9;
}
</style>
