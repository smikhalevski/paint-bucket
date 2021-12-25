import {IRgb} from '@paint-bucket/core';
import {lerp} from 'numeric-wrench';

/**
 * Mixes RGB colors in given proportion and updates `rgb1`.
 *
 * @param rgb1 The first color.
 * @param rgb2 The second color.
 * @param ratio The percentage of blend between colors.
 * @return A blended color.
 */
export function mix(rgb1: IRgb, rgb2: IRgb, ratio: number): void {
  rgb1.R = lerp(ratio, rgb1.R, rgb2.R);
  rgb1.G = lerp(ratio, rgb1.G, rgb2.G);
  rgb1.B = lerp(ratio, rgb1.B, rgb2.B);
  rgb1.a = lerp(ratio, rgb1.a, rgb2.a);
}

/**
 * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation. The output color uses the
 * same same color model as the input.
 *
 * @see http://alienryderflex.com/hsp.html
 */
export function toGrayscale(rgb: IRgb): IRgb {
  const q = grayscaleComponent(rgb);

  rgb.R = q;
  rgb.G = q;
  rgb.B = q;

  return rgb;
}

function grayscaleComponent(rgb: IRgb): number {
  const {R, G, B} = rgb;

  return Math.sqrt(0.299 * R * R + 0.587 * G * G + 0.114 * B * B);
}

/**
 * Returns `true` if the input color is dark and `false` if it's bright.
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isDark(rgb: IRgb): boolean {
  return grayscaleComponent(rgb) < 127.5;
}

/**
 * Returns `true` if colors are exactly equal.
 */
export function areEqualColors(rgb1: IRgb, rgb2: IRgb, ignoreAlpha = true): boolean {
  return rgb1 === rgb2 || rgb1.R === rgb2.R && rgb1.G === rgb2.G && rgb1.B === rgb2.B && (ignoreAlpha || rgb1.a === rgb2.a);
}
