/* eslint-disable no-redeclare */
import { columnsType, tableModelType } from '@/common/componentsFn/propType'
import { typeOf } from '@/common/utils/traverseTree'

export function defineTable<T>(fn: () => [T, columnsType[], tableModelType]): {
  tableData: T
  columns: columnsType[]
  fieldModel: tableModelType
  [p: string]: any
}
export function defineTable<T>(
  fn: () => {
    tableData: { [p: string]: any }
    columns: columnsType
    fieldModel: tableModelType
    [p: string]: any
  }
): {
  tableData: T
  columns: columnsType[]
  fieldModel: tableModelType
  [p: string]: any
}

export function defineTable<T>(fn: () => any): any {
  const res = fn()
  if (typeOf(res) === 'array') {
    const [tableData, columns, fieldModel] = res as [
      T,
      columnsType[],
      tableModelType
    ]
    return {
      tableData,
      columns,
      fieldModel,
    }
  }
  return res as {
    tableData: { [p: string]: any }
    columns: columnsType[]
    fieldModel: tableModelType
    [p: string]: any
  }
}
export function defineColumnsList(fn: () => columnsType[]): columnsType[] {
  const res = fn()
  return res
}
export function defineTableModel(fn: () => tableModelType): tableModelType {
  const res = fn()
  return res
}
