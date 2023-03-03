import { defineComponent, h, PropType, computed } from "vue";
import { ElDatePicker } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

type ElDatePickerProps = InstanceType<typeof ElDatePicker>["$props"];

export type CharrueDateFieldProps = FieldProps<
  Omit<ElDatePickerProps, "modelValue" | "onUpdate:modelValue" | "type">
> & {
  type?: "year" | "month" | "date" | "datetime" | "week";
};

const defaultUiProps: CharrueDateFieldProps = {
  clearable: true,
  type: "date",
};

export const CharrueDateField = defineComponent({
  name: "CharrueDateField",
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number | Date>,
      default: "",
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueDateFieldProps>, "enums">>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: [
    "update:modelValue",
    "change",
    "blur",
    "focus",
    "calendar-change",
    "panel-change",
    "visible-change",
  ],
  setup(props, { emit }) {
    const onInput = (value: string) => {
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
      ElDatePicker,
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
