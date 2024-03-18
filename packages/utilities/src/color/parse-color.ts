import { ColorObject } from './color-object';

/**
 * Converts an rgba or hex color string to an RGBA color object.
 *
 * This is helpful if you need to work with a color style's numeric color values.
 *
 * @returns A color object with the new color values.
 */
export function parseColor(rgbOrRgbaOrHex: string): ColorObject {
  const { length } = rgbOrRgbaOrHex;

  if (length > 9) {
    if (!rgbOrRgbaOrHex.startsWith('rgb')) {
      return getColorObjectOnErr();
    }

    const rgbaColor = rgbOrRgbaOrHex.replace(/rgba|rgb|\(|\)|\s/g, '').split(',');
    const [red = '0', green = '0', blue = '0', alpha = '1'] = rgbaColor;

    if (rgbaColor.length < 3 || rgbaColor.length > 4) {
      return getColorObjectOnErr();
    }

    return getColorObject([parseInt(red, 10), parseInt(green, 10), parseInt(blue, 10), parseFloat(alpha)]);
  } else {
    if (length === 8 || length === 6 || length < 4) {
      return getColorObjectOnErr();
    }

    let hexColor = rgbOrRgbaOrHex;

    if (length < 6) {
      hexColor = `#${rgbOrRgbaOrHex[1]}${rgbOrRgbaOrHex[1]}${rgbOrRgbaOrHex[2]}${rgbOrRgbaOrHex[2]}${
        rgbOrRgbaOrHex[3]
      }${rgbOrRgbaOrHex[3]}${length > 4 ? (rgbOrRgbaOrHex[4] as string) + rgbOrRgbaOrHex[4] : ''}`;
    }

    const hexRed = parseInt(hexColor.slice(1, 3), 16);
    const hexGreen = parseInt(hexColor.slice(3, 5), 16);
    const hexBlue = parseInt(hexColor.slice(5, 7), 16);
    let hexAlpha = 1;

    if (length === 9 || length === 5) {
      hexAlpha = parseInt(hexColor.slice(7, 9), 16);
      hexAlpha = Math.round((hexAlpha / 255) * 100) / 100;
    }

    return getColorObject([hexRed, hexGreen, hexBlue, hexAlpha]);
  }
}

//
//
// helpers
//
//

function getColorObject(numbers: number[]): ColorObject {
  const normalizedNumbers = numbers.map((number, idx) => {
    if (Number.isNaN(number)) {
      return 0;
    }

    if (idx < 3 && (number > 255 || number < 0)) {
      return 0;
    } else if (idx === 3 && (number > 1 || number < 0)) {
      return 1;
    }

    return number;
  });

  return new ColorObject(
    normalizedNumbers[0] as number,
    normalizedNumbers[1] as number,
    normalizedNumbers[2] as number,
    normalizedNumbers[3] as number
  );
}

function getColorObjectOnErr(): ColorObject {
  return new ColorObject(0, 0, 0, 1);
}
