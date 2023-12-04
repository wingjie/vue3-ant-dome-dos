// import { getPersonStore } from '@/common/utils/globalStore/index.js'
import { getDictStore } from '@/utils/dictStore/index'
// import $store from '@/store'

// snmp 命令
export const snmpPduTypeDict = async () => {
  const options = await getDictStore(getDictStore.Auto2_SnmpPduType)
  return options?.menuItems
}

// 设备类型
export const deviceTypeDict = async () => {
  const options = await getDictStore(getDictStore.Auto2_DeviceType)
  return options?.menuItems
}
// 权限级别
export const authorityLevelDict = async () => {
  const res = await getDictStore(getDictStore.Auto_AuthorityLevel)
  return res.menuItems
}

// 配置材料类型
export const type = async () => {
  const { menuItems = [] } = await getDictStore(
    getDictStore.Auto2_ConfigMaterialType
  )
  return menuItems
}

// http Method
export const httpMethodDict = async () => {
  const options = await getDictStore(getDictStore.Auto2_HttpRequestMethod)
  return options?.menuItems
}

// // 协议类型
// export const authTypeDict = async () => {
//   const typeOptions = await getDictStore(getDictStore.Auto_AuthType)
//   return typeOptions?.menuItems.sort((a: any, b: any) => a.order - b.order)
// }
// // 通道类型
// export const channelTypeDict = async () => {
//   const typeOptions = await getDictStore(getDictStore.Auto2_DriverProtocol)
//   return typeOptions?.menuItems.sort((a: any, b: any) => a.order - b.order)
// }

// // 更新人
// export const lastModify = async () => {
//   const persons = await getPersonStore()
//   return persons || []
// }

// // 解析材料类型
// export const parseType = async () => {
//   const { menuItems = [] } = await getDictStore(
//     getDictStore.Auto2_ParseMaterialType
//   )
//   return menuItems
// }
// // 材料状态
// export const commonStatusDict = async () => {
//   const { menuItems = [] } = await getDictStore(getDictStore.Auto2_CommonStatus)
//   return menuItems
// }

// // 驱动类型
// export const driverTypeDict = async () => {
//   const options = await getDictStore(getDictStore.Auto2_DriverType)
//   return options?.menuItems
// }

// // 场景
// export const sceneDict = async () => {
//   const options = await $store.dispatch('scene/loadScene')
//   return options.map((item: any) => ({ label: item.name, value: item.id }))
// }
// // 工具类型
// export const toolTypeDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_ToolType)
//   return options?.menuItems.sort((a: any, b: any) => a.order - b.order)
// }
// // 时间类型
// export const timeTypeDict = async () => {
//   const options = await getDictStore(getDictStore.Auto2_ScheduleType)
//   return options?.menuItems.sort((a: any, b: any) => a.order - b.order)
// }
// // 任务状态
// export const taskStatusDict = async () => {
//   const options = await getDictStore(getDictStore.Auto2_JobStatus)
//   return options?.menuItems
// }
// // 任务执行状态
// export const taskRunStatusDict = async () => {
//   const options = await getDictStore(getDictStore.Auto2_FlowJobInstanceStatus)
//   return options?.menuItems
// }
// // 作业调度状态
// export const jobStatusDict = async () => {
//   const options = await getDictStore(
//     getDictStore.Auto2_FlowJobInstanceDeviceStatus
//   )
//   return options?.menuItems
// }
// // 作业实例状态
// export const taskInstanceDict = async () => {
//   const options = await getDictStore(getDictStore.Auto2_TaskInstanceStatus)
//   return options?.menuItems
// }
// // auto2厂商
// export const vendor2Dict = async () => {
//   const options = await getDictStore(getDictStore.Auto2_Vendor)
//   return options?.menuItems
// }
// // 通道健康状态
// export const channelHealthDict = async () => {
//   const options = await getDictStore(getDictStore.Auto2_ChannelHealthStatus)
//   return options?.menuItems
// }
// // 调度目标类型
// export const ScheduleTargetTypeDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_ScheduleTargetType)
//   return options?.menuItems
// }

// // 调度类型
// export const ScheduleTypeDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_ScheduleType)
//   return options?.menuItems
// }
// // 调度状态
// export const scheduleStatusDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_ScheduleStatus)
//   return options?.menuItems
// }
// // 采控任务状态
// export const OpeJobStatusDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_OpeJobStatus)
//   return options?.menuItems
// }
// // 采控作业状态
// export const OpeTaskStatusDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_OpeTaskStatus)
//   return options?.menuItems
// }
// // 采控作业结果文本类型
// export const opeTaskResultTextTypeDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_OpeTaskResultTextType)
//   return options?.menuItems
// }
// // 获取所有区域
// export const getAllAreaOptions = async () => {
//   const options = await $store.dispatch('normal/loadArea')
//   return options
// }
// // http版本
// export const httpVersionDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_HttpVersion)
//   return options?.menuItems
// }
// // http版本
// export const snmpVersionDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_SnmpVersion)
//   return options?.menuItems
// }
// // MIB编码
// export const mibCharsetDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_SnmpVersion)
//   return options?.menuItems
// }
// // python模式 PythonProjectType
// export const pythonProjectTypeDict = async () => {
//   const options = await getDictStore(getDictStore.Auto_PythonProjectType)
//   return options?.menuItems
// }
