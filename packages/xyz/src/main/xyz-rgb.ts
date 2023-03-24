import { RGB } from '@paint-bucket/core';
import { clamp } from '@paint-bucket/plugin-utils';
import { WhitePoint } from './WhitePoint';
import { XYZ } from './xyz';

/**
 * Convert RGBa to XYZa.
 */
export function convertRGBToXYZ(rgb: RGB, xyz: XYZ, whitePoint = WhitePoint.CIE1931.D65): XYZ {
  const r = rotateRGBToXYZ(rgb[0]) / whitePoint[0];
  const g = rotateRGBToXYZ(rgb[1]) / whitePoint[1];
  const b = rotateRGBToXYZ(rgb[2]) / whitePoint[2];

  xyz[0] = clamp(r * 0.41239079926595 + g * 0.35758433938387 + b * 0.18048078840183);
  xyz[1] = clamp(r * 0.21263900587151 + g * 0.71516867876775 + b * 0.072192315360733);
  xyz[2] = clamp(r * 0.019330818715591 + g * 0.11919477979462 + b * 0.95053215224966);
  xyz[3] = rgb[3];

  return xyz;
}

/**
 * Undoes gamma-correction from an RGB-encoded color.
 *
 * @see https://en.wikipedia.org/wiki/SRGB#Specification_of_the_transformation
 * @see https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
 */
function rotateRGBToXYZ(v: number): number {
  return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 0.1292;
}

/**
 * Convert XYZa to RGBa.
 *
 * @see {@link https://www.w3.org/TR/css-color-4/#rgb-to-lab RGB to LAB}
 * @see {@link https://www.w3.org/TR/css-color-4/#color-conversion-code Color conversion code}
 * @see {@link http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html RGB/XYZ Matrices}
 */
export function convertXYZToRGB(xyz: XYZ, rgb: RGB, whitePoint = WhitePoint.CIE1931.D65): RGB {
  const [X, Y, Z] = xyz;

  const r = X * +3.240969941904521 + Y * -1.537383177570093 + Z * -0.498610760293;
  const g = X * -0.96924363628087 + Y * +1.87596750150772 + Z * +0.041555057407175;
  const b = X * +0.055630079696993 + Y * -0.20397695888897 + Z * +1.056971514242878;

  rgb[0] = clamp(rotateXYZToRGB(r) * whitePoint[0]);
  rgb[1] = clamp(rotateXYZToRGB(g) * whitePoint[1]);
  rgb[2] = clamp(rotateXYZToRGB(b) * whitePoint[2]);
  rgb[3] = xyz[3];

  return rgb;
}

function rotateXYZToRGB(v: number): number {
  return v > 0.0031308 ? 1.055 * Math.pow(v, 1.0 / 2.4) - 0.055 : v * 12.92;
}
