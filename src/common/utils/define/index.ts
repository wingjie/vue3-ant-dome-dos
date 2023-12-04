import type { FormInstance } from 'ant-design-vue'

export { defineForm, defineFieldList, defineFormModel } from './form'
export { defineTable, defineColumnsList, defineTableModel } from './table'

type SFormRefType = {
  cancel: () => any
  confirm: () => any
  findCodeItem: () => any
  getData: () => any
  update: () => any
  formRef: FormInstance
  [p: string]: any
} & FormInstance
export function formRef() {
  return ref<SFormRefType>()
}

interface STableType extends SFormRefType {
  WeakMapData: any
  mapData: { [p: string]: any }
  cancelAll: () => any
  clearValidateRow: () => any
  confirmAll: () => any
  resetFieldsRow: () => any
  updateAll: () => any
  validateRow: () => any
  resRules: () => {
    rowIndex: any
    record: { [p: string]: any }
    value: any
    fieldArr: any
  }
}
export function tableRef() {
  return ref<STableType>()
}
