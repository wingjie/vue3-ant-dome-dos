<template>
  <div
    :title="
      Object.prototype.hasOwnProperty.call(field?.config || {}, 'tooltip')
        ? typeof field?.config?.tooltip === 'function'
          ? field?.config?.tooltip(
              {
                rowIndex: rowIndex,
                field,
                dataAt: record,
                record,
                value: record[field.key],
              },
              formData,
              modelData
            )
          : field?.config?.tooltip
        : unit.label
    "
  >
    <a-form-item
      v-if="configScoped.type !== 'slotOut' && configScoped.isForm === true"
      v-bind="{ ...field.formItemAttr }"
      :class="{
        trim:
          Boolean(field.formItemAttr?.label) &&
          !Boolean(field.formItemAttr?.label?.trim?.()),
      }"
      :name="isCore ? [...(name ? name : []), field.key] : []"
    >
      <template v-if="showPart?.includes('core')">
        <template v-if="configScoped.type && configScoped.type !== 'slot'">
          <component
            v-if="field?.config?.customRender"
            :is="customRenderComponent?.[0] || customRenderComponent"
            :modelValue="record[field.key]"
            @update:checked="emit"
            @update:value="emit"
            @update:modelValue="emit"
            @sChange="change"
            @sChangeB="changeB"
            @sBlur="blur"
            @sBlurB="blurB"
            @keyup="keyup"
            v-bind="{
              ...(customRenderComponent?.[1] ? customRenderComponent?.[1] : {}),
              ...$attrs,
              placeholder: `请填写${field.label || field.title}`,
              [['radio', 'switch', 'checkbox'].includes(configScoped.type)
                ? 'checked'
                : 'value']: record[field.key],
              'allow-clear': true,
              ...field.config,
              [field?.config?.options ? 'options' : '']: optionsScoped,
              disabled:
                typeof field.disabled === 'function'
                  ? Boolean(
                      field.disabled(
                        {
                          rowIndex: rowIndex,
                          field,
                          dataAt: record,
                          record,
                          value: record[field.key],
                        },
                        formData,
                        modelData
                      )
                    )
                  : Boolean(field.disabled) || field.disabled,
              ...$attrs?.entryAttr,
            }"
          ></component>
          <Shell
            v-else
            :tag="`a-${configScoped.type}`"
            v-bind="{
              ...$attrs,
              placeholder: `请填写${field.label || field.title}`,
              [['radio', 'switch', 'checkbox'].includes(configScoped.type)
                ? 'checked'
                : 'value']: record[field.key],
              'allow-clear': true,
              ...field.config,
              [field?.config?.options ? 'options' : '']: optionsScoped,
              disabled:
                typeof field.disabled === 'function'
                  ? Boolean(
                      field.disabled(
                        {
                          rowIndex: rowIndex,
                          field,
                          dataAt: record,
                          record,
                          value: record[field.key],
                        },
                        formData,
                        modelData
                      )
                    )
                  : Boolean(field.disabled) || field.disabled,
              ...$attrs?.entryAttr,
            }"
            @update:checked="emit"
            @update:value="emit"
            @change="change"
            @blur="blur"
            @dropdownVisibleChange="dropdownVisibleChange"
            @keyup="keyup"
          >
            <template v-if="field?.type === 'select'" #suffixIcon>
              <slot name="suffixIcon">
                <div class="select-icon">
                  <Icons
                    icon="arrow-default"
                    class="select-icon-arrow-default"
                    :font-size="12"
                  ></Icons>
                </div>
              </slot>
            </template>
            <template
              v-if="
                ['select', 'checkbox-group', 'radio-group'].includes(
                  configScoped.type
                ) &&
                !(field?.config?.$type || field?.config?.type) &&
                !field?.config?.options
              "
            >
              <Shell
                v-for="(optionItem, indexOp) in optionsScoped"
                :key="indexOp"
                :tag="tagType && tagType(configScoped.type)"
                v-bind="{
                  value: optionItem.value,
                  label: optionItem.label,
                  ...field?.config?.config,
                }"
                :disabled="
                  typeof field?.config?.config?.disabled === 'function'
                    ? Boolean(
                        field?.config?.config?.disabled(
                          { index: indexOp, item: optionItem },
                          {
                            field: field,
                            dataAt: record,
                            record,
                            rowIndex: rowIndex,
                            extra: extra,
                          }
                        )
                      )
                    : Boolean(optionItem.disabled) || optionItem.disabled
                "
              >
                <span :title="optionItem.label || ''">
                  {{ optionItem.label || '' }}
                </span>
              </Shell>
            </template>
            <template v-else-if="field?.config?.$type || field?.config?.type">
              <Shell
                v-if="
                  !(
                    field?.config?.$type === 'slot' ||
                    field?.config?.type === 'slot'
                  )
                "
                :tag="`a-${field?.config?.$type || field?.config?.type}`"
                v-bind="{
                  ...field?.config?.config,
                }"
              />
              <slot
                v-if="
                  field?.config?.$type === 'slot' ||
                  field?.config?.type === 'slot'
                "
                name="itemSlot"
                :data="record"
                :model="modelData"
                :field="field"
              />
            </template>
            <span
              v-else-if="['checkbox'].includes(field.type)"
              style="color: #888888; font-size: 12px"
              >{{ field?.label || field?.title }}</span
            >
          </Shell>
        </template>
      </template>
      <!-- field?.config?.isShowFindCodeName -->
      <div
        v-else-if="showPart === 'label'"
        :class="{ ellipsis: field.ellipsis, cell: true }"
        :title="
          Object.prototype.hasOwnProperty.call(field, 'tooltip')
            ? field.tooltip
            : unit.label
        "
      >
        <component
          v-if="field?.config?.customRender"
          :is="customRenderComponent?.[0] || customRenderComponent"
          :modelValue="record[field.key]"
          @update:checked="emit"
          @update:value="emit"
          @update:modelValue="emit"
          @sChange="change"
          @sChangeB="changeB"
          @sBlur="blur"
          @sBlurB="blurB"
          @keyup="keyup"
          v-bind="{
            ...(customRenderComponent?.[1] ? customRenderComponent?.[1] : {}),
            ...$attrs,
            placeholder: `请填写${field.label || field.title}`,
            [['radio', 'switch', 'checkbox'].includes(configScoped.type)
              ? 'checked'
              : 'value']: record[field.key],
            'allow-clear': true,
            ...field.config,
            [field?.config?.options ? 'options' : '']: optionsScoped,
            disabled:
              typeof field.disabled === 'function'
                ? Boolean(
                    field.disabled(
                      {
                        rowIndex: rowIndex,
                        field,
                        dataAt: record,
                        record,
                        value: record[field.key],
                      },
                      formData,
                      modelData
                    )
                  )
                : Boolean(field.disabled) || field.disabled,
            ...$attrs?.entryAttr,
          }"
        ></component>
        <span v-else>
          {{ unit.label }}
        </span>
      </div>
      <slot
        v-if="showPart?.includes('slot')"
        name="itemIn"
        :data="record"
        :model="modelData"
        :field="field"
      />
    </a-form-item>
    <div
      v-if="showPart === 'isJust'"
      :class="{ ellipsis: field.ellipsis }"
      :title="
        Object.prototype.hasOwnProperty.call(field, 'tooltip')
          ? field.tooltip
          : unit.label
      "
    >
      {{ unit.label }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import { Form } from 'ant-design-vue'
import { provide } from 'vue'
import Shell from '@/common/components/Shell'
import {
  // typeOf,
  // findCodeName,
  optionFn,
  findCodeItem as findCodeItemPublic,
} from '../../componentsFn'
import {
  fieldListType,
  formModelType,
  CustomRequired,
} from '@/common/componentsFn/propType'

import { rowMsgType } from '@/common/componentsFn/propType/form'

const formItemContext = Form.useInjectFormItemContext()
const { onFieldChange, onFieldBlur } = formItemContext

const $attrs: any = useAttrs()

interface propMsg {
  modelData?: formModelType
  field: CustomRequired<fieldListType, 'type'>
  name?: (string | number)[]
  // 下标
  rowIndex?: number | undefined
  // 数据
  mapData?: {
    [P: string]: any
  }
  rowData: {
    [P: string]: any
  }
  formData?: [P: string][] | { [P: string]: any }
  isCore?: boolean
  extra?: any
  rowMsg?: rowMsgType
}
// const $emit = defineEmits(['change', 'dropdownVisibleChange'])
const props = withDefaults(defineProps<propMsg>(), {
  mapData: () => ({}),
  rowData: () => ({}),
  isCore: true,
  formData: () => [],
  name: () => [],
  field: () => ({ key: 'id', type: 'input' }),
  modelData: () => ({}),
  extra: () => ({}),
})
const {
  modelData,
  field,
  rowIndex,
  mapData,
  rowData,
  name,
  formData,
  extra,
  isCore,
  rowMsg,
} = toRefs(props)
const record = computed(() => {
  if (isCore.value) {
    return mapData.value
  }
  return rowData.value
})
function emit(value: any) {
  if (isCore.value) {
    if ($attrs?.['onUpdate:mapData']) {
      $attrs?.['onUpdate:mapData']({
        ...mapData.value,
        [field.value.key]: value,
      })
      return
    }
    mapData.value[field.value.key] = value
    return
  }
  if ($attrs?.['onUpdate:rowData']) {
    $attrs?.['onUpdate:rowData']({
      ...rowData.value,
      [field.value.key]: value,
    })
    return
  }
  rowData.value[field.value.key] = value
}
const unit = ref<any>({ label: record.value[field.value.key], cursorDic: [] })
// todo 动态处理下拉列表数据
const optionsScoped = ref<any>([])
// ! 代码块 /////
const configScoped = reactive<any>({
  isShowFindCodeName: field.value?.config?.isShowFindCodeName,
  options: optionsScoped,
  isForm: field.value.isForm,
  type: field.value.type,
})
watch(
  () => field.value.type,
  (val) => {
    configScoped.type = val
  }
)
watch(
  () => field.value.isForm,
  (val) => {
    configScoped.isForm = val
  }
)
watch(
  () => field.value?.config?.isShowFindCodeName,
  (val) => {
    configScoped.isShowFindCodeName = val
  }
)
// ! 代码块结束 /////
watchEffect(() => {
  findCodeItem(record.value[field.value.key], optionsScoped).then(
    (unitRes: any) => {
      unit.value = unitRes
      if (rowMsg && rowMsg.value) {
        rowMsg.value.unit[field.value.key] = unitRes
      }
    }
  )
})

onMounted(() => {
  watchHandle()
})
function watchHandle() {
  // 浅只读
  const SR = shallowReadonly(
    reactive({
      rowIndex,
      field,
      record,
      value: computed(() => record.value[field.value.key]),
      extra: readonly(extra),
      options: readonly(optionsScoped),
      rowMsg,
    })
  )
  // 直接可以修改的
  const direct = reactive({
    value: computed({
      get() {
        return record.value[field.value.key]
      },
      set(val: any) {
        record.value[field.value.key] = val
      },
    }),
    extra,
    options: optionsScoped,
    config: configScoped,
  })
  if (field.value?.config?.watchScoped) {
    field.value?.config?.watchScoped(SR, direct)
  }
}

// todo 下列列表数据结束

// ? 参数配置 ////////////////
// options的计算属性
watchEffect(() => {
  optionFn({
    model: modelData.value,
    name: name.value,
    field: field.value,
    record: record.value,
    index: rowIndex?.value,
    optionsScoped: [], // todo 这里确实需要是一个空数组，因为这里是获取静态的option数据，如果不传空则为动态了，从而造成页面异常
    rowMsg: rowMsg?.value,
  }).then((list: any) => {
    optionsScoped.value = list.value
    if (rowMsg && rowMsg.value) {
      rowMsg.value.options[field.value.key] = optionsScoped.value
    }
  })
})
function getData() {
  return cloneDeep(record.value)
}
function tagType(Ftype: string): string {
  if (Ftype === 'select') {
    return 'a-select-option'
  }
  if (Ftype === 'checkbox-group') {
    return 'a-checkbox'
  }
  if (Ftype === 'radio-group') {
    return 'a-radio'
  }
  return 'a-input'
}
// 暴露函数====> 通过值找对应的value项
function findCodeItem(value: string | any[], options: any[]) {
  return findCodeItemPublic(
    {
      value,
      field: field.value,
      record: record.value,
      index: rowIndex?.value,
      model: modelData.value,
      optionsScoped: optionsScoped.value,
      rowMsg: rowMsg?.value,
    },
    options
  )
}
function judgeBackValue(e: any, event?: any) {
  let value
  if (
    ['select', 'switch', 'input-number', 'date-picker'].includes(
      field.value.type
    )
  ) {
    value = e
  } else if (['textarea', 'input'].includes(field.value.type)) {
    value = e.target.value
  } else if (['radio', 'checkbox'].includes(field.value.type)) {
    value = e.target.checked
  } else if (['time-picker'].includes(field.value.type)) {
    // 时间
    value = event
  } else {
    value = e?.target?.value
  }
  return value
}
function changeB(arg: Event) {
  change(arg)
  nextTick(() => {
    onFieldChange()
  })
}
function blurB(e: any) {
  change(e)
  nextTick(() => {
    onFieldBlur()
  })
}
function change(...arg: Event[]) {
  const [e, event] = arg
  const value = judgeBackValue(e, event)
  if (field.value?.config?.change) {
    findCodeItem(value, optionsScoped).then((res: any) => {
      field.value?.config?.change?.({
        e,
        value,
        field: field.value,
        unit: res.cursorDic,
        label: res.label,
        dataAt: record.value,
        record: record.value,
        rowIndex: rowIndex?.value,
        extra: extra.value,
      })
    })
  }
}
function keyup(e: any) {
  if (e.target.localName === 'textarea') {
    return
  }
  const value = judgeBackValue(e)
  if (e.code === 'Enter') {
    if (
      ['input', 'textarea'].includes(field.value.type) &&
      field.value?.config?.trim === true
    ) {
      emit(value.trim())
    }
  }
  if (field.value?.config?.keyup) {
    findCodeItem(value, optionsScoped).then((res: any) => {
      field.value?.config?.keyup?.({
        e,
        value,
        field: field.value,
        unit: res.cursorDic,
        label: res.label,
        dataAt: record.value,
        record: record.value,
        rowIndex: rowIndex?.value,
        extra: extra.value,
      })
    })
  }
}
function blur(e: any) {
  const value = judgeBackValue(e)
  if (
    ['input', 'textarea'].includes(field.value.type) &&
    field.value?.config?.trim === true
  ) {
    emit(value?.trim())
  }
  if (field.value?.config?.blur) {
    findCodeItem(value, optionsScoped).then((res: any) => {
      field.value?.config?.blur?.({
        e,
        value,
        field: field.value,
        unit: res.cursorDic,
        label: res.label,
        dataAt: record.value,
        record: record.value,
        rowIndex: rowIndex?.value,
        extra: extra.value,
      })
    })
  }
}
function dropdownVisibleChange(status: boolean) {
  // $emit('dropdownVisibleChange', { status, field.value, record })
  if (field.value?.config?.dropdownVisibleChange) {
    field.value?.config?.dropdownVisibleChange({
      status,
      field: field.value,
      dataAt: record.value,
      record: record.value,
      rowIndex: rowIndex?.value,
      extra: extra.value,
    })
  }
}
const customRenderComponent = computed(() => {
  const data = {
    rowIndex: rowIndex?.value,
    field: field?.value,
    record: record?.value,
    value: record?.value[field?.value.key],
  }
  return typeof field.value?.config?.customRender === 'function'
    ? field.value?.config?.customRender(data, formData.value, modelData.value)
    : field.value.config.customRender
})

const showPart = computed(() => {
  if (configScoped.type !== 'slotOut' && configScoped.isForm === true) {
    if (
      field.value.isForm === true &&
      isCore.value &&
      field.value?.config?.isCore &&
      configScoped.isShowFindCodeName !== 'isJust'
    ) {
      return 'core_slot'
    }
    if (configScoped.type !== 'slot' && configScoped.isShowFindCodeName) {
      return 'label'
    }
    if (configScoped.type && configScoped.type === 'slot') {
      return 'slot'
    }
  }
  if (field.value.isForm === 'isJust') {
    return 'isJust'
  }
})
provide('showPart', showPart)
provide('field', field)
provide('isCore', isCore)
provide('dropdownVisibleChange', dropdownVisibleChange)
provide('blur', blur)
provide('change', change)
provide('tagType', tagType)

defineExpose({
  getData,
  findCodeItem,
  rowMsg,

  // dropdownVisibleChange,
  // blur,
  // change,
})
</script>
<style scoped lang="scss">
// .ant-form-item {
//   justify-content: flex-end;
// }
div[class*='form-item-control-input-content'] > div {
  width: 100%;
  min-height: 36px;
  display: flex;
  align-items: center;
}
.ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cell {
  background-color: #fbfdfe;
  padding: 0px 8px;
  border-radius: 8px;
}
:deep(div.trim > div[class*='form-item-label'] > label::after) {
  content: '';
}
.select-icon {
  position: relative;
  width: 12px;
  height: 12px;
  .select-icon-arrow-default {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-25%, -25%);
    color: #bbcedf;
  }
}
</style>
