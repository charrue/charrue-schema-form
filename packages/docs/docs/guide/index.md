

## 关于
`@charrue/schema-form-next`是一个基于Element Plus的增强型的表单组件，面向配置开发，快速搭建出表单页面。支持Vue3.x

<!-- ## 特性 -->


## 安装

``` bash
npm install element-plus @charrue/schema-form-next --save
```

## 简单示例
``` vue
<script lang="ts" setup>
import { ref } from "vue";
import { CharrueSchemaForm, FormSchemaDef } from "@charrue/schema-form-next";

const schema: Record<string, FormSchemaDef> = {
  foo: {
    type: "string",
    prop: "foo",
    label: "Foo",
    uiProps: {
      placeholder: "请输入您的用户名,长度不能大于10位",
      maxlength: 10,
      showWordLimit: true,
    },
  },
};
const value = ref({ foo: "foo" });
</script>

<template>
  <CharrueSchemaForm v-model="value" :schema="schema"></CharrueSchemaForm>
</template>

```

## 版本

[![schema-form-next](https://img.shields.io/npm/v/@charrue/schema-form-next.svg?style=flat-square)](https://www.npmjs.org/package/@charrue/schema-form-next)[![NPM downloads](https://img.shields.io/npm/dt/@charrue/schema-form-next.svg?style=flat-square)](https://npmjs.org/package/@charrue/schema-form-next)