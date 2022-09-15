![](https://raw.githubusercontent.com/ckangwen/image-host/main/images/charrue-schema-form.svg)
## charrue-schema-form
基于element-ui和element-plus快速实现表单

### 安装依赖
``` bash
npm install @charrue/schema-form-next
```

### 添加引用

``` js
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import CharrueSchemaForm from "@charrue/schema-form-next";

const app = createApp(App);

app.use(ElementPlus);
app.use(CharrueSchemaForm);

app.mount("#app");

```


### 组件使用
``` vue
<script setup>
import { ref } from "vue";
import {
  createSchemaPipeline,
  createInputSchema,
  createSelectSchema,
} from "@charrue/schema-form-next";
const formData =  ref({})
const formSchema = createSchemaPipeline(
  createInputSchema("name", "姓名", {
    "ui-props": {
      style: "width: 220px"
    }
  }),
  createSelectSchema("rank", "等级", {
    enums: ["A", "B", "C"],
  })
)
</script>


<template>
  <charrue-schema-form
    v-model="formData"
    :schema="formSchema"
  ></charrue-schema-form>
</template>
```