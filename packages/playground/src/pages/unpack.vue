<script lang="ts" setup>
import { computed, ref } from "vue";
import { CharrueSchemaForm, registerWidget, FormSchemaDef } from "@charrue/schema-form-next";
import ObjectField from "../components/ObjectField.vue";

registerWidget("ObjectField", ObjectField);

const schema: Record<string, FormSchemaDef> = {
  hideObjA: {
    prop: "hideObjA",
    label: "Hide ObjA",
    type: "boolean",
    uiWidget: "switch",
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

const formData = ref<Record<string, any>>({
  hideObjA: false,
});
const displayValue = computed(() => {
  return JSON.stringify(formData.value, null, 2);
});

const visibleState = computed(() => {
  return {
    obj: {
      objA: !formData.value.hideObjA,
    },
  };
});
</script>

<template>
  <div>
    <CharrueSchemaForm
      v-model="formData"
      :schema="schema"
      :visible-state="visibleState"
    ></CharrueSchemaForm>

    <pre>{{ displayValue }}</pre>
  </div>
</template>
