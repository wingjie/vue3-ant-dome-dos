<template>
  <div>
    <template v-for="item in routeList">
      <template v-if="!item.meta?.hidden">
        <template v-if="!item.children">
          <a-menu-item :key="item.name" @click="jumpRoute(item)">
            <template v-if="item.meta?.icon" #icon>
              <component :is="getIcon(item.meta?.icon)" />
            </template>
            <span>{{ item.meta?.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <a-sub-menu :key="item.name">
            <template v-if="item.meta?.icon" #icon>
              <component :is="getIcon(item.meta?.icon)" />
            </template>
            <template #title>{{ item.meta?.title }}</template>
            <MenuItem :route-list="item.children" :root-path="getPath(item)" />
          </a-sub-menu>
        </template>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import * as icon from '@ant-design/icons-vue'

const $router = useRouter()
type prop = {
  rootPath?: string
  routeList?: any
}

const { routeList, rootPath } = defineProps<prop>()
function getIcon(iconString: string) {
  return (icon as any)[iconString]
}
function jumpRoute(route: any) {
  const jumpUrl = rootPath ? `${rootPath}/${route.path}` : `${route.path}`
  $router.push(jumpUrl)
}
function getPath(route: any) {
  return rootPath || route.path
}
</script>

<style scoped lang="scss"></style>
