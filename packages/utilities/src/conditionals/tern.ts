/**
 * Logical ternary function that will return one of three provided values depending on if first value passed in is true, false, or undefined/null, respectively.
 */
export function tern<T = unknown, F = unknown, U = unknown>(
  value?: boolean | null,
  whenTrue?: T,
  whenFalse?: F,
  whenUndefinedOrNull?: U
) {
  return typeof value === 'undefined' || value === null
    ? (whenUndefinedOrNull as U)
    : value
      ? (whenTrue as T)
      : (whenFalse as F);
}
