import { defineComponent, h, PropType, computed } from "vue";
import { ElInput } from "element-plus";
import type { FormSchemaDef } from "../types/public";

type ElInputProps = InstanceType<typeof ElInput>["$props"];

export type CharrueInputFieldProps = Omit<
  ElInputProps,
  "modelValue" | "onUpdate:modelValue"
>;

const defaultUiProps: CharrueInputFieldProps = {
  clearable: true,
};

export const CharrueInputField = defineComponent({
  name: "CharrueInputField",
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number | null | undefined>,
      default: "",
    },
    schema: {
      type: Object as PropType<
        Omit<FormSchemaDef<CharrueInputFieldProps>, "enums">
      >,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: ["update:modelValue", "change", "blur", "focus"],
  setup(props, { emit }) {
    const onInput = (value: string) => {
      emit("update:modelValue", value);
    };

    const inputProps = computed(() => {
      const fieldSchema = props.schema;

      return {
        placeholder: `请输入${props.schema?.label || ""}`,
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
      ElInput,
      {
        ...$attrs,
        ...inputProps,
        modelValue,
        "onUpdate:modelValue": onInput,
      },
      $slots
    );
  },
});
