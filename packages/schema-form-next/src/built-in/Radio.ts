import { h, defineComponent, PropType, computed } from "vue";
import {
  ElRadioGroup,
  ElRadio,
  ElRadioButton,
  RadioProps,
  RadioGroupProps,
  RadioGroupEmits,
} from "element-plus";
import { useEnums } from "./useEnums";
import type { FormSchemaDef, ListOptionItem, FieldProps } from "../types";

type ElRadioGroupProps = Partial<RadioGroupProps>;
type ElRadioProps = Partial<RadioProps>;

export type RadioListOptionItem = ListOptionItem<string | number | boolean>;

export type CharrueRadioFieldProps = FieldProps<{
  radioGroup?: Omit<ElRadioGroupProps, "modelValue">;
  radio?: ElRadioProps | ((item: RadioListOptionItem, index: number) => ElRadioProps);
  isButton?: boolean;
}>;

const emits: RadioGroupEmits = {
  "update:modelValue": (val: string | number | boolean) => true,
  change: (val: string | number | boolean) => true,
};

export const CharrueRadioField = defineComponent({
  name: "CharrueRadioField",
  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<RadioGroupProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<FormSchemaDef>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits,
  setup(props, { emit }) {
    const options = useEnums(props.schema.enums);
    const onInput = (val: RadioGroupProps["modelValue"]) => {
      emit("update:modelValue", val);
    };

    const radioProps = computed<CharrueRadioFieldProps>(() => {
      const { schema } = props;
      const defaultRadioProps: CharrueRadioFieldProps = {
        radioGroup: {},
        radio: {},
        isButton: false,
      };
      if (!schema) return defaultRadioProps;

      const uiProps = schema["ui-props"] || schema.uiProps || {};
      return {
        radioGroup: uiProps.radioGroup || defaultRadioProps.radioGroup,
        radio: uiProps.radio || defaultRadioProps.radio,
        isButton: uiProps.isButton || defaultRadioProps.isButton,
      };
    });

    return {
      radioProps,
      onInput,
      options,
    };
  },
  render() {
    const {
      $attrs = {},
      modelValue,
      radioProps,
      options,

      onInput,
    } = this;

    return h(
      ElRadioGroup,
      {
        ...$attrs,
        ...radioProps.radioGroup,
        modelValue,
        "onUpdate:modelValue": onInput,
      },
      () =>
        options.map((item, index) => {
          const itemProps =
            typeof radioProps.radio === "function"
              ? radioProps.radio(item, index)
              : radioProps.radio;

          return h(
            radioProps.isButton ? ElRadioButton : ElRadio,
            {
              ...itemProps,
              label: item.value,
              key: `radio-item-${index}-${item.value}`,
            },
            () => item.label,
          );
        }),
    );
  },
});
