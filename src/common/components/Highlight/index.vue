<template>
  <pre
    class="box"
  ><code :class="[className]" v-html="highlightedCode"></code></pre>
</template>
<script setup lang="ts">
import 'highlight.js/lib/common'
import hljs from 'highlight.js/lib/core'
// import dark from 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/styles/atom-one-light.css'

interface propMsg {
  code: string
  language?: string // https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
  autodetect?: boolean
  ignoreIllegals?: boolean
  styles?: string
}
const props = withDefaults(defineProps<propMsg>(), {
  code: '',
  language: 'html',
  autodetect: true,
  ignoreIllegals: true,
  // styles: 'highlight.js/styles/atom-one-dark.css',
})
const {
  code,
  language,
  autodetect,
  ignoreIllegals,
  //  styles
} = toRefs(props)

const languages = ref(language.value)
watch(
  () => language.value,
  (newLanguage) => {
    languages.value = newLanguage
  }
)
const cannotDetectLanguage = computed(
  () => !autodetect.value && !hljs.getLanguage(languages.value)
)

const className = computed((): string => {
  if (cannotDetectLanguage.value) {
    return ''
  }
  return `hljs ${languages.value}`
})

const highlightedCode = computed((): string => {
  // No idea what language to use, return raw code
  if (cannotDetectLanguage.value) {
    console.warn(
      `The language "${languages.value}" you specified could not be found.`
    )
    return escapeHtml(code.value)
  }

  if (autodetect.value && !languages.value) {
    const result = hljs.highlightAuto(props.code)
    languages.value = result.language ?? ''
    return result.value
  }
  const result = hljs.highlight(props.code, {
    language: languages.value,
    ignoreIllegals: ignoreIllegals.value,
  })
  return result.value
})

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}
</script>
<style scoped lang="scss">
// @import url('highlight.js/styles/atom-one-dark.css');
</style>
<style scoped lang="scss">
@import url('highlight.js/styles/atom-one-light.css');
</style>
