import splicing from '@/common/utils/commonWay/splicingStr'

const pass = 'saas-fara:'
const Bass = 'Fara_'
const dictFara = {
  NatMapType: 'natMapType', // ? nat映射类型
  NatAddressPoolStatus: 'natAddressPoolStatus', // ? nat地址池状态
  AclAction: 'aclAction', // ? acl_action
  PbrAction: 'pbrAction', // ? pbr_action
  AclProtocol: 'aclProtocol', // ? protocol
  DataSource: 'dataSource', // ? 数据来源
  HaArchRole: 'haArchRole', // ? 主备角色
  DeviceType: 'deviceType', // ? 设备类型
  SafeZoneBlackWhiteListType: 'safeZoneBlackWhiteListType', // ? 黑白名单
  InetTransportProtocol: 'inetTransportProtocol', // ? 高危端口协议类型
  SafeZoneSafeLevel: 'safeZoneSafeLevel', // ? 安全域的安全等级
  SafeZoneBelonging: 'safeZoneBelonging', // ? 安全域的归属
  SafeZoneAccessRelationship: 'safeZoneAccessRelationship', // 安全域关系
  OrderStatus: 'procOrderStatus', // 工单状态
  ChangeOrderStatus: 'procChangeOrderStatus', // 变更单状态
  ChangeOrderItemRunStatus: 'changeOrderItemRunStatus', // 变更实施状态
  OrderLineSrcType: 'orderLineSrcType',
  OrderLineDestType: 'orderLineDestType',
  InetVersion: 'inetVersion', // ip类型// ? 高危端口协议类型
  ChangeOrderCtrlPointRunStatus: 'changeOrderCtrlPointRunStatus', // 变更实施状态
  NatAllocationStatus: 'natAllocationStatus', // 状态
  NatMapResultType: 'natMapResultType', // NAT结果映射类型
  NatAllocationTarget: 'natAllocationTarget', // NAT映射目标
  DynamicNatAllocationStrategy: 'dynamicNatAllocationStrategy', // 动态NAT分配策略
  StaticNatAllocationStrategy: 'staticNatAllocationStrategy', // 静态NAT分配策略
  ActivationStatus: 'activationStatus', // 开通状态
  RouteType: 'routeType', // 路由类型
  NatPlanningType: 'natPlanningType', // nat规划类型
  CtrlPointLocationIpBlackListType: 'ctrlPointLocationIpBlackListType',
  FwVendorType: 'fwVendorType', // 防火墙厂商
  SwVendorType: 'swVendorType', // 	交换机厂商
  SimOrderStatus: 'simOrderStatus', // 仿真工单状态
  FwRiskRuleType: 'fwRiskRuleType', // ? 风险规则类
  FwRiskRulelevel: 'fwRiskRulelevel', // ? 风险规则等级
  FwRiskRuleMark: 'fwRiskRuleMark', // ? 规则标识
  AclNameRuleVariableParams: 'aclNameRuleVariableParams', // 策略命名规则变量参数
  AclNameRuleConfigName: 'aclNameRuleConfigName', // 策略命名规则配置项
  WorkMode: 'workMode', // 策略命名规则配置项
  ProtocolType: 'protocolType', // 协议类型（有所有项）
}

export default splicing(dictFara, Bass, pass)
