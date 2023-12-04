<template>
  <div>
    <div class="show-config">
      <!-- trigger="click" -->
      <a-popover
        v-model:visible="visible"
        :title="false"
        placement="bottomRight"
        overlayClassName="show-config-popover"
        @after-visible-change="afterVisibleChange"
      >
        <SvgIcon name="operation-column" font-size="16px" />
        <template #content>
          <div>
            <a-tree
              class="config-tree"
              @check="selectFn"
              v-model:checkedKeys="checkedKeys"
              :selectedKeys="[]"
              checkable
              block-node
              :draggable="false"
              :tree-data="treeData"
              @drop="onDrop"
            >
            </a-tree>
          </div>
        </template>
      </a-popover>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { AntTreeNodeDropEvent } from 'ant-design-vue/es/tree'
import lodash, { cloneDeep } from 'lodash-es'
import SvgIcon from '@/common/components/SpaceUI/SvgIcon/index.vue'
import { find, mapFilter } from '@/common/utils/traverseTree'

interface prop {
  initTreeData: any
  column?: any
  servingKeys?: string[]
  servingTreeData?: string[]
}
const props = withDefaults(defineProps<prop>(), {
  initTreeData: () => [], //
  column: () => {}, // 当前的列
  servingKeys: () => {
    return []
  },
  servingTreeData: () => [], // 直接的数据
})
const { initTreeData, column, servingKeys } = toRefs(props)

const $emit = defineEmits(['update:servingKeys', 'update:servingTreeData'])
const visible = ref(false)
const treeData = ref<any>([]) // 树数据
const mapData = ref<any>({})
const checkedKeys = computed({
  get() {
    return servingKeys.value
  },
  set(val) {
    $emit('update:servingKeys', val)
  },
})
let defaultCheckedKeys: string[] = [] // 默认的key,先记录一下
watch(
  () => initTreeData.value,
  (val) => {
    treeData.value = cloneDeep(val).map(
      (item: { key: any; disabled: boolean }) => {
        if (item.key === column.value.key) {
          item.disabled = true
        }
        return item
      }
    )
    setMap(treeData.value)
    defaultCheckedKeys = Object.entries(mapData.value)
      .filter(([, item]: any) => item.checked !== false && !item.children)
      .map(([key]: any) => key)
    checkedKeys.value = defaultCheckedKeys
  },
  { immediate: true }
)

function setMap(data: any) {
  data.forEach((item: any) => {
    mapData.value[item.key] = item
    if (item.children) {
      setMap(item.children)
    } else if (item.configData) {
      item.children = []
      fn(item[item.configData], item.children)
    }
  })
  function fn(
    itemData: {
      before?: any[]
      after?: any[]
      configData?: string
      [p: string]: any
    },
    children: any[]
  ) {
    if (itemData?.before) {
      itemData.before.forEach((item: any) => {
        mapData.value[item.key] = item
        children.push(item)
      })
    }
    if (itemData?.after) {
      itemData.after.forEach((item: any) => {
        mapData.value[item.key] = item
        children.push(item)
      })
    }
    if (itemData.configData) {
      fn(itemData[itemData.configData], children)
    }
  }
}
// 重置
// function restore() {
//   treeData.value = cloneDeep(initTreeData.value).map(
//     (item: { key: any; disabled: boolean }) => {
//       if (item.key === column.value.key) {
//         item.disabled = true
//       }
//       return item
//     }
//   )
//   checkedKeys.value = [...defaultCheckedKeys]
//   setMap(treeData.value)
// }

