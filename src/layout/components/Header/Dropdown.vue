<template>
  <div class="dropdown">
    <a-dropdown class="switch-theme" :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent>
        <control-filled class="i" />
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
    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent
        >{{ loginUserName }} <DownOutlined
      /></a>
      <template #overlay>
        <a-menu>
          <a-menu-item>设置</a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="loginOut">退出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { DownOutlined, ControlFilled } from '@ant-design/icons-vue'
import { themes } from '@/style/theme/theme'
import { getUserStore } from '@/common/utils/globalStore/index.js'

const $store = useStore()
const $router = useRouter()
const loginUserName = ref('')

onMounted(() => {
  const userInfo = getUserStore()
  loginUserName.value = userInfo?.name
})

function loginOut() {
  $store.dispatch('user/loginOut').then(() => {
    console.log($store.getters)
    $router.push('/login')
  })
}
function switchTheme(type: string) {
  $store.commit('app/changeTheme', type)
}
</script>

<style scoped lang="scss">
.dropdown {
  margin-right: 10px;
}
.ant-dropdown-link {
  color: #fff;
}
.switch-theme {
  margin-right: 10px;
  .i {
    font-size: 16px;
  }
}
</style>
