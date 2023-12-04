<template>
  <div style="width: 100%; display: flex; flex-wrap: wrap">
    <div
      v-for="(field, index) in fieldList"
      :key="field.key"
      :class="['item', model?.class, field?.class]"
      :style="{ ...model?.style, ...field?.style }"
    >
      <slot
        v-if="field.type && field.type === 'slot'"
        :name="field.type"
        :field="field"
        :fieldList="fieldList"
        :data="data"
      ></slot>
      <template v-else>
        <span
          :class="[model?.labelClass, field?.labelClass]"
          :style="{ ...model?.labelStyle, ...field?.labelStyle }"
        >
          {{ field.label }}
        </span>
        <span
          :class="[model?.partClass, field?.partClass]"
          :style="{ ...model?.partStyle, ...field?.partStyle }"
        >
          {{ field.label ? ':' : '' }}
        </span>
        <IndexScoped
          :field="field"
          :record="data"
          :division="field?.division"
          :index="index"
          :model="model"
        ></IndexScoped>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import IndexScoped from './indexScoped.vue'

interface propIn {
  fieldList: { [p: string]: any }[]
  data: { [p: string]: any }
  model?: { [p: string]: any }
}
const props = withDefaults(defineProps<propIn>(), {
  fieldList: () => [],
  data: () => ({}),
  model: () => ({ style: { margin: '0 10px' } }),
})
const { fieldList, data, model } = toRefs(props)
// onMounted(() => {
//   if (Object.prototype.hasOwnProperty.call(model.value, 'async')) {
//     getPlainTableAttr(model.value, model.value.async)
//   }
// })
</script>
<style scoped lang=""></style>
