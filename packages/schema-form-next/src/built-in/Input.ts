import { defineComponent, h, PropType, computed } from "vue";
import { ElInput, InputProps, InputEmits } from "element-plus";
import type { FormSchemaDef, FieldProps } from "../types";

type ElInputProps = Partial<InputProps>;
export type CharrueInputFieldProps = FieldProps<Omit<ElInputProps, "modelValue">>;

const defaultUiProps: CharrueInputFieldProps = {
  clearable: true,
};
const emits: InputEmits = {
  "update:modelValue": (value: string) => true,
  input: (value: string) => true,
  change: (value: string) => true,
  focus: (evt: FocusEvent) => true,
  blur: (evt: FocusEvent) => true,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => true,
  mouseenter: (evt: MouseEvent) => true,
  keydown: (evt: KeyboardEvent | Event) => true,
  compositionstart: (evt: CompositionEvent) => true,
  compositionupdate: (evt: CompositionEvent) => true,
  compositionend: (evt: CompositionEvent) => true,
};

export const CharrueInputField = defineComponent({
  name: "CharrueInputField",
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number | null | undefined>,
      default: "",
    },
    schema: {
      type: Object as PropType<Omit<FormSchemaDef<CharrueInputFieldProps>, "enums">>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits,
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
      $slots,
    );
  },
});
