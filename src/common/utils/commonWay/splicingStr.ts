export default function splicing(
  obj: { [p: string]: string },
  str1: string,
  str2: string
) {
  const map: { [p: string]: string } = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      map[`${str1}${key}`] = `${str2}${obj[key]}`
    }
  }
  return map
}
