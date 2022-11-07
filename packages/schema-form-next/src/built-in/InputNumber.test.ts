import { mount, VueWrapper } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import { CharrueInputNumberField } from "./InputNumber";
import { createInputNumberSchema } from "../helper";
import type { CharrueInputNumberFieldProps } from "./InputNumber";
import type {
  FormSchemaDef,
  DefaultListOptionValue,
  ListOptionItem,
} from "../types/public";
import { ElInputNumber } from "element-plus";

const mountField = (
  schema: Omit<
    FormSchemaDef<
      CharrueInputNumberFieldProps,
      ListOptionItem<DefaultListOptionValue>
    >,
    "enums"
  >,
  value?: any
) => {
  return mount({
    components: {
      CharrueInputNumberField,
    },
    template:
      "<CharrueInputNumberField v-model='value' :schema='schema'></CharrueInputNumberField>",
    data() {
      return {
        value,
        schema,
      };
    },
  });
};

const findElInputNumber = (wrapper: VueWrapper) => {
  const componentWrapper = wrapper.findComponent(ElInputNumber);
  const componentProps = componentWrapper.props();

  return {
    componentWrapper,
    componentProps,
  };
};

const findNativeInput = (wrapper: VueWrapper) => {
  const componentWrapper = wrapper.findComponent(ElInputNumber);
  return componentWrapper.find("input");
};

describe("CharrueInputNumberField", () => {
  test("default value and props", () => {
    const wrapper = mountField(createInputNumberSchema("foo", "Foo"));
    const { componentProps } = findElInputNumber(wrapper);
    expect(componentProps.modelValue).toBe(undefined);
    expect(componentProps.clearable).toBe(true);
    expect(componentProps.placeholder).toBe("请输入Foo");
  });

  test("uiProps", () => {
    const wrapper = mountField(
      createInputNumberSchema("foo", "Foo", {
        uiProps: {
          size: "large",
        },
      })
    );
    const { componentProps } = findElInputNumber(wrapper);
    expect(componentProps.size).toBe("large");
  });

  test.only("v-model", async () => {
    const wrapper = mountField(createInputNumberSchema("foo", "Foo"), "");
    const { componentProps } = findElInputNumber(wrapper);
    const nativeInput = findNativeInput(wrapper);

    await nativeInput.setValue("foo");
    expect(componentProps.modelValue).toBe(undefined);
    expect(wrapper.vm.value).toBe("");

    await nativeInput.setValue("foo");
    expect(componentProps.modelValue).toBe(undefined);
    expect(wrapper.vm.value).toBe("");

    await nativeInput.setValue(100.1);
    expect(componentProps.modelValue).toBe(100.1);
    expect(wrapper.vm.value).toBe(100.1);
  });
});
