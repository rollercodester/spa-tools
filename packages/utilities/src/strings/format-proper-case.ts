/**
 * Converts a string to proper case.
 */
export function formatProperCase(str: string) {
  return str.replace(/[\w\u00C0-\u017F]+/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}
