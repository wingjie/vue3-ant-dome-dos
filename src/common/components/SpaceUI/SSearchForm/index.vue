<template>
  <div class="pagesBox search-form-area">
    <SForm
      ref="formRef"
      v-bind="$attrs"
      :fieldList="[...fieldListRes, actionItem]"
      :formModel="model"
      :formData="formData"
    >
      <template #action>
        <div class="action">
          <SButtonGroup
            v-if="presetButton !== false"
            v-bind="{
              onSearch: search,
              onReset: reset,
              ...(button || {}),
            }"
            :setup="{
              search: { text: '搜索' },
              ...(button?.setup || {}),
            }"
          />
          <slot name="default" :onOff="bool"></slot>
        </div>
      </template>

      <template v-for="(value, names) of $slots" #[names]="slotData: any">
        <slot v-bind="slotData" :name="names"></slot>
      </template>
    </SForm>
    <div v-if="span >= 72 && !isInLayout" class="iconRow">
      <SvgIcon
        v-if="bool"
        name="search-up"
        fontSize="100px"
        style="margin: auto; height: 20px"
        @click="bool = !bool"
      />
      <SvgIcon
        v-else
        name="search-unfold-flip"
        fontSize="100px"
        style="margin: auto; height: 20px"
        @click="bool = !bool"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import SForm from '../SForm/index.vue'
// import SwitchBottom from '../SSwitchBottom/index.vue'
import {
  fieldListType,
  formModelType,
  // CustomRequired,
} from '@/common/componentsFn/propType'

const isInLayout = inject('isInLayout', false)

const $slots = useSlots()
const $attrs: any = useAttrs()

interface propMsg {
  fieldList: fieldListType[]
  formModel: formModelType
  formData: { [p: string]: any }
  presetButton?: boolean
  onOff?: boolean
  button?: {
    [p: string]: any
    setup: {
      [p: string]: any
    }
  }
}
const $emit = defineEmits(['update:onOff', 'search'])
const props = withDefaults(defineProps<propMsg>(), { presetButton: true })
const { fieldList, formModel, formData, presetButton, onOff, button } =
  toRefs(props)

const fieldListMap = ref()

watchEffect(() => {
  fieldListMap.value = fieldList.value
    .map((item: any) => {
      return {
        ...item,
        label: '',
        title: item.label,
        config: {
          placeholder: item.label,
          ...(item?.config ? item.config : {}),
        },
      }
    })
    .filter((item: any) => {
      return unref(item.checked) !== false
    })
})

const defaultModel = $defineFormModel(() => {
  return {
    span: 6,
    rowAttr: {
      style: {
        marginLeft: '-8px',
        marginRight: '-8px',
      },
    },
    colAttr: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    config: {
      keyup({ e }: any) {
        if (e.code === 'Enter') search()
      },
    },
  }
})

const model = computed(() => {
  return $assign({}, defaultModel, formModel.value)
})
const span = computed(() => {
  return fieldListMap.value.reduce((prev: number, cur: any) => {
    return prev + (cur?.config?.span || cur?.span || model.value?.span || 0)
  }, 0)
})
const bool = ref(onOff?.value || !(span.value >= 72))
const remainderSpan = computed(() => {
  const num = (bool.value ? span.value : resSpan.value) % 24
  return 24 - num
})

const actionItem = reactive({
  key: 'action',
  span: computed(() => remainderSpan.value) as any,
  type: 'slotOut',
})

const fieldListRes = computed(() => {
  let arr
  arr = $cloneDeep(fieldListMap.value)
  if (!bool.value && !isInLayout) {
    arr = arr.splice(0, 3)
  }
  return arr
})
const resSpan = computed(() => {
  return fieldListRes.value.reduce((prev: number, cur: any) => {
    return prev + (cur?.config?.span || cur?.span || model.value?.span || 0)
  }, 0)
})
const resKeys = computed(() => fieldListRes.value.map((item: any) => item.key))
watch(
  () => bool.value,
  (val) => {
    $emit('update:onOff', val)
    if (!val) {
      const keys = Object.keys(formData?.value || {})
      keys.forEach((key: string) => {
        if (!resKeys.value.includes(key)) {
          if ($typeOf(formData?.value[key]) === 'string') {
            formData.value[key] = undefined
          }
          if ($typeOf(formData?.value[key]) === 'object') {
            formData.value[key] = {}
          }
          if ($typeOf(formData?.value[key]) === 'array') {
            formData.value[key] = []
          }
        }
      })
    }
  }
)

function reset() {
  if ($attrs?.onReset) {
    $attrs.onReset()
    return
  }
  const keys = Object.keys(formData?.value || {})
  keys.forEach((key: string) => {
    if ($typeOf(formData?.value[key]) === 'string') {
      formData.value[key] = undefined
    }
    if ($typeOf(formData?.value[key]) === 'object') {
      formData.value[key] = {}
    }
    if ($typeOf(formData?.value[key]) === 'array') {
      formData.value[key] = []
    }
  })
  formRef?.value?.resetFields()
  $attrs?.onResetPost?.()
}
async function search(isValidate: boolean = true) {
  if ($attrs?.['onSearch:false']) {
    $attrs?.['onSearch:false']?.({
      onOff: bool.value,
      formData: formData.value,
    })
    return
  }
  let res = { status: true }
  if (isValidate !== false) {
    res = (await formRef?.value?.validate()) ?? res
  }
  if (res.status === true) {
    $emit('search', { onOff: bool.value, formData: formData.value })
  } else {
    message.warning('查询条件不符合规则！')
  }
}

const formRef = ref()
const exposeData: { [p: string]: any } = reactive({})
onMounted(() => {
  if (formRef.value) {
    const formRefKeys = Object.keys(formRef.value)
    formRefKeys.forEach((key: string) => {
      exposeData[key] = (formRef.value as any)[key]
    })
  }
})
defineExpose(exposeData)
</script>
<style scoped lang="scss">
.pagesBox {
  position: relative;
}
.header-top {
  .search-form-area {
    border-top: 0;
  }
}
.action {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  // margin-left: -10px;
}
.iconRow {
  margin-bottom: -16px;
  display: flex;
  justify-content: center;
}
</style>
