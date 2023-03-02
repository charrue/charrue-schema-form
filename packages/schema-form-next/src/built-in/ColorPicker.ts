import { defineComponent, h, PropType, computed } from "vue";
import { ElColorPicker, ColorPickerProps, ColorPickerEmits } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

export type CharrueColorPickerFieldProps = FieldProps<
  Omit<Partial<ColorPickerProps>, "modelValue" | "onUpdate:modelValue">
>;

const defaultUiProps: CharrueColorPickerFieldProps = {};
const emits: ColorPickerEmits = {
  "update:modelValue": (val: string | null) => true,
  change: (val: string | null) => true,
  activeChange: (val: string | null) => true,
};

export const CharrueColorPickerField = defineComponent({
  name: "CharrueColorPickerField",
  props: {
    modelValue: {
      type: String as PropType<ColorPickerProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueColorPickerFieldProps>, "enums">>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits,
  setup(props, { emit }) {
    const onInput = (value: string | null) => {
      emit("update:modelValue", value || null);
    };

    const compProps = computed(() => {
      const fieldSchema = props.schema;

      return {
        ...defaultUiProps,
        ...(fieldSchema.uiProps || {}),
      };
    });

    return {
      compProps,
      onInput,
    };
  },
  render() {
    const {
      modelValue,
      compProps,
      $slots,
      $attrs = {},

      onInput,
    } = this;

    return h(
      ElColorPicker,
      {
        ...$attrs,
        ...compProps,
        modelValue,
        "onUpdate:modelValue": onInput,
      },
      $slots,
    );
  },
});
