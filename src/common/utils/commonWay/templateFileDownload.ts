import request, { prefix } from '@/common/http'

const {
  SOLAR_RUNTIME,
  V_IPAM_RUNTIME,
  V_FARA_RUNTIME,
  EARTH_SW,
  V_DCNAC_RUNTIME,
  MARS_RUNTIME,
  SATURN_RUNTIME,
} = prefix

export default function downloadTemplate(filename: string, mode = 'solar') {
  let urlPrefix = ''
  switch (mode) {
    case 'ipam':
      urlPrefix = V_IPAM_RUNTIME
      break
    case 'venus-fara':
      urlPrefix = V_FARA_RUNTIME
      break
    case 'sw':
      urlPrefix = EARTH_SW
      break
    case 'dcnac':
      urlPrefix = V_DCNAC_RUNTIME
      break
    case 'mars':
      urlPrefix = MARS_RUNTIME
      break
    case 'saturn':
      urlPrefix = SATURN_RUNTIME
      break
    default:
      urlPrefix = SOLAR_RUNTIME
  }
  const url = `${urlPrefix}/import-template/${filename}`
  return new Promise((resolve) => {
    request(url, {}, 'get', {
      responseType: 'blob',
    }).then((respData: any) => {
      const blob = new Blob([respData])
      const link = document.createElement('a')
      link.download = filename
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      console.log(link.href, 'link.href')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      resolve('成功')
    })
  })
}
