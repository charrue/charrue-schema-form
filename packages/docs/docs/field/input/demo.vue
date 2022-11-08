<script lang="ts" setup>
import { ref } from "vue";
import { CharrueSchemaForm, FormSchemaDef } from "@charrue/schema-form-next";

const schema: Record<string, FormSchemaDef> = {
  foo: {
    type: "string",
    prop: "foo",
    label: "Foo",
  },
};
const foo = ref("foo");
</script>

<template>
  <CharrueSchemaForm v-model:value="foo" :schema="schema"></CharrueSchemaForm>
</template>
