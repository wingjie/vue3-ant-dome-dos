/* eslint-disable import/no-extraneous-dependencies */
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { h, createVNode } from 'vue'

const showConfirm = (title: any, data?: object[], options?: any) => {
  options = options || {}
  const obj: any = []
  if (data) {
    obj.push(
      ...data.map((i: any) => {
        if (i.text) {
          return h('div', `${i.text}`)
        }
        return h('div', { style: '' }, `${i.label}: ${i.value}`)
      })
    )
  }
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title,
      icon: createVNode(options.icon || ExclamationCircleOutlined),
      content: createVNode('div', { style: '' }, obj),
      onOk() {
        console.log('OK')
        resolve(true)
      },
      onCancel() {
        console.log('Cancel')
        reject()
      },
      class: 'test',
    })
  })
}
export default showConfirm
