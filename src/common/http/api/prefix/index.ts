import test from './test'
import local from './local'
import mock from './mock'
import mockSelf from './mockSelf'
import release from './release'

type envInterface = {
  key: string
  value: string
  APP: { key: string; value: string }[]
}[]

let configData: envInterface
switch (import.meta.env.VITE_ENV as string) {
  case 'local':
    configData = local
    break
  case 'test':
    configData = test
    break
  case 'release':
    configData = release
    break
  case 'mock':
    configData = mock
    break
  case 'mockSelf':
    configData = mockSelf
    break
  default:
    configData = release
    break
}

const prefixData: { [p: string]: string } = {}
configData.forEach((serve) => {
  prefixData[serve.key] = `${serve.value ? '/' : ''}${serve.value}`
  serve.APP.forEach((app) => {
    // prefixData[app.key] = `${app.value ? '/' : ''}${app.value}`
    prefixData[`${serve.key}_${app.key}`] = `${serve.value ? '/' : ''}${
      serve.value
    }${app.value ? '-' : ''}${app.value}`
  })
})
export default prefixData
