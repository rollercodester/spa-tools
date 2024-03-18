import { parseColor } from '.';

export const DEFAULT_RESULT_ON_ERROR = 'rgba(0, 0, 0, 1)';

/**
 * Converts a hex color to an rgba color.
 */
export function hexToRgba(hex: string, opacity?: number) {
  const colorObj = parseColor(hex);

  if (opacity !== undefined) {
    colorObj.alpha = opacity;
  }

  return colorObj.toRgba();
}
