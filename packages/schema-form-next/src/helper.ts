import type { CharrueSelectFieldProps } from "./built-in/Select";
import type {
  CreateSchemaTemplateType,
  ListOptionItem,
  DefaultListOptionValue,
  DefaultFormSchemaExcludeKey,
  FormSchemaDef,
} from "./types/public";
import type {
  CharrueCheckboxFieldProps,
  CheckboxOptionItem,
} from "./built-in/Checkbox";
import type {
  CharrueRadioFieldProps,
  RadioListOptionItem,
} from "./built-in/Radio";
import type { CharrueInputFieldProps } from "./built-in/Input";
import type { CharrueInputNumberFieldProps } from "./built-in/InputNumber";

export const createSelectSchema: CreateSchemaTemplateType<
  CharrueSelectFieldProps
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: uiProps.multiple ? "array" : "string",
    uiWidget: "select",
    uiProps,
  };
};

export const createCheckboxSchema: CreateSchemaTemplateType<
  CharrueCheckboxFieldProps,
  CheckboxOptionItem
> = (prop, label, config = {}) => {
  const uiProps: CharrueCheckboxFieldProps = config["ui-props"] ||
    config.uiProps || {
      isButton: false,
      checkbox: {},
      checkboxGroup: {},
    };

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "checkbox",
    uiProps,
  };
};

export const createRadioSchema: CreateSchemaTemplateType<
  CharrueRadioFieldProps,
  RadioListOptionItem
> = (prop, label, config = {}) => {
  const uiProps: CharrueRadioFieldProps = config["ui-props"] ||
    config.uiProps || {
      isButton: false,
      radio: {},
      radioGroup: {},
    };

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "radio",
    uiProps,
  };
};

export const createInputSchema: CreateSchemaTemplateType<
  CharrueInputFieldProps,
  ListOptionItem<DefaultListOptionValue>,
  DefaultFormSchemaExcludeKey | "enums"
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiProps,
  };
};

export const createInputNumberSchema: CreateSchemaTemplateType<
  CharrueInputNumberFieldProps,
  ListOptionItem<DefaultListOptionValue>,
  DefaultFormSchemaExcludeKey | "enums"
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "number",
    uiProps,
  };
};

export const createSchemaPipeline = (...rest: FormSchemaDef[]) => {
  return Array.from(rest).reduce((prev, next) => {
    const schemaProp = next.prop;
    if (schemaProp) {
      prev[schemaProp] = next;
    }
    return prev;
  }, {} as unknown as Record<string, FormSchemaDef>);
};
