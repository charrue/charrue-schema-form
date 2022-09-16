<template>
  <div>
    <el-select
      :model-value="modelValue"
      v-bind="uiProps"
      :remote-method="uiProps['remote-method']"
      @update:model-value="onInput"
    >
      <el-option
        v-for="(item, index) in enums"
        :key="`${item.value}-${index}`"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import debounce from "lodash.debounce";
import { FormSchemaDef } from "../types";
import { useEnums } from "./useEnums";
const props = defineProps<{
  schema: FormSchemaDef;
  modelValue: any;
}>();
const enums = useEnums(computed(() => props.schema.enums));

const emits = defineEmits(["update:model-value"]);

const attrs = useAttrs();
const uiProps = computed<Record<string, any>>(() => {
  const { schema } = props;
  if (!schema) return {};
  const { "remote-method": originRemoteMethod, ...rest } = attrs || {};

  return {
    multiple: schema.type === "array",
    ...(rest || {}),
    "remote-method": !originRemoteMethod
      ? undefined
      : debounce(async (query: string) => {
          // eslint-disable-next-line @typescript-eslint/ban-types
          const list = await (originRemoteMethod as Function)(query);
          if (Array.isArray(list)) {
            enums.value = list;
          }
        }, 150),
  };
});

const onInput = (val: string | number) => {
  emits("update:model-value", val);
};
</script>
