import { ref, watch } from "vue";
import { ListOptionItem, ListOption, FormSchemaDef } from "../types/public";

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
  const list = ref<ListOptionItem[]>([]);

  watch(
    () => enums,
    (val: any) => {
      if (Array.isArray(val) && val.length > 0) {
        list.value = formatEnumValue(val);
      } else {
        // TODO
        // console.warn("")
      }
    },
    {
      deep: true,
      immediate: true,
    }
  );

  return list;
};
