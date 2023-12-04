<template>
  <div>
    <SForm
      :name="name"
      :formData="data"
      :field-list="[
        {
          label: '入口',
          key: 'baseTemplate',
          type: 'select',
          options: options,
          disabled,
          span: 24,
          ...(name
            ? {
                rules: [
                  { required: true, trigger: 'change', message: '不能为空' },
                ],
              }
            : {}),
        },
      ]"
      :form-model="{
        formItemAttr: {
          labelCol: {
            span: undefined,
            style: {
              width: '150px',
            },
          },
          wrapperCol: { span: 20 },
        },
        ...formModal,
      }"
    >
    </SForm>
    <a-form-item-rest>
      <a-tabs
        v-model:activeKey="activeKey"
        :type="disabled ? 'line' : 'editable-card'"
        @edit="onEdit"
        tabPosition="left"
      >
        <a-tab-pane
          v-for="(pane, key) in data.templates"
          :key="key"
          :closable="pane.closable"
        >
          <template #tab>
            <a-input
              v-if="middle && middle?.key === key"
              v-model:value="middle.name"
              placeholder="请输入文件名称"
              @keydown.enter="middleBlur"
              @blur="middleBlur"
            ></a-input>
            <span v-else>
              <span style="margin-right: 10px" @dblclick.stop="fn(pane, key)">
                {{ pane.name }}
              </span>
            </span>
          </template>
          <template #closeIcon>
            <div style="width: 50px; font-size: 13px">
              <i-ant-design-check-circle-outlined
                :class="{ green: data.baseTemplate === pane.name }"
                @click.stop="data.baseTemplate = pane.name || undefined"
              />
              <i-ant-design-save-outlined
                v-if="middle?.key === key"
                @click.stop="middleBlur"
              />
              <i-ant-design-edit-outlined v-else @click.stop="fn(pane, key)" />
              <i-ant-design-close-outlined />
            </div>
          </template>

          <SForm
            :name="name ? [...name, 'templates', key] : undefined"
            :formData="pane"
            :field-list="[
              {
                key: 'content',
                type: 'slot',
                span: 23,
                ...(name
                  ? {
                      rules: [
                        {
                          required: true,
                          trigger: 'change',
                          message: '不能为空',
                        },
                      ],
                    }
                  : {}),
              },
            ]"
          >
            <template #contentIn>
              <div style="height: 200px; width: 100%">
                <CodeEditor
                  v-model="pane.content"
                  :disabled="disabled"
                ></CodeEditor>
              </div>
            </template>
          </SForm>
        </a-tab-pane>
      </a-tabs>
    </a-form-item-rest>
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'

interface panesType {
  name: string
  content: string
  key?: number
  closable?: boolean
}
interface templatesType {
  baseTemplate: string | undefined
  templates: panesType[]
}

interface propMsg {
  modelValue?: templatesType
  disabled?: boolean
  name?: (string | number)[]
  formModal?: { [p: string]: any }
}
const $emit = defineEmits(['update:modelValue', 'change'])
const props = withDefaults(defineProps<propMsg>(), { formModal: () => ({}) })
const { modelValue, disabled, name } = toRefs(props)

const data = ref<templatesType>({
  baseTemplate: undefined,
  templates: [],
})
const options = computed(() => {
  return (
    data.value?.templates?.map((item) => {
      return {
        label: item.name,
        value: item.name,
      }
    }) || []
  )
})
watch(
  () => modelValue?.value,
  (val) => {
    if (val) {
      data.value = val
    }
  },
  { immediate: true }
)
watch(
  () => data.value,
  (val) => {
    $emit('update:modelValue', val)
    $emit('change', val)
  },
  {
    deep: true,
    immediate: true,
  }
)
watch(
  () => data.value.templates,
  (val) => {
    const index = val?.findIndex?.(
      (item) => item.name === data.value.baseTemplate
    )
    if (index === -1) {
      data.value.baseTemplate = undefined
    }
  },
  { deep: true }
)

const activeKey = ref(data?.value?.templates?.[0]?.key)

const add = () => {
  if (!data.value.templates) {
    data.value.templates = []
  }
  if (data.value.templates && data.value.templates.length === 0) {
    data.value.templates.push({
      name: `base.j2`,
      content: '',
    })
    data.value.baseTemplate = 'base.j2'
  } else {
    data.value.templates.push({
      name: `文件${data.value.templates.length + 1}`,
      content: '',
    })
  }
}

const remove = (targetKey: number) => {
  if (middle.value) return message.warning('请先修改保存后再进行此操作！')
  data.value.templates.splice(targetKey, 1)
}

const onEdit = (targetKey: number | MouseEvent, action: string) => {
  if (action === 'add') {
    add()
  } else {
    remove(targetKey as number)
  }
}

const middle = ref<panesType | null>(null)
const middleObj = ref<panesType | null>(null)
function fn(d: panesType, key: number) {
  if (disabled?.value) return
  middleObj.value = d
  middle.value = { ...d, key }
}
function middleBlur() {
  if (disabled?.value) return
  if (!middle.value?.name) {
    return message.warning('请先输入标签名')
  }
  Object.assign(middleObj.value || {}, {
    name: middle.value.name,
    content: middle.value.content,
  })
  middle.value = null
}
function getData() {
  if (!data.value.baseTemplate) {
    message.warning('请选择入口文件')
    return false
  }
  const bool = !data.value.templates.some((item) => !item.name || !item.content)
  if (!bool) {
    message.warning('请填写完整内容!')
    return false
  }
  return JSON.parse(JSON.stringify(data))
}
defineExpose({
  getData,
})
</script>
<style scoped lang="scss">
:deep(.ant-tabs-tab-remove) {
  margin-left: auto;
  padding-right: 0;
}
.green {
  color: green;
}
label {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
</style>
