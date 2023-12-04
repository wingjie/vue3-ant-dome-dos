<template>
  <div class="button-group flex">
    <a-space
      :size="type === 'link' ? 1 : 5"
      v-bind="space"
      class="space"
      v-if="!width"
    >
      <template v-for="item in showButtonCom" :key="item.key">
        <ButtonContent
          v-bind="$attrs"
          :item="item"
          :sizeCom="sizeCom"
          :type="type"
        >
          <template v-for="(value, names) of $slots" #[names]="slotData: any">
            <slot :name="names" v-bind="slotData"></slot>
          </template>
        </ButtonContent>
        <span class="interval">
          <slot
            :name="'interval'"
            :size="sizeCom"
            :key="item.key"
            :type="type || item.type"
            v-bind="{ ...$attrs, ...item?.attr }"
          >
            <span style="color: #dcdee0" v-if="type === 'link'">|</span>
          </slot>
        </span>
      </template>
      <a-dropdown
        :trigger="['click', 'hover']"
        v-if="moreButtonCom.length > 0"
        :overlayClassName="
          type === 'primary' || type === 'link'
            ? 'more-btn-menu'
            : 'more-btn-menu-normal'
        "
      >
        <slot name="more">
          <a-button :size="sizeCom" :type="type" v-bind="{ ...$attrs }">
            <span class="more-btn-inner">
              <slot :name="`moreIB`">
                <template v-if="moreCom.icon">
                  <Icons
                    v-if="typeof moreCom.icon === 'string'"
                    :icon="moreCom.icon"
                  ></Icons>
                  <Icons
                    v-else-if="typeof moreCom.icon === 'object'"
                    :icon="moreCom.icon?.key"
                    v-bind="moreCom.icon"
                  ></Icons>
                </template>
              </slot>
              <span class="more-text">
                <template v-if="moreCom.text">{{ moreCom.text }}</template>
                <SvgIcon v-else name="pure-more" class="more-icon" />
              </span>
              <slot :name="`moreIA`">
                <template v-if="moreCom.iconA">
                  <Icons
                    v-if="typeof moreCom.iconA === 'string'"
                    :icon="moreCom.iconA"
                  ></Icons>
                  <Icons
                    v-else-if="typeof moreCom.iconA === 'object'"
                    :icon="moreCom.iconA.key"
                    v-bind="moreCom.iconA"
                  ></Icons>
                </template>
                <template v-else-if="moreCom.iconA !== false"></template>
              </slot>
            </span>
          </a-button>
        </slot>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="item in moreButtonCom"
              v-bind="{ ...$attrs, ...item?.attr }"
              :key="item.key"
              @click="$attrs[`on${toUpper(item.key)}`]"
            >
              <ButtonContent
                :item="item"
                :sizeCom="sizeCom"
                :type="type"
                :more="true"
              >
                <template
                  v-for="(value, names) of $slots"
                  #[names]="slotData: any"
                >
                  <slot :name="names" v-bind="slotData"></slot>
                </template>
              </ButtonContent>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <slot
        name="default"
        :size="sizeCom"
        :type="type"
        v-bind="{ ...$attrs }"
      ></slot>
    </a-space>
    <template v-else>
      <template v-for="item in showButtonCom" :key="item.key">
        <ButtonContent
          v-bind="$attrs"
          :item="item"
          :sizeCom="sizeCom"
          :type="type"
        >
          <template v-for="(value, names) of $slots" #[names]="slotData: any">
            <slot :name="names" v-bind="slotData"></slot>
          </template>
        </ButtonContent>
        <span class="interval">
          <slot
            :name="'interval'"
            :size="sizeCom"
            :key="item.key"
            :type="type || item.type"
            v-bind="{ ...$attrs, ...item?.attr }"
          >
            <span style="color: #dcdee0" v-if="type === 'link'">|</span>
          </slot>
        </span>
      </template>
      <a-dropdown
        :trigger="['click', 'hover']"
        v-if="moreButtonCom.length > 0"
        :overlayClassName="
          type === 'primary' || type === 'link'
            ? 'more-btn-menu'
            : 'more-btn-menu-normal'
        "
      >
        <slot name="more">
          <a-button :size="sizeCom" :type="type" v-bind="{ ...$attrs }">
            <span class="more-btn-inner">
              <slot :name="`moreIB`">
                <template v-if="moreCom.icon">
                  <Icons
                    v-if="typeof moreCom.icon === 'string'"
                    :icon="moreCom.icon"
                  ></Icons>
                  <Icons
                    v-else-if="typeof moreCom.icon === 'object'"
                    :icon="moreCom.icon?.key"
                    v-bind="moreCom.icon"
                  ></Icons>
                </template>
              </slot>
              <span class="more-text">
                <template v-if="moreCom.text">{{ moreCom.text }}</template>
                <SvgIcon v-else name="pure-more" class="more-icon" />
              </span>
              <slot :name="`moreIA`">
                <template v-if="moreCom.iconA">
                  <Icons
                    v-if="typeof moreCom.iconA === 'string'"
                    :icon="moreCom.iconA"
                  ></Icons>
                  <Icons
                    v-else-if="typeof moreCom.iconA === 'object'"
                    :icon="moreCom.iconA.key"
                    v-bind="moreCom.iconA"
                  ></Icons>
                </template>
                <template v-else-if="moreCom.iconA !== false"></template>
              </slot>
            </span>
          </a-button>
        </slot>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="item in moreButtonCom"
              v-bind="{ ...$attrs, ...item?.attr }"
              :key="item.key"
              @click="$attrs[`on${toUpper(item.key)}`]"
            >
              <ButtonContent
                :item="item"
                :sizeCom="sizeCom"
                :type="type"
                :more="true"
              >
                <template
                  v-for="(value, names) of $slots"
                  #[names]="slotData: any"
                >
                  <slot :name="names" v-bind="slotData"></slot>
                </template>
              </ButtonContent>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <slot
        name="default"
        :size="sizeCom"
        :type="type"
        v-bind="{ ...$attrs }"
      ></slot>
    </template>
  </div>
