import { computedAsync } from '@vueuse/core'
import { getDictStore } from '@/common/utils/autoImport'
// eslint-disable-next-line import/prefer-default-export
export const engine = {
  field: {
    label: '引擎',
    key: 'engineType',
    type: 'select',
    span: 12,
    options: computedAsync(async () => {
      const res = await getDictStore('paas-auto:MaterialTemplateEngineType')
      return res.menuItems
    }),
  },
}
