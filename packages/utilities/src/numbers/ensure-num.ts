/**
 * Checks if the given value is a valid number or can be parsed to a valid number and if so
 * returns number; otherwise returns fallback value.
 */
export function ensureNum<F = unknown>(value: unknown, fallback: F): number | F {
  if (typeof value === 'number') {
    return checkNum(value, fallback);
  }

  const normNum = parseFloat(String(value));

  return checkNum(normNum, fallback);
}

function checkNum<F = unknown>(num: number, fallback: F) {
  if (isNaN(num) || !isFinite(num)) {
    return fallback;
  }
  return num;
}
