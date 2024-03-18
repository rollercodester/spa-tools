import { jsonStringify } from '../data';

/**
 * Hashes a value using crypto's sha256 algorithm.
 */
export async function hash(value: unknown) {
  const encoder = new TextEncoder();
  const normValue = jsonStringify(value);
  const encodedValue = encoder.encode(normValue);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', encodedValue);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const newHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return newHash;
}