</template>
<script setup lang="ts">
import ButtonContent from './ButtonContent.vue'
import { assign } from '@/common/utils/traverseTree'

const $attrs = useAttrs()
const $slots = useSlots()

interface propMsg {
  size?: 'small' | 'large' | 'middle'
  type?: 'primary' | 'link'
  setup?: {
    [p: string]: {
      text?: string
      type?: 'primary' | 'link'
      icon?: string | { key?: string; [p: string]: any }
      iconA?: string | { key?: string; [p: string]: any }
      show?: boolean
      attr?: { [p: string]: any }
    }
  }
  more?: {
    text?: string
    icon?: string | { key: string; [p: string]: any } | boolean
    iconA?: string | { key: string; [p: string]: any } | boolean
  }
  len?: number
  order?: string[]
  width?: string
  space?: {
    size?: number
    [p: string]: any
  }
}
// const $emit = defineEmits(['add', 'del', 'down', 'downEx', 'import'])
const props = withDefaults(defineProps<propMsg>(), {
  size: undefined,
  order: () => [],
  space: () => ({}),
})
const { size, type, setup, order, width, len, more, space } = toRefs(props)

const moreCom = computed(() => {
  return {
    text: '',
    ...(more?.value ? more?.value : {}),
  }
})
const lenCom = computed(() => {
  if (len?.value || len?.value === 0) {
    return len.value
  }
  return type?.value === 'link' ? 4 : 30
})
const sizeCom = computed(() => {
  if (type?.value === 'link' && !size.value) {
    return 'small'
  }
  return size.value
})
const setUpCom = computed(() => {
  if (setup && setup.value) {
    return Object.entries(setup.value).map(([key, item]: any) => {
      return {
        key,
        ...item,
      }
    })
  }
  return []
})

const defaultButtonMode = reactive<any>({
  show: true,
})

const defaultButtonList = reactive<
  {
    key: string
    text: string
    type?: 'primary' | 'dashed' | 'danger'
    attr?: { [p: string]: any }
    icon?: string | { key?: string; [p: string]: any }
    iconA?: string | { key?: string; [p: string]: any }
    show?: boolean
  }[]
