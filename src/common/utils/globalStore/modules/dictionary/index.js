import {
  getStorage,
  setStorage,
  clearStorage,
} from '@/common/utils/globalStore/storage.js'

const dictKey = 'galaxy-common-dict'
// 根据字典code从storage中获取对应值
function getStorageDictData(dictCode) {
  const dictObj = getStorage(dictKey)
  if (dictObj) {
    return dictObj[dictCode]
  }
  return null
}
// 根据字典code设置storage值
function setStorageDictData(dictCode, value) {
  const dictObj = getStorage(dictKey)
  if (dictObj) {
    dictObj[dictCode] = value
    setStorage(dictKey, dictObj)
  } else {
    setStorage(dictKey, { [dictCode]: value })
  }
}
// 移除字典缓存数据
function clearDictData() {
  clearStorage(dictKey)
}
// 直接获取字典数据
function getDictData(dictCode, apiCallback) {
  return new Promise((resolve, reject) => {
    const dictData = getStorageDictData(dictCode)
    if (dictData) {
      resolve(dictData)
    } else {
      apiCallback(dictCode)
        .then((resp) => {
          setStorageDictData(dictCode, resp)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}

export default { getDictData, clearDictData }
