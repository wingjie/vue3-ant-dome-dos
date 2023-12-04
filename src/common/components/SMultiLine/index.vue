<template>
  <div>
    <Line
      v-bind="{ ...$attrs }"
      :config="field[field?.configData]"
      :showCount="showCount"
      :onOff="onOff"
      :header="header"
      :propName="[...($attrs?.propName || []), field?.configData]"
      :recordData="scope?.record?.[field?.configData]"
    >
      <!-- <template
        #out="{
          field,
          scope: { text, record, index },
          mapData,
          model,
          data,
          extra,
        }"
      >
        <slot
          v-if="field?.type === 'slot' || field?.type === 'slotOut'"
          :name="`${'out'}`"
          :scope="{
            text: text,
            record: record,
            index: index,
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
          scope: { text, record, index },
          mapData,
          model,
          data,
          extra,
        }"
      >
        <slot
          v-if="fieldIn?.type === 'slot' || fieldIn?.type === 'slotIn'"
          :name="`${fieldIn?.key}In`"
          :scope="{
            text: text,
            record: record,
            index: index,
          }"
          :mapData="mapData"
          :model="model"
          :data="data"
          :extra="extra"
          :field="fieldIn"
        ></slot>
      </template>
      <template #itemIn="{ data, model, scope: { text, record, index } }">
        <slot
          v-if="record?.type === 'slot' || record?.type === 'slotIn'"
          :name="`${record?.key}In`"
          :data="data"
          :model="model"
          :field="data.field"
          :scope="{
            text: text,
            record: record,
            index: index,
          }"
        />
      </template>
      <template #itemSlot="{ field: fieldSlot, model, data }">
        <slot
          v-if="fieldSlot?.config?.type === 'slot'"
          :name="`${fieldSlot?.key}${fieldSlot?.config?.key}In`"
          :data="data"
          :model="model"
          :field="fieldSlot"
        />
      </template> -->

      <template v-for="(value, name) of $slots" #[name]="slotData">
        <slot :name="name" v-bind="{ ...slotData }"></slot>
      </template>
    </Line>
    <span
      v-if="!header"
      style="
        position: absolute;
        right: -5px;
        top: 0px;
        cursor: pointer;
        font-size: 18px;
        color: #108de9;
      "
    >
      <slot
        name="icon"
        :method="{ open, close }"
        :onOff="onOff"
        :scope="scope"
        :field="field"
        v-bind="$attrs"
      >
        <template
          v-if="
            showIcon(
              scope?.record?.[field?.configData],
              field?.[field?.configData]
            ) && icon
          "
        >
          <i-tabler-chevrons-down v-if="onOff === 'off'" @click.stop="open" />
          <i-tabler-chevrons-up v-else @click.stop="close" />
        </template>
      </slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import Line from './line.vue'

const $slots: any = useSlots()

const $attrs: any = useAttrs()
const { scope, field } = toRefs<{ scope: any; field: any; [p: string]: any }>(
  reactive($attrs)
)
interface propIn {
  showCount?: number | undefined
  header?: any
  defaultOnOff?: boolean
  icon?: boolean
}
const props = withDefaults(defineProps<propIn>(), {
  showCount: 1, // 展示几行
  header: undefined,
  defaultOnOff: false,
  icon: true,
})
const { showCount, header, defaultOnOff } = toRefs(props)
function showIcon(data: any[], configs: { [x: string]: any }) {
  if (data?.length > 1) {
    return true
  }
  let bool = false
  const rowConfigs = configs?.[configs?.configData]
  data?.forEach((dataItem: any) => {
    const rowData = dataItem?.[configs.configData]
    bool = showIcon(rowData, rowConfigs)
  })
  return bool
}

const onOff = ref('off')
// ? 打开的方法
function open() {
  onOff.value = 'on'
}
// ? 关闭的方法
function close() {
  onOff.value = 'off'
}
if (defaultOnOff.value === true) {
  open()
}
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
}
div:last-child {
  border-bottom: none !important;
}
</style>
