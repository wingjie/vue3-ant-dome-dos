import splicing from '@/common/utils/commonWay/splicingStr'

const ipam = 'saas-ipam:'
const Ipam = 'Ipam_'
const dictIpam = {
  BizArch: 'bizArch', // 业务架构
  IpAddressStatus: 'ipAddressStatus', // ip地址类型
  IpAppProcessType: 'ipAppProcessType', // 流程类型
  IpAllocator: 'ipAllocator', // 分配方式
  IpUsageType: 'ipUsageType', // 使用类型
  IpResourcePoolTags: 'ipResourcePoolTags', // 资源池标签
  TagObject: 'tagObject', // ip资源池标签-对象
  TagUsage: 'tagUsage', // ip资源池标签-用途
  IpAppType: 'ipAppType', // ip资源池-申请类别
  IpAppRangeType: 'ipAppRangeType', // ip资源池-范围类别
  IpAllocationStatus: 'IpAllocationStatus', // ip规划-ip状态、ipv4占用-占用类型
  IpCollectionStatus: 'IpCollectionStatus', // 采集状态
  OrderCreationType: 'orderCreationType', // ip工单创建类型
  OrderStatus: 'procOrderStatus', // ip工单状态
  OrderSource: 'orderSource', // ip工单来源
  SafeZoneNetwork: 'safeZoneNetwork', // 安全区-网络IP
  SafeZoneCompute: 'safeZoneCompute', // 安全区-计算IP
}

export default splicing(dictIpam, Ipam, ipam)
