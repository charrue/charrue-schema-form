import { mount, VueWrapper } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import { CharrueInputField } from "./Input";
import { createInputSchema } from "../helper";
import type { CharrueInputFieldProps } from "./Input";
import type {
  FormSchemaDef,
  DefaultListOptionValue,
  ListOptionItem,
} from "../types/public";
import { ElInput } from "element-plus";

const mountField = (
  schema: Omit<
    FormSchemaDef<
      CharrueInputFieldProps,
      ListOptionItem<DefaultListOptionValue>
    >,
    "enums"
  >,
  value?: any
) => {
  return mount({
    components: {
      CharrueInputField,
    },
    template:
      "<CharrueInputField v-model='value' :schema='schema'></CharrueInputField>",
    data() {
      return {
        value,
        schema,
      };
    },
  });
};

const findElInput = (wrapper: VueWrapper) => {
  const componentWrapper = wrapper.findComponent(ElInput);
  const componentProps = componentWrapper.props();

  return {
    componentWrapper,
    componentProps,
  };
};

const findNativeInput = (wrapper: VueWrapper) => {
  const componentWrapper = wrapper.findComponent(ElInput);
  return componentWrapper.find("input");
};

describe("CharrueInputField", () => {
  test("default value and props", () => {
    const wrapper = mountField(createInputSchema("foo", "Foo"));
    const { componentProps } = findElInput(wrapper);
    expect(componentProps.modelValue).toBe("");
    expect(componentProps.clearable).toBe(true);
    expect(componentProps.placeholder).toBe("请输入Foo");
  });

  test("uiProps", () => {
    const wrapper = mountField(
      createInputSchema("foo", "Foo", {
        uiProps: {
          size: "large",
        },
      })
    );
    const { componentProps } = findElInput(wrapper);
    expect(componentProps.size).toBe("large");
  });

  test("v-model", async () => {
    const wrapper = mountField(createInputSchema("foo", "Foo"));
    const { componentProps } = findElInput(wrapper);
    const nativeInput = findNativeInput(wrapper);

    await nativeInput.setValue("foo");
    expect(componentProps.modelValue).toBe("foo");
    expect(wrapper.vm.value).toBe("foo");
  });
});
