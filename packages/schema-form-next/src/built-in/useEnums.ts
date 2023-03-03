import { shallowRef, watch } from "vue";
import { ListOptionItem, ListOption, FormSchemaDef } from "../types/public";
import { isFunction, isPromise } from "../utils";

const formatEnumValue = (rawValue?: ListOption): ListOptionItem[] => {
  if (!Array.isArray(rawValue)) return [];

  return rawValue.map((item) => {
    if (typeof item === "string") {
      return {
        value: item,
        label: item,
      };
    }
    return {
      value: item.value ? item.value : item.label,
      label: item.label ? item.label : `${item.value}`,
      children: formatEnumValue(item.children),
    };
  });
};

export const useEnums = (enums: FormSchemaDef["enums"]) => {
  const list = shallowRef<ListOptionItem[]>([]);

  watch(
    () => enums,
    (val: any) => {
      if (Array.isArray(val) && val.length > 0) {
        list.value = formatEnumValue(val);
      } else if (isPromise(val)) {
        val.then((data: any) => {
          list.value = formatEnumValue(data);
        });
      } else if (isFunction(val)) {
        list.value = formatEnumValue(val());
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );

  return list;
};
