---
title: Fair文档
date: 2023-03-15
sidebar: "auto"
categories:
  - 文档
tags:
  - 在线文档

---

::: tip
集合对象（数组、对象相互嵌套），操作时总是递归，此插件就此运用而生
:::

## find系列

### find

 查找源对象

**参数**

* find(obj, second, third, fourth)<br/>
  `obj:`查找的源对象<br/>
   `second:` 对象{},值1<br/>
   `third:` 键名, 层级<br/>
   `fourth:`层级(有层级时，遍历到此层级就不会再向下遍历，节省性能)

**返回值**

```js
{
    by: {key: val}, // 通过查找的条件
    own: item, // 包含键名的当前对象
    parent: parent, // 父对象
    parents: [null, ... , {id: 123}], // 祖先们
   level: level // 层级，从0开始
}
```

  **例子**

```js
let obj = {
        id: 1,
        a: 1,
        b: {
          id: 2,
          d: 4
        },
        c: [1,2,3, {id: 2, c: 3}]
      }
find(obj, 123, 'id', 2) // 源对象, 键值, 键名, 层级(可不传)
find(obj, {id: 123}, 2) // 源对象, {键名: 键值}, 层级(可不传)

/*
@返回值
{
  by: {key: 2},
  level: 1,
  own: {id: 2, d: 4},
  parent: {id: 1, a: 1, b: {…}, c: Array(4)},
  parents: [null, {id: 1, a: 1, b: {…}, c: Array(4)},{id: 2, d: 4}]
}
*/


find(obj, {id: 2, c: 3})
/*
@返回值
{
    by: {id: 2, c: 3},
    level: 2,
    own: {id: 2, c: 3},
    parent: (4) [1, 2, 3, {id: 2, c: 3}],
    parents: (4) [null, {…}, Array(4), {id: 2, c: 3}]
}
*/
```

### findOwn

查找源对象中的目标对象

```js
findOwn() // 返回查找当前层级的对象，等同于find.own,入参和find方法一样
```

### findParent

查找源对象中的目标对象的父对象

```js
findParent() // 返回查找当前层级的对象，等同于find.parent,入参和find方法一样
```

### findParents

查找源对象中的目标的祖先门

```js
findParents() // 返回查找当前层级的对象，等同于find.parents,入参和find方法一样
```

## forEach

像遍历数组一样遍历集合对象，遍历集合对象(像es6的forEach一样不能停止)。

此方法有很大的拓展性, find系列方法均由此方法完成,但是find方法中做了性能优化,*所以能满足需求时推荐使用find系列*。

**参数**

* forEach(obj, fn(item, key, parent, level))
  ` obj: `查找的源对象 <br/>

  `fn(value, key, parent, level):` 回调函数<br/>
       `value:` 遍历到的当前key值<br/>
       `key:` 遍历到的当前key<br/>
       `parent:` 遍历到的当前对象<br/>
       `level:` 遍历源对象的当前层级

**无返回值**

## cloneDeep

* cloneDeep(obj)

* 深拷贝,此方法是lodash的cloneDeep方法

## deepCopy

* deepCopy(obj)
* 也为深拷贝，数组的额外值也能被拷贝,lodash的cloneDeep方法不能拷贝数组外的额外值,所以又自己封装了此方法

```shell
  let arr = [1, ids: Symbol(13359)],

```

  *cloneDeep*无法将arr中的Symbol值拷贝

## typeOf

* 数据类型精准判断


**参数**

* typeOf(obj)<br/>
  `obj:` 要判断的数据<br/>

**返回值**

* 类型名称的字符串： number、string、boolean、null、undefined、object、symbol...

## assign

* 合并集合对象
  合并机制：类似原生`assign`方法，如果当前层级的值的类型相同才会进行下一层级的合并，若类型不同，后者直接覆盖前者

**参数**

* assign({}, {a: 1}, {a: 2, b: 3}, ...)<br/>

 ```js
  const obj1 = {
    a: 1,
    b: [1, 2, 3, 4],
    c: {
      d: 1,
      e: 2,
    },
  }
  const obj2 = {
    a: 2,
    b: [5, 5, 3, 4],
    c: {
      d: 3,
      f: 2,
    },
  }
const obj = assign(obj1, obj2)
console.log(obj)
//  {
//   "a": 2,
//   "b": [
//     5,
//     5,
//     3,
//     4
//   ],
//   "c": {
//     "d": 3,
//     "e": 2,
//     "f": 2
//   }
// }
console.log(obj1)
// 打印结果同上
 ```

 原数据不想被覆盖：`assign({}, obj1, obj2)`

 ```js
  const obj1 = {
  a: 1,
  b: [1, 2, 3, 4],
  c: {
    d: 1,
    e: 2,
  },
}
const obj2 = {
  a: 2,
  b: [5, 5, 3, 4],
  c: {
    d: 3,
    f: 2,
  },
}
const obj = assign({}, obj1, obj2)
console.log(obj)
console.log(obj1) // obj1不会被覆盖

 ```

## mapFilter

 此方法是集合了`forEach`、`filter`、`map`的功能

* mapFilter(obj, ({value, key, parent, level, parents}, T, F) => {})
  ` obj: `源对象 <br/>

  `fn({value, key, parent, level, parents, status}, T, F):` 回调函数<br/>
      第一个对象
       `value:` 遍历到的当前key值

  ​	`status?:` 当value是一个多层级的对象或者数组时候才有这个字段，多层级的对象会触发两次，一次为递归前，一次是递归后的。（如果需要下钻的数据判断祖先层级是否过滤，则需要在status: after，状态时候进行操作）

  ​     `key:` 遍历到的当前key
  ​     `parent:` 遍历到的当前对象
  ​     `parents:` 遍历到的当前对象祖先合集

  ​     `level:` 遍历源对象的当前层级<br/>

  <br/>

    `T`（第二个参数）: 相当于true,筛选时候`return T` 表示需要的值
        map 映射的时候，返回映射值的时候也会用到该值<br/>

    `F`（第三个参数）: 相当于false，筛选时候`return F` 表示舍弃的值

