import { defineComponent, h, PropType, computed } from "vue";
import { ElSwitch, SwitchProps, SwitchEmits } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

type ElSwitchProps = Partial<SwitchProps>;

export type CharrueSwitchFieldProps = FieldProps<
  Omit<ElSwitchProps, "modelValue" | "onUpdate:modelValue" | "type">
>;

const defaultUiProps: CharrueSwitchFieldProps = {};
const emits: Partial<SwitchEmits> = {
  "update:modelValue": (val: boolean | string | number) => true,
  change: (val: boolean | string | number) => true,
  input: (val: boolean | string | number) => true,
};

export const CharrueSwitchField = defineComponent({
  name: "CharrueSwitchField",
  props: {
    modelValue: {
      type: [Number, String, Boolean] as PropType<ElSwitchProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<
        Omit<FormSchemaDef<CharrueSwitchFieldProps>, "enums">
      >,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits,
  setup(props, { emit }) {
    const onInput = (value: ElSwitchProps["modelValue"]) => {
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
      ElSwitch,
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
