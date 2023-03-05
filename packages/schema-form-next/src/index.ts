import { CharrueSchemaForm } from "./SchemaForm";

import { CharrueSchemaField } from "./SchemaField";
import { registerWidget } from "./widget-manager";

const INSTALL_KEY = "CharrueSchemaFormNext";

const plugin = {
  install(app: any) {
    if (app[INSTALL_KEY]) return;

    app[INSTALL_KEY] = true;
    app.component("CharrueSchemaForm", CharrueSchemaForm);
  },
};

export default plugin;
export { CharrueSchemaForm, CharrueSchemaField, registerWidget };
export * from "./helper";
export * from "./types";
export type { SchemaFormProps } from "./props";
