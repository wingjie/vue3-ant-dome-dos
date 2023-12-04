<!--suppress HtmlUnknownAttribute -->
<template>
  <div class="sidebar-area">
    <a-menu
      class="sidebar-menu"
      :openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      @click="handleClick"
      :inlineIndent="12"
      @openChange="onOpenChange"
    >
      <a-sub-menu
        v-for="itemMenus in leftMenuList"
        :key="itemMenus.id"
        class="menu-item"
        popupClassName="menu-item"
        style="border-radius: 8px"
      >
        <template #icon>
          <span class="app-icon-area">
            <Icon v-if="isCustomIcon(itemMenus.icon)" :name="itemMenus.icon" />
            <template v-else>
              <SvgIcon
                :name="itemMenus.icon"
                class="app-icon default"
                font-size="16px"
              />
              <SvgIcon
                :name="itemMenus.icon + '-h'"
                class="app-icon hover"
                font-size="16px"
              />
            </template>
          </span>
        </template>
        <template #title>
          <span class="menus-first-title">{{ itemMenus?.name }}</span>
        </template>
        <template #expandIcon="data">
          <SvgIcon v-if="data.isOpen" name="arrow-up" class="arrow-icon" />
          <SvgIcon v-else name="arrow-default" class="arrow-icon" />
        </template>
        <AsideMenuItem :menuList="itemMenus.children" />
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import Icon from '@/common/components/Icon/index.vue'
import AsideMenuItem from './AsideMenuItem.vue'
// import { getUserStore } from '@/common/utils/globalStore/index.js'

const $store = useStore()
const $route = useRoute()
// const $router = useRouter()
const leftMenuList = computed(() => {
  // const authMenus = $store.getters.authMenus || []
  // return authMenus.filter((i: any) => i.name !== '基础平台')
  return $store.getters.authMenus || []
})
const isCustomIcon = (iconName: string) => iconName.includes(':')
const openKeys: any = computed({
  get() {
    return $store.getters.menuOpenKeys
  },
  set(value) {
    $store.commit('platform/setLeftMenusOpenKeys', value)
  },
})
// const selectedKeys = ref('')
const selectedKeys = computed({
  get() {
    const menuSelectedKey = cloneDeep($store.getters.menuSelectedKey)
    const matchIndex = menuSelectedKey.findIndex((i: any) => i.includes('#'))
    const { fullPath }: any = $route
    let path = fullPath
    const paramIndex = fullPath.indexOf('?')
    if (paramIndex > -1) {
      path = fullPath.substring(0, paramIndex)
    }
    if (matchIndex > -1) menuSelectedKey[matchIndex] = path
    return menuSelectedKey
  },
  set(value) {
    $store.commit('platform/setMenusSelectKey', value)
  },
})

onMounted(() => {
  $store.dispatch('user/getUserInfo')
})

function handleClick() {}
const rootSubmenuKeys: any = computed(() => {
  const menu = $store.getters.authMenus
  return menu.map((i: any) => i.id)
})
const onOpenChange = (opk: string[]) => {
  const latestOpenKey = opk.find((key) => openKeys.value.indexOf(key) === -1)
  if (rootSubmenuKeys.value.indexOf(latestOpenKey!) === -1) {
    openKeys.value = opk
  } else {
    openKeys.value = latestOpenKey ? [latestOpenKey] : []
  }
}
</script>

<style scoped lang="scss">
.el-menu-item {
  justify-content: center;
  padding-left: 0 !important;
}
</style>
<style lang="scss">
@import './style.scss';
</style>
