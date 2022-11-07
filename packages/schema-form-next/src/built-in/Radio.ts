import { h, defineComponent, PropType, computed } from "vue";
import { ElRadioGroup, ElRadio, ElRadioButton } from "element-plus";
import { useEnums } from "./useEnums";
import type { FormSchemaDef, ListOptionItem } from "../types/public";

type ElRadioGroupProps = InstanceType<typeof ElRadioGroup>["$props"];
type ElRadioProps = InstanceType<typeof ElRadio>["$props"];

type RadioValueType = string | number | boolean;

export type RadioListOptionItem = ListOptionItem<RadioValueType>;

export interface CharrueRadioFieldProps {
  radioGroup?: Omit<ElRadioGroupProps, "modelValue" | "onUpdate:modelValue">;
  radio?:
    | ElRadioProps
    | ((item: RadioListOptionItem, index: number) => ElRadioProps);
  isButton?: boolean;
}

export const CharrueRadioField = defineComponent({
  name: "CharrueRadioField",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
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
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const options = useEnums(props.schema.enums);
    const onInput = (val: RadioValueType) => {
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
              value: item.value,
              key: `radio-item-${index}-${item.value}`,
            },
            () => item.label
          );
        })
    );
  },
});
