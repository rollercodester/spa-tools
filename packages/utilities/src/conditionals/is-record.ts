/**
 * Checks if the value is a record (i.e. plain object of Record<string, unkwown>)
 */
export function isRecord(value: unknown) {
  return value?.constructor === Object;
}
