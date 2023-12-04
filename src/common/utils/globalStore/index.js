import {
  findDictData,
  findAllUser,
  findAllOrg,
  getOperateAuth,
} from '@/api/common.ts'
import dict from '@/common/utils/globalStore/modules/dictionary/index.js'
import personnel from '@/common/utils/globalStore/modules/personnel.js'
import org from '@/common/utils/globalStore/modules/organization.js'
import auth from '@/common/utils/globalStore/modules/auth.js'
import { dictMap } from '@/common/utils/globalStore/modules/dictionary/dictMap.js'
import operate from '@/common/utils/globalStore/modules/operation/index.js'
import theme from './modules/theme.ts'
import chain from './modules/chain'

// 清除缓存数据
function clearGlobalStore() {
  dict.clearDictData()
  personnel.clearUserData()
  org.clearOrgData()
  auth.clearAuth()
  operate.clearOperateData()
  theme.clearTheme()
  chain.clearChain()
}
// 根据API的promise对象产生获取方法
const getDictStore = (dictCode) => dict.getDictData(dictCode, findDictData)
Object.setPrototypeOf(getDictStore, { ...dictMap })
const getPersonStore = (userId) => personnel.getUserData(userId, findAllUser)
const getOrgStore = (orgId) => org.getOrgData(orgId, findAllOrg)
// const getToken = () => auth.getToken()
function getToken() {
  return auth.getToken()
}
const setToken = (token) => auth.setToken(token)
const getUserStore = () => auth.getUserInfo()
const setUserStore = (userInfo) => auth.setUserInfo(userInfo)
const setPublicKey = (key) => auth.setPublicKey(key)
const getPublicKey = (key) => auth.getPublicKey(key)
const getOperateStore = (userId) =>
  operate.getOperateData(userId, getOperateAuth)
const getTheme = () => theme.getTheme()
const setTheme = (t) => theme.setTheme(t)
const getChain = () => chain.getChain()
const setChain = (t) => chain.setChain(t)

export {
  getDictStore,
  getPersonStore,
  getOrgStore,
  getToken,
  setToken,
  setPublicKey,
  getPublicKey,
  getUserStore,
  setUserStore,
  getOperateStore,
  clearGlobalStore,
  getTheme,
  setTheme,
  getChain,
  setChain,
}
