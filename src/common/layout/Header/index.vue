<template>
  <a-layout-header class="header-area">
    <div class="left-area">
      <div class="logo-area" :class="{ collapsed: collapsed }">
        <div class="logo-main">
          <img class="icon" :src="logoSvgIcon" alt="logo" />
          <img class="text" :src="logoSvgText" alt="DNet" />
        </div>
        <div class="operate" @click="toggleCollapsed">
          <SvgIcon
            class="trigger"
            :class="{ rotate: collapsed }"
            name="icon-take-back"
            fontSize="16px"
          ></SvgIcon>
        </div>
      </div>
      <Crumb />
    </div>
    <!--<HeaderMenu v-if="false" />-->
    <Dropdown />
  </a-layout-header>
</template>

<script setup lang="ts">
// import HeaderMenu from '@/common/layout/Header/HeaderMenu.vue'
import Crumb from '@/common/layout/Header/Crumb.vue'
import Dropdown from '@/common/layout/Header/Dropdown.vue'
import logoSvgIcon from '@/common/assets/logo-icon.svg'
import logoSvgText from '@/common/assets/logo-text.svg'
import SvgIcon from '@/common/components/SpaceUI/SvgIcon/index.vue'

const $store = useStore()

const collapsed = computed(() => $store.getters.sidebarOpen)
function toggleCollapsed() {
  $store.commit('app/collapsedSidebar')
}
</script>

<style scoped lang="scss">
.header-area {
  display: flex;
  height: $header-height;
  line-height: $header-height;
  padding: 0;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 2px 0 12px 0 #dbe6f1;
  z-index: 11;
  .left-area {
    display: flex;
  }
}
.logo-area {
  display: flex;
  justify-content: space-between;
  width: $sidebar-open-width;
  transition: all 0.2s;
  .logo-main {
    display: flex;
    justify-content: left;
    align-items: center;
    height: $header-height;
    margin-left: 26px;
    flex-shrink: 0;
    transition: all 0.2s;
    img {
      &.icon {
        width: 32px;
        height: 32px;
      }
      &.text {
        height: 15px;
        margin-left: 7px;
      }
    }
  }
  .trigger {
    cursor: pointer;
    transition: all 0.4s;
    color: #5b748b;
    &.rotate {
      transform: rotateY(180deg);
    }
  }
  .operate {
    margin-right: 21px;
    display: flex;
    align-items: center;
  }
  &.collapsed {
    width: $sidebar-close-width;
    .logo-main {
      width: $sidebar-close-width;
      margin-left: 0;
      justify-content: center;
    }
    img.text {
      display: none;
    }
    .trigger {
      margin-left: -10px;
    }
    .operate {
      margin-right: 0;
    }
  }
}
</style>
