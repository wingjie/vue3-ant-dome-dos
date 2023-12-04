import { typeOf } from '@/common/utils/traverseTree/index'
import { rowMsgType, OptionProp } from '@/common/componentsFn/propType/form'

interface FindProp {
  field: { [p: string]: any } // 当前项
  record: { [p: string]: any } // 当前行的数据
  division?: string // 以什么符号分割，默认为'、'
  index: number | string | undefined // 下标
  model: { [p: string]: any } //
  optionsScoped?: { [p: string]: any; value: string | number }[]
  rowMsg?: rowMsgType
}
interface FindCodeProp extends FindProp {
  optionsScoped: { [p: string]: any; value: string | number }[]
  value: any
}

// todo 暴露函数====> 通过行找label名字
export function findCodeName({
  field,
  record,
  division = '、',
  index,
  model,
  optionsScoped = [],
  rowMsg,
}: FindProp) {
  return new Promise((resolve) => {
    const { key } = field
    const value = record[key]
    if (value === '' || value === undefined || value === null) {
      resolve('')
    }
    findCodeItem({
      value,
      field,
      record,
      index,
      model,
      division,
      optionsScoped,
      rowMsg,
    }).then((res: any) => {
      resolve(res.label)
    })
  })
}

interface unitType {
  label: string
  cursorDic: any[] | { value: any; [p: string]: any } | undefined | null
}

// todo 级联的翻译方法
function findCodeItemCascader({
  value,
  options,
  division,
}: {
  value: any[]
  options: { value: any; [p: string]: any }[]
  division: string
}): unitType {
  const unit: unitType = {
    label: '',
    cursorDic: [],
  }
  unit.cursorDic = value?.reduce(
    (prev: any, cur: string | number, curIndex: number) => {
      const unitItem = prev[curIndex]?.children?.find(
        (item: any) => item.value === cur
      )
      unit.label += `${unitItem?.label ?? cur}${division}`
      return unitItem
    },
    [{ children: options }]
  )
  unit.label =
    unit.label.substring(0, unit.label.length - 1) || value?.join(division)
  return unit
}

// todo 寻找翻译列表的当前项
export async function findCodeItem(data: FindCodeProp, optionsScoped?: any[]) {
  let options: any = []
  if (optionsScoped) {
    options = optionsScoped
  } else {
    options = await optionFn(data)
  }
  return new Promise((resolve) => {
    const { value, field, division = '、' } = data
    const unit: unitType = reactive({
      label: '',
      cursorDic: [],
    })
    // optionFn(data).then((options: any) => {
    if (options && isRef(options)) {
      options = options.value
    }
    if (typeOf(options) === 'array') {
      if (typeOf(value) === 'array') {
        if (field.type === 'cascader') {
          const unitData = findCodeItemCascader({ value, division, options })
          unit.label = unitData.label ?? '-'
          unit.cursorDic = unitData.cursorDic
        } else {
          unit.cursorDic = value?.reduce(
            (prev: any, cur: string | number, curIndex: number) => {
              const arrItem = options.find((item: any) => item.value === cur)
              unit.label += `${arrItem?.label ?? cur}${division}`
              prev[curIndex] = arrItem
              return prev
            },
            []
          )
          unit.label =
            unit.label.substring(0, unit.label.length - 1) ||
            value?.join(division) ||
            '-'
        }
      } else {
        const unitItem = options.find((item: any) => item.value === value)
        unit.cursorDic = unitItem
        unit.label = unitItem?.label ?? value ?? '-'
      }
    } else {
      unit.cursorDic = null
      unit.label =
        (typeOf(value) === 'array' ? value?.join(division) : value) ?? '-'
    }
    resolve(unit)
    // })
  })
}
// : { [p: string]: any; value: string | number }[] | undefined
// todo 寻找列表
export function optionFn(data: OptionProp) {
  return new Promise((resolve) => {
    const list = ref([])
    const optionData = data.field?.config?.options
      ? data.field?.config?.options
      : data.field?.options
    let options = data.model?.optionsData?.[data.field.key]
    if (optionData) {
      options = optionData
    }
    if (options) {
      if (typeOf(options) === 'function') {
        options = options(data.record, data)
        if (isRef(options)) {
          options = options.value
        }
        list.value = options
      }
      if (typeOf(options) === 'asyncfunction') {
        options(data.record, data).then((res: any) => {
          list.value = res
          resolve(list)
        })
        return
      }
      if (typeOf(options) === 'promise') {
        options.then((res: any) => {
          list.value = res
          resolve(list)
        })
        return
      }
      if (typeOf(options) === 'array') {
        list.value = options
        resolve(list)
        return
      }
      throw new Error(
        `${data?.field?.label ?? ''}${
          data?.field?.key
        } options数据应是 function 或者 数组`
      )
    } else if (data.field?.config?.options) {
      // // todo 这里指所有这样写，看似跟下面逻辑重复，其实是为了以后业务拓展给开发人员的一种开发灵感，以便更好的发散思维。（前提是目前这种写法在运行中是一样的，并未过多的运行）
      // resolve(data?.optionsScoped || [])
      // return
    }
    resolve(data?.optionsScoped || [])
  })
}
// todo 将异步写法变为同步属性
export function mapPlainTableAttr(
  table: any,
  asyncAttr: any,
  _together?: boolean
) {
  for (const keyT in asyncAttr) {
    if (typeOf(asyncAttr[keyT]) === 'array') {
      // 判断是否为Array
      if (typeOf(table[keyT]) === 'array') {
        table[keyT].push(...asyncAttr[keyT])
        table[keyT] = Array.from(new Set(table[keyT]))
      } else {
        throw Error(`${keyT}字段async中的类型无法向外合并，请检查是否错误`)
      }
    } else if (typeOf(asyncAttr[keyT]) === 'function') {
      const value = asyncAttr[keyT]()
      if (typeOf(value) === 'promise') {
        value.then((res: any) => {
          if (typeOf(table[keyT]) === 'array') {
            table[keyT].push(...res)
            table[keyT] = Array.from(new Set(table[keyT]))
          } else {
            table[keyT] = res
          }
        })
      } else if (typeOf(table[keyT]) === 'array') {
        table[keyT].push(...value)
        table[keyT] = Array.from(new Set(table[keyT]))
      } else {
        table[keyT] = value
      }
    } else if (typeOf(asyncAttr[keyT]) === 'asyncfunction') {
      // 异步方法判断
      asyncAttr[keyT]().then((res: any) => {
        if (typeOf(table[keyT]) === 'array') {
          table[keyT].push(...res)
          table[keyT] = Array.from(new Set(table[keyT]))
        } else {
          table[keyT] = res
        }
      })
    } else if (asyncAttr[keyT] instanceof Object) {
      // table[keyT] = {}
      mapPlainTableAttr(table[keyT], asyncAttr[keyT], _together)
    } else if (typeOf(table[keyT]) === 'array') {
      table[keyT].push(asyncAttr[keyT])
      table[keyT] = Array.from(new Set(table[keyT]))
    } else {
      table[keyT] = asyncAttr[keyT]
    }
  }
}
