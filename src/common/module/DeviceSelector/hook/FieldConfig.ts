import { getDictStore } from '@/common/utils/globalStore'
import LinkageDeviceHook from '@/common/hook/deviceLinkageHook'

// 设备类型
// eslint-disable-next-line import/prefer-default-export
export const deviceTypeDict = async () => {
  const options = await getDictStore(getDictStore.Auto2_DeviceType)
  return options?.menuItems
}

export const LinkageDeviceHookTable = () => {
  return LinkageDeviceHook([
    {
      title: '厂商',
    },
    {
      title: '软件平台',
    },
    {
      title: '软件版本',
    },
  ])
}
