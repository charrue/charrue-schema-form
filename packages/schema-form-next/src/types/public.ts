export type DefaultListOptionValue = string | number;
export interface ListOptionItem<V = DefaultListOptionValue> {
  value: V;
  label: string;
  children?: Array<ListOptionItem<V>>;
}

type Awaitable<T> = T | PromiseLike<T> | ((...args: any[]) => T);

export type ListOption = string[] | ListOptionItem[];

export type FieldType = "string" | "number" | "array" | "select";

export type FieldWidget =
  | "input"
  | "inputNumber"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "dateRange"
  | "timePicker"
  | "timeSelect"
  | "switch"
  | "slider"
  | "rate"
  | "cascader"
  | "transfer";

export interface FormSchemaDef<
  UiProps extends object = Record<string, any>,
  OptionItem extends object = ListOptionItem<DefaultListOptionValue>
> {
  /**
   * @deprecated `label` is recommended
   */
  title?: string;
  label?: string;
  prop?: string;
  type?: FieldType;
  enums?: Awaitable<string[] | OptionItem[]>;
  /**
   * @deprecated `uiProps` is recommended
   */
  "ui-props"?: UiProps;
  uiProps?: UiProps;
  default?: any;
  required?: boolean;
  /**
   * @deprecated `uiWidget` is recommended
   */
  "ui-widget"?: FieldWidget;
  uiWidget?: FieldWidget;
  trim?: boolean;
  formProps?: Record<string, any>;
}

export type DefaultFormSchemaExcludeKey = "title" | "prop" | "type";

export type CreateSchemaTemplateType<
  UiProps extends object = Record<string, any>,
  OptionItem extends object = ListOptionItem<DefaultListOptionValue>,
  ExcludeKey extends string = DefaultFormSchemaExcludeKey
> = (
  prop: string,
  label: string,
  config?: Omit<FormSchemaDef<UiProps, OptionItem>, ExcludeKey>
) => FormSchemaDef<UiProps, OptionItem>;

export type FieldProps<T> = T & Record<string, any>;
