import { defineComponent, h, PropType, computed } from "vue";
import { ElRate } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

type ElRateProps = InstanceType<typeof ElRate>["$props"];

export type CharrueRateFieldProps = FieldProps<
  Omit<ElRateProps, "modelValue" | "onUpdate:modelValue" | "type">
>;

const defaultUiProps: CharrueRateFieldProps = {};

export const CharrueRateField = defineComponent({
  name: "CharrueRateField",
  props: {
    modelValue: {
      type: Number as PropType<ElRateProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<
        Omit<FormSchemaDef<CharrueRateFieldProps>, "enums">
      >,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const onInput = (value: ElRateProps["modelValue"]) => {
      emit("update:modelValue", value);
    };

    const fieldProps = computed(() => {
      const fieldSchema = props.schema;

      return {
        ...defaultUiProps,
        ...(fieldSchema.uiProps || {}),
      };
    });

    return {
      fieldProps,

      onInput,
    };
  },
  render() {
    const {
      modelValue,
      fieldProps,
      $slots,
      $attrs = {},

      onInput,
    } = this;

    return h(
      ElRate,
      {
        ...$attrs,
        ...fieldProps,
        modelValue,
        "onUpdate:modelValue": onInput,
      },
      $slots
    );
  },
});
