import request from '@/common/http'
import prefix from '@/common/http/api/prefix'

const MARS = prefix.MARS_RUNTIME
// const SOLAR = prefix.SOLAR_SOLAR

// todo 查看认证策略
export const getPolicyList = (policyId: string) =>
  request(`${MARS}/auth/auths/${policyId}`)

// todo 根据条件分页获取认证策略
export const policyList = (data: any) =>
  request(`${MARS}/auth/page/auths`, data, 'get')
// 删除行
export const delOrderPolicy = (id: string) =>
  request(`${MARS}/auth/auths/${id}`, {}, 'DELETE')

// 通过模板导入认证策略 上传附件
export const upLoadPolicy = (data: any) =>
  request(
    `${MARS}/auth/import/auths`,
    data,
    'post',
    { timeout: 50000 },
    { customMap: true }
  )

// 导出认证策略
export const exportPolicy = (subnet: string) =>
  request(`${MARS}/auth/export/auths?keyWord=${subnet}`, '', 'get', {
    responseType: 'blob',
  })
// 条件，分页导出认证策略
export const exportPolicyPage = (data: any) =>
  request(`${MARS}/auth/paging-export/auths`, data, 'get', {
    responseType: 'blob',
  })
// todo 批量删除
export const removeAllPolicy = (data: { [p: string]: any }) =>
  request(`${MARS}/auth/remove-by-ids/auths`, data, 'POST')
// todo 新增认证策略
export const addAuths = (data: { [p: string]: any }) =>
  request(`${MARS}/auth/auths`, data, 'POST')
// todo 修改(保存): 修改保存(5)
export const editAuths = (orderScriptId: string, data: { [p: string]: any }) =>
  request(`${MARS}/auth/auths/${orderScriptId}`, data, 'PATCH')
