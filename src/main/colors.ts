import {ColorSpace, fromBytes, fromRawBytes, getColorByte, getColorFloat, getColorSpace, NakedColor} from './bytes';
import {max, min, sqrt} from './math';
import {Byte, right} from './int';

/**
 * Converts color to another color model.
 *
 * @param color The color to convert.
 * @param colorSpace The target color model.
 * @returns The new color or -1 if color model is invalid.
 */
export function toColorSpace(color: NakedColor, colorSpace: ColorSpace): NakedColor | -1 {

  // @formatter:off
  switch (getColorSpace(color)) {

    case ColorSpace.RGB:
      switch (colorSpace) {
        case ColorSpace.HSL: return rgbToHsl(color);
        case ColorSpace.RGB: return color;
      }
      break;

    case ColorSpace.HSL:
      switch (colorSpace) {
        case ColorSpace.HSL: return color;
        case ColorSpace.RGB: return hslToRgb(color);
      }
      break;
  }
  // @formatter:on

  // Unknown color model
  return -1;
}

export function toRgb(color: NakedColor): NakedColor {
  return toColorSpace(color, ColorSpace.RGB);
}

export function toHsl(color: NakedColor): NakedColor {
  return toColorSpace(color, ColorSpace.HSL);
}

/**
 * Returns `true` if colors are exactly equal.
 */
export function isEqualColor(color1: NakedColor, color2: NakedColor, ignoreAlpha = true): boolean {
  if (color1 === color2) {
    return true;
  }

  color2 = toColorSpace(color2, getColorSpace(color1));

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

  return toColorSpace(fromRawBytes(ColorSpace.RGB, a, a, a, getColorByte(rgb, 3)), getColorSpace(color));
}

/**
 * Returns `true` if the input color is dark and `false` if it's bright.
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isDark(color: NakedColor): boolean {
  return getColorByte(toGrayscale(toRgb(color)), 0) < 0x80;
}
