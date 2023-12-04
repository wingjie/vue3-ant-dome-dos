import request from '@/common/http'
import prefix from '@/common/http/api/prefix'

const MARS = prefix.MARS_RUNTIME

// 获取指定状态的配置材料
export const getConfigMaterialTemplates = (status: string) =>
  request(
    `${MARS}/config-material-template/list-by-status/config-material-templates`,
    { status }
  )

// 获取指定状态的解析材料
export const getParseMaterialTemplates = (status: string) =>
  request(
    `${MARS}/parse-material-template/list-by-status/parse-material-templates`,
    { status }
  )
