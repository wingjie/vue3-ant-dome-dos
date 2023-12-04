import {
  getStorage,
  setStorage,
  clearStorage,
} from '@/common/utils/globalStore/storage.js'

const keyString = 'galaxy-common-chain'

function getChain() {
  return getStorage(keyString)
}

function setChain(ChainInfo: any) {
  setStorage(keyString, ChainInfo)
}

// 移除用户缓存数据
function clearChain() {
  clearStorage(keyString)
}
export default { getChain, setChain, clearChain }
