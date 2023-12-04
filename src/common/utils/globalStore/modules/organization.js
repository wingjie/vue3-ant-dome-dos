import {
  getStorage,
  setStorage,
  clearStorage,
} from '@/common/utils/globalStore/storage.js'

const orgKey = 'galaxy-common-org'

function getStorageOrg() {
  const dataObj = getStorage(orgKey)
  if (dataObj) {
    return dataObj
  }
  return null
}

function setStorageOrgData(orgList) {
  setStorage(orgKey, orgList)
}
// 移除用户缓存数据
function clearOrgData() {
  clearStorage(orgKey)
}
function getOrgData(orgId, apiCallback) {
  function getOnce(id, data) {
    const match = data.find((i) => i.id === id)
    if (!match) console.warn('globalStore No such data: orgId', id)
    return match || null
  }
  return new Promise((resolve, reject) => {
    const orgData = getStorageOrg()
    if (orgData) {
      if (orgId) {
        resolve(getOnce(orgId, orgData))
      } else {
        resolve(orgData)
      }
    } else {
      apiCallback()
        .then((resp) => {
          setStorageOrgData(resp)
          if (orgId) {
            resolve(getOnce(orgId, resp))
          } else {
            resolve(resp)
          }
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}
export default { getOrgData, clearOrgData }
