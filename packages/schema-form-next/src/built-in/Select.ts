import { h, defineComponent, PropType, computed } from "vue";
import { ElSelect, ElOption, ElOptionGroup } from "element-plus";
import { useEnums } from "./useEnums";
import type { ListOptionItem, FormSchemaDef, FieldProps } from "../types/public";

type ElSelectProps = InstanceType<typeof ElSelect>["$props"];
export type CharrueSelectFieldProps = FieldProps<Omit<ElSelectProps, "modelValue">>;

const defaultUiProps = {
  clearable: true,
  filterable: true,
};
export const CharrueSelectField = defineComponent({
  name: "CharrueSelectField",
  props: {
    modelValue: {
      type: [Array, String, Number, Boolean, Object],
      default: undefined,
    },
    schema: {
      type: Object as PropType<FormSchemaDef>,
      default() {
        return {};
      },
      required: true,
    },
  },
  emits: ["update:modelValue", "change", "remove-tag", "clear", "visible-change", "focus", "blur"],
  setup(props, { emit }) {
    const options = useEnums(props.schema.enums);
    const onInput = (val: ListOptionItem["value"]) => {
      emit("update:modelValue", val);
    };

    const selectProps = computed<CharrueSelectFieldProps>(() => {
      const fieldSchema = props.schema;
      if (!fieldSchema) return {};

      const { "remote-method": rm, remoteMethod, ...rest } = fieldSchema.uiProps || {};

      const originRemoteMethod = rm || remoteMethod;

      return {
        multiple: fieldSchema.type === "array",
        placeholder: `请选择${fieldSchema.label || ""}`,
        ...defaultUiProps,
        ...rest,
        remoteMethod: !originRemoteMethod
          ? undefined
          : async (query: string) => {
              if (typeof originRemoteMethod === "function") {
                try {
                  const list = await originRemoteMethod(query);
                  if (Array.isArray(list)) {
                    options.value = list;
                  }
                } catch (e) {
                  console.warn(e);
                }
              }
            },
      };
    });

    return {
      selectProps,
      onInput,
      options,
    };
  },
  render() {
    const {
      $attrs = {},
      $slots = {},
      modelValue,
      selectProps,
      options,

      onInput,
    } = this;

    return h(
      ElSelect,
      {
        ...$attrs,
        ...selectProps,
        modelValue,
        "onUpdate:modelValue": onInput,
      },
      {
        ...$slots,
        default: () =>
          options.map((item, index) => {
            if (Array.isArray(item.children) && item.children.length > 0) {
              return h(
                ElOptionGroup,
                {
                  label: item.label,
                  value: item.value,
                  key: `option-group-item-${index}-${item.value}`,
                },
                () =>
                  item.children!.map((t, idx) =>
                    h(ElOption, {
                      label: t.label,
                      value: t.value,
                      key: `nested-option-item-${idx}-${t.value}`,
                    }),
                  ),
              );
            }

            return h(ElOption, {
              label: item.label,
              value: item.value,
              key: `option-item-${index}-${item.value}`,
            });
          }),
      },
    );
  },
});
