/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
import _ from 'lodash'
import { forEach, BASICS, typeOf } from './basics'

// const _ = require('lodash')
/*
 * 通过id找自身的item
 */
const findOwn = function (obj, second, third, fourth) {
  // 通过id找自身的item
  // try{
  return find(obj, second, third, fourth)?.own
  // } catch {
  // throw new Error('未找到相匹配的值')
  // }
}
/*
 * 通过id找父对象
 */
const findParent = function (obj, second, third, fourth) {
  // try {
  return find(obj, second, third, fourth).parent
  // } catch {
  //   throw new Error('未找到相匹配的值')
  // }
}
/*
 * 通过id找祖先们，返回一个数组
 */
const findParents = function (obj, second, third, fourth) {
  // let parents = []
  // forEach(obj, (item, index, parent, level)=>{
  //   parents[level] = parent
  //   if(item[third] === second) {
  //     parents.push(item)
  //     return BASICS.STOP
  //   }
  // })
  // return parents
  // try{
  return find(obj, second, third, fourth).parents
  // } catch {
  //   throw new Error('未找到相匹配的值')
  // }
}
/*
* 通过id找自己和父对象
second: 对象{},值1
third： 键名, 层级
fourth：层级
*/
const find = function (obj, second, third, fourth) {
  let returnObj
  const types = typeOf(second)
  if (types === 'object') {
    returnObj = findByObjectAndLevel(obj, second, third)
  } else {
    returnObj = findByUnpack(obj, second, third, fourth)
  }
  return returnObj
}
// 查找的基础方法
const findByUnpack = function (obj, val, key, level) {
  let returnObj
  const parents = []
  if (level !== undefined) {
    return findByUnpackLevel(obj, val, key, level)
  }
  forEach(obj, (item, index, parent, levelIng) => {
    parents[levelIng] = parent
    if (item[key] === val) {
      parents.length = levelIng + 1
      returnObj = {
        by: { key: val },
        own: item,
        parent,
        parents,
        level: levelIng + 1,
      }
      return BASICS.STOP
      // return BASICS.CONTINUE
      // return BASICS.BREAK
    }
  })
  return returnObj
}
// 查找的基础方法加上层级
const findByUnpackLevel = function (obj, val, key, level) {
  let returnObj
  const parents = []
  forEach(obj, (item, index, parent, levelIng) => {
    parents[levelIng] = parent
    if (+levelIng + 1 === +level && item[key] === val) {
      parents.length = levelIng + 1
      returnObj = {
        by: { key, value: val },
        own: item,
        parent,
        parents,
        level: levelIng + 1,
      }
      return BASICS.STOP
      // return BASICS.CONTINUE
      // return BASICS.BREAK
    }
    if (+levelIng > +level) {
      return BASICS.BREAK
    }
  })
  return returnObj
}
// 通过对象和层级
const findByObjectAndLevel = function (obj, option, level) {
  let returnObj
  const parents = []
  const keys = Object.keys(option)
  const keyFirst = keys[0]
  forEach(obj, (item, index, parentIng, levelIng) => {
    parents[levelIng] = parentIng
    const itemType = typeOf(item)
    if (
      (itemType === 'object' || itemType === 'array') &&
      item[keyFirst] === option[keyFirst]
    ) {
      let compare
      if (itemType === 'object') {
        compare = { ...item, ...option }
      } else {
        compare = Object.assign([], item, option)
      }
      if (level !== undefined) {
        // 判断level是否传值
        if (+levelIng + 1 === +level && _.isEqual(item, compare)) {
          parents[levelIng] = parentIng
          parents.length = levelIng + 1
          returnObj = {
            by: option,
            own: item,
            parent: parentIng,
            parents,
            level: levelIng + 1,
          }
          return BASICS.STOP
        }
        if (+levelIng === +level) {
          return BASICS.BREAK
        }
      } else if (_.isEqual(item, compare)) {
        parents[levelIng] = parentIng
        parents.length = levelIng + 1
        returnObj = {
          by: option,
          own: item,
          parent: parentIng,
          parents,
          level: levelIng + 1,
        }
        return BASICS.STOP
      }
    }
  })
  return returnObj
}

export { find, findOwn, findParent, findParents }
export default {
  find, // 通过id找到自身对象和父级对象或数组
  findOwn, // 通过id找到自身对象
  findParent, // 通过id找到父级对象或数组
  findParents,
}
