import {
  getStorage,
  setStorage,
  clearStorage,
} from '@/common/utils/globalStore/storage.js'

const keyString = 'galaxy-common-theme'

function getTheme() {
  const theme = getStorage(keyString)
  if (theme) {
    return theme
  }
  // 设置默认主题
  setTheme('galaxy')
  return getStorage(keyString)
}

function setTheme(theme: string) {
  setStorage(keyString, theme)
}

// 移除用户缓存数据
function clearTheme() {
  clearStorage(keyString)
}
export default { getTheme, setTheme, clearTheme }
