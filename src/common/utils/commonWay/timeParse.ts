import moment from 'moment'
/**
 * @description 转换ISO时间为本地时间
 * @param {string} time ISO时间字符串格式为YYYY-MM-DD HH:mm:ss
 * @return {string} 返回本地时间格式为YYYY-MM-DD HH:mm:ss
 */
function parseToLocalTime(time: string) {
  if (typeof time !== 'string') {
    console.warn('toLocalTime warning: time must be string')
    return time
  }
  const ISOTime = time.replace(/\s/g, 'T').concat('Z')
  const momTime = moment(ISOTime)
  if (momTime.isValid()) {
    return momTime.format('YYYY-MM-DD HH:mm:ss')
  }
  console.warn('toLocalTime warning: time is invalid')
  return time
}
/**
 * @description 转换本地时间为ISO标准时间
 * @param {Date|string} time 时间对象或者本地时间字符串格式为YYYY-MM-DD HH:mm:ss
 * @return {string} 返回ISO时间格式为YYYY-MM-DD HH:mm:ss
 */
function parseToISOTime(time: Date | string) {
  const momTime = moment(time)
  if (momTime.isValid()) {
    const ISOTime = moment(time).toISOString()
    return ISOTime.replace(/T/g, ' ').slice(0, 19)
  }
  console.warn('toISOTime warning: time is invalid')
  return time
}
export default {
  toLocal: parseToLocalTime,
  toISO: parseToISOTime,
}
