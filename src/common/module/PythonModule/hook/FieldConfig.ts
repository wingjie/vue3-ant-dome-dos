import { getDictStore } from '@/common/utils/globalStore'

// python模式 PythonProjectType
// eslint-disable-next-line import/prefer-default-export
export const pythonProjectTypeDict = async () => {
  const options = await getDictStore(getDictStore.Auto_PythonProjectType)
  return options?.menuItems
}
