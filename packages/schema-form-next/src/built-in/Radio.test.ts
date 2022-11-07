import { mount, VueWrapper } from "@vue/test-utils";
import { describe, test, expect } from "vitest";
import { CharrueRadioField } from "./Radio";
import { createRadioSchema } from "../helper";
import { ElRadioGroup, ElRadio, ElRadioButton } from "element-plus";
import { nextTick } from "vue";
import type { CharrueRadioFieldProps, RadioListOptionItem } from "./Radio";
import type { FormSchemaDef } from "../types/public";

const mountField = (
  schema: FormSchemaDef<CharrueRadioFieldProps, RadioListOptionItem>,
  value?: any
) => {
  return mount({
    components: {
      CharrueRadioField,
    },
    template:
      "<CharrueRadioField v-model='value' :schema='schema'></CharrueRadioField>",
    data() {
      return {
        value,
        schema,
      };
    },
  });
};

const findElRadioGroup = (wrapper: VueWrapper) => {
  const componentWrapper = wrapper.findComponent(ElRadioGroup);
  const componentProps = componentWrapper.props();

  return {
    componentWrapper,
    componentProps,
  };
};
const findElRadio = (wrapper: VueWrapper, index = 0, isButton = false) => {
  const componentWrapper = wrapper
    .findAllComponents(isButton ? ElRadioButton : ElRadio)
    .at(index)!;
  const componentProps = componentWrapper.props();
  const innerText = componentWrapper.text();

  return {
    componentWrapper,
    componentProps,
    innerText,
  };
};

describe("CharrueRadioField", () => {
  test("default value", () => {
    const wrapper = mountField(createRadioSchema("foo", "Foo"));

    const { componentProps } = findElRadioGroup(wrapper);
    expect(componentProps.modelValue).toEqual(undefined);
  });

  test("string enum option", () => {
    const wrapper = mountField(
      createRadioSchema("foo", "Foo", {
        enums: ["A", "B"],
      })
    );

    const { componentProps: firstProps, innerText: firstInnerText } =
      findElRadio(wrapper, 0);
    expect(firstProps.label).toBe("A");
    expect(firstInnerText).toBe("A");

    const { componentProps: secondProps, innerText: secondInnerText } =
      findElRadio(wrapper, 1);
    expect(secondProps.label).toBe("B");
    expect(secondInnerText).toBe("B");
  });

  test("object enum option", () => {
    const wrapper = mountField(
      createRadioSchema("foo", "Foo", {
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
      findElRadio(wrapper, 0);
    expect(firstProps.label).toBe(1);
    expect(firstInnerText).toBe("A");

    const { componentProps: secondProps, innerText: secondInnerText } =
      findElRadio(wrapper, 1);
    expect(secondProps.label).toBe("2");
    expect(secondInnerText).toBe("B");
  });

  test("uiProps", () => {
    const wrapper = mountField(
      createRadioSchema("foo", "Foo", {
        enums: ["A", "B"],
        uiProps: {
          isButton: true,
          radioGroup: {
            size: "large",
          },
          radio: {
            border: true,
          },
        },
      })
    );

    expect(findElRadioGroup(wrapper).componentProps.size).toBe("large");
    expect(wrapper.findComponent(ElRadio).exists()).toBe(false);
    const { componentProps } = findElRadio(wrapper, 0, true);
    expect(componentProps.border).toBe(true);
  });

  test.only("uiProps.checkbox is a function", async () => {
    const wrapper = mountField(
      createRadioSchema("foo", "Foo", {
        enums: ["A", "B"],
        uiProps: {
          radio(_, index) {
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

    const { componentProps: firstProps } = findElRadio(wrapper, 0);
    expect(firstProps.border).toBe(true);
    expect(firstProps.disabled).toBe(false);

    const { componentProps: secondProps } = findElRadio(wrapper, 1);
    expect(secondProps.border).toBe(false);
    expect(secondProps.disabled).toBe(true);
  });

  test("click option", async () => {
    const wrapper = mountField(
      createRadioSchema("foo", "Foo", {
        enums: ["A", "B"],
      })
    );

    const { componentWrapper: optionWrapper } = findElRadio(wrapper, 1);
    await optionWrapper?.trigger("click");
    await nextTick();

    const { componentWrapper: checkboxWrapper } = findElRadio(wrapper);
    await checkboxWrapper.trigger("click");
    expect(checkboxWrapper.classes("is-checked")).toBe(false);

    expect(wrapper.vm.value).toBe("B");
  });
});
