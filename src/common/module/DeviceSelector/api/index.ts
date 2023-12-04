import request from '@/common/http'
import prefix from '@/common/http/api/prefix'

const MARS = prefix.MARS_RUNTIME

// 分页查询设备
export const getDevicesList = (data: any) =>
  request(`${MARS}/device/page/devices`, data)

// 根据ID获取设备哈希表
export const getDeviceMapByIds = (deviceIds: any) =>
  request(`${MARS}/device/map-by-ids/devices`, deviceIds, 'post')
