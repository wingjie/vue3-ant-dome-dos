<template>
  <span style="width: 100%" v-if="lineItem?.type">
    <slot
      v-if="lineItem?.type === 'slot' || lineItem?.type === 'slotOut'"
      :name="`${'out'}`"
      :scope="{
        text: dataItem[lineItem?.['key']],
        record: dataItem,
        index: dataIndex,
      }"
      :mapData="mapData"
      :model="model"
      :data="data"
      :extra="extra"
      :field="lineItem"
    />
    <slot
      v-if="
        (lineItem?.type === 'slot' || lineItem?.type === 'slotIn') &&
        !lineItem?.isForm
      "
      :name="`${'in'}`"
      :scope="{
        text: dataItem[lineItem?.['key']],
        record: dataItem,
        index: dataIndex,
      }"
      :mapData="mapData"
      :model="model"
      :data="data"
      :extra="extra"
      :field="lineItem"
    />
    <template v-if="lineItem.type !== 'slotOut' && lineItem.isForm">
      <div class="formItem" style="width: 100%">
        <FormItem
          ref="formItemRef"
          v-bind="proxy?.$attrs"
          :field="lineItem"
          :index="dataIndex"
          :name="[...propName, dataIndex]"
          :modelData="model"
          :mapData="
            mapDataFn({
              field: lineItem,
              index: dataIndex,
              name: [...propName, dataIndex, lineItem.key],
              modelData: model,
              mapData: mapData,
              rowData: dataItem,
              formData: recordData,
            })
          "
          :rowData="dataItem"
          :formData="recordData"
          :isCore="
            isCoreFn({
              field: lineItem,
              index: dataIndex,
              name: [...propName, dataIndex],
              modelData: model,
              mapData: mapData,
              rowData: dataItem,
              formData: recordData,
            })
          "
          :rowMsg="rowMsg"
        >
          <template #itemIn="itemInData">
            <slot
              v-if="lineItem?.type === 'slot' || lineItem?.type === 'slotIn'"
              :name="`itemIn`"
              :data="itemInData.data"
              :model="model"
              :field="itemInData.field"
              :scope="{
                text: dataItem[lineItem?.['key']],
                record: dataItem,
                index: dataIndex,
              }"
            />
          </template>
          <template #itemSlot="itemSlotData">
            <slot
              v-if="lineItem?.config?.type === 'slot'"
              :name="`itemSlot`"
              :data="itemSlotData"
              :model="model"
              :field="itemSlotData.field"
            />
          </template>
        </FormItem>
      </div>
    </template>
    <div
      v-else-if="
        !(lineItem.type === 'slot' || lineItem.type === 'slotOut') ||
        lineItem?.config?.isShowFindCodeName
      "
      :class="[
        'cell',
        {
          ellipsis: lineItem.ellipsis === false ? false : true,
        },
      ]"
      :style="{
        'text-align': `${lineItem.align || 'left'}`,
        ...lineItem?.mConfig?.style,
      }"
      :title="
        Object.prototype.hasOwnProperty.call(lineItem?.mConfig || {}, 'tooltip')
          ? typeof lineItem?.mConfig?.tooltip === 'function'
            ? lineItem?.mConfig?.tooltip(
                {
                  rowIndex: index,
                  field: lineItem,
                  dataAt: dataItem,
                  record: dataItem,
                  value: dataItem[lineItem.key],
                },
                recordData,
                model
              )
            : lineItem?.mConfig?.tooltip
          : txt
      "
    >
      {{ txt }}
    </div>
  </span>
  <div
    v-else-if="Object.prototype.hasOwnProperty.call(lineItem, 'customRender')"
  >
    {{
      lineItem?.customRender({
        column: lineItem,
        index: index,
        record: dataItem,
        renderIndex: index,
        text: txt,
        value: dataItem[lineItem.key],
      })
    }}
  </div>
  <div
    v-else-if="
      !(lineItem.type === 'slot' || lineItem.type === 'slotOut') ||
      lineItem?.config?.isShowFindCodeName
    "
    :class="[
      'cell',
      {
        ellipsis: lineItem.ellipsis === false ? false : true,
      },
    ]"
    :style="{
      'text-align': `${lineItem.align || 'left'}`,
      ...lineItem?.mConfig?.style,
    }"
    :title="
      Object.prototype.hasOwnProperty.call(lineItem?.mConfig || {}, 'tooltip')
        ? typeof lineItem?.mConfig?.tooltip === 'function'
          ? lineItem?.mConfig?.tooltip(
              {
                rowIndex: index,
                field: lineItem,
                dataAt: dataItem,
                record: dataItem,
                value: dataItem[lineItem.key],
              },
              recordData,
              model
            )
          : lineItem?.mConfig?.tooltip
        : dataItem[lineItem.key]
    "
  >
    {{ dataItem[lineItem.key] }}
  </div>
</template>
<script setup lang="ts">
import { findCodeName } from '@/common/componentsFn'
import { typeOf } from '@/common/utils/traverseTree/index'
import { rowMsgType } from '@/common/componentsFn/propType/form'

const proxy = getCurrentInstance()?.proxy
const { model, extra, mapData, propName, data, keyId } = toRefs<any>(
  proxy?.$attrs
)
interface propIn {
  recordData?: any[]
  lineItem: any
  dataItem: any
  dataIndex: string | number
  index: string | number
  rowMsg?: rowMsgType
}
const props = withDefaults(defineProps<propIn>(), {
  recordData: () => [], // 数据
})
const { recordData, lineItem, dataItem, dataIndex, index, rowMsg } =
  toRefs(props)
function mapDataFn(dataIn: any) {
  const { mapData: mapDataScoped, name } = dataIn
  let scopedData: any = mapDataScoped
  name.forEach((key: any, indexS: any) => {
    if (indexS < name.length - 1) scopedData = scopedData?.[key]
  })
  return scopedData
}
function isCoreFn(isCoreData: any): boolean {
  const { mapData: mapDataScoped, field } = isCoreData
  if (!Object.prototype.hasOwnProperty.call(field, 'isCore')) {
    return (
      mapDataScoped &&
      Object.prototype.hasOwnProperty.call(mapDataScoped, keyId.value)
    )
  }
  if (typeOf(field.isCore) !== 'function') {
    return Boolean(field.isCore)
  }
  return Boolean(field.isCore(isCoreData))
}
const txt = ref<any>(dataItem.value[lineItem.value.key])
watchEffect(() => {
  findCodeName({
    field: lineItem.value,
    record: dataItem.value,
    division: lineItem?.value.division,
    index: index.value,
    model: model.value,
  }).then((res: any) => {
    txt.value = res
  })
})

defineExpose({
  findCodeName,
})
</script>

<style scoped lang="scss">
div:last-child {
  border-bottom: none !important;
}
.cell {
  width: 100%;
  white-space: pre-line;
}
// 翻译溢出隐藏
.ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
