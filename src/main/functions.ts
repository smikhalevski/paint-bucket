import {fromRawBytes, getColorByte, getColorSpace} from './packed-color';
import {toColorSpace, toRgb} from './colors';
import {sqrt} from './math';
import {right} from './int';
import {ColorSpace, PackedColor} from './color-types';

/**
 * Mixes `color1` and `color2` in  proportion `prc`.
 *
 * @param color1 The first color.
 * @param color2 The second color.
 * @param ratio The percentage of blend between `color1` and `color2`
 * @param colorSpace The output color model. If omitted then color model of `color1` is used.
 */
export function blend(color1: PackedColor, color2: PackedColor, ratio: number, colorSpace = getColorSpace(color1)): PackedColor {

  color1 = toColorSpace(color1, colorSpace);
  color2 = toColorSpace(color2, colorSpace);

  const a1 = getColorByte(color1, 0);
  const b1 = getColorByte(color1, 1);
  const c1 = getColorByte(color1, 2);
  const d1 = getColorByte(color1, 3);

  const a2 = getColorByte(color2, 0);
  const b2 = getColorByte(color2, 1);
  const c2 = getColorByte(color2, 2);
  const d2 = getColorByte(color2, 3);

  return fromRawBytes(
      colorSpace,
      (a1 + (a2 - a1)) * ratio,
      (b1 + (b2 - b1)) * ratio,
      (c1 + (c2 - c1)) * ratio,
      (d1 + (d2 - d1)) * ratio,
  );
}

/**
 * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation. The output color uses the
 * same same color model as the input.
 *
 * @see http://alienryderflex.com/hsp.html
 */
export function toGrayscale(color: PackedColor): PackedColor {
  const rgb = toRgb(color);

  const r = getColorByte(rgb, 0);
  const g = getColorByte(rgb, 1);
  const b = getColorByte(rgb, 2);

  const a = sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);

  return toColorSpace(fromRawBytes(ColorSpace.RGB, a, a, a, getColorByte(rgb, 3)), getColorSpace(color));
}

/**
 * Returns `true` if colors are exactly equal.
 */
export function isEqualColor(color1: PackedColor, color2: PackedColor, ignoreAlpha = true): boolean {
  if (color1 === color2) {
    return true;
  }

  color2 = toColorSpace(color2, getColorSpace(color1));

  return ignoreAlpha ? right(color1, 16) === right(color2, 16) : color1 === color2;
}

/**
 * Returns `true` if the input color is dark and `false` if it's bright.
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isDark(color: PackedColor): boolean {
  return getColorByte(toGrayscale(toRgb(color)), 0) < 127.5;
}
