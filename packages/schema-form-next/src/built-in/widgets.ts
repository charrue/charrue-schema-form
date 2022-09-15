import Select from "./Select.vue";
import Radio from "./Radio.vue";
import Checkbox from "./Checkbox.vue";

const baseMap = {
  string: "el-input",
  boolean: "el-switch",
  number: "el-input",
  checkbox: Checkbox,
  select: Select,
  radio: Radio,
} as Record<string, any>;

export default baseMap;
