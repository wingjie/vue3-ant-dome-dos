/* eslint-disable import/prefer-default-export */
import request, { prefix } from '@/common/http'
import { getUserStore } from '@/common/utils/globalStore'

const { SOLAR_RUNTIME } = prefix

// 获取菜单权限树
export const getMenuTreeData = (data: { appId: string; status?: string }) =>
  request(
    `${SOLAR_RUNTIME}/menu-autho/set-all-of-app-as-tree/menu-authos
  `,
    data,
    'get'
  )
// 获取操作权限树
export const getOperationAuthTree = (data: { appIds: string }) =>
  request(`${SOLAR_RUNTIME}/ope-autho/list-as-tree/ope-authos`, data, 'get')

// 获取字典数据
export const findDictData = (name: any) =>
  request(`${SOLAR_RUNTIME}/dict/get-as-view/dicts/${name}`)

// 全量查询人员基本信息列表
export const findAllUser = () =>
  request(
    `${SOLAR_RUNTIME}/personnel/list/personnels`,
    { status: 'ENABLED', isOnlyUser: false },
    'get'
  )

// 查询所有组织机构
export const findAllOrg = () =>
  request(`${SOLAR_RUNTIME}/org/list-all-as-basic/orgs`)

export const getOperateAuth = (userId: any) =>
  request(
    `${SOLAR_RUNTIME}/ope-autho/query-by-app-code-and-user-id/operations`,
    {
      appCode: 'firewall-access-relationship-activation',
      userId,
    }
  )

// 获取APP列表
export const getAppList = (params: any) =>
  request(`${SOLAR_RUNTIME}/app/list-as-basic/apps`, params, 'get')

// 查询场景
export const getSceneList = () => {
  const userInfo = getUserStore()
  const data = {
    userId: userInfo.userId,
  }
  return request(
    `${SOLAR_RUNTIME}/scene/list-scenes-by-user-id/scenes`,
    data,
    'get'
  )
}
// 查询所有标签
export const getAllTags = () => {
  const data = {
    status: 'ENABLED',
  }
  return request(`${SOLAR_RUNTIME}/app/list-as-basic/apps`, data, 'get')
}
