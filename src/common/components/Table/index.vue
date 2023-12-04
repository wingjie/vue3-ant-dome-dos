<template>
  <div class="tableBox">
    <a-button v-show="false" @click="validate">校验测试</a-button>
    <a-form
      v-if="treeData.length"
      v-bind="{
        ...proxy?.$attrs,
        ...tableModel?.formAttr,
      }"
      :style="{
        ...tableModel?.style,
        ...tableModel?.formAttr?.style,
      }"
      ref="formRef"
      :model="formData"
    >
      <a-table
        ref="table"
        :loading="tableModel?.loading || false"
        v-bind="{ ...proxy?.$attrs, ...tableModel?.tableAttr }"
        :pagination="tableModel?.tableAttr?.pagination"
        :columns="treeData"
        :data-source="formData.data"
        class="components-table-demo-nested"
      >
        <template #headerCell="{ column }">
          <div class="headerCell">
            <template v-if="column.slotHead">
              <slot
                :name="`header-${column.key}`"
                :model="fieldModel"
                :data="formData.data"
                :extra="extra"
                :field="column"
              >
                <!-- {{ column.title }} -->
              </slot>
              <slot
                v-if="column.slotHead"
                name="header"
                :model="fieldModel"
                :data="formData.data"
                :extra="extra"
                :field="column"
              />
            </template>
            <span v-else> {{ column.title }} </span>
            <ShowConfig
              v-if="column.showConfig"
              class="showConfig"
              :initTreeData="columnsComputed"
              :column="column"
              v-model:servingKeys="servingData"
              v-model:servingTreeData="treeData"
            />
          </div>
        </template>
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="column.type">
            <slot
              v-if="column.type === 'slot'"
              :name="`${column.key}`"
              :scope="{ text, record, index }"
              :model="fieldModel"
              :data="formData.data"
              :extra="extra"
              :field="column"
            />
            <a-form-item
              v-if="isForm(column, record)"
              :rules="column.rules || tableModel?.rules?.[column.key]"
              v-bind="column.formItemConfig"
              :name="['data', index, column.key]"
            >
              <Shell
                v-if="column.type && column.type !== 'slot'"
                :tag="`a-${column.type}`"
                v-model:value="record[column.key]"
                placeholder="请填选"
                :allowClear="true"
                v-bind="column?.config"
                :options="
                  tableModel?.optionsData?.[column['key']] ||
                  record?.[tableModel?.['rowListKey'] || 'listObj']?.[
                    column['key']
                  ] ||
                  column?.config?.options ||
                  []
                "
                :disabled="
                  typeof column.disabled === 'function'
                    ? Boolean(
                        column.disabled(
                          { text, record, index, column },
                          column,
                          formData.data
                        )
                      )
                    : Boolean(column.disabled) || tableModel.disabled
                "
              >
              </Shell>
              <div
                v-else
                :class="{ ellipsis: column.ellipsis }"
                :title="
                  Object.prototype.hasOwnProperty.call(column, 'tooltip')
                    ? column.tooltip
                    : findCodeName(column, record, column.division)
                "
              >
                {{ findCodeName(column, record, column.division) }}
              </div>
              <slot
                v-if="column.type === 'slot'"
                :model="fieldModel"
                :extra="extra"
                :name="`${column.key}In`"
                :scope="{ text, record, index }"
                :data="formData.data"
                :field="column"
              />
            </a-form-item>
            <div
              v-else-if="column.type !== 'slot'"
              :class="{ ellipsis: column.ellipsis }"
              :title="
                Object.prototype.hasOwnProperty.call(column, 'tooltip')
                  ? column.tooltip
                  : findCodeName(column, record, column.division)
              "
            >
              {{ findCodeName(column, record, column.division) }}
            </div>
          </template>
        </template>
      </a-table>
    </a-form>
    <div class="pagination">
      <slot name="pagination" :extra="extra" :data="formData.data" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import Shell from '@/common/components/Shell'
import ShowConfig from '@/common/components/ColumnControl/index.vue'

