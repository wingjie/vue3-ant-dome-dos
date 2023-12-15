<template>
  <div class="stableBox">
    <!-- <a-button v-show="false" @click="validate()">校验测试</a-button> -->
    <a-form
      v-if="!isScattered"
      v-bind="{
        ...$attrs,
        ...tableModel?.formAttr,
        style: {
          ...tableModel?.style,
          ...tableModel?.formAttr?.style,
        },
        ...(formAttr || {}),
      }"
      :model="mapData"
      ref="formRef"
    >
      <TableOwn
        v-bind="{
          ...$attrs,
          tableAttr,
        }"
        ref="TablesRef"
        :tableData="tableData"
        :columnsListMap="columnsListMap"
        :tableModel="tableModel"
        :WeakMapData="WeakMapData"
        :name="name"
        @mapDataFn="mapDataFn"
        :mapData="mapData"
        :formWayData="wayData"
      >
        <template v-for="(value, name) of $slots" #[name]="slotData">
          <slot
            :name="name"
            v-bind="{ ...slotData, way: { ...wayData, ...slotData.way } }"
          ></slot>
        </template>
      </TableOwn>
    </a-form>
    <template v-else>
      <TableOwn
        v-bind="{
          ...$attrs,
        }"
        ref="TablesRef"
        :tableData="tableData"
        :columnsListMap="columnsListMap"
        :tableModel="tableModel"
        :name="name"
        :WeakMapData="WeakMapData"
        :mapData="mapData"
        @mapDataFn="mapDataFn"
        :formWayData="wayData"
      >
        <template v-for="(value, name) of $slots" #[name]="slotData">
          <slot
            :name="name"
            v-bind="{ ...slotData, way: { ...wayData, ...slotData.way } }"
          ></slot>
        </template>
      </TableOwn>
    </template>
    <div class="pagination">
      <!-- :data="formData"  -->
      <slot name="pagination" :way="wayData" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue'
import { isProxy, isReactive } from 'vue'
import { typeOf, assign as assign1 } from '@/common/utils/traverseTree/index'
import { assign } from '@/common/componentsFn/assign'
import { initData, assignFormItemAttr } from '@/common/componentsFn/assignProp'

import { findCodeItem, mapPlainTableAttr } from '@/common/componentsFn'
import TableOwn from './tableOwn.vue'

import {
  columnsType,
  tableModelType,
  reactiveType,
} from '@/common/componentsFn/propType'
import { ruleType } from '@/common/componentsFn/propType/form'

const $slots: any = useSlots()

interface prop {
  formAttr?: any
  tableAttr?: any
  fieldModel?: tableModelType
  columns: columnsType[]
  tableData: reactiveType<any[]>
  name?: (string | number)[]
}
const props = withDefaults(defineProps<prop>(), {
  tableData: () => [],
  columns: () => [],
  name: () => [],
  fieldModel: () => ({}),
})
const { fieldModel, columns, tableData, name, formAttr, tableAttr } =
  toRefs(props)
