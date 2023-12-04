<template>
  <a-layout-content class="main-content" ref="mainContentArea">
    <div class="main-content-area">
      <!--  需要缓存的组件 -->
      <router-view v-slot="{ Component }">
        <transition name="component-fade" mode="out-in">
          <keep-alive :max="2">
            <component v-if="keepAlive" :is="Component" :key="$route.path" />
          </keep-alive>
        </transition>
      </router-view>
      <!-- 不需要缓存的组件 -->
      <router-view v-slot="{ Component }">
        <transition name="component-fade" mode="out-in">
          <component v-if="!keepAlive" :is="Component" />
        </transition>
      </router-view>
    </div>
    <a-back-top :target="backTop" />
  </a-layout-content>
</template>

<script setup lang="ts">
const $route = useRoute()
const $router = useRouter()
const fromPathName = ref<any>('')
const keepAlive = computed(() => {
  const { meta } = $route
  if (meta.keepAlive === true) {
    return true
  }
  if (Object.prototype.toString.call(meta.keepAlive) === '[object Array]') {
    if (!fromPathName.value) {
      return true
    }
    if ((meta.keepAlive as any[])?.includes(fromPathName.value)) {
      // to.meta.keepAlive = true
      return true
    }
    // to.meta.keepAlive = false
    return false
  }
  return false
})

const mainContentArea = ref()
function backTop() {
  return mainContentArea.value.$el
}
$router.beforeEach((_to, from, next) => {
  fromPathName.value = from.name
  next()
})
const businessPage = import.meta.env.MODE === 'debug' ? '10px' : 'inherit'
</script>

<style scoped lang="scss">
.main-content {
  background: #ececec;
  min-height: 500px;
  overflow-y: scroll;
}

.main-content-area {
  // margin: 10px;
  padding: 10px 30px;
  background-color: white;
  min-height: calc(100vh - 48px);
}
.main-content-area > div {
  padding: v-bind('businessPage');
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
