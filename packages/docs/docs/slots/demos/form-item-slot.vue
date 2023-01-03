<script lang="ts" setup>
import { ref } from "vue";
import {
  CharrueSchemaForm,
  createSchemaPipeline,
  createInputSchema,
} from "@charrue/schema-form-next";

const schema = createSchemaPipeline(
  createInputSchema("foo", "Foo", {
    uiProps: {
      placeholder: "请输入您的用户名,长度不能大于10位",
      maxlength: 10,
      showWordLimit: true,
    },
  })
);
const value = ref({ foo: "foo" });
</script>

<template>
  <CharrueSchemaForm v-model="value" :schema="schema">
    <template #formItem:foo:label>
      <div style="font-weight: bold; color: #42b883">Custom Label</div>
    </template>
  </CharrueSchemaForm>
</template>
