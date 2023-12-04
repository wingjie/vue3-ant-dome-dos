<!--suppress HtmlUnknownAttribute -->
<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" theme="dark">
    <a-menu-item
      v-for="item in routes"
      :key="item.path"
      @click="goRouter(item)"
    >
      {{ item.meta?.title }}
    </a-menu-item>
  </a-menu>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const { options, currentRoute } = useRouter()
const router = useRouter()
const routes = reactive(options.routes)

const current: string[] = reactive([])
function goRouter(currentRouteMsg: any) {
  router.push(currentRouteMsg.path)
}

// const currentRoutePath = computed(() => currentRoute.value.path)
// const active = currentRoute.value.matched[0].path
watchEffect(() => {
  const { path } = currentRoute.value
  const reg = /\/([\w-]+)\/([\w-]+)/g
  reg.exec(path)
  current.push(`/${RegExp.$1}`)
})
</script>

<style scoped lang="scss"></style>
