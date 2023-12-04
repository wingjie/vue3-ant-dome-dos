// eslint-disable-next-line import/prefer-default-export
export function debounce(fn: Function, timer: number, immediate = true) {
  let time = 0
  const clearImmediate = immediate
  return function bar(...e: any[]) {
    if (!immediate) {
      if (time) {
        clearInterval(time)
      }
      time = setTimeout(() => {
        fn(...e)
        if (clearImmediate) {
          immediate = true
        }
      }, timer)
    } else {
      fn(...e)
      immediate = false
      time = setTimeout(() => {
        immediate = true
      }, timer)
    }
  }
}
