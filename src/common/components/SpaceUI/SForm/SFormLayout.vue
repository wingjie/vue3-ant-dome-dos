<template>
  <div>
    <a-row v-bind="modelData?.rowAttr">
      <a-col
        v-for="(field, index) in fieldListMapFilter"
        :key="field.key + index"
        :span="field?.span || field?.colAttr?.span"
        :style="{
          display:
            index < (modelData.expandNum || fieldListMapFilter.length)
              ? 'block'
              : 'none',
          ...modelData?.colAttr?.style,
        }"
      >
        <template v-if="field.type">
          <slot
            v-if="
              field.type && (field.type === 'slot' || field.type === 'slotOut')
            "
            :name="`${field.key}`"
            :field="field"
            :mapData="formDataMap"
            :data="formData"
          ></slot>
          <FormItem
            v-if="field.isForm"
            ref="formItemRef"
            v-bind="{
              ...$attrs,
              ...($attrs?.['onUpdate:formDataMap']
                ? {
                    ['onUpdate:mapData'](value: any) {
                      $attrs?.['onUpdate:formDataMap']({
                        ...formDataMapB,
                        ...value,
                      })
                    },
                  }
                : {}),
              ...($attrs?.['onUpdate:formData']
                ? {
                    ['onUpdate:rowData'](value: any) {
                      $attrs?.['onUpdate:formData']({
                        ...formDataB,
                        ...value,
                      })
                    },
                  }
                : {}),
            }"
            :field="(field as any)"
            :fieldIndex="index"
            :modelData="modelData"
            :mapData="formDataMap"
            :rowData="formData"
            :formData="formData"
            :isCore="Boolean(formDataMap)"
            :rowMsg="rowMsg"
            :name="[...name]"
          >
            <!-- CustomRequired<fieldListType, 'type'> -->
            <template #itemIn="data">
              <slot
                v-if="field.type && field.type === 'slot'"
                :name="`${field.key}In`"
                :data="data.data"
                :mapData="formDataMap"
                :model="modelData"
                :field="data.field"
              />
            </template>
            <template #itemSlot="data">
              <slot
                v-if="
                  field?.config?.$type === 'slot' ||
                  field?.config?.type === 'slot'
                "
                :name="`${field.key}${field?.config?.key}In`"
                :data="data.data"
                :field="data.field"
                :mapData="formDataMap"
              />
            </template>
          </FormItem>
        </template>
      </a-col>
    </a-row>
    <a-row>
      <slot name="formRow" :data="formDataMap" />
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { get } from '@vueuse/core'
import {
  formModelType,
  fieldListType,
  // CustomRequired,
} from '@/common/componentsFn/propType'
import { rowMsgType } from '@/common/componentsFn/propType/form'
import FormItem from '../../FormItem/index.vue'

const $attrs: any = useAttrs()
interface propMsg {
  modelData: formModelType
  fieldListMap: fieldListType[]
  formDataMap: {
    // value: any
    [p: string]: any
  } | null
  formData: object
  rowMsg: rowMsgType
  name: (string | number)[]
}
// const emit = defineEmits([])
const props = withDefaults(defineProps<propMsg>(), {})
const {
  modelData,
  formDataMap: formDataMapB,
  formData: formDataB,
  fieldListMap,
} = toRefs(props)
const formDataMap = computed(() => {
  return formDataMapB.value
})

const formData = computed(() => {
  return formDataB.value
})

const fieldListMapFilter = computed(() => {
  return get(fieldListMap).filter((item: any) => {
    if (get(item?.checked) === false) {
      return false
    }
    return true
  })
})
</script>
<style scoped lang="scss"></style>
