import { AxiosResponse } from 'axios'

/**
 * @description 下载文件
 * @param { AxiosResponse } response 响应的response
 * @param { string } [fileNames] 文件名
 * */
export default function downloadFile(
  response: AxiosResponse,
  fileNames?: string
) {
  const { headers, data } = response
  return new Promise((resolve, reject) => {
    if (!(data instanceof Blob)) {
      console.warn('request config must includes { responseType: blob }')
      reject(new Error('request config must includes { responseType: blob }'))
    } else {
      try {
        // 从headers中的content-disposition中获取文件名称
        let name = headers['content-disposition']
          .split('filename=')[1]
          .replace(/"/g, '')
        name = decodeURIComponent(name)
        const fileNameArr = name.split('.')
        const fileName = fileNames
          ? `${fileNames}.${fileNameArr[fileNameArr.length - 1]}`
          : name
        const link = document.createElement('a')
        const blob = new Blob([data])
        link.download = fileName
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        resolve('成功')
      } catch (e) {
        console.error('[download-method-error]:', e)
        reject(e)
      }
    }
  })
}
