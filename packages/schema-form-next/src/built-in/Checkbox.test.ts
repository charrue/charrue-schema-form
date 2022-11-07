import { mount, VueWrapper } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import { CharrueCheckboxField } from "./Checkbox";
import { createCheckboxSchema } from "../helper";
import { ElCheckboxGroup, ElCheckbox, ElCheckboxButton } from "element-plus";
import { nextTick } from "vue";
import type { CharrueCheckboxFieldProps, CheckboxOptionItem } from "./Checkbox";
import type { FormSchemaDef } from "../types/public";

const mountField = (
  schema: FormSchemaDef<CharrueCheckboxFieldProps, CheckboxOptionItem>,
  value: any = []
) => {
  return mount({
    components: {
      CharrueCheckboxField,
    },
    template:
      "<CharrueCheckboxField v-model='value' :schema='schema'></CharrueCheckboxField>",
    data() {
      return {
        value,
        schema,
      };
    },
  });
};

const findElCheckboxGroup = (wrapper: VueWrapper) => {
  const componentWrapper = wrapper.findComponent(ElCheckboxGroup);
  const componentProps = componentWrapper.props();

  return {
    componentWrapper,
    componentProps,
  };
};
const findElCheckbox = (wrapper: VueWrapper, index = 0, isButton = false) => {
  const componentWrapper = wrapper
    .findAllComponents(isButton ? ElCheckboxButton : ElCheckbox)
    .at(index)!;
  const componentProps = componentWrapper.props();
  const innerText = componentWrapper.text();

  return {
    componentWrapper,
    componentProps,
    innerText,
  };
};

describe("CharrueCheckboxField", () => {
  test("default value", () => {
    const wrapper = mountField(createCheckboxSchema("foo", "Foo"));

    const { componentProps } = findElCheckboxGroup(wrapper);
    expect(componentProps.modelValue).toEqual([]);
  });

  test("string enum option", () => {
    const wrapper = mountField(
      createCheckboxSchema("foo", "Foo", {
        enums: ["A", "B"],
      })
    );

    const { componentProps: firstProps, innerText: firstInnerText } =
      findElCheckbox(wrapper, 0);
    expect(firstProps.label).toBe("A");
    expect(firstInnerText).toBe("A");

    const { componentProps: secondProps, innerText: secondInnerText } =
      findElCheckbox(wrapper, 1);
    expect(secondProps.label).toBe("B");
    expect(secondInnerText).toBe("B");
  });

  test("object enum option", () => {
    const wrapper = mountField(
      createCheckboxSchema("foo", "Foo", {
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
      })
    );

    const { componentProps: firstProps, innerText: firstInnerText } =
      findElCheckbox(wrapper, 0);
    expect(firstProps.label).toBe(1);
    expect(firstInnerText).toBe("A");

    const { componentProps: secondProps, innerText: secondInnerText } =
      findElCheckbox(wrapper, 1);
    expect(secondProps.label).toBe("2");
    expect(secondInnerText).toBe("B");
  });

  test("uiProps", () => {
    const wrapper = mountField(
      createCheckboxSchema("foo", "Foo", {
        enums: ["A", "B"],
        uiProps: {
          isButton: true,
          checkboxGroup: {
            size: "large",
          },
          checkbox: {
            border: true,
          },
        },
      })
    );

    expect(findElCheckboxGroup(wrapper).componentProps.size).toBe("large");
    expect(wrapper.findComponent(ElCheckbox).exists()).toBe(false);
    const { componentProps } = findElCheckbox(wrapper, 0, true);
    expect(componentProps.border).toBe(true);
  });

  test.only("uiProps.checkbox is a function", async () => {
    const wrapper = mountField(
      createCheckboxSchema("foo", "Foo", {
        enums: ["A", "B"],
        uiProps: {
          checkbox(_, index) {
            if (index === 0) {
              return {
                border: true,
              };
            }
            return {
              disabled: true,
            };
          },
        },
      })
    );

    const { componentProps: firstProps } = findElCheckbox(wrapper, 0);
    expect(firstProps.border).toBe(true);
    expect(firstProps.disabled).toBe(false);

    const { componentProps: secondProps } = findElCheckbox(wrapper, 1);
    expect(secondProps.border).toBe(false);
    expect(secondProps.disabled).toBe(true);
  });

  test("click option", async () => {
    const wrapper = mountField(
      createCheckboxSchema("foo", "Foo", {
        enums: ["A", "B"],
      })
    );

    const { componentWrapper: optionWrapper } = findElCheckbox(wrapper, 1);
    await optionWrapper?.trigger("click");
    await nextTick();

    const { componentWrapper: checkboxWrapper } = findElCheckbox(wrapper);
    await checkboxWrapper.trigger("click");
    expect(checkboxWrapper.classes("is-checked")).toBe(false);

    expect(wrapper.vm.value).toBe("B");
  });
});
