export function jsonStringify(obj: unknown, space?: string | number, circRefSub: unknown = '[Circular Reference]') {
  const stack: unknown[] = [];
  const keys: string[] = [];

  return JSON.stringify(
    obj,
    function (key, value) {
      if (typeof value === 'bigint') {
        return value.toString();
      }

      if (typeof value === 'object' && value !== null) {
        const thisPos = stack.indexOf(this);
        if (thisPos === -1) {
          stack.push(this);
          keys.push(key);
        } else {
          stack.splice(thisPos + 1);
          keys.splice(thisPos, Infinity, key);
        }

        if (stack.indexOf(value) !== -1) {
          return circRefSub;
        }
      }

      return value;
    },
    space
  );
}
