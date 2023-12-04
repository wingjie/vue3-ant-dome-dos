import ipam from '@/common/utils/globalStore/modules/dictionary/modules/ipam.js'
import fare from '@/common/utils/globalStore/modules/dictionary/modules/fara.js'
import cdbSw from '@/common/utils/globalStore/modules/dictionary/modules/cdb-sw.js'
import base from '@/common/utils/globalStore/modules/dictionary/modules/base.js'
import mars from '@/common/utils/globalStore/modules/dictionary/modules/mars.js'
import auto from '@/common/utils/globalStore/modules/dictionary/modules/auto.js'
import dcnac from '@/common/utils/globalStore/modules/dictionary/modules/dcnac.js'
import auto2 from '@/common/utils/globalStore/modules/dictionary/modules/auto2.js'
import { assign } from '@/common/utils/traverseTree/assign.js'

export const dictMap = assign(
  {},
  base,
  fare,
  cdbSw,
  ipam,
  mars,
  auto,
  auto2,
  dcnac
)
export default {
  dictMap,
}
