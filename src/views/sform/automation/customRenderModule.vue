<template>
  <div>
    <SForm ref="formRef" v-bind="form">
      <template #operationIn>
        <a-button type="primary" @click="submit">提交</a-button>
      </template>
    </SForm>
    <br />
    {{ form.formData }}
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { defineForm } from '@/common/utils/define/form'
import CodeEditor from '@/common/components/CodeEditor/index.vue'

const formRef = ref()
const form = reactive(
  defineForm(() => {
    return [
      {
        name: '',
        age: '',
      },
      [
        { label: '名称', key: 'name', type: 'input' },
        { label: '成年', key: 'age', type: 'input' },
        {
          label: '日期',
          key: 'time',
          type: 'date-picker',
          config: {
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
          },
        },
        {
          label: '参数',
          key: 'params',
          type: 'input',
          config: {
            customRender() {
              return [CodeEditor, { style: { height: '80px' } }]
            },
          },
        },
        // {
        //   label: '参数2',
        //   key: 'params2',
        //   type: 'input',
        //   config: {
        //     customRender() {
        //       return CodeEditor
        //     },
        //   },
        // },
        // {
        //   label: '参数3',
        //   key: 'params3',
        //   type: 'input',
        //   config: {
        //     customRender: markRaw(CodeEditor)
        //   },
        // },
        { label: '', key: 'operation', type: 'slot' },
      ],
      {
        config: {
          isForm: true,
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '不能为空' }],
          age: [{ required: true, trigger: 'blur', message: '不能为空' }],
          params: [{ required: true, trigger: 'blur', message: '不能为空' }],
          //   params2: [{ required: true, trigger: 'blur', message: '不能为空' }],
          //   params3: [{ required: true, trigger: 'blur', message: '不能为空' }],
        },
      },
    ]
  })
)

function submit() {
  formRef.value.validate().then(({ status }: any) => {
    if (!status) {
      return message.warning('请填写完整')
    }
    message.success('提交成功')
  })
}

const $config = ref({
  title: '自定义customRender',
  order: 7,
  context: '使用自定义的customRender直接渲染组件,是使用插槽的一个简单使用',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
