// import { DefineComponent } from 'vue'

import { reactiveType } from './index'

export interface rowMsgType {
  options: {
    [p: string]: { label: string; value: string; [p: string]: any }[]
  }
  unit: { [p: string]: { label: string; value: string; [p: string]: any } }
}

export interface OptionProp {
  model: { [p: string]: any }
  field: { [p: string]: any }
  name?: string | (string | number)[]
  record: { [p: string]: any }
  index: number | string | undefined
  optionsScoped: { [p: string]: any; value: string | number }[]
  rowMsg?: rowMsgType
}
export type validatorType = (
  rule: {
    field: string
    fullField: string
    required: true
    type: string
    validator: validatorType
  },
  value?: any,
  callback?: () => any
) => Promise<boolean | Error | unknown>
export interface ruleType {
  type?: string
  enum?: string
  len?: number
  max?: number
  message?: string
  min?: number
  pattern?: RegExp
  required?: boolean
  transform?: (value: any) => any
  trigger?: 'blur' | 'change' | ['change', 'blur'] | string
  validator?: validatorType
  whitespace?: boolean
  [p: string]: any
}
// todo: row类型
interface rowType {
  align?: 'top' | 'middle' | 'bottom' | string
  gutter?: number | object | any[]
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | string
  wrap?: boolean
  [p: string]: any
}
// todo: col类型
interface colType {
  flex?: string | number
  offset?: number
  order?: number
  pull?: number
  push?: number
  span?: number
  xxxl?: number | object
  xs?: number | object
  sm?: number | object
  md?: number | object
  lg?: number | object
  xl?: number | object
  xxl?: number | object
  [p: string]: any
}
// todo: form类型
export interface formAttrType {
  colon?: boolean
  hideRequiredMark?: boolean
  labelAlign?: 'left' | 'right' | string
  labelCol?: colType
  labelWrap?: boolean
  layout?: 'horizontal' | 'vertical' | 'inline' | string
  model?: object
  name?: string
  noStyle?: boolean
  rules?: {
    [p: string]: ruleType | ruleType[]
  }
  scrollToFirstError?: boolean | 'auto' | 'smooth' | Function | string
  validateOnRuleChange?: boolean
  validateTrigger?: 'change' | 'blur' | ['change', 'blur']
  wrapperCol?: colType
  [p: string]: any
}
// todo: form-item类型
export interface formItemAttrType {
  autoLink?: boolean
  colon?: boolean
  extra?: string
  hasFeedback?: boolean
  help?: string
  htmlFor?: string
  label?: string
  labelAlign?: 'left' | 'right'
  labelCol?: colType
  name?: string
  required?: boolean
  rules?: ruleType | ruleType[]
  validateFirst?: boolean
  validateStatus?: 'success' | 'warning' | 'error' | 'validating' | string
  validateTrigger?: 'change' | 'blur' | string | ['change', 'blur']
  wrapperCol?: colType
  [p: string]: any
}
export interface optionsType {
  label?: string
  value?: string | number | boolean
  disabled?: boolean
  [p: string]: any
}
export type disabledFormTypeFun = (
  msg: {
    field: fieldListType
    record: object
    rowIndex?: number
    value: any
    [p: string]: any
  },
  record: object,
  modelData: formModelType
) => boolean
interface componentType {
  emits?: string[]
  props?: { [p: string]: any }
  render?: Function
  setup?: Function
  [p: string]: any
}
type customRenderComponentType = (
  msg: {
    field: fieldListType
    record: object
    rowIndex?: number
    value: any
    [p: string]: any
  },
  record: object,
  modelData: formModelType
) => componentType

// todo:config类型
export interface configType {
  addonAfter?: string
  addonBefore?: string
  allowClear?: boolean
  bordered?: boolean
  defaultValue?: string
  disabled?: boolean | disabledFormTypeFun
  id?: string
  maxlength?: number
  prefix?: string
  showCount?: boolean
  size?: 'large' | 'default' | 'small' | string
  suffix?: string
  type?: 'textarea' | string
  value?: string
  isForm?: boolean
  isCore?: boolean
  isShowFindCodeName?: boolean | 'isJust'
  options?: reactiveType<optionsType[]> | optionsTypeFun
  tooltip?: string | tooltipFun
  customRender?: componentType | customRenderComponentType
  config?: {
    disabled?:
      | ((
          facing: { index: number; item: optionsType },
          msg: {
            field: fieldListType
            record: object
            rowIndex: number | undefined
            extra: any
            [p: string]: any
          }
        ) => boolean)
      | boolean
  }
  watchScoped?: (
    sr: {
      rowIndex: number | undefined
      field: fieldListType
      record: object
      value: any
      extra: any
      options: optionsType
      rowMsg: rowMsgType
    },
    direct: {
      value: any
      options: optionsType
      config: configType
      extra: any
    }
  ) => void
  [p: string]: any
  change?: changeFunction
  blur?: changeFunction
  keyup?: changeFunction
  dropdownVisibleChange?: dropdownVisibleChangeFunction
}

export type optionsTypeFun = (
  record: object,
  data: OptionProp
) => reactiveType<optionsType[]> | Promise<reactiveType<optionsType[]>>
export type tooltipFun = (
  one: {
    rowIndex: number | undefined
    field: fieldListType
    record: object
    value: any
    [p: string]: any
  },
  formData: object,
  modelData: formModelType
) => string
// todo: changeFunction
export type changeFunction = (one: {
  e: any
  value: any
  field: fieldListType
  unit: optionsType | null
  label: string
  record: object
  rowIndex?: number | string
  extra: any
  [p: string]: any
}) => void
// todo: dropdownVisibleChangeFunction
export type dropdownVisibleChangeFunction = (one: {
  field: fieldListType
  record: object
  rowIndex?: number | string
  extra: any
  status: boolean
  [p: string]: any
}) => void
export interface formModelType {
  span?: number
  expandNum?: number
  isForm?: reactiveType<boolean>
  follow?: boolean
  disabled?: reactiveType<boolean> | disabledFormTypeFun
  formAttr?: formAttrType
  rowAttr?: rowType
  colAttr?: colType
  formItemAttr?: formItemAttrType
  rules?: {
    [p: string]: ruleType[]
  }
  config?: configType
  optionsData?: {
    [p: string]: reactiveType<optionsType[]> | optionsTypeFun
  }
  async?: {
    optionsData?: {
      [p: string]: reactiveType<optionsType[]> | optionsTypeFun
    }
  }
  [p: string]: any
}
type typeType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'switch'
  | 'textarea'
  | 'radio'
  | 'radio-group'
  | 'checkbox'
  | 'checkbox-group'
  | 'time-picker'
  | 'date-picker'
  | 'slot'
  | 'slotOut'
  | string
export interface fieldListType {
  label?: string
  key: string
  span?: number
  type?: typeType
  isForm?: boolean | 'isJust' | string
  disabled?: boolean | disabledFormTypeFun
  formItemAttr?: formItemAttrType
  rules?: ruleType | ruleType[]
  config?: configType
  checked?: reactiveType<boolean>
  options?: reactiveType<optionsType[]> | optionsTypeFun
  [p: string]: any
}

type fn = (
  facing: { index: number; item: optionsType },
  msg: {
    field: fieldListType
    record: object
    rowIndex: number | undefined
    extra: any
    [p: string]: any
  }
) => boolean

const a: fn = ({ item }: any, { record }: any) => {
  return [record.firstOrder, record.secondOrder, record.thirdOrder].includes(
    item.value
  )
}
console.log('a', a)
