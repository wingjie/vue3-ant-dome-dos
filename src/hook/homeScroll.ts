/* eslint-disable no-underscore-dangle */
// import request from 'axios'
function isMobileDevice() {
  const userAgent = navigator.userAgent;
  const mobileKeywords = ['Mobile', 'Android', 'iPhone', 'iPad', 'Windows Phone'];
  return mobileKeywords.some(keyword => userAgent.includes(keyword));
}

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
  const width = ref<string>(isMobileDevice() ? '0px' : '200px')
  function getCurrentAnchor() {
    const mainContent = document.querySelector('.main-content')
    return mainContent
  }
  const value: [
    { title?: string; url: string; context?: string; file: any , }[],
    () => any,
    { value: string },
    Function
  ] = [modulesPath, getCurrentAnchor, width, isMobileDevice]
  return value
}
