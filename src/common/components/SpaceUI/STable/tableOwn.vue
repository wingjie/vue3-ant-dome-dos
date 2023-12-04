<template>
  <div class="tableOwnBox">
    <a-table
      v-if="fieldMap.length"
      ref="table"
      :loading="$attrs?.tableAttr?.loading || false"
      v-bind="{
        ...$attrs,
        ...tableModel?.tableAttr,
        pagination: tableModel?.tableAttr?.pagination,
        columns: fieldMap,
        'data-source': formData,
        class: 'components-table-demo-nested',
        ...(tableAttr || {}),
        ...$attrs?.tableAttr,
      }"
    >
      <template #headerCell="{ column }: any">
        <div class="headerCell">
          <template v-if="column.slotHead">
            <slot
              :name="`header-${column.key}`"
              :model="tableModel"
              :data="formData"
              :extra="extra"
              :field="column"
              :way="wayData"
            >
              <!-- {{ column.title }} -->
            </slot>
            <slot
              v-if="column.slotHead"
              name="header"
              :model="tableModel"
              :data="formData"
              :extra="extra"
              :field="column"
              :way="wayData"
            />
          </template>
          <span v-else> {{ column.title }} </span>
          <ShowConfig
            v-if="column.showConfig"
            class="showConfig"
            :initTreeData="columnsListMap"
            :column="column"
            v-model:servingKeys="servingKeys"
            v-model:servingTreeData="treeData"
          />
        </div>
      </template>
      <template #bodyCell="{ text, record, index, column }: any">
        <template v-if="column.type || column.showConfig === true">
          <slot
            v-if="
              column.type === 'slot' ||
              column.type === 'slotOut' ||
              column.showConfig === true
            "
            :name="`${column.key}`"
            :scope="{ text, record, index }"
            :model="tableModel"
            :propName="[...name, isScattered ? index : getRowKeyId(record)]"
            :isEdit="isEdit(record, mapData)"
            :keyId="getRowKeyId(record)"
            :mapData="mapData"
            :data="formData"
            :extra="extra"
            :field="column"
            :way="{
                ...wayData,
                confirm: ($event: any) => confirm($event || record),
                update: ($event: any) => update($event || record),
                validateRow: ($event: any, $eventTow: any) => formWayData.validateRow($event || record),
                cancel: ($event: any) => cancel($event || record),
                resetFieldsRow: ($event: any, $eventTow: any) => formWayData.resetFieldsRow($event || record),
                clearValidateRow: ($event: any, $eventTow: any) => formWayData.clearValidateRow($event || record),
              }"
          >
            <span v-if="column.showConfig"></span>
          </slot>
          <template v-if="column.type !== 'slotOut' && column.isForm">
            <FormItem
              ref="formItemRef"
              :field="column"
              :extra="extra"
              :rowIndex="index"
              :name="[...name, isScattered ? index : getRowKeyId(record)]"
              :isCore="
                Object.prototype.hasOwnProperty.call(
                  mapData,
                  getRowKeyId(record)
                )
              "
              :modelData="tableModel"
              :mapData="mapData?.[getRowKeyId(record)] || null"
              :rowData="record"
              :formData="formData"
              :rowMsg="creakRowMsg(record)"
            >
              <template #itemIn="data">
                <slot
                  v-if="column.type === 'slot' || column.type === 'slotIn'"
                  :name="`${column.key}In`"
                  :data="data.data"
                  :propName="[
                    ...name,
                    isScattered ? index : getRowKeyId(record),
                  ]"
                  :model="tableModel"
                  :mapData="mapData"
                  :isEdit="isEdit(record, mapData)"
                  :keyId="getRowKeyId(record)"
                  :field="data.field"
                  :scope="{ text, record, index }"
                  :way="{
                      ...wayData,
                      confirm: ($event: any) => confirm($event || mapData?.[getRowKeyId(record)] || record),
                      update: ($event: any) => update($event || record),
                      validateRow: ($event: any, $eventTow: any) => formWayData.validateRow($event || record),
                      cancel: ($event: any) => cancel($event || record),
                      resetFieldsRow: ($event: any, $eventTow: any) => formWayData.resetFieldsRow($event || record),
                      clearValidateRow: ($event: any, $eventTow: any) => formWayData.clearValidateRow($event || record),
                    }"
                />
              </template>
              <template #itemSlot="data">
                <slot
                  v-if="column?.config?.type === 'slot'"
                  :name="`${column.key}${column?.config?.key}In`"
                  :data="data.data"
                  :model="tableModel"
                  :propName="[
                    ...name,
                    isScattered ? index : getRowKeyId(record),
                  ]"
                  :isEdit="isEdit(record)"
                  :keyId="getRowKeyId(record)"
                  :mapData="mapData"
                  :field="data.field"
                  :scope="{ text, record, index }"
                  :way="{
                      ...wayData,
                      confirm: ($event: any) => confirm($event || record),
                      update: ($event: any) => update($event || record),
                      validateRow: ($event: any, $eventTow: any) => formWayData.validateRow($event || record),
                      cancel: ($event: any) => cancel($event || record),
                      resetFieldsRow: ($event: any, $eventTow: any) => formWayData.resetFieldsRow($event || record),
                      clearValidateRow: ($event: any, $eventTow: any) => formWayData.clearValidateRow($event || record),
                    }"
                />
              </template>
            </FormItem>
          </template>
          <FindScoped
            v-else-if="
              !(column.type === 'slot' || column.type === 'slotOut') &&
              column?.config?.isShowFindCodeName
            "
            :column="column"
            :isEdit="isEdit(record)"
            :keyId="getRowKeyId(record)"
            :index="index"
            :record="record"
            :tableModel="tableModel"
            :formData="formData"
            :rowMsg="creakRowMsg(record)"
          ></FindScoped>
        </template>
      </template>
      <template v-for="(value, names) of $slots" #[names]="slotData: any">
        <slot
          :name="names"
          v-bind="slotData"
          :actionData="{
            isEdit: isEdit(slotData.record),
            keyId: getRowKeyId(slotData.record),
            extra: extra,
            data: formData,
            propName: [
              ...name,
              isScattered ? slotData?.index : getRowKeyId(slotData?.record),
            ],
            way: wayData,
          }"
        ></slot>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { get } from '@vueuse/core'
