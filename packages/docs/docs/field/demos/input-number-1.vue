<script lang="ts" setup>
import { ref } from "vue";
import { CharrueSchemaForm, FormSchemaDef } from "@charrue/schema-form-next";

const schema: Record<string, FormSchemaDef> = {
  foo: {
    type: "number",
    prop: "foo",
    label: "Foo",
    uiProps: {
      placeholder: "请输入一个10的倍数",
      controls: true,
      step: 10,
    },
  },
};
const value = ref({ foo: 10 });
</script>

<template>
  <CharrueSchemaForm v-model="value" :schema="schema"></CharrueSchemaForm>
</template>
