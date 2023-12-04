import { h } from 'vue'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { notification, message as antMessage } from 'ant-design-vue'
import Store from '@/store'
import loading from '@/common/http/loading'
import MsgNotification from '@/common/components/Notification/index.vue'

// 错误响应通知提醒框
function respNotification(errorInfo: any) {
  notification.error({
    message: '',
    description: () => h(MsgNotification, errorInfo),
  })
}

export default {
  request: {
    onFulfilled(request: AxiosRequestConfig) {
      /**
       * 根据项目实际情况来对 config 做处理
       * 这里对 config 不做任何处理，直接返回
       */
      const { token } = Store.getters
      request.headers = {}
      if (token) {
        request.headers.Authorization = `${token}`
      }
      request.headers['gx-scene'] = 'firewall-access-relationship-activation'
      if ((<any>request).loading) {
        loading.start()
      }
      return request
    },
    onRejected(error: any): Promise<never> {
      return Promise.reject(error)
    },
  },
  // 响应拦截器
  response: {
    onFulfilled(response: AxiosResponse) {
      const { headers } = response
      const contentDes = headers['content-disposition']
      if ((<any>response).loading) {
        loading.end()
      }
      if (contentDes) {
        return response
      }
      return response.data
    },
    onRejected(error: any) {
      const { code, message, response } = error
      console.warn('[common-http:error]:', response)
      if (response && response.data) {
        const respData = response.data
        const respDataCode = respData.code
        const respDataStatus = respData.status
        // 状态码为 -1200X的时候为Token失效 需要实现登出
        if (respDataCode > -12999 && respDataCode < -12000) {
          antMessage.warning(`${respData.description || ''}`)
          Store.dispatch('user/loginOut')
        } else if (respDataStatus) {
          notification.error({
            message: respDataStatus,
            description: `[${respData.path}]: ${respData.error} `,
          })
        } else {
          respNotification(respData)
        }
      } else if (message) {
        // ! 暂时这样
        // if (import.meta.env.VITE_ENV !== 'test') {
        notification.error({
          description: message,
          message: code,
        })
        // }
      }
      return Promise.reject(error)
    },
  },
}
