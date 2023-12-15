<template>
  <div
    :class="{
      cite_type:
        ['object', 'array'].includes(item.type) ||
        item.type.includes('object') ||
        item.type.includes('array'),
    }"
  >
    <!-- {{ formData }} -->
    <a-row class="row" v-if="formData">
      <template v-for="column in config.column" :key="column.key">
        <a-col
          v-if="column.key === 'nature' && column.show"
          :span="column.span"
          class="cell"
          style="justify-content: flex-start"
        >
          <div class="icon">
            <template
              v-if="
                !(
                  item.type !== 'object' &&
                  !item.type.includes('object') &&
                  item.type !== 'array' &&
                  !item.type.includes('array')
                )
              "
            >
              <Icons
                :font-size="20"
                class="active"
                v-if="!isClose"
                @click="isClose = !isClose"
                icon="icon-default"
              ></Icons>
              <Icons
                v-else
                :font-size="20"
                class="active"
                @click="isClose = !isClose"
                icon="icon-down"
              ></Icons>
            </template>
          </div>
          {{ rowKey }}
        </a-col>
        <a-col
          v-if="column.key === 'required' && column.show"
          :span="column.span"
          class="cell"
        >
          <span
            v-if="
              true ||
              (item.type !== 'object' &&
                !item.type.includes('object') &&
                item.type !== 'array' &&
                !item.type.includes('array'))
            "
          >
            {{ isRequired(rowKey, jsonSchema.required) ? '是' : '否' }}
            <slot :rowKey="rowKey" name="none"></slot>
          </span>
        </a-col>
        <a-col
          v-if="column.key === 'nullable' && column.show"
          :span="column.span"
          class="cell"
        >
          <HandleCol
            :json-schema="{
              ...item,
              isRequired: isRequired(rowKey, jsonSchema.required),
            }"
            :rowKey="rowKey"
            :formData="formData[rowKey]"
            :formDataFather="formData"
            @changeData="changeDataFn"
            @isNoneFn="isNoneFn"
            :name="[...name, rowKey]"
            :disabled="disabled"
          ></HandleCol>
        </a-col>
        <a-col
          v-if="column.key === 'type' && column.show"
          :span="column.span"
          class="cell"
        >
          <span v-if="typeof item.type === 'string'">
            {{ item.type }}
          </span>
          <span v-else-if="Array.isArray(item.type)">
            {{ item.type.filter((e: any) => e !== 'null').toString() }}
          </span>
        </a-col>
        <a-col
          v-if="column.key === 'value' && column.show"
          :span="column.span"
          class="cell"
        >
          <template
            v-if="Object.prototype.hasOwnProperty.call(formData, rowKey)"
          >
            <FormItemVue
              v-if="
                item.type !== 'object' &&
                !item.type.includes('object') &&
                item.type !== 'array' &&
                !item.type.includes('array')
              "
              :json-schema="{
                ...item,
                isRequired: isRequired(rowKey, jsonSchema.required),
              }"
              :formData="formData[rowKey]"
              @changeData="changeDataFn"
              :name="[...name, rowKey]"
              :disabled="disabled"
            ></FormItemVue>
            <div
              v-else-if="!disabled"
              class="cell"
              style="width: 100%; justify-content: center"
            >
              <a-tooltip>
                <template #title>添加子元素</template>
                <Icons
                  v-if="
                    item.type === 'array' ||
                    (item.type?.includes('array') && formData[rowKey])
                  "
                  class="icon-box"
                  icon="pure-add"
                  style="color: #999"
                  @click="
                    emit('add', {
                      column,
                      rowKey,
                      name: [...name, rowKey],
                      jsonSchema:
                        jsonSchema.properties?.[rowKey] || jsonSchema.items,
                    })
                  "
                />
              </a-tooltip>
            </div>
          </template>
          <div v-else style="color: #ccc">此字段已经被缺省</div>
        </a-col>
        <a-col
          v-if="column.key === 'operation' && column.show"
          :span="column.span"
          class="cell"
        >
          <a-space
            class="cell"
            v-if="
              (jsonSchema.type === 'array' ||
                jsonSchema.type?.includes('array')) &&
              !disabled
            "
          >
            <a-tooltip>
              <template #title>添加邻元素</template>
              <Icons
                class="icon-box"
                icon="pure-add"
                style="color: #999"
                @click="
                  emit('addRow', {
                    column,
                    rowKey,
                    name: [...name, rowKey],
                    jsonSchema: jsonSchema,
                  })
                "
              />
            </a-tooltip>
            <Icons
              class="icon-box color"
              icon="pure-minus"
              style="color: orangered"
              @click="
                emit('delRow', {
                  column,
                  rowKey,
                  name: [...name, rowKey],
                  jsonSchema: jsonSchema,
                })
              "
            />
          </a-space>
          <!-- {{ jsonSchema.properties[rowKey].type }} -->
        </a-col>
      </template>
    </a-row>
    <slot name="default" :isClose="isClose"></slot>
  </div>
</template>
<script setup lang="ts">
import HandleCol from './handleCol.vue'
import { isRequired } from './utils'
import FormItemVue from './formJson/index.vue'

interface propMsg {
  formData: any
  jsonSchema: {
    [p: string]: any
  }
  config: {
    column: { title: string; span: number; key: string; show: boolean }[]
  }
  name: (string | number)[]
  rowItem: any
  rowKey: string | number
  disabled: boolean
}
const emit = defineEmits([
  'update:modelValue',
  'changeData',
  'isNoneFn',
  'add',
  'addRow',
  'delRow',
])
const props = withDefaults(defineProps<propMsg>(), { disabled: false })
const {
  config,
  jsonSchema,
  rowItem: item,
  rowKey,
  formData,
  disabled,
} = toRefs(props)
// const formData = useVModel(props, 'modelValue', emit)

const isClose = ref(true)

function changeDataFn(val: any) {
  emit('changeData', val)
}
function isNoneFn(bool: boolean, key: string) {
  emit('isNoneFn', bool, key)
}
</script>
<style scoped lang="scss">
.cite_type {
  border-radius: 8px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 0px solid #ccc;
}
.row {
  border-radius: 8px;
  background-color: #f5f7f9;
  &:hover {
    background-color: #e6eff7;
  }
}
.cell {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
}

.icon-box {
  width: 20px;
  height: 20px;
  box-sizing: content-box;
  border-radius: 8px;
  border: 1.5px solid #bbcedf;
  &:hover {
    background: #e7f0f8;
  }
}
.color {
  border: 1.5px solid #ff8080;
  &:hover {
    background: #ffd1d1;
  }
}
.icon {
  width: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .active {
    cursor: pointer;
  }
}
</style>
