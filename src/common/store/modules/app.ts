import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { getTheme, setTheme } from '@/common/utils/globalStore/index.js'

export default {
  namespaced: true,
  state: () => ({
    sidebar: {
      open: true,
    },
    select: {},
    theme: getTheme(),
    actionPath: '',
    // eslint-disable-next-line no-underscore-dangle
    isInFoundation: !!qiankunWindow.__POWERED_BY_QIANKUN__,
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
      setTheme(type)
    },
    setActionPath(state: any, path: string) {
      state.actionPath = path
    },
  },
}
