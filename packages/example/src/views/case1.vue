<script lang="ts">
import { ref, defineComponent } from "vue";
import {
  CharrueSchemaField,
  CharrueSchemaForm,
} from "@charrue/schema-form-next";

export default defineComponent({
  components: {
    CharrueSchemaField,
    CharrueSchemaForm,
  },
  setup() {
    const schema = {
      label: "Name",
      prop: "name",
      type: "string",
      uiProps: {
        clearable: true,
      },
      formProps: {
        labelWidth: "200px",
      },
    };

    const schema2 = {
      name: schema,
    };

    const value1 = ref("");
    const value2 = ref("default");

    const value3 = ref({});

    const onChange = (val: any) => {
      console.log(val);
    };

    return {
      schema,
      schema2,
      value1,
      value2,
      value3,

      onChange,
    };
  },
});
</script>

<template>
  <CharrueSchemaField
    v-model:value="value1"
    :schema="schema"
  ></CharrueSchemaField>
  <span>value: {{ value1 }}</span>
  <CharrueSchemaField v-model:value="value2" :schema="schema">
    <template #name="{ value }">
      <el-input
        :model-value="value"
        :rows="2"
        type="textarea"
        @blur="onChange(value)"
      ></el-input>
    </template>
  </CharrueSchemaField>
  <span>value: {{ value2 }}</span>

  <CharrueSchemaForm v-model="value3" :schema="schema2"></CharrueSchemaForm>
</template>
