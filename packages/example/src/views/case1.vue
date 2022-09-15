<script setup>
import { ref } from "vue";
import {
  createSchemaPipeline,
  createInputSchema,
  createSelectSchema,
} from "@charrue/schema-form-next";
const formData =  ref({})
const formSchema = createSchemaPipeline(
  createInputSchema("name", "姓名", {
    "ui-props": {
      style: "width: 220px"
    }
  }),
  createSelectSchema("rank", "等级", {
    enums: ["A", "B", "C"],
  })
)
</script>


<template>
  <charrue-schema-form v-model="formData" :schema="formSchema"></charrue-schema-form>
</template>
