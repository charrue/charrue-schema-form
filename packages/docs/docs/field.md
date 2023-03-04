# 组件

## SchemaForm

### Props

| Name | Description | Type  | Default |
| --- | --- | --- | --- |
| modelValue | 表单数据对象 | `object` | - |
| schema | 表单结构定义 | `object` | `{}` |
| visibleState | 控制字段的显隐 | `object` | - |
| rules | 同`el-form`的`rules` | `object` | - |
| inline | 同`el-form`的`inline` | `boolean` | `false` |
| labelPosition | 同`el-form`的`labelPosition` | `left` | `right` | `top` | `right` |
| labelWidth | 同`el-form`的`labelWidth` | `string` | `number` | - |
| labelSuffix | 同`el-form`的`labelSuffix` | `string` | - |
| hideRequiredAsterisk | 同`el-form`的`hideRequiredAsterisk` | `boolean` | - |
| requireAsteriskPosition | 同`el-form`的`requireAsteriskPosition` | `left` \| `right` | `left` |
| showMessage | 同`el-form`的`showMessage` | `boolean` | `true` |
| inlineMessage | 同`el-form`的`inlineMessage` | `boolean` | `false` |
| statusIcon | 同`el-form`的`statusIcon` | `boolean` | `false` |
| validateOnRuleChange | 同`el-form`的`validateOnRuleChange` | `boolean` | `true` |
| size | 同`el-form`的`size` | `large` \| `default` \| `small` | `true` |
| disabled | 同`el-form`的`disabled` | `boolean` | - |
| scrollToError | 同`el-form`的`scrollToError` | `boolean` | `false` |
| clearAfterHide | 同`el-form`的`clearAfterHide` | `boolean` | `false` |

### Events

| Name | Description | Type  |
| --- | --- | --- |
| validate | 任一表单项被校验后触发 | `Function` |

### Expose

| Name | Description | Type  |
| --- | --- | --- |
| validate | 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise | `Function` |
| validateField | 验证具体的某个字段 | `Function` |
| resetFields | 重置该表单项，将其值重置为初始值，并移除校验结果 | `Function` |
| scrollToField | 滚动到指定的字段 | `Function` |
| clearValidate | 	清理某个字段的表单验证信息 | `Function` |

### 插槽

支持的插槽类型
- 用于替换默认的表单字段组件，插槽命名为`<prop>`
- 表单字段组件自身的插槽，插槽命名为`<prop>:<name>`
- FormItem的插槽，插槽命名为`formItem:<prop>:<formItemSlot>`
- 特殊插槽
  - 表单字段下单的区域的插槽，插槽命名为`extra`

当默认的表单组件不满足你的需求的时候，你可以使用插槽来自定义组件内容。

<demo src="./demos/slot.vue"></demo>


## 全部组件

### 基础使用

以下案例中列举了所有支持的组件类型:

<demo src="./demos/basic.vue"></demo>

