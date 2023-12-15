/* eslint-disable import/prefer-default-export */
// import { typeOf } from '@/common/utils/traverseTree'

export type judgeType =
  | 'array'
  | 'object'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'undefined'

export function isRequired(key: number | string, req: (string | number)[]) {
  return req?.includes(key)
}

// export function ensureType(key: string | string[]) {

// }
