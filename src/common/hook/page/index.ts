import { reactiveType } from '@/common/componentsFn/propType/index'
// eslint-disable-next-line import/prefer-default-export

export { default as homePage } from './home'
export { default as modalPage } from './modal'

export function addFirstRow(list: reactiveType<any[]>, entity: any) {
  ;(unref(list) as any[]).unshift($cloneDeep(entity))
}
// todo 公共的添加的方法
export function addRow(list: reactiveType<any[]>, index: any, entity?: any) {
  if (!entity) {
    addFirstRow(list, index)
    return
  }
  ;(unref(list) as any[]).splice(index + 1, 0, $cloneDeep(entity))
}
export function delRow(list: reactiveType<any[]>, index: any) {
  ;(unref(list) as any[]).splice(index, 1)
}
