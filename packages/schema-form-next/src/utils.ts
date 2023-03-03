import isequal from "lodash.isequal";
import { StyleValue } from "vue";

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
