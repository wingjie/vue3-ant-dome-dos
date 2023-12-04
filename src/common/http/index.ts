import Axios, { Method } from 'axios'
import Qs from 'qs'
import interceptor from '@/common/http/interceptors'
import { mapFilter, typeOf } from '@/common/utils/traverseTree'
import { cancelToken } from './cancelRequest'

const axios: any = Axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 30000, // 请求超时时间 30s
  paramsSerializer: (params: any) => {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  },
})

// 前置请求拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  interceptor.request.onFulfilled,
  interceptor.request.onRejected
)

// 后置响应拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  interceptor.response.onFulfilled,
  interceptor.response.onRejected
)

/**
 * @description 发起一个http请求
 *
 * @param { string } url 请求的Url地址
 * @param { any } [data] 请求参数
 * @param { Method } [type = 'GET'] 请求方法的类型
 * @param { Object } [config] 请求的设置
 * */
function request(
  url: string,
  data: any = {},
  type: Method = 'GET',
  config: { [p: string]: any; params?: any; data?: any } = {},
  // customMap: 为true时候，不进行过滤， notCancel：为true时候，不进行取消埋点
  extra: { customMap?: Boolean; notCancel?: Boolean } = {}
) {
  const method = type.toUpperCase()
  const obj: any = {
    url,
    method,
    loading: false,
    [method === 'GET' ? 'params' : 'data']: data,
    // cancelToken: cancelToken(),
  }
  const assignData = Object.assign(obj, config)
  if (!extra.notCancel) {
    assignData.cancelToken = cancelToken()
  }
  if (!extra.customMap) {
    if (
      Object.prototype.hasOwnProperty.call(assignData, 'data') &&
      !(assignData.data instanceof FormData)
    ) {
      assignData.data = mapFilterFn(assignData.data)
    }
    if (Object.prototype.hasOwnProperty.call(assignData, 'params')) {
      assignData.params = mapFilterFn(assignData.params, 'params')
    }
  }
  return axios(assignData)
}
// 过滤的方法
function mapFilterFn(dataMsg: { [p: string]: any }, dataType?: string) {
  return mapFilter(dataMsg, ({ value }: any, T: symbol) => {
    if (dataType === 'params' && typeOf(value) === 'array') {
      const data = value.toString().replace(/,$/, '')
      if (data === '') {
        return [T]
      }
      return data
    }
    if (value === '') {
      return [T]
    }
    return T
  })
}

export default request
export { default as prefix } from './api/prefix'
