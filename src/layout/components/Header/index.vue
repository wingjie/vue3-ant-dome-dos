<!--suppress HtmlUnknownTag -->
<template>
  <a-layout-header class="header-area">
    <div class="logo" :class="{ collapsed: collapsed }">
      <img :src="logo" alt="" />
      <div @click="toggleCollapsed">
        <menu-unfold-outlined v-if="collapsed" class="trigger" />
        <menu-fold-outlined v-else class="trigger" />
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import logoPng from '@/assets/logo.png'

interface propMsg {
  collapsed: boolean
}
const $emit = defineEmits(['update:collapsed'])
const prop = withDefaults(defineProps<propMsg>(), {
  collapsed: true,
})
const { collapsed } = toRefs(prop)

const logo = ref(logoPng)

function toggleCollapsed() {
  $emit('update:collapsed', !collapsed.value)
}
</script>

<style scoped lang="scss">
.header-area {
  display: flex;
  height: $header-height;
  line-height: $header-height;
  padding: 0;
  justify-content: space-between;
}
.trigger {
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  &.hidden {
    display: none;
  }
  &:hover {
    color: #1890ff;
  }
}
.logo {
  width: 200px;
  text-align: center;
  display: flex;
  transition: all 0.2s;
  &.collapsed {
    width: 100px;
  }
  img {
    margin: 0 auto;
    height: 80%;
  }
}
</style>
