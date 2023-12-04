/* eslint-disable no-bitwise */
import { validatorType } from '@/common/componentsFn/propType/form'
import urlValid from '@/common/utils/validate-rule/url'

export { cronReg } from '@/common/utils/validate-rule/cron'

// ? 网址
export const urlReg = urlValid()

// ? ip的节点（0-255）
const ipNodeStr = `(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))`
// const ipNodeUnit = new RegExp(`^${ipNodeStr}$`)

// ? 掩码 (0-32)
const maskRegUnit = /([1-2]\d|3[0-2]|\d)/

// !ANY
const ANYStr = '(Any)'
export const ANYReg = new RegExp(`^${ANYStr}$`)

// ! ADDR
// ? ip4 ADDR
// todo 例: 1.1.1.1
const ipStr = `(${ipNodeStr}(\\.${ipNodeStr}){3})`
export const ipReg = new RegExp(`^${ipStr}$`)

// ! RANGE(P)
// ? 1.1.1.1-2.2.2.2
const ipIpStr = `(${ipStr}-${ipStr})`
export const ipIpReg = new RegExp(`^${ipIpStr}$`)

// ? ip/mask
// todo 例: 1.1.1.1/23 || 1.1.1.1/32
const ipMaskStr = `(${ipStr}\\/${maskRegUnit.source})`
export const ipmMaskReg = new RegExp(`^${ipMaskStr}$`)

// ? ip4/掩码规则 或 ipv4格式
// todo 例: 1.1.1.1 || 1.1.1.1/12
const ipMaskRegStr = `(${ipStr}|${ipMaskStr})`
export const ipMaskReg = new RegExp(`^${ipMaskRegStr}$`)

// ! WC
// ? ip 空格 ip
// todo 例: 1.1.1.1 2.2.2.2
const SDDStr = `(${ipStr} ${ipStr})`
export const SDDReg = new RegExp(`^${SDDStr}$`)

// ! SUBNET
// ? (ip 空格 ip )或者 (ip/mask)
// todo 例: 1.1.1.1 2.2.2.2 || 1.1.1.1/12
const SUBNETStr = `(${SDDStr}|${ipMaskRegStr})`
export const SUBNETReg = new RegExp(`^${SUBNETStr}$`)

// ! PR
// todo 例: 1-12/12/23.*.12.255p
// ? 2/3/4/5(斜杠任意多个)
const ipsNodeSlashUnitStr = `(${ipNodeStr}(\\/${ipNodeStr})*)`
// ? 2/3/4-5/6/7（（斜杠任意多个）为整体，再0个或一个横杠（斜杠任意多个）为整体）
const ipsNodeRailUnitStr = `(${ipsNodeSlashUnitStr}(-${ipsNodeSlashUnitStr})?)`
// ? 2/3/4-5/6/7-9/10/23（-不能连续出现）
const ipsNodeRailSlashUnitStr = `(${ipsNodeRailUnitStr}(\\/${ipsNodeRailUnitStr})*)`
const ipsNodeUnitStr = `((${ipsNodeRailSlashUnitStr})|(\\*))`
const ipsStr = `(((${ipsNodeUnitStr})(\\.${ipsNodeUnitStr}){3})P?)`
export const ipsReg = new RegExp(`^(${ipsStr})$`)

// ? (1.1.1.1-2.2.2.2) || (1-12/12/23.*.12.255p)
const ipIpsStr = `((${ipIpStr})|(${ipsStr}))`
export const ipIpsReg = new RegExp(`^${ipIpsStr}$`)

// ? 纯ipV4 或 ipV4/32
// todo 例: 1.1.1.1 || 1.1.1.1/32
const ipSimpleStr = `${ipStr}(/32)?`
export const ipSimpleReg = new RegExp(`^${ipSimpleStr}$`)

// ? 端口号
// todo 例: 1-65535
export const portReg =
  /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

const lRule = '[,|\n]'
const lRuleReg = new RegExp(lRule)

// ! ************ 校验区域 ********************
// validIp

