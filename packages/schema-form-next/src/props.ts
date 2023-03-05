import { ExtractPropTypes, PropType } from "vue";
import { ElForm } from "element-plus";
import type { FormRules } from "element-plus";
import type { FormSchemaDef, VisibleStateProp } from "./types";

type ElFormProps = InstanceType<typeof ElForm>["$props"];

export const schemaFormProps = {
  modelValue: {
    type: Object,
    default() {
      return {};
    },
  },
  schema: {
    type: Object as PropType<Record<string, FormSchemaDef>>,
    default() {
      return {};
    },
    required: true,
  },
  visibleState: {
    type: Object as PropType<VisibleStateProp>,
    default() {
      return {};
    },
  },
  rules: {
    type: Object as PropType<FormRules>,
    default() {
      return {};
    },
  },
  inline: {
    type: Boolean,
    default: false,
  },
  labelPosition: {
    type: String as PropType<ElFormProps["labelPosition"]>,
    default: "right",
  },
  labelWidth: {
    type: String as PropType<ElFormProps["labelWidth"]>,
    default: "100px",
  },
  labelSuffix: {
    type: String as PropType<ElFormProps["labelSuffix"]>,
    default: "",
  },
  hideRequiredAsterisk: {
    type: Boolean as PropType<ElFormProps["hideRequiredAsterisk"]>,
    default: false,
  },
  requireAsteriskPosition: {
    type: String as PropType<ElFormProps["requireAsteriskPosition"]>,
    default: "left",
  },
  showMessage: {
    type: Boolean as PropType<ElFormProps["showMessage"]>,
    default: true,
  },
  inlineMessage: {
    type: Boolean as PropType<ElFormProps["inlineMessage"]>,
    default: false,
  },
  statusIcon: {
    type: Boolean as PropType<ElFormProps["statusIcon"]>,
    default: false,
  },
  validateOnRuleChange: {
    type: Boolean as PropType<ElFormProps["validateOnRuleChange"]>,
    default: true,
  },
  size: {
    type: String as PropType<ElFormProps["size"]>,
    default: "default",
  },
  disabled: {
    type: Boolean as PropType<ElFormProps["disabled"]>,
    default: false,
  },
  scrollToError: {
    type: Boolean as PropType<ElFormProps["scrollToError"]>,
    default: false,
  },
  clearAfterHide: {
    type: Boolean,
    default: false,
  },
};

export type SchemaFormProps = ExtractPropTypes<typeof schemaFormProps>;
