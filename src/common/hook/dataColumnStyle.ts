import { h } from 'vue'

export default function renderStatus(rowData: any, referValues: any) {
  const { text, value } = rowData
  let className = 'data-col-status'
  const styleType = referValues ? referValues[value] : 'n'
  switch (styleType) {
    case 'g':
      className += ' s'
      break
    case 'r':
      className += ' e'
      break
    case 'y':
      className += ' w'
      break
    case 'n':
      className += ''
      break
    case 'b':
      className += ' i'
      break
    default:
      className = ''
  }
  return h('span', { class: className, innerHTML: text })
}
