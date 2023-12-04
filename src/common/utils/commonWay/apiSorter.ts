import { typeOf } from '@/common/utils/traverseTree'

export interface sorterInt {
  columnKey?: string
  field?: string
  order?: 'descend' | 'ascend' | 1 | 2 | string
  [p: string]: any
}
export default function apiSorter(
  sorter:
    | sorterInt
    | string
    | sorterInt[]
    | [
        string,
        'ascend' | 'descend' | 1 | 2 | undefined,
        'NATIVE' | 'NULLS_FIRST' | 'NULLS_LAST' | undefined
      ][],
  order: 'ascend' | 'descend' | 1 | 2 = 'descend',
  native: 'NATIVE' | 'NULLS_FIRST' | 'NULLS_LAST' = 'NATIVE'
) {
  if (typeof sorter === 'string') {
    return `${sorter},${mapOrderString(order)},${native}`
  }
  const sorterData: any = typeOf(sorter) === 'array' ? sorter : [sorter]
  return sorterData
    .map((item: any) => {
      if (Array.isArray(item)) {
        const orderString = item[1]
          ? mapOrderString(item[1])
          : mapOrderString(order)
        const nativeString = item[2] ?? native
        return `${item[0]},${orderString},${nativeString}`
      }
      if (typeof item === 'string') {
        return `${item},${mapOrderString(order)},${native}`
      }
      const orderString = item.order
        ? mapOrderString(item.order)
        : mapOrderString(order)
      return (item.field || item.columnKey) && item.order
        ? `${item.field || item.columnKey},${orderString},${native}`
        : undefined
    })
    .join(';')
}
function mapOrderString(val: string | 1 | 2) {
  return val === 'ascend' || val === 1 ? 'ASC' : 'DESC'
}

export function apiChange(
  data: any,
  pagination: any,
  sort: any,
  fn?: Function
) {
  const [msg, , sorter, { action }] = data
  if (sorter) {
    sort.value = apiSorter(sorter)
  }
  if (msg.current) {
    pagination.current = msg.current
    pagination.pageSize = msg.pageSize
  }
  if (action === 'filter' || action === 'sort') {
    fn?.('init')
  } else {
    fn?.()
  }
}
