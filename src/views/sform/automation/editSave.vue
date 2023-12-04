<template>
  <div>
    <SForm ref="formRef" v-bind="form">
      <template #operationIn="data">
        <a-space>
          <!-- v-if="!data['mapData'][data.scope.record.id]" -->
          <a-button v-if="!data.mapData" type="primary" @click="editRow(data)"
            >编辑</a-button
          >
          <template v-else>
            <a-button @click="cancelRow(data)">取消</a-button>
            <a-button type="primary" @click="confirmRow(data)">保存</a-button>
          </template>
        </a-space>
      </template>
    </SForm>
    <hr />
    {{ form.formData }}
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'

const formRef = ref()
const form = reactive({
  formData: {
    name: 'wing',
    age: '18',
    sex: 0,
    isAge: true,
    like: 'dance',
    nature: [0, 1],
    time: '2023-03-22 09:26:03',
    remark: '这是一个备注',
  },
  fieldList: [
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
    { label: ' ', key: 'operation', type: 'slot' },
  ],
  formModel: {
    isForm: false,
    follow: false,
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
    },
  },
})
function editRow(data: any) {
  // console.log('data', data)
  const { way } = data
  way.update()
}
function cancelRow(data: any) {
  const { way } = data
  way.cancel()
}
function confirmRow(data: any) {
  const { way } = data
  formRef.value.validate().then(({ status }: any) => {
    if (!status) {
      return message.warning('请填写完整')
    }
    way.confirm()
    message.success('提交成功')
  })
}

const $config = ref({
  title: '编辑、修改使用',
  order: 2,
  context:
    '编辑的功能。使用插槽slot,way中的操作方法。需要设置formModel.isForm: false, formModel.follow: false,',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
