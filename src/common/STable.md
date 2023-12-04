## STable 参数配置 -- （fieldModel、columns、tableData、name?、extra?、tableAttr、formAttr）

### formAttr、 tableAttr (分别直接作用在a-form、a-table上，不经过合并等操作，优先级高 fieldModel.formAttr、 fieldModel.tableAttr)
若是在STable直接v-model，则会在a-form、a-table全部都起作用。除v-model这样使用外，其他属性不建议这样直接作用在STable上，因为这样会造成作用对象不清晰。
### fieldModel（table表格整体样式的描述--object）

```js
{
  isForm: 'boolean',
  follow: 'boolean',
  tableHeight: 'string',
  disabled: 'boolean',
  columnsConfig: {
    align: 'string',
    disabled: 'boolean',
    width: 'number | string',
    ellipsis: 'boolean', // 当需要showConfig时候，title又没有值的时候，这里需要false
    },
  tableAttr: {
    rowKey: 'string', // 通常为id
    loading: 'boolean',
    pagination: {
      size: 'large', // 默认值
      'page-size-options': ['10', '20', '30', '40', '50'], // 默认值
      'show-size-changer': true, // 默认值 
      'show-quick-jumper': true, // 默认值
      showTotal: (total: any) => `共 ${total} 条数据`, // 分页中显示总的数据 
      pageSize: 10, // 默认值
      current: 'number',
      total: 'number',
      ......
    }, 
    onChange() {
      ...... //一般在分页时使用
    }，
    bordered: 'boolean',
    rowSelection: 'object',
    style: {
      width: '100%',
    }, // 默认值
    scroll: {
      y: '11550px',
    }, // 默认值
    size: 'small', // 默认值
  },
  optionsData: {
    keyName: [],
    ......
  },
  async:{
    optionsData: {
      // 通常为异步方法
      async keyName() {
          ...... await ......
          return ...
      }
    }
    ......
  },
  // 以下属性，通常为表单表格是使用
  rules: {
    keyName: [{......}],
    ......
  },
  config: {
    isForm: 'boolean',
    isCore: 'boolean',
    disabled: 'boolean',
    isShowFindCodeName: 'boolean',
    isForm: 'boolean',
    ......
  },
}
```
| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ |  ------ |
| isForm | 当为表格表单时是否展示form表单，跟config中的isForm控制机制不同，该字段是以行的形式控制是否展示 | boolean | true |
| follow | 数据传递是否可以更改内部数据 | boolean | true |
| disabled | 当为表格表单时是否全局禁用（注意类型为slot及插槽除外） | boolean | false |
| tableHeight | 固定当前表格的高度 | string | null |
| columnsConfig | Column的一些参数(https://www.antdv.com/components/table-cn#Column) | object | -- |
| tableAttr | table的一些参数(https://www.antdv.com/components/table-cn#Table)| object | -- |
| rules | 当为表格表单时Form.item的一些校验(https://www.antdv.com/components/form-cn#Form-Item) ，需要主要此处的formItemAttr中的属性会被fieldList中相同的属性覆盖 | object | -- |
| config | 当为表格表单时所有item的参数以及各种方法，此处以input为例（https://www.antdv.com/components/input#Input) ，需要主要此处的config中的属性会被fieldList中相同的属性覆盖 | object | -- |
| config.isShowFindCodeName | 默认值为true，当存在type不是'slot'时将默认翻译展示或展示原始值 | boolean | true |
| config.isForm | 当为表格表单时是否展示表单，将映射到filedList下的每个配置项 | boolean | true |
| optionsData | 配置例如select的options的属性，key值为item的键值，会被fieldList中相同options的属性覆盖 | -- |
| async | 配置fieldModel中的属性，主要用于实现异步方法，主要应用于字典的获取 | -- |

### filedList（表格配置参考（https://www.antdv.com/components/table-cn#Column） -- Array） 

```js
[
  {
    title: 'string',
    key: 'string',
    type: 'string',
    dataIndex: 'string',
    showConfig: 'boolean',
    fixed: 'string',
    sorter: 'boolean',
    ellipsis: 'boolean',
    slotHead: 'boolean',
    disabled: 'boolean', // 表单属性
    isForm:'boolean', // 表单属性
    config: {
      isForm:'boolean',// 表单属性
      disabled: 'boolean', // 表单属性
      allowClear: 'boolean', // 表单属性
      rules: 'Array', // 表单属性
      placeHolder: 'string' // 表单属性
      watchScoped:(SR:object, direct:object)=>{console.log(SR, direct)}  // 表单属性
      options: 'computed(() => {......}) '
      update:value=(value: any) => {console.log(value)}// 表单属性
      change=({value}) => {console.log(value)}// 表单属性
      blur=({value}) => {console.log(value)}// 表单属性
      ......
    }
  }
  ......
]
```

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ |  ------ |
| title | title 表头的文本(可以为' '作为占位使用) | string | -- |
| key | Vue 需要的 key,数据项中对应的路径 | string | -- |
| dataIndex | 数据项中对应的索引通常与key相同 | string | -- |
| showConfig | 是否展示列操作的图标（可进行列隐藏和显示） | boolean | false |
| fixed | 是否固定列操作（通常为操作列） | boolean | false |
| sorter | 是否展示排序的图标 | boolean | false |
| ellipsis | 是否超出的文本以省略号展示 | boolean | false |
| slotHead | 是否组自定义表头信息 | boolean | false |
| type | 为表单表格时的类型或者需要翻译时,当前有--input、select、switch、textarea、radio、checkbox、time-picker、slot(自定义插槽，将同时存在两个插槽，formItem内、外)、slotOut（不要formItem的插槽）…… | string | span |
| disabled | 表格属性是否禁用 | boolean | false |
| isForm | 表格属性是否使用type信息，使用span形式展示,受限于fieldModel中的isForm | boolean | false |
| options | radio-group、checkbox-group、select的option固定配置  | array<{value, label, [disabled, key, title]}> | -- |
| config | 每个item的一些参数以及各种方法,通常为表格表单时使用，此处以input为例（https://www.antdv.com/components/input-cn#Input） ，需要主要此处的config中的属性会覆盖fieldModel中相同的属性，其中的options配置可以作用于select下拉内容动态改变 | object | -- |
```js
// config中的watchScoped()方法解释
// 有两个参数SR, direct 都为对象
此方法主要运用于在表单表格中有联动数据时使用：如下 可以通过SR中的某个' record.keyName' 数据来更改direct中'options'数据
其中SR为不可直接修改,其类容有
{
  rowIndex,
  field,
  record,
  value: computed(() => record.value[field.value.key]),
  extra: readonly(extra),
  options: readonly(optionsScoped)
  rowMsg,
}
//  当然如同field这样的对象数据，也可以通过 SR.field.keyName 进行修改
direct为可直接修改,其类容有
{
  value: any
  config: {
    isShowFindCodeName: 'boolean',
    isForm: 'boolean',
    type: 'string',
  }
  options: "[] || computed(() => {......})",
}

```


### tableData(表格数据)

```js
// 初始化时为[]
[
  {keyName1: 'string | undefined | null', keyName2: 'string | undefined | null'},
  ......
]
```
| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ |  ------ |
| keyName | 每个item的键值，根据需要设置初始值,没有默认为undefined | string、undefined、null、number... | null |

### tableRef(表单方法)

| 方法名 | 说明 | 参数 |
| ------ | ------ | ------ |
| getData | 获取整个表格的数据 | ()=> { return formData} |
| findCodeItem | 获取表格的中某个翻译列表的当前项 | ({optionsData,value})=> Promise |
| resRules |处理rules数据的方法 | ({rule,value})=> { return {rowIndex, dataAt, record, value, fieldArr} } |
| validate | 触发表单表格验证 | ()=> Promise |
以下方法也可作为插槽使用，当不传值时，默认为当前行
| update | 修改表单表格（行内编辑）某一行的数据 | (row)=> { return { mapRecord,record} } |
| updateAll | 修改表单表格（行内编辑）所有的数据 | (row)=> { return { mapData,data} } |
| confirm | 确认表单表格（行内编辑）某一行的数据，与update配套使用 | (row)=> void |
| confirmAll | 确认表单表格（行内编辑）的数据，与updateAll配套使用 | (row)=> void |
| cancel | 取消修表单表格（行内编辑）某一行的数据，与update配套使用 | (row)=> void |
| confirmAll | 取消修改表单表格（行内编辑）的数据，与updateAll配套使用 | (row)=> void |
| validateRow | 触发表单表格某一行验证 | (row)=> Promise |
| resetFieldsRow | 重置表单表格某行的数据 | ()=> void |
| clearValidateRow | 移除表单表格某行的校验结果 | (row)=> void |

### 表格插槽
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
// 例如自定义option同级的插槽
<template #itemSlot="{field,data,model}">
<a-button @click='way.update()'>修改</a-button>
......
</template>
```
### 合并表格 (逻辑为对表格的拆分)

请参考SMultiLine组件说明
