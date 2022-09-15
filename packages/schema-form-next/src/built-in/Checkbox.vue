<template>
  <el-checkbox-group :model-value="modelValue" @update:model-value="onInput">
    <el-checkbox v-for="item in enums" :key="item.value" :label="item.value">{{
      item.label
    }}</el-checkbox>
  </el-checkbox-group>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { FormSchemaDef } from "../types";
import { useEnums } from "./useEnums";
const props = defineProps<{
  schema: FormSchemaDef;
  modelValue: any;
}>();
const enums = useEnums(computed(() => props.schema.enums));

const emits = defineEmits(["update:model-value"]);

const onInput = (val: string[]) => {
  emits("update:model-value", val);
};
</script>