interface prop {
  fieldModel?: any
  columns: any
  tableData: any[]
  extra?: any
}
const props = withDefaults(defineProps<prop>(), {
  extra: () => {},
  tableData: () => [],
  columns: () => [],
  fieldModel: () => {},
})
const { extra, fieldModel, columns, tableData } = toRefs(props)
const proxy = getCurrentInstance()?.proxy
const formRef = ref<FormInstance>()
const tableModel = reactive<any>({}) // 合并后的模型数据
const servingData = ref<string[]>([]) // bian
const treeData = ref<string[]>([]) // 变更后的树结构的数据
const defaultTableModel = reactive<any>({
  // 默认配置模型数据
  isForm: false,
  follow: false,
  tableHeight: null,
  updateKey: 'update',
  columnsConfig: {
    align: 'left',
    disabled: false,
    // resizable: true,
    width: 150,
    // minWidth: 100,
    // maxWidth: 200,
    ellipsis: true,
  },
  tableAttr: {
    'row-key': 'id',
    // onResizeColumn(w: any, col: any) {
    //   col.width = w
    // },
    pagination: {
      size: 'large',
      'page-size-options': ['10', '20', '30', '40', '50'],
      'show-size-changer': true,
      'show-quick-jumper': true,
      showTotal: (total: any) => `共 ${total} 条数据`, // 分页中显示总的数据
      pageSize: 10,
    },
    bordered: false,
    style: {
      width: '100%',
    },
    scroll: {
      y: '10000px',
    },
  },
})
// 经过默认初始化配置
const columnsComputed = computed(() => {
  return initColumnsComputed(columns.value)
})
// 递归，对嵌套的进行设置
function initColumnsComputed(col: { align: any; class: string }[]) {
  return col.map((item: any) => {
    if (item.children) {
      item.children = initColumnsComputed(item.children)
    }
    if (
      item?.config &&
      Object.prototype.hasOwnProperty.call(item.config, 'disabled')
    ) {
      item.disabled = item?.config?.disabled
    }
    if (tableModel.columnsConfig) {
      const keyArr = Object.keys(tableModel?.columnsConfig)
      keyArr.forEach((key: any) => {
        if (
          !Object.prototype.hasOwnProperty.call(item, key) &&
          tableModel?.columnsConfig[key]
        ) {
          item[key] = tableModel?.columnsConfig[key]
        }
      })
    }
    // ! 类名
    const classNameH = redLabel(item)
    const classNameZ = [
      ...new Set(`${item.class || ''} ${classNameH}`.split(' ')),
    ].join(' ')
    if (classNameH) {
      item.class = classNameZ
    }
    return item
  })
}
watch(
  () => columnsComputed.value,
  () => {
    treeData.value = columnsComputed.value
  },
  { deep: true, immediate: true }
)
const formData = reactive<any>({ data: [] })
watch(
  tableData,
  (news) => {
    const follow = fieldModel.value?.follow !== false
    if (follow) {
      formData.data = news
    } else {
      formData.data = cloneDeep(news)
    }
  },
  { immediate: true }
)

function isForm(field: any = {}, record: any) {
  if (field.isForm === true) {
    return true
  }
  if (field.isForm === false) {
    return false
  }
  return tableModel.isForm && record?.[tableModel.updateKey]
}
function assign(...args: any) {
  const obj = args.reduce(
    (target: { [x: string]: any }, sources: { [x: string]: any }) => {
      if (
        typeof target !== 'object' ||
        typeof sources !== 'object' ||
        typeOf(target) !== typeOf(sources)
      ) {
        return sources // 如果其中一个不是对象 就返回sources
      }
      for (const key in sources) {
        // 如果target也存在 那就再次合并
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          target[key] = assign(target[key], sources[key])
        } else {
          // 不存在就直接添加
          target[key] = sources[key]
        }
      }
      return target
    }
  )
  return obj
}
onMounted(() => {
  // assign(tableModel, defaultTableModel, fieldModel.value)
})
watch(
  () => fieldModel.value,
  (value) => {
    assign(tableModel, defaultTableModel, value)
  },
  { immediate: true, deep: true }
)
function redLabel(column: any) {
  const fieldRequired = column?.rules?.[0]?.required
  const fieldModelRequired =
    fieldModel &&
    fieldModel.value.rules &&
    fieldModel.value.rules[column.key] &&
    fieldModel.value.rules[column.key][0] &&
    fieldModel.value.rules[column.key][0].required
  if (fieldRequired || fieldModelRequired) {
    return 'redLabel'
  }
  return ''
}

