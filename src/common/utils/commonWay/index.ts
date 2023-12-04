import downloadFile from '@/common/utils/commonWay/downloadFile'
import timeParse from '@/common/utils/commonWay/timeParse'
import getDictSelect, {
  getDictSelectMap,
} from '@/common/utils/commonWay/getDictSelect'
import validatePromiseAll from '@/common/utils/commonWay/validatePromiseAll'
import templateFileDownload from '@/common/utils/commonWay/templateFileDownload'
import TW from '@/common/utils/commonWay/tableWidth'
import { customRender } from '@/common/utils/commonWay/customRender'
import { debounce } from '@/common/utils/commonWay/optimize'
import apiSorter, { apiChange } from '@/common/utils/commonWay/apiSorter'
import encryption from '@/common/utils/commonWay/encryption'
import { columns as antToElementC } from '@/common/utils/commonWay/antToElement'

export {
  downloadFile,
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
  antToElementC,
}
