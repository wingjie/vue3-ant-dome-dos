/* eslint-disable no-redeclare */
import { fieldListType, formModelType } from '@/common/componentsFn/propType'
import { typeOf } from '@/common/utils/traverseTree'

export function defineForm<T>(fn: () => [T, fieldListType[], formModelType]): {
  formData: T
  fieldList: fieldListType[]
  formModel: formModelType
  [p: string]: any
}
export function defineForm<T>(
  fn: () => {
    formData: { [p: string]: any }
    fieldList: fieldListType
    formModel: formModelType
    [p: string]: any
  }
): {
  formData: T
  fieldList: fieldListType[]
  formModel: formModelType
  [p: string]: any
}

export function defineForm<T>(fn: () => any): any {
  const res = fn()
  if (typeOf(res) === 'array') {
    const [formData, fieldList, formModel] = res as [
      T,
      fieldListType[],
      formModelType
    ]
    return {
      formData,
      fieldList,
      formModel,
    }
  }
  return res as {
    formData: { [p: string]: any }
    fieldList: fieldListType[]
    formModel: formModelType
    [p: string]: any
  }
}
export function defineFieldList(fn: () => fieldListType[]): fieldListType[] {
  const res = fn()
  return res
}
export function defineFormModel(fn: () => formModelType): formModelType {
  const res = fn()
  return res
}
