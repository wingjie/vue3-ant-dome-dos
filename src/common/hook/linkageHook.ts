import { assign } from '@/common/utils/traverseTree'
import {
  fieldListType,
  columnsType,
} from '@/common/componentsFn/propType/index'
import {
  CustomNotRequired,
  // CustomRequired,
} from '@/common/componentsFn/propType'

export interface configType
  extends CustomNotRequired<fieldListType, 'key'>,
    CustomNotRequired<columnsType, 'key'> {
  title?: string
  label?: string
  key?: string
  type?: string
  span?: number
  config?: {
    [p: string]: any
  }
  [p: string]: any
}
export interface pipelineType {
  change?: (opts: any) => void
}
export interface otherConfigType {
  change?: (opts: any) => void
}
export type returnType = [
  configType[],
  { label: string; value: string; [p: string]: any }[][]
]

export default function modal(
  config: configType[] | undefined = [],
  pipeline?: pipelineType[] | undefined,
  otherConfig?: otherConfigType
): returnType {
  const options = reactive<[][]>([[], [], [], [], []])
  const linkageList: any = reactive([
    {
      label: '一级',
      title: '一级',
      key: 'one',
      type: 'select',
      config: {
        options: computed(() => {
          return []
        }),
        change: (opts: any) => {
          const { dataAt } = opts
          const [
            ,
            { key: twoKey },
            { key: threeKey },
            { key: fourKey },
            { key: fiveKey },
          ] = linkageList
          dataAt[twoKey] = undefined
          dataAt[threeKey] = undefined
          dataAt[fourKey] = undefined
          dataAt[fiveKey] = undefined
          pipeline?.[0]?.change?.(opts)
          otherConfig?.change?.(opts)
        },
      },
    },
    {
      label: '二级',
      title: '二级',
      key: 'two',
      type: 'select',
      config: {
        options(_: any, data: any) {
          const [{ key: oneKey }] = linkageList
          const { rowMsg } = data
          const option = rowMsg?.unit[oneKey]?.cursorDic?.menuItems || []
          options[1] = rowMsg?.unit[oneKey]?.cursorDic?.menuItems || []
          return option
        },
        change: (opts: any) => {
          const { dataAt } = opts
          const [, , { key: threeKey }, { key: fourKey }, { key: fiveKey }] =
            linkageList
          dataAt[threeKey] = undefined
          dataAt[fourKey] = undefined
          dataAt[fiveKey] = undefined
          pipeline?.[1]?.change?.(opts)
          otherConfig?.change?.(opts)
        },
      },
    },
    {
      label: '三级',
      title: '三级',
      key: 'three',
      type: 'select',
      config: {
        options(_: any, data: any) {
          const [, { key: towKey }] = linkageList
          const { rowMsg } = data
          const option = rowMsg?.unit[towKey]?.cursorDic?.menuItems || []
          options[2] = rowMsg?.unit[towKey]?.cursorDic?.menuItems || []
          return option
        },
        change: (opts: any) => {
          const { dataAt } = opts
          const [, , , { key: fourKey }, { key: fiveKey }] = linkageList
          dataAt[fourKey] = undefined
          dataAt[fiveKey] = undefined
          pipeline?.[2]?.change?.(opts)
          otherConfig?.change?.(opts)
        },
      },
    },
    {
      label: '四级',
      title: '四级',
      key: 'four',
      type: 'select',
      config: {
        options(_: any, data: any) {
          const [, , { key: threeKey }] = linkageList
          const { rowMsg } = data
          const option = rowMsg?.unit[threeKey]?.cursorDic?.menuItems || []
          options[3] = option
          return option
        },
        change: (opts: any) => {
          const { dataAt } = opts
          const [, , , , { key: fiveKey }] = linkageList
          dataAt[fiveKey] = undefined
          pipeline?.[3]?.change?.(opts)
          otherConfig?.change?.(opts)
        },
      },
    },
    {
      label: '五级',
      title: '五级',
      key: 'five',
      type: 'select',
      config: {
        options(_: any, data: any) {
          const [, , , { key: fourKey }] = linkageList
          const { rowMsg } = data
          const option = rowMsg?.unit[fourKey]?.cursorDic?.menuItems || []
          options[4] = option
          return option
        },
        change: (opts: any) => {
          // const { dataAt, value } = opts
          pipeline?.[4]?.change?.(opts)
          otherConfig?.change?.(opts)
        },
      },
    },
  ])
  const assignLinkageList = computed(() =>
    assign({}, toRaw(linkageList), config)
  )
  const resolve = reactive<returnType>([assignLinkageList.value, options])
  return resolve
}
