<template>
  <div style="width: 100%">
    <!-- {{ formData }}
    {{ rowKey }}
    {{ isShowNull }} -->
    <!-- {{ Object.prototype.hasOwnProperty.call(formDataFather, rowKey) }} -->
    <a-tooltip title="设置为NULL">
      <a-button
        v-show="isShowNull"
        type="link"
        :disabled="disabled"
        @click="nullHandle"
      >
        <SvgIcon
          :name="formData !== null ? 'icon-null' : 'icon-null-red'"
          fontSize="20px"
        ></SvgIcon>
      </a-button>
    </a-tooltip>
    <a-tooltip title="设置为缺省">
      <a-button
        v-if="jsonSchema.isRequired === false"
        type="link"
        class="svg-icon"
        :disabled="disabled"
        @click="isNoneFn"
      >
        <!-- @click="mastHandel(true)" -->
        <SvgIcon
          :name="
            !Object.prototype.hasOwnProperty.call(formDataFather, rowKey)
              ? 'icon-must-red'
              : 'icon-must'
          "
          fontSize="20px"
        >
        </SvgIcon>
      </a-button>
    </a-tooltip>
    <!-- <a-tooltip title="高级设置" style="order: 3">
      <a-button class="svg-icon" type="link">
        <SvgIcon name="icon-advanced" fontSize="20px"></SvgIcon>
      </a-button>
    </a-tooltip> -->
  </div>
</template>
<script setup lang="ts">
interface propMsg {
  formData: any
  formDataFather: any
  jsonSchema: {
    [p: string]: any
  }
  config?: {
    column: { title: string; span: number }[]
  }
  rowKey?: string | number
  name: (string | number)[]
  disabled?: boolean
}
const emit = defineEmits(['changeData', 'isNoneFn'])
const props = withDefaults(defineProps<propMsg>(), {
  disabled: false,
  rowKey: '',
})
const { formData, jsonSchema, rowKey, formDataFather, disabled } = toRefs(props)

const isShowNull = computed(() => {
  return jsonSchema.value.type.includes('null')
})
function nullHandle() {
  changeFn(formData.value !== null, rowKey.value, jsonSchema.value)
}
function changeFn(e: any, _key: string | number, jsonSchemaType: any) {
  if (e) {
    changeDataFn(null)
  } else if (
    jsonSchemaType.type === 'object' ||
    jsonSchemaType.type?.includes('object')
  ) {
    changeDataFn({})
  } else if (
    jsonSchemaType.type === 'array' ||
    jsonSchemaType.type?.includes('array')
  ) {
    changeDataFn([])
  } else if (
    jsonSchemaType.type === 'string' ||
    jsonSchemaType.type.includes('string')
  ) {
    changeDataFn('')
  } else if (
    jsonSchemaType.type === 'boolean' ||
    jsonSchemaType.type?.includes('boolean')
  ) {
    changeDataFn(false)
  } else {
    changeDataFn(undefined)
  }
}
function changeDataFn(val: any) {
  emit('changeData', val)
}
function isNoneFn() {
  emit(
    'isNoneFn',
    !Object.prototype.hasOwnProperty.call(formDataFather.value, rowKey.value),
    rowKey.value
  )
}
</script>
<style scoped lang="scss"></style>
