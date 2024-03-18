export function omit<T>(obj: T, ...keys: string[]): Omit<T, keyof T> {
  const picked: Record<string, unknown> = {};
  const normObj = obj as Record<string, unknown>;
  for (const key in normObj) {
    if (!keys.includes(key)) {
      picked[key] = normObj[key];
    }
  }
  return picked as Omit<T, keyof T>;
}
