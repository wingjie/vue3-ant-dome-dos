import splicing from '@/common/utils/commonWay/splicingStr'

const pass = 'saas-dcnac:'
const Bass = 'Dcnac_'
const dictDcnac = {
  /* 模型管理 */
  ModelType: 'modelType', // 模型类型
  FabricStructure: 'fabricStructure', // Fabric互联模型架构
  ServerResourcePoolType: 'serverResourcePoolType', // 服务器资源池类型
  ServerNodeType: 'serverNodeType', // 服务器节点类型
  JumperType: 'jumperType', // 跳线种类
  IPFunctionType: 'iPFunctionType', // IP功能类型
  DeviceRole: 'deviceRole', // 设备角色
  /* Fabric信息管理 */
  Vrf: 'vrf', // 	VRF
  SwDeviceStatus: 'swDeviceStatus', // 设备状态
  FabricInterconnectionType: 'fabricInterconnectionType', // 设备状态
  FabricDeviceStatus: 'fabricDeviceStatus', // fabric设备状态
  /* Fabric建设事项 */
  ZtpSpineLeafType: 'ztpSpineLeafType', // 建设事项选项
  ProcLegacyLeafZtpOrderStatus: 'procLegacyLeafZtpOrderStatus', // 传统leaf扩容工单状态
  ProcLegacySpineZtpOrderStatus: 'procLegacySpineZtpOrderStatus', // 传统spine开局工单状态
  ProcSdnLeafZtpOrderStatus: 'procSdnLeafZtpOrderStatus', // sdn-leaf扩容工单状态
  ProcSdnSpineZtpOrderStatus: 'procSdnSpineZtpOrderStatus', // sdn-spine开局工单状态
}

export default splicing(dictDcnac, Bass, pass)

