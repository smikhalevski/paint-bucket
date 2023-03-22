import { Rgb } from '@paint-bucket/core';
import { Xyz } from './xyz';
import { clamp1 } from 'algomatic';
import { WhitePoint } from './WhitePoint';

/**
 * Convert RGBa to XYZa.
 */
export function rgbToXyz(rgb: Rgb, xyz: Xyz, whitePoint = WhitePoint.deg2.D65): Xyz {
  const r = rotateRgbToXyz(rgb[0]) / whitePoint[0];
  const g = rotateRgbToXyz(rgb[1]) / whitePoint[1];
  const b = rotateRgbToXyz(rgb[2]) / whitePoint[2];

  xyz[0] = clamp1(r * 0.41239079926595 + g * 0.35758433938387 + b * 0.18048078840183);
  xyz[1] = clamp1(r * 0.21263900587151 + g * 0.71516867876775 + b * 0.072192315360733);
  xyz[2] = clamp1(r * 0.019330818715591 + g * 0.11919477979462 + b * 0.95053215224966);
  xyz[3] = rgb[3];

  return xyz;
}

/**
 * Undoes gamma-correction from an RGB-encoded color.
 *
 * @see https://en.wikipedia.org/wiki/SRGB#Specification_of_the_transformation
 * @see https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
 */
function rotateRgbToXyz(v: number): number {
  return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 0.1292;
}

/**
 * Convert XYZa to RGBa.
 *
 * @see {@link https://www.w3.org/TR/css-color-4/#rgb-to-lab RGB to LAB on W3C}
 * @see {@link https://www.w3.org/TR/css-color-4/#color-conversion-code Color conversion code on W3C}
 * @see {@link http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html RGB/XYZ Matrices}
 */
export function xyzToRgb(xyz: Xyz, rgb: Rgb, whitePoint = WhitePoint.deg2.D65): Rgb {
  const [X, Y, Z] = xyz;

  const r = X * +3.240969941904521 + Y * -1.537383177570093 + Z * -0.498610760293;
  const g = X * -0.96924363628087 + Y * +1.87596750150772 + Z * +0.041555057407175;
  const b = X * +0.055630079696993 + Y * -0.20397695888897 + Z * +1.056971514242878;

  rgb[0] = clamp1(rotateXyzToRgb(r) * whitePoint[0]);
  rgb[1] = clamp1(rotateXyzToRgb(g) * whitePoint[1]);
  rgb[2] = clamp1(rotateXyzToRgb(b) * whitePoint[2]);
  rgb[3] = xyz[3];

  return rgb;
}

function rotateXyzToRgb(v: number): number {
  return v > 0.0031308 ? 1.055 * Math.pow(v, 1.0 / 2.4) - 0.055 : v * 12.92;
}
