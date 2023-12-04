<template>
  <div class="sidebar-area">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="openKeys"
      mode="inline"
      @click="routePush"
    >
      <MenuItem :route-list="routeList" />
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// import { constantRoutes } from '@/router'
import routeListChildren from '@/router/module/readme.ts'

// import AsideMenuItem from './AsideMenuItem.vue'
import MenuItem from './MenuItem.vue'

console.log('constantRoutes', routeListChildren)

const $route = useRoute()
const $router = useRouter()
// const $store = useStore()

const openKeys = computed({
  get() {
    return $route.matched.map((item) => item.name)
  },
  set() {},
})

// const routeList = $store.state.user.permission.routes
const routeList = ref(routeListChildren.children)
// const routeList = ref(constantRoutes)

function routePush(e: any) {
  $router.push({ name: e.key })
}
</script>

<style scoped lang="scss">
.el-menu-item {
  justify-content: center;
  padding-left: 0 !important;
}
.sidebar-area {
  height: calc(100vh - $header-height);
  overflow-y: auto;
}
</style>
