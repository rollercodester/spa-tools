import { formatProperCase } from './format-proper-case';

/**
 * Separates words in a string by a separator; the default separator is a space.
 *
 * Example: `separateWords('HelloWorld')` returns `'Hello World'`.
 */
export function separateWords(str: string, separator = ' ', ensureProperCase = false) {
  const newStr = str
    .replace(/([A-Z])/g, (match, _, offset) => {
      if (offset === 0 || str[offset - 1] === separator) {
        return match;
      }
      return `${separator}${match}`;
    })
    .trim();

  return ensureProperCase ? formatProperCase(newStr) : newStr;
}
