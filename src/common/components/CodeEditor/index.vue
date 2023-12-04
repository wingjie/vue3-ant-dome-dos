<template>
  <codemirror
    :class="{ codemirror: true, disabled: disabled }"
    v-model="txtValue"
    :disabled="disabled"
    v-bind="{
      ...optionDom,
      ...$attrs,
    }"
    @change="change"
    @blur="blur"
    :extensions="extensionsDom"
  />
</template>

<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
// import { json } from '@codemirror/lang-json'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { Form } from 'ant-design-vue'
import { typeOf, assign } from '@/common/utils/traverseTree/index'

const formItemContext = Form.useInjectFormItemContext()

const { onFieldChange, onFieldBlur } = formItemContext

const $attrs: any = useAttrs()

const myTheme = EditorView.theme(
  {
    '&': {
      color: '',
      backgroundColor: '#fff',
      border: '1px solid #d9d9d9',
      'border-radius': '2px',
    },
    '&:hover': {
      'border-color': '#8cc8ff',
    },
    '.cm-content': {
      caretColor: '#0e9',
    },
    '&.cm-focused': {
      'border-color': '#8cc8ff',
      'box-shadow': '0 0 0 2px rgba(24,144,255,.2)',
      outline: 'none',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#0e9',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#074',
    },
    '.cm-gutters': {
      backgroundColor: '#fff',
      color: '#aaa',
      border: 'none',
    },
    "div[class*='form-item-has-error &:hover']": {
      'border-color': '#ff4d4f',
    },
    "div[class*='form-item-has-error'] &": {
      border: '1px solid #ff4d4f',
    },
    "div[class*='form-item-has-error'] &.cm-focused": {
      'border-color': '#ff4d4f',
      'box-shadow': '0 0 0 2px rgba(255,77,79,.2)',
    },
    '.disabled &': {
      backgroundColor: '#f5f5f5',
    },
    '.disabled &:hover': {
      'border-color': '#d9d9d9',
    },
    '.disabled & .cm-gutters': {
      backgroundColor: '#f5f5f5',
    },
  },
  { dark: false }
)

const presetValueMsgO = {
  html,
  // json,
  javascript,
  default: javascript,
}
const presetValueMsgT = {
  oneDark,
  default: myTheme,
}
const presetValueO: {
  [p in keyof typeof presetValueMsgO]: (typeof presetValueMsgO)[p]
} = presetValueMsgO
const presetValueT: {
  [p in keyof typeof presetValueMsgT]: (typeof presetValueMsgT)[p]
} = presetValueMsgT

interface propMsg {
  options?: {
    placeholder?: string
    style?: { [p: string]: any }
    autofocus?: boolean
    'indent-with-tab'?: boolean
    tabSize?: number
    [p: string]: any
  }
  disabled?: boolean
  modelValue: string
  extensions?: [
    keyof typeof presetValueO | undefined | Function,
    keyof typeof presetValueT | undefined | object
  ]
  type?: [
    keyof typeof presetValueO | undefined | Function,
    keyof typeof presetValueT | undefined | object
  ]
}
const $emit = defineEmits([
  'update:modelValue',
  'change',
  'blur',
  'sChange',
  'sBlur',
])
const props = withDefaults(defineProps<propMsg>(), {
  disabled: false,
  options: () => ({}),
  modelValue: '',
})
const { disabled, options, modelValue, extensions, type } = toRefs(props)

const defaultOption: { [p: string]: any } = {
  placeholder: '请输入...',
  style: { height: '100%' },
  autofocus: false,
  'indent-with-tab': true,
  tabSize: 2,
}

const txtValue = computed({
  get() {
    return modelValue.value
  },
  set(val: any) {
    $emit('update:modelValue', val)
  },
})
const optionDom = computed(() =>
  assign({}, defaultOption, options?.value, $attrs)
)
const extensionsDomO = computed(() => {
  const propVal = extensions?.value?.[0] || type?.value?.[0]
  if (typeof propVal === 'string') {
    return presetValueO[propVal || 'default']()
  }
  if (typeof propVal === 'function') {
    return propVal()
  }
  return presetValueO.default()
})
const extensionsDomT = computed(() => {
  const propVal = extensions?.value?.[1] || type?.value?.[1]
  if (typeof propVal === 'string') {
    return presetValueT[propVal || 'default']
  }
  if (typeOf(propVal) === 'object') {
    return propVal
  }
  return presetValueT.default
})

const extensionsDom = [extensionsDomO.value, extensionsDomT.value]

function change(val: string, viewUpdate: ViewUpdate) {
  $emit('change', val, viewUpdate)
  // Todo: $emit('sChange', val, viewUpdate)
  nextTick(() => {
    onFieldChange()
  })
}
function blur(viewUpdate: ViewUpdate) {
  $emit('blur', txtValue.value, viewUpdate)
  nextTick(() => {
    onFieldBlur()
  })
}
</script>

<style scoped lang="scss">
// :deep(.CodeMirror) {
//   border: 1px solid #eee;
//   height: 100% !important;
// }

// :deep(.CodeMirror-scroll) {
//   height: 100% !important;
//   min-height: 100px;
// }
// :deep(.cm-s-neo) .CodeMirror-linenumber {
//   background: white;
//   padding-right: 3px;
// }
</style>
