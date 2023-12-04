<template>
  <a-popover
    v-if="baseMenus"
    class="base-menu"
    overlayClassName="base-menu-menu-area"
    placement="bottomRight"
  >
    <template #content>
      <div>
        <template v-for="(item, index) in baseMenus.children" :key="index">
          <div class="user-permission">
            <div class="title">{{ item.name }}</div>
          </div>
          <div class="options">
            <div
              v-for="(inner, i) in item.children"
              class="option"
              :key="i"
              @click="goRouter(inner)"
            >
              <SvgIcon
                :name="iconOption[inner.code]"
                class="base-menu-icons"
                fontSize="38px"
              />
              <div class="descriptions">{{ inner.name }}</div>
            </div>
          </div>
        </template>
      </div>
    </template>
    <SvgIcon name="icon-base" class="base-icon" fontSize="20px" />
  </a-popover>
</template>

<script setup lang="ts">
import { goRouter } from '../Sidebar/setup'

const $store = useStore()

const menus = $store.getters.authMenus
const baseMenus = menus.find((i: any) => i.name === '基础平台')
const iconOption = {
  'bp-organization': 'base-menu-org',
  'bp-personnel': 'base-menu-person',
  'bp-user-group': 'base-menu-group',
  'bp-role': 'base-menu-role',
  'bp-scene': 'base-menu-scene',
  'bp-application': 'base-menu-app',
  'bp-operation-authorization': 'base-menu-operation',
  'bp-menu-authorization': 'base-menu-menu',
  'bp-dictionary': 'base-menu-dict',
}
</script>

<style scoped lang="scss">
.base-menu {
  margin-right: 16px;
}
.base-icon {
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  &:hover {
    background-color: #e7f0f8;
  }
}
.title {
  margin-left: 12px;
  font-size: 12px;
  font-weight: 500;
  color: #8ea1b3;
  line-height: 20px;
}
.user-permission {
  width: 100%;
  height: 28px;
  border-bottom: 1px solid #e7f0f8;
}
.options {
  display: flex;
  flex-direction: row;
  :hover {
    background: #f5f7f9;
    border-radius: 8px;
    cursor: pointer;
  }
}
.option {
  position: relative;
  height: 80px;
  width: 100px;
  margin-top: 17px;
  margin-right: 4px;
  margin-bottom: 8px;
}

.base-menu-icons {
  margin-top: 9px;
  margin-left: auto;
  margin-right: auto;
  width: 38px;
  height: 38px;
  align-items: center;
}

.descriptions {
  position: relative;
  text-align: center;
  margin: 4px auto 0;
  font-size: 14px;
  font-weight: 400;
  color: #454545;
  line-height: 20px;
}
</style>
