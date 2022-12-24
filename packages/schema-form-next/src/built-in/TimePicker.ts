import { defineComponent, h, PropType, computed } from "vue";
import { ElTimePicker } from "element-plus";
import type { ModelValueType } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

type ElTimePickerProps = InstanceType<typeof ElTimePicker>["$props"];

export type CharrueTimePickerFieldProps = FieldProps<
  Omit<ElTimePickerProps, "modelValue" | "onUpdate:modelValue" | "type">
>;

const defaultUiProps: CharrueTimePickerFieldProps = {
  clearable: true,
};

export const CharrueTimePickerField = defineComponent({
  name: "CharrueTimePickerField",
  props: {
    modelValue: {
      type: [Number, String] as PropType<ModelValueType>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<
        Omit<FormSchemaDef<CharrueTimePickerFieldProps>, "enums">
      >,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: ["update:modelValue", "change", "blur", "focus", "visible-change"],
  setup(props, { emit }) {
    const onInput = (value: any) => {
      emit("update:modelValue", value);
    };

    const fieldProps = computed(() => {
      const fieldSchema = props.schema;

      return {
        placeholder: `请选择${props.schema?.label || ""}`,
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
      ElTimePicker,
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
