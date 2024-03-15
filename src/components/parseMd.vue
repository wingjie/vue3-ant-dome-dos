<template>
  <div>
    <div class="explanation markdown" v-html="explanation"></div>
  </div>
</template>
<script setup lang="ts">
import { marked } from 'marked'
import hljs from 'highlight.js'

interface propMsg {
  name?: string
  path?: string
}
// const emit = defineEmits([])
const props = withDefaults(defineProps<propMsg>(), {})
const { name, path } = toRefs(props)

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  breaks: true,
  smartLists: true,
  smartypants: false,
  highlight(code: any) {
    return hljs.highlightAuto(code).value
  },
})
const explanation = ref('')
const metaUrl = import.meta.url

let url: string = ''
if (path && path.value) {
  url = path.value.replace(/^..\//, '')
} else if (name && name.value) {
  const baseUrl = import.meta.env.MODE !== 'development' ? '/vue3-ant-dome-dos' : ''
  url = `${baseUrl}/src/common/${name.value}`
}

const absolutePath = new URL(url, metaUrl || '').href
const xhr = new XMLHttpRequest()
xhr.open('GET', absolutePath, true)
xhr.send()
xhr.onreadystatechange = function onreadystatechange() {
  if (this.readyState === 4 && this.status === 200) {
    explanation.value = marked(this.responseText)
  }
}
</script>
<style scoped lang="scss">
:deep(pre) {
  padding: 10px;
  border-radius: 5px;
  background-color: #fcf9fd;
}
:deep(table) {
  margin: 30px auto;
  width: 100%;
  border: 1px solid #f0f0f0;
  thead tr {
    border: 1px solid #f0f0f0;
    background-color: rgba(0, 0, 0, 0.02);
    color: #5c6b77;
    th {
      padding: 10px;
    }
  }
  tbody {
    tr {
      td {
        padding: 10px;
        border: 1px solid #f0f0f0;
        border-color: #f0f0f0;
        font-size: 13px;
        &:first-child {
          width: 18%;
          color: #595959;
          font-weight: 600;
          white-space: nowrap;
        }
        &:nth-child(3) {
          width: 22%;
          color: #c41d7f;
          font-size: 13px;
        }
      }
      &:hover {
        background: rgba(60, 90, 100, 0.04);
      }
    }
  }
}
</style>
