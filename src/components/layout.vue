<template>
  <div class="box">
    <div class="left">
      <slot name="header"></slot>
      <template v-if="modules">
        <div class="BulkList" v-for="item in modulesPath" :key="item.url">
          <Bulk :path="{ url: item.url, file: item.file }" :msg="item"></Bulk>
        </div>
      </template>
      <slot name="footer"></slot>
    </div>
    <div class="right" v-if="modules && !isMobileDevice()">
      <a-anchor
        @click="(e: any) => e.preventDefault()"
        :getContainer="getCurrentAnchor"
      >
        <a-anchor-link
          v-for="item in modulesPath"
          :title="item.title"
          :key="item.url"
          :href="'#' + item.url.replace(/\.*\/*\s*/g, '')"
        />
      </a-anchor>
    </div>
  </div>
</template>
<script setup lang="ts">
import Bulk from '@/components/bulk.vue'
import installHomeScroll from '@/hook/homeScroll'

interface propMsg {
  modules?: any
}
const props = withDefaults(defineProps<propMsg>(), {})
const { modules } = toRefs(props)

const [modulesPath, getCurrentAnchor, width, isMobileDevice] = installHomeScroll({
  modules: modules.value,
})

</script>
<style scoped lang="scss">
.BulkList {
  margin: 30px auto;
}
.box {
  display: flex;
  .left {
    width: calc(100% - v-bind(width));
  }
  .right {
    width: v-bind(width);
    position: fixed;
    right: 10px;
  }
}
</style>
