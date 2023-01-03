# 插槽

## 自定义表单组件

当默认的表单组件不满足你的需求的时候，你可以使用插槽来自定义组件内容。

<demo src="./demos/field.vue"></demo>


## 设置表单组件的插槽

你还可以使用表单组件的插槽，例如`el-input`的`prefix`插槽。

<demo src="./demos/field-slot.vue"></demo>


## extra

有时候需要表单组件以外的地方去处理一些特殊处理，这个时候可以使用`extra`插槽。

<demo src="./demos/extra.vue"></demo>


## form-item插槽

由于该组件是基于`el-form`和`el-form-item`开发的，所以可能会有使用`el-form-item`插槽的场景。

<demo src="./demos/form-item-slot.vue"></demo>
