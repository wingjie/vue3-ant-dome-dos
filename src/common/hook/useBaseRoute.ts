import { useRoute } from 'vue-router'
import router from '@/router'

let baseRoute: any = () => ({ $route: useRoute(), $router: router })

// 初始化子应用添加基座路由实例
export function initBaseRoute(props: any) {
  const { uranusRoute } = props
  baseRoute = () => uranusRoute || baseRoute()
}

export const getBaseRoute = () => baseRoute()
