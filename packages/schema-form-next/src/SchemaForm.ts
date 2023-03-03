/* eslint-disable @typescript-eslint/no-unused-vars */
import { h, ref, shallowRef, watch, defineComponent, computed, Slots } from "vue";
import { ElForm } from "element-plus";
import { CharrueSchemaField } from "./SchemaField";
import { isEqual, has, SLOT_SEP, FORM_ITEM_SLOT_NAMES, FORM_ITEM_SLOT_PREFIX } from "./utils";
import type { FormRules, FormItemProp } from "element-plus";
import { schemaFormProps } from "./props";

type SchemaFormData = Record<string, any>;

export const CharrueSchemaForm = defineComponent({
  name: "CharrueSchemaForm",
  props: schemaFormProps,
  emits: {
    validate: (prop: FormItemProp, isValid: boolean, message: string) => true,
    "update:modelValue": (value: SchemaFormData) => true,
  },
  setup(props, { emit, slots, expose }) {
    const fieldKeys = computed(() => {
      return Object.keys(props.schema || {});
    });
    const elFormRef = ref();

    /**
     * 表单字段插槽
     * 共有3种插槽
     * 1. #name 替代原表单组件
     * 2. #name:prefix 给原表单组件添加插槽
     * 3. #formItem:name:label 给FormItem添加label插槽
     * */
    const fieldSlots = computed(() => {
      const currentSlots: Record<string, Record<string, Slots[string]>> = {};
      Object.keys(slots).forEach((slotName) => {
        const segments = slotName.split(SLOT_SEP);
        const len = segments.length;

        if (len === 1 || len === 2) {
          const [fieldProp, fieldSlot = "default"] = segments;
          if (!currentSlots[fieldProp]) {
            currentSlots[fieldProp] = {};
          }

          if (fieldKeys.value.includes(fieldProp) && fieldSlot) {
            currentSlots[fieldProp][fieldSlot] = slots[slotName]!;
          }
        }

        if (len === 3) {
          const [_, fieldProp, formItemSlot] = segments;
          if (!currentSlots[fieldProp]) {
            currentSlots[fieldProp] = {};
          }

          if (
            _ === FORM_ITEM_SLOT_PREFIX &&
            fieldKeys.value.includes(fieldProp) &&
            FORM_ITEM_SLOT_NAMES.includes(formItemSlot)
          ) {
            currentSlots[fieldProp][`${FORM_ITEM_SLOT_PREFIX}${SLOT_SEP}${formItemSlot}`] =
              slots[slotName]!;
          }
        }
      });
      return currentSlots;
    });

    /** rule + required */
    const computedRules = computed(() => {
      const { rules, schema } = props;
      return fieldKeys.value.reduce((acc, fieldProp) => {
        if (rules?.[fieldProp]) {
          acc[fieldProp] = rules[fieldProp];
        } else if (schema?.[fieldProp]?.required) {
          acc[fieldProp] = [
            {
              required: true,
              message: `${schema?.[fieldProp].label}不能为空`,
              trigger: "blur",
            },
          ];
        }
        return acc;
      }, {} as unknown as FormRules);
    });

    const formData = shallowRef<SchemaFormData>({});
    const defaultValue = computed(() => {
      const { schema } = props;
      return fieldKeys.value.reduce((acc, fieldProp) => {
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
      },
    );

    watch(
      formData,
      () => {
        emit("update:modelValue", formData.value);
      },
      {
        deep: true,
        immediate: true,
      },
    );

    const onInput = (key: string, value: any) => {
      formData.value = {
        ...formData.value,
        [key]: value,
      };
    };
    const onValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
      emit("validate", prop, isValid, message);
    };

    expose({
      validate: () => elFormRef.value?.validate?.(),
      scrollToField: () => elFormRef.value?.scrollToField?.(),
      clearValidate: () => elFormRef.value?.clearValidate?.(),
      validateField: () => elFormRef.value?.validateField?.(),
      resetFields: () => {
        elFormRef.value?.resetFields?.();
        formData.value = defaultValue.value;
      },
    });

    return {
      fieldKeys,
      elFormRef,
      formData,
      computedRules,
      fieldSlots,

      onInput,
      onValidate,
    };
  },
  render() {
    return h(
      ElForm,
      {
        class: ["charrue-schema-form-root", `charrue-schema-form-root--${this.size || "default"}`],
        ref: "elFormRef",
        model: this.formData,
        rules: this.computedRules,
        inline: this.inline,
        labelPosition: this.labelPosition,
        labelWidth: this.labelWidth,
        labelSuffix: this.labelSuffix,
        size: this.size,
        showMessage: this.showMessage,
        inlineMessage: this.inlineMessage,
        statusIcon: this.statusIcon,
        validateOnRuleChange: this.validateOnRuleChange,
        hideRequiredAsterisk: this.hideRequiredAsterisk,
        disabled: this.disabled,
        onValidate: this.onValidate,
      },
      () => [
        ...this.fieldKeys.map((fieldProp, index) => {
          return h(
            CharrueSchemaField,
            {
              key: `schema-field-${fieldProp}-${index}`,
              schema: this.schema[fieldProp],
              value: this.formData[fieldProp],
              visible: this.visibleState?.[fieldProp],
              "onUpdate:value": (value: any) => this.onInput(fieldProp, value),
            } as any,
            this.fieldSlots[fieldProp],
          );
        }),
        this.$slots.extra ? this.$slots.extra() : [],
      ],
    );
  },
});
