import { defineComponent, h, PropType, computed } from "vue";
import { ElTimeSelect } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types";

type ElTimeSelectProps = InstanceType<typeof ElTimeSelect>["$props"];

export type CharrueTimeSelectFieldProps = FieldProps<
  Omit<ElTimeSelectProps, "modelValue" | "onUpdate:modelValue" | "type">
>;

const defaultUiProps: CharrueTimeSelectFieldProps = {
  clearable: true,
};

export const CharrueTimeSelectField = defineComponent({
  name: "CharrueTimeSelectField",
  props: {
    modelValue: {
      type: [String] as PropType<string>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueTimeSelectFieldProps>, "enums">>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: ["update:modelValue", "focus", "blur"],
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
      ElTimeSelect,
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
