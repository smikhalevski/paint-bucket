import {ColorModel, fromBytes, fromRawBytes, getColorByte, getColorFloat, getColorModel, NakedColor} from './bytes';
import {max, min, sqrt} from './math';
import {Byte, right} from './int';

export const blackRgb = rgb(0, 0, 0);
export const whiteRgb = rgb(0xFF, 0xFF, 0xFF);

export const blackHsl = hsl(0, 0, 0);
export const whiteHsl = hsl(0, 0, 0xFF);

export function rgb(r: Byte, g: Byte, b: Byte, alpha = 1): NakedColor {
  return fromBytes(ColorModel.RGB, r, g, b, 0xFF * alpha);
}

export function hsl(h: Byte, s: Byte, l: Byte, alpha = 1): NakedColor {
  return fromBytes(ColorModel.HSL, h, s, l, 0xFF * alpha);
}

export function isRgb(color: NakedColor): boolean {
  return getColorModel(color) === ColorModel.RGB;
}

export function isHsl(color: NakedColor): boolean {
  return getColorModel(color) === ColorModel.HSL;
}

/**
 * Converts color to another color model.
 *
 * @param color The color to convert.
 * @param colorModel The target color model.
 * @returns The new color or -1 if color model is invalid.
 */
export function toColorModel(color: NakedColor, colorModel: ColorModel): NakedColor | -1 {

  // @formatter:off
  switch (getColorModel(color)) {

    case ColorModel.RGB:
      switch (colorModel) {
        case ColorModel.HSL: return rgbToHsl(color);
        case ColorModel.RGB: return color;
      }
      break;

    case ColorModel.HSL:
      switch (colorModel) {
        case ColorModel.HSL: return color;
        case ColorModel.RGB: return hslToRgb(color);
      }
      break;
  }
  // @formatter:on

  // Unknown color model
  return -1;
}

export function toRgb(color: NakedColor): NakedColor {
  return toColorModel(color, ColorModel.RGB);
}

export function toHsl(color: NakedColor): NakedColor {
  return toColorModel(color, ColorModel.HSL);
}

function rgbToHsl(rgb: NakedColor): NakedColor {
  const r = getColorFloat(rgb, 0);
  const g = getColorFloat(rgb, 1);
  const b = getColorFloat(rgb, 2);

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

  return fromBytes(ColorModel.HSL, 0xFF * h, 0xFF * s, 0xFF * l, getColorByte(rgb, 3));
}

function hslToRgb(hsl: NakedColor): NakedColor {
  const h = getColorFloat(hsl, 0);
  const s = getColorFloat(hsl, 1);
  const l = getColorFloat(hsl, 2);

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

  return fromBytes(ColorModel.RGB, 0xFF * r, 0xFF * g, 0xFF * b, getColorByte(hsl, 3));
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

/**
 * Returns `true` if colors are exactly equal.
 */
export function isEqualColor(color1: NakedColor, color2: NakedColor, ignoreAlpha = true): boolean {
  if (color1 === color2) {
    return true;
  }

  color2 = toColorModel(color2, getColorModel(color1));

  return ignoreAlpha ? right(color1, 16) === right(color2, 16) : color1 === color2;
}

/**
 * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation. The output color uses the
 * same same color model as the input.
 *
 * @see http://alienryderflex.com/hsp.html
 */
export function toGrayscale(color: NakedColor): NakedColor {
  const rgb = toRgb(color);

  const r = getColorByte(rgb, 0);
  const g = getColorByte(rgb, 1);
  const b = getColorByte(rgb, 2);

  const a = sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);

  return toColorModel(fromRawBytes(ColorModel.RGB, a, a, a, getColorByte(rgb, 3)), getColorModel(color));
}

/**
 * Returns `true` if the input color is dark and `false` if it's bright.
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isDark(color: NakedColor): boolean {
  return getColorByte(toGrayscale(toRgb(color)), 0) < 0x80;
}
