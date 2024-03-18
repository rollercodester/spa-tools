/**
 * Deep merge two objects per given precedence.
 */
export function deepMerge<T = unknown>(left: unknown, right: unknown, precedence: 'left' | 'right' = 'right'): T {
  return precedence === 'left' ? deepMergeLeft(left, right) : deepMergeRight(left, right);
}

function deepMergeLeft<T = unknown>(left: unknown, right: unknown): T {
  if (Array.isArray(left) && Array.isArray(right)) {
    return [...left, ...right] as T;
  }

  if (typeof left !== 'object' || typeof right !== 'object') {
    return left as T;
  }

  const merged: Record<string, unknown> = { ...left };
  const normLeft = left as Record<string, unknown>;
  const normRight = right as Record<string, unknown>;

  for (const key in right) {
    if (Object.prototype.hasOwnProperty.call(right, key)) {
      if (Object.prototype.hasOwnProperty.call(left, key)) {
        if (left !== null && right !== null) {
          merged[key] = deepMergeLeft(normLeft[key], normRight[key]);
        }
      } else {
        merged[key] = normRight[key];
      }
    }
  }

  return merged as T;
}

function deepMergeRight<T = unknown>(left: unknown, right: unknown): T {
  if (Array.isArray(left) && Array.isArray(right)) {
    return [...left, ...right] as T;
  }

  if (typeof left !== 'object' || typeof right !== 'object') {
    return right as T;
  }

  const merged: Record<string, unknown> = { ...right };
  const normLeft = left as Record<string, unknown>;
  const normRight = right as Record<string, unknown>;

  for (const key in left) {
    if (Object.prototype.hasOwnProperty.call(left, key)) {
      if (Object.prototype.hasOwnProperty.call(right, key)) {
        if (right !== null && left !== null) {
          merged[key] = deepMergeRight(normLeft[key], normRight[key]);
        }
      } else {
        merged[key] = normLeft[key];
      }
    }
  }

  return merged as T;
}
