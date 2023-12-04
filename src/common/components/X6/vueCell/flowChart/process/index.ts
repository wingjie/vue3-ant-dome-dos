import { h } from 'vue'
import Components from './cell.vue'
import config from '../config'
import { assign } from '@/common/utils/autoImport'

const data = assign({}, config, {
  config: {
    inherit: 'vue-shape',
    label: 'test',
    width: 80,
    height: 80,
    data: {
      cell: {
        label: 'gateway',
      },
    },
    component: {
      render: () => {
        return h(Components)
      },
    },
  },
})
export default data
