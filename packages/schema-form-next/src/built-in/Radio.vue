<template>
  <el-radio-group :model-value="modelValue" @update:model-value="onInput">
    <el-radio v-for="item in enums" :key="item.value" :label="item.value">{{
      item.label
    }}</el-radio>
  </el-radio-group>
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

const onInput = (val: string | number) => {
  emits("update:model-value", val);
};
</script>
