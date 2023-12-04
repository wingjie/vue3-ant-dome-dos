import authMap from '@/common/utils/globalStore/modules/operation/operateMap.js'
import { getOperateStore, getUserStore } from '@/common/utils/globalStore'

const directiveHook = {
  async mounted(el: any, binding: any) {
    const { value } = binding
    if (Array.isArray(value)) {
      const userInfo = getUserStore()
      const { userCode, userId } = userInfo
      const currentAuth = await getOperateStore(userId)
      const haveAuth = value.some((i: any) => {
        const authValue = authMap[i]
        const authList = currentAuth ? currentAuth.map((a: any) => a.code) : []
        return authList.includes(authValue)
      })
      if (userCode !== 'admin' && !haveAuth) {
        el.parentNode.removeChild(el)
      }
    } else {
      console.warn('v-auth binding value must be Array!')
    }
  },
}

export default {
  name: 'auth',
  hook: directiveHook,
}
