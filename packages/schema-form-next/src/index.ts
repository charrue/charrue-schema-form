import SchemaForm from "./SchemaForm.vue";

const INSTALL_KEY = "CharrueSchemaFormNext";

const SchemaFormPlugin = {
  install(app: any) {
    if (app[INSTALL_KEY]) return;

    app[INSTALL_KEY] = true;
    app.component("charrue-schema-form", SchemaForm);
  },
}

export * from "./helper";
export * from "./types";
export default SchemaFormPlugin;