import {
  assign,
  mapFilter,
  getUUID,
  cloneDeep,
} from '@/common/utils/traverseTree/index'
import FormItem from '../../FormItem/index.vue'
import ShowConfig from '@/common/components/ColumnControl/index.vue'
import FindScoped from './findScoped.vue'

import { findCodeItem } from '@/common/componentsFn'

const $slots: any = useSlots()

interface prop {
  tableAttr?: any
  columnsListMap: any
  tableModel: any
  tableData: any[]
  name: (string | number)[]
  WeakMapData: any
  mapData: any
  formWayData: {
    validateRow: Function
    resetFieldsRow: Function
    clearValidateRow: Function
    rulesPathList: Function
  }
}
const props = withDefaults(defineProps<prop>(), {
  tableData: () => [],
  name: () => [],
})
const {
  tableData,
  name,
  columnsListMap,
  tableModel,
  WeakMapData,
  mapData,
  formWayData,
  tableAttr,
} = toRefs(props)
const $attrs: any = useAttrs()
const { extra } = $attrs
const $emit = defineEmits(['mapDataFn'])
const servingKeys = ref<string[]>([]) // 变更后的字符串['']
const treeData = ref<string[]>([]) // 变更后的树结构的数据[{}]

const isScattered = computed(() => name.value.length)
watch(
  () => columnsListMap.value,
  (val) => {
    // console.log('val', val)
    const valData = cloneDeep(val)
    treeData.value = filterFn(valData)
  },
  { deep: true, immediate: true }
)
function filterFn(valData: any) {
  return valData.filter((item: any) => {
    if (get(item?.checked) === false) {
      return false
    }
    if (item?.children) {
      item.children = filterFn(item?.children)
    }
    return true
  })
}
const fieldMap = computed(() => {
  treeData.value.forEach((item: any) => {
    if (item?.configData) {
      item.width = 0
      fn(item[item?.configData], item)
    }
  })
  return treeData.value
})
function fn(configData: any, fieldValue: any) {
  if (configData?.before) {
    configData?.before.forEach((item: any) => {
      fieldValue.width += item.width
    })
  }
  if (configData?.after) {
    configData?.after.forEach((item: any) => {
      fieldValue.width += item.width
    })
  }
  if (configData?.configData) {
    fn(configData[configData?.configData], fieldValue)
  }
}
const formData = ref<any>({ data: [] })
watch(
  () => [tableData.value],
  ([news]) => {
    formData.value = news
    if (tableModel.value.isForm === true && tableModel.value?.follow === true) {
      updateAll(formData.value)
    }
  },
  { immediate: true, deep: true }
)
watch(
  () => tableModel.value.isForm,
  (news: any) => {
    if (news === true) {
      updateAll(formData.value)
    } else {
      cancelAll()
    }
  },
  {
    immediate: true,
  }
)
function getRowKeyId(row: { [p: string]: any }) {
  return WeakMapData.value.get(toRaw(row))?.keyId
}
function isEdit(row: any, mapFormData: { [p: string]: any } = mapData.value) {
  return Object.prototype.hasOwnProperty.call(mapFormData, getRowKeyId(row))
}
function update(row: any) {
  const rowKeyValue = tableModel.value.tableAttr?.rowKeyValue // 使用行内其他唯一的值的key
  const value = (rowKeyValue && row?.[rowKeyValue]) || getRowKeyId(row)
  const keyIdValue = value || getUUID()
  if (tableModel.value?.follow === true) {
    $emit('mapDataFn', 'set', keyIdValue, row)
  } else {
    $emit('mapDataFn', 'set', keyIdValue, cloneDeep(row))
  }
  WeakMapData.value.set(toRaw(mapData.value[keyIdValue]), {
    keyId: keyIdValue,
    initRecord: row,
  })
  WeakMapData.value.set(toRaw(row), {
    keyId: keyIdValue,
    mapRecord: mapData.value[keyIdValue],
  })
  return { mapRecord: mapData.value[keyIdValue], record: row }
}
function updateAll(data = formData.value) {
  const mapArr: any[] = []
  data?.forEach((item: any) => {
    const mapDataRecord = update(item)
    mapArr.push(mapDataRecord)
  })
  return { mapData: mapArr, data }
}
function cancelAll(
  data = Object.entries(mapData.value).map(([, item]) => item)
) {
  data?.forEach((item: any) => {
    cancel(item)
  })
}
function cancel(row: { [x: string]: string | number }) {
  const ownKeyValue = getRowKeyId(row)
  formWayData.value.clearValidateRow(row)
  $emit('mapDataFn', 'del', ownKeyValue)
}

