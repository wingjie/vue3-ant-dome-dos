import Axios from 'axios'

type reqInt = {
  cancel: () => void
}

export function cancelToken() {
  return new Axios.CancelToken((cancel: any) => {
    // cancel就是取消请求的方法
    requests.push({ cancel })
  })
}

let requests: reqInt[] = []

export function requestCancel() {
  requests.forEach((request: { cancel: () => void }) => {
    // 取消没有响应的请求
    request.cancel()
  })
  // 请求取消响应的数据
  requests = []
}