const $attrs: any = useAttrs()
const formRef = ref<FormInstance>()
const TablesRef = ref()
const tableModel = reactive<tableModelType>({}) // 合并后的模型数据
const mapData = reactive<{ [key: string]: any }>({})
const WeakMapData = reactive(new WeakMap())
const defaultTableModel = reactive<tableModelType>({
  // 默认配置模型数据
  isForm: false,
  follow: false,
  tableHeight: null, // 表格的固定高度
  columnsConfig: {
    align: 'left',
    disabled: false,
    resizable: true,
    width: 150,
    minWidth: 100,
    maxWidth: 1000,
    ellipsis: true, // 当需要showConfig时候，title又没有值的时候，这里需要false
  },
  config: {
    isForm: false,
    allowClear: true,
    isShowFindCodeName: true,
    maxlength: 200,
    isCore: true,
    'auto-size': { minRows: 1, maxRows: 5 },
    'max-tag-count': 'responsive',
  },
  tableAttr: {
    rowKey: 'id',
    onResizeColumn(w: any, col: any) {
      col.width = w
    },
    pagination: {
      size: 'large',
      'page-size-options': ['10', '20', '30', '40', '50'],
      'show-size-changer': true,
      'show-quick-jumper': true,
      showTotal: (total: any) => `共 ${total} 条`, // 分页中显示总的数据
      pageSize: 10,
      position: ['bottomLeft'],
    },
    bordered: false,
    style: {
      width: '100%',
    },
    scroll: {
      // y: '11550px',
      x: '100%',
    },
    size: 'small',
  },
})
const isScattered = computed(() => name.value.length)
onMounted(() => {
  if (Object.prototype.hasOwnProperty.call(fieldModel.value, 'async')) {
    mapPlainTableAttr(fieldModel.value, fieldModel.value.async)
  }
})
function initConfigDataColumns(col: { [p: string]: any }) {
  if (col.configData && col[col.configData]) {
    col[col.configData] = initConfigDataColumns(col[col.configData])
  }
  if (col.before) {
    col.before = initColumnsComputed(col.before)
  }
  if (col.after) {
    col.after = initColumnsComputed(col.after)
  }
  return col
}
// 递归，对嵌套的进行设置
function initColumnsComputed(col: columnsType[]) {
  return col.map((items: any) => {
    const item = { ...items }
    if (item.children) {
      item.children = initColumnsComputed(item.children)
    }
    if (item.configData && item[item.configData]) {
      item[item.configData] = initConfigDataColumns(item[item.configData])
    }
    if (tableModel.columnsConfig) {
      const keyArr = Object.keys(tableModel?.columnsConfig)
      keyArr.forEach((key: any) => {
        if (
          !Object.prototype.hasOwnProperty.call(item, key) &&
          tableModel?.columnsConfig?.[key]
        ) {
          item[key] = tableModel?.columnsConfig[key]
        }
      })
    }
    // ! 类名
    const classNameH = redLabel(item)
    const classNameZ = [
      ...new Set(`${item.class || ''} ${classNameH}`.split(' ')),
    ].join(' ')
    if (classNameH) {
      item.class = classNameZ
    }
    return assignFormItemAttr(item, tableModel)
  })
}
const columnsListMap = ref<any>([])
watchEffect(() => {
  initData(fieldModel.value, ['disabled', 'rules']) // 将'disabled', 'rules'放到对应位置
  const paginationData = fieldModel.value.tableAttr?.pagination
  // todo:暂时行兼容旧版本
  const obj: any = {
    tableAttr: {},
  }
  if (isReactive(paginationData) || isProxy(paginationData)) {
    obj.tableAttr.pagination = assign1(
      {},
      defaultTableModel.tableAttr?.pagination,
      paginationData
    )
  }
  assign(tableModel, toRaw(defaultTableModel), toRaw(fieldModel.value), obj) // 合并tableModel数据
  columnsListMap.value = initColumnsComputed(columns.value)
})

function mapDataFn(type: 'set' | 'del', keyIdValue: string, rowValue: object) {
  if (type === 'set') {
    mapData[keyIdValue] = rowValue
  } else if (type === 'del') {
    delete mapData[keyIdValue]
  }
}

function getRowKeyId(row: { [p: string]: any }) {
  return WeakMapData.get(toRaw(row))?.keyId
}
// todo 清除校验结果
function clearValidateRow(row?: any, keysItem?: any) {
  const arr = rulesPathList(row, getRowKeyId(row), keysItem)
  ;(formRef as any).value?.clearValidate(arr)
}
// todo 对整行表单进行重置，将所有字段值重置为初始值并移除校验结果
function resetFieldsRow(row?: any, keysItem?: any) {
  const arr = rulesPathList(row, getRowKeyId(row), keysItem)
  ;(formRef as any).value.resetFields(arr)
}