##### 遍历机制

 和上面的`forEach`运行顺序有些差别，`forEach`是有外向内逐个进行遍历
 `mapFilter`是先遍历顺序是外 => 内 => 外执行，也是这一运行机制，才得以实现`filter`、`map`的功能

##### 当`filter`使用

* 回调函数中必须要有返回值，否则将会抛出一个异常:<br>
  <font style='color:red'>Uncaught Error: mapFilter方法的回调中必须要有返回值
</font>
`return F`是要过滤舍弃的，需要当前值则需`return T`

例子：

默认

```js
  const obj = [
    2,
    2,
    3,
    [],
    {},
    [4, [1, { b: 23, c: [2, 3, 4, 5], d: { c: 23 } }]],
    { b: 23, c: 23 },
  ]
  const bool = mapFilter(obj, ({ value, key, parent, level, parents }, T, F) => {
    return T
  })
  console.log(bool) // 打印结果，会默认过滤掉数组中的数值（除了数组或对象类型）
//  [
//     2,
//     2,
//     3,
//     [],
//     {},
//     [4, [1, { b: 23, c: [2, 3, 4, 5], d: { c: 23 } }]],
//     { b: 23, c: 23 },
//   ]

```

<br>

过滤和留取：

 ```js
  const bool = mapFilter(
    obj,
    ({ value, key, parent, level, parents }: any, T: symbol, F: symbol) => {
      if (key === 'b' && value === 23) {
        // 会将所有b: 23过滤掉
        return F
      }
      if (value.c === 23) {
        // 会将所有any: {c: 23}过滤掉
        return F
      }
      if (!(key === '0' && value === 2)) {
        // 将所有的下标为0的值为2的值留下
        return T
      }
    }
  )
  console.log(bool) // 打印结果
  // [
  //   2,
  //   3,
  //   [],
  //   {},
  //   [
  //     4,
  //     [
  //       1,
  //       {
  //         "c": [
  //           3,
  //           4,
  //           5
  //         ]
  //       }
  //     ]
  //   ]
  // ]

 ```

<br>

跨层级过滤：

 ```js
 const obj1 = [
  {
    is: false,
    a: 1,
    children: [
      { a: 22, children: [], is: true },
      { a: 33, children: [], is: false },
    ],
  },
  { a: 2, children: [{ a: 1, children: [], is: true }] },
  { a: 3, children: [{ a: 1, children: [] }] },
  { a: 4, children: [{ a: 1, children: [], is: true }] },
  { a: 5, children: [{ a: 1, children: [] }] },
]
const bool = mapFilter(
  obj1,
  ({ value, key, parent, level, parents }: any, T: symbol, F: symbol) => {
    if (key === 'is' && value === true) {
      parents[2][F] = true
    }
  }
)
console.log(bool) // 打印结果
[
  {
    "a": 3,
    "children": [
      {
        "a": 1,
        "children": []
      }
    ]
  },
  {
    "a": 5,
    "children": [
      {
        "a": 1,
        "children": []
      }
    ]
  }
]
 ```

* 删除对象中的key: `return [T, F]` 或 `return { [T]: F }`

 ```js
 const obj1 = [
  {
    is: false,
    a: 1,
    children: [
      { a: 22, children: [], is: true },
      { a: 33, children: [], is: false },
    ],
  },
  { a: 2, children: [{ a: 1, children: [], is: true }] },
  { a: 3, children: [{ a: 1, children: [] }] },
  { a: 4, children: [{ a: 1, children: [], is: true }] },
  { a: 5, children: [{ a: 1, children: [] }] },
]
const bool = mapFilter(
  obj1,
  ({ value, key, parent, level, parents }: any, T: symbol, F: symbol) => {
    if (key === 'is' && value === true) {
      return { [T]: F }
    }
  }
)
console.log(bool) // 打印结果, is: true; 的key被删除
[
  {
    "a": 1,
    "children": [
      {
        "a": 22,
        "children": []
      },
      {
        "a": 33,
        "children": [],
        "is": false
      }
    ]
  },
  {
    "a": 2,
    "children": [
      {
        "a": 1,
        "children": []
      }
    ]
  },
  {
    "a": 3,
    "children": [
      {
        "a": 1,
        "children": []
      }
    ]
  },
  {
    "a": 4,
    "children": [
      {
        "a": 1,
        "children": []
      }
    ]
  },
  {
    "a": 5,
    "children": [
      {
        "a": 1,
        "children": []
      }
    ]
  }
]
 ```


##### `map`功能使用

正常使用，直接`return value`要映射的值即可，
如果想映射成`undefined`则需要如下书写：
`return [T]` 或 `return { [T]: undefined }`

例子：(将数据中的‘’字符串映射为null)

```js
const testData = mapFilter(
  { a: 1, b: '', arr: [1, ''] },
  ({ value }: any, T: symbol) => {
    if (value === '') {
      return null
    }
    return T
  }
)
console.log(testData, 'testData')
// ? 处理后的结果
{
  "a": 1,
  "b": null,
  "arr": [
    1,
    null
  ]
}
```
## S4
返回一个Symbol，并且备注唯一
```js
console.log(S4()) // Symbol(12f89)
```

## getUUID
返回一个UUID值
```js
console.log(getUUID()) // '82621f02-a30c-4b51-a0e6-821108b0e904'
```
