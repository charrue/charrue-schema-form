<script lang="ts" setup>
import { ref } from "vue";
import { CharrueSchemaForm, FormSchemaDef } from "@charrue/schema-form-next";

const schema: Record<string, FormSchemaDef> = {
  foo: {
    prop: "foo",
    label: "Foo",
    type: "string",
    uiWidget: "radio",
    enums: [
      { label: "OptionA", value: "a" },
      { label: "OptionB", value: "b" },
    ],
  },
};
const value = ref({ foo: "a" });
</script>

<template>
  <CharrueSchemaForm v-model="value" :schema="schema"></CharrueSchemaForm>
</template>
