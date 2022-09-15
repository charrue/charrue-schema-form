import SchemaForm from "./SchemaForm.vue";

const SchemaFormPlugin = {
  install(Vue: any) {
    Vue.component("charrue-schema-form", SchemaForm);
  },
}

export * from "./helper";
export * from "./types";
export default SchemaFormPlugin;
