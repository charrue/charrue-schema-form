import isequal from "lodash.isequal";

export const has = <T = Record<string, any>>(obj: T, key: string) => {
  if (!obj || !key) return false;

  return Object.prototype.hasOwnProperty.call(obj, key);
};

export const isEqual = isequal;

export const FORM_ITEM_SLOT_NAMES = ["label", "error"];

export const FORM_ITEM_SLOT_PREFIX = "formItem";
export const SLOT_SEP = ":";
export const isFunction = (fn: any) => typeof fn === "function";
export const isPromise = (fn: any) => fn instanceof Promise;
export const isPlainObject = (obj: any) =>
  Object.prototype.toString.call(obj) === "[object Object]";
export const isArr = (arr: any) => Array.isArray(arr);
