<template>
  <div class="bulk" :id="path?.url?.replace(/\.*\/*\s*/g, '')">
    <section>
      <slot name="ex">
        <Module ref="moduleRef"></Module>
      </slot>
    </section>
    <a-divider style="margin: 0" orientation="left" :plain="false">
      <slot name="title">{{ config.title }}</slot>
    </a-divider>
    <section>
      <slot name="p">
        <template v-if="config.contextType === 'auto'">
          {{ config.context }}
        </template>
        <pre v-if="config.contextType === 'pre'" style="width: 100%">{{
          config.context
        }}</pre>
        <component
          v-if="config.contextType === 'h'"
          style="width: 100%"
          :is="config.context"
        ></component>
      </slot>
    </section>
    <a-collapse
      expandIconPosition="left"
      :bordered="true"
      v-model:activeKey="activeKey"
    >
      <template #expandIcon>
        <a-tooltip>
          <div style="color: #999">
            <div v-if="activeKey.length">{{ '\< / \>' }}</div>
            <div v-else>{{ '\< &nbsp;  \>' }}</div>
          </div>
          <template #title>
            <span v-if="activeKey.length">收起代码</span>
            <span v-else>显示代码</span>
          </template>
        </a-tooltip>
      </template>
      <a-collapse-panel :bordered="false" key="1">
        <p>
          <Highlight :code="code" />
        </p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script setup lang="ts">
import defaultCom from './vue.vue'

interface propMsg {
  path?: {
    url?: string
    file: any
  }
  msg?: {
    [p: string]: any
  }
}

// const emit = defineEmits([])
const props = withDefaults(defineProps<propMsg>(), { msg: () => ({}) })
const { path, msg } = toRefs(props)
const activeKey = ref([])
const Module = shallowRef(defaultCom)
const code = ref('')
const moduleRef = ref()
// Hljs.highlightBlock(moduleRef.value)
const config = reactive<{
  title: any
  context: any
  contextType: 'auto' | 'pre' | 'h'
}>({
  title: '加载中...',
  context: '加载中...',
  contextType: 'auto',
})

path?.value?.file().then((res: any) => {
  // console.log('res>>>>>>>>', res)
  Module.value = res.default
  nextTick(() => {
    actionOriginCode(decodeURIComponent(moduleRef.value?.originCode))
    const { title, context, order, contextType } =
      moduleRef.value?.$config || {}
    config.title = title ?? config.title
    config.context = context ?? config.context
    config.contextType = contextType ?? config.contextType
    msg.value.title = title
    msg.value.context = context
    msg.value.order = order
  })
})
function actionOriginCode(originCodeStr: string) {
  code.value = originCodeStr
  const configRegexBefore = /(let|const|var)\s+\$config\s=\s(ref|reactive)\(/g
  const str = findUnit(configRegexBefore, code.value)
  // const configRegex = /(let|const|var)\s+\$config\s=\s(ref|reactive)\(\{[\s\S]*\}\)\s/gs
  const defineExposeRegex =
    /(?<=(defineExpose)\s?\(\{[\s\S]*)(\$config\s*,\s?)|(\$config:?\s*\{[\S\s]*\s*\},\s?)(?=[\s\S]*\}\))/gs
  const defineExposeNullRegex = /defineExpose\s?\(\{[\s]*\}\)\s?/gs
  // console.log('1111', code.value, defineExposeNullRegex.test(code.value))
  code.value = code.value.replace(str, '')
  code.value = code.value.replace(defineExposeRegex, '')
  code.value = code.value.replace(defineExposeNullRegex, '')
  // console.log('2222', code.value, defineExposeNullRegex.test(code.value))
  function findUnit(configRegexBeforeArg: RegExp, codeArg: string) {
    const beforeStr: any = code.value.match(configRegexBeforeArg)
    if (beforeStr === null) return ''
    let index = codeArg.indexOf(beforeStr) + beforeStr[0].length
    let strCourse = beforeStr
    let i = 1
    while (i > 0) {
      const item = code.value[index]
      strCourse += item
      if (item === '(') {
        i += 1
      }
      if (item === ')') {
        i -= 1
      }
      index += 1
    }
    return strCourse
  }
}
</script>
<style scoped lang="scss">
.bulk {
  border: 1px solid #ddd;
}
:deep(.ant-collapse-header) > div {
  width: 100%;
  text-align: center;
}
:deep(.ant-collapse-header) {
  border: none;
}
:deep(.ant-collapse) {
  border: none;
  border-top: 1px dashed #f0f0f0;
  & > .ant-collapse-item {
    border-bottom: none;
  }
}
section {
  min-height: 50px;
  padding: 10px 20px;
}
</style>
