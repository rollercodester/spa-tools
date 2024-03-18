/**
 * Checks if the given value is a valid string and if so returns string; otherwise returns fallback value.
 */
export function ensureStr<F = unknown>(str: unknown, fallback: F) {
  if (typeof str === 'string') {
    return str;
  }
  return fallback;
}
