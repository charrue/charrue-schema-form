import { computed, defineComponent, h, PropType } from "vue";
import { ElInputNumber, InputNumberProps, InputNumberEmits } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

type ElInputNumberProps = Partial<InputNumberProps>;

export type CharrueInputNumberFieldProps = FieldProps<Omit<ElInputNumberProps, "modelValue">>;

const defaultUiProps: CharrueInputNumberFieldProps = {
  controls: false,
};
const emits: InputNumberEmits = {
  change: (prev: number | undefined, cur: number | undefined) => true,
  blur: (e: FocusEvent) => true,
  focus: (e: FocusEvent) => true,
  input: (val: number | null | undefined) => true,
  "update:modelValue": (val: number | undefined) => true,
};

export const CharrueInputNumberField = defineComponent({
  name: "CharrueInputNumberField",
  props: {
    modelValue: {
      type: Number as PropType<ElInputNumberProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueInputNumberFieldProps>, "enums">>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits,
  setup(props, { emit }) {
    const onInput = (value: number | undefined) => {
      emit("update:modelValue", typeof value === "number" ? value : undefined);
    };
    const inputProps = computed(() => {
      const fieldSchema = props.schema;

      const uiProps: CharrueInputNumberFieldProps = {
        placeholder: `请输入${fieldSchema.label || ""}`,
        ...defaultUiProps,
        ...(fieldSchema.uiProps || {}),
      };

      return uiProps;
    });

    return {
      onInput,
      inputProps,
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
      ElInputNumber,
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
