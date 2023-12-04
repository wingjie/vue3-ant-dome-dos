function hasPermissionMenus(menus: object[], route: any) {
  return menus.some((menuName) => {
    return menuName === route.name
  })
}

/**
 * @description Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 * @return array<object>
 */
export default function filterAsyncRoutes(routes: object[], menus: object[]) {
  const res: object[] = []
  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermissionMenus(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus)
      }
      res.push(tmp)
    }
  })

  return res
}