const ruleObj: { [pv: string]: string } = {
  A: ipStr,
  S: SUBNETStr,
  R: ipIpStr,
  W: SDDStr,
  P: ipsStr,
  Y: ANYStr,
}
export function valid(
  type: 'ASRWYPL' | string = 'ASRWYPL',
  resType?: 'fn' | 'reg'
): validatorType | any {
  const typeReg = /^[ASRWYPL]*$/g
  if (!typeReg.test(type?.toUpperCase())) {
    // throw new Error(`${type}中每个字符必须包含在'ASRWYL'这几个字符中`)
    console.warn(`${type}中每个字符必须包含在'ASRWYPL'这几个字符中`)
  }
  let typeM = type?.toUpperCase()

  const isL = type?.toUpperCase().includes('L')
  if (isL) {
    typeM = type.replace(/L/g, '')
  }
  const typeMap = Array.from(typeM)
    .map((key: string) => ruleObj[key])
    .join('|')
  const ruleStr = isL ? `(((${typeMap})(${lRule}*))*)` : `(${typeMap})`
  if (resType === 'reg') {
    return new RegExp(`^${ruleStr}$`)
  }
  return async function fn(_rule: any, value: string) {
    const ruleReg = new RegExp(`^${ruleStr}$`)
    // console.log('ruleStr', ruleStr, ruleReg)
    const bool = ruleReg.test(value)
    if (value && !bool) {
      return Promise.reject(new Error('格式错误'))
    }
    const formatVal = value ? value.split(lRuleReg) : []
    const setFormatVal = [...new Set(formatVal)]
    if (formatVal.length !== setFormatVal.length) {
      return Promise.reject(new Error('数据重复'))
    }
    return Promise.resolve(true)
  }
}

// ? ip校验/掩码，并且有通配符 （多个）
// todo 例: 1.1.1.1-2.2.2.2 || 1.*.34/45/56.23-24, 1.1.1.1-2.2.2.2
export const validIpIpsReg: validatorType = async (_rule, value: string) => {
  const formatVal = value ? value.split(',') : []
  const bool = formatVal.every((item: string) => ipIpsReg.test(item))
  if (value && !bool) {
    return Promise.reject(new Error('格式错误'))
  }
  const setFormatVal = [...new Set(formatVal)]
  if (formatVal.length !== setFormatVal.length) {
    return Promise.reject(new Error('数据重复'))
  }
  return Promise.resolve(true)
}
// ? ip校验/掩码，并且有通配符 （多个,可以空格、逗号、｜分割）
// todo 例: 1.1.1.1-2.2.2.2 || 1.*.34/45/56.23-24, 1.1.1.1-2.2.2.2 ｜ 1.1.1.1-2.2.2.2
export const validIpIpsNewLineReg: validatorType = async (
  _rule,
  value: string
) => {
  const formatVal = value ? value.split(/[,|\n]/) : []
  const bool = formatVal.every((item: string) => ipIpsReg.test(item))
  if (value && !bool) {
    return Promise.reject(new Error('格式错误'))
  }
  const setFormatVal = [...new Set(formatVal)]
  if (formatVal.length !== setFormatVal.length) {
    return Promise.reject(new Error('数据重复'))
  }
  return Promise.resolve(true)
}

