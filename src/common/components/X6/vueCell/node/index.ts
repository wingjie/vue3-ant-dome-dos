import { h } from 'vue'
import Components from './cell.vue'
// import portConfig from '../port'

export default {
  config: {
    inherit: 'vue-shape',
    label: 'test',
    width: 66,
    height: 36,
    data: {
      cell: {
        label: 'gateway',
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
