import { message } from 'ant-design-vue'
import Store from '@/store/index'

export function getJumpUrl(menuInfo: any) {
  const { url, externalLoginName } = menuInfo
  const { chainInfo } = Store.getters
  if (!chainInfo) {
    message.warning(`未获取到 [${externalLoginName}] 应用的授权信息！`)
    return console.warn('[externalLogin]: no externalLoginInfo')
  }
  const loginInfo = chainInfo[externalLoginName]
  let stringUrl = url
  const { token, queryParam = 'ntToken', mode = 'TOKEN' } = loginInfo || {}
  if (mode === 'TOKEN_WITH_URL') {
    const [path, hash] = url.split('#')
    stringUrl = `${path}?${queryParam}=${token}`
    if (hash) {
      stringUrl += `#${hash}`
    }
  }
  return stringUrl
}

export function findParents(treeData: any, uri: string) {
  if (treeData.length === 0) return
  for (let i = 0; i < treeData.length; i++) {
    if (treeData[i].uri) {
      if (treeData[i].uri === uri) {
        return [treeData[i]]
      }
    }
    if (treeData[i].children) {
      const res: any = findParents(treeData[i].children, uri)
      if (res !== undefined) {
        return res.concat(treeData[i])
      }
    }
  }
}
