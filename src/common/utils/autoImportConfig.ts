export default [
  // 数据操纵方法
  ['assign', '$assign'],
  ['mapFilter', '$mapFilter'],
  ['typeOf', '$typeOf'],
  ['cloneDeep', '$cloneDeep'],
  ['forEach', '$forEach'],
  ['find', '$find'],
  // 校验
  ['valid', '$valid'], // 入参 A S R W P Y
  ['validIpIpsReg', '$validIpIpsReg'], // todo 例: 1.1.1.1-2.2.2.2 || 1.*.34/45/56.23-24, 1.1.1.1-2.2.2.2  ip校验/掩码，并且有通配符 （多个）
  ['validIpIpsNewLineReg', '$validIpIpsNewLineReg'], // todo 例: 1.1.1.1-2.2.2.2 || 1.*.34/45/56.23-24, 1.1.1.1-2.2.2.2 ｜ 1.1.1.1-2.2.2.2   ip校验/掩码，并且有通配符 （多个,可以空格、逗号、｜分割）
  ['validIp', '$validIp'], // todo 例: 1.1.1.1/23 || 1.1.1.1/32  ip校验/掩码（掩码必写）（单个）
  ['validIpAndMasks', '$validIpAndMasks'], // todo 例: 1.1.1.1/23, 1.1.1.1/32 || 1.1.1.1/32  ip校验/掩码（多个掩码必写，以‘,’隔开）（多个）
  ['validIpMaskAlone', '$validIpMaskAlone'], // todo 例: 1.1.1.1, 1.1.1.1/23, 1.1.1.1/32 ip/掩码校验 单个ip验证 （单个）
  ['validIpMask', '$validIpMask'], // todo 例: 1.1.1.1, 1.1.1.1/23, 1.1.1.1/32 ip/掩码校验 多个ip验证,以逗号隔开 （多个）
  ['validIpSimple', '$validIpSimple'], // todo 例: 1.1.1.1 || 1.1.1.1/32 纯ipV4 或 ipV4/32 （单个）
  ['validPort', '$validPort'], // todo 例: 23(1-65535), 2-22 多个端口号或者端口段, 以逗号隔开 （多个）
  ['isIpIpsReg', '$isIpIpsReg'], // todo 例: (1.1.1.1-2.2.2.2) || (1-12/12/23.*.12.255)
  ['isIpmMaskReg', '$isIpmMaskReg'], // todo 例: 1.1.1.1/23 || 1.1.1.1/32 判断是否是ipv4格式 （单个）
  ['isInet4Ip', '$isIne4Ip'], // todo 例： 1.1.1.1 判断是否是ipv4格式 （单个）
  ['isIpMasks', '$isIpMasks'], // todo 例: 1.1.1.1, 1.1.1.1/23, 1.1.1.1/32 判断是否是ipv4格式  多个ip验证,以逗号隔开 （多个）
  // 正则
  ['ipReg', '$ipReg'], // 1.1.1.1
  ['ipIpReg', '$ipIpReg'], // 1.1.1.1-2.2.2.2
  ['ipmMaskReg', '$ipmMaskReg'], // 1.1.1.1/23 || 1.1.1.1/32(ip/mask)
  ['ipMaskReg', '$ipMaskReg'], // 1.1.1.1 || 1.1.1.1/12(ip4/掩码规则 或 ipv4格式)
  ['SDDReg', '$SDDReg'], // 1.1.1.1 2.2.2.2(ip 空格 ip)
  ['SUBNETReg', '$SUBNETReg'], // 1.1.1.1 2.2.2.2 || 1.1.1.1/12((ip 空格 ip )或者 (ip/mask))
  ['ipsReg', '$ipsReg'], // 1-12/12/23.*.12.255p
  ['ipIpsReg', '$ipIpsReg'], //  (1.1.1.1-2.2.2.2) || (1-12/12/23.*.12.255p)
  ['ipSimpleReg', '$ipSimpleReg'], // 1.1.1.1 || 1.1.1.1/32
  ['portReg', '$portReg'], // 1-65535
  // ? 公共方法
  ['encryption', '$encryption'], // 加密
  ['toLocal', '$toLocal'], // 转本地
  ['toISO', '$toISO'], // 转ISO
  ['templateFileDownload', '$templateFileDownload'], // 下载模版
  ['downloadFile', '$downloadFile'], // 下载文件
  ['apiSorter', '$apiSorter'], // 排序
  ['apiChange', '$apiChange'], // 排序
  ['debounce', '$debounce'], // 防抖
  ['TW', '$TW'], // table width config
  // globalStore
  ['getDictStore', '$getDictStore'], // 获取字典
  ['getPersonStore', '$getPersonStore'], // 获取所有人员字典
  ['getOrgStore', '$getOrgStore'], // 获取所有组织字典
  ['getToken', '$getToken'], // 获取Token
  ['getUserStore', '$getUserStore'], //  获取当前用户信息
  // hook
  ['getBaseRoute', '$getBaseRoute'], // 获取路由
  ['urlMapQuery', '$urlMapQuery'], // 路径转对象
  ['linkageHookTable', '$linkageHookTable'], // table级联
  ['linkageHook', '$linkageHook'], // from级联
  ['homePage', '$homePage'], // from级联
  ['modalPage', '$modalPage'], // from级联
  ['defineForm', '$defineForm'],
  ['defineTable', '$defineTable'],
  ['defineColumnsList', '$defineColumnsList'],
  ['defineFieldList', '$defineFieldList'],
  ['defineFormModel', '$defineFormModel'],
  ['defineTableModel', '$defineTableModel'],
  ['formRef', '$formRef'],
  ['tableRef', '$tableRef'],
  ['omit', '$omit'],
] as any
