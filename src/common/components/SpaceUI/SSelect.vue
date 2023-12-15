<template>
  <a-select
    ref="selectRef"
    :mode="mode"
    :filter-option="filterOption"
    v-bind="{
      onSearch: handleSearch,
      [options.length ? 'options' : '']: options,
      ...$attr,
    }"
    :showSearch="Boolean(showSearch)"
    v-model:value="value"
    @change="change"
  >
    <slot name="default"></slot>
    <template v-for="(value, names) of $slots" #[names]>
      <slot :name="names"></slot>
    </template>
  </a-select>
</template>
<script setup lang="ts">
interface propMsg {
  value: string | string[] | undefined
  division?: string
  modeWay?: 'string' | 'array'
  radio?: boolean
  mode?: 'multiple' | 'tags' | string
  showSearch?:
    | boolean
    | (() => Function | [Function, number | undefined, boolean | undefined])
}
const $emit = defineEmits(['update:value', 'change'])
const props = withDefaults(defineProps<propMsg>(), {
  division: ',',
  radio: false,
  mode: 'multiple',
  showSearch: false,
})
const $attr = useAttrs()
const $slots = useSlots() ?? {}
const selectRef = ref<any>(null)
const { division, modeWay, radio, showSearch, mode } = toRefs(props)
const formData = useVModel(props, 'value', $emit)
const typeMode = computed(() => {
  if (modeWay?.value) return modeWay.value
  if (Array.isArray(formData.value)) return 'array'
  return 'string'
})
const value = computed({
  get() {
    if (Array.isArray(formData.value)) {
      return formData.value
    }
    return formData.value ? formData.value.toString().split(division.value) : []
  },
  set(val: string[]) {
    formData.value = resValue(val)
  },
})

const options = ref([])
const optionsScoped = inject<any>('optionsScoped', options)

const filterOption = (input: string, option: any) => {
  if (!showSearch?.value) return true
  if (typeof showSearch?.value === 'function') {
    return true
  }
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
let handleSearch: any
if (typeof showSearch?.value === 'function') {
  let fn: Function
  let timer: number | undefined
  let immediate: true | undefined
  if ($typeOf(showSearch?.value) === 'asyncfunction') {
    fn = showSearch.value
  } else {
    const searchData: any = showSearch.value()
    if (typeof searchData === 'function') {
      fn = searchData
    } else if (Array.isArray(searchData)) {
      ;[fn, timer, immediate] = searchData
    }
  }
  handleSearch = $debounce(
    async (input: string) => {
      const res = await fn(input)
      optionsScoped.value = res
    },
    timer ?? 1000,
    immediate ?? false
  )
}

function change(val: any, option: any) {
  if (radio.value) {
    selectRef.value?.blur()
  }
  $emit('change', resValue(val), resOption(option), val)
}

function resValue(val: string[]) {
  if (mode.value !== 'tags' && mode.value !== 'multiple') {
    return val
  }
  if (typeMode.value === 'array') {
    return radio.value ? [val[val.length - 1]] : val
  }
  return radio.value ? val[val.length - 1] : val?.join?.(division.value) || ''
}
function resOption(val: string[]) {
  return radio.value ? [val[val.length - 1]] : val
}
</script>
<style scoped lang="scss"></style>
