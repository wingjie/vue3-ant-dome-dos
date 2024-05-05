## SForm参数配置 -- （formModel、filedList、formData）
*** 

### formModel（form整体的描述--object）

```js
{
    span: 'number',
    isForm: 'boolean',
    disabled: 'boolean',
    formItemAttr: { 
            labelCol: {span: 'number'},
            wrapperCol: {span: 'number'}
            labelAlign: 'string',
            colon: 'boolean',
            ......
        },
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
}
```
| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ |  ------ |
| span | 每个item占的比列 | number | 8 |
| disabled | 是否全局禁用（注意类型为slot及插槽除外） | boolean | false |
| isForm | 是否展示form表单，跟config中的isForm控制机制不同，该字段是以行的形式控制是否展示 | boolean | true |
| follow | 数据传递是否可以更改内部数据 | boolean | true |
| formAttr | Form的一些参数(https://www.antdv.com/components/form#Form) ，需要主要此处的rules中的属性会被fieldList中的config中的相同的属性覆盖 | object | -- |
| formItemAttr | Form.item的一些参数[https://www.antdv.com/components/form-cn#校验规则](https://www.antdv.com/components/form#校验规则) ，需要主要此处的rules中的属性会被fieldList中的config中的相同的属性覆盖 | object | -- |
| rules | Form.item的一些校验(https://www.antdv.com/components/form-cn#Form-Item) ，需要主要此处的formItemAttr中的属性会被fieldList中相同的属性覆盖 | object | -- |
| config | 所有item的参数以及各种方法，此处以input为例（https://www.antdv.com/components/input#Input) ，需要主要此处的config中的属性会被fieldList中相同的属性覆盖 | object | -- |
| config.isShowFindCodeName | 默认值为true，当存在type不是'slot'时将默认翻译展示或展示原始值 | boolean | true |
| config.isForm | 是否展示表单，将映射到filedList下的每个配置项 | boolean | true |
| config.isCore | 是否以纯文本形式展示，不考虑type类型，将映射到filedList下的每个配置项 | boolean | true |
| optionsData | 配置例如select的options的属性，key值为item的键值，会被fieldList中相同options的属性覆盖 | -- |
| async | 配置formModel中的属性，主要用于实现异步方法，主要应用于字典的获取 | -- |
| rowAttr | 布局的方式，Row(https://www.antdv.com/components/grid-cn#Row)  | object |
| colAttr.style | 布局的方式，Row的额外配置，硬性的改变Col的样式属性  | object |

### filedList（表单配置 -- Array） 


```js
[
    {
        span: 'number',
        label: 'string | ' '' ,
        key: 'string',
        type: 'string',
        disabled: 'boolean',
        options: 'Array',
        formItemAttr: { 
            labelCol: {span: 'number'},
            wrapperCol: {span: 'number'}
            labelAlign: 'string',
            colon: 'boolean',
            ......
        },
        config: {
            isCore: 'boolean',
            disabled: 'boolean',
            allowClear: 'boolean',
            rules: 'Array',
            placeHolder: 'string'
            options: 'computed(() => {......}) '
            customRender(a:any,b:any,c:any){return [module,argument]}
            update:value=(value: any) => {console.log(value)}
            change=({value}) => {console.log(value)}
            blur=({value}) => {console.log(value)}
            ......
        }

    }
    ......
]
```

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ |  ------ |
| label | label 标签的文本(可以为‘ ’作为占位使用) | string | -- |
| key | Vue 需要的 key,数据项中对应的路径 | string | -- |
| type | formItem的类型,当前有--input、select、switch、textarea、radio、checkbox、time-picker、slot(自定义插槽，将同时存在两个插槽，formItem内、外)、slotOut（不要formItem的插槽）…… | string | span |
| disabled | 是否禁用 | boolean | false |
| span | 每个item占的比列 | number | 8 |
| options | radio-group、checkbox-group、select的option固定配置  | array<{value, label, [disabled, key, title]}> | -- |
| formItemAttr | Form.item的一些参数(https://www.antdv.com/components/form-cn#Form-Item) ，需要主要此处的formItemAttr中的属性会覆盖formModel中相同的属性 | object | -- |
| config | 每个item的一些参数以及各种方法，此处以input为例（https://www.antdv.com/components/input-cn#Input） ，需要主要此处的config中的属性会覆盖formModel中相同的属性，其中的options配置可以作用于select下拉内容动态改变;其中isCore属性默认为TRUE，表示正常展示，当isCore为false时表示直接展示文本 | object | -- |
| config.customRender | 自定义渲染方法，用来直接渲染组件，其中a参数包含filed、record、rowIndex、value参数，b参数包含同级的数据，c参数表示当前的formModel数据，返回值中的module表示组件，argument表示需要参入组建的参数 | fn | -- |

### formData(表单数据)

```js
// 初始化时为{}
{
    keyName: 'string | undefined | null',
    ......

}
```
| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ |  ------ |
| keyName | 每个item的键值，根据需要设置初始值,没有默认为undefined | string、undefined、null、number... | null |

### formRef(表单方法)

| 方法名 | 说明 | 参数 |
| ------ | ------ | ------ |
| getData | 获取整个表单的数据 | ()=>{return formData} |
| validate | 触发表单验证 | ()=>Promise |
| clearValidate | 移除表单项的校验结果 | ()=>void |

### 表单插槽
    单元格插槽当fieldList中的某个Item的type='slot'时，激活表单插槽
作用域参数介绍，{field,data,model}：
* field：当前列配置
* data：整体数据
* model：整体配置（可以通过父组件直接获取）
写法：
```js
// 假设 keyName='name',作用于form-item中，此插件没有预设某种表单类型时候，就可用此插槽进行自定义。
<template #nameIn="{field,data,model}">
......
</template>
// 假设 keyName='age',作用于form-item外的插槽
<template #ageOut="{field,data,model}">
......
</template>
```