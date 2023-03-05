<script lang="ts" setup>
import { computed, ref } from "vue";
import { CharrueSchemaForm, registerWidget, FormSchemaDef } from "@charrue/schema-form-next";
import ObjectField from "../components/ObjectField.vue";

registerWidget("ObjectField", ObjectField);

const schema: Record<string, FormSchemaDef> = {
  foo: {
    prop: "foo",
    label: "Foo",
    type: "string",
  },
  obj: {
    prop: "obj",
    label: "Obj",
    type: "object",
    uiWidget: "ObjectField",
    unpack: true,
    uiProps: {
      fields: [
        {
          prop: "objA",
          label: "objA",
          type: "string",
        },
        {
          prop: "objB",
          label: "objB",
          type: "string",
        },
      ],
    },
  },
};

const formData = ref<Record<string, string>>({});
const displayValue = computed(() => {
  return JSON.stringify(formData.value, null, 2);
});
</script>

<template>
  <div>
    <CharrueSchemaForm v-model="formData" :schema="schema"></CharrueSchemaForm>

    <pre>{{ displayValue }}</pre>
  </div>
</template>
