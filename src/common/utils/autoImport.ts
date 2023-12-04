import { timeParse } from '@/common/utils/commonWay'

export { omit } from 'lodash-es'

export {
  assign, // 机制跟object.assign一样，false也会被合并
  // assignTruthy, // 值合并truthy的值
  typeOf, // 精准判断数据类型
  S4, // 生成唯一的数
  deepCopy, // 深拷贝数组的额外值页能被拷贝
  cloneDeep, // 深拷贝
  forEach, // 遍历大对象
  find, // 通过id找到自身对象和父级对象或数组
  findOwn, // 通过id找到自身对象
  findParent, // 通过id找到父级对象或数组
  findParents,
  mapFilter,
  getUUID,
} from '@/common/utils/traverseTree'
export {
  valid, // 入参 A S R W P Y
  validIpIpsReg, // todo 例: 1.1.1.1-2.2.2.2 || 1.*.34/45/56.23-24, 1.1.1.1-2.2.2.2  ip校验/掩码，并且有通配符 （多个）
  validIpIpsNewLineReg, // todo 例: 1.1.1.1-2.2.2.2 || 1.*.34/45/56.23-24, 1.1.1.1-2.2.2.2 ｜ 1.1.1.1-2.2.2.2   ip校验/掩码，并且有通配符 （多个,可以空格、逗号、｜分割）
  validIp, // todo 例: 1.1.1.1/23 || 1.1.1.1/32  ip校验/掩码（掩码必写）（单个）
  validIpAndMasks, // todo 例: 1.1.1.1/23, 1.1.1.1/32 || 1.1.1.1/32  ip校验/掩码（多个掩码必写，以‘,’隔开）（多个）
  validIpMaskAlone, // todo 例: 1.1.1.1, 1.1.1.1/23, 1.1.1.1/32 ip/掩码校验 单个ip验证 （单个）
  validIpMask, // todo 例: 1.1.1.1, 1.1.1.1/23, 1.1.1.1/32 ip/掩码校验 多个ip验证,以逗号隔开 （多个）
  validIpSimple, // todo 例: 1.1.1.1 || 1.1.1.1/32 纯ipV4 或 ipV4/32 （单个）
  validPort, // todo 例: 23(1-65535), 2-22 多个端口号或者端口段, 以逗号隔开 （多个）
  isIpIpsReg, // todo 例: (1.1.1.1-2.2.2.2) || (1-12/12/23.*.12.255)
  isIpmMaskReg, // todo 例: 1.1.1.1/23 || 1.1.1.1/32 判断是否是ipv4格式 （单个）
  isInet4Ip, // todo 例： 1.1.1.1 判断是否是ipv4格式 （单个）
  isIpMasks, // todo 例: 1.1.1.1, 1.1.1.1/23, 1.1.1.1/32 判断是否是ipv4格式  多个ip验证,以逗号隔开 （多个）
} from '@/common/utils/validate'
export {
  ipReg, // 1.1.1.1
  ipIpReg, // 1.1.1.1-2.2.2.2
  ipmMaskReg, // 1.1.1.1/23 || 1.1.1.1/32(ip/mask)
  ipMaskReg, // 1.1.1.1 || 1.1.1.1/12(ip4/掩码规则 或 ipv4格式)
  SDDReg, // 1.1.1.1 2.2.2.2(ip 空格 ip)
  SUBNETReg, // 1.1.1.1 2.2.2.2 || 1.1.1.1/12((ip 空格 ip )或者 (ip/mask))
  ipsReg, // 1-12/12/23.*.12.255p
  ipIpsReg, //  (1.1.1.1-2.2.2.2) || (1-12/12/23.*.12.255p)
  ipSimpleReg, // 1.1.1.1 || 1.1.1.1/32
  portReg, // 1-65535
} from '@/common/utils/validate'

export {
  downloadFile, // 下载文件
  timeParse,
  getDictSelect,
  getDictSelectMap,
  validatePromiseAll,
  templateFileDownload,
  TW,
  customRender,
  apiSorter,
  apiChange,
  debounce,
  encryption,
} from '@/common/utils/commonWay'

export const { toLocal } = timeParse
export const { toISO } = timeParse

export {
  getDictStore,
  getPersonStore,
  getOrgStore,
  getToken,
  setToken,
  setPublicKey,
  getPublicKey,
  getUserStore,
  setUserStore,
  getOperateStore,
  clearGlobalStore,
} from '@/common/utils/globalStore'

// export { getDictStore } from '@/utils/dictStore'

export {
  getBaseRoute,
  urlMapQuery,
  linkageHookTable,
  linkageHook,
  homePage,
  modalPage,
} from '@/common/hook'

export {
  defineForm,
  defineTable,
  defineColumnsList,
  defineFieldList,
  defineFormModel,
  defineTableModel,
  formRef,
  tableRef,
} from '@/common/utils/define'
