import { Modal, message } from 'ant-design-vue'
import { Ref } from 'vue'
import { isEmpty } from 'lodash-es'
import downloadFile from '@/common/utils/commonWay/downloadFile'
import { addRow, delRow } from './index'
import {
  templateFileDownload,
  apiSorter,
  assign,
} from '@/common/utils/autoImport'
import { sorterInt } from '@/common/utils/commonWay/apiSorter'
import { tableAttrType } from '@/common/componentsFn/propType/table'
import SButtonGroup from '@/common/components/SpaceUI/SButtonGroup/index.vue'
import ExportButton from '@/common/components/ExportButton/index.vue'
import UpModal from '@/common/components/UpModal/index.vue'

interface dataOrFunType {
  api?:
    | Function
    | [Function, (type: 'then' | 'catch' | 'finally', data?: any) => void]
  action?: (
    isBefore?: 'ok' | 'cancel' | 'before',
    ...arg: any[]
  ) => undefined | boolean
  message?: string | false | undefined | null
  modal?: {
    title: string
    content: string | any
  }
}
interface resPaginationType {
  pageNumber: number
  pageSize: number
  total: number
  orders: string
  [p: string]: any
}
interface resDataType {
  pagination: {
    current: number
    pageSize: number
    total: number
    [p: string]: any
  }
  resPagination: resPaginationType
  sorterStr: string
  sorter: Ref<string[]>
  formData: Ref<{ [p: string]: any }>
  tableData: Ref<{ [p: string]: any }[]>
  tableLoading: Ref<boolean>
  selectedRowKeys: Ref<string[]>
}
interface enDataType {
  formRef?: any
  del?: Function
  disable?: Function
  run?: Function
  enable?: Function
  add?: ({
    page,
    open,
  }: {
    page: (msg: {
      type?: 'add' | 'clone' | 'edit' | 'look'
      [p: string]: string | undefined
    }) => void
    open: (msg?: { [p: string]: any }) => void
  }) => any
  import?: Function
  downEx?: [string, string]
  search?: ((data: any, msg: any) => Function) | Function
  exports?: ((data: any, msg: any) => Function) | Function
  exportAll?: Function
  page?: Function | { name?: string; path?: string }
  formData?: Ref<{ [p: string]: any }> | { [p: string]: any }
  modal?: {
    open: (data: {
      visible: Ref<boolean>
      msg: Ref<{
        type?: 'add' | 'clone' | 'edit' | 'look'
        [p: string]: any
      }>
    }) => void
    [p: string]: any
  }[]
  addModal?: {
    open: (data: {
      visible: Ref<boolean>
      msg: Ref<{
        type?: 'add' | 'clone' | 'edit' | 'look'
        [p: string]: any
      }>
    }) => void
    [p: string]: any
  }
  defaultSortOrder?:
    | string
    | string[]
    | [string, 'ascend' | 'descend' | 1 | 2 | undefined][]
    | sorterInt[]
}

