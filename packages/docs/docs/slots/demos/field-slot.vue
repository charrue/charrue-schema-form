<script lang="ts" setup>
import { ref } from "vue";
import {
  CharrueSchemaForm,
  createSchemaPipeline,
  createInputSchema,
} from "@charrue/schema-form-next";

const schema = createSchemaPipeline(createInputSchema("foo", "Foo"));
const value = ref({ foo: "foo" });
</script>

<template>
  <CharrueSchemaForm v-model="value" :schema="schema">
    <template #foo:prefix>
      <span>$</span>
    </template>
  </CharrueSchemaForm>
</template>
