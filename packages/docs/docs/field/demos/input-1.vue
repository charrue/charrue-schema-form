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
