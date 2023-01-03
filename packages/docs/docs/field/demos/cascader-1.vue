<script lang="ts" setup>
import { ref } from "vue";
import { CharrueSchemaForm, FormSchemaDef } from "@charrue/schema-form-next";

const options = [
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency",
          },
          {
            value: "feedback",
            label: "Feedback",
          },
          {
            value: "efficiency",
            label: "Efficiency",
          },
          {
            value: "controllability",
            label: "Controllability",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation",
          },
          {
            value: "top nav",
            label: "Top Navigation",
          },
        ],
      },
    ],
  },
];
const schema: Record<string, FormSchemaDef> = {
  foo: {
    prop: "foo",
    label: "Foo",
    type: "string",
    uiWidget: "cascader",
    uiProps: {
      options,
    },
  },
};
const value = ref({ foo: "" });
</script>

<template>
  <CharrueSchemaForm v-model="value" :schema="schema"></CharrueSchemaForm>
</template>
