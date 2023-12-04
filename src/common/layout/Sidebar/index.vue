<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    class="sidebar"
    breakpoint="lg"
    collapsible
    :width="variables.sidebarOpenWidth"
    :collapsedWidth="variables.sidebarCloseWidth"
  >
    <AuthSidebar v-if="isShowAuthMenus" />
    <NormalMenu v-else />
  </a-layout-sider>
</template>

<script setup lang="ts">
import AuthSidebar from './AuthSidebar/AsideMenu.vue'
import NormalMenu from './NormalSidebar/AsideMenu.vue'

const $store = useStore()
const isShowAuthMenus = ref(!import.meta.env.VITE_SKIP_AUTH)
const collapsed = computed({
  get() {
    return $store.getters.sidebarOpen
  },
  set() {
    $store.commit('app/collapsedSidebar')
  },
})
const variables = reactive({
  sidebarOpenWidth: 244,
  sidebarCloseWidth: 66,
})
</script>

<style scoped lang="scss">
.sidebar {
  height: calc(100vh - #{$header-height});
  width: $sidebar-open-width;
  overflow-y: auto;
  background: #fbfdfe;
  padding: 0;
}
</style>
