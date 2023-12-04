import {
  getStorage,
  setStorage,
  clearStorage,
} from '@/common/utils/globalStore/storage.js'

const operateKey = 'galaxy-common-operate-venus'

// 根据从storage中获取对应值
function getStorageOperateData() {
  const operateData = getStorage(operateKey)
  if (operateData) {
    return operateData
  }
  return null
}

// 根据code设置storage值
function setStorageOperateData(data) {
  setStorage(operateKey, data)
}

// 移除缓存数据
function clearOperateData() {
  clearStorage(operateKey)
}
// 直接获取venus操作权限
function getOperateData(userId, apiCallback) {
  return new Promise((resolve, reject) => {
    const operateData = getStorageOperateData()
    if (operateData) {
      resolve(operateData)
    } else {
      apiCallback(userId)
        .then((resp) => {
          setStorageOperateData(resp)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

export default { getOperateData, clearOperateData }
