<template>
  <a-layout-sider
    v-model:collapsed="collapsedVal"
    :trigger="null"
    class="sidebar"
    breakpoint="lg"
    collapsible
  >
    <AsideMenu />
  </a-layout-sider>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AsideMenu from './AsideMenu.vue'

interface propMsg {
  collapsed: boolean
}
const $emit = defineEmits(['update:collapsed'])
const prop = withDefaults(defineProps<propMsg>(), {
  collapsed: true,
})

const { collapsed } = toRefs(prop)
const collapsedVal = computed({
  get() {
    return collapsed.value
  },
  set(value) {
    $emit('update:collapsed', value)
  },
})
</script>

<style scoped lang="scss">
.sidebar {
  background: #fff;
}
</style>
