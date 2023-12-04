import { h } from 'vue'
import Components from './cell.vue'
// import portConfig from '../port'

export default {
  config: {
    inherit: 'vue-shape',
    width: 66,
    height: 36,
    data: {
      cell: {
        label: 'event',
      },
    },
    ports: {},
    component: {
      render: () => {
        return h(Components)
      },
    },
  },
  threeArgument: true,
}
