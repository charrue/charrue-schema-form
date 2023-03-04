<script lang="ts" setup>
import { computed, ref } from "vue";
import { CharrueSchemaForm, FormSchemaDef } from "@charrue/schema-form-next";

const options = [
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
        children: [
          {
            value: "consistency",
            label: "Consistency",
          },
          {
            value: "feedback",
            label: "Feedback",
          },
          {
            value: "efficiency",
            label: "Efficiency",
          },
          {
            value: "controllability",
            label: "Controllability",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "side nav",
            label: "Side Navigation",
          },
          {
            value: "top nav",
            label: "Top Navigation",
          },
        ],
      },
    ],
  },
];

const schema: Record<string, FormSchemaDef> = {
  cascader: {
    prop: "cascader",
    label: "Cascader",
    type: "string",
    uiWidget: "cascader",
    uiProps: {
      options,
    },
  },
  checkbox: {
    prop: "checkbox",
    label: "Checkbox",
    type: "string",
    uiWidget: "checkbox",
    enums: [
      { label: "Hide ColorPicker", value: "colorPicker" },
      { label: "Hide DateRange", value: "dateRange" },
      { label: "Hide Date", value: "date" },
      { label: "Hide Input", value: "input" },
    ],
  },
  colorPicker: {
    prop: "colorPicker",
    label: "ColorPicker",
    type: "string",
    uiWidget: "colorPicker",
  },
  dateRange: {
    prop: "dateRange",
    label: "DateRange",
    type: "array",
    uiWidget: "dateRange",
  },
  date: {
    prop: "date",
    label: "Date",
    type: "string",
    uiWidget: "date",
  },
  input: {
    type: "string",
    prop: "input",
    label: "Input",
  },
  inputNumber: {
    type: "number",
    prop: "inputNumber",
    label: "InputNumber",
  },
  radio: {
    prop: "radio",
    label: "Radio",
    type: "string",
    uiWidget: "radio",
    enums: [
      { label: "OptionA", value: "A" },
      { label: "OptionB", value: "B" },
      { label: "OptionC", value: "C" },
      { label: "OptionD", value: "D" },
    ],
  },
  rate: {
    prop: "rate",
    label: "Rate",
    type: "number",
    uiWidget: "rate",
  },
  select: {
    prop: "select",
    label: "Select",
    type: "string",
    uiWidget: "select",
    enums: ["A", "B"],
  },
  slider: {
    prop: "slider",
    label: "Slider",
    type: "string",
    uiWidget: "slider",
  },
  switch: {
    prop: "switch",
    label: "Switch",
    type: "string",
    uiWidget: "switch",
  },
  timePicker: {
    prop: "timePicker",
    label: "TimePicker",
    type: "string",
    uiWidget: "timePicker",
  },
  timeSelect: {
    prop: "timeSelect",
    label: "TimeSelect",
    type: "string",
    uiWidget: "timeSelect",
  },
};
const value = ref<Record<string, any>>({ input: "foo" });

const displayValue = computed(() => {
  return JSON.stringify(value.value, null, 2);
});

const visibleState = computed(() => {
  const checkbox: string[] = value.value.checkbox || [];

  return checkbox.reduce((acc, cur) => {
    acc[cur] = false;
    return acc;
  }, {} as unknown as Record<string, boolean>);
});
</script>

<template>
  <div>
    <CharrueSchemaForm
      v-model="value"
      :schema="schema"
      :visible-state="visibleState"
    ></CharrueSchemaForm>

    <pre>{{ displayValue }}</pre>
  </div>
</template>
