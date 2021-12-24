import {getColorByte, getColorSpace, unsafeComposeBytes} from './raw-color-utils';
import {convertColorSpace, convertRawColorSpace} from './color-space-utils';
import {lerp, sqrt} from './math';
import {right} from './int64';
import {ColorSpace, RawColor, Rgb} from './colors';
import {tempRgb, toTempColor} from './temp-colors';

/**
 * Mixes colors in given proportion.
 *
 * @param color1 The first color.
 * @param color2 The second color.
 * @param ratio The percentage of blend between colors
 * @param colorSpace The output color model. If omitted then color model of `color1` is used.
 * @return A blended color.
 */
export function blend(color1: RawColor, color2: RawColor, ratio: number, colorSpace = getColorSpace(color1)): RawColor {

  color1 = convertRawColorSpace(color1, colorSpace);
  color2 = convertRawColorSpace(color2, colorSpace);

  const a1 = getColorByte(color1, 0);
  const b1 = getColorByte(color1, 1);
  const c1 = getColorByte(color1, 2);
  const d1 = getColorByte(color1, 3);

  const a2 = getColorByte(color2, 0);
  const b2 = getColorByte(color2, 1);
  const c2 = getColorByte(color2, 2);
  const d2 = getColorByte(color2, 3);

  return unsafeComposeBytes(
      colorSpace,
      lerp(ratio, a1, a2),
      lerp(ratio, b1, b2),
      lerp(ratio, c1, c2),
      lerp(ratio, d1, d2),
  );
}

/**
 * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation. The output color uses the
 * same same color model as the input.
 *
 * @see http://alienryderflex.com/hsp.html
 */
export function toGrayscale(color: RawColor): RawColor {
  const rgb = convertColorSpace(toTempColor(color), tempRgb);
  const q = grayscaleComponent(rgb);

  return convertRawColorSpace(unsafeComposeBytes(ColorSpace.RGB, q, q, q, rgb.a), getColorSpace(color));
}

function grayscaleComponent(color: Rgb): number {
  const {R, G, B} = color;

  return sqrt(0.299 * R * R + 0.587 * G * G + 0.114 * B * B);
}

/**
 * Returns `true` if colors are exactly equal.
 */
export function isEqualColor(color1: RawColor, color2: RawColor, ignoreAlpha = true): boolean {
  if (color1 === color2) {
    return true;
  }

  color2 = convertRawColorSpace(color2, getColorSpace(color1));

  return ignoreAlpha ? right(color1, 16) === right(color2, 16) : color1 === color2;
}

/**
 * Returns `true` if the input color is dark and `false` if it's bright.
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isDark(color: RawColor): boolean {
  return grayscaleComponent(convertColorSpace(toTempColor(color), tempRgb)) < 127.5;
}
