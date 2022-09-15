<script setup lang="ts">
import { ref, computed, watch, useSlots } from "vue";
import type { FormSchemaDef } from "./types";
import isEqual from "lodash.isequal";
import builtInWidgets from "./built-in/widgets";
const props = defineProps<{
  schema: FormSchemaDef;
  prop: string;
  value: any;
  disabled: boolean;
}>();

const emits = defineEmits(["input"]);
const slots = useSlots();
const slotNames = computed(() => {
  return Object.keys(slots);
});

const currentValue = ref<any>();

const formItemProps = computed(() => {
  const { schema, prop } = props;
  return {
    prop,
    label: schema.title,
    required: Boolean(schema.required),
    ...(schema.formProps || {}),
  };
});

const widget = computed(() => {
  const { schema } = props;
  if (!schema) return "el-input";
  const uiWidget = schema["ui-widget"];

  if (uiWidget && builtInWidgets[uiWidget]) return builtInWidgets[uiWidget];
  if (!uiWidget && builtInWidgets[schema.type]) return builtInWidgets[schema.type];

  return uiWidget;
});

watch(
  () => props.value,
  (value) => {
    // currentValue.value = value;
    let tempValue = value != null ? value : props.schema.default;
    if (props.schema.type === "array" && !tempValue) {
      tempValue = [];
    }

    if (!isEqual(currentValue.value, tempValue)) {
      currentValue.value = tempValue;
    }
  },
  {
    immediate: true,
  },
);

const onInput = (value: any) => {
  let tempValue = value;
  if (props.schema.type === "number") {
    tempValue = tempValue.replace(/[^\d^\\.]+/g, "");
    tempValue = tempValue === "" ? "" : Number(tempValue);
  }
  if (props.schema.type === "string" && typeof value === "string") {
    tempValue = props.schema.trim !== false ? value.trim() : value;
  }

  currentValue.value = tempValue;
  emits("input", props.prop, currentValue.value);
};
</script>

<template>
  <div class="charrue-schema-field-wrapper">
    <el-form-item v-bind="formItemProps">
      <template v-if="disabled">
        <slot :name="prop + ':readonly'"></slot>
        <span>{{ value || "-" }}</span>
      </template>
      <template v-else>
        <slot :name="prop">
          <component
            :is="widget"
            class="charrue-schema-field-item"
            :data-property="prop"
            :schema="schema"
            :key="prop"
            :model-value="currentValue"
            v-bind="schema['ui-props'] || {}"
            @update:model-value="onInput"
          >
            <template v-for="(slotName, index) in slotNames || []" #[slotName] :key="index">
              <slot :name="slotName" />
            </template>
          </component>
        </slot>
      </template>
    </el-form-item>
  </div>
</template>
