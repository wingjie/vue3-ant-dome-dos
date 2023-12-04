<template>
  <div>
    <SForm ref="formRef" v-bind="form">
      <template #codeIn>
        <CodeEditor v-model="form.formData.code"></CodeEditor>
      </template>
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

const formRef = ref()
const form = reactive(
  defineForm(() => {
    return [
      {
        name: 'wing',
        age: '',
        sex: 0,
        isAge: false,
        like: undefined,
        nature: [0, 1],
        address: [],
        code: '',
      },
      [
        { label: '名称', key: 'name', type: 'input' },
        { label: '性别', key: 'sex', type: 'radio-group' },
        {
          label: '年龄',
          key: 'age',
          type: 'input-number',
          config: {
            change(data: any) {
              const { value, record } = data
              if (value >= 18) {
                record.isAge = true
              } else {
                record.isAge = false
              }
            },
          },
        },
        { label: '是否成年', key: 'isAge', type: 'switch' },
        { label: '性格', key: 'nature', type: 'checkbox-group' },
        { label: '爱好', key: 'like', type: 'select' },
        {
          label: '日期',
          key: 'time',
          type: 'date-picker',
          config: {
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
          },
        },
        { label: '备注', key: 'remark', type: 'textarea' },
        { label: 'code', key: 'code', type: 'slot' },
        { label: ' ', key: 'operation', type: 'slot' },
      ],
      {
        // isForm: false,
        config: {
          isForm: true,
        },
        optionsData: {
          nature: [
            { label: '活泼', value: 0 },
            { label: '开朗', value: 1 },
          ],
          sex: [
            { label: '男', value: 0 },
            { label: '女', value: 1 },
          ],
          isAge: [
            { label: '是', value: true },
            { label: '否', value: false },
          ],
          like: [
            { label: '唱歌', value: 'sing' },
            { label: '跳舞', value: 'dance' },
          ],
        },
        rules: {
          name: [{ required: true, trigger: 'blur', message: '不能为空' }],
          like: [{ required: true, trigger: 'change', message: '不能为空' }],
          code: [{ required: true, trigger: 'blur', message: '不能为空' }],
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
  title: '基础使用',
  order: 1,
  context: '快速构建表单。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
