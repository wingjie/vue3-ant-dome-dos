<template>
  <a-config-provider :locale="zhCNR" :prefixCls="prefixCls">
    <a-layout class="app-body">
      <PageHeader v-if="isShowMenu" v-model:collapsed="collapsed" />
      <a-layout>
        <Sidebar v-if="isShowMenu" v-model:collapsed="collapsed" />
        <a-layout class="main">
          <AppMain />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import configTheme from '@/style/theme/theme'
import PageHeader from './components/Header/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'

const isShowMenu = ref(true)
const $store = useStore()
const zhCNR = ref(zhCN)
const prefixCls = computed(() => {
  const { theme } = $store.getters
  configTheme(theme)
  return theme
})

const collapsed = ref(true)

onMounted(() => {
  // eslint-disable-next-line no-underscore-dangle
  isShowMenu.value = !qiankunWindow.__POWERED_BY_QIANKUN__
})
</script>

<style scoped lang="scss">
.main {
  height: calc(100vh - #{$header-height});
  overflow: auto;
}
.app-body {
  height: 100%;
}
</style>
