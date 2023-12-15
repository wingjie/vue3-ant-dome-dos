<template>
  <div class="json-schema-editor">
    <a-row
      class="row"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <a-col :span="isShowIcon ? 8 : 10" class="ant-col-name">
        <div :style="{ marginLeft: `${10 * deep}px` }" class="ant-col-name-c">
          <div v-if="pickValue.type?.includes('object') || hidden">
            <SvgIcon
              v-if="hidden"
              @click="hidden = !hidden"
              name="icon-default"
            ></SvgIcon>
            <SvgIcon
              v-else
              @click="hidden = !hidden"
              name="icon-down"
            ></SvgIcon>
          </div>
          <span v-else style="width: 22px; display: inline-block"></span>
          <a-input
            v-focus
            :disabled="disabled || root || isDisabled"
            :default-value="pickKey"
            class="ant-col-name-input"
            @blur="onInputName"
            :key="pickValue"
          />
        </div>
      </a-col>
      <a-col :span="isShowIcon ? 8 : 10" class="ant-col-name">
        <a-select
          v-model:value="selectValue"
          :disabled="disabledType || isDisabled"
          class="ant-col-type"
          @change="onChangeType"
        >
          <a-select-option
            :key="t"
            v-for="t in !root ? TYPE_NAME : TYPE_ROOT_NAME"
          >
            {{ t }}
          </a-select-option>
        </a-select>
        <div class="icon-group">
          <a-tooltip title="是否必需" v-if="checked && !root" style="order: 1">
            <a-button
              type="link"
              class="svg-icon"
              :disabled="isItem || root || isDisabled"
              @click="mastHandel(false)"
            >
              <SvgIcon class="icon-red" name="icon-pure-must"></SvgIcon>
            </a-button>
          </a-tooltip>
          <div v-if="!checked && !root" style="order: 5">
            <a-tooltip title="是否必需">
              <a-button
                v-show="isHovered"
                type="link"
                class="svg-icon"
                :disabled="isItem || root || isDisabled"
                @click="mastHandel(true)"
              >
                <SvgIcon class="icon-normal" name="icon-pure-must"> </SvgIcon>
              </a-button>
            </a-tooltip>
          </div>
          <a-tooltip v-if="isNull" title="允许NULL" style="order: 2">
            <a-button
              type="link"
              :disabled="isDisabled || isSelectNull"
              @click="nullHandle(false)"
              class="svg-icon"
            >
              <SvgIcon class="icon-red" name="icon-pure-null"></SvgIcon>
            </a-button>
          </a-tooltip>
          <div v-if="!isNull" style="order: 4">
            <a-tooltip title="允许NULL">
              <a-button
                v-show="isHovered"
                type="link"
                class="svg-icon"
                :disabled="isDisabled"
                @click="nullHandle(true)"
              >
                <SvgIcon class="icon-normal" name="icon-pure-null"></SvgIcon>
              </a-button>
            </a-tooltip>
          </div>
          <a-popover
            placement="right"
            v-model:visible="visible"
            trigger="click"
          >
            <template #content>
              <div class="popover-content">
                <div class="popover-close">
                  <a-button type="link" @click="closePopover">
                    <SvgIcon
                      class="icon-close"
                      name="icon-close"
                      fontSize="30px"
                    ></SvgIcon>
                  </a-button>
                </div>
                <SForm v-bind="form"></SForm>
              </div>
            </template>
            <a-tooltip title="高级设置" style="order: 3">
              <a-button
                class="svg-icon"
                type="link"
                v-show="isHovered"
                @click="configHandle"
              >
                <SvgIcon name="icon-advanced" fontSize="20px"></SvgIcon>
              </a-button>
            </a-tooltip>
          </a-popover>
        </div>
      </a-col>
      <a-col :span="4" class="ant-col-name">
        <a-input
          :disabled="isDisabled"
          v-model:value="pickValue.description"
          class="ant-col-title"
          placeholder="备注"
        />
      </a-col>
      <a-col :span="4" class="ant-col-name" v-if="isShowIcon">
        <div v-if="!isDisabled">
          <a-space :size="0">
            <a-tooltip v-if="isObject && !root && !isItem">
              <template #title>
                <a-button @click="addChild" class="toolTipBtn"
                  >添加子节点</a-button
                >
                <div></div>
                <a-button @click="addAdjacent" class="toolTipBtn"
                  >添加相邻节点</a-button
                >
              </template>
              <a-button type="link" class="svg-icon">
                <SvgIcon name="icon-add" fontSize="20px"></SvgIcon>
              </a-button>
            </a-tooltip>
            <div v-else>
              <a-tooltip v-if="isObject" title="添加子节点">
                <a-button type="link" class="svg-icon" @click="addChild">
                  <SvgIcon name="icon-add" fontSize="20px"></SvgIcon>
                </a-button>
              </a-tooltip>
              <div v-else>
                <a-tooltip v-if="!isItem" title="添加相邻节点">
                  <a-button type="link" class="svg-icon" @click="addAdjacent">
                    <SvgIcon name="icon-add" fontSize="20px"></SvgIcon>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
            <a-tooltip v-if="!root && !isItem" title="删除节点">
              <a-button type="link" class="svg-icon" @click="removeNode">
                <SvgIcon name="icon-delete" fontSize="20px"></SvgIcon>
              </a-button>
            </a-tooltip>
          </a-space>
        </div>
        <slot name="operate"></slot>
      </a-col>
    </a-row>
    <template v-if="!hidden && pickValue.properties && !isArray">
      <s-json-schema
        v-for="(item, key, index) in pickValue.properties"
        :value="{ [key]: item }"
        :parent="pickValue"
        :key="index"
        :deep="deep + 1"
        :root="false"
        class="children"
        :isShowIcon="isShowIcon"
        :isDisabled="isDisabled"
      />
    </template>
    <template v-if="isArray">
      <s-json-schema
        :value="{ items: pickValue.items }"
        :deep="deep + 1"
        disabled
        isItem
        :root="false"
        class="children"
        :isShowIcon="isShowIcon"
        :isDisabled="isDisabled"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import { renamePropertyAndKeepKeyPrecedence } from './util'

