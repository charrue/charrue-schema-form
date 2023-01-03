import { defineComponent, h, PropType, computed } from "vue";
import { ElSlider } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

type ElSliderProps = InstanceType<typeof ElSlider>["$props"];

export type CharrueSliderFieldProps = FieldProps<
  Omit<ElSliderProps, "modelValue" | "onUpdate:modelValue" | "type">
>;

const defaultUiProps: CharrueSliderFieldProps = {};

export const CharrueSliderField = defineComponent({
  name: "CharrueSliderField",
  props: {
    modelValue: {
      type: [Number] as PropType<ElSliderProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<
        Omit<FormSchemaDef<CharrueSliderFieldProps>, "enums">
      >,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: ["update:modelValue", "change", "input"],
  setup(props, { emit }) {
    const onInput = (value: ElSliderProps["modelValue"]) => {
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
      $slots
    );
  },
});
