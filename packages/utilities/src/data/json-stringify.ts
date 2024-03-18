export function jsonStringify(obj: unknown, space?: string | number) {
  const alreadyProcessed = new Set();
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (alreadyProcessed.has(value)) {
          // circular reference found so discard key
          return;
        }
        alreadyProcessed.add(value);
      }
      return value;
    },
    space
  );
}