interface propInfo {
  value: object
  disabled?: boolean
  disabledType?: boolean
  isItem?: boolean
  deep?: number
  root?: boolean
  parent?: any | null
  isShowIcon?: boolean
  isDisabled?: boolean
}
const $props = withDefaults(defineProps<propInfo>(), {
  value: () => {
    return {}
  },
  disabled: false,
  disabledType: false,
  isItem: false,
  deep: 0,
  root: true,
  parent: null,
  isShowIcon: true,
  isDisabled: false,
})
const {
  value,
  disabled,
  disabledType,
  isItem,
  deep,
  root,
  parent,
  isShowIcon,
  isDisabled,
} = toRefs($props)
const TYPE_NAME = ref([
  'string',
  'number',
  'object',
  'array',
  'boolean',
  // 'null',
])
const TYPE_ROOT_NAME = ref(['object', 'array'])

const pickValue: any = computed(() => {
  return Object.values(value.value)[0]
})
const isNull = computed(() => {
  const { type } = pickValue.value
  return type === 'null' || (type instanceof Array && type?.includes('null'))
})
const isSelectNull = computed(() => {
  const { type } = pickValue.value
  return type === 'null'
})
const selectValue = ref()
watch(
  () => pickValue.value?.type,
  (newV) => {
    if (newV) {
      selectValue.value =
        newV instanceof Array
          ? newV.find((item: string) => item !== 'null')
          : newV
    }
  },
  {
    immediate: true,
  }
)

const pickKey = computed(() => {
  return Object.keys(value.value)[0]
})
const isObject = computed(() => {
  const { type } = pickValue.value
  return (
    pickValue.value.type === 'object' ||
    (type instanceof Array && type?.includes('object'))
  )
})
const isArray = computed(() => {
  const { type } = pickValue.value
  return (
    pickValue.value.type === 'array' ||
    (type instanceof Array && type?.includes('array'))
  )
})
const checked = computed(() => {
  return (
    parent.value &&
    parent.value.required &&
    parent.value.required.indexOf(pickKey.value) >= 0
  )
})

const hidden = ref(false)
const isHovered = ref(false)
const visible = ref(false)

const formData = ref({
  checked: !!checked.value,
  isNull: !!isNull.value,
})
const form = $defineForm(() => {
  return [
    formData,
    [
      {
        label: '必需',
        key: 'checked',
        type: 'switch',
        disabled: isItem.value || root.value || isDisabled.value,
        isForm: !root.value,
        config: {
          change({ value: checkedValue }: any) {
            checkedFn(checkedValue, parent.value)
          },
        },
      },
      {
        label: '允许NULL',
        key: 'isNull',
        disabled: computed(() => isDisabled.value || isSelectNull.value) as any,
        type: 'switch',
        config: {
          change({ value: isNullValue }: any) {
            nullHandle(isNullValue)
          },
        },
      },
    ],
    {
      span: 24,
      formItemAttr: {
        labelCol: {
          span: undefined,
          style: {
            width: '100px',
          },
        },
        wrapperCol: { span: 20 },
      },
    },
  ]
})
const vFocus = {
  mounted: (el: any) => el.focus(),
}
const onInputName = (e: any) => {
  const oldKey = pickKey.value
  const newKey = e.target.value
  console.log(oldKey, 'oldKey', newKey, 'newKey')

  if (oldKey === newKey) return

  renamePropertyAndKeepKeyPrecedence(parent.value.properties, [oldKey, newKey])

  // required重新设置
  const requireds = parent.value.required || []
  const oldIndex = requireds.indexOf(oldKey)
  if (requireds.length > 0 && oldIndex > -1) {
    requireds.splice(oldIndex, 1)
    requireds.push(newKey)
    // eslint-disable-next-line vue/no-mutating-props
    parent.value.required = [...new Set(requireds)]
  }
}
const onChangeType = (cValue: any) => {
  delete pickValue.value.properties
  delete pickValue.value.items
  delete pickValue.value.required
  const { type } = pickValue.value
  if (isSelectNull.value || !(type instanceof Array) || cValue === 'null') {
    pickValue.value.type = cValue
  } else {
    pickValue.value.type = [cValue, 'null']
  }
  formData.value.isNull = isNull.value

  if (isArray.value) {
    pickValue.value.items = { type: 'string' }
  }
}

