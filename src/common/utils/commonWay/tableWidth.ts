const mapData = {
  keysIndex: 60, // ! 序号
  order: 220, // ! 工单号
  logicalDeviceName: 220, // ! 控制点名称
  logicalDeviceType: 80, // ! 控制点类型
  virtualMark: 175, // ! 虚墙标记
  ipMask: 150, // ! ip/掩码
  status: 150, // ! 工单状态
  ip: 130, // ! ip
  ipType: 100, // ! ip类型
  natResultType: 150, // ! nat结果类型
  zone: 70, // ! zone
  appOrg: 150, // ！需求部门
  description: 200, // ！需求概述
  port: 130, // ! 接口
  routingTable: 100, // ！路由域
  source: 90, // ! 来源
  connectType: 100, // !协议
  protocol: 100, // !协议
  action: 100, // !action
  remark: 150, // !备注
  procLog: 300, // ！ 处理反馈
  person: 150, // !操作人
  time: 160, // !时间
  parentNames: 150, // 上级
  userCode: 100, // 用户代码
  code: 120, // 人员代码
  name: 100, // 姓名
  organName: 150, // 机构名称
  orgName: 200, // 所属组织机构
  role: 180, // 角色
  baseStatus: 80, // 状态
  orders: 80, // 排序
  mail: 120, // 电子邮箱
  tel: 120, // 联系电话
  personnelCount: 100, // 人员数量
  principalName: 100, // 负责人
  appName: 150, // app名称
  module: 150, // 所属功能
  dicName: 150, // 字典名称
  displayName: 130, // 字典显示名
  priority: 100, // 优先级
} as const
const TW: { readonly [p in keyof typeof mapData]: (typeof mapData)[p] } =
  mapData
export default TW
