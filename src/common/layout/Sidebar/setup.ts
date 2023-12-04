import $router from '@/router/index'
import $store from '@/store/index'

// eslint-disable-next-line import/prefer-default-export
export function goRouter(currentRouteMsg: any) {
  const { uri, id } = currentRouteMsg
  if (uri) {
    $router.push(`${uri}`)
    $store.commit('app/setActionPath', uri)
    $store.commit('platform/setVisited', currentRouteMsg)
  }
  if (id) {
    $store.commit('platform/setMenusSelectKey', id)
  }
}
