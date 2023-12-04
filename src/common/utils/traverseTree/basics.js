/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable valid-typeof */
/* eslint-disable no-continue */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-bitwise */
/* eslint-disable symbol-description */
// const _ = require('lodash')
import _ from 'lodash'

const BASICS = {
  STOP: Symbol('stop'), // 叫停遍历
  BREAK: Symbol('break'), // 跳出当前循环
  CONTINUE: Symbol('continue'),
  TRUE: Symbol('true'),
  FALSE: Symbol('false'),
}
/**
 * @description: 数据类型精准判断
 * @param {*} keyVal 要判断的数据
 * @return {*} 类型名称的字符串（小写）： number、string、boolean、null、undefined、object、symbol...
 */
const typeOf = function (keyVal) {
  // 数据类型判断
  return Object.prototype.toString
    .call(keyVal)
    .replace('[object ', '')
    .replace(']', '')
    .toLowerCase()
}

const S4 = function () {
  // 生成唯一数
  // 0x   表示16进制数据的开头
  const s4 = (((1 + Math.random()) * 0x10000) | 0).toString(16)
  return Symbol(s4)
}

const getUUID = function () {
  return (
    window?.crypto?.randomUUID?.() ||
    _.uniqueId() + (((1 + Math.random()) * 0x10000) | 0).toString(16)
  ).replace(/\.|-/g, '')
}

const cloneDeep = function (value) {
  // 深拷贝
  return _.cloneDeep(value) // 直接使用lodash的方法了
}
/**
 * @description: 也为深拷贝，数组的额外值也能被拷贝，列：[1, ids: Symbol(13359)],可以拷贝出数组中的Symbol
 * @param {*} obj 需要进行拷贝的数据
 * @return {*} 深拷贝完成后的数据
 */
const deepCopy = function (obj) {
  // 深拷贝
  let copyObj
  const isObject = function (obj) {
    const result =
      (typeof obj === 'object' || typeof obj === 'function') &&
      typeof obj != null
    return result
  }
  if (!isObject(obj)) {
    throw Error('不是一个对象')
  }
  if (obj === null) {
    copyObj = null
  } else {
    const isArray = Array.isArray(obj)
    copyObj = isArray ? [] : {} // 判断传入的obj是一个数组还是一个对象
  }
  for (const key in obj) {
    copyObj[key] = isObject(obj[key]) ? deepCopy(obj[key]) : obj[key]
  }
  return copyObj
}

/*
forEach(objNotClone, (item, key, parent) =>{
})
objNotClone: 要遍历的大对象
(
  item, // 当前对象
  key, // 当前对象的键名
  parent // 父对象
  )
  */
/**
 * @description: 像遍历数组一样遍历集合对象，遍历集合对象(像es6的forEach一样不能停止)
 * @param {*} obj 查找的源对象
 * @param {*} fn(value,key,parent,level)：回调函数；value: 遍历到的当前value值，key: 遍历到的当前key，parent: 遍历到的当前对象，level: 遍历源对象的当前层级，开始为0
 * @return {*} 经过操作后的obj对象
 */
const forEach = function (obj, fn) {
  let sirdar
  const typeDetermineData = typeOf(obj)
  const recursionObj = function (item, key, parent, level, fn) {
    // 递归对象
    sirdar = fn(item, key, parent, level)
    level += 1
    // if(sirdar === BASICS.STOP || sirdar === BASICS.CONTINUE || sirdar === BASICS.BREAK) {
    //   console.log(item, key, parent, level, 'BASICS.STOPBASICS.STOPBASICS.STOPBASICS.STOPBASICS.STOPBASICS.STOPBASICS.STOP')
    // }
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
          recursionObj(item[k], k, item, level, fn)
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
          recursionArr(item[k], k, item, level, fn)
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
        sirdar = fn(item[k], k, item, level)
      }
    }
  }
  const recursionArr = function (item, key, parent, level, fn) {
    // 递归数组
    sirdar = fn(item, key, parent, level)
    level += 1
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
          recursionObj(item[k], k, item, level, fn)
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
          recursionArr(item[k], k, item, level, fn)
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
          sirdar = fn(item[k], k, item, level)
        }
      }
    }
  }
  if (typeDetermineData === 'object') {
    // 递归对象
    recursionObj(obj, undefined, null, 0, fn)
  } else if (typeDetermineData === 'array') {
    // 数组递归
    recursionArr(obj, undefined, null, 0, fn)
  }
  return obj
}

export default {
  // 这是要绑顶方法
  cloneDeep,
  deepCopy,
  forEach,
}
export {
  // 这是单独导出，不绑定
  typeOf, // 精准判断数据类型
  S4, // 生成唯一的数
  deepCopy, // 深拷贝数组的额外值页能被拷贝
  cloneDeep, // 深拷贝
  forEach, // 遍历大对象
  BASICS,
  getUUID,
}
