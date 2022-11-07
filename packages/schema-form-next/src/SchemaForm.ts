import { h, ref, watch, defineComponent, PropType, computed, Slots } from "vue";
import { ElForm } from "element-plus";
import { CharrueSchemaField } from "./SchemaField";
import { FormSchemaDef } from "./types/public";
import {
  isEqual,
  has,
  SLOT_SEP,
  FORM_ITEM_SLOT_NAMES,
  FORM_ITEM_SLOT_PREFIX,
} from "./utils";
import type { FormRules } from "element-plus";

type SchemaFormData = Record<string, any>;

export const CharrueSchemaForm = defineComponent({
  name: "CharrueSchemaForm",
  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
      },
    },
    schema: {
      type: Object as PropType<Record<string, FormSchemaDef>>,
      required: true,
    },
    rules: {
      type: Object as PropType<FormRules>,
      default() {
        return {};
      },
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots, expose }) {
    const fields = computed(() => {
      return Object.keys(props.schema || {});
    });
    const elFormRef = ref();

    const fieldSlots = computed(() => {
      const currentSlots: Record<string, Record<string, Slots[string]>> = {};
      Object.keys(slots).forEach((slotName) => {
        currentSlots[slotName] = {};
        const segments = slotName.split(SLOT_SEP);

        if (segments?.length === 2) {
          const [fieldProp, fieldSlot = "default"] = segments;
          if (fields.value.includes(fieldProp) && fieldSlot) {
            currentSlots[fieldProp][fieldSlot] = slots[slotName]!;
          }
        }

        if (segments?.length === 3) {
          const [_, fieldProp, formItemSlot] = segments;
          if (
            _ === FORM_ITEM_SLOT_PREFIX &&
            fields.value.includes(fieldProp) &&
            FORM_ITEM_SLOT_NAMES.includes(formItemSlot)
          ) {
            currentSlots[fieldProp][
              `${FORM_ITEM_SLOT_PREFIX}${SLOT_SEP}${formItemSlot}`
            ] = slots[slotName]!;
          }
        }
      });

      return currentSlots;
    });

    const computedRules = computed(() => {
      const { rules, schema } = props;
      return fields.value.reduce((acc, fieldProp) => {
        if (rules?.[fieldProp]) {
          acc[fieldProp] = rules[fieldProp];
        } else if (schema?.[fieldProp]?.required) {
          acc[fieldProp] = [
            {
              required: true,
              message: `${schema?.[fieldProp].title}不能为空`,
              trigger: "blur",
            },
          ];
        }
        return acc;
      }, {} as unknown as FormRules);
    });

    const formData = ref<SchemaFormData>({});
    const defaultValue = computed(() => {
      const { schema } = props;
      return fields.value.reduce((acc, fieldProp) => {
        if (schema?.[fieldProp] && has(schema[fieldProp], "default")) {
          acc[fieldProp] = schema[fieldProp].default;
        }
        return acc;
      }, {} as unknown as Record<string, any>);
    });

    watch(
      () => props.modelValue,
      (value = {}) => {
        const valueWithDefaults = {
          ...defaultValue.value,
          ...value,
        };

        if (!isEqual(valueWithDefaults, formData.value)) {
          formData.value = valueWithDefaults;
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    watch(
      formData,
      () => {
        emit("update:modelValue", formData.value);
      },
      {
        deep: true,
        immediate: true,
      }
    );

    const onInput = (key: string, value: any) => {
      formData.value[key] = value;
    };

    expose({
      validate: () => elFormRef.value?.validate,
      scrollToField: () => elFormRef.value?.scrollToField,
      clearValidate: () => elFormRef.value?.clearValidate,
      validateField: () => elFormRef.value?.validateField,
      resetFields: () => elFormRef.value?.resetFields,
    });

    return {
      fields,
      elFormRef,
      formData,
      computedRules,
      fieldSlots,

      onInput,
    };
  },
  render() {
    const {
      $attrs,
      schema,
      fields,
      formData,
      computedRules,
      fieldSlots,

      onInput,
    } = this;
    return h(
      ElForm as any,
      {
        class: "charrue-schema-form-container",
        model: formData,
        rules: computedRules,
        ref: "elFormRef",
        ...$attrs,
      },
      () =>
        fields.map((fieldProp, index) => {
          return h(
            CharrueSchemaField,
            {
              key: `schema-field-${fieldProp}-${index}`,
              schema: schema[fieldProp],
              value: formData[fieldProp],
              "onUpdate:value": (value: any) => onInput(fieldProp, value),
            } as any,
            fieldSlots[fieldProp]
          );
        })
    );
  },
});
