/* eslint-disable no-plusplus */
let reqNum: number = 0

export default {
  start() {
    if (reqNum === 0) {
      // console.log('开始loading')
    }
    reqNum += 1
  },
  close() {
    if (reqNum <= 0) return
    if (reqNum === 0) {
      reqNum -= 1
      // console.log('结束loading')
    }
  },
  end() {
    // 延迟 300ms 再调用 close 方法, 合并300ms内的请求
    setTimeout(this.close, 300)
  },
}
