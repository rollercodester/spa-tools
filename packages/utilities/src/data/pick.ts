/**
 * Returns a new object by picking properties from an object.
 */
export function pick<T>(obj: T, ...keys: string[]): Pick<T, keyof T> {
  const picked: Record<string, unknown> = {};
  const normObj = obj as Record<string, unknown>;
  for (const key of keys) {
    if (key in normObj) {
      picked[key] = normObj[key];
    }
  }
  return picked as Pick<T, keyof T>;
}
