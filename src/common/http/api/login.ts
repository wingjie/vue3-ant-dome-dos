import request, { prefix } from '@/common/http'

const { SOLAR_RUNTIME, SUN_RUNTIME } = prefix

// 登陆
export const loginSystem = (data: any) =>
  request(`${SOLAR_RUNTIME}/authe/login`, data, 'post')
// 登出
export const loginOutSystem = () =>
  request(`${SOLAR_RUNTIME}/authe/logout`, '', 'post')
// 获取登陆用户用户信息
export const getUserInfoByToken = () =>
  request(`${SOLAR_RUNTIME}/personnel/get-of-current/users`)
// 获取登陆用户的菜单权限
export const getUserMenus = () =>
  request(`${SOLAR_RUNTIME}/menu-autho/list-all-of-current-user-as-tree/menu-authos
  `)
// 获取加密公钥
export const getPublicKeyFormApi = () =>
  request(`${SUN_RUNTIME}/uranus/rest-crypto-public-key`)
// 获取登陆的图片验证码
export const getLoginImgCode = () =>
  request(`${SOLAR_RUNTIME}/authe/generate/captchas`, '', 'post')
