import request from '@/common/http'
import prefix from '@/common/http/api/prefix'

const SOLAR = prefix.SOLAR_RUNTIME

// 获取菜单数据
export const findMenus = (name: any, group?: string) =>
  request(`${SOLAR}/solar/menu/menus/${group || 'default'}/${name}`)

// 获取字典数据
export const findDictData = (name: any) =>
  request(`${SOLAR}/dict/get-as-view/dicts/${name}`)

// 全量查询人员基本信息列表
export const findAllUser = () =>
  request(
    `${SOLAR}/personnel/list/personnels`,
    { status: 'ENABLED', isOnlyUser: false },
    'get'
  )

// 查询所有组织机构
export const findAllOrg = () => request(`${SOLAR}/org/list-all-as-basic/orgs`)

// 获取APP列表
export const getAppList = (params: any) =>
  request(`${SOLAR}/app/list-as-basic/apps`, params, 'get')
// 获取菜单权限树
export const getMenuTreeData = (data: { appId: string; status?: string }) =>
  request(
    `${SOLAR}/menu-autho/set-all-of-app-as-tree/menu-authos
    `,
    data,
    'get'
  )
// 获取操作权限树
export const getOperationAuthTree = (data: { appIds: string }) =>
  request(`${SOLAR}/ope-autho/list-as-tree/ope-authos`, data, 'get')

// 获取当前登录用户信息
export const getUserInfoByToken = () =>
  request(`${SOLAR}/personnel/get-of-current/users`)

// 获取登陆用户的菜单权限
export const getUserMenus = () =>
  request(`${SOLAR}/menu-autho/list-all-of-current-user-as-tree/menu-authos
  `)
// 登陆
export const loginSystem = (data: any) =>
  request(`${SOLAR}/authe/login`, data, 'post')
export const loginOutSystem = () => request(`${SOLAR}/authe/logout`, {}, 'post')

export const getOperateAuth = (userId: any) =>
  request(`${SOLAR}/ope-autho/list-by-app-code-and-user-id/ope-authos`, {
    appCode: 'firewall-access-relationship-activation',
    userId,
  })
