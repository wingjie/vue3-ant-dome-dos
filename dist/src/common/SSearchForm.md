## SSearchForm参数配置 


| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ |  ------ |
| fieldList | SForm中的fieldList参数 | array | -- |
| formModel | SForm中的formModel参数 | object | -- |
| formData | SForm中的formData参数 | object | -- |
| presetButton | 是否展示默认的搜索、重置按钮 | boolean | true |
| onOff | 当搜索列表长度大于72px(默认三排)时初始化是否全展开 | boolean | false |


### SSearchForm(方法)

```js
//search
const search = ({ onOff, formData }: { onOff: boolean; formData: object }) =>{
    .....
}

//reset
const reset = () =>{}

//resetPost
const resetPost = () =>{
 ......
}

```
| 方法名 | 说明 | 参数 |
| ------ | ------ | ------ |
| search | 用于搜索，可获取当前的onOff、formData | ({onOff,formData}=>void) |
| reset | 用于清空当前的搜索条件 | （）=>void | 
| resetPost | 用于清空当前的搜索条件同时,可以添加某些操作,优先级低于reset | （）=>void |

> SSearchForm中设置默认插槽，可以添加默写操作
```js
<SSearchForm>此处添加某些元素</SSearchForm>
```