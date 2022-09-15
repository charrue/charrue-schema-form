import { ref, watch } from "vue";
import { FormSchemaDef } from "../types";

const toPromise = (fn: () => any) => {
  const result = fn();
  if (result instanceof Promise) {
    return result;
  }
  return Promise.resolve(result);
};

export const useEnums = (enums: any) => {
  const list = ref<{ value: any; label: string }[]>([]);

  const formatEnumValue = (rawValue: any[]) => {
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
        label: item.label ? item.label : item.value,
      };
    });
  };

  watch(
    enums,
    (val: any) => {
      if (typeof val === "function") {
        toPromise(val).then((res) => {
          list.value = formatEnumValue(res);
        });
      }
      if (Array.isArray(val) && val.length > 0) {
        list.value = formatEnumValue(val);
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );

  return list;
};
