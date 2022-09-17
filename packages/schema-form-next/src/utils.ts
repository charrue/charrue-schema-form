export const has = <T = Record<string, any>>(obj: T, key: string) => {
  if (!obj || !key) return false

  return Object.prototype.hasOwnProperty.call(obj, key)
}

export const isEqual = (a: unknown, b: unknown) => {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
      const length = a.length;
      if (length !== b.length) return false;

      for (let i = 0; i < length; i++) {
        if (!isEqual(a[i], b[i])) return false;
        return true;
      }
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;

      for (const i of a.entries()) {
        if (!b.has(i[0])) return false;
      }
      for (const i of a.entries()) {
        if (!isEqual(i[1], b.get(i[0]))) return false;
      }
      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (const i of a.entries()) {
        if (!b.has(i[0])) return false;
      }
      return true;
    }

    if (a instanceof RegExp && b instanceof RegExp) return a.source === b.source && a.flags === b.flags;

    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();

    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    const keys = Object.keys(a);
    const length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (let i = 0; i < length; i++) {
      if (!has(b, keys[i])) return false;
    }

    for (let i = 0; i < length; i++) {
      const key = keys[i];

      if (!isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
}
