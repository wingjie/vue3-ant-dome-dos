import { message } from 'ant-design-vue'
import { Ref, unref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useVModel } from '@vueuse/core'
import { assign, typeOf, validatePromiseAll } from '@/common/utils/autoImport'
import { addRow, delRow } from './index'

type formDataType = { [p: string]: any }
interface enDataType {
  props?: any
  emit?: any
  name?: string // todo: title使用
  pageType?: Ref<string> | string // todo: 默认look、edit时候会自动触发get配置的方法
  get?: ((formData: formDataType) => Function) | Function // todo: 是个接口的话将自动赋值给formData, 若业务不是要赋值给formData,请借助下面的upData
  upDate?: (res: any) => Function | boolean | void // todo: 将get请求回来的值传出去
  formData?: formDataType
  add?: ((data: any, formData: formDataType) => Function) | Function // todo: 添加的接口配置
  edit?: ((data: any, formData: formDataType) => Function) | Function // todo: 修改的接口配置
  ok?: // todo : 点击确定按钮时候触发的方法配置,这是个钩子函数
  | ((status: string, isBefore?: boolean) => boolean | void)
    | [
        (
          status: undefined | 'look' | 'add' | 'edit' | string,
          isBefore?: boolean, // todo: 先true再false，当'add' | 'edit'显的更为重要，true为校验前，false为校验调用过接口时候
          cloneDeepData?: { [p: string]: any },
          data?: { [p: string]: any }
        ) => boolean | void,
        'add' | 'edit' | 'look' | 'all' | undefined
      ]
  open?: () => boolean | void
  close?: () => boolean | void
  vModal?: { [p: string]: string } // todo: 需要vModal处理的字段并换结构成的字段 结构出的字段：props中的字段
  setup?: {
    pageTypeConfig?: {
      [p: string]: { text: string; value: string }
    }
  }
  formRef?: any
}
const defaultSetup = {
  pageTypeConfig: {
    add: { text: '添加', value: 'add' },
    edit: { text: '修改', value: 'edit' },
    look: { text: '查看', value: 'look' },
  },
}
const defaultVModal = {
  visible: 'modelValue',
}

