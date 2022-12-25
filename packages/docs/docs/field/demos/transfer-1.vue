<script lang="ts" setup>
import { ref } from "vue";
import { CharrueSchemaForm, FormSchemaDef } from "@charrue/schema-form-next";

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 15; i += 1) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = generateData();
const schema: Record<string, FormSchemaDef> = {
  foo: {
    prop: "foo",
    label: "Foo",
    type: "string",
    uiWidget: "transfer",
    uiProps: {
      data,
    },
  },
};
const value = ref({ foo: "" });
</script>

<template>
  <CharrueSchemaForm v-model="value" :schema="schema"></CharrueSchemaForm>
</template>
