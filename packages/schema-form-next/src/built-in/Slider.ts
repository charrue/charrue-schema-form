import { defineComponent, h, PropType, computed } from "vue";
import { ElSlider, SliderProps, SliderEmits } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types";

type ElSliderProps = Partial<SliderProps>;

export type CharrueSliderFieldProps = FieldProps<
  Omit<ElSliderProps, "modelValue" | "onUpdate:modelValue" | "type">
>;

const defaultUiProps: CharrueSliderFieldProps = {};
const emits: SliderEmits = {
  "update:modelValue": (value: number | number[]) => true,
  input: (value: number | number[]) => true,
  change: (value: number | number[]) => true,
};

export const CharrueSliderField = defineComponent({
  name: "CharrueSliderField",
  props: {
    modelValue: {
      type: [Number, Array] as PropType<ElSliderProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueSliderFieldProps>, "enums">>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits,
  setup(props, { emit }) {
    const onInput = (value: number | number[]) => {
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
      ElSlider,
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
