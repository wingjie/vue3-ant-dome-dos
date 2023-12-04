import { ref, watch, computed } from 'vue'

export default function modal() {
  const status = ref<'url' | 'queryParams' | null>(null)
  const middle = ref<string>('')
  const queryParams = ref<{ key: string; value: string }[]>([])
  const url = computed({
    get() {
      return middle.value
    },
    set(val) {
      status.value = 'url'
      middle.value = val
      const reg = /.*\?/
      let parsePart = ''
      if (reg.test(val)) {
        parsePart = val.replace(/.*\?/, '') || ''
      }
      const partArr = parsePart ? parsePart?.split('&') : []
      queryParams.value =
        partArr?.map((item) => {
          const [key, value] = item.split('=')
          return { key, value }
        }) || []
    },
  })

  watch(
    () => queryParams.value,
    (val) => {
      if (status.value === 'url') {
        status.value = null
        return
      }
      if (val.length === 0) {
        if (middle.value.includes('?')) {
          middle.value = middle.value.replace(/\?.*/, '')
        } else {
          middle.value = ''
        }
        return
      }
      const arr = val?.map(({ key, value }) => {
        if (value) return `${key}=${value}`
        return `${key || ''}${value || ''}`
      })
      const afterTxt = arr.length ? arr.join('&') : ''
      if (val.length) {
        if (middle.value.includes('?')) {
          middle.value = middle.value.replace(/(?<=\?).*/, '') + afterTxt
        } else {
          middle.value = `${middle.value}?${afterTxt}`
        }
      }
      middle.value = !middle.value.includes('?')
        ? `?${middle.value}`
        : middle.value
    },
    { deep: true, flush: 'post' }
  )

  return [url, queryParams]
}
