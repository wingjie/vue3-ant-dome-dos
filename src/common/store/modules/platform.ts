import { getAppList, getMenuTreeData, getOperationAuthTree } from '@/api/common'

export default {
  namespaced: true,
  state: () => ({
    selectApp: {},
    systemApps: null,
    allMenuTree: null,
    operationTree: null,
    leftMenusOpenKeys: [],
    leftMenuSelectKey: [],
    visitedViews: [],
  }),
  mutations: {
    changeSelectApp(state: any, selected: any) {
      state.selectApp = selected
    },
    setSystemApps(state: any, apps: any) {
      state.systemApps = apps
    },
    setMenuTree(state: any, menuTree: any) {
      state.allMenuTree = menuTree
    },
    setOperationTree(state: any, operationTree: any) {
      state.operationTree = operationTree
    },
    setLeftMenusOpenKeys(state: any, menuIds: any) {
      if (Array.isArray(menuIds)) {
        state.leftMenusOpenKeys = menuIds
      } else {
        state.leftMenusOpenKeys = [menuIds]
      }
    },
    setMenusSelectKey(state: any, key: any) {
      if (Array.isArray(key)) {
        state.leftMenuSelectKey = key
      } else {
        state.leftMenuSelectKey = [key]
      }
    },
    setVisited(state: any, route: any) {
      const { visitedViews } = state
      const currentVisited = visitedViews.map((i: any) => i.id)
      if (!currentVisited.includes(route.id)) {
        visitedViews.push(route)
      }
    },
    removeVisited(state: any, route: any) {
      const { visitedViews } = state
      const { id } = route
      const matchId = visitedViews.findIndex((i: any) => i.id === id)
      if (matchId !== -1) {
        visitedViews.splice(matchId, 1)
      }
    },
    clearPlatform(state: any) {
      state.selectApp = {}
      state.systemApps = null
      state.allMenuTree = null
      state.operationTree = null
      state.leftMenusOpenKeys = []
      state.visitedViews = []
    },
  },
  actions: {
    // 获取APP信息
    getSystemApps({ state, commit }: any) {
      return new Promise((resolve) => {
        const { systemApps } = state
        if (systemApps) {
          resolve(systemApps)
        } else {
          getAppList({}).then((resp: any) => {
            commit('setSystemApps', resp)
            resolve(resp)
          })
        }
      })
    },
    updatedApps({ commit }: any) {
      getAppList({}).then((resp: any) => {
        commit('setSystemApps', resp)
      })
    },
    // 获取菜单权限树
    getMenuTree({ state, commit }: any) {
      return new Promise((resolve) => {
        const { allMenuTree, selectApp } = state
        if (allMenuTree) {
          resolve(allMenuTree)
        } else {
          const appId = selectApp.id || ''
          getMenuTreeData({ appId }).then((resp: any) => {
            commit('setMenuTree', resp)
            resolve(resp)
          })
        }
      })
    },
    // 获取操作权限树
    getOperationTree({ state, commit }: any) {
      return new Promise((resolve) => {
        const { operationTree, selectApp } = state
        if (operationTree) {
          resolve(operationTree)
        } else {
          const appId = selectApp.id || ''
          getOperationAuthTree({ appIds: appId }).then((resp: any) => {
            commit('setOperationTree', resp)
            resolve(resp)
          })
        }
      })
    },
  },
}
