import { jsonStringify } from '../data';

export function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return error;
  }

  return new Error(jsonStringify(error));
}
