<script lang="ts" setup>
import { ref, computed, PropType } from "vue";
import { FormSchemaDef, CharrueSchemaField } from "@charrue/schema-form-next";

interface UiProps {
  label: string;
  field: FormSchemaDef;
}

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  schema: {
    type: Object as PropType<FormSchemaDef<UiProps>>,
    required: true,
  },
});
const label = computed(() => {
  return props.schema.uiProps?.label || "";
});

const options = ref<FormSchemaDef[]>([]);
const addOption = () => {
  if (props.schema.uiProps?.field) {
    options.value.push(props.schema.uiProps?.field);
  }
};

const deleteOption = (index: number) => {
  if (options.value.length === 1) return;
  options.value.splice(index, 1);
};
addOption();
</script>

<template>
  <div>
    <div class="array-field-label">{{ label }}</div>

    <div v-for="(item, index) in options" :key="index" class="array-field-item">
      <CharrueSchemaField :schema="item"></CharrueSchemaField>
      <el-button class="action" type="danger" @click="deleteOption(index)">Delete</el-button>
    </div>

    <div>
      <el-button type="primary" @click="addOption">Add</el-button>
    </div>
  </div>
</template>

<style lang="scss">
.array-field-label {
  font-size: 20px;
  margin-bottom: 16px;
}
.array-field-item {
  position: relative;

  .action {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
