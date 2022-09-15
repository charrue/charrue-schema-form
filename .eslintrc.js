module.exports = {
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "@charrue/base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],

  rules: {
    camelcase: "off",
    "no-magic-numbers": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "class-methods-use-this": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
