import request from '@/common/utils/axios.ts'

export function getXMLByData(data: Array<any>) {
  return request({
    url: 'http://localhost:9010/getXML',
    method: 'post',
    data,
  })
}

export function getDataByXML(data: { xml: string }) {
  return request({
    url: 'http://localhost:9010/getGraphData',
    method: 'post',
    data,
  })
}
