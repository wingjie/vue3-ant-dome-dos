// eslint-disable-next-line import/prefer-default-export
export function customRender({ text: txt }: { text: string[] | string }) {
  return txt
  // if (!txt) {
  //   return h('div', {}, undefined)
  // }
  // let text = txt
  // if (typeof txt === 'string') {
  //   text = txt.split(',')
  // }
  // const arr = []
  // for (let i = 0; i < text.length; i++) {
  //   if (i < 2) {
  //     arr.push(h('div', {}, text[i]))
  //   } else {
  //     arr.push(h('div', {}, `${text[i]}${text.length > 3 ? '...' : ''}`))
  //     break
  //   }
  // }
  // return h('a-tooltip', { title: text }, h('div', {}, arr))
}
