<script lang="ts" setup>
import { ref, computed, watch, PropType } from "vue";
import { FormSchemaDef, CharrueSchemaField } from "@charrue/schema-form-next";

interface UiProps {
  label: string;
  fields: FormSchemaDef[];
}

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  schema: {
    type: Object as PropType<FormSchemaDef<UiProps>>,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const fields = computed(() => {
  return props.schema.uiProps?.fields || [];
});
const label = computed(() => {
  return props.schema.uiProps?.label || "";
});

const formData = ref<Record<string, string>>({});
watch(
  formData,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true },
);
</script>

<template>
  <div>
    <div class="object-field-label">{{ label }}</div>

    <div v-for="(item, index) in fields" :key="index" class="array-field-item">
      <CharrueSchemaField v-model="formData[item.prop!]" :schema="item"></CharrueSchemaField>
    </div>
  </div>
</template>

<style lang="scss">
.object-field-label {
  font-size: 20px;
  margin-bottom: 16px;
}
</style>
