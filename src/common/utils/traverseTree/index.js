import {
  typeOf, // 精准判断数据类型
  S4, // 生成唯一的数
  getUUID,
  deepCopy, // 深拷贝数组的额外值页能被拷贝
  cloneDeep, // 深拷贝
  forEach, // 遍历大对象
} from './basics'
import {
  find, // 通过id找到自身对象和父级对象或数组
  findOwn, // 通过id找到自身对象
  findParent, // 通过id找到父级对象或数组
  findParents,
} from './find'
import {
  assign,
  // assignTruthy
} from './assign'
import { mapFilter } from './mapFilter'

export {
  assign, // 机制跟object.assign一样，false也会被合并
  // assignTruthy, // 值合并truthy的值
  typeOf, // 精准判断数据类型
  S4, // 生成唯一的数
  deepCopy, // 深拷贝数组的额外值页能被拷贝
  cloneDeep, // 深拷贝
  forEach, // 遍历大对象
  find, // 通过id找到自身对象和父级对象或数组
  findOwn, // 通过id找到自身对象
  findParent, // 通过id找到父级对象或数组
  findParents,
  mapFilter,
  getUUID,
}
export default {
  assign, // 机制跟object.assign一样，false也会被合并
  // assignTruthy, // 值合并truthy的值
  typeOf, // 精准判断数据类型
  S4, // 生成唯一的数
  deepCopy, // 深拷贝数组的额外值页能被拷贝
  cloneDeep, // 深拷贝
  forEach, // 遍历大对象
  find, // 通过id找到自身对象和父级对象或数组
  findOwn, // 通过id找到自身对象
  findParent, // 通过id找到父级对象或数组
  findParents,
  mapFilter,
  getUUID,
}
