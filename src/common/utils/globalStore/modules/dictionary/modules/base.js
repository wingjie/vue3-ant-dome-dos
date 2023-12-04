import splicing from '@/common/utils/commonWay/splicingStr'

const pass = 'pass-base:'
const Base = 'Base_'
const dictBase = {
  DictMenuType: 'dictMenuType', // 字典菜单
  DictValueType: 'dictValueType', // 字典值
}

export default splicing(dictBase, Base, pass)
