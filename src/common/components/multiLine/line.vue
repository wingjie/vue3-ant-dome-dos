<template>
  <div class="lineBox">
    <template v-if="!header">
      <template v-for="(dataItem, dataIndex) in data" :key="dataIndex">
        <div
          v-if="
            dataIndex <
            (onOff === 'off' ? showCount || data.length : data.length)
          "
          class="row flex"
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
                'text-align': 'left',
                'word-break': 'break-all',
                'white-space': 'pre-line',
                'justify-content': `${lineItem.align || 'left'}`,
                ...lineItem?.mConfig?.style,
              }"
              :class="[
                'flex',
                'body',
                lineItem?.mConfig?.class,
                {
                  ellipsis: lineItem.ellipsis === false ? false : true,
                },
              ]"
              :title="
                Object.prototype.hasOwnProperty.call(dataItem, 'tooltip')
                  ? dataItem.tooltip
                  : dataItem[lineItem.key]
              "
            >
              {{ dataItem[lineItem.key] }}
            </div>
          </template>
          <template v-if="config[config.configData]">
            <Line
              :config="config[config.configData]"
              :data="dataItem[config.configData]"
              :showCount="showCount"
              :onOff="onOff"
              :header="header"
            />
          </template>
          <template v-if="config.after">
            <div
              v-for="(lineItem, index) in config.after"
              :key="index"
              :style="{
                padding: '0 5px',
                width: `${lineItem?.width || 200}px`,
                'text-align': 'left',
                'word-break': 'break-all',
                'white-space': 'pre-line',
                'justify-content': `${lineItem.align || 'left'}`,
                ...lineItem?.mConfig?.style,
              }"
              :class="[
                'flex',
                'body',
                lineItem?.mConfig?.class,
                {
                  ellipsis: lineItem.ellipsis === false ? false : true,
                },
              ]"
              :title="
                Object.prototype.hasOwnProperty.call(dataItem, 'tooltip')
                  ? dataItem.tooltip
                  : dataItem[lineItem.key]
              "
            >
              {{ dataItem[lineItem.key] }}
            </div>
          </template>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="row flex">
        <template v-if="config.before">
          <div
            v-for="(lineItem, index) in config.before"
            :key="index"
            :style="{
              height: `${lineItem.height}px`,
              width: `${lineItem.width || 200}px`,
              'text-align': 'center',
              'justify-content': `${lineItem.headerAlign || 'center'}`,
              'border-right':
                !config.content &&
                config.before.length !== 1 &&
                config.before.length - 1 === index
                  ? 'none'
                  : '1px solid #eee',
            }"
            :class="`flex header ${lineItem?.mConfig?.class}`"
          >
            {{ lineItem.title }}
          </div>
        </template>
        <template v-if="config[config.configData]">
          <Line
            :config="config[config.configData]"
            :showCount="showCount"
            :onOff="onOff"
            :header="header"
          />
        </template>
        <template v-if="config.after">
          <div
            v-for="(lineItem, index) in config.after"
            :key="index"
            :style="{
              height: `${lineItem.height}px`,
              width: `${lineItem.width || 200}px`,
              'text-align': 'center',
              'justify-content': `${lineItem.headerAlign || 'center'}`,
              'border-left':
                config.after.length !== 1 && config.after.length - 1 === 0
                  ? 'none'
                  : '1px solid #eee',
            }"
            :class="`flex header ${lineItem?.mConfig?.class}`"
          >
            {{ lineItem.title }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
interface propIn {
  data?: any[]
  config?: { [p: string]: any }
  showCount?: number | undefined
  onOff: string
  header?: any
}
const props = withDefaults(defineProps<propIn>(), {
  config: () => ({}), // 配置
  data: () => [], // 数据
  showCount: undefined, // 展示几条，不长用
  onOff: 'off', // 开关
  header: undefined, // 是否是表头
})
const { config, data, showCount, onOff, header } = toRefs(props)
</script>

<style scoped lang="scss">
.lineBox {
  flex-grow: 1;
  flex-shrink: 0;
}
.test {
  float: right;
  position: absolute;
  cursor: pointer;
  border-bottom: 1px solid blue;
  display: flex;
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
// 翻译溢出隐藏
.ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
