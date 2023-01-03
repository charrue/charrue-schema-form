<script lang="ts" setup>
import { ref } from "vue";
import { CharrueSchemaForm, FormSchemaDef } from "@charrue/schema-form-next";

const schema: Record<string, FormSchemaDef> = {
  foo: {
    prop: "foo",
    label: "Foo",
    type: "array",
    uiWidget: "dateRange",
  },
};
const value = ref({ foo: [] });
</script>

<template>
  <CharrueSchemaForm v-model="value" :schema="schema"></CharrueSchemaForm>
</template>
