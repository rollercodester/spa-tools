import { isRecord } from './is-record';

/**
 * If value is a valid record, returns true or false depending on if the record is NOT empty.
 *
 * If value is not a record, returns null.
 */
export function isNotEmptyRecord(value: unknown) {
  if (isRecord(value)) {
    return Object.keys(value as Record<string, unknown>).length > 0;
  }

  return null;
}
