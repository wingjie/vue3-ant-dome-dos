import { getDictStore } from '@/common/utils/globalStore'

// 根据层级网的value解析层级网数据的label
export function analysisLevelNet(value: string, dictType: string) {
  return new Promise((resolve) => {
    getDictStore(getDictStore[dictType]).then((levelData: any) => {
      const { levelNets } = levelData
      const itemList: any = []
      levelNets.forEach((level: any) => {
        itemList.push(...level.levelNetItems)
      })
      const match = itemList.find((i: any) => i.value === value)
      resolve(match || null)
    })
  })
}
// 根据jsonMenus数据解析对应的翻译显示属性
export function analysisJsonMenu(jsonObject: any, dictType: string) {
  return new Promise((resolve) => {
    let objValue: any = {}
    try {
      objValue = JSON.parse(jsonObject)
    } catch (e) {
      console.warn(e)
      resolve([])
      return
    }
    if (jsonObject && objValue) {
      const result: any = []
      getDictStore(getDictStore[dictType]).then((resp: any) => {
        const allAPi = []
        const json = resp.json ? JSON.parse(resp.json) : []
        // eslint-disable-next-line guard-for-in
        for (const jKey in objValue) {
          const jValue = objValue[jKey]
          const matchOrigin = json.find((i: any) => i.name === jKey)
          const juniorType = matchOrigin?.menuName
          const pushData = {
            key: jKey,
            displayKey: matchOrigin?.displayName,
            value: jValue,
            displayValue: jValue,
          }
          result.push(pushData)
          allAPi.push(getDictStore(juniorType))
        }
        Promise.all(allAPi).then((apiResp: any) => {
          const juniorList: any = []
          apiResp.forEach((ar: any) => {
            juniorList.push(...ar.menuItems)
          })
          result.forEach((rItem: any) => {
            const { value } = rItem
            const match = juniorList.find((j: any) => j.value === value)
            if (match) {
              rItem.displayValue = match.label
            }
          })
          resolve(result)
        })
      })
    } else {
      resolve([])
    }
  })
}
