// import { assign } from '@/common/componentsFn/assign'
import { assign } from '@/common/utils/traverseTree/index'

export function initData(data: any, array: any[]) {
  array.forEach((value: any) => {
    if (
      data?.config &&
      Object.prototype.hasOwnProperty.call(data?.config, value)
    ) {
      data[value] = data?.config[value]
    }
  })
  return data
}

export function assignFormItemAttr(
  item: { [p: string]: any },
  model: { [p: string]: any }
) {
  initData(item, ['disabled', 'isForm', 'rules', 'span'])
  const items = assign(
    {},
    { disabled: model.disabled, span: model.span },
    {
      colAttr: model?.colAttr,
      formItemAttr: model?.formItemAttr,
      config: {
        ...model?.config,
        placeholder: `请${
          [
            'input',
            'textarea',
            'mentions',
            'input-number',
            'auto-complete',
          ].includes(item.type)
            ? '填写'
            : '选择'
        }${item.label || item.title || ''}`,
      },
    },
    item
  )
  const formItemAttr: any = {}
  if (!items.rules && model?.rules?.[item.key]) {
    items.rules = model?.rules?.[item.key]
  }
  const formItemAttrMid: any = { rules: items.rules || [] }
  if (items.label) {
    formItemAttrMid.label = items.label
  }
  assign(formItemAttr, formItemAttrMid, items.formItemAttr)
  items.formItemAttr = formItemAttr
  if (!Object.prototype.hasOwnProperty.call(items, 'isForm')) {
    initData(items, ['isForm'])
  }
  return items
}
export function assignPropData() {}
