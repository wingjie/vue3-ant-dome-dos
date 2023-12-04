import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'

// eslint-disable-next-line import/no-mutable-exports
let qiankunProps: any = null

function initMicro(render: any) {
  let instance: any
  // eslint-disable-next-line no-underscore-dangle
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    instance = render()
  } else {
    renderWithQiankun({
      mount(props) {
        console.log('venusAPP--mount')
        qiankunProps = props
        instance = render(props)
      },
      bootstrap() {
        console.log('venusAPP--bootstrap')
      },
      update() {
        console.log('venusAPP--update')
      },
      unmount() {
        console.log('venusAPP--unmount')
        instance?.unmount()
      },
    })
  }
}
function setDataToFoundation(data: any) {
  qiankunProps.setGlobalState(data)
}
export { initMicro, setDataToFoundation, qiankunProps }