watch(
  () => treeData.value,
  () => {
    nextTick(() => {
      const data = setServingTreeData(initTreeData.value)
      $emit('update:servingTreeData', data)
    })
  },
  { immediate: true, deep: true }
)
function setServingTreeData(treeDataArg: any[]) {
  function mapDataFn(treeDataArgs: any[]) {
    return mapFilter(treeDataArgs, (data: any, T: symbol, F: symbol) => {
      if (data.key && data.value && data.value.key) {
        if (mapData.value?.[data.value.key].checked === false) {
          return F
        }
      }
      return T
    })
  }
  return mapDataFn(treeDataArg)
}
function selectFn( // ! 选择
  _selectedKeys: any,
  e: { checked: boolean; selectedNodes: any; node: any; event: any }
) {
  const { key } = e.node
  mapData.value[key].checked = e.checked
  if (e.node.children) {
    e.node.children.forEach((item: { key: string | number }) => {
      mapData.value[item.key].checked = e.checked
    })
  }
  if (e.node.parent) {
    mapData.value[e.node.parent.key].checked = e.node.parent.children.some(
      (item: any) => {
        return (
          mapData.value[item.key].checked ||
          mapData.value[item.key].checked === undefined
        )
      }
    )
  }
}
function onDrop(info: AntTreeNodeDropEvent) {
  // const dropKey = info.node.key
  const { parent }: any = info.dragNode
  // const dragKey = info.dragNode.key
  const dragNodeArr = info.dragNode.pos?.split('-') // ! 移动节点from
  const goalNodeArr = info.node.pos?.split('-') // ! 目标节点to
  // todo 做对比，看是不是同一级别的拖拽
  const bool = lodash.isEqual(
    dragNodeArr?.slice(0, dragNodeArr.length - 1),
    goalNodeArr?.slice(0, goalNodeArr.length - 1)
  )
  const dragNodeIndex: number = Number(dragNodeArr?.[dragNodeArr.length - 1]) // ! 移动节点from下标
  const goalNodeIndex: number = // ! 目标节点to下标
    Number(goalNodeArr?.[goalNodeArr.length - 1]) + 1
  // 是否同一层级，不是的话有一种情况是将节点拖到了节点的第一个，显示的也不是同一个级别，所有需要特别处理
  if (bool) {
    if (!parent) {
      if (info.dropPosition === -1) {
        treeData.value = swapArray(treeData.value, 0, dragNodeIndex)
      } else {
        treeData.value = swapArray(treeData.value, goalNodeIndex, dragNodeIndex)
      }
    } else {
      const goal = find(
        treeData.value,
        { key: parent.key },
        parent.level + 2
      ).own
      if (parent.key === info.node.key) {
        goal.children = swapArray(goal.children, 0, dragNodeIndex)
      } else {
        // * 有嵌套同一个级别，且不是拖到了第一个位置
        goal.children = swapArray(goal.children, goalNodeIndex, dragNodeIndex)
      }
    }
  } else {
    const goal = find(treeData.value, { key: parent.key }, parent.level + 2).own
    if (parent.key === info.node.key) {
      goal.children = swapArray(goal.children, 0, dragNodeIndex)
    }
  }
}
function swapArray(arr: any[], toIndex: number, fromIndex: any) {
  const formItem = arr.splice(fromIndex, 1)[0]
  arr.splice(toIndex < fromIndex ? toIndex : toIndex - 1, 0, formItem)

  return arr
}

function afterVisibleChange() {}
</script>
<style lang="scss">
@import 'src/common/style/global';
.show-config-popover {
  .config-tree {
    span[class*='tree-switcher'] {
      width: 16px;
    }
    span[class*='tree-title'] {
      color: #262626;
    }
    span[class*='tree-checkbox'] {
      margin-top: 0;
    }
    div[class*='tree-treenode'] {
      height: $form-int-height;
      align-items: center;
      padding-right: 10px;
      &:hover {
        background-color: #e7f0f8;
      }
    }
    span[class*='tree-node-content-wrapper'] {
      &:hover {
        background-color: transparent;
      }
    }
  }
  div[class*='popover-content'] {
    @include boxShadow;
  }
  div[class*='popover-inner'] {
    border-radius: 8px;
  }
  div[class*='popover-inner-content'] {
    padding: 10px 0;
  }
}
</style>
<style scoped lang="scss"></style>
