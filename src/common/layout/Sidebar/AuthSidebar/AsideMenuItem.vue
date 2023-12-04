<!--suppress HtmlUnknownAttribute -->
<template>
  <div class="sidebar-sub">
    <template v-for="routeItem in childrenList">
      <a-menu-item
        v-if="routeItem.children?.length === 0"
        :key="routeItem.id"
        @click="goRouter(routeItem)"
      >
        <span v-if="routeItem?.name.length <= 8" class="inner">
          <span class="inner-title">{{ routeItem?.name }}</span>
        </span>
        <a-tooltip v-else :title="routeItem?.name">
          <span class="inner">
            <span class="inner-title">{{ routeItem?.name }}</span>
          </span>
        </a-tooltip>
      </a-menu-item>
      <template v-else>
        <a-sub-menu :key="routeItem.id" @titleClick="titleClick">
          <template #title>
            <span v-if="routeItem?.name.length <= 8" class="inner">
              <span class="inner-title">{{ routeItem?.name }}</span>
            </span>
            <a-tooltip v-else :title="routeItem?.name">
              <span class="inner">
                <span class="inner-title">{{ routeItem?.name }}</span>
              </span>
            </a-tooltip>
          </template>
          <template #expandIcon="{ isOpen }">
            <div class="icons">
              <SvgIcon v-if="isOpen" name="arrow-up" class="arrow-icon" />
              <SvgIcon v-else name="arrow-default" class="arrow-icon" />
            </div>
          </template>
          <div style="right: 0px;" class="fill"></div>
          <AsideMenuItem :menuList="routeItem.children" />
        </a-sub-menu>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { urlReg } from '@/common/utils/validate.ts'
import { findParents, getJumpUrl } from './setup'
import { getChildrenApp } from '@/hook/uranusConfigHook'

const $router = useRouter()
const $store = useStore()

interface menusInt {
  menuList: any
}
const $props = withDefaults(defineProps<menusInt>(), {
  menuList: () => [],
})
const childrenList = computed(() => {
  const menus = toRef($props, 'menuList')
  const list = menus.value || []
  return list.sort((a: any, b: any) => a.order - b.order)
})
function titleClick() {}
function goRouter(currentRouteMsg: any) {
  const { uri, id } = currentRouteMsg
  const menus = $store.getters.authMenus
  const parents = findParents(menus, uri)
  const [root] = parents.length ? parents.reverse() : [{}]
  const { externalLoginName, openType, code } = root
  if (urlReg.test(uri)) {
    if (openType === 'IFRAME') {
      $router.push({
        name: externalLoginName,
        query: { url: uri, appName: externalLoginName },
      })
    }
    if (openType === 'WINDOW') {
      const menuInfo = {
        url: uri,
        externalLoginName,
      }
      const path = getJumpUrl(menuInfo)
      console.log('jumpURL: ', path)
      if (!path) return
      if (uri) window.open(getJumpUrl(menuInfo), '_blank')
    }
  } else {
    let childUrl = ''
    if (code) {
      const childApp = getChildrenApp()
      const prefix = childApp[code] ? `/${childApp[code]}/` : '/'
      childUrl = `${prefix}${uri}`
    }
    $router.push(childUrl)
    $store.commit('app/setActionPath', uri)
    $store.commit('platform/setVisited', currentRouteMsg)
  }
  if (id) {
    $store.commit('platform/setMenusSelectKey', id)
  }
}
</script>

<style scoped>
.el-menu-item {
  justify-content: center;
  padding-left: 0 !important;
}
</style>
