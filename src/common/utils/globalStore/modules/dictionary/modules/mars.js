import splicing from '@/common/utils/commonWay/splicingStr'

const pass = 'saas-mars:'
const Base = 'MARS_'
const dictBase = {
  DictDeviceType: 'deviceType', // 设备类型
  DictVendor: 'vendor', // 厂商联动
}

export default splicing(dictBase, Base, pass)
