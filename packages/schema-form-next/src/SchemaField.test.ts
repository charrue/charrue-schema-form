import { h, defineComponent } from "vue";
import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { ElFormItem, ElInput } from "element-plus";
import { CharrueSchemaField } from "./SchemaField";

const createSchemaFieldDemo = (props: Record<string, any> = {}) => {
  return defineComponent({
    name: "SchemaFieldDemo",
    render() {
      return h(CharrueSchemaField, { ...props });
    },
  });
};

describe("SchemaField", () => {
  describe("el-form-item", () => {
    test("label & prop value from schema", () => {
      const schema = {
        type: "string",
        label: "Name",
        prop: "name",
      };
      const wrapper = mount(
        createSchemaFieldDemo({
          schema,
          value: "",
        }),
      );

      const FormItem = wrapper.findComponent(ElFormItem);
      expect(FormItem).toBeDefined();

      const formItemProp = FormItem.props();
      expect(formItemProp.label).toBe(schema.label);
      expect(formItemProp.prop).toBe(schema.prop);
    });
  });

  describe("schema:type", () => {
    test("string", async () => {
      const value = "";
      const schema = {
        type: "string",
        label: "Name",
        prop: "name",
      };
      const wrapper = mount(
        createSchemaFieldDemo({
          schema,
          value,
        }),
      );

      const FieldWrapper = wrapper.findComponent(ElInput);
      expect(FieldWrapper).toBeDefined();

      const inputProps = FieldWrapper.props();
      expect(inputProps.modelValue).toBe(value);
    });
  });
});
