type EnumsOptions = string[] | { value: string; label: string }[];

export type FormSchemaDef = {
  title: string;
  prop: string;
  type: string;
  enums?: EnumsOptions | (() => EnumsOptions) | (() => Promise<EnumsOptions>);
  "ui-props"?: Record<string, any>;
  default?: any;
  required?: boolean;
  "ui-widget"?: string;
  trim?: boolean;
  formProps?: Record<string, any>;
  class?: string;
  style?: string;
};

export type CreateSchemaTemplate = (prop: string, label: string, config?: Omit<FormSchemaDef, "title" | "prop" | "type">) => FormSchemaDef;
