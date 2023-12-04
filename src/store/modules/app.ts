import { findMenus } from '@/api/common'

export default {
  namespaced: true,
  state: () => ({
    sidebar: {
      open: true,
    },
    select: {},
    theme: 'ant',
  }),
  mutations: {
    // 打开和收起菜单
    collapsedSidebar({ sidebar }: any) {
      sidebar.open = !sidebar.open
    },
    setSelectData({ select }: any, { selectKey, data }: any) {
      select[selectKey] = data
    },
    changeTheme(state: any, type: string) {
      state.theme = type
    },
  },
  actions: {
    getSelect({ state, commit }: any, { group = 'default', name }: any) {
      return new Promise((resolve) => {
        const { select } = state
        const selectKey = `${group}-${name}`
        const items = select[selectKey]
        if (items) {
          resolve({ data: items.menuItems, menuList: items })
        } else {
          // todo API获取字典数据
          findMenus(name).then((res: any) => {
            commit('setSelectData', { selectKey, data: res })
            resolve({ data: res.menuItems, menuList: res })
          })
        }
      })
    },
  },
}
