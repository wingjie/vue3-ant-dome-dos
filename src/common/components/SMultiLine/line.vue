<template>
  <div class="lineBox">
    <template v-if="!header">
      <template v-for="(dataItem, dataIndex) in recordData" :key="dataIndex">
        <div
          v-if="
            dataIndex <
            (onOff === 'off'
              ? showCount || recordData.length
              : recordData.length)
          "
          class="flex row"
          :style="{
            'text-align': 'center',
            'border-bottom': `${config.borderWidth || 1}px ${
              config.borderStyle || 'solid'
            } ${config.borderColor || '#eee'}`,
          }"
        >
          <template v-if="config.before">
            <div
              v-for="(lineItem, index) in config.before"
              :key="index"
              :style="{
                padding: '0 5px',
                width: `${lineItem?.width || 200}px`,
                'justify-content': `${lineItem.align || 'left'} `,
              }"
              :class="[
                'flex',
                'body',
                lineItem?.mConfig?.class,
                {
                  ellipsis: lineItem.ellipsis === false ? false : true,
                },
              ]"
            >
              <LineScoped
                v-bind="{ ...proxy?.$attrs }"
                :recordData="recordData"
                :lineItem="lineItem"
                :dataItem="dataItem"
                :dataIndex="dataIndex"
                :index="index"
                :rowMsg="creakRowMsg(dataItem)"
              >
                <!-- <template
                  #out="{
                    field,
                    scope: { text, record, index: Index },
                    mapData,
                    model,
                    data,
                    extra,
                  }"
                >
                  <slot
                    v-if="field?.type === 'slot' || field?.type === 'slotOut'"
                    name="out"
                    :scope="{
                      text: text,
                      record: record,
                      index: Index,
                    }"
                    :mapData="mapData"
                    :model="model"
                    :data="data"
                    :extra="extra"
                    :field="field"
                  />
                </template>
                <template
                  #in="{
                    field: fieldIn,
                    scope: { text, record, index: Index },
                    mapData,
                    model,
                    data,
                    extra,
                  }"
                >
                  <slot
                    v-if="
                      fieldIn?.type === 'slot' || fieldIn?.type === 'slotIn'
                    "
                    name="in"
                    :scope="{
                      text: text,
                      record: record,
                      index: Index,
                    }"
                    :mapData="mapData"
                    :model="model"
                    :data="data"
                    :extra="extra"
                    :field="fieldIn"
                  ></slot>
                </template>
                <template
                  #itemIn="{
                    data,
                    model,
                    scope: { text, record, index: Index },
                  }"
                >
                  <slot
                    v-if="record?.type === 'slot' || record?.type === 'slotIn'"
                    name="itemIn"
                    :data="data"
                    :model="model"
                    :field="data.field"
                    :scope="{
                      text: text,
                      record: record,
                      index: Index,
                    }"
                  />
                </template>
                <template #itemSlot="{ field: fieldSlot, model, data }">
                  <slot
                    v-if="fieldSlot?.config?.type === 'slot'"
                    name="`itemSlot`"
                    :data="data"
                    :model="model"
                    :field="fieldSlot"
                  />
                </template> -->
                <template v-for="(value, name) of $slots" #[name]="slotData">
                  <slot :name="name" v-bind="{ ...slotData }"></slot>
                </template>
              </LineScoped>
            </div>
          </template>
          <template v-if="config[config.configData]">
            <div
              class="lineBox"
              :style="{
                width: config[config.configData]?.width
                  ? `${config[config.configData]?.width}px`
                  : 'auto',
              }"
            >
              <Line
                v-bind="proxy?.$attrs"
                :config="config[config.configData]"
                :recordData="dataItem[config.configData]"
                :showCount="showCount"
                :onOff="onOff"
                :header="header"
                :propName="[...propName, dataIndex, config.configData]"
              />
            </div>
          </template>
          <template v-if="config.after">
            <div
              v-for="(lineItem, index) in config.after"
              :key="index"
              :style="{
                padding: '0 5px',
                width: `${lineItem?.width || 200}px`,
                'justify-content': `${lineItem.align || 'left'} `,
              }"
              :class="[
                'flex',
                'body',
                lineItem?.mConfig?.class,
                {
                  ellipsis: lineItem.ellipsis === false ? false : true,
                },
                ,
              ]"
            >
              <LineScoped
                v-bind="{ ...proxy?.$attrs }"
                :recordData="recordData"
                :lineItem="lineItem"
                :dataItem="dataItem"
                :dataIndex="dataIndex"
                :index="index"
                :rowMsg="creakRowMsg(dataItem)"
              >
                <template v-for="(value, name) of $slots" #[name]="slotData">
                  <slot :name="name" v-bind="{ ...slotData }"></slot>
                </template>
              </LineScoped>
            </div>
          </template>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="flex row">
        <template v-if="config.before">
          <div
            v-for="(lineItem, index) in config.before"
            :key="index"
            :style="{
              height: `${lineItem?.height}px`,
              width: `${lineItem?.width || 200}px`,
              'text-align': 'center',
              'justify-content': `${lineItem.headerAlign || 'center'}`,
              'border-right':
                !config.content &&
                config.before.length !== 1 &&
                config.before.length - 1 === index
                  ? 'none'
                  : '1px solid #eee',
            }"
            :class="['flex', 'header', lineItem?.mConfig?.class]"
          >
            {{ lineItem?.title }}
          </div>
        </template>
        <template v-if="config[config.configData]">
          <Line
            v-bind="proxy?.$attrs"
            :config="config[config.configData]"
            :showCount="showCount"
            :onOff="onOff"
            :header="header"
            :propName="[...propName, config.configData]"
          />
        </template>
        <template v-if="config.after">
          <div
            v-for="(lineItem, index) in config.after"
            :key="index"
            :style="{
              height: `${lineItem?.height}px`,
              width: `${lineItem?.width || 200}px`,
              'text-align': 'center',
              'justify-content': `${lineItem.headerAlign || 'center'}`,
              'border-left':
                config.after.length !== 1 && config.after.length - 1 === 0
                  ? 'none'
                  : '1px solid #eee',
            }"
            :class="`flex header ${lineItem?.mConfig?.class}`"
          >
            {{ lineItem?.title }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { findCodeName } from '@/common/componentsFn'
import LineScoped from './lineScoped.vue'

const proxy = getCurrentInstance()?.proxy
const { propName } = toRefs<any>(proxy?.$attrs)
interface propIn {
  recordData?: any[]
  config?: { [p: string]: any }
  showCount?: number | undefined
  onOff: string
  header?: any
}
const props = withDefaults(defineProps<propIn>(), {
  config: () => ({}), // 配置
  recordData: () => [], // 数据
  showCount: undefined, // 展示几条，不长用
  onOff: 'off', // 开关
  header: undefined, // 是否是表头
})
const { config, recordData, showCount, onOff, header } = toRefs(props)
// function mapDataFn(dataIn: any) {
//   const { mapData: mapDataScoped, name } = dataIn
//   let scopedData: any = mapDataScoped
//   name.forEach((key: any, index: any) => {
//     if (index < name.length - 1) scopedData = scopedData?.[key]
//   })
//   return scopedData
// }
// function isCoreFn(isCoreData: any): boolean {
//   const { mapData: mapDataScoped, rowData, modelData, field } = isCoreData
//   if (!Object.prototype.hasOwnProperty.call(field, 'isCore')) {
//     return (
//       mapDataScoped &&
//       Object.prototype.hasOwnProperty.call(
//         mapDataScoped,
//         rowData?.[modelData?.tableAttr?.rowKey]
//       )
//     )
//   }
//   if (typeOf(field.isCore) !== 'function') {
//     return Boolean(field.isCore)
//   }
//   return Boolean(field.isCore(isCoreData))
// }
const weakMap = new WeakMap()
function creakRowMsg(record: any) {
  const rowMsg = reactive({
    options: {},
    unit: {},
  })
  if (!weakMap.has(record)) {
    weakMap.set(record, rowMsg)
    return rowMsg
  }
  return weakMap.get(record)
}
defineExpose({
  findCodeName,
})
</script>

<style scoped lang="scss">
.lineBox {
  flex-grow: 1;
  flex-shrink: 0;
}
.flex {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex-grow: 1;
  flex-shrink: 0;
}
.flex.header {
  white-space: inherit;
  // word-break: break-all;
}
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
