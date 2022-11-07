import { Component } from "vue";
import { CharrueSelectField } from "./built-in/Select";
import { CharrueCheckboxField } from "./built-in/Checkbox";
import { CharrueRadioField } from "./built-in/Radio";
import { CharrueInputNumberField } from "./built-in/InputNumber";
import { CharrueInputField } from "./built-in/Input";

const globalWidget = new Map<string, Component>();

export const getWidgetComponent = (type: string): Component => {
  switch (type) {
    case "string": {
      return CharrueInputField;
    }
    case "number": {
      return CharrueInputNumberField;
    }
    case "select": {
      return CharrueSelectField;
    }
    case "checkbox": {
      return CharrueCheckboxField;
    }
    case "radio": {
      return CharrueRadioField;
    }
    default: {
      if (globalWidget.has(type)) return globalWidget.get(type)!;
      return CharrueInputField;
    }
  }
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
