import {clamp, lerp, sqrt} from '@paint-bucket/core/src/main/math';
import {right} from '@paint-bucket/core/src/main/int64';
import {Hsl, Lab, Rgb} from './colors';
import {IColor} from './color-types';
import {deltaE2000} from './deltaE2000';

/**
 * Mixes RGB colors in given proportion and updates `rgb1`.
 *
 * @param rgb1 The first color.
 * @param rgb2 The second color.
 * @param ratio The percentage of blend between colors.
 * @return A blended color.
 */
export function mix(rgb1: Rgb, rgb2: Rgb, ratio: number): void {
  rgb1.R = lerp(ratio, rgb1.R, rgb2.R);
  rgb1.G = lerp(ratio, rgb1.G, rgb2.G);
  rgb1.B = lerp(ratio, rgb1.B, rgb2.B);
  rgb1.a = lerp(ratio, rgb1.a, rgb2.a);
}

/**
 * Increases or decreases the color lightness by an absolute delta.
 */
export function adjustLightness(hsl: Hsl, delta: number): void {
  hsl.L = clamp(hsl.L + delta, 0, 100);
}

/**
 * Increases or decreases the color lightness by a percentage.
 */
export function adjustLightnessBy(hsl: Hsl, percent: number): void {
  hsl.L = clamp(hsl.L * (1 + percent), 0, 100);
}

/**
 * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation. The output color uses the
 * same same color model as the input.
 *
 * @see http://alienryderflex.com/hsp.html
 */
export function makeGrayscale(rgb: Rgb): void {
  const q = grayscaleComponent(rgb);

  rgb.R = q;
  rgb.G = q;
  rgb.B = q;
}

function grayscaleComponent(rgb: Rgb): number {
  const {R, G, B} = rgb;

  return sqrt(0.299 * R * R + 0.587 * G * G + 0.114 * B * B);
}

/**
 * Returns `true` if the input color is dark and `false` if it's bright.
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isDark(rgb: Rgb): boolean {
  return grayscaleComponent(rgb) < 127.5;
}

/**
 * Returns `true` if colors are exactly equal.
 */
export function areEqualColors(rgb1: Rgb, rgb2: Rgb, ignoreAlpha?: boolean): boolean;

/**
 * Returns `true` if colors are exactly equal.
 */
export function areEqualColors(rgb1: Hsl, rgb2: Hsl, ignoreAlpha?: boolean): boolean;

export function areEqualColors(color1: IColor, color2: IColor, ignoreAlpha = true): boolean {
  if (color1 === color2) {
    return true;
  }

  const rawColor1 = color1.getRawColor();
  const rawColor2 = color2.getRawColor();

  return ignoreAlpha ? right(rawColor1, 16) === right(rawColor2, 16) : rawColor1 === rawColor2;
}

/**
 * Returns `true` if colors are visually indistinguishable.
 */
export function areIndistinguishableColors(lab1: Lab, lab2: Lab): boolean {
  return deltaE2000(lab1, lab2) <= 2;
}
