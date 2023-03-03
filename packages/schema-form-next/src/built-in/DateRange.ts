import { defineComponent, h, PropType, computed } from "vue";
import { ElDatePicker, DateModelType } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

type ElDatePickerProps = InstanceType<typeof ElDatePicker>["$props"];

export type CharrueDateRangeFieldProps = FieldProps<
  Omit<ElDatePickerProps, "modelValue" | "onUpdate:modelValue" | "type">
> & {
  type?: "datetimerange" | "daterange" | "monthrange";
};
type DateRangeValue = [DateModelType, DateModelType];

const defaultUiProps: CharrueDateRangeFieldProps = {
  clearable: true,
  type: "daterange",
};

export const CharrueDateRangeField = defineComponent({
  name: "CharrueDateRangeField",
  props: {
    modelValue: {
      type: Array as unknown as PropType<DateRangeValue>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueDateRangeFieldProps>, "enums">>,
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
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
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
