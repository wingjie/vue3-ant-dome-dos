import splicing from '@/common/utils/commonWay/splicingStr'

const sw = 'saas-cdb-sw:'
const Sw = 'Sw_'

const dictSw = {
  /* 交换机 */
  ModelType: 'modelType', // 模型类型
  PodOrgType: 'podOrgType',
  NwConstructionMatterType: 'nwConstructionMatterType', // 建设事项类型
  ZtpProcessType: 'ztpProcessType', // 建设事项ZTP进度
  ZtpStatusType: 'ztpStatusType', // 设备开局状态
  VendorType: 'vendorType', // 厂商
  OrderStatus: 'orderStatus', // 工单状态
  OrderType: 'orderType', // 工单类型
  OrderNode: 'orderNode', // 工单节点
  AllotmentType: 'allotmentType', // 分配资源类型
  PodTypeTag: 'podTypeTag', // POD资源池类型标签
  PodAzTag: 'podAzTag', // POD的AZ标签
  NetCardType: 'netCardType', // 网卡类型
  NetCardUseType: 'netCardUseType', // 网卡用途
  BondMode: 'bondMode', // Bond模式
  EncapsulationType: 'encapsulationType', // 封装类型
  VlanType: 'vlanType', // VLAN类型
}

export default splicing(dictSw, Sw, sw)
