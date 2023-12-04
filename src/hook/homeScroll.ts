/* eslint-disable no-underscore-dangle */
// import request from 'axios'

export default function install(option: { modules: object }) {
  const modulesPath = reactive<
    {
      title?: string
      url: string
      context?: string
      order?: number
      file: any
    }[]
  >(
    Object.entries(option.modules).map(([url, file]: any) => {
      return { url, file }
    })
  )
  watchEffect(() => {
    modulesPath.sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order
      }
      return 0
    })
  })
  const width = ref<string>('200px')
  function getCurrentAnchor() {
    const mainContent = document.querySelector('.main-content')
    return mainContent
  }
  const value: [
    { title?: string; url: string; context?: string; file: any }[],
    () => any,
    { value: string }
  ] = [modulesPath, getCurrentAnchor, width]
  return value
}
