import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import {
  qiankunWindow,
  renderWithQiankun,
} from 'vite-plugin-qiankun/dist/helper'

import router from '@/router/index'
import store from '@/store/index'
import directive from '@/common/directive/index'

import 'ant-design-vue/dist/antd.variable.min.css'
import '@/common/style/index.scss'
import App from './App.vue'

function render(props?: any) {
  const elementName = 'halo'
  const instance = createApp(App)
  instance.use(Antd)
  instance.use(router)
  instance.use(store)
  instance.use(directive)
  instance.mount(
    (props?.container
      ? props.container.querySelector(`#${elementName}`)
      : document.getElementById(elementName)) as Element
  )
  return instance
}
// eslint-disable-next-line no-underscore-dangle
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
} else {
  renderWithQiankun({
    mount(props) {
      console.log('marsAPP--mount')
      render(props)
    },
    bootstrap() {
      console.log('marsAPP--bootstrap')
    },
    update() {
      console.log('marsAPP--update')
    },
    unmount() {
      console.log('marsAPP--unmount')
      // instance?.unmount()
    },
  })
}

console.log('mars main.js is run')
