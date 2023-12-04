import splicing from '@/common/utils/commonWay/splicingStr'

const pass = 'paas-auto:'
const Base = 'Auto2_'
const dictBase = {
  DeviceType: 'deviceType', // 设备类型1
  Vendor: 'vendor', // 厂商
  DriverProtocol: 'driverProtocol', // 驱动协议
  ChannelType: 'channelType', // 通道类型
  ChannelHealthStatus: 'channelHealthStatus', // 通道健康
  OpeNodeStatus: 'opeNodeStatus', // 状态
  HttpRequestMethod: 'httpRequestMethod', // http方法
  DriverType: 'driverType', // 驱动类型
  CommonStatus: 'commonStatus', // 材料状态
  ConfigMaterialType: 'configMaterialType', // 配置材料类型
  ParseMaterialType: 'parseMaterialType', // 解析材料类型
  ValueType: 'valueType', // 值类型
  DataStructure: 'dataStructure', // 	数据结构
}

export default splicing(dictBase, Base, pass)
