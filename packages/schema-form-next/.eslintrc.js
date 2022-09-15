module.exports = {
  extends: ["plugin:vue/vue3-recommended", "../../.eslintrc.js"],
  parser: "vue-eslint-parser",
  rules: {
    "vue/require-default-prop": "off",
    "vue/valid-v-slot": "off",
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
};
