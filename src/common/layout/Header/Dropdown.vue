<template>
  <div class="dropdown">
    <BaseHeaderMenu />
    <a-dropdown class="switch-theme" :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent>
        <SvgIcon name="icon-skin" class="i theme skin" fontSize="20px" />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="(theme, key) in themes"
            :key="key"
            @click="switchTheme(key)"
            >{{ theme.name }}</a-menu-item
          >
        </a-menu>
      </template>
    </a-dropdown>
    <a-divider type="vertical" class="divider" />
    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent>
        <div class="header-info">
          <div class="avatar">
            <SvgIcon name="icon-avatar" fontSize="20px" />
          </div>
          <span :title="loginUserName" class="user-name">{{
              loginUserName
            }}</span>
          <SvgIcon name="arrow-default" class="i" />
        </div>
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="loginOut">退出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import BaseHeaderMenu from './BaseHeaderMenu.vue'
import { themes } from '@/common/style/theme/theme'
import { getUserStore } from '@/common/utils/globalStore'
import SvgIcon from '@/common/components/SpaceUI/SvgIcon/index.vue'

const $store = useStore()

const loginUserName = ref('')

onMounted(() => {
  const userInfo = getUserStore()
  loginUserName.value = userInfo?.name
})

function loginOut() {
  $store.dispatch('user/loginOut')
}
function switchTheme(type: string) {
  $store.commit('app/changeTheme', type)
}
</script>

<style scoped lang="scss">
.dropdown {
  display: flex;
  margin-right: 15px;
  align-items: center;
  .divider {
    border-color: #566679;
    opacity: 0.3;
  }
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    border-radius: 50%;
  }
}
.divider {
  margin: 0 16px 0 0;
}
.ant-dropdown-link {
  display: flex;
  align-items: center;
  color: #040000;
  span.user-name {
    display: inline-block;
    width: 75px;
    height: $header-height;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 4px;
  }
  .i {
    line-height: 48px;
    font-size: 20px;
  }
  .skin {
    padding: 4px;
    border-radius: 8px;
    margin-right: 16px;
    &:hover {
      background-color: #e7f0f8;
    }
  }
  .theme {
    font-size: 28px;
  }
}
.header-info {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 4px;
  border-radius: 8px;
  &:hover {
    background-color: #e7f0f8;
  }
  .i {
    color: #888;
  }
}
.switch-theme {
  .i {
    font-size: 28px;
  }
}
</style>
