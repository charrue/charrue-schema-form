import { computed, defineComponent, h, PropType } from "vue";
import { ElInputNumber } from "element-plus";
import type { FormSchemaDef } from "../types/public";

type ElInputNumberProps = InstanceType<typeof ElInputNumber>["$props"];

export type CharrueInputNumberFieldProps = Omit<
  ElInputNumberProps,
  "modelValue" | "onUpdate:modelValue"
>;

const CLZ_NAME = "charrue-input-number--no-control";
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

      const uiProps: CharrueInputNumberFieldProps = fieldSchema.uiProps || {};

      uiProps.class = `${uiProps.class || ""} ${CLZ_NAME}`;

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
