import store from '@/store'

const mapData = {
  Fara_NatMapType: 'saas-fara:natMapType', // ? nat映射类型
  Fara_NatAddressPoolStatus: 'saas-fara:natAddressPoolStatus', // ? nat地址池状态
  Fara_AclAction: 'saas-fara:aclAction', // ? action
  Fara_AclProtocol: 'saas-fara:aclProtocol', // ? acl协议
  INETTRANSPORTPROTOCOL: 'saas-fara:inetTransportProtocol', // ? 传输层协议类型
  Fara_DataSource: 'saas-fara:dataSource', // ? 数据来源
  Fara_HaArchRole: 'saas-fara:haArchRole', // ? 主备角色
  Fara_DeviceType: 'saas-fara:deviceType', // ? 设备类型
  Fara_SafeZoneBlackWhiteListType: 'saas-fara:safeZoneBlackWhiteListType', // ? 黑白名单
  Fara_InetTransportProtocol: 'pass-base:highRiskPortProtocol', // ? 高危端口协议类型
  Fara_SafeZoneSafeLevel: 'saas-fara:safeZoneSafeLevel', // ? 安全域的安全等级
  Fara_SafeZoneBelonging: 'saas-fara:safeZoneBelonging', // ? 安全域的归属
  Fara_SafeZoneAccessRelationship: 'saas-fara:safeZoneAccessRelationship', // 安全域关系
  Fara_OrderStatus: 'saas-fara:orderStatus',
  Fara_ChangeOrderStatus: 'saas-fara:changeOrderStatus',
  Base_DictMenuType: 'pass-base:dictMenuType', // 字典菜单
  Base_DictValueType: 'pass-base:dictValueType', // 字典值
} as const
export const getDictSelectMap: {
  readonly [p in keyof typeof mapData]: (typeof mapData)[p]
} = mapData
const getDictSelect:
  | {
      readonly [p in keyof typeof mapData]: (typeof mapData)[p]
    }
  | any = (name: string, group: string = 'default') => {
  return new Promise((resolve) => {
    store
      .dispatch('app/getSelect', {
        name,
        group,
      })
      .then((res: any) => {
        resolve(res)
      })
  })
}

function proxy() {
  const keys = Object.keys(mapData)
  keys.forEach((item: string) => {
    Object.defineProperty(getDictSelect, item, {
      get() {
        return mapData[item as keyof typeof mapData]
      },
    })
  })
}
proxy()

export default getDictSelect