export default function install(fn: () => enDataType, autoGet: boolean = true) {
  const enData: enDataType = fn()
  const pagination = reactive<any>({
    current: ref(1),
    pageSize: ref(10),
    total: ref(0),
  })
  const $router = useRouter()
  const route = useRoute()
  const modal = [
    modalScope(enData?.modal?.[0]),
    modalScope(enData?.modal?.[1]),
    modalScope(enData?.modal?.[2]),
    modalScope(enData?.modal?.[3]),
    modalScope(enData?.modal?.[4]),
  ]
  const addModal = modalScope()

  // 展开
  const expandedRowKeys = ref<(string | number)[]>([])
  // 第二个参数：o:打开，c:关闭，不传参数：切换
  function triggerExpandedRow(
    idValue: string | number,
    type?: 'o' | 'c'
  ): boolean {
    const index = expandedRowKeys.value.findIndex(
      (val: string | number) => val === idValue
    )
    if (index >= 0) {
      if (type !== 'o') {
        expandedRowKeys.value.splice(index, 1)
        return false
      }
    } else if (type !== 'c') {
      expandedRowKeys.value.push(idValue)
      return true
    }
    return true
  }

  const selectedRowKeys = ref<string[]>([])
  const onSelectChange = (id: string[]) => {
    selectedRowKeys.value = id
  }
  const sorter = ref<any>()
  const sorterStr = ref('')
  let defaultSortOrderStr = ''
  if (enData?.defaultSortOrder) {
    defaultSortOrderStr = apiSorter(enData.defaultSortOrder)
    sorterStr.value = defaultSortOrderStr
  }

  const resPagination = computed<resPaginationType>(() => {
    return {
      pageNumber: pagination.current - 1,
      pageSize: +pagination.pageSize,
      total: +pagination.total,
      orders: sorterStr.value,
    }
  })
  const formData = ref(enData?.formData || {})
  const tableData = ref<{ [p: string]: any }[]>([])
  const tableLoading = ref(false)
  const resData = computed<resDataType>(() => {
    return {
      pagination,
      resPagination: resPagination.value,
      sorterStr: sorterStr.value,
      sorter,
      formData,
      tableData,
      tableLoading,
      selectedRowKeys,
    }
  })
  // todo: tableAttr的静态配置
  const tableAttrData: tableAttrType = {
    expandedRowKeys,
    'row-selection': {
      selectedRowKeys,
      onChange: onSelectChange,
    },
    pagination: toRaw(pagination),
    onChange(msg: any, _filter: any, sorterMsg: any, { action }: any) {
      if (isEmpty(sorterMsg) || sorterMsg?.order) {
        sorter.value = sorterMsg
        sorterStr.value = apiSorter(sorterMsg)
      } else {
        sorterStr.value = defaultSortOrderStr
      }
      if (msg.current) {
        pagination.current = msg.current
        pagination.pageSize = msg.pageSize || 0
      }
      if (action === 'filter' || action === 'sort') {
        search('init')
      } else {
        search()
      }
    },
    rowKey: 'id',
    loading: tableLoading,
  }
  // todo: tableAttr的静态配置并暴漏出onChange
  function tableAttr(enDataMsg: tableAttrType): tableAttrType {
    const tableAttrAssign = assign({}, tableAttrData, enDataMsg)
    const data = {
      ...tableAttrAssign,
      onChange(msg: any, _filter: any, sorterMsg: any, actionData: any) {
        // const [msg, , sorterMsg, { action }] = dataMsg
        const { action } = actionData
        if (isEmpty(sorterMsg) || sorterMsg?.order) {
          sorter.value = sorterMsg
          sorterStr.value = apiSorter(sorterMsg)
        } else {
          sorterStr.value = defaultSortOrderStr
        }
        if (msg.current) {
          pagination.current = msg.current
          pagination.pageSize = msg.pageSize || 0
        }
        const bool = enDataMsg?.onChange?.(msg, _filter, sorterMsg, actionData)
        if (bool === false) {
          return
        }
        if (action === 'filter' || action === 'sort') {
          search('init')
        } else {
          search()
        }
      },
    }
    return data
  }
  Object.entries(tableAttrData).forEach(([key, item]: [string, any]) => {
    ;(tableAttr as tableAttrType)[key] = item
  })

  onMounted(() => {
    if (autoGet !== false) {
      search('init')
    }
  })

  const formRef = enData?.formRef ?? ref()
  // todo:搜索、查询
  async function search(status?: string, isValidate: boolean = true) {
    const resValidate = (await formRef?.value?.validate()) ?? {
      status: true,
    }
    if (isValidate && resValidate?.status !== true) {
      return message.warning('校验不通过')
    }
    if (status === 'init') {
      pagination.current = 1
    }
    const searchData = {
      ...formData.value,
      ...resPagination.value,
    }
    const fns = enData?.search
    if (!fns) return message.warning('请配置好搜索的配置！')
    tableLoading.value = true
    fns(searchData, resData)
      ?.then((res: any) => {
        const { content, total } = res
        tableData.value = content
        pagination.total = total
      })
      .finally(() => {
        tableLoading.value = false
      })
  }
  // todo:执行
  function run(id: string, text?: string, ...arg: any[]) {
    const fns = enData?.run
    if (!fns) return message.warning('请配置好执行的配置！')
    fns(id, ...[...arg, resData])?.then(() => {
      message.success(text ?? '执行成功!')
      search()
    })
  }

  // todo： 禁用
  function disable(id: string, text?: string, ...arg: any[]) {
    const fns = enData?.disable
    if (!fns) return message.warning('请配置好禁用的配置！')
    fns(id, ...[...arg, resData])?.then(() => {
      message.success(text ?? '禁用成功!')
      search()
    })
  }

  // todo:开启
  function enable(id: string, text?: string, ...arg: any[]) {
    const fns = enData?.enable
    if (!fns) return message.warning('请配置好启用的配置！')
    fns(id, ...[...arg, resData])?.then(() => {
      message.success(text ?? '启用成功!')
      search()
    })
  }

  // todo:跳转页面（新增，修改，查看）
  function page(msg: {
    type?: 'add' | 'clone' | 'edit' | 'look'
    [p: string]: string | undefined
  }) {
    const fns = enData?.page
    if (typeof fns === 'function') {
      fns(msg, resData)
      return
    }
    if (typeof fns === 'object') {
      if (fns?.name) {
        $router.push({
          name: fns?.name,
          query: { ...msg, formUrl: route.fullPath },
        })
      } else if (fns?.path) {
        $router.push({
          path: fns?.path,
          query: { ...msg, formUrl: route.fullPath },
        })
      }
    }
  }

  // todo：删除
  function del(id?: string | string[], ...arg: any[]) {
    let ids: string | string[] | undefined = id || selectedRowKeys.value
    if (id) {
      if (typeof id === 'string') {
        ids = [id]
      } else {
        ids = id
      }
    } else {
      ids = selectedRowKeys.value
    }
    if (ids.length === 0) return message.warning('请至少选择一条数据!')
    Modal.confirm({
      title: '删除',
      content: `确定要删除此${ids.length > 1 ? ids.length : ''}条数据吗？`,
      onOk() {
        const fns = enData?.del
        if (!fns) return message.warning('请配置好删除的配置！')
        fns(ids, ...[...arg, resData])?.then(() => {
          message.success('删除成功!')
          if (tableData.value.length === 1) {
            pagination.current =
              pagination.current > 1
                ? pagination.current - 1
                : pagination.current
          }
          selectedRowKeys.value = []
          // if (typeof id !== 'string') {
          // }
          search()
        })
      },
    })
  }

  function setupFun(
    dataOrFun: dataOrFunType | (() => dataOrFunType)
  ): (...arg: any[]) => void {
    return (...arg: any[]) => {
      const data = typeof dataOrFun === 'function' ? dataOrFun() : dataOrFun
      const action = data?.action
      const bool = action?.('before', ...arg)
      if (bool === false) {
        return
      }
      const APIfns = typeof data?.api === 'object' ? data?.api?.[0] : data?.api
      const apiFun = typeof data?.api === 'object' ? data?.api?.[1] : undefined
      function api() {
        if (!APIfns) return message.warning('请配置好配置！')
        APIfns(...[...arg, resData])
          ?.then((res: any) => {
            const messageText = data?.message
            if (messageText) {
              message.success(messageText)
            }
            apiFun?.('then', res)
          })
          .catch((err: any) => {
            apiFun?.('catch', err)
          })
          .finally(() => {
            apiFun?.('finally')
          })
      }
      if (!data?.modal) {
        api()
      } else {
        const { modal: modalScopeT } = data
        Modal.confirm({
          ...modalScopeT,
          title: modalScopeT?.title,
          content: modalScopeT?.content,
          onOk() {
            const boolOk = action?.('ok', ...arg)
            if (boolOk === false) {
              return
            }
            api()
          },
          onCancel() {
            action?.('cancel', ...arg)
          },
        })
      }
    }
  }

  // todo：上传（导入）
  const upModal = reactive({
    visible: false,
    onOk(file: { originFileObj: string | Blob }) {
      const fileData = new FormData()
      fileData.append('file', file.originFileObj)
      const fns = enData?.import
      if (!fns) return message.warning('请配置好导入的配置！')
      fns(fileData, resData)
        .then(() => {
          message.success('上传成功！')
          upModal.visible = false
          search('init')
        })
        .catch(() => {})
        .finally(() => {})
    },
    onDown() {
      const fns = enData?.downEx
      if (!fns) return message.warning('请配置好导入的配置！')
      templateFileDownload(fns[0], fns[1])
    },
    open() {
      upModal.visible = true
    },
  })

  // todo: 导出当前页面
  function exports(
    data: any = {
      ...formData.value,
      ...resPagination.value,
    }
  ) {
    const searchData = data
    const fns = enData?.exports
    if (!fns) return message.warning('请配置好导出当前页的配置！')
    fns(searchData, resData)?.then((res: any) => {
      downloadFile(res)
    })
  }
  // todo：导出所有数据
  function exportAll() {
    const params = {
      ...formData.value,
      ...resPagination.value,
    }
    const fns = enData?.exportAll
    if (!fns) return message.warning('请配置好导出所有的配置！')
    fns(params, resData).then((res: any) => {
      downloadFile(res)
    })
  }
  // todo:导出按钮
  const exportButton =
    !enData?.exports && !enData?.exportAll
      ? undefined
      : {
          onExports: enData?.exports ? () => exports() : undefined,
          onExportAll: enData?.exportAll ? () => exportAll() : undefined,
        }
  // todo: 批量删除的的组件
  const DelListButton = defineComponent({
    setup(props: any, data: any) {
      const slotObj = {
        default: () => {
          return (
            data.slots?.default?.() ??
            h(
              'span',
              {
                style: {
                  'font-size': '14px',
                  color: '#5b748b',
                  'line-height': '20px',
                },
              },
              [
                '已选择',
                h(
                  'span',
                  {
                    style: {
                      'font-size': '16px',
                      color: '#25b7db',
                      'line-height': '22px',
                    },
                  },
                  [unref(selectedRowKeys).length]
                ),
              ]
            )
          )
        },
      }
      return () =>
        h(
          SButtonGroup,
          {
            onDelList() {
              del()
            },
            ...data.attrs,
          },
          slotObj
        )
    },
  })
  const HandleExportButton = h(ExportButton, { ...exportButton })
  // todo: HandleInButton整体
  const HandleInButton = defineComponent({
    setup(props: any, data: any) {
      const obj = {
        onImport: enData?.import ? upModal.open : null,
        onAdd: enData?.add
          ? () => {
              enData.add?.({ page, open: addModal.open })
            }
          : null,
        ...data.attrs,
      }
      const select = computed(() => {
        if (selectedRowKeys.value.length) {
          return [h(DelListButton), data.slots?.selectKey?.()]
        }
        return null
      })
      return () => {
        if (selectedRowKeys.value.length) {
          return select.value
        }
        return h(SButtonGroup, obj, () => {
          return [
            h(UpModal, {
              ...upModal,
              modelValue: upModal.visible,
              onChange(val: boolean) {
                upModal.visible = val
              },
            }),
            HandleExportButton,
            data.slots?.default?.(),
          ]
        })
      }
    },
  })

  return {
    expanded: [triggerExpandedRow, expandedRowKeys] as [
      (idValue: string | number, type?: 'o' | 'c') => boolean,
      Ref<(string | number)[]>
    ],
    formRef,
    tableLoading,
    formData,
    tableData,
    pagination,
    selectedRowKeys,
    exports,
    onSelectChange,
    del,
    disable,
    enable,
    search,
    tableAttr,
    page,
    modal,
    addModal,
    upModal,
    run,
    exportButton,
    addRow,
    delRow,
    setupFun,
    DelListButton,
    HandleInButton,
    HandleExportButton,
  }
}

export function modalScope(setupMsg?: any) {
  const obj = {
    visible: ref(false),
    msg: ref<{ [p: string]: any }>({}),
    'onUpdate:modelValue': (val: boolean) => {
      obj.visible.value = val
    },
  }
  function open(msg?: { [p: string]: any }) {
    obj.visible.value = true
    if (setupMsg?.open) {
      setupMsg?.open?.(obj, msg)
      return
    }
    if (msg) {
      obj.msg.value = msg
    }
  }
  return { ...obj, open }
}
