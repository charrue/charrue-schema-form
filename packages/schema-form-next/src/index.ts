import { CharrueSchemaForm } from "./SchemaForm";

import { CharrueSchemaField } from "./SchemaField";
import { registerWidget, getWidgetComponent } from "./widget-manager";

const INSTALL_KEY = "CharrueSchemaFormNext";

const plugin = {
  install(app: any) {
    if (app[INSTALL_KEY]) return;

    app[INSTALL_KEY] = true;
    app.component("CharrueSchemaForm", CharrueSchemaForm);
  },
};

export default plugin;
export {
  CharrueSchemaForm,
  CharrueSchemaField,
  registerWidget,
  getWidgetComponent,
};
export * from "./helper";
export * from "./types/public";
