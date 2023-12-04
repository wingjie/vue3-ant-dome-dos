<template>
  <div>
    <SForm ref="formRef" v-bind="formData">
      <template #likeIn="data">
        <a-form-item-rest>
          <SForm
            :field-list="likeData.fieldList"
            :form-data="data.data.like"
            :formModel="data.model"
            :name="['like']"
          ></SForm>
        </a-form-item-rest>
      </template>
      <template #formOut>
        <a-button type="primary" @click="sub">提交</a-button>
      </template>
    </SForm>
    {{ formData.formData }}
  </div>
</template>
<script setup lang="ts">
const formRef = ref()
const formData = reactive({
  formData: {
    name: '',
    ages: undefined,
    like: {
      sing: '',
      dance: undefined,
    },
  },
  fieldList: [
    { label: '姓名', key: 'name', type: 'input' },
    { label: '年纪', key: 'ages', type: 'select' },
    { label: '爱好', key: 'like', type: 'slot' },
  ],
  formModel: {
    optionsData: {
      ages: [{ label: '0' }, { label: '1' }],
      dance: [{ label: '霹雳' }, { label: '机械' }],
    },
    span: 16,
    rules: {
      name: [{ required: true, trigger: 'blur', message: '请输入用户名!' }],
      sing: [{ required: true, trigger: 'blur', message: '请输入喜欢什么歌' }],
    },
  },
})
const likeData = reactive({
  fieldList: [
    { label: '唱歌', key: 'sing', type: 'input' },
    { label: '跳舞', key: 'dance', type: 'select' },
  ],
})
function sub() {
  formRef.value.validate()
}
const $config = reactive({
  title: 'SForm嵌套SForm用法',
  order: 4,
  context:
    '使用这种嵌套是应对多层级数据结构form表单场景，可以进行一次性校验。需要使用属性name表述清楚数据结构。',
})
defineExpose({
  $config,
})
</script>
<style scoped lang="scss"></style>
