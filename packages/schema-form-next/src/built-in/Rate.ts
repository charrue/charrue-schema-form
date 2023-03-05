import { defineComponent, h, PropType, computed } from "vue";
import { ElRate, RateProps } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types";

type ElRateProps = Partial<RateProps>;

export type CharrueRateFieldProps = FieldProps<
  Omit<ElRateProps, "modelValue" | "onUpdate:modelValue" | "type">
>;

const defaultUiProps: CharrueRateFieldProps = {};
const emits = {
  change: (value: number) => true,
  "update:modelValue": (value: number | undefined) => true,
};

export const CharrueRateField = defineComponent({
  name: "CharrueRateField",
  props: {
    modelValue: {
      type: Number as PropType<ElRateProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueRateFieldProps>, "enums">>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits,
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
      $slots,
    );
  },
});
