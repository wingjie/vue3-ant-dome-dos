import {
  getStorage,
  setStorage,
  clearStorage,
} from '@/common/utils/globalStore/storage.js'

const keys = {
  tokenKey: 'galaxy-common-token',
  userKey: 'galaxy-common-user',
  publicKey: 'galaxy-common-publicKey',
}
function getToken() {
  return getStorage(keys.tokenKey)
}

function setToken(token) {
  setStorage(keys.tokenKey, token)
}

function getUserInfo() {
  return getStorage(keys.userKey)
}

function setUserInfo(userInfo) {
  setStorage(keys.userKey, userInfo)
}

function getPublicKey() {
  return getStorage(keys.publicKey)
}

function setPublicKey(key) {
  setStorage(keys.publicKey, key)
}

function clearAuth() {
  Object.keys(keys).forEach((i) => {
    clearStorage(keys[i])
  })
}

export default {
  getToken,
  setToken,
  getUserInfo,
  setUserInfo,
  setPublicKey,
  getPublicKey,
  clearAuth,
}
