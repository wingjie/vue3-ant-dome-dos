import splicing from '@/common/utils/commonWay/splicingStr'

const pass = 'paas-auto:'
const Base = 'Auto_'
const dictBase = {
  Vendor: 'vendor', // 厂商
  SoftwarePlatform: 'softwarePlatform', // 软件平台
  DeviceType: 'deviceType', // 设备类型
  Channel: 'channel', // 通道和协议
  AuthorityLevel: 'authorityLevel', // 权限级别
  AuthType: 'authType', // 协议类型
  DriverDeviceGroup: 'driverDeviceGroup', // 驱动组
  AutheProtocol: 'autheProtocol', // SNMPV3认证协议
  EncryptionProtocol: 'encryptionProtocol', // SNMPV3加密协议
  PythonProjectType: 'pythonProjectType', // 	pythonProject模式
}

export default splicing(dictBase, Base, pass)
