<template>
  <div>
    <SSearchForm
      v-bind="formOption"
      @search="search"
      @reset="reset"
      :presetButton="true"
      :onOff="false"
    >
      <div>默认插槽</div>
    </SSearchForm>
  </div>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { defineForm } from '@/common/utils/define/form'

const formOption = reactive(
  defineForm(() => {
    return [
      {
        name: '',
        sex: null,
        nature: null,
        like: null,
      },
      [
        { label: '名称', key: 'name', type: 'input' },
        { label: '性别', key: 'sex', type: 'select' },
        { label: '性格', key: 'nature', type: 'select' },
        { label: '爱好', key: 'like', type: 'select' },

        {
          label: '日期',
          key: 'time',
          type: 'date-picker',
          config: {
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
          },
        },
        {
          label: '备注',
          key: 'remark',
          type: 'textarea',
          config: { rows: 1 },
        },
      ],
      {
        optionsData: {
          nature: [
            { label: '活泼', value: 'lively' },
            { label: '开朗', value: 'outgoing' },
          ],
          sex: [
            { label: '男', value: 'man' },
            { label: '女', value: 'woman' },
          ],
          like: [
            { label: '唱歌', value: 'sing' },
            { label: '跳舞', value: 'dance' },
          ],
        },
      },
    ]
  })
)
const search = ({ onOff, formData }: { onOff: boolean; formData: object }) => {
  console.log(onOff, formData, 'msg')
  message.success('搜索')
}
const reset = () => {
  message.success('清空')
}
const $config = ref({
  title: '基础使用',
  context: `
  基于SForm进行封装,将label字段转换为placeholder进行展示
  添加了搜索和重置(reset)两个默认按钮(search)
  `,
  contextType: 'pre',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
