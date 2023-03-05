import { defineComponent, h, PropType, computed } from "vue";
import { ElCascader } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types";

type ElCascaderProps = InstanceType<typeof ElCascader>["$props"];

export type CharrueCascaderFieldProps = FieldProps<
  Omit<ElCascaderProps, "modelValue" | "onUpdate:modelValue">
>;

const defaultUiProps: CharrueCascaderFieldProps = {};

export const CharrueCascaderField = defineComponent({
  name: "CharrueCascaderField",
  props: {
    modelValue: {
      type: [String, Array, Object] as PropType<ElCascaderProps["modelValue"]>,
      default: undefined,
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueCascaderFieldProps>, "enums">>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: ["update:modelValue", "change", "left-check-change", "right-check-change"],
  setup(props, { emit }) {
    const onInput = (value: ElCascaderProps["modelValue"]) => {
      emit("update:modelValue", value);
    };

    const inputProps = computed(() => {
      const fieldSchema = props.schema;

      return {
        placeholder: `请选择${props.schema?.label || ""}`,
        ...defaultUiProps,
        ...(fieldSchema.uiProps || {}),
      };
    });

    return {
      inputProps,
      onInput,
    };
  },
  render() {
    const {
      modelValue,
      inputProps,
      $slots,
      $attrs = {},

      onInput,
    } = this;

    return h(
      ElCascader,
      {
        ...$attrs,
        ...inputProps,
        modelValue,
        "onUpdate:modelValue": onInput,
      },
      $slots,
    );
  },
});
