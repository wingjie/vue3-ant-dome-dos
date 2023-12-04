import { constantRoutes, asyncRoutes } from '@/router'
import { resetIsAddRoute } from '@/router/nav-guard'
import {
  loginSystem,
  loginOutSystem,
  getUserMenus,
  getUserInfoByToken,
  getPublicKeyFormApi,
} from '@/common/http/api/login'
import {
  getToken,
  setToken,
  getPublicKey,
  setPublicKey,
  setUserStore,
  clearGlobalStore,
  getChain,
  setTheme,
  setChain,
} from '@/common/utils/globalStore/index.js'
import { getBaseRoute } from '@/common/hook/useBaseRoute'

export default {
  namespaced: true,
  state: () => ({
    token: getToken(),
    userInfo: {
      username: '',
    },
    permission: {
      menus: [],
      routes: [],
      addRoutes: [],
    },
    publicKey: getPublicKey(),
    outsideChain: getChain(),
  }),
  mutations: {
    // 设置用户信息
    setUserInfo({ userInfo }: any, info: any) {
      userInfo.username = info.username
    },
    // 设置token
    setToken(state: any, token: string) {
      state.token = token
      setToken(token)
    },
    // 设置菜单权限
    setMenus({ permission }: any, menus: string[]) {
      permission.menus = menus
    },
    // 设置token
    setPublicKey(state: any, key: string) {
      setPublicKey(key)
    },
    // 设置路由信息
    setRoutes({ permission }: any, routes: any) {
      permission.addRoutes = routes
      permission.routes = constantRoutes.concat(routes)
    },
    // 设置外链信息
    setOutsideChain(state: any, info: any) {
      state.outsideChain = info
      setChain(info)
    },
    // 清除用户信息
    cleanLoginInfo(state: any) {
      state.userInfo.username = ''
      state.token = ''
      state.permission.menus = []
      state.permission.routes = []
      state.permission.addRoutes = []
      state.outsideChain = null
    },
  },
  actions: {
    // 登陆
    login({ commit }: any, data: any) {
      return new Promise((resolve, reject) => {
        const isSkipAuth = import.meta.env.VITE_SKIP_AUTH
        if (isSkipAuth) {
          const token = 'admin'
          commit('setToken', token)
          resolve(true)
        } else {
          loginSystem(data)
            .then((resp: any) => {
              const { token, externalLoginData } = resp
              commit('setToken', token)
              if (externalLoginData) {
                commit('setOutsideChain', externalLoginData)
              }
              resolve(true)
            })
            .catch((err: any) => reject(err))
        }
      })
    },
    // 获取用户信息
    getUserInfo({ commit, state }: any) {
      return new Promise((resolve) => {
        const isSkipAuth = import.meta.env.VITE_SKIP_AUTH
        if (isSkipAuth) {
          const user = { username: 'admin' }
          const menus = ['app1', 'App1About']
          commit('setUserInfo', user)
          commit('setMenus', menus)
          resolve(true)
        } else if (state.permission.menus.length !== 0) {
          resolve(true)
        } else {
          getUserInfoByToken().then((resp: any) => {
            setUserStore(resp)
            getUserMenus().then((menus: any) => {
              commit('setMenus', menus)
              resolve(true)
            })
          })
        }
      })
    },
    // 登出
    loginOut({ commit }: any) {
      return new Promise((resolve) => {
        function clearData() {
          const { $router } = getBaseRoute()
          clearGlobalStore()
          commit('cleanLoginInfo')
          commit('platform/clearPlatform', {}, { root: true })
          resetIsAddRoute()
          $router.push({ name: 'Login' })
        }
        clearData()
        resolve(true)
      })
    },
    // 根据权限列表解析相关路由
    analysisRoutes({ commit }: any) {
      // console.log('permission', state.permission)
      // const { menus } = state.permission
      return new Promise((resolve) => {
        let accessedRoutes
        if (import.meta.env.VITE_SKIP_AUTH) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = asyncRoutes || []
        }
        commit('setRoutes', accessedRoutes)
        resolve(accessedRoutes)
      })
    },
    // 获取加密的公钥
    publicKey({ commit }: any) {
      return new Promise((resolve) => {
        getPublicKeyFormApi().then((pkResp: any) => {
          const publicKey = pkResp?.publicKey || ''
          console.log('[store-info]:getPublicKeyFetch', publicKey)
          commit('setPublicKey', publicKey)
          resolve(true)
        })
      })
    },
  },
}