>([
  {
    key: 'add',
    text: '添加',
    type: 'primary',
    attr: {},
    icon: { key: 'pure-operation-add' },
  },
  { key: 'look', text: '查看', type: 'primary', attr: { class: 'look' } },
  { key: 'clone', text: '克隆', type: 'primary' },
  { key: 'edit', text: '修改' },
  { key: 'disable', text: '禁用', type: 'primary' },
  { key: 'enable', text: '启用', type: 'primary' },
  { key: 'run', text: '执行', type: 'primary' },
  {
    key: 'delList',
    text: '批量删除',
    type: 'danger',
    attr: {
      style: {
        color: '#FF8080',
        border: '1px solid #FFD1D1',
        backgroundColor: '#FFF5F5',
      },
    },
    icon: { key: 'pure-delete' },
  },
  {
    key: 'del',
    text: '删除',
    attr: {},
  },
  { key: 'downEx', text: '下载模板', type: 'dashed', attr: {} },
  { key: 'downInstance', text: '下载示例', attr: {} },
  {
    key: 'import',
    text: '导入',
    attr: {},
    icon: { key: 'pure-operation-import' },
  },
  {
    key: 'export',
    text: '导出',
    attr: {},
    icon: { key: 'pure-operation-derive' },
  },
  { key: 'save', text: '保存', type: 'primary', attr: {} },
  { key: 'search', text: '查询', type: 'primary', attr: {} },
  { key: 'reset', text: '重置', attr: {} },
  { key: 'cancel', text: '取消', attr: {} },
  { key: 'submit', text: '提交', type: 'primary', attr: {} },
])
const typeCom = computed(() => (type?.value ? { type: type.value } : {}))
defaultButtonList.forEach((item: any) => {
  assign(item, defaultButtonMode, typeCom.value)
})
const buttonList: any = ref<any>([...defaultButtonList])
const buttonListCom = computed(() => {
  return buttonList.value.filter((item: any) => {
    return $attrs[`on${toUpper(item.key)}`]
  })
})
const showButtonCom = computed(() => {
  return buttonListCom.value
    .slice(0, lenCom.value)
    .filter((item: any) => item.show)
})
const moreButtonCom = computed(() => {
  return buttonListCom.value
    .slice(lenCom.value)
    .filter((item: any) => item.show)
})

watch(
  () => setUpCom.value,
  (val) => {
    // 合并的功能
    val.forEach((item: any) => {
      const itemData = buttonList.value.find(
        (itemC: any) => itemC.key === item.key
      )
      if (itemData) {
        assign(itemData, defaultButtonMode, typeCom.value, item)
      } else {
        buttonList.value.push(
          assign({}, defaultButtonMode, typeCom.value, item)
        )
      }
    })
    // 排序的功能
    const orderFilter = computed(() => {
      return order.value.filter(
        (key: string) =>
          buttonList.value.findIndex((itemB: any) => key === itemB.key) >= 0
      )
    })
    for (let i = 0; i < orderFilter.value.length; i++) {
      const indexBefore = buttonList.value.findIndex(
        (item: any) =>
          item.key === orderFilter.value[orderFilter.value.length - 1 - (i + 1)]
      )
      const indexAfter = buttonList.value.findIndex(
        (item: any) =>
          item.key === orderFilter.value[orderFilter.value.length - 1 - i]
      )
      if (indexBefore >= 0 && indexAfter >= 0) {
        if (indexBefore - indexAfter > 0) {
          buttonList.value.splice(
            indexAfter,
            0,
            ...buttonList.value.splice(indexBefore, 1)
          )
        }
      }
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

function toUpper(str: string) {
  return str.replace(/^\w/, (fStr) => fStr.toUpperCase())
}
</script>
<style lang="scss">
@import 'src/common/style/global';
.more-btn-menu,
.more-btn-menu-normal {
  @include boxShadow;
}
.more-btn-menu {
  div[class*='dropdown'] {
    overflow: hidden;
    ul[class*='dropdown-menu'] {
      padding: 0;
      line-height: 16px;
      li[class*='dropdown-menu-item'] {
        line-height: 30px;
        color: #00bceb;
        &:hover {
          color: #00bceb;
          background-color: #f0fdfd;
        }
        &[class*='-dropdown-menu-item-disabled'] {
          color: #ccc;
          &:hover {
            color: #ccc;
            background-color: #fff;
          }
        }
      }
    }
  }
}
.more-btn-menu-normal {
  div[class*='dropdown'] {
    overflow: hidden;
    ul[class*='dropdown-menu'] {
      padding: 0;
      line-height: 16px;
      li[class*='dropdown-menu-item'] {
        line-height: 30px;
        color: #262626;
        &:hover {
          color: #262626;
          background-color: #e7f0f8;
        }
      }
    }
  }
}
div[class8='more-btn-menu'] {
  div[class*='-dropdown'] {
    padding: 8px 0;
  }
}
</style>
<style scoped lang="scss">
.more-btn-inner {
  display: flex;
  align-items: center;
}
.button-group {
  width: 100%;
  padding: 0;
}
.flex {
  width: v-bind(width);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  button {
    display: flex;
    align-items: center;
  }
}
.space > :deep(div[class*='space-item']):last-child > .interval {
  display: none;
}
button[class*='btn-link'][class*='btn-sm'] {
  padding: 0;
  margin: 0;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg) scale(0.75);
  }
  100% {
    transform: rotate(360deg) scale(0.75);
  }
}
.more {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.more-text {
  padding: 0 2px;
  .more-icon {
    font-size: 20px;
  }
}
</style>
