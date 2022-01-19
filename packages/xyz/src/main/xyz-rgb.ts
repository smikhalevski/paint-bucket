import {Rgb} from '@paint-bucket/core';
import {Xyz} from './xyz';
import {clamp1} from 'numeric-wrench';
import {whitepoint} from './whitepoint';

/**
 * Convert RGBa to XYZa.
 */
export function rgbToXyz(rgb: Rgb, xyz: Xyz, white = whitepoint[2].D65): Xyz {

  const r = rotateRgbToXyz(rgb[0]) / white[0];
  const g = rotateRgbToXyz(rgb[1]) / white[1];
  const b = rotateRgbToXyz(rgb[2]) / white[2];

  xyz[0] = clamp1(r * 0.412390799265950 + g * 0.35758433938387 + b * 0.180480788401830);
  xyz[1] = clamp1(r * 0.212639005871510 + g * 0.71516867876775 + b * 0.072192315360733);
  xyz[2] = clamp1(r * 0.019330818715591 + g * 0.11919477979462 + b * 0.950532152249660);
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
 * @see https://www.w3.org/TR/css-color-4/#rgb-to-lab
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
export function xyzToRgb(xyz: Xyz, rgb: Rgb, white = whitepoint[2].D65): Rgb {
  const [X, Y, Z] = xyz;

  const r = X * +3.240969941904521 + Y * -1.537383177570093 + Z * -0.498610760293000;
  const g = X * -0.969243636280870 + Y * +1.875967501507720 + Z * +0.041555057407175;
  const b = X * +0.055630079696993 + Y * -0.203976958888970 + Z * +1.056971514242878;

  rgb[0] = clamp1(rotateXyzToRgb(r) * white[0]);
  rgb[1] = clamp1(rotateXyzToRgb(g) * white[1]);
  rgb[2] = clamp1(rotateXyzToRgb(b) * white[2]);
  rgb[3] = xyz[3];

  return rgb;
}

function rotateXyzToRgb(v: number): number {
  return v > 0.0031308 ? 1.055 * Math.pow(v, 1.0 / 2.4) - 0.055 : v * 12.92;
}
