/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BASICS, typeOf } from './basics'

function mapFilter(obj, fn) {
  const parents = []
  let sirdar = BASICS.FALSE
  const typeDetermineData = typeOf(obj)
  function recursionObj(item, key, parent, level, fn) {
    sirdar = BASICS.TRUE
    parents[level] = { data: parent }
    const data = {
      value: item,
      key,
      parent,
      level,
      parents,
    }
    level += 1
    parents[level] = { data: item }
    let obj = {}
    sirdar = fn({ ...data, status: 'before' }, BASICS.TRUE, BASICS.FALSE)
    if (parent && level) {
      if (parents[level]) {
        const parentAt = parents[level]
        if (Object.prototype.hasOwnProperty.call(parentAt, BASICS.TRUE)) {
          if (parentAt[BASICS.TRUE] !== BASICS.FALSE) {
            return parentAt[BASICS.TRUE]
          }
        }
        if (Object.prototype.hasOwnProperty.call(parentAt, BASICS.FALSE)) {
          return BASICS.FALSE
        }
      }
      if (
        sirdar !== undefined &&
        sirdar !== BASICS.TRUE &&
        sirdar !== BASICS.FALSE
      ) {
        obj = sirdar
        return obj
      }
      if (sirdar === BASICS.FALSE) {
        return BASICS.FALSE
      }
    } else if (sirdar === BASICS.FALSE) {
      return null
    } else if (sirdar === undefined) {
      throw Error('mapFilter方法的回调中必须要有返回值')
    }
    // 递归对象
    const objKey = Object.keys(item)
    for (const k of objKey) {
      const typeDetermineData = typeOf(item[k])
      if (typeDetermineData === 'object') {
        // 递归对象
        if (sirdar === BASICS.STOP) {
          return
        }
        if (sirdar === BASICS.BREAK) {
          sirdar = ''
          break
        } else if (sirdar === BASICS.CONTINUE) {
          sirdar = ''
          continue
        } else {
          sirdar = recursionObj(item[k], k, item, level, fn)
          if (
            sirdar !== undefined &&
            sirdar !== BASICS.TRUE &&
            sirdar !== BASICS.FALSE
          ) {
            const data = judge(sirdar)
            if (data === BASICS.FALSE) {
              delete obj[k]
            } else {
              obj[k] = data
            }
          }
          if (sirdar === BASICS.TRUE) {
            obj[k] = item[k]
          }
          sirdar = BASICS.TRUE
        }
      } else if (typeDetermineData === 'array') {
        // 数组递归
        if (sirdar === BASICS.STOP) {
          return
        }
        if (sirdar === BASICS.BREAK) {
          sirdar = ''
          break
        } else if (sirdar === BASICS.CONTINUE) {
          sirdar = ''
          continue
        } else {
          sirdar = recursionArr(item[k], k, item, level, fn)
          if (
            sirdar !== undefined &&
            sirdar !== BASICS.TRUE &&
            sirdar !== BASICS.FALSE
          ) {
            const data = judge(sirdar)
            if (data === BASICS.FALSE) {
              delete obj[k]
            } else {
              obj[k] = data
            }
          }
          if (sirdar === BASICS.TRUE) {
            obj[k] = item[k]
          }
          sirdar = BASICS.TRUE
        }
      } else if (sirdar === BASICS.STOP) {
        return
      } else if (sirdar === BASICS.BREAK) {
        sirdar = ''
        break
      } else if (sirdar === BASICS.CONTINUE) {
        sirdar = ''
        continue
      } else {
        sirdar = fn(
          { value: item[k], key: k, parent: item, parents, level },
          BASICS.TRUE,
          BASICS.FALSE
        )
        if (
          sirdar !== undefined &&
          sirdar !== BASICS.TRUE &&
          sirdar !== BASICS.FALSE
        ) {
          const data = judge(sirdar)
          if (data === BASICS.FALSE) {
            delete obj[k]
          } else {
            obj[k] = data
          }
        } else if (sirdar !== BASICS.FALSE) {
          obj[k] = item[k]
        }
        sirdar = BASICS.TRUE
      }
    }
    sirdar = fn({ ...data, status: 'after' }, BASICS.TRUE, BASICS.FALSE)
    if (parent && level) {
      if (parents[level]) {
        const parentAt = parents[level]
        if (Object.prototype.hasOwnProperty.call(parentAt, BASICS.TRUE)) {
          if (parentAt[BASICS.TRUE] !== BASICS.FALSE) {
            return parentAt[BASICS.TRUE]
          }
          if (parentAt[BASICS.TRUE] === BASICS.FALSE) {
            return obj
          }
        }
        if (Object.prototype.hasOwnProperty.call(parentAt, BASICS.FALSE)) {
          return BASICS.FALSE
        }
      }
      if (
        sirdar !== undefined &&
        sirdar !== BASICS.TRUE &&
        sirdar !== BASICS.FALSE
      ) {
        obj = sirdar
        return obj
      }
      if (sirdar === BASICS.FALSE) {
        return BASICS.FALSE
      }
    } else if (sirdar === BASICS.FALSE) {
      return null
    } else if (sirdar === undefined) {
      throw Error('mapFilter方法的回调中必须要有返回值')
    }
    if (sirdar === BASICS.TRUE) {
      return obj
    }
    return BASICS.FALSE
  }
  function recursionArr(item, key, parent, level, fn) {
    sirdar = BASICS.FALSE
    parents[level] = { data: parent }
    const data = {
      value: item,
      key,
      parent,
      level,
      parents,
    }
    level += 1
    parents[level] = { data: item }
    let arr = []
    sirdar = fn({ ...data, status: 'before' }, BASICS.TRUE, BASICS.FALSE)
    if (parent && level) {
      if (parents[level]) {
        const parentAt = parents[level]
        if (Object.prototype.hasOwnProperty.call(parentAt, BASICS.TRUE)) {
          if (parentAt[BASICS.TRUE] !== BASICS.FALSE) {
            return parentAt[BASICS.TRUE]
          }
        }
        if (Object.prototype.hasOwnProperty.call(parentAt, BASICS.FALSE)) {
          return BASICS.FALSE
        }
      }
      if (
        sirdar !== undefined &&
        sirdar !== BASICS.TRUE &&
        sirdar !== BASICS.FALSE
      ) {
        arr = sirdar
        return arr
      }
      if (sirdar === BASICS.FALSE) {
        return BASICS.FALSE
      }
    } else if (sirdar === BASICS.FALSE) {
      return null
    } else if (sirdar === undefined) {
      throw Error('mapFilter方法的回调中必须要有返回值')
    }
    // 递归数组
    for (const k in item) {
      const typeDetermineData = typeOf(item[k])
      if (typeDetermineData === 'object') {
        if (sirdar === BASICS.STOP) {
          return
        }
        if (sirdar === BASICS.BREAK) {
          sirdar = ''
          break
        } else if (sirdar === BASICS.CONTINUE) {
          sirdar = ''
          continue
        } else {
          sirdar = recursionObj(item[k], k, item, level, fn)
          if (sirdar !== undefined && sirdar !== BASICS.FALSE) {
            const data = judge(sirdar)
            if (data !== BASICS.FALSE) {
              arr.push(data)
            }
          }
          if (sirdar === BASICS.TRUE) {
            arr.push(item[k])
          }
          sirdar = BASICS.FALSE
        }
      } else if (typeDetermineData === 'array') {
        if (sirdar === BASICS.STOP) {
          return
        }
        if (sirdar === BASICS.BREAK) {
          sirdar = ''
          break
        } else if (sirdar === BASICS.CONTINUE) {
          sirdar = ''
          continue
        } else {
          sirdar = recursionArr(item[k], k, item, level, fn)
          if (
            sirdar !== undefined &&
            sirdar !== BASICS.FALSE &&
            sirdar !== BASICS.TRUE
          ) {
            const data = judge(sirdar)
            if (data !== BASICS.FALSE) {
              arr.push(data)
            }
          }
          if (sirdar === BASICS.TRUE) {
            arr.push(item[k])
          }
          sirdar = BASICS.FALSE
        }
      } else {
        if (sirdar === BASICS.STOP) {
          return
        }
        if (sirdar === BASICS.BREAK) {
          sirdar = ''
          break
        } else if (sirdar === BASICS.CONTINUE) {
          sirdar = ''
          continue
        } else {
          sirdar = fn(
            { value: item[k], key: k, parent: item, level, parents },
            BASICS.TRUE,
            BASICS.FALSE
          )
          if (
            sirdar !== undefined &&
            sirdar !== BASICS.TRUE &&
            sirdar !== BASICS.FALSE
          ) {
            const data = judge(sirdar)
            if (data !== BASICS.FALSE) {
              arr.push(data)
            }
          } else if (sirdar === BASICS.TRUE) {
            arr.push(item[k])
          }
          sirdar = BASICS.FALSE
        }
      }
    }
    sirdar = fn({ ...data, status: 'after' }, BASICS.TRUE, BASICS.FALSE)
    if (parent && level) {
      if (parents[level]) {
        const parentAt = parents[level]
        if (Object.prototype.hasOwnProperty.call(parentAt, BASICS.TRUE)) {
          if (parentAt[BASICS.TRUE] !== BASICS.FALSE) {
            return parentAt[BASICS.TRUE]
          }
        }
        if (Object.prototype.hasOwnProperty.call(parentAt, BASICS.FALSE)) {
          return BASICS.FALSE
        }
        if (parentAt[BASICS.TRUE] === BASICS.FALSE) {
          return arr
        }
      }
      if (
        sirdar !== undefined &&
        sirdar !== BASICS.TRUE &&
        sirdar !== BASICS.FALSE
      ) {
        arr = sirdar
        return arr
      }
      if (sirdar === BASICS.FALSE) {
        return BASICS.FALSE
      }
    } else if (sirdar === BASICS.FALSE) {
      return null
    } else if (sirdar === undefined) {
      throw Error('mapFilter方法的回调中必须要有返回值')
    }
    if (sirdar === BASICS.TRUE) {
      return arr
    }
    return BASICS.FALSE
  }
  if (typeDetermineData === 'object') {
    // 递归对象
    return recursionObj(obj, undefined, null, 0, fn)
  }
  if (typeDetermineData === 'array') {
    // 数组递归
    return recursionArr(obj, undefined, null, 0, fn)
  }
}

function judge(sirdar) {
  const type = typeOf(sirdar)
  if (type === 'object') {
    if (Object.prototype.hasOwnProperty.call(sirdar, BASICS.TRUE)) {
      return sirdar[BASICS.TRUE]
    }
  }
  if (type === 'array') {
    if (sirdar[0] === BASICS.TRUE) {
      return sirdar[1]
    }
  }
  return sirdar
}
//
export { mapFilter }
export default {
  mapFilter,
}