export default function install(fn: () => enDataType, autoGet: boolean = true) {
  const enData: enDataType = fn()
  const formData = ref(enData?.formData ? cloneDeep(enData.formData) : {})
  const formRef = enData?.formRef ?? ref()
  const { pageType } = enData

  const assignSetupData = assign({}, defaultSetup, enData?.setup || {})
  const assignVModal = assign({}, defaultVModal, enData?.vModal || {})

  const mapPageType: any = assignSetupData.pageTypeConfig
  const addStr = mapPageType.add.value
  const editStr = mapPageType.edit.value
  const lookStr = mapPageType.look.value

  const titleType = computed(() => {
    if (pageType && unref(pageType)) {
      return mapPageType[unref(pageType)]?.text
    }
    return ''
  })
  const pageText = titleType
  const title = computed(() => {
    if (!enData?.name) {
      message.warning('没有设置name:无法组成title')
    }
    return `${titleType.value}${enData.name}`
  })

  const $emit = enData.emit

  const vModalKey = computed(() => {
    const obj: { [p: string]: any } = {}
    if (!enData?.props) return obj
    Object.entries(assignVModal).forEach(([key, item]: any) => {
      obj[key] = useVModel(enData.props, item, enData.emit)
    })
    return obj
  })
  const visible = vModalKey?.value?.visible || ref()

  const bRef = ref()
  const cRef = ref()
  const dRef = ref()
  const eRef = ref()

  const refData = [formRef, bRef, cRef, dRef, eRef]

  const loading = ref(false)
  const okConfig: any = {
    fn: '',
    type: '',
  }
  if (typeof enData?.ok === 'function') {
    okConfig.fn = enData?.ok
    okConfig.type = 'all'
  } else if (typeOf(enData?.ok) === 'array') {
    okConfig.fn = enData?.ok?.[0]
    okConfig.type = enData?.ok?.[1] ?? 'all'
  }
  async function ok() {
    const data = reactive(cloneDeep(formData.value))
    if (![lookStr, addStr, editStr].includes(unref(pageType || ''))) {
      if (okConfig.type === 'all') {
        const bool = okConfig?.fn?.(undefined, true, data)
        if (bool === false) return
        // const boolAfter = okConfig?.fn?.(undefined, false, data)
        // if (boolAfter === false) return
      }
      visible.value = false
      return
    }
    if (pageType && unref(pageType) === lookStr) {
      if (
        okConfig.type === 'all' ||
        okConfig.type === mapPageType[unref(pageType)].value
      ) {
        const bool = okConfig?.fn?.(lookStr, true, data)
        if (bool === false) return
        const boolAfter = okConfig?.fn?.(lookStr, false, data)
        if (boolAfter === false) return
      }
      visible.value = false
      return
    }
    const res = await validatePromiseAll(refData)
    if (!res) {
      message.warning('请填写完整并正确!')
      return
    }
    loading.value = true
    if (unref(pageType) === addStr) {
      const fns = enData?.add
      if (!okConfig?.fn && !fns) {
        return message.warning('请配置好添加的配置！')
      }
      if (
        okConfig.type === 'all' ||
        okConfig.type === mapPageType[unref(pageType) || ''].value
      ) {
        const bool = okConfig?.fn?.(addStr, true, data)
        if (bool === false) return
      }
      if (fns) {
        return fns(data, formData.value)?.then(() => {
          if (
            okConfig.type === 'all' ||
            okConfig.type === mapPageType[unref(pageType) || ''].value
          ) {
            const bool = okConfig?.fn?.(addStr, false, data, formData)
            if (bool === false) return
          }
          message.success('添加成功！')
          visible.value = false
          $emit('ok')
        })
      }
      return
    }
    if (unref(pageType) === editStr) {
      const fns = enData?.edit
      if (!okConfig?.fn && !fns) {
        return message.warning('请配置好修改的配置！')
      }
      if (
        okConfig.type === 'all' ||
        okConfig.type === mapPageType[unref(pageType) || ''].value
      ) {
        const bool = okConfig?.fn?.(editStr, true, data)
        if (bool === false) return
      }
      if (fns) {
        return fns(data, formData.value)?.then(() => {
          if (
            okConfig.type === 'all' ||
            okConfig.type === mapPageType[unref(pageType) || ''].value
          ) {
            const bool = okConfig?.fn?.(editStr, false, data)
            if (bool === false) return
          }
          message.success('修改成功！')
          visible.value = false
          $emit('ok')
        })
      }
      return
    }
    if (
      okConfig.type === 'all' ||
      okConfig.type === mapPageType[unref(pageType) || ''].value
    ) {
      okConfig?.fn?.(mapPageType[unref(pageType) || ''].value, false, data)
    }
  }
  watch(
    () => visible.value,
    (val) => {
      if (!val) {
        const bool = enData?.close?.()
        if (bool !== false) {
          if (autoGet !== false) {
            reset()
          }
        }
      } else {
        const bool = enData?.open?.()
        if (
          (bool !== false && unref(pageType) === lookStr) ||
          unref(pageType) === editStr
        ) {
          if (autoGet !== false) {
            upDateData()
          }
        }
      }
    },
    {
      immediate: true,
    }
  )

  function upDateData() {
    const fns = enData?.get
    if (!fns) return message.warning('请配置好获取数据的配置！')
    loading.value = true
    let fun = fns(formData)
    if (typeof fun === 'function') {
      fun = fun(formData)
    }
    return fun?.then((res: any) => {
      const bool = enData?.upDate?.(res)
      if (bool === false) {
        return
      }
      formData.value = res
      loading.value = false
    })
  }

  function reset(data?: { [p: string]: any }) {
    formRef?.value?.resetFields()
    if (data) {
      formData.value = assign({}, formData.value, data)
    } else {
      formData.value = enData?.formData ? cloneDeep(enData.formData) : {}
    }
  }
  function validate(refDataArg?: any) {
    return new Promise((resolve) => {
      switch (typeOf(refDataArg)) {
        case 'object':
          resolve(unref(refDataArg)?.validate())
          break
        case 'array':
          resolve(validatePromiseAll(unref(refDataArg)))
          break
        default:
          resolve(validatePromiseAll(refData))
          break
      }
    })
  }
  function resetFields(refDataArg?: any) {
    switch (typeOf(refDataArg)) {
      case 'object':
        unref(refDataArg)?.resetFields?.()
        break
      case 'array':
        unref(refDataArg).forEach((item: any) => {
          unref(item)?.resetFields?.()
        })
        break
      default:
        unref(refData).forEach((item: any) => {
          unref(item)?.resetFields?.()
        })
        break
    }
  }

  const isReadonly = computed(() => {
    return unref(pageType) === lookStr
  })
  return {
    vModal: {
      ...vModalKey.value,
    },
    formData,
    formRef,
    title,
    titleType,
    visible,
    isReadonly, // todo: 根据pageType判断的是否只读
    loading,
    ok,
    reset, // todo: 重置，并清除校验
    addRow,
    delRow,
    refs: {
      loading,
      formData,
      formRef,
      titleType,
      visible,
      isReadonly,
    },
    refData,
    validate,
    resetFields,
    pageText, // todo: 废弃,现在叫title
  }
}