function confirm(row: { [x: string]: string | number }) {
  const own = WeakMapData.value.get(row)?.initRecord || row
  const ownKeyValue = getRowKeyId(row)
  assign(own, mapData.value[ownKeyValue])
  $emit('mapDataFn', 'del', ownKeyValue)
  // delete mapData[ownKeyValue]
}
function confirmAll(
  data = Object.entries(mapData.value).map(([, item]) => item)
) {
  data.forEach((item: any) => {
    confirm(item)
  })
}

// 暴露函数====> 通过行找label名字
const Data = computed(() => formData.value)
// 暴露函数====>获取数据
function getData(key: string | number) {
  if (key) {
    return mapFilter(formData.value, (msgData: any, T: any, F: any) => {
      if (msgData.key === key) {
        return F
      }
      return T
    })
  }
  return Data.value
}

const wayData = ref({
  confirm,
  confirmAll,
  update,
  updateAll,
  cancelAll,
  cancel,
})
const weakMap = new WeakMap()
function creakRowMsg(record: any) {
  const rowMsg = reactive({
    options: {},
    unit: {},
  })
  if (!weakMap.has(record)) {
    weakMap.set(record, rowMsg)
    return rowMsg
  }
  return weakMap.get(record)
}

defineExpose({
  getData,
  findCodeItem,
  update,
  updateAll,
  confirm,
  confirmAll,
  cancelAll,
  cancel,
})
</script>
<style scoped lang="scss">
.tableOwnBox {
  // :deep(.redLabel) {
  //   border: 1px solid pink;
  // }
  :deep(.redLabel::after) {
    content: '*';
    color: red;
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
  }
  .headerCell {
    width: 100%;
    // border: 1px solid pink;
    position: relative;
    text-align: left;
  }
  .showConfig {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
  }

  // todo 控制table的高度，不自适应
  .components-table-demo-nested
    > :deep(div > div > div > div > div.ant-table-body) {
    height: v-bind('tableModel.tableHeight');
    & > table > tbody > tr > td > div.ant-empty-normal {
      margin: calc((v-bind('tableModel.tableHeight') - 115px) / 2) 0;
    }
  }
  // todo 控制table单元格的间隙
  :deep(.ant-table-tbody) > tr > td {
    padding: 5px;
  }
  :deep(.ant-table-thead) > tr > th {
    padding: 5px;
    &.ant-table-cell-ellipsis {
      white-space: inherit;
    }
  }
  :deep(div[class*='table']) {
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }
  :deep(div[class*='table-container']) {
    thead[class*='table-thead'] > tr {
      & > th {
        height: 48px;
      }
    }
  }
}
</style>
