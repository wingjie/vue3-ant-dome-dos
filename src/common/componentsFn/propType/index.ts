import { ComputedRef, Ref } from 'vue'

export { fieldListType, formModelType } from './form'
export { columnsType, tableModelType } from './table'
/*
 * name: 使key必填
 */
export type CustomRequired<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & Omit<T, K>
/*
 * name: 使key非必填
 */
export type CustomNotRequired<T, K extends keyof T> = {
  [P in K]+?: T[P]
} & Omit<T, K>

export type reactiveType<T> = ComputedRef<T> | Ref<T> | T