// ? ip校验/掩码（掩码必写）（单个）
// todo 例: 1.1.1.1/23 || 1.1.1.1/32
export const validIp: validatorType = async (_rule, value: string) => {
  const bool = ipmMaskReg.test(value)
  if (value && !bool) {
    return Promise.reject(new Error('格式错误'))
  }
  return Promise.resolve(true)
}
// ? ip校验/掩码（多个掩码必写，以‘,’隔开）（多个）
// todo 例: 1.1.1.1/23, 1.1.1.1/32 || 1.1.1.1/32
export const validIpAndMasks: validatorType = async (_rule, value: string) => {
  const formatVal = value ? value.split(',') : []
  const bool = formatVal.every((item: string) => ipmMaskReg.test(item))
  if (value && !bool) {
    return Promise.reject(new Error('格式错误'))
  }
  const setFormatVal = [...new Set(formatVal)]
  if (formatVal.length !== setFormatVal.length) {
    return Promise.reject(new Error('数据重复'))
  }
  return Promise.resolve(true)
}
// ? ip/掩码校验 单个ip验证 （单个）
// todo 例: 1.1.1.1, 1.1.1.1/23, 1.1.1.1/32
export const validIpMaskAlone: validatorType = async (_rule, value: string) => {
  const bool = ipMaskReg.test(value)
  if (value && !bool) {
    return Promise.reject(new Error('格式错误'))
  }
  return Promise.resolve(true)
}
// ? ip/掩码校验 多个ip验证,以逗号隔开 （多个）
// todo 例: 1.1.1.1, 1.1.1.1/23, 1.1.1.1/32
export const validIpMask: validatorType = async (_rule, value: string) => {
  const formatVal = value ? value.split(',') : []
  const bool = formatVal.every((item: string) => ipMaskReg.test(item))
  if (value && !bool) {
    return Promise.reject(new Error('格式错误'))
  }
  const setFormatVal = [...new Set(formatVal)]
  if (formatVal.length !== setFormatVal.length) {
    return Promise.reject(new Error('数据重复'))
  }
  return Promise.resolve(true)
}
// ? 纯ipV4 或 ipV4/32 （单个）
// todo 例: 1.1.1.1 || 1.1.1.1/32
export const validIpSimple: validatorType = async (_rule, value: string) => {
  const bool = ipSimpleReg.test(value)
  if (value && !bool) {
    return Promise.reject(new Error('格式错误'))
  }
  return Promise.resolve(true)
}
// ? 多个端口号或者端口段, 以逗号隔开 （多个）
// todo 例: 23(1-65535), 2-22
export const validPort: validatorType = async (_rule, value: string) => {
  let arr: any
  if (typeof value === 'string' || typeof value === 'number') {
    arr = value ? value.toString().split(',') : []
  } else {
    arr = value
  }
  arr = arr?.map((item: string) => item?.toString().split('-')).flat(Infinity)
  const bool = arr?.every((item: string) => portReg.test(item) || item === '')
  if (value && !bool) {
    return Promise.reject(new Error('范围或格式错误'))
  }
  return Promise.resolve(true)
}
// ! ************ 校验区域end ********************

// ! ************ 判断区域start ********************//
// todo 例: (1.1.1.1-2.2.2.2) || (1-12/12/23.*.12.255)
export const isIpIpsReg = (value: string) => {
  const formatVal = value ? value.split(',') : []
  const bool = formatVal.every((item: string) => ipIpsReg.test(item))
  if (value && !bool) {
    return false
  }
  const setFormatVal = [...new Set(formatVal)]
  if (formatVal.length !== setFormatVal.length) {
    return false
  }
  return true
}
// ? 判断是否是ipv4格式 （单个）
// todo 例: 1.1.1.1/23 || 1.1.1.1/32
export const isIpmMaskReg = (value: string) => {
  const formatVal = value ? value.split(',') : []
  const bool = formatVal.every((item: string) => ipmMaskReg.test(item))
  if (value && !bool) {
    return false
  }
  const setFormatVal = [...new Set(formatVal)]
  if (formatVal.length !== setFormatVal.length) {
    return false
  }
  return true
}
// ? 判断是否是ipv4格式 （单个）
// todo 例： 1.1.1.1
export function isInet4Ip(ipv4: string) {
  return ipReg.test(ipv4)
}
// ? 判断是否是ipv4格式  多个ip验证,以逗号隔开 （多个）
// todo 例: 1.1.1.1, 1.1.1.1/23, 1.1.1.1/32
export function isIpMasks(ipv4s: string) {
  const formatVal = ipv4s.split(',')
  return formatVal.every((item: any) => ipMaskReg.test(item))
}

