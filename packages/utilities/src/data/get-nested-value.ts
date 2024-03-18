import { isRecord } from '../conditionals/is-record';

export function getNestedValue<T = unknown>(data: unknown, dataDotPath: string, defaultValue: T) {
  if (!isRecord(data) || !dataDotPath) {
    return defaultValue;
  }

  const dataParts = dataDotPath.split('.');
  let nextObj = data as Record<string, unknown>;

  for (let idx = 0; idx < dataParts.length; idx++) {
    const nextProp = dataParts[idx];

    if (typeof nextProp !== 'string') {
      return defaultValue;
    }

    const nextValue = nextObj[nextProp];

    if (typeof nextValue !== 'undefined') {
      if (idx === dataParts.length - 1) {
        return nextValue as unknown as T;
      }

      if (isRecord(nextValue)) {
        nextObj = nextValue as Record<string, unknown>;
      } else {
        return defaultValue;
      }
    } else {
      return defaultValue;
    }
  }
}
