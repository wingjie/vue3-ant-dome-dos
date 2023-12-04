<template>
  <a-breadcrumb class="crumbs">
    <a-breadcrumb-item v-for="(item, index) in displayList" :key="index">
      <router-link v-if="item.uri" :to="item.uri">
        <span class="link-label">{{ item.name }}</span>
      </router-link>
      <span class="normal-label" v-else>{{ item.name }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
const $store = useStore()
const $route = useRoute()
const { authMenus } = $store.getters
function getCrumbsByMenus(menus: any, path: string) {
  function findParents(treeData: any, uri: string) {
    if (treeData.length === 0) return
    for (let i = 0; i < treeData.length; i++) {
      if (treeData[i].uri) {
        if (treeData[i].uri === uri) {
          return [treeData[i]]
        }
        if (urlIsIncludePath(treeData[i].uri, uri)) {
          return [treeData[i]]
        }
      }
      if (treeData[i].children) {
        const res: any = findParents(treeData[i].children, uri)
        if (res !== undefined) {
          return res.concat(treeData[i])
        }
      }
    }
  }
  const data = JSON.parse(JSON.stringify(menus))
  return findParents(data, path)
}
// 判断详情路径是否能匹配到对应的子菜单
function urlIsIncludePath(uri: string, path: any) {
  const pathList = path.split('/')
  const uriList = uri.split('/')
  let matchCount = 0
  pathList.forEach((p: any, index: any) => {
    if (p === uriList[index]) {
      matchCount += 1
    }
  })
  return matchCount >= 3
}
const displayList = ref([])
watch(
  () => $route.fullPath,
  () => {
    const list = getCrumbsByMenus(authMenus, $route.fullPath)
    urlIsIncludePath('', $route.fullPath)
    if (list) {
      displayList.value = list.reverse()
    }
  },
  {
    immediate: true,
  }
)
</script>

<style scoped lang="scss">
.crumbs {
  height: $header-height;
  line-height: $header-height;
  margin-left: 10px;
}
.normal-label {
  color: #888;
}
.link-label {
  color: #262626;
}
</style>
