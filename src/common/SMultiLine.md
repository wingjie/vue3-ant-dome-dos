## SMultiLine 参数配置
因该组件专服务于 STable ,在使用 SMultiLine 时，需要（如下例子）将STable插槽传出的所有数据全部使用`v-bind`传给 SMultiLine
```js
<template #great="data">
  <SMultiLine v-bind="data" :defaultOnOff="true" />
</template>
```

### filedList 的特殊写法
```js
// 需要拆分的列的columns样式修改为以下样式
{
  title: 'string', // 标题
  key: 'great',   // 键值
  type: 'slot', // 插槽
  width: 740, // 总共拆分列的长度
  slotHead: true, //自定义表头
  configData: 'content', // 配置数据的key
  content: { 
    borderColor: '#eee', // 下划线颜色
    before: [
        { width: 100 | '100px', title: 'string', key: 'string' },
    ], 
    configData: 'content',
    content: {
      ..... // 如果此处需要继续拆分
    }
    after: [  { width: 100 | '100px', title: 'string', key: 'string' },]
  },
}
```
在这里只说几个特殊的字段，其他字段说明请参考STable
<font style='color:red'> 值得注意的是这里的width需要等于递归列的和，不然会有意想不到的问题。</font>
| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ |  ------ |
| configData | 要配置数据的key（x=content） | string | -- |
| `x`=content | 该字段是动态的，是由上面configData配置,这里是动态很有必要性的，此key不仅仅是配置，在数据中也会用到此key,为了和数据保持统一，就也设置为动态 | object | -- |
| `x=content`.borderColor | 下划线颜色 | string | '#eee' |
| `x=content`.before | 展示在下一层级前面的列（列配置数据请参考STable文档） | array | -- |
| `x=content`.after | 展示在下一层级后面的列（列配置数据请参考STable文档） | array | -- |
| `x=content`.configData | 下一层级要配置数据的key | string | -- |
| `x=content`.`x`=content | 递归设置和上面`x`=content一样 | object | -- |
| ... | 其他字段请参考STable文档 | ... | -- |


### 需要拆分的列的tableData格式示例
```js
[
  {
    'key1': 'value1',
    ......
    content:[
      {
        'key2': 'value2',
        ......
        content:[ //两层分割，当有多层时继续
          {
            'key3': 'value3',
            ......
              
          },
          .....
        ]
      },
      .....
    ]
  },
  .....
]
```
### SMultiLine其它参数

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ |  ------ |
| showCount | 展示几行 | number | 1 |
| defaultOnOff | 是否默认展开 | boolean | false |
| icon | 是否展示开关的图标 | boolean | true |
| header | 是否渲染的头部，如上面例子中第一个SMultiLine组件,当其为真时表示渲染头部 | - | undefined |

### slot（和table一样）
单元格插槽当fieldList中的某个Item的type='slot'时，激活表单插槽
作用域参数介绍，{scope,field,data,model,extra}：
* field：当前列配置
* data：整体数据
* model：整体配置（可以通过父组件直接获取）
* scope：当前行数据
* extra：额外数据（辅助数据)
* way: 操作表格方法（默认操作的是本行数据，当然也可以传入其他行类型进行操作（少见);内容间tableRef(表单方法)）
写法：
```js
// 展开闭合图标的插槽
<template #icon="{method,onOff,field,scope, ...}">
  ......
</template>

// 假设 keyName='name',作用于form-item中，此插件没有预设某种表单类型时候，就可用此插槽进行自定义。
<template #nameIn="{field,data,model,scope}">
  ......
</template>

// 假设 keyName='age',作用于form-item外的插槽
<template #ageOut="{field,data,model,scope}">
  ......
</template>

// 假设 keyName='age'
<template #age="{way}">
  <a-button @click='way.update()'>修改</a-button>
  ......
</template>
```
