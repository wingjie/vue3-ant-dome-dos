import {
  getStorage,
  setStorage,
  clearStorage,
} from '@/common/utils/globalStore/storage.js'

const personnelKey = 'galaxy-common-person'

function getStoragePersonnel() {
  const dataObj = getStorage(personnelKey)
  if (dataObj) {
    return dataObj
  }
  return null
}

function setStorageUserData(userList) {
  setStorage(personnelKey, userList)
}
// 移除用户缓存数据
function clearUserData() {
  clearStorage(personnelKey)
}
function getUserData(userId, apiCallback) {
  function getOnce(id, data) {
    const match = data.find((i) => i.id === id)
    if (!match) console.warn('globalStore No such data: personnelId', id)
    return match || null
  }
  return new Promise((resolve, reject) => {
    const personnel = getStoragePersonnel()
    if (personnel) {
      if (userId) {
        resolve(getOnce(userId, personnel))
      } else {
        resolve(personnel)
      }
    } else {
      apiCallback()
        .then((resp) => {
          let arr = []
          if (resp) {
            arr = resp.map((item) => {
              return {
                value: item.id,
                label: item.name,
                ...item,
              }
            })
          }
          setStorageUserData(arr)
          if (userId) {
            resolve(getOnce(userId, arr))
          } else {
            resolve(arr)
          }
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}
export default { getUserData, clearUserData }
