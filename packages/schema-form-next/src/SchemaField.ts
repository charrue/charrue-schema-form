/* eslint-disable @typescript-eslint/no-unused-vars */
import { h, defineComponent, PropType, shallowRef, computed, watch, Slot } from "vue";
import { ElFormItem } from "element-plus";
import { FormSchemaDef } from "./types/public";
import { FORM_ITEM_SLOT_PREFIX, isEqual, SLOT_SEP } from "./utils";
import { getWidgetComponent } from "./widget-manager";

const PREFIX = FORM_ITEM_SLOT_PREFIX + SLOT_SEP;

const FIELD_CLZ = "charrue-schema-field-item";
export const CharrueSchemaField = defineComponent({
  name: "CharrueSchemaField",
  props: {
    schema: {
      type: Object as PropType<FormSchemaDef>,
      default() {
        return {};
      },
      required: true,
    },
    value: {
      type: [Array, String, Number, Boolean, Object],
      default: undefined,
    },
  },
  emits: {
    "update:value": (value: any) => true,
  },
  setup(props, { emit, slots }) {
    const currentValue = shallowRef<any>(undefined);
    const fieldSchema = computed(() => {
      const {
        type = "string",
        prop = "",
        label,
        title,
        "ui-props": p,
        uiProps,
        "ui-widget": w,
        uiWidget,
        ...rest
      } = props.schema || {};
      const fieldProps = uiProps || p || {};
      fieldProps.class = `${fieldProps.class || ""} ${FIELD_CLZ}`;
      return {
        ...rest,
        prop,
        type,
        label: label || title,
        uiProps: fieldProps,
        uiWidget: uiWidget || w,
      };
    });

    const computedSlots = computed(() => {
      const formItemAndFieldSlots = {
        formItem: {} as unknown as Record<string, Slot | undefined>,
        field: {} as unknown as Record<string, Slot | undefined>,
      };

      Object.keys(slots).forEach((name) => {
        const index = name.indexOf(PREFIX);
        if (index === -1) {
          formItemAndFieldSlots.field[name] = slots[name] as Slot;
        } else {
          formItemAndFieldSlots.formItem[name.slice(index + PREFIX.length)] = slots[name] as Slot;
        }
      });

      return formItemAndFieldSlots;
    });

    watch(
      () => props.value,
      (value) => {
        let tempValue = value !== undefined ? value : fieldSchema.value.default;
        if (fieldSchema.value.type === "array" && !tempValue) {
          tempValue = [];
        }

        if (!isEqual(currentValue.value, tempValue)) {
          currentValue.value = tempValue;
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    const formItemProps = computed<Record<string, any>>(() => {
      return {
        prop: fieldSchema.value.prop,
        label: fieldSchema.value.label,
        required: Boolean(fieldSchema.value.required),
        ...(fieldSchema.value.formProps || {}),
      };
    });
    const FieldComponent = computed<any>(() => {
      const { uiWidget } = fieldSchema.value;
      if (uiWidget) {
        return getWidgetComponent(uiWidget);
      }

      return getWidgetComponent(fieldSchema.value.type);
    });

    const onInput = (value: any) => {
      let tempValue = value;
      if (props.schema.type === "number" && typeof tempValue === "string") {
        tempValue = tempValue.replace(/[^\d^\\.]+/g, "");
        tempValue = tempValue === "" ? undefined : Number(tempValue);
      }
      if (props.schema.type === "string" && typeof value === "string") {
        tempValue = props.schema.trim !== false ? value.trim() : value;
      }

      currentValue.value = tempValue;
      emit("update:value", currentValue.value);
    };

    return {
      fieldSchema,
      currentValue,
      formItemProps,
      FieldComponent,
      computedSlots,

      onInput,
    };
  },
  render() {
    const {
      fieldSchema,
      currentValue,
      formItemProps,
      FieldComponent,
      computedSlots,

      onInput,
    } = this;

    const Field =
      computedSlots.field?.default?.({
        value: currentValue,
        prop: fieldSchema.prop,
      }) ||
      h(
        FieldComponent,
        {
          modelValue: currentValue,
          schema: fieldSchema,
          class: "charrue-schema-field-item",
          key: fieldSchema.prop,
          "onUpdate:modelValue": onInput,
        },
        computedSlots.field,
      );

    return h(
      "div",
      {
        class: "charrue-schema-field-wrapper",
      },
      h(ElFormItem, formItemProps, {
        ...computedSlots.formItem,
        default: () => Field,
      }),
    );
  },
});
