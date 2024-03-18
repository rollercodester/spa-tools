import { ColorObject } from './color-object';
import { parseColor } from '.';

const black = new ColorObject(0, 0, 0, 1);
const gray = new ColorObject(128, 128, 128, 1);
const white = new ColorObject(255, 255, 255, 1);

/**
 * Modifies the shade of a color by adding black per given `ratio` between `0` and `1`.
 *
 * A `ratio` of `0` will return the original color while a `ratio` of `1` will return black.
 *
 * By default an exponential algo is applied but the `useLinear` flag can be set to use a linear algo.
 *
 * @returns A color object with the new color values.
 */
export function shade(rgbOrRgbaOrHex: string, ratio: number, useLinear?: boolean) {
  return addWhiteOrBlack(rgbOrRgbaOrHex, ratio, 'black', useLinear);
}

/**
 * Modifies the tint of a color by adding white per given `ratio` between `0` and `1`.
 *
 * A `ratio` of `0` will return the original color while a `ratio` of `1` will return white.
 *
 * By default an exponential algo is applied but the `useLinear` flag can be set to use a linear algo.
 *
 * @returns A color object with the new color values.
 */
export function tint(rgbOrRgbaOrHex: string, ratio: number, useLinear?: boolean) {
  return addWhiteOrBlack(rgbOrRgbaOrHex, ratio, 'white', useLinear);
}

/**
 * Modifies the tone of a color by adding gray per given `ratio` between `0` and `1`.
 *
 * A `ratio` of `0` will return the original color while a `ratio` of `1` will return gray.
 *
 * By default an exponential algo is applied but the `useLinear` flag can be set to use a linear algo.
 *
 * @returns A color object with the new color values.
 */
export function tone(rgbOrRgbaOrHex: string, ratio: number, useLinear?: boolean) {
  return addWhiteOrBlack(rgbOrRgbaOrHex, ratio, 'gray', useLinear);
}

//
//
// helpers
//
//

function addWhiteOrBlack(
  rgbOrRgbaOrHex: string,
  ratio: number,
  colorToAdd: 'white' | 'black' | 'gray',
  useLinear?: boolean
) {
  const toColorRatio = Math.abs(Math.min(Math.max(ratio, -1), 1));
  const colorObj = parseColor(rgbOrRgbaOrHex);
  const baseRatio = 1 - toColorRatio;
  const normToColorToAdd = colorToAdd === 'white' ? white : colorToAdd === 'black' ? black : gray;

  if (useLinear) {
    colorObj.red = Math.round(baseRatio * colorObj.red + toColorRatio * normToColorToAdd.red);
    colorObj.green = Math.round(baseRatio * colorObj.green + toColorRatio * normToColorToAdd.green);
    colorObj.blue = Math.round(baseRatio * colorObj.blue + toColorRatio * normToColorToAdd.blue);
  } else {
    colorObj.red = Math.round((baseRatio * colorObj.red ** 2 + toColorRatio * normToColorToAdd.red ** 2) ** 0.5);
    colorObj.green = Math.round((baseRatio * colorObj.green ** 2 + toColorRatio * normToColorToAdd.green ** 2) ** 0.5);
    colorObj.blue = Math.round((baseRatio * colorObj.blue ** 2 + toColorRatio * normToColorToAdd.blue ** 2) ** 0.5);
  }

  const blendedAlpha = colorObj.alpha * baseRatio + normToColorToAdd.alpha * toColorRatio;
  colorObj.alpha = blendedAlpha;

  return colorObj;
}
