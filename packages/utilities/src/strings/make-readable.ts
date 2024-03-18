import { ensureNum } from '../numbers';

const DEFAULT_GROUP_COUNT = 4;

/**
 * Formats a value by inserting a separator character between groups of characters.
 *
 * The character groups are defined by the `charGroupings` parameter. The default value is `[4]`, which will group the characters into groups of 4.
 *
 * For example, `makeReadable('12345678901', [1, 3, 3, 4], '-')` will return `'1-234-567-8901'`.
 */
export function makeReadable(value: string | number, charGroupings: number[] = [DEFAULT_GROUP_COUNT], separator = ' ') {
  const normCode = typeof value === 'number' ? String(value) : value;
  const chunks = [];

  let currIndex = 0;
  for (let i = 0; i < charGroupings.length; i++) {
    const charsInGroup = ensureNum(charGroupings[i], DEFAULT_GROUP_COUNT);
    const chunk = normCode.substring(currIndex, currIndex + charsInGroup);
    chunks.push(chunk);
    currIndex += charsInGroup;
  }

  if (currIndex < normCode.length) {
    const lastCharsInGroup = ensureNum(charGroupings[charGroupings.length - 1], DEFAULT_GROUP_COUNT);
    const remainder = normCode.substring(currIndex);

    for (let i = 0, charsLength = remainder.length; i < charsLength; i += lastCharsInGroup) {
      chunks.push(remainder.substring(i, i + lastCharsInGroup));
    }
  }

  return chunks.join(separator);
}
