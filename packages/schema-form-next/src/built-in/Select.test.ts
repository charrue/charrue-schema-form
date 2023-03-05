import { mount, VueWrapper } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import { CharrueSelectField } from "./Select";
import { createSelectSchema } from "../helper";
import { ElSelect, ElOption } from "element-plus";
import { nextTick } from "vue";
import type { FormSchemaDef } from "../types";

const mountField = (schema: FormSchemaDef, value?: any) => {
  return mount({
    components: {
      CharrueSelectField,
    },
    template: "<CharrueSelectField v-model='value' :schema='schema'></CharrueSelectField>",
    data() {
      return {
        value,
        schema,
      };
    },
  });
};

const findInnerInput = (wrapper: VueWrapper) =>
  wrapper.find(".el-input__inner").element as HTMLInputElement;

const findElSelect = (wrapper: VueWrapper) => {
  const componentWrapper = wrapper.findComponent(ElSelect);
  const componentProps = componentWrapper.props();

  return {
    componentWrapper,
    componentProps,
  };
};

const findElOption = (wrapper: VueWrapper, index = 0) => {
  const componentWrapper = wrapper.findAllComponents(ElOption).at(index);
  expect(componentWrapper).toBeDefined();
  const componentProps = componentWrapper!.props();

  return {
    componentWrapper,
    componentProps,
  };
};

describe("CharrueSelectField", () => {
  test("default value & props", () => {
    const wrapper = mountField(
      createSelectSchema("foo", "Foo", {
        enums: ["A", "B"],
      }),
    );

    const { componentProps } = findElSelect(wrapper);
    expect(componentProps.modelValue).toBe(undefined);
    expect(componentProps.clearable).toBe(true);
    expect(componentProps.filterable).toBe(true);
    expect(componentProps.placeholder).toBe("请选择Foo");
  });

  test("string enum option", () => {
    const wrapper = mountField(
      createSelectSchema("foo", "Foo", {
        enums: ["A", "B"],
      }),
    );

    const { componentProps: firstProps } = findElOption(wrapper, 0);
    expect(firstProps.label).toBe("A");
    expect(firstProps.value).toBe("A");

    const { componentProps: secondProps } = findElOption(wrapper, 1);
    expect(secondProps.label).toBe("B");
    expect(secondProps.value).toBe("B");
  });

  test("object enum option", () => {
    const wrapper = mountField(
      createSelectSchema("foo", "Foo", {
        enums: [
          {
            label: "A",
            value: 1,
          },
          {
            label: "B",
            value: "2",
          },
        ],
      }),
      "A",
    );

    const { componentProps: firstProps } = findElOption(wrapper, 0);
    expect(firstProps.label).toBe("A");
    expect(firstProps.value).toBe(1);

    const { componentProps: secondProps } = findElOption(wrapper, 1);
    expect(secondProps.label).toBe("B");
    expect(secondProps.value).toBe("2");
  });

  test("uiProps", () => {
    const wrapper = mountField(
      createSelectSchema("foo", "Foo", {
        enums: ["A", "B"],
        uiProps: {
          multiple: true,
          filterable: false,
        },
      }),
    );

    const { componentProps } = findElSelect(wrapper);
    expect(componentProps.filterable).toBe(false);
    expect(componentProps.multiple).toBe(true);
  });

  test("click option", async () => {
    const wrapper = mountField(
      createSelectSchema("foo", "Foo", {
        enums: ["A", "B"],
      }),
      "A",
    );

    const { componentWrapper: optionWrapper } = findElOption(wrapper, 1);
    await optionWrapper?.trigger("click");
    await nextTick();

    expect(findInnerInput(wrapper).value).toBe("B");

    expect(wrapper.vm.value).toBe("B");
  });
});
