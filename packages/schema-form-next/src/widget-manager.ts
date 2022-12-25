import { Component } from "vue";
import { CharrueSelectField } from "./built-in/Select";
import { CharrueCheckboxField } from "./built-in/Checkbox";
import { CharrueRadioField } from "./built-in/Radio";
import { CharrueInputNumberField } from "./built-in/InputNumber";
import { CharrueInputField } from "./built-in/Input";
import { CharrueDateField } from "./built-in/Date";
import { CharrueDateRangeField } from "./built-in/DateRange";
import { CharrueTimePickerField } from "./built-in/TimePicker";
import { CharrueTimeSelectField } from "./built-in/TimeSelect";
import { CharrueSwitchField } from "./built-in/Switch";
import { CharrueSliderField } from "./built-in/Slider";
import { CharrueRateField } from "./built-in/Rate";
import { CharrueCascaderField } from "./built-in/Cascader";
import { CharrueTransferField } from "./built-in/Transfer";

import type { FieldWidget } from "./types/public";

const globalWidget = new Map<FieldWidget | string, Component>();
globalWidget.set("input", CharrueInputField);
globalWidget.set("inputNumber", CharrueInputNumberField);
globalWidget.set("select", CharrueSelectField);
globalWidget.set("checkbox", CharrueCheckboxField);
globalWidget.set("radio", CharrueRadioField);
globalWidget.set("date", CharrueDateField);
globalWidget.set("dateRange", CharrueDateRangeField);
globalWidget.set("timePicker", CharrueTimePickerField);
globalWidget.set("timeSelect", CharrueTimeSelectField);
globalWidget.set("switch", CharrueSwitchField);
globalWidget.set("slider", CharrueSliderField);
globalWidget.set("rate", CharrueRateField);
globalWidget.set("cascader", CharrueCascaderField);
globalWidget.set("transfer", CharrueTransferField);

export const getWidgetComponent = (type: string): Component => {
  if (type === "string") return globalWidget.get("input")!;
  if (type === "number") return globalWidget.get("inputNumber")!;

  if (globalWidget.has(type)) return globalWidget.get(type)!;
  return CharrueInputField;
};

export const registerWidget = (
  name: string,
  component: Component,
  override = false
) => {
  if (globalWidget.has(name) && !override) {
    console.warn(
      `${name} widget has registered, if you want to override it, please set 'override': true in registerWidget.`
    );
  } else {
    globalWidget.set(name, component);
  }
};
