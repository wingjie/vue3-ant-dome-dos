<template>
  <router-view />
</template>

<script setup lang="ts">
import { addEventCenter } from '@/microAppOption/eventCenter'

const $router = useRouter()

function listenerFatherData() {
  addEventCenter((data: any) => {
    const { path } = data
    if (path) {
      console.log('children', path)
      console.log('$router', $router)
      $router.push(path)
    }
  })
}
onMounted(() => {
  console.log('venus App.vue is run')
  listenerFatherData()
})
</script>

<style lang="scss"></style>
