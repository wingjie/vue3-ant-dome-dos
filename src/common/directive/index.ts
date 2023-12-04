import btnPermission from '@/common/directive/auth/btnPermission'

const directive: any = {
  btnPermission,
}

function install(Vue: any) {
  Object.keys(directive).forEach((i: any) => {
    const item = directive[i]
    Vue.directive(item.name, item.hook)
  })
}

export default { install }
