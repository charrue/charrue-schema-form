import type { FormSchemaDef, CreateSchemaTemplate } from "./types";


export const createDateRangeSchema: CreateSchemaTemplate = (prop, label, config = {}) => {
  const { "ui-props": uiProps, ...others } = config;

  return {
    ...(others || {}),
    title: label,
    prop,
    type: "array",
    "ui-widget": "el-date-picker",
    "ui-props": {
      type: "daterange",
      "range-separator": "-",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      "value-format": "YYYY-MM-DD",
      ...(uiProps || {}),
    },
  };
};

export const createSelectSchema: CreateSchemaTemplate = (prop, label, config = {}) => {
  const { "ui-props": uiProps, ...others } = config;

  return {
    ...(others || {}),
    title: label,
    prop,
    type: "string",
    "ui-widget": "select",
    "ui-props": {
      clearable: true,
      filterable: true,
      placeholder: `请选择${label}`,
      ...(uiProps || {}),
    },
  };
};


export const createInputSchema: CreateSchemaTemplate = (prop, label, config = {}) => {
  const { "ui-props": uiProps, ...others } = config;

  return {
    ...(others || {}),
    title: label,
    prop,
    type: "string",
    "ui-props": {
      clearable: true,
      placeholder: `请选择${label}`,
      ...(uiProps || {}),
    },
  };
};

export const createRadioSchema: CreateSchemaTemplate = (prop, label, config = {}) => {
  const { "ui-props": uiProps, ...others } = config;

  return {
    ...(others || {}),
    title: label,
    prop,
    type: "string",
    "ui-widget": "radio",
    "ui-props": {
      ...(uiProps || {}),
    },
  };
};

/**
 * @example
 * createSchemaPipeline(
 *  createInputSchema("name", "Name"),
 *  createDateRangeSchema("dateRange", "Date"),
 * )
 */
export const createSchemaPipeline = (...rest: FormSchemaDef[]) => {
  return Array.from(rest).reduce((prev, next) => {
    const schemaProp = next.prop;
    prev[schemaProp] = next;
    return prev;
  }, {} as Record<string, FormSchemaDef>)
}
