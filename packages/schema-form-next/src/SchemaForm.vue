<!-- eslint-disable no-prototype-builtins -->
<script setup lang="ts">
import { computed, reactive, ref, useSlots, watch } from "vue";
import SchemaField from "./SchemaField.vue";
import isEqual from "lodash.isequal";
import type { FormItemRule } from "element-plus";
import { FormSchemaDef } from "./types";

type SchemaFormData = Record<string, any>;

const props = defineProps<{
  modelValue: SchemaFormData;
  formRef?: string;
  schema: Record<string, FormSchemaDef>;
  rules?: Record<string, FormItemRule[]>;
  disabled?: boolean;
}>();

const emits = defineEmits(["update:modelValue"]);

const slots = useSlots();
const fieldSlots = reactive<Record<string, { name: string }[]>>({});
const formItemSlots = reactive<Record<string, { name: string }[]>>({});

const fields = computed(() => {
  return Object.keys(props.schema || {});
});

Object.keys(slots).forEach((k) => {
  const segments = k.split(":");
  if (segments.length === 3 && segments[0] === "formItem") {
    if (!formItemSlots[segments[1]]) {
      formItemSlots[segments[1]] = [];
    }
    formItemSlots[segments[1]].push({
      name: `formItem:${segments[2]}`,
    });
  }
  if (segments.length === 2 && fields.value.includes(segments[0])) {
    if (!fieldSlots[segments[0]]) {
      fieldSlots[segments[0]] = [];
    }
    fieldSlots[segments[0]].push({
      name: segments[1],
    });
  }
});

const elFormRef = ref<any>(null);

const formData = ref<SchemaFormData>({});

const computedRules = computed(() => {
  const requiredRules = fields.value.reduce((acc, fieldName) => {
    if (props.rules?.[fieldName]) {
      acc[fieldName] = props.rules[fieldName];
    } else if (props.schema?.[fieldName]?.required) {
      acc[fieldName] = [
        { required: true, message: `${props.schema?.[fieldName].title}不能为空`, trigger: "blur" },
      ];
    }
    return acc;
  }, {} as Record<string, FormItemRule[]>);

  return requiredRules;
});

const defaultValue = fields.value.reduce((acc, cur) => {
  if (props.modelValue.hasOwnProperty(cur)) {
    acc[cur] = props.modelValue[cur];
  } else if (props.schema?.[cur].hasOwnProperty("default")) {
    acc[cur] = props.schema[cur].default;
  }
  return acc;
}, {} as Record<string, any>);

if (!isEqual(formData.value, defaultValue)) {
  formData.value = defaultValue;
  emits("update:modelValue", formData.value);
}

const onInput = (key: string, value: any) => {
  formData.value[key] = value;
};

watch(
  () => props.modelValue,
  (value) => {
    formData.value = value;
    if (!isEqual(value, formData.value)) {
      formData.value = value ?? {};
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

watch(
  formData,
  () => {
    emits("update:modelValue", formData.value);
  },
  {
    deep: true,
    immediate: true,
  },
);

defineExpose({
  validate: computed(() => elFormRef.value?.validate),
  scrollToField: computed(() => elFormRef.value?.scrollToField),
  clearValidate: computed(() => elFormRef.value?.clearValidate),
  validateField: computed(() => elFormRef.value?.validateField),
  resetFields: computed(() => elFormRef.value?.resetFields),
});
</script>

<template>
  <el-form
    v-bind="$attrs"
    ref="elFormRef"
    class="charrue-schema-form-container"
    :model="formData"
    :rules="computedRules"
    :disabled="disabled"
  >
    <schema-field
      v-for="prop in fields"
      :key="prop"
      :prop="prop"
      :disabled="disabled || false"
      :schema="schema[prop]"
      :value="formData[prop]"
      @input="onInput"
      v-on="$attrs"
    >
      <template #[prop]>
        <slot :name="prop"></slot>
      </template>
      <template v-for="(item, index) in fieldSlots[prop] || []" #[item.name] :key="index">
        <slot :name="prop + ':' + item.name" />
      </template>
      <!-- TODO: SchemaField暂未实现此部分逻辑 -->
      <template v-for="(item, index) in formItemSlots[prop] || []" #[item.name] :key="index">
        <slot :name="'formItem:' + prop + ':' + item.name" />
      </template>
    </schema-field>
    <slot name="extra"></slot>
  </el-form>
</template>
