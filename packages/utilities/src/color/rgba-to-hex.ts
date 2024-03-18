import { parseColor } from '.';

/**
 * Converts an rgba color to hex.
 */
export function rgbaToHex(rgba: string) {
  const colorObj = parseColor(rgba);
  return colorObj.toHex();
}
