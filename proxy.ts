const mode = ['auth', 'target']
function initMockProxy() {
  const proxy: any = {}
  const baseUrl = '/mock/galaxy-mars-runtime/'
  mode.forEach((i: any) => {
    proxy[`${baseUrl}${i}`] = {
      target: 'http://127.0.0.1:4523',
      rewrite: (path: any) =>
        path.replace('/mock/galaxy-mars-runtime', '/m1/748633-0-default'),
    }
  })
  return proxy
}
export default (env: any) => {
  const base = env.VITE_BASE_API
  return {
    ...initMockProxy(),
    [`${base}/galaxy-solar`]: {
      target: env.VITE_SOLAR_PROXY_URL,
      rewrite: (path: any) => path.replace(new RegExp(`^${base}`, 'g'), ''),
    },
    [base]: {
      target: env.VITE_BASE_PROXY_URL,
      // changeOrigin: true,
      rewrite: (path: any) => path.replace(new RegExp(`^${base}`, 'g'), ''),
    },
  }
}
