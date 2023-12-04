import { VNode, Slot, Ref, ComputedRef } from 'vue'
import { CustomNotRequired, reactiveType } from './index'
import {
  ruleType,
  formAttrType,
  formItemAttrType,
  configType as formConfigType,
  optionsTypeFun,
  optionsType,
  fieldListType,
} from './form'

type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

interface configType extends formConfigType {
  isShowFindCodeName?: boolean
}
// 加载loading
interface LoadingType {
  delay?: number
  indicator?: VNode | string | Slot
  size?: 'small' | 'default' | 'large' | string
  spinning?: boolean
  tip?: string | Slot
  wrapperClassName?: string
}
// 文字提示
interface TooltipType {
  title?: string | Slot
  align?: {
    points?: string[]
    offset?: number[]
    targetOffset?: number[]
    overflow?: {
      adjustX?: boolean
      adjustY?: boolean
      alwaysByViewport?: boolean
    }
    useCssRight?: boolean
    useCssBottom?: boolean
    useCssTransform?: boolean
  }
  arrowPointAtCenter?: boolean
  autoAdjustOverflow?: boolean
  color?: string
  defaultVisible?: boolean
  destroyTooltipOnHide?: boolean
  getPopupContainer?: (triggerNode?: HTMLElement) => void
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  overlayClassName?: string
  overlayStyle?: object
  placement?: string
  trigger?: 'hover' | 'focus' | 'click' | 'contextmenu' | string
  visible?: boolean
}
// 分页类型
interface paginationType {
  current?: number
  defaultPageSize?: number
  disabled?: boolean
  hideOnSinglePage?: boolean
  itemRender?: (
    object: {
      page: number
      type: 'page' | 'prev' | 'next'
    },
    originalElement: HTMLElement
  ) => VNode | string | Slot
  pageSize?: number
  pageSizeOptions?: string[]
  'page-size-options'?: string[]
  responsive?: boolean
  showLessItems?: boolean
  'show-quick-jumper'?: boolean
  showQuickJumper?: boolean
  'show-size-changer'?: boolean
  showSizeChanger?: boolean
  showTotal?: (total: number, range: number) => void
  simple?: boolean
  size?: string
  total?: number
  position?: (
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
  )[]
}
// 表格选择功能-自定义选择项
interface rowSelectionInSelectionsType {
  key?: string
  text?: string | VNode
  onSelect?: (changeableRowKeys: string[]) => void
}
// 表格选择功能的配置
export interface rowSelectionType {
  checkStrictly?: boolean
  columnTitle?: string | VNode
  columnWidth?: string | number
  fixed?: boolean
  getCheckboxProps?: (record: object) => void
  hideDefaultSelections?: boolean
  hideSelectAll?: boolean
  preserveSelectedRowKeys?: boolean
  selectedRowKeys?: string[]
  selections?: rowSelectionInSelectionsType[] | boolean
  type?: 'checkbox ' | 'radio'
  onChange?: (selectedRowKeys: string[], selectedRows: object[]) => void
  onSelect?: (
    record: object,
    selected: boolean,
    selectedRows: object[],
    nativeEvent: object
  ) => void
  onSelectAll?: (
    selected: boolean,
    selectedRows: object[],
    changeRows: object[]
  ) => void
  onSelectInvert?: (selectedRows: object[]) => void
  onSelectNone?: () => void
}
// 表格属性类型
export interface tableAttrType {
  bodyCell?: Slot
  bordered?: boolean
  childrenColumnName?: string
  columns?: columnsType[]
  components?: object
  customFilterDropdown?: Slot
  customFilterIcon?: Slot
  customHeaderRow?: (columns: columnsType[], index: number) => object
  customRow?: (columns: object, index: number) => object
  dataSource?: object[]
  defaultExpandAllRows?: boolean
  defaultExpandedRowKeys?: string[]
  emptyText?: Slot
  expandedRowKeys?: reactiveType<(string | number)[]>
  expandedRowRender?: (
    record: object,
    index: number,
    indent: number,
    expanded: boolean
  ) => VNode | string | Slot
  expandFixed?: boolean | 'left' | 'right' | string
  expandIcon?: ((props: object) => VNode | string) | Slot
  expandRowByClick?: boolean
  footer?: (currentPageData: object[]) => void | Slot
  getPopupContainer?: (triggerNode: VNode | string) => HTMLElement
  headerCell?: Slot
  indentSize?: number
  loading?: boolean | LoadingType | Ref<boolean>
  locale?: {
    filterConfirm: string
    filterReset: string
    emptyText: string
  }
  pagination?: paginationType | false | boolean
  rowClassName?: (record: object, index: number) => string
  rowExpandable?: (record: object) => boolean
  rowKey?: string | ((record: object) => string)
  rowSelection?: rowSelectionType
  scroll?: {
    scrollToFirstRowOnChange?: boolean
    x?: string | number | true
    y?: string | number
  }
  showExpandColumn?: boolean
  showHeader?: boolean
  showSorterTooltip?: boolean | TooltipType
  size?: 'default' | 'middle' | 'small' | string
  sortDirections?: 'ascend' | 'descend' | string[]
  sticky?:
    | boolean
    | {
        offsetHeader?: number
        offsetScroll?: number
        getContainer?: () => HTMLElement
      }
  summary?: Slot
  tableLayout?: '-' | 'auto' | 'fixed'
  title?: (currentPageData: object[]) => void | Slot
  transformCellText?: (data: {
    text: string
    column: columnsType
    record: object
    index: number
  }) => VNode | string | number
  onChange?: (
    pagination: paginationType,
    filters: { order: any; [p: string]: any },
    sorter: sorterType,
    data: {
      action: 'sort' | 'filter' | 'paginate'
      currentDataSource: object[]
    }
  ) => void | boolean
  onExpand?: (expanded: boolean, record: object) => void
  onExpandedRowsChange?: (expandedRows: string[]) => void
  onResizeColumn?: (width: number, column: columnsType) => void
  [p: string]: any
}
interface sorterType {
  current?: columnsType
  columnKey?: string
  field?: string
  order?: 'descend' | 'ascend' | string
}

