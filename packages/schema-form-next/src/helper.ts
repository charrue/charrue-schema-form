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
import type { CharrueDateFieldProps } from "./built-in/Date";
import type { CharrueDateRangeFieldProps } from "./built-in/DateRange";
import type { CharrueCascaderFieldProps } from "./built-in/Cascader";
import type { CharrueSwitchFieldProps } from "./built-in/Switch";
import type { CharrueSliderFieldProps } from "./built-in/Slider";
import type { CharrueTimePickerFieldProps } from "./built-in/TimePicker";
import type { CharrueTimeSelectFieldProps } from "./built-in/TimeSelect";
import type { CharrueTransferFieldProps } from "./built-in/Transfer";

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

export const createDateSchema: CreateSchemaTemplateType<
  CharrueDateFieldProps
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "date",
    uiProps,
  };
};
export const createDateRangeSchema: CreateSchemaTemplateType<
  CharrueDateRangeFieldProps
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "dateRange",
    uiProps,
  };
};

export const createCascadeSchema: CreateSchemaTemplateType<
  CharrueCascaderFieldProps
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "cascader",
    uiProps,
  };
};

export const createSwitchSchema: CreateSchemaTemplateType<
  CharrueSwitchFieldProps
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "switch",
    uiProps,
  };
};

export const createSliderSchema: CreateSchemaTemplateType<
  CharrueSliderFieldProps
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "slider",
    uiProps,
  };
};

export const createTimePickerSchema: CreateSchemaTemplateType<
  CharrueTimePickerFieldProps
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "timePicker",
    uiProps,
  };
};

export const createTimeSelectSchema: CreateSchemaTemplateType<
  CharrueTimeSelectFieldProps
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "timeSelect",
    uiProps,
  };
};

export const createTransferSchema: CreateSchemaTemplateType<
  CharrueTransferFieldProps
> = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "transfer",
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
