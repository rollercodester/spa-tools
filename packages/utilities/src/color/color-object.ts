import { roundToNearest } from '../numbers';

/**
 * A color object that can be used to modify colors and convert them to different formats.
 */
export class ColorObject {
  private a: number = 1;
  private b: number = 0;
  private g: number = 0;
  private r: number = 0;

  constructor(red: number, green: number, blue: number, alpha = 1) {
    this.alpha = alpha;
    this.blue = blue;
    this.green = green;
    this.red = red;
  }

  get red() {
    return this.r;
  }
  set red(red: number) {
    if (Number.isNaN(red) || red > 255 || red < 0) {
      return;
    }

    this.r = red;
  }

  get green() {
    return this.g;
  }
  set green(green: number) {
    if (Number.isNaN(green) || green > 255 || green < 0) {
      return;
    }

    this.g = green;
  }

  get blue() {
    return this.b;
  }
  set blue(blue: number) {
    if (Number.isNaN(blue) || blue > 255 || blue < 0) {
      return;
    }

    this.b = blue;
  }
  get alpha() {
    return this.a;
  }
  set alpha(alpha: number) {
    if (Number.isNaN(alpha) || alpha > 1 || alpha < 0) {
      return;
    }

    this.a = roundToNearest(alpha, 2);
  }

  toHex() {
    const normRed = this.r.toString(16).padStart(2, '0');
    const normGreen = this.g.toString(16).padStart(2, '0');
    const normBlue = this.b.toString(16).padStart(2, '0');
    const normAlpha =
      this.a === 1
        ? ''
        : Math.round(this.a * 255)
            .toString(16)
            .padStart(2, '0');

    return `#${normRed}${normGreen}${normBlue}${normAlpha}`;
  }

  toHsla() {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const a = this.a;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let l = (max + min) / 2;
    let h = 0;
    let s = 0;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%, ${a})`;
  }

  toRgba() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
