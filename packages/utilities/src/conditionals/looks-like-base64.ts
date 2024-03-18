/**
 * Check if a string looks like a base64 encoded string.
 */
export function looksLikeBase64(str: string): boolean {
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(str);
}