// 表格tableModel配置项
export interface tableModelType {
  isForm?: boolean
  follow?: boolean
  tableHeight?: string | null
  formAttr?: formAttrType
  formItemAttr?: formItemAttrType
  rules?: {
    [p: string]: ruleType | ruleType[]
  }
  config?: configType
  optionsData?: {
    [p: string]: reactiveType<optionsType[]> | optionsTypeFun
  }
  async?: {
    optionsData?: {
      [p: string]: optionsType | optionsTypeFun
    }
  }
  tableAttr?: tableAttrType
  columnsConfig?: CustomNotRequired<columnsType, 'key'>
  [p: string]: any
}
export interface columnsType extends fieldListType {
  slotHead?: boolean
  align?: 'left' | 'right' | 'center' | string
  colSpan?: number
  customCell?: (record: object, rowIndex: number, column: columnsType) => void
  customFilterDropdown?: boolean
  customHeaderCell?: (column: columnsType) => void
  customRender?: (p: {
    text: string
    record: object
    index: number
    column: columnsType
  }) => void
  dataIndex?: string | string[]
  defaultFilteredValue?: string[]
  defaultSortOrder?: 'ascend' | 'descend' | string
  ellipsis?: boolean | { showTitle?: boolean }
  filterDropdown?: VNode | string
  filterDropdownVisible?: boolean
  filtered?: boolean
  filteredValue?: string[]
  filterIcon?:
    | VNode
    | string
    | ((p: { filtered: boolean; column: columnsType }) => VNode | string)
  filterMode?: 'menu' | 'tree' | string
  filterMultiple?: boolean
  filters?:
    | { text: string; value: string; [p: string]: any }[]
    | Ref<{ text: string; value: string; [p: string]: any }[]>
    | ComputedRef<{ text: string; value: string; [p: string]: any }[]>
  filterSearch?: boolean
  fixed?: boolean | string
  maxWidth?: number
  minWidth?: number
  resizable?: boolean
  responsive?: Breakpoint[]
  showSorterTooltip?: boolean | TooltipType
  sortDirections?: ('ascend' | 'descend' | string)[]
  sorter?: Function | boolean | { multiple: number; [p: string]: any }
  sortOrder?: boolean | string
  title?: string
  width?: string | number
  onFilter?: Function
  onFilterDropdownVisibleChange?: Function
  [p: string]: any
}
