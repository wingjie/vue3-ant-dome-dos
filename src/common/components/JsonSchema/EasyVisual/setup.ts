// eslint-disable-next-line import/prefer-default-export
export function isEasyMode(schema: any) {
  const { type, properties = {} } = schema
  if (type !== 'object') return false
  const propTypes: any = []
  Object.values(properties).forEach((i: any) => {
    if (i.type instanceof Array) {
      propTypes.concat(i.type)
    } else {
      propTypes.push(i.type)
    }
  })
  // 数组降维
  return !propTypes.some((i: any) => i === 'object' || i === 'array')
}
