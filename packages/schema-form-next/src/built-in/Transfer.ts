import { defineComponent, h, PropType, computed } from "vue";
import { ElTransfer } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

type ElTransferProps = InstanceType<typeof ElTransfer>["$props"];

export type CharrueTransferFieldProps = FieldProps<
  Omit<ElTransferProps, "modelValue" | "onUpdate:modelValue">
>;

const defaultUiProps: CharrueTransferFieldProps = {};

export const CharrueTransferField = defineComponent({
  name: "CharrueTransferField",
  props: {
    modelValue: {
      type: [Array] as PropType<ElTransferProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<
        Omit<FormSchemaDef<CharrueTransferFieldProps>, "enums">
      >,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: [
    "update:modelValue",
    "change",
    "left-check-change",
    "right-check-change",
  ],
  setup(props, { emit }) {
    const onInput = (value: ElTransferProps["modelValue"]) => {
      emit("update:modelValue", value);
    };

    const inputProps = computed(() => {
      const fieldSchema = props.schema;

      return {
        ...defaultUiProps,
        ...(fieldSchema.uiProps || {}),
      };
    });

    return {
      inputProps,
      onInput,
    };
  },
  render() {
    const {
      modelValue,
      inputProps,
      $slots,
      $attrs = {},

      onInput,
    } = this;

    return h(
      ElTransfer,
      {
        ...$attrs,
        ...inputProps,
        modelValue,
        "onUpdate:modelValue": onInput,
      },
      $slots
    );
  },
});