const checkedFn = (checkedV: any, parentV: any) => {
  console.log(parent.value, 'parent.value', 'checkedV', checkedV)
  let { required } = parentV
  if (checkedV) {
    // eslint-disable-next-line no-unused-expressions
    required || (parent.value.required = [])
    required = parent.value.required
    // eslint-disable-next-line no-unused-expressions
    required.indexOf(pickKey.value) === -1 && required.push(pickKey.value)
  } else {
    const pos = required.indexOf(pickKey.value)
    // eslint-disable-next-line no-unused-expressions
    pos >= 0 && required.splice(pos, 1)
  }
  // eslint-disable-next-line no-unused-expressions
  required.length === 0 && delete parent.value.required
  formData.value.checked = checked.value
}
const addChild = () => {
  const name = ''
  const type = 'string'
  const node = pickValue.value
  console.log(node, 'node>>>')
  // eslint-disable-next-line no-unused-expressions
  node.properties || (node.properties = {})
  const props = node.properties
  console.log(props, 'props')
  props[name] = { type }
  console.log(value.value, 'value.value')
  if (node.required) {
    // eslint-disable-next-line no-unused-expressions
    node.required.indexOf(name) === -1 && node.required.push(name)
  } else {
    node.required = ['']
  }
}
const addAdjacent = () => {
  console.log(parent.value, 'parent')
  const { required } = parent.value
  parent.value.properties[''] = { type: 'string' }
  if (required) {
    // eslint-disable-next-line no-unused-expressions
    parent.value.required.indexOf('') === -1 && parent.value.required.push('')
  } else {
    parent.value.required = ['']
  }
}

const removeNode = () => {
  const { properties, required } = parent.value
  delete properties[pickKey.value]
  if (required) {
    const pos = required.indexOf(pickKey.value)
    // eslint-disable-next-line no-unused-expressions
    pos >= 0 && required.splice(pos, 1)
    // eslint-disable-next-line no-unused-expressions
    required.length === 0 && delete parent.value.required
  }
}
const nullHandle = (nullV: boolean) => {
  const { type } = pickValue.value
  if (nullV) {
    pickValue.value.type = [type, 'null']
  } else {
    pickValue.value.type = type.find((item: any) => item !== 'null')
  }
  formData.value.isNull = isNull.value
}
const mastHandel = (req: boolean) => {
  checkedFn(req, parent.value)
}
const configHandle = () => {
  visible.value = true
}
const closePopover = () => {
  visible.value = false
}
</script>
<style scoped lang="scss">
.json-schema-editor {
  background-color: #fdfdfd;
  border-radius: 8px;
  .row {
    display: flex;
    border-radius: 8px;
    padding: 9px;
    .col {
      display: flex;
    }
    .ant-col-name {
      display: flex;
      align-items: center;
      .ant-col-name-c {
        display: flex;
        align-items: center;
      }
    }
  }
  .row:hover {
    background-color: #eaf0f7;
  }
}
.json-schema-editor
  .json-schema-editor
  .row
  .ant-col-name
  .ant-col-name-required {
  flex: 0 0 24px;
  text-align: center;
  padding-left: 5px;
}
.json-schema-editor .row .ant-col-type {
  width: 96px;
}
.json-schema-editor .row .ant-col-setting {
  display: inline-block;
}
.json-schema-editor .row .ant-col-title {
  max-width: 150px;
  margin: 0 0 0 5px;
}
.toolTipBtn {
  background-color: rgba(0, 0, 0, 0);
  color: aliceblue;
  border: 0;
}
.toolTipBtn:hover {
  background-color: rgba(102, 166, 231, 0.849);
}
.icon-group {
  display: flex;
  margin-left: 3px;
}
.popover-close {
  display: flex;
  flex-direction: row-reverse;
}
.icon-close {
  color: #dbdbdb;
  & :hover {
    color: #2c2c2c;
  }
}

.icon-normal {
  color: #8ea1b3;
  font-size: 20px;
}
.icon-red {
  color: #ff8080;
  font-size: 20px;
}
.popover-content {
  width: 250px;
}
</style>
