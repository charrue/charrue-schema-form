<script lang="ts" setup>
import { ref } from "vue";
import { ElInput, ElButton } from "element-plus";
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
  }),
  createInputSchema("bar", "Bar"),
);
const value = ref({ foo: "foo", bar: "" });
</script>

<template>
  <CharrueSchemaForm v-model="value" :schema="schema" label-width="150px">
    <template #foo>
      <el-input v-model="value.foo" placeholder="Please input">
        <template #append>.com</template>
      </el-input>
    </template>
    <template #bar:prepend>
      <span>Http://</span>
    </template>
    <template #formItem:foo:label>
      <div class="foo-label">Custom Label</div>
    </template>
    <template #extra>
      <ElFormItem>
        <el-button>Cancel</el-button>
        <el-button type="primary">Submit</el-button>
      </ElFormItem>
    </template>
  </CharrueSchemaForm>
</template>

<style>
.foo-label {
  font-weight: bold;
  color: #42b883;
}
</style>