function rulesPathList(
  objOrArr: { [p: string]: any } | { [p: string]: any }[],
  first: (string | number)[] | (string | number) = [],
  columnsList: columnsType[] | columnsType = columns.value
) {
  let firstKeys: (string | number)[] = first as (string | number)[]
  if (typeof first === 'string' || typeof first === 'number') {
    firstKeys = [first]
  }
  const middleArr: (string | number)[][] = []
  if (typeOf(objOrArr) === 'object') {
    columnsList?.forEach(
      (item: { key: string | number; [p: string]: any } | string) => {
        if (typeof item === 'object') {
          const itemScope = item[item.configData]
          const itemScopeData = (objOrArr as any)[item.configData]
          if (
            Object.prototype.hasOwnProperty.call(item || {}, 'configData') &&
            (objOrArr as any)[item.configData]
          ) {
            middleArr.push(
              ...rulesPathList(
                itemScopeData as any,
                [...firstKeys, item.configData],
                [itemScope]
              )
            )
          }
          if (
            Object.prototype.hasOwnProperty.call(item || {}, 'before') ||
            Object.prototype.hasOwnProperty.call(item || {}, 'after')
          ) {
            middleArr.push(
              ...rulesPathList(
                itemScopeData,
                [...firstKeys, item.configData],
                [...(itemScope?.before || []), ...(itemScope?.after || [])]
              )
            )
          }
          if (Object.prototype.hasOwnProperty.call(item || {}, 'children')) {
            middleArr.push(
              ...rulesPathList(objOrArr, firstKeys, [...(item?.children || [])])
            )
          }
          if (item.key) {
            middleArr.push([...firstKeys, item.key])
          }
        } else if (typeof item === 'string') {
          middleArr.push([...firstKeys, item])
        }
      }
    )
  } else if (typeOf(objOrArr) === 'array') {
    objOrArr.forEach((item: any, index: any) => {
      columnsList?.forEach(
        (itemC: { key: string | number; [p: string]: any }) => {
          if (
            Object.prototype.hasOwnProperty.call(itemC || {}, 'before') ||
            Object.prototype.hasOwnProperty.call(itemC || {}, 'after')
          ) {
            middleArr.push(
              ...rulesPathList(
                item,
                [...firstKeys, index],
                [...(itemC?.before || []), ...(itemC?.after || [])]
              )
            )
          }
          middleArr.push(
            ...rulesPathList(item, [...firstKeys, index], columnsList)
          )
        }
      )
    })
  }
  return middleArr
}
// function rulesPathList(
//   obj: { [p: string]: any } | { [p: string]: any }[],
//   first: string = ''
// ) {
//   const middleArr: (string | number)[] = [first]
//   const arr: (string | number)[][] = []
//   forEach(obj, (item: any, key: string | number, _c: any, l: number) => {
//     if (l > 0) {
//       const index = first ? l : l - 1
//       middleArr[index] = +key || +key === 0 ? +key : key
//       if (
//         ['number', 'string', 'undefined', 'null', 'boolean'].includes(
//           typeOf(item)
//         )
//       ) {
//         arr.push(middleArr.slice(0, index + 1))
//       }
//     }
//     console.log('arr', arr)
//   })
//   return arr
// }
function validateRow(row?: any, keysItem?: any) {
  const arr = rulesPathList(row, getRowKeyId(row), keysItem)
  return new Promise((resolve) => {
    ;(formRef as any).value
      .validate(arr)
      .then((valid: any) => {
        resolve({ status: true, data: { ...valid } })
        // if (fn) (fn as (arg0: any) => void)({ STATUS: true, ...valid })
      })
      .catch((err: any) => {
        resolve({ status: false, data: { ...err } })
        // if (fn) (fn as (arg0: any) => void)({ STATUS: false, ...err })
      })
  })
}
// 暴露函数====>校验
function validate(fn?: ((arg0: any) => void) | MouseEvent) {
  return new Promise((resolve) => {
    ;(formRef as any).value
      .validateFields()
      .then((valid: any) => {
        resolve({ status: true, data: { ...valid } })
        if (fn)
          (fn as (arg0: any) => void)({ status: true, data: { ...valid } })
      })
      .catch((err: any) => {
        resolve({ status: false, data: { ...err } })
        if (fn) (fn as (arg0: any) => void)({ status: false, data: { ...err } })
      })
  })
}

function redLabel(column: columnsType) {
  let fieldRequired
  if (column?.rules) {
    fieldRequired = Array.isArray(column?.rules)
      ? column?.rules?.[0]?.required
      : column?.rules?.required
  } else {
    fieldRequired = Array.isArray(tableModel?.rules?.[column.key])
      ? (tableModel?.rules?.[column.key] as ruleType[])?.[0]?.required
      : (tableModel?.rules?.[column.key] as ruleType)?.required
  }
  if (fieldRequired) {
    return 'redLabel'
  }
  return ''
}

// 处理rules数据的方法
function resRules(
  rule: any,
  value: string,
  obj: any = tableModel.follow ? tableData.value : mapData
) {
  const fieldArr = rule.field.split('.')
  let rowIndex: any = ''
  const record = fieldArr.reduce(
    (prev: any, cur: string | number, index: number, arr: any[]) => {
      if (index < arr.length - 1) {
        if (typeOf(prev) === 'array') {
          rowIndex = prev.findIndex((item: any) => {
            return getRowKeyId(item) === cur
          })
          return prev?.[rowIndex] || prev
        }
        return prev?.[cur] || prev
      }
      return prev
    },
    obj
  )
  return { rowIndex, dataAt: record, record, value, fieldArr }
}

const wayData = ref({
  validateRow,
  resetFieldsRow,
  clearValidateRow,
  rulesPathList,
})

const exposeObj: { [p: string]: any } = {
  validate,
  findCodeItem,
  resetFieldsRow,
  clearValidateRow,
  WeakMapData,
  formRef,
  mapData,
  validateRow,
  resRules,
}
const exposeData: { [p: string]: any } = reactive({})
onMounted(() => {
  const TablesRefKeys = Object.keys(TablesRef.value)
  TablesRefKeys.forEach((key: string) => {
    exposeData[key] = TablesRef.value[key]
  })
  if (formRef.value) {
    const formRefKeys = Object.keys(formRef.value)
    formRefKeys.forEach((key: string) => {
      exposeData[key] = (formRef.value as any)[key]
    })
  }
  const exposeObjKeys = Object.keys(exposeObj)
  exposeObjKeys.forEach((key: string) => {
    exposeData[key] = exposeObj[key]
  })
})
defineExpose(exposeData)
</script>
<style scoped lang="scss"></style>
