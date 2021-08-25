import {ColorLike, IHsl, IRgb} from './color-types';
import {max, min, round, sqrt} from './algebra-utils';

type Components = [number, number, number, number];

const tempRgb = rgb(0, 0, 0);

const tempHsl = hsl(0, 0, 0);

const tempComponents = [0, 0, 0, 0];

export function rgb(r: number, g: number, b: number, alpha = 1): IRgb {
  return {r, g, b, alpha};
}

export function hsl(h: number, s: number, l: number, alpha = 1): IHsl {
  return {h, s, l, alpha};
}

export function rgbInt(rgbValue: number, alpha = false, outRgb = rgb(0, 0, 0)): IRgb {
  const [r, g, b, a] = intToComponents(rgbValue, alpha ? 8 : 6);

  outRgb.r = r;
  outRgb.g = g;
  outRgb.b = b;
  outRgb.alpha = a;

  return outRgb;
}

export function hslInt(hslValue: number, alpha = false, outHsl = hsl(0, 0, 0)): IHsl {
  const [h, s, l, a] = intToComponents(hslValue, alpha ? 8 : 6);

  outHsl.h = h;
  outHsl.s = s;
  outHsl.l = l;
  outHsl.alpha = a;

  return outHsl;
}

export function rgbToHex(rgb: IRgb): string {
  const {r, g, b} = rgb;
  const bits =
      (1 << 24) +
      (r << 16) +
      (g << 8) +
      b;

  return bits.toString(16).substr(1, 6);
}

export function rgbToShortHex(rgb: IRgb): string {
  const {r, g, b} = rgb;
  const r1 = r >> 4;
  const g1 = g >> 4;
  const b1 = b >> 4;

  if (
      (r1 << 4 | r1) === r &&
      (g1 << 4 | g1) === g &&
      (b1 << 4 | b1) === b
  ) {
    const bits =
        (1 << 12) +
        (r1 << 8) +
        (g1 << 4) +
        b1;

    return bits.toString(16).substr(1, 3);
  }

  return rgbToHex(rgb);
}

/**
 * Converts hex color like `#fff` or `00ff00ff` to RGB. Leading "#" is ignored.
 */
export function hexToRgb(hex: string, outRgb = rgb(0, 0, 0)): IRgb {
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }
  const [r, g, b, alpha] = intToComponents(parseInt(hex, 16), hex.length);

  outRgb.r = r;
  outRgb.g = g;
  outRgb.b = b;
  outRgb.alpha = alpha;

  return outRgb;
}

function intToComponents(value: number, n: number, components = tempComponents): Components {

  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;

  if (n === 6) {
    n = 8;
    value <<= 8;
    value |= 0xff;
  }
  if (n === 8) {
    r = (value >> 24) & 0xff;
    g = (value >> 16) & 0xff;
    b = (value >> 8) & 0xff;
    a = (value >> 0) & 0xff;
  }
  if (n === 3) {
    n = 4;
    value <<= 4;
    value |= 0xf;
  }
  if (n === 4) {
    r = (value >> 12) & 0xf;
    g = (value >> 8) & 0xf;
    b = (value >> 4) & 0xf;
    a = (value >> 0) & 0xf;
    r += r << 4;
    g += g << 4;
    b += b << 4;
    a += a << 4;
  }

  return [r, g, b, a / 255];
}

