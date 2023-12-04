<template>
  <div class="equipment-area">
    <Layout :full="false" style="padding: 0px; margin: -10px">
      <template #formTop v-if="mode === 'select'">
        <SceneTags
          class="scene-form"
          v-model:data="sceneTagsData"
          @change="search('init')"
        />
      </template>
      <template #form v-if="mode === 'select'">
        <SSearchForm
          ref="searchFormRef"
          v-bind="searchFormOptions"
          @search="search('init')"
        >
        </SSearchForm>
      </template>
      <template #content>
        <STable
          :columns="equipmentTable.columns"
          :fieldModel="equipmentTable.fieldModel"
          :tableData="mode === 'display' ? displayDeviceList : tableData"
        >
          <template #header-customSelect>
            <a-checkbox
              :checked="selectedKeys.length === tableData.length"
              :indeterminate="
                selectedKeys.length > 0 &&
                selectedKeys.length < tableData.length
              "
              @change="allCheckChange"
            />
          </template>
          <template #customSelect="{ scope: { record } }">
            <a-checkbox
              :checked="selectedKeys.includes(record.id)"
              @change="
                () => {
                  fn(record.id)
                  $emit('update:deviceIds', selectedKeys)
                }
              "
            />
          </template>
          <template #operate="{ scope: { record } }">
            <a-space>
              <SButtonGroup type="link">
                <a-button
                  v-if="mode === 'single'"
                  type="link"
                  size="small"
                  :disabled="disabled"
                  @click="$emit('select', record)"
                  >选择</a-button
                >
                <a-button
                  v-if="mode === 'display'"
                  type="link"
                  size="small"
                  :disabled="disabled"
                  @click="
                    () => {
                      fn(record.id, 'c')
                      $emit('update:deviceIds', selectedKeys)
                    }
                  "
                  >移除</a-button
                >
              </SButtonGroup>
            </a-space>
          </template>
        </STable>
      </template>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { getDevicesList, getDeviceMapByIds } from './api'
import LinkageDeviceHook from '@/common/hook/deviceLinkageHook'
import { deviceTypeDict, LinkageDeviceHookTable } from './hook/FieldConfig'

import { defineTable, defineForm } from '@/common/utils/define'

interface TargetInt {
  mode?: 'select' | 'display' | 'single'
  deviceIds?: string[]
  rowSelect?: boolean
  disabled?: boolean
}
const $emit = defineEmits(['select', 'update:deviceIds'])
const $props = withDefaults(defineProps<TargetInt>(), {
  mode: 'single',
  deviceIds: () => [],
  rowSelect: false,
  disabled: false,
})
const { mode, deviceIds, disabled } = toRefs($props)
// const displayAllDevice: any = ref([])
const [deviceLinkFields]: any[] = LinkageDeviceHook()
const [deviceLinkFieldsTable] = LinkageDeviceHookTable()

const sceneTagsData = ref({
  sceneId: undefined,
  sceneTags: [],
})

const {
  expanded: [fn, selectedKeys],
  tableLoading,
  pagination,
  search,
  formData,
  tableData,
  tableAttr,
  formRef: searchFormRef,
} = $homePage(() => {
  return {
    formData: {
      serialNumber: '',
      name: '',
      id: '',
      ip: '',
      vendor: undefined,
      type: undefined,
      softwarePlatform: undefined,
      softwareVersion: undefined,
      channels: undefined,
    },
    search(data) {
      if (mode.value === 'select') {
        return getDevicesList({
          ...data,
          sceneId: sceneTagsData.value.sceneId,
          sceneTags: sceneTagsData.value.sceneTags,
        })
      }
      loadDevices()
    },
  }
})

const searchFormOptions = defineForm(() => {
  return [
    formData,
    [
      {
        label: '设备名称',
        key: 'name',
        type: 'input',
      },
      {
        label: '设备SN',
        key: 'serialNumber',
        type: 'input',
      },
      {
        label: '管理IP',
        key: 'ip',
        type: 'input',
      },
      deviceLinkFields[0],
      {
        label: '类型',
        key: 'type',
        type: 'select',
        config: {
          options: deviceTypeDict,
        },
      },
      deviceLinkFields[1],
      deviceLinkFields[2],
    ],
    {
      rules: {},
      span: 8,
      formItemAttr: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
      },
    },
  ]
})

const equipmentTable = defineTable(() => {
  return [
    tableData,
    [
      {
        title: ' ',
        key: 'customSelect',
        dataIndex: 'customSelect',
        type: 'slotOut',
        width: '16px',
        slotHead: true,
        checked: computed(() => ['select'].includes(mode.value)),
      },
      {
        title: '管理IP',
        key: 'ip',
        dataIndex: 'ip',
        sorter: { multiple: 1 },
      },
      deviceLinkFieldsTable[0] as any, // 厂商
      deviceLinkFieldsTable[1] as any, // 软件平台
      deviceLinkFieldsTable[2] as any, // 软件版本
      {
        title: '操作',
        key: 'operate',
        type: 'slotOut',
        fixed: 'right',
        width: 50,
        showConfig: true,
        checked: computed(() => ['single', 'display'].includes(mode.value)),
      },
    ],
    {
      tableAttr: {
        ...tableAttr,
        rowSelection: undefined,
      },
      columnsConfig: {
        width: 100,
        minWidth: 50,
        maxWidth: 150,
      },
      optionsData: {
        status: [],
        type: deviceTypeDict,
      },
    },
  ]
})

const displayDeviceList = computed(() => {
  const data = tableData.value
  const { current, pageSize } = pagination
  pagination.total = data.length
  const start = (current - 1) * pageSize
  const end = current * pageSize
  return data.slice(start, end)
})

function loadDevices() {
  const list = deviceIds.value
  if (list.length === 0) return []
  getDeviceMapByIds(list).then((resp: any) => {
    const pushList = []
    // eslint-disable-next-line guard-for-in
    for (const key in resp) {
      pushList.push(resp[key])
    }
    tableData.value = pushList
    tableLoading.value = false
  })
}

watch(
  deviceIds,
  () => {
    if (deviceIds.value) {
      nextTick(() => {
        selectedKeys.value = [...deviceIds.value]
        if (mode.value === 'display') {
          loadDevices()
        }
      })
    }
  },
  {
    immediate: true,
  }
)
watch(
  () => selectedKeys.value,
  (val) => {
    $emit('select', val)
  },
  {
    deep: true,
  }
)

function allCheckChange() {
  if (selectedKeys.value.length === tableData.value.length) {
    selectedKeys.value = []
  } else {
    selectedKeys.value = tableData.value.map((item) => {
      return item.id
    })
  }
  $emit('update:deviceIds', selectedKeys.value)
}
</script>

<style scoped lang="scss">
// @import 'src/style/table-page-common';
.scene-form {
  width: 660px;
}
</style>
