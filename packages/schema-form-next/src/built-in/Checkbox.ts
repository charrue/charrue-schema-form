import { h, defineComponent, PropType, computed } from "vue";
import {
  ElCheckboxGroup,
  ElCheckbox,
  ElCheckboxButton,
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxGroupEmits,
} from "element-plus";
import { useEnums } from "./useEnums";
import type { CheckboxValueType } from "element-plus";
import type { ListOptionItem, FormSchemaDef, FieldProps } from "../types";

type ElCheckboxGroupProps = Partial<CheckboxGroupProps>;
type ElCheckboxProps = Partial<CheckboxProps>;

export type CheckboxOptionItem = ListOptionItem<CheckboxValueType>;

export type CharrueCheckboxFieldProps = FieldProps<{
  checkboxGroup?: Omit<ElCheckboxGroupProps, "modelValue">;
  checkbox?: ElCheckboxProps | ((item: CheckboxOptionItem, index: number) => ElCheckboxProps);
  isButton?: boolean;
}>;

const emits: CheckboxGroupEmits = {
  "update:modelValue": (val: CheckboxValueType[]) => true,
  change: (val: CheckboxValueType[]) => true,
};

export const CharrueCheckboxField = defineComponent({
  name: "CharrueCheckboxField",
  props: {
    modelValue: {
      type: Array as PropType<Array<string | number>>,
      default() {
        return [];
      },
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
    const onInput = (val: CheckboxValueType[]) => {
      emit("update:modelValue", val);
    };

    const checkboxProps = computed<CharrueCheckboxFieldProps>(() => {
      const fieldSchema = props.schema;
      const defaultCheckboxProps: CharrueCheckboxFieldProps = {
        checkboxGroup: {},
        checkbox: {},
        isButton: false,
      };
      if (!fieldSchema) return defaultCheckboxProps;

      const uiProps = fieldSchema["ui-props"] || fieldSchema.uiProps || {};
      return {
        checkboxGroup: uiProps.checkboxGroup || defaultCheckboxProps.checkboxGroup,
        checkbox: uiProps.checkbox || defaultCheckboxProps.checkbox,
        isButton: uiProps.isButton || defaultCheckboxProps.isButton,
      };
    });

    return {
      checkboxProps,
      onInput,
      options,
    };
  },
  render() {
    const {
      $attrs = {},
      modelValue,
      checkboxProps,
      options,

      onInput,
    } = this;

    return h(
      ElCheckboxGroup,
      {
        ...$attrs,
        ...checkboxProps.checkboxGroup,
        modelValue,
        "onUpdate:modelValue": onInput,
      },
      () =>
        options.map((item, index) => {
          const itemProps =
            typeof checkboxProps.checkbox === "function"
              ? checkboxProps.checkbox(item, index)
              : checkboxProps.checkbox;
          return h(
            checkboxProps.isButton ? ElCheckboxButton : ElCheckbox,
            {
              ...itemProps,
              label: item.value,
              key: `checkbox-item-${index}-${item.value}`,
            },
            () => item.label,
          );
        }),
    );
  },
});