// 判断是否是 网络地址/标识位格式
// todo 例: (1.1.1.1/23 || 1.1.1.1/32) && 符合算法规则
export function isInet4Subnet(subnet: string) {
  // 如果入参是0.0.0.0/0，不经过代码逻辑验证直接返回true
  if (subnet === '0.0.0.0/0') {
    return true
  }
  // 使用正则匹配ipv4/mask,不匹配正则直接返回false
  if (!ipmMaskReg.test(subnet)) {
    return false
  }
  // 验证address中“/”左侧是否是网络地址，逻辑：截取address中“/”左侧的ip与address中"/"右侧的掩码相与，看结果是否等于ip本身
  const subnetSplit = subnet.split('/')
  const maskIp: any = inet4SubnetMaskIntToString(subnetSplit[1])
  const networkAddressSplit = subnetSplit[0].split('.')
  const maskIpSplit = maskIp.split('.')
  let count = 0
  // 将网络地址的每一个字节和掩码的每一个字节分别做与运算，看结果是否等于网络地址本身
  for (let i = 0; i < 4; i++) {
    if (
      (parseInt(networkAddressSplit[i], 10) & parseInt(maskIpSplit[i], 10)) ===
      parseInt(networkAddressSplit[i], 10)
    ) {
      // 如果等于，累加器加1
      count += 1
    }
  }
  // 当count等于4，则ip在网络地址中
  return count === 4
}
// ? 把不规范的网络地址改为网络地址/标识位
// todo 例: (1.1.1.1/23 || 1.1.1.99/32)
export function mapInet4Subnet(subnet: string): string {
  const subnetSplit = subnet.split('/')
  const maskIp: any = inet4SubnetMaskIntToString(subnetSplit[1])
  const networkAddressSplit = subnetSplit[0].split('.')
  const maskIpSplit = maskIp.split('.')
  let str = ''
  // 将网络地址的每一个字节和掩码的每一个字节分别做与运算，看结果是否等于网络地址本身
  for (let i = 0; i < 4; i++) {
    str += `${
      parseInt(networkAddressSplit[i], 10) & parseInt(maskIpSplit[i], 10)
    }${i < 3 ? '.' : ''}`
  }
  return `${str}/${subnetSplit[1]}`
}
// ? 判断一个 ip || 网络地址/标识位集合（子集） 是否属于另一个 网络地址/标识位（父集）some,子集有一个命中返回true
export function isInet4SubnetBelongSubnetSome(
  sonSubnet: (string | number)[],
  dadSubnet: (string | number)[]
) {
  return sonSubnet.some((sonItem: any) => {
    return dadSubnet.some((dadItem: any) => {
      return isAddressBelongAddress(sonItem, dadItem)
    })
  })
}
// ? 判断一个 ip || 网络地址/标识位集合（子集） 是否属于另一个 网络地址/标识位（父集）every,子集 全部 命中才返回true
export function isInet4SubnetBelongSubnetEvery(
  sonSubnet: (string | number)[],
  dadSubnet: (string | number)[]
) {
  return sonSubnet.every((sonItem: any) => {
    return dadSubnet.some((dadItem: any) => {
      return isAddressBelongAddress(sonItem, dadItem)
    })
  })
}
// 包装方法，输入参数的格式可以为ip,网段（可能是不规范的）
function isAddressBelongAddress(address1: string, address2: string) {
  // 如果参数1是IP，参数2也是IP，就判断是否相等
  if (isInet4Ip(address1) && isInet4Ip(address2)) {
    return address1 === address2
  }
  // 如果参数1是IP，参数2是网段（可能是不规范的）
  if (isInet4Ip(address1) && ipMaskReg.test(address2)) {
    return isInet4IpBelongSubnet(address1, mapInet4Subnet(address2))
  }
  // 如果参数1是网段（可能是不规范的），参数2是IP，就把IP还原成IP/32，判断是否相等
  if (ipMaskReg.test(address1) && isInet4Ip(address2)) {
    return mapInet4Subnet(address1) === mapInet4Subnet(`${address2}/32`)
  }
  // 如果参数1和参数2都是网段（可能是不规范的）
  if (ipMaskReg.test(address1) && ipMaskReg.test(address2)) {
    return isInet4SubnetBelongSubnet(
      mapInet4Subnet(address1),
      mapInet4Subnet(address2)
    )
  }
  // console.warn(
  //   `入参必须是ip和网络地址/标识位格式: ` +
  //     `address1:${address1},address2:${address2}`
  // )
}
// ? 判断ip是否属于网段  是否属于另一个 网络地址/标识位（父集）
export function isInet4IpBelongSubnet(ip: string, subnet: string) {
  if (!isInet4Ip(ip) || !isInet4Subnet(subnet)) {
    return
    // console.warn(
    //   `入参必须是ip和网络地址/标识位格式: ip:${ip},subnet:${subnet}`
    // )
  }
  const subnetSplit = subnet.split('/')
  const maskIp: string | undefined = inet4SubnetMaskIntToString(subnetSplit[1])
  const networkAddressSplit = subnetSplit[0].split('.')
  const maskIpSplit: any = maskIp?.split('.')
  const ipSplit = ip.split('.')
  // 将ip的每一个字节和掩码的每一个字节分别做与运算，看结果是否等于网络地址的每一个字节
  let count = 0
  for (let i = 0; i < 4; i++) {
    if (
      (parseInt(ipSplit[i], 10) & parseInt(maskIpSplit[i], 10)) ===
      parseInt(networkAddressSplit[i], 10)
    ) {
      // 如果等于，累加器加1
      count += 1
    }
  }
  // 当count等于4，则ip在网络地址中
  return count === 4
}
// ? 判断一个 网络地址/标识位 是否属于另一个 网络地址/标识位
export function isInet4SubnetBelongSubnet(
  sonSubnet: string,
  dadSubnet: string
) {
  if (!isInet4Subnet(sonSubnet) || !isInet4Subnet(dadSubnet)) {
    // console.warn(
    //   `两个入参必须都是网络地址/标识位格式: ` +
    //     `sonSubnet:${sonSubnet},dadSubnet:${dadSubnet}`
    // )
    return
  }
  const sonSubnetSplit = sonSubnet.split('/')
  const dadSubnetSplit = dadSubnet.split('/')
  const sonIpSplit: any = sonSubnetSplit[0].split('.')
  const dadIpSplit: any = dadSubnetSplit[0].split('.')
  let sonIpBinary = ''
  let dadIpBinary = ''
  for (let i = 0; i <= 3; i++) {
    // 将10进制转换为2进制，并补全前面的0
    let binary = parseInt(sonIpSplit[i], 10).toString(2)
    const count = 8 - binary.length
    for (let j = 0; j < count; j++) {
      binary = `0${binary}`
    }
    sonIpBinary += binary
  }
  for (let i = 0; i <= 3; i++) {
    // 将10进制转换为2进制，并补全前面的0
    let binary = parseInt(dadIpSplit[i], 10).toString(2)
    const count = 8 - binary.length
    for (let j = 0; j < count; j++) {
      binary = `0${binary}`
    }
    dadIpBinary += binary
  }

  const sonLength = parseInt(sonSubnetSplit[1], 10)
  const dadLength = parseInt(dadSubnetSplit[1], 10)
  const isEqual =
    sonIpBinary.substring(0, dadLength) === dadIpBinary.substring(0, dadLength)
  return sonLength >= dadLength && isEqual
}
// ! ************ 判断区域end ********************

// ! ************ 转换函数start ******************** //
// ? 将标识位格式的掩码转换为点分十进制
export function inet4SubnetMaskIntToString(lengthStr: string) {
  const length = parseInt(lengthStr, 10)
  // 如果length<0或者length>32，抛出非法参数异常
  if (length < 0 || length > 32) {
    return
    // throw new Error(`标识位必须大于等于0，小于等于32 : ${length}`)
  }
  // 如果length=0,不经过代码逻辑验证直接返回0.0.0.0
  if (length === 0) {
    return '0.0.0.0'
  }
  const mask = -1 << (32 - length)
  const partsNum = 4
  const bitsOfPart = 8
  const maskParts = new Array(partsNum)
  const selector = 0x000000ff
  for (let i = 0; i < maskParts.length; i++) {
    const pos = maskParts.length - 1 - i
    maskParts[pos] = (mask >> (i * bitsOfPart)) & selector
  }
  let result = ''
  const dot = '.'
  result += maskParts[0]
  for (let i = 1; i < maskParts.length; i++) {
    result = result + dot + maskParts[i]
  }
  return result
}