export function rgbToHsl(rgb: IRgb, outHsl = hsl(0, 0, 0)): IHsl {
  let {r, g, b} = rgb;

  r /= 255;
  g /= 255;
  b /= 255;

  const A = max(r, g, b);
  const B = min(r, g, b);
  const l = (A + B) / 2;

  let h = 0;
  let s = 0;

  if (A !== B) {
    const d = A - B;
    s = l > 0.5 ? d / (2 - A - B) : d / (A + B);

    switch (A) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  outHsl.h = h;
  outHsl.s = s;
  outHsl.l = l;
  outHsl.alpha = rgb.alpha;

  return outHsl;
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}

export function hslToRgb(hsl: IHsl, outRgb = rgb(0, 0, 0)): IRgb {
  const {h, s, l} = hsl;

  let r = l;
  let g = l;
  let b = l;

  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  outRgb.r = round(r * 255);
  outRgb.g = round(g * 255);
  outRgb.b = round(b * 255);
  outRgb.alpha = hsl.alpha;

  return outRgb;
}

export function hslToHex(hsl: IHsl): string {
  return rgbToHex(hslToRgb(hsl, tempRgb));
}

export function hexToHsl(hex: string, outHsl = hsl(0, 0, 0)): IHsl {
  return rgbToHsl(hexToRgb(hex, tempRgb), outHsl);
}

export function hslToCss(hsl: IHsl): string {
  return rgbToCss(hslToRgb(hsl, tempRgb));
}

export function rgbToCss(rgb: IRgb): string {
  const {r, g, b, alpha} = rgb;
  return alpha < 1 ? `rgba(${r | 0},${g | 0},${b | 0},${alpha.toPrecision(2)})` : `#${rgbToHex(rgb)}`;
}

const rgbRegEx = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/;
const hslRegEx = /^hsla?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/;

export function cssToRgb(color: string, outRgb = rgb(0, 0, 0)): IRgb {

  const rgbMatch = color.match(rgbRegEx);
  if (rgbMatch) {
    const [, r, g, b, alpha = '1'] = rgbMatch;

    outRgb.r = parseInt(r, 10);
    outRgb.g = parseInt(g, 10);
    outRgb.b = parseInt(b, 10);
    outRgb.alpha = parseFloat(alpha);

    return outRgb;
  }

  const hslMatch = color.match(hslRegEx);
  if (hslMatch) {
    const [, h, s, l, alpha = '1'] = hslMatch;

    tempHsl.h = parseInt(h);
    tempHsl.s = parseInt(s);
    tempHsl.l = parseInt(l);
    tempHsl.alpha = parseFloat(alpha);

    return hslToRgb(tempHsl, outRgb);
  }

  return hexToRgb(color, outRgb);
}

export function isRgb(color: ColorLike): color is IRgb {
  return color !== null && typeof color === 'object' && 'r' in color;
}

export function isHsl(color: ColorLike): color is IHsl {
  return color !== null && typeof color === 'object' && 'h' in color;
}

export function toRgb(color: ColorLike, outRgb = rgb(0, 0, 0)): IRgb {
  return isRgb(color) ? color : isHsl(color) ? hslToRgb(color, outRgb) : hexToRgb(color, outRgb);
}

export function toHsl(color: ColorLike, outHsl = hsl(0, 0, 0)): IHsl {
  return isRgb(color) ? rgbToHsl(color, outHsl) : isHsl(color) ? color : hexToHsl(color, outHsl);
}

/**
 * Returns `true` if colors are exactly equal.
 */
export function isEqualColor(color1: ColorLike, color2: ColorLike, ignoreOpacity = true): boolean {
  if (color1 === color2) {
    return true;
  }
  const rgb1 = toRgb(color1, tempRgb);
  const rgb2 = toRgb(color2, tempRgb);

  return (
      rgb1.r === rgb2.r &&
      rgb1.g === rgb2.g &&
      rgb1.b === rgb2.b &&
      (ignoreOpacity || rgb1.alpha === rgb2.alpha)
  );
}

/**
 * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation.
 *
 * @return number in `[0, 255]` range.
 * @see http://alienryderflex.com/hsp.html
 */
export function toGrayscale(color: ColorLike): number {
  const {r, g, b} = toRgb(color, tempRgb);
  return sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
}

/**
 * Returns `true` if the input color is dark and `false` if it's bright.
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isDark(color: ColorLike): boolean {
  return toGrayscale(color) < 127.5;
}
