import { defineComponent, h, PropType, computed } from "vue";
import {
  ElTransfer,
  TransferProps,
  TransferEmits,
  TransferDirection,
  TransferKey,
} from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types";

type ElTransferProps = Partial<TransferProps>;

export type CharrueTransferFieldProps = FieldProps<Omit<ElTransferProps, "modelValue">>;

const defaultUiProps: CharrueTransferFieldProps = {};
const emits: TransferEmits = {
  change: (value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) => true,
  "update:modelValue": (value: TransferKey[]) => true,
  "left-check-change": (value: TransferKey[], movedKeys?: TransferKey[] | undefined) => true,
  "right-check-change": (value: TransferKey[], movedKeys?: TransferKey[] | undefined) => true,
};

export const CharrueTransferField = defineComponent({
  name: "CharrueTransferField",
  props: {
    modelValue: {
      type: [Array] as PropType<ElTransferProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueTransferFieldProps>, "enums">>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits,
  setup(props, { emit }) {
    const onInput = (value: NonNullable<ElTransferProps["modelValue"]>) => {
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
      $slots,
    );
  },
});
