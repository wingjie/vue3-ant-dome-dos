import request from '@/common/http'
import prefix from '@/common/http/api/prefix'

const MARS = prefix.MARS_RUNTIME
const SOLAR = prefix.SOLAR_RUNTIME

// 获取管理设备列表信息
export const getDeviceList = (data: any) =>
  request(`${MARS}/target/page/targets`, data)

// 查询场景
export const getSceneList = () => {
  const data = {
    status: 'ENABLED',
  }
  return request(`${SOLAR}/scene/list-as-basic/scenes`, data, 'get')
}
// 查询所有标签
export const getAllTags = () => {
  const data = {
    status: 'ENABLED',
  }
  return request(`${SOLAR}/app/list-as-basic/apps`, data, 'get')
}

// 批量删除设备
export const batchDeleteBatchDevice = (ids: any) =>
  request(`${MARS}/target/remove-by-ids/targets`, [...ids], 'post')
