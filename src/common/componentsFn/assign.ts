import { isRef, isProxy, isReactive } from 'vue'
import { typeOf } from '@/common/utils/traverseTree'

function assign(...args: any) {
  const obj = args.reduce((target: any, sources: any) => {
    if (
      typeof target !== 'object' ||
      typeof sources !== 'object' ||
      typeOf(target) !== typeOf(sources)
    ) {
      return sources // 如果其中一个不是对象 就返回sources
    }
    for (const key in sources) {
      // 如果target也存在 那就再次合并
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        if (
          isRef(sources[key]) ||
          isProxy(sources[key]) ||
          isReactive(sources[key])
        ) {
          target[key] = sources[key]
        } else if (typeOf(target[key]) === 'object') {
          target[key] = assign({}, target[key], sources[key])
        } else if (typeOf(target[key]) === 'array') {
          target[key] = assign([], target[key], sources[key])
        } else {
          target[key] = assign(target[key], sources[key])
        }
      } else {
        // 不存在就直接添加
        target[key] = sources[key]
      }
    }
    return target
  })
  return obj
}
// TODO:还未实现
// function assignTruthy(...args) {
//   const obj = args.reduce((target, sources) => {
//     if (!sources) {
//       return target
//     }
//     if (
//       typeof target !== 'object' ||
//       typeof sources !== 'object' ||
//       typeOf(target) !== typeOf(sources)
//     ) {
//       return sources // 如果其中一个不是对象 就返回sources
//     }
//     for (const key in sources) {
//       // 如果target也存在 那就再次合并
//       if (Object.prototype.hasOwnProperty.call(target, key)) {
//         if (typeOf(target[key]) === 'object') {
//           target[key] = assignTruthy({}, target[key], sources[key])
//         } else if (typeOf(target[key]) === 'array') {
//           target[key] = assignTruthy([], target[key], sources[key])
//         } else {
//           target[key] = assignTruthy(target[key], sources[key])
//         }
//       } else {
//         // 不存在就直接添加
//         target[key] = sources[key]
//       }
//     }
//     return target
//   })
//   return obj
// }
export {
  assign,
  // assignTruthy
}
export default {
  assign, // 通过id找到自身对象和父级对象或数组
  // assignTruthy,
}
