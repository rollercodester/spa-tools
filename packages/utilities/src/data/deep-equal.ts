/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Deeply compares two objects.
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
