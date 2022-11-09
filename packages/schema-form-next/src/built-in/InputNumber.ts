import { computed, defineComponent, h, PropType } from "vue";
import { ElInputNumber } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types/public";

type ElInputNumberProps = InstanceType<typeof ElInputNumber>["$props"];

export type CharrueInputNumberFieldProps = FieldProps<
  Omit<ElInputNumberProps, "modelValue" | "onUpdate:modelValue">
>;

const defaultUiProps: CharrueInputNumberFieldProps = {
  controls: false,
};

export const CharrueInputNumberField = defineComponent({
  name: "CharrueInputNumberField",
  props: {
    modelValue: {
      type: [Number, String] as PropType<number | "" | undefined>,
      default: "",
    },
    schema: {
      type: Object as PropType<
        Omit<FormSchemaDef<CharrueInputNumberFieldProps>, "enums">
      >,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: ["update:modelValue", "change", "blur", "focus"],
  setup(props, { emit }) {
    const onInput = (value: number | undefined) => {
      emit("update:modelValue", value === undefined ? "" : value);
    };
    const inputProps = computed(() => {
      const fieldSchema = props.schema;

      const uiProps: CharrueInputNumberFieldProps = {
        placeholder: `请输入${fieldSchema.label || ""}`,
        ...defaultUiProps,
        ...(fieldSchema.uiProps || {}),
      };

      return uiProps;
    });

    return {
      onInput,
      inputProps,
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
      ElInputNumber,
      {
        ...$attrs,
        ...inputProps,
        // ElInputNumber不接受string类型，所以判断如果是""，则传入undefined
        modelValue: modelValue === "" ? undefined : modelValue,
        "onUpdate:modelValue": onInput,
      },
      $slots
    );
  },
});