function typeOf(keyVal: any) {
  // 数据类型判断
  return Object.prototype.toString
    .call(keyVal)
    .replace('[object ', '')
    .replace(']', '')
    .toLowerCase()
}
// 暴漏函数====> 通过value(code)查找对用的item
function findCodeItem(value: string, column: any, record: any) {
  const { key } = column
  const fieldModelOptions = fieldModel.value?.optionsData?.[key]
  if (fieldModelOptions?.length > 0) {
    const item = fieldModelOptions.find(
      (rowItem: { value: string }) => rowItem.value === value
    )
    return item || null
  }

  const rowListKey = tableModel.rowListKey || 'listObj'
  const rowlist = record[rowListKey] ? record?.[rowListKey]?.[key] : false
  if (rowlist && typeOf(rowlist) === 'array') {
    const item = rowlist.find(
      (rowItem: { value: string }) => rowItem.value === value
    )
    return item || null
  }
  const options = column?.config?.options
  if (options && options.length > 0) {
    const item = options.find(
      (rowItem: { value: string }) => rowItem.value === value
    )
    return item || null
  }
  return null
}
// 暴露函数====> 通过行找label名字
function findCodeName(column: any, record: any, division = '、') {
  const { key } = column
  const value = record[key]
  if (value === '' || value === undefined || value === null) return ''
  let unit: any = ''
  if (typeOf(value) === 'array') {
    for (const iVal of value) {
      const arrItem = findCodeItem(iVal, column, record)
      const arrStr = arrItem?.label || iVal
      unit += `${arrStr}${division}`
    }
    unit = unit.substr(0, unit.length - 1)
  } else {
    unit = findCodeItem(value, column, record)

    unit = unit?.label || `${value}`
  }
  return unit || value.join(division)
}

// 暴露函数====>获取数据
function getData() {
  return cloneDeep(formData.data)
}
// 暴露函数====>校验
function validate(fn?: ((arg0: any) => void) | MouseEvent) {
  return new Promise((resolve) => {
    ;(formRef as any).value
      .validateFields()
      .then((valid: any) => {
        resolve({ status: true, data: { ...valid } })
        if (fn)
          (fn as (arg0: any) => void)({ status: true, data: { ...valid } })
      })
      .catch((err: any) => {
        resolve({ status: false, data: { ...err } })
        if (fn) (fn as (arg0: any) => void)({ status: false, data: { ...err } })
      })
  })
}
defineExpose({
  getData,
  validate,
  findCodeItem,
  formRef,
})
</script>
<style scoped lang="scss">
.tableBox {
  :deep(.redLabel::after) {
    content: '*';
    color: red;
  }
  .headerCell {
    width: 100%;
    height: 100%;
    // border: 1px solid pink;
    position: relative;
  }
  .showConfig {
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
  }

  // todo 控制table的高度，不自适应
  .components-table-demo-nested
    > :deep(div > div > div > div > div.ant-table-body) {
    height: v-bind('tableModel.tableHeight');
    & > table > tbody > tr > td > div.ant-empty-normal {
      margin: calc((v-bind('tableModel.tableHeight') - 115px) / 2) 0;
    }
  }

  // todo 控制table单元格的间隙
  :deep(.ant-table-tbody) > tr > td {
    padding: 5px;
  }
  :deep(.ant-table-thead) > tr > th {
    padding: 5px;
    &.ant-table-cell-ellipsis {
      white-space: inherit;
    }
  }
  .headerCell {
    text-align: center;
  }
  // 翻译溢出隐藏
  .ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
